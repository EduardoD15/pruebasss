import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { authenticate, findSession, revokeSession } from "@/lib/auth-service";
import { createDatabase } from "@/lib/database";
import { LOCK_DURATION_MS } from "@/lib/auth-policy";

const credentials = {
  adminPassword: "Demo-Admin-2026!",
  sellerPassword: "Demo-Seller-2026!",
};

async function withDatabase(
  run: (db: ReturnType<typeof createDatabase>) => Promise<void>,
) {
  const directory = mkdtempSync(join(tmpdir(), "modalab-auth-test-"));
  const db = createDatabase(join(directory, "test.sqlite"), credentials);
  try {
    await run(db);
  } finally {
    db.close();
    rmSync(directory, { recursive: true, force: true });
  }
}

function statusOf(result: Awaited<ReturnType<typeof authenticate>>): number {
  return result.ok ? 200 : result.status;
}

test("A02: locks at the third failure and unlocks after the configured interval", async () => {
  await withDatabase(async (db) => {
    const now = 1_800_000_000_000;
    assert.equal(
      statusOf(await authenticate(db, "admin@modalab.test", "wrong", now)),
      401,
    );
    assert.equal(
      statusOf(await authenticate(db, "admin@modalab.test", "wrong", now + 1)),
      401,
    );
    assert.equal(
      statusOf(await authenticate(db, "admin@modalab.test", "wrong", now + 2)),
      423,
    );
    assert.equal(
      statusOf(
        await authenticate(
          db,
          "admin@modalab.test",
          credentials.adminPassword,
          now + 3,
        ),
      ),
      423,
    );

    const result = await authenticate(
      db,
      "admin@modalab.test",
      credentials.adminPassword,
      now + LOCK_DURATION_MS + 3,
    );
    assert.equal(result.ok, true);
  });
});

test("A02: preserves the lockout threshold for concurrent failed logins", async () => {
  await withDatabase(async (db) => {
    const results = await Promise.all(
      Array.from({ length: 4 }, (_, index) =>
        authenticate(db, "admin@modalab.test", `incorrecta-${index}`),
      ),
    );
    assert.deepEqual(results.map(statusOf).sort(), [401, 401, 423, 423]);
  });
});

test("A03: rejects inactive users without issuing a session", async () => {
  await withDatabase(async (db) => {
    const result = await authenticate(
      db,
      "inactivo@modalab.test",
      credentials.sellerPassword,
    );
    assert.equal(result.ok, false);
    if (!result.ok) assert.equal(result.status, 403);
  });
});

test("A04: expires and revokes sessions while storing only a token hash", async () => {
  await withDatabase(async (db) => {
    const result = await authenticate(
      db,
      "vendedor@modalab.test",
      credentials.sellerPassword,
    );
    assert.equal(result.ok, true);
    if (!result.ok) return;

    assert.equal(findSession(db, result.token)?.role, "seller");
    assert.equal(
      findSession(db, result.token, Date.now() + 9 * 60 * 60 * 1000),
      null,
    );
    revokeSession(db, result.token);
    assert.equal(findSession(db, result.token), null);
    assert.equal(db.prepare("SELECT token_hash FROM sessions").all().length, 0);
  });
});
