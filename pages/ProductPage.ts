import { Page, Locator, expect } from '@playwright/test'

export class ProductPage {
    readonly page: Page
    readonly productTitle: Locator

    constructor(page:Page) {
        this.page = page
        this.productTitle = page.locator('.title')
    }

    async verifyProductPage() {
        await expect(this.productTitle).toHaveText('Products')
    }
}