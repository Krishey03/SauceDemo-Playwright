import { Page, Locator, expect } from '@playwright/test'

export class CheckoutPageStepThree {
    readonly page: Page
    readonly pageTitle: Locator
    readonly finishBtn: Locator

     constructor(page:Page){
        this.page = page
        this.pageTitle = page.locator('[data-test="title"]')
        this.finishBtn = page.locator('[data-test="finish"]')
     }

     async verifyCheckoutStepTwoPage() {
        await expect(this.pageTitle).toHaveText('Checkout: Overview')
     }

     async clickFinishBtn() {
        await expect(this.finishBtn).toBeVisible()
        await this.finishBtn.click()
     }
}