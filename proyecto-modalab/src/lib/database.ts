import { randomUUID } from "node:crypto";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { createPasswordHash } from "@/lib/passwords";
import type { UserRole } from "@/lib/auth-policy";

export type PublicUser = {
  id: string;
  email: string;
  role: UserRole;
};

type SeedCredentials = {
  adminPassword: string;
  sellerPassword: string;
};

let database: DatabaseSync | undefined;

export function createDatabase(
  filePath: string,
  credentials: SeedCredentials,
): DatabaseSync {
  mkdirSync(dirname(filePath), { recursive: true });
  const db = new DatabaseSync(filePath);
  db.exec("PRAGMA foreign_keys = ON;");
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      password_salt TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('admin', 'seller')),
      active INTEGER NOT NULL DEFAULT 1,
      failed_attempts INTEGER NOT NULL DEFAULT 0,
      locked_until INTEGER,
      created_at INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS sessions (
      token_hash TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      expires_at INTEGER NOT NULL,
      created_at INTEGER NOT NULL
    );
    CREATE INDEX IF NOT EXISTS sessions_user_id_idx ON sessions(user_id);
  `);

  seedUser(db, "admin@modalab.test", credentials.adminPassword, "admin", true);
  seedUser(db, "vendedor@modalab.test", credentials.sellerPassword, "seller", true);
  seedUser(db, "inactivo@modalab.test", credentials.sellerPassword, "seller", false);
  return db;
}

function seedUser(
  db: DatabaseSync,
  email: string,
  password: string,
  role: UserRole,
  active: boolean,
): void {
  const normalizedEmail = email.toLowerCase();
  const exists = db
    .prepare("SELECT id FROM users WHERE email = ?")
    .get(normalizedEmail);
  if (exists) return;

  const { salt, hash } = createPasswordHash(password);
  db.prepare(
    `INSERT INTO users
      (id, email, password_salt, password_hash, role, active, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
  ).run(
    randomUUID(),
    normalizedEmail,
    salt,
    hash,
    role,
    active ? 1 : 0,
    Date.now(),
  );
}

export function getDatabase(): DatabaseSync {
  if (database) return database;

  const adminPassword = process.env.MODALAB_ADMIN_PASSWORD;
  const sellerPassword = process.env.MODALAB_SELLER_PASSWORD;
  if (!adminPassword || !sellerPassword) {
    throw new Error(
      "Configura MODALAB_ADMIN_PASSWORD y MODALAB_SELLER_PASSWORD antes de iniciar Modalab.",
    );
  }

  const filePath =
    process.env.MODALAB_DB_PATH ?? join(process.cwd(), "data", "modalab.sqlite");
  database = createDatabase(filePath, { adminPassword, sellerPassword });
  return database;
}

export function listPublicUsers(db: DatabaseSync): PublicUser[] {
  const rows = db
    .prepare("SELECT id, email, role FROM users ORDER BY email")
    .all() as Array<{ id: string; email: string; role: UserRole }>;
  return rows.map(({ id, email, role }) => ({ id, email, role }));
}
