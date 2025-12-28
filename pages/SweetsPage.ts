import { expect, Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SweetsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  heading(): Locator {
    return this.page.getByRole("heading", { name: /Browse sweets/i });
  }

  addToBasketButtons(): Locator {
    return this.page.getByRole("button", { name: /Add to Basket/i });
  }

  async expectLoaded() {
    await expect(this.heading()).toBeVisible();
    await this.expectOnPath("/sweets");
  }

  async addFirstProductToBasket() {
    await this.addToBasketButtons().first().click();
  }

  async expectBasketCountAtLeast(count: number) {
    const basket = this.navBasket();
    await expect(basket).toContainText(new RegExp(`${count}\\s*Basket`, "i"));
  }

  async openBasketFromNav() {
    await this.navBasket().click();
  }
}
