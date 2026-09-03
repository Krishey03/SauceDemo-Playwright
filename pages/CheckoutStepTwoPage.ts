import { Page, Locator, expect } from '@playwright/test'

export class CheckoutPageStepTwo {
   readonly page: Page
   readonly pageTitle: Locator
   readonly productTitle: Locator
   readonly productDesc: Locator
   readonly productPrice: Locator
   readonly finishBtn: Locator

      constructor(page:Page){
         this.page = page
         this.pageTitle = page.locator('[data-test="title"]')
         this.productTitle = page.locator('[data-test="inventory-item-name"]')
         this.productDesc = page.locator('[data-test="inventory-item-desc"]')
         this.productPrice = page.locator('[data-test="inventory-item-price"]')
         this.finishBtn = page.locator('[data-test="finish"]')
      }

      async verifyCheckoutStepTwoPage() {
         await expect(this.pageTitle).toHaveText('Checkout: Overview')
      }

      async verifyCheckOutContent(productName:string, productDesc: string, productPrice: string){
         await expect(this.productTitle).toHaveText(productName)
         await expect(this.productDesc).toHaveText(productDesc)
         await expect(this.productPrice).toHaveText(productPrice)
      }

      async clickFinishBtn() {
         await expect(this.finishBtn).toBeVisible()
         await this.finishBtn.click()
      }
}