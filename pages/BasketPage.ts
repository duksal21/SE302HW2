import { expect, Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class BasketPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  heading(): Locator {
    return this.page.getByRole("heading", { name: /Your Basket/i });
  }

  promoCodeInput(): Locator {
    return this.page
      .locator('#promoCode, input[name="promoCode"], input[placeholder*="promo" i]')
      .first();
  }

  redeemButton(): Locator {
    return this.page.getByRole("button", { name: /Redeem/i });
  }

  promoInvalidMessage(): Locator {
    return this.page.getByText("Please input a valid promo code.", { exact: true });
  }

  continueToCheckoutButton(): Locator {
    return this.page.getByRole("button", { name: /Continue to checkout/i });
  }

  firstNameRequiredMessage(): Locator {
    return this.page.getByText("Valid first name is required.", { exact: true });
  }

  async goto() {
    await this.page.goto("/basket");
    await expect(this.heading()).toBeVisible();
    await this.expectOnPath("/basket");
  }

  async applyPromoCode(code: string) {
    await this.promoCodeInput().fill(code);
    await this.redeemButton().click();
  }

  async clickContinueToCheckout() {
    await this.continueToCheckoutButton().click();
  }
}
