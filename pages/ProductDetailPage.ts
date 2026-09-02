import { Page, Locator, expect } from '@playwright/test'

export class ProductDetailPage {
    readonly page: Page
    readonly verifyProductDetailPage: Locator
    readonly addToCartBtn: Locator
    readonly cartBadge: Locator
    
    constructor(page:Page) {
        this.page = page
        this.addToCartBtn = page.locator('[id="add-to-cart"]')
        this.verifyProductDetailPage = page.locator('[data-test="back-to-products"]')
        this.cartBadge = page.locator('.shopping_cart_badge')
    }

    async verifyProductDetailPageLoad(){
        await expect(this.verifyProductDetailPage).toBeVisible()
    }

    async clickAddToCart(){
        await this.addToCartBtn.click()
    }

    async verifyBadgeCount(expectedCount: number){
        await expect(this.cartBadge).toHaveText(expectedCount.toString())
    }
}