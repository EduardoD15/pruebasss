import { createHash, randomBytes } from "node:crypto";
import type { DatabaseSync } from "node:sqlite";
import {
  LOCK_DURATION_MS,
  MAX_FAILED_ATTEMPTS,
  type UserRole,
} from "@/lib/auth-policy";
import { verifyPassword } from "@/lib/passwords";
import type { PublicUser } from "@/lib/database";

const SESSION_DURATION_MS = 8 * 60 * 60 * 1000;

type UserRow = {
  id: string;
  email: string;
  password_salt: string;
  password_hash: string;
  role: UserRole;
  active: number;
  failed_attempts: number;
  locked_until: number | null;
};

export type AuthenticationResult =
  | { ok: true; token: string; user: PublicUser }
  | { ok: false; status: 401 | 403 | 423; error: string };

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export async function authenticate(
  db: DatabaseSync,
  email: string,
  password: string,
  now = Date.now(),
): Promise<AuthenticationResult> {
  const normalizedEmail = email.trim().toLowerCase();
  const user = db
    .prepare(
      `SELECT id, email, password_salt, password_hash, role, active,
              failed_attempts, locked_until
       FROM users WHERE email = ?`,
    )
    .get(normalizedEmail) as UserRow | undefined;

  if (!user) {
    return {
      ok: false,
      status: 401,
      error: "No se pudo iniciar sesión. Revisa las credenciales.",
    };
  }

  if (!user.active) {
    return {
      ok: false,
      status: 403,
      error: "La cuenta no está habilitada para iniciar sesión.",
    };
  }

  if (user.locked_until !== null && user.locked_until > now) {
    return {
      ok: false,
      status: 423,
      error: "La cuenta está bloqueada temporalmente.",
    };
  }

  if (user.locked_until !== null && user.locked_until <= now) {
    db.prepare(
      "UPDATE users SET failed_attempts = 0, locked_until = NULL WHERE id = ?",
    ).run(user.id);
    user.failed_attempts = 0;
  }

  if (!(await verifyPassword(password, user.password_salt, user.password_hash))) {
    const updated = db
      .prepare(
        `UPDATE users
         SET failed_attempts = failed_attempts + 1,
             locked_until = CASE
               WHEN failed_attempts + 1 >= ? THEN ?
               ELSE NULL
             END
         WHERE id = ? AND active = 1
           AND (locked_until IS NULL OR locked_until <= ?)
         RETURNING failed_attempts`,
      )
      .get(
        MAX_FAILED_ATTEMPTS,
        now + LOCK_DURATION_MS,
        user.id,
        now,
      ) as { failed_attempts: number } | undefined;

    if (!updated) {
      return {
        ok: false,
        status: 423,
        error: "La cuenta está bloqueada temporalmente.",
      };
    }

    if (updated.failed_attempts >= MAX_FAILED_ATTEMPTS) {
      db.prepare("DELETE FROM sessions WHERE user_id = ?").run(user.id);
      return {
        ok: false,
        status: 423,
        error: "La cuenta está bloqueada temporalmente.",
      };
    }

    return {
      ok: false,
      status: 401,
      error: "No se pudo iniciar sesión. Revisa las credenciales.",
    };
  }

  const activeAccount = db
    .prepare(
      `UPDATE users SET failed_attempts = 0, locked_until = NULL
       WHERE id = ? AND active = 1
         AND (locked_until IS NULL OR locked_until <= ?)
       RETURNING id`,
    )
    .get(user.id, now);
  if (!activeAccount) {
    return {
      ok: false,
      status: 423,
      error: "La cuenta está bloqueada temporalmente.",
    };
  }

  const token = randomBytes(32).toString("hex");
  db.prepare(
    "INSERT INTO sessions (token_hash, user_id, expires_at, created_at) VALUES (?, ?, ?, ?)",
  ).run(hashToken(token), user.id, now + SESSION_DURATION_MS, now);

  return {
    ok: true,
    token,
    user: { id: user.id, email: user.email, role: user.role },
  };
}

export function findSession(
  db: DatabaseSync,
  token: string,
  now = Date.now(),
): PublicUser | null {
  const row = db
    .prepare(
      `SELECT users.id, users.email, users.role
       FROM sessions JOIN users ON users.id = sessions.user_id
       WHERE sessions.token_hash = ? AND sessions.expires_at > ? AND users.active = 1`,
    )
    .get(hashToken(token), now) as
    | { id: string; email: string; role: UserRole }
    | undefined;

  return row ? { id: row.id, email: row.email, role: row.role } : null;
}

export function revokeSession(db: DatabaseSync, token: string): void {
  db.prepare("DELETE FROM sessions WHERE token_hash = ?").run(hashToken(token));
}
