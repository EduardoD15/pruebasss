import { existsSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { createDatabase } from "@/lib/database";

const databasePath =
  process.env.MODALAB_DB_PATH ?? join(process.cwd(), "data", "modalab-e2e.sqlite");
const directory = join(process.cwd(), "data");
mkdirSync(directory, { recursive: true });

for (const suffix of ["", "-shm", "-wal"]) {
  const file = `${databasePath}${suffix}`;
  if (existsSync(file)) rmSync(file);
}

const db = createDatabase(databasePath, {
  adminPassword: process.env.MODALAB_ADMIN_PASSWORD ?? "Demo-Admin-2026!",
  sellerPassword: process.env.MODALAB_SELLER_PASSWORD ?? "Demo-Seller-2026!",
});
db.close();
