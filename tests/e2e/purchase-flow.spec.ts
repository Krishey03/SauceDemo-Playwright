import { describe } from "node:test";
import { LoginPage } from "../../pages/LoginPage"
import { ProductPage } from "../../pages/ProductPage";
import { ProductDetailPage } from "../../pages/ProductDetailPage";
import { test } from '@playwright/test';
import { NavComponent } from "../../pages/components/Nav";
import { CartPage } from "../../pages/CartPage";
import { CheckoutPageStepTwo } from "../../pages/CheckoutStepTwoPage";
import { CheckoutPageStepThree } from "../../pages/CheckoutStepThreePage";
import { CheckoutCompletePage } from "../../pages/CheckourCompletePage";

test('Complete e2e test', async ({ page }) => {

    const productName = 'Sauce Labs Backpack'

    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login('standard_user', 'secret_sauce')

    const productPage = new ProductPage(page)
    await productPage.verifyProductPage()
    await productPage.verifyProductLoadForClick()

    await productPage.clickProductByName(productName)

    const productDetailPage = new ProductDetailPage(page)
    await productDetailPage.verifyProductDetailPageLoad()

    await productDetailPage.clickAddToCart()

    await productDetailPage.verifyBadgeCount(1)

    const navComponent = new NavComponent(page)
    await navComponent.clickCartIcon()

    const cartPage = new CartPage(page)
    await cartPage.verifyCartPageLoad()
    await cartPage.clickCheckoutBtn()

    const checkoutPageStepTwo = new CheckoutPageStepTwo(page)
    await checkoutPageStepTwo.verifyCheckoutStepOnePage()
    await checkoutPageStepTwo.fillInputFields('Fname', 'LName', '102909')
    await checkoutPageStepTwo.clickContinueBtn()

    const checkoutPageStepThree = new CheckoutPageStepThree(page)
    await checkoutPageStepThree.verifyCheckoutStepTwoPage()
    await checkoutPageStepThree.clickFinishBtn()

    const checkoutCompletePage = new CheckoutCompletePage(page)
    await checkoutCompletePage.verifyCheckoutCompletePageLoad()
    await checkoutCompletePage.clickBacktoHomeBtn()

    await productPage.verifyProductPage()
})



