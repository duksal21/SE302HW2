import { expect, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.page.goto("/");
    await expect(
      this.page.getByRole("heading", { name: /Welcome to the sweet shop!/i })
    ).toBeVisible();
  }

  async openSweetsFromNav() {
    await this.navSweets().click();
  }
}
