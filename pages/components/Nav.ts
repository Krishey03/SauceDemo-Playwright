import { Page, Locator, expect } from '@playwright/test'

export class NavComponent {
    readonly page: Page
    readonly cartIcon: Locator

    constructor(page: Page){
        this.page = page
        this. cartIcon = page.locator('[data-test="shopping-cart-link"]')
    }

    async clickCartIcon() {
        await expect(this.cartIcon).toBeVisible() 
        await this.cartIcon.click()
    }
}