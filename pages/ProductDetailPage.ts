import { Page, Locator, expect } from '@playwright/test'

export class ProductDetailPage {
    readonly page: Page
    readonly verifyProductDetailPage: Locator
    readonly addToCartBtn: Locator
    readonly productTitle: Locator
    readonly productDesc: Locator
    readonly productPrice: Locator
    readonly backToProductsBtn: Locator

    
    constructor(page:Page) {
        this.page = page
        this.addToCartBtn = page.locator('[id="add-to-cart"]')
        this.verifyProductDetailPage = page.locator('[data-test="back-to-products"]')
        this.productTitle = page.locator('[data-test="inventory-item-name"]')
        this.productDesc = page.locator('[data-test="inventory-item-desc"]')
        this.productPrice = page.locator('[data-test="inventory-item-price"]')
        this.backToProductsBtn = page.locator('[data-test="back-to-products"]')
    }

    async verifyProductDetailPageLoad(){
        await expect(this.verifyProductDetailPage).toBeVisible()
    }

    async verifyProductDetailContents(productName:string, productDesc: string, productPrice: string){
        await expect(this.productTitle).toHaveText(productName)
        await expect(this.productDesc).toHaveText(productDesc)
        await expect(this.productPrice).toHaveText(productPrice)
    }

    async clickAddToCart(){
        await this.addToCartBtn.click()
    }

    async clickBackToProducts() {
        await expect(this.backToProductsBtn).toBeVisible()
        await this.backToProductsBtn.click()
    }

}