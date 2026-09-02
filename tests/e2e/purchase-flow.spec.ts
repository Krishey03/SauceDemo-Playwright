import { describe } from "node:test";
import { LoginPage } from "../../pages/LoginPage"
import { ProductPage } from "../../pages/ProductPage";
import { ProductDetailPage } from "../../pages/ProductDetailPage";
import { test } from '@playwright/test';

test.describe('e2e test', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.goto()
        await loginPage.login('standard_user', 'secret_sauce')
    })

    test ('Verify product page Loaded', async ({ page }) => {
        const productPage = new ProductPage(page)
        await productPage.verifyProductPage()
    })

    test('Verify product load', async ({ page }) => {
        const productPage = new ProductPage(page)
        await productPage.verifyProductLoadForClick()
    })

    test('Add specific product to cart', async ({ page }) => {
    const productPage = new ProductPage(page)
    await productPage.clickProductByName('Sauce Labs Backpack')
    })
})



