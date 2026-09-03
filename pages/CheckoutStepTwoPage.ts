import { Page, Locator, expect } from '@playwright/test'

export class CheckoutPageStepTwo{
    readonly page: Page
    readonly pageTitle: Locator
    readonly firstNameField: Locator
    readonly lastNameField: Locator
    readonly postalCodeField: Locator
    readonly continueBtn: Locator
    
    constructor(page:Page){
        this.page = page
        this.pageTitle = page.locator('[data-test="title"]')
        this.firstNameField = page.locator('[data-test="firstName"]')
        this.lastNameField = page.locator('[data-test="lastName"]')
        this.postalCodeField = page.locator('[data-test="postalCode"]')
        this.continueBtn = page.locator('[data-test="continue"]')
    }

    async verifyCheckoutStepOnePage() {
        await expect(this.pageTitle).toHaveText('Checkout: Your Information')
    }

    async fillInputFields(FName: string, LName: string, PCode: string) {
        await this.firstNameField.fill(FName)
        await this.lastNameField.fill(LName)
        await this.postalCodeField.fill(PCode)
    }

    async clickContinueBtn() {
        await expect(this.continueBtn).toBeVisible()
        await this.continueBtn.click()
    }

}