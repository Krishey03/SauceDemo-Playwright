import { describe } from "node:test";
import { LoginPage } from "../../pages/LoginPage"
import { ProductPage } from "../../pages/ProductPage";
import { ProductDetailPage } from "../../pages/ProductDetailPage";
import { test } from '@playwright/test';

//Login for standard user
test ('test successful login for normal user', async ({ page }) => {
    const loginPage = new LoginPage(page)
    const productPage = new ProductPage(page)

    await loginPage.goto()
    await loginPage.login('standard_user', 'secret_sauce')
    await productPage.verifyProductPage()
})

test('Verify all products are loaded', async ({ page }) => {
    const productPage = new ProductPage(page)
    await productPage.verifyAllProductsLoaded(6)
})

test('Add specific product to cart', async ({ page }) => {
    const productPage = new ProductPage(page, 'Sauce Labs Backpack')
    await productPage.clickProduct()
})


