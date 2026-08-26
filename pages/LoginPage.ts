import { Page, Locator, expect } from '@playwright/test'

export class LoginPage {
    readonly page: Page
    readonly username: Locator
    readonly password: Locator
    readonly login_button: Locator
    readonly error_message: Locator

    constructor(page:Page) {
        this.page = page
        this.username = page.locator('#user-name')
        this.password = page.locator('#password')
        this.login_button = page.locator('#login-button')
        this.error_message = page.locator('[data-test="error"]')
    }

    async goto(){
        await this.page.goto('https://www.saucedemo.com/')
    }

    async assertLoginPage(){
        await expect(this.username).toBeVisible()
    }

    async login(username: string, password: string){
        await this.username.fill(username)
        await this.password.fill(password)
        await this.login_button.click()
    }

    async errorMessage(expectedError: string){
        await expect(this.error_message).toBeVisible()
        await expect(this.error_message).toHaveText(expectedError)
    }
}