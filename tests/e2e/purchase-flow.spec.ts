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
    const productDetailPage = new ProductDetailPage(page)

    await productPage.verifyAllProductsLoaded()
    await productPage.clickProduct()
    await productDetailPage.verifyProductDetailPageLoad()
})
