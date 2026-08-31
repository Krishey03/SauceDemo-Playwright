import { Page, Locator, expect } from '@playwright/test'

export class ProductPage {
    readonly page: Page
    readonly productTitle: Locator
    readonly productItems: Locator
    readonly specificItem?: Locator

    constructor(page:Page, productName?: string) {
        this.page = page
        this.productTitle = page.locator('.title')
        this.productItems = page.locator('.inventory_item')

        if (productName){
            this.specificItem = page.getByText(`[data-test="inventory-item"]:has-text("${productName}")`)
        }
        
    }

    async verifyProductPage() {
        await expect(this.productTitle).toHaveText('Products')
    }

    async verifyAllProductsLoaded(expected: number = 6) {
        await expect(this.productItems).toHaveCount(expected)
    }

    async clickProductByName(productName: string){
        const product = this.page.locator(`[data-test="inventory-item"]:has-text("${productName}")`)
        await product.click()
    }

    async clickProduct() {
        if (!this.specificItem) {
            throw new Error('No product specified. clickProductByName() instead.')
        }
        await this.specificItem.click()
    }
}