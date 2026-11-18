import { defineConfig, devices } from "@playwright/test";
import { join } from "node:path";

const adminPassword = process.env.MODALAB_ADMIN_PASSWORD ?? "Demo-Admin-2026!";
const sellerPassword = process.env.MODALAB_SELLER_PASSWORD ?? "Demo-Seller-2026!";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  workers: 1,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3100",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npm run test:e2e:prepare && npm run dev -- --port 3100",
    url: "http://localhost:3100",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      APP_ENV: "demo",
      MODALAB_ADMIN_PASSWORD: adminPassword,
      MODALAB_SELLER_PASSWORD: sellerPassword,
      MODALAB_DB_PATH: join(process.cwd(), "data", "modalab-e2e.sqlite"),
    },
  },
});
