import { Page, Locator, expect } from '@playwright/test'

export class NavComponent {
    readonly page: Page
    readonly cartIcon: Locator
    readonly cartBadge: Locator

    constructor(page: Page){
        this.page = page
        this. cartIcon = page.locator('[data-test="shopping-cart-link"]')
        this.cartBadge = page.locator('.shopping_cart_badge')
    }

    async verifyBadgeCount(expectedCount: number){
        await expect(this.cartBadge).toHaveText(expectedCount.toString())
    }

    async clickCartIcon() {
        await expect(this.cartIcon).toBeVisible() 
        await this.cartIcon.click()
    }
}