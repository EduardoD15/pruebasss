import { expect, test } from "@playwright/test";

const adminPassword = process.env.MODALAB_ADMIN_PASSWORD ?? "Demo-Admin-2026!";
const sellerPassword = process.env.MODALAB_SELLER_PASSWORD ?? "Demo-Seller-2026!";

test("A05: verifies admin and seller login, UI visibility, and API role enforcement", async ({
  browser,
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("form")).toHaveAttribute("data-client-ready", "true");
  await page.getByLabel("Correo electrónico").fill("admin@modalab.test");
  await page.getByLabel("Contraseña").fill(adminPassword);
  await page.getByRole("button", { name: "Iniciar sesión" }).click();

  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(page.getByRole("heading", { name: "Hola, Administrador" })).toBeVisible();
  await page.getByRole("link", { name: "Ver usuarios" }).click();
  await expect(page.getByRole("heading", { name: "Usuarios de prueba" })).toBeVisible();
  await expect(page.getByText("vendedor@modalab.test")).toBeVisible();

  const sellerPage = await browser.newPage();
  await sellerPage.goto("/");
  await expect(sellerPage.locator("form")).toHaveAttribute("data-client-ready", "true");
  await sellerPage.getByLabel("Correo electrónico").fill("vendedor@modalab.test");
  await sellerPage.getByLabel("Contraseña").fill(sellerPassword);
  await sellerPage.getByRole("button", { name: "Iniciar sesión" }).click();
  await expect(sellerPage).toHaveURL(/\/dashboard$/);
  await expect(sellerPage.getByRole("heading", { name: "Hola, Vendedor" })).toBeVisible();

  const denied = await sellerPage.evaluate(async () => {
    const response = await fetch("/api/admin/users");
    return response.status;
  });
  expect(denied).toBe(403);
  await sellerPage.close();
});

test("A02: denies the correct password while the account is locked", async ({ request }) => {
  const login = async (password: string) =>
    request.post("/api/auth/login", {
      data: { email: "admin@modalab.test", password },
    });

  expect((await login("incorrecta-1")).status()).toBe(401);
  expect((await login("incorrecta-2")).status()).toBe(401);
  expect((await login("incorrecta-3")).status()).toBe(423);
  expect((await login(adminPassword)).status()).toBe(423);
});
