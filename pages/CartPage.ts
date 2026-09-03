import { Page, Locator, expect } from '@playwright/test'

export class CartPage {
    readonly page: Page
    readonly yourCartTitle: Locator
    readonly productTitle: Locator
    readonly productDesc: Locator
    readonly productPrice: Locator
    readonly checkoutBtn: Locator

    constructor (page:Page) {
        this.page = page
        this.yourCartTitle = page.locator('[data-test="title"]')
        this.productTitle = page.locator('[data-test="inventory-item-name"]')
        this.productDesc = page.locator('[data-test="inventory-item-desc"]')
        this.productPrice = page.locator('[data-test="inventory-item-price"]')
        this.checkoutBtn = page.locator('[data-test="checkout"]')
    }

    async verifyCartPageLoad () {
        await expect(this.yourCartTitle).toBeVisible()
        await expect(this.yourCartTitle).toHaveText('Your Cart')
    }

    async verifyCartContent(productName:string, productDesc: string, productPrice: string){
        await expect(this.productTitle).toHaveText(productName)
        await expect(this.productDesc).toHaveText(productDesc)
        await expect(this.productPrice).toHaveText(productPrice)
    }

    async clickCheckoutBtn() {
        await expect(this.checkoutBtn).toBeVisible()
        await this.checkoutBtn.click()
    }
}