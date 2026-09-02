import { describe } from "node:test";
import { LoginPage } from "../../pages/LoginPage"
import { ProductPage } from "../../pages/ProductPage";
import { ProductDetailPage } from "../../pages/ProductDetailPage";
import { test } from '@playwright/test';
import { NavComponent } from "../../pages/components/Nav";
import { CartPage } from "../../pages/CartPage";

test('Complete e2e test', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login('standard_user', 'secret_sauce')

    const productPage = new ProductPage(page)
    await productPage.verifyProductPage()
    await productPage.verifyProductLoadForClick()

    await productPage.clickProductByName('Sauce Labs Backpack')

    const productDetailPage = new ProductDetailPage(page)
    await productDetailPage.verifyProductDetailPageLoad()

    await productDetailPage.clickAddToCart()

    await productDetailPage.verifyBadgeCount(1)

    const navComponent = new NavComponent(page)
    await navComponent.clickCartIcon()

    const cartPage = new CartPage(page)
    await cartPage.verifyCartPageLoad()

    await cartPage.clickCheckoutBtn()
})



