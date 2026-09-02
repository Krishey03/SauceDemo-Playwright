import { Page, Locator, expect } from '@playwright/test'

export class CartPage {
    readonly page: Page
    readonly yourCartTitle: Locator
    readonly checkoutBtn: Locator

    constructor (page:Page) {
        this.page = page
        this.yourCartTitle = page.locator('[data-test="title"]')
        this.checkoutBtn = page.locator('[data-test="checkout"]')
    }

    async verifyCartPageLoad () {
        await expect(this.yourCartTitle).toBeVisible()
        await expect(this.yourCartTitle).toHaveText('Your Cart')
    }

    async clickCheckoutBtn() {
        await expect(this.checkoutBtn).toBeVisible()
        await this.checkoutBtn.click()
    }
}