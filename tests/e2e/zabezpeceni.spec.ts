import { expect, test } from "@playwright/test";

test.describe("chráněné stránky", () => {
  for (const cesta of ["/clenska-sekce", "/clenska-sekce/vitej", "/clenska-sekce/neco", "/admin", "/admin/uzivatele"]) {
    test(`nepřihlášený na ${cesta} skončí na přihlášení`, async ({ page }) => {
      await page.goto(cesta);
      await expect(page).toHaveURL(/\/prihlaseni\?next=/);
      await expect(page.getByRole("heading", { name: "Přihlášení" })).toBeVisible();
    });
  }
});

test.describe("veřejné stránky", () => {
  for (const cesta of ["/", "/moduly", "/konzultace", "/o-mne", "/kontakt", "/prihlaseni"]) {
    test(`${cesta} se načte`, async ({ page }) => {
      const r = await page.goto(cesta);
      expect(r?.status()).toBe(200);
    });
  }
});

test("bezpečnostní hlavičky jsou nastavené", async ({ request }) => {
  const r = await request.get("/");
  const h = r.headers();
  expect(h["x-content-type-options"]).toBe("nosniff");
  expect(h["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(h["permissions-policy"]).toContain("camera=()");
  expect(h["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(h["strict-transport-security"]).toContain("max-age=");
});

test("odkaz z e-mailu bez tokenu nic nespotřebuje a vysvětlí chybu", async ({ page }) => {
  await page.goto("/auth/confirm");
  await expect(page.getByText("Odkaz není úplný")).toBeVisible();
});

test("přesměrování po přihlášení nikdy nevede na cizí web", async ({ page }) => {
  await page.goto("/auth/confirm?token_hash=abc&type=email&next=https://zly.example");
  const next = await page.locator('input[name="next"]').inputValue();
  expect(next).toBe("/clenska-sekce");
});
