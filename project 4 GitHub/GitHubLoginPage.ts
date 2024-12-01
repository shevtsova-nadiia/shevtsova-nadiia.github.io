import { type Locator, type Page } from "@playwright/test";
import { GitHubHomePage } from "./GitHubHomePage";

export class GitHubLoginPage extends GitHubHomePage{
    readonly headerLogo: Locator
    readonly formHeader: Locator
    readonly userNameInput: Locator
    readonly passwordInput: Locator
    readonly passwordLink: Locator
    readonly loginSignInButton: Locator
    readonly userNamePasswordInput: Locator
    readonly userNamePasswordLabel: Locator
    readonly passKeyAnAccountLink: Locator
    readonly footerLinks: Locator
    readonly errorMessage: Locator
    //
    readonly passwordLabel: Locator
    readonly userNameLabel: Locator
    readonly passkeyLink: Locator
    readonly createAnAccountLink: Locator

    constructor(page: Page) {
    super(page)
    this.headerLogo = page.locator('.header-logo')
    this.formHeader = page.locator('#login h1')
    this.passwordLink = page.locator('#forgot-password')
    this.loginSignInButton = page.locator('[type="submit"]') //[value="Sign in"]
    this.passKeyAnAccountLink = page.locator('.login-callout p')
    this.userNamePasswordInput = page.locator('#login_field, #password') //main .input-block
    this.userNamePasswordLabel = page.locator('[for="login_field"], [for="password"]') //main label
    this.footerLinks = page.locator('.footer li')
    this.errorMessage = page.locator('.js-flash-alert')
    //
    this.userNameLabel = page.locator('[for="login_field"]')
    this.passwordLabel = page.locator('[for="password"]')
    this.passkeyLink =page.locator('.login-callout .Button-label')
    this.createAnAccountLink = page.locator('.mt-1 a')
    
    }
    async goto() {
        await this.page.goto('https://github.com/');
    }
    async clickloginSignInButton() {
        await this.loginSignInButton.click()
    }
}