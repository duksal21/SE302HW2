import { Page, Locator, expect } from "@playwright/test";

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  navSweets(): Locator {
    return this.page.getByRole("link", { name: "Sweets" });
  }

  navLogin(): Locator {
    return this.page.getByRole("link", { name: "Login" });
  }

  navBasket(): Locator {
    return this.page.getByRole("link", { name: /Basket/i });
  }

  async expectOnPath(pathPart: string) {
    await expect(this.page).toHaveURL(new RegExp(pathPart.replace(/\//g, "\\/")));
  }
}
