import { expect, Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  emailInput(): Locator {
    return this.page
      .locator(
        'label:has-text("Email") ~ input, #email, input[type="email"], input[name*="email" i], input[placeholder*="@" i]'
      )
      .first();
  }

  passwordInput(): Locator {
    return this.page
      .locator(
        'label:has-text("Password") ~ input, #password, input[type="password"], input[name*="pass" i]'
      )
      .first();
  }

  loginButton(): Locator {
    return this.page.getByRole("button", { name: /^Login$/i });
  }

  invalidEmailMessage(): Locator {
    return this.page.getByText("Please enter a valid email address.", { exact: true });
  }

  async goto() {
    await this.page.goto("/login");
    await expect(this.page.getByRole("heading", { name: /^Login$/i })).toBeVisible();
    await this.expectOnPath("/login");
  }

  async login(email: string, password: string) {
    await this.emailInput().fill(email);
    await this.passwordInput().fill(password);
    await this.loginButton().click();
  }
}
