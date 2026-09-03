import { Page, Locator, expect } from '@playwright/test'

export class ProductPage {
    readonly page: Page
    readonly productTitle: Locator
    readonly productItem: Locator
    readonly productItemDesc: Locator
    readonly productItemPrice: Locator
    readonly productItemContainer: Locator

    constructor(page:Page, productName?: string) {
        this.page = page
        this.productTitle = page.locator('.title')
        this.productItem = page.locator('[data-test="inventory-item-name"]')
        this.productItemDesc = page.locator('[data-test="inventory-item-desc"]')
        this.productItemPrice = page.locator('[data-test="inventory-item-price"]')
        this.productItemContainer = page.locator('.inventory_item')
    }

    async verifyProductPage() {
        await expect(this.productTitle).toHaveText('Products')
    }

    async verifyProductLoadForClick(productName: string, productDesc: string, productPrice: string){
        await expect(this.productItem.first()).toHaveText(productName)
        await expect(this.productItemDesc.first()).toHaveText(productDesc)
        await expect(this.productItemPrice.first()).toHaveText(productPrice)
    }

    async verifyAllProducts(expectedProducts: Array<{ name: string, description: string, price: string }>){
        const productCount = await this.productItem.count()

        expect(productCount).toBe(expectedProducts.length)

        for (let i = 0; i < productCount; i++){
            await expect(this.productItem.nth(i)).toHaveText(expectedProducts[i].name)
            await expect(this.productItemDesc.nth(i)).toHaveText(expectedProducts[i].description)
            await expect(this.productItemPrice.nth(i)).toHaveText(expectedProducts[i].price)
        }
    }

    async clickProductByName(productName: string){
        const product = this.productItem.filter({ hasText: productName })
        await expect(product).toBeVisible()
        await product.click()
    }
}