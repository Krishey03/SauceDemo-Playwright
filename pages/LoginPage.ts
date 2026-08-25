import { Page, Locator, expect } from '@playwright/test'

export class LoginPage {
    readonly page: Page
    readonly username: Locator
    readonly password: Locator
    readonly login_button: Locator

    constructor(page:Page) {
        this.page = page
        this.username = page.locator('#user-name')
        this.password = page.locator('#password')
        this.login_button = page.locator('#login-button')
    }

    async goto(){
        await this.page.goto('https://www.saucedemo.com/')
    }

    async login(username: string, password: string){
        await this.username.fill(username)
        await this.password.fill(password)
        await this.login_button.click()
    }
}