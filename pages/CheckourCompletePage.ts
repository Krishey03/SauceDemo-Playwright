import { Page, Locator, expect } from '@playwright/test'

export class CheckoutCompletePage {
    readonly page: Page
    readonly pageTitle: Locator
    readonly backHomeBtn: Locator

    constructor(page:Page){
        this.page = page
        this.backHomeBtn = page.locator('[data-test="back-to-products"]')
        this.pageTitle = page.locator('[data-test="title"]')
    }

    async verifyCheckoutCompletePageLoad() {
        await expect(this.pageTitle).toHaveText('Checkout: Complete!')
    }

    async clickBacktoHomeBtn() {
        await expect(this.backHomeBtn).toBeVisible()
        await this.backHomeBtn.click()
    }
}