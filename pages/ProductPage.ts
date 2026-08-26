import { Page, Locator, expect } from '@playwright/test'

export class ProductPage {
    readonly page: Page
    readonly productTitle: Locator
    readonly productItems: Locator
    readonly specificItem: Locator

    constructor(page:Page, productName: string) {
        this.page = page
        this.productTitle = page.locator('.title')
        this.productItems = page.locator('.inventory_item')
        this.specificItem = page.getByText(`[data-test="inventory-item"]:has-text("${productName}`)
    }

    async verifyProductPage() {
        await expect(this.productTitle).toHaveText('Products')
    }

    async verifyAllProductsLoaded(expected: number = 6) {
        await expect(this.productItems).toHaveCount(expected)
    }

    async clickProduct(){
        await this.specificItem.click()
    }
}