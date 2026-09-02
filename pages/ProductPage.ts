import { Page, Locator, expect } from '@playwright/test'

export class ProductPage {
    readonly page: Page
    readonly productTitle: Locator
    readonly productItems: Locator
    readonly specificItem?: Locator

    constructor(page:Page, productName?: string) {
        this.page = page
        this.productTitle = page.locator('.title')
        this.productItems = page.locator('[data-test="title"]')
        
    }

    async verifyProductPage() {
        await expect(this.productTitle).toHaveText('Products')
    }

    async verifyProductLoadForClick(){
        await expect(this.productItems.first()).toBeVisible()
    }

    async clickProductByName(productName: string){
        const product = this.page.locator(`[data-test="inventory-item-name"]:has-text("${productName}")`)
        await expect(product).toBeVisible()
        await product.click()
    }
}