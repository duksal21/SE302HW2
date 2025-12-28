import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { SweetsPage } from "../pages/SweetsPage";
import { LoginPage } from "../pages/LoginPage";
import { BasketPage } from "../pages/BasketPage";

test.describe("SE302 HW02 - Sweet Shop (POM)", () => {
  test("TC-02: Verify Navigation to Sweets Page", async ({ page }) => {
    const home = new HomePage(page);
    const sweets = new SweetsPage(page);

    await home.goto();
    await home.openSweetsFromNav();
    await sweets.expectLoaded();
  });

  test("TC-04: Add Product to Basket", async ({ page }) => {
    const sweets = new SweetsPage(page);

    await page.goto("/sweets");
    await sweets.expectLoaded();

    await sweets.addFirstProductToBasket();
    await sweets.expectBasketCountAtLeast(1);

    await sweets.openBasketFromNav();
    await expect(page.getByRole("heading", { name: /Your Basket/i })).toBeVisible();
    await expect(page).toHaveURL(/\/basket/);
  });

  test("TC-05 (Negative): Login with Invalid Email", async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login("invalidEmail", "anyPassword123");

    await expect(login.invalidEmailMessage()).toBeVisible();
    await expect(page).toHaveURL(/\/login/);
  });

  test("TC-08 (Negative): Invalid Promo Code", async ({ page }) => {
    const basket = new BasketPage(page);

    await basket.goto();
    await basket.applyPromoCode("INVALID-CODE");

    await expect(basket.promoInvalidMessage()).toBeVisible();
  });

  test("TC-10 (Boundary): Checkout Without Required Fields", async ({ page }) => {
    const basket = new BasketPage(page);

    await basket.goto();
    await basket.clickContinueToCheckout();

    await expect(basket.firstNameRequiredMessage()).toBeVisible();
    await expect(page).toHaveURL(/\/basket/);
  });
});
