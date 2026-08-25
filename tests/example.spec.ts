import { LoginPage } from "../pages/LoginPage"
import { ProductPage } from "../pages/ProductPage";
import { test, expect } from '@playwright/test';

test ('test successful login for normal user', async ({ page }) => {
    const loginPage = new LoginPage(page)
    const productPage = new ProductPage(page)

    await loginPage.goto()
    await loginPage.login('standard_user', 'secret_sauce')
    await productPage.verifyProductPage()
})

test ('test ', async ({ page }) => {
    const loginPage = new LoginPage(page)
    
    await loginPage.goto()
    await loginPage.login('error_user', 'secret_sauce')
})