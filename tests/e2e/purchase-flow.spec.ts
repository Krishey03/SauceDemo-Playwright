import { faker } from '@faker-js/faker'
import users from '../../test-data/users.json'
import products from '../../test-data/products.json'
import { LoginPage } from "../../pages/LoginPage"
import { ProductPage } from "../../pages/ProductPage";
import { ProductDetailPage } from "../../pages/ProductDetailPage";
import { test } from '@playwright/test';
import { NavComponent } from "../../pages/components/Nav";
import { CartPage } from "../../pages/CartPage";
import { CheckoutPageStepOne } from "../../pages/CheckoutStepOnePage";
import { CheckoutPageStepTwo } from "../../pages/CheckoutStepTwoPage";
import { CheckoutCompletePage } from "../../pages/CheckourCompletePage";

test('Complete e2e test', async ({ page }) => {

    const customer = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        postalCode: faker.location.zipCode('######')
    }

    const user = users.standardUser
    const firstproduct = products.allProducts[0]

    //Login
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login(user.username, user.password)

    //Product Page
    const productPage = new ProductPage(page)
    await productPage.verifyProductPage()
    await productPage.verifyAllProducts(products.allProducts)
    await productPage.clickProductByName(firstproduct.name)

    //Product Detail Page
    const productDetailPage = new ProductDetailPage(page)
    await productDetailPage.verifyProductDetailPageLoad()
    await productDetailPage.verifyProductDetailContents(firstproduct.name, firstproduct.description, firstproduct.price)

    await productDetailPage.clickAddToCart()
    await productDetailPage.verifyBadgeCount(1)

    //Cart Navigation
    const navComponent = new NavComponent(page)
    await navComponent.clickCartIcon()

    //Cart Page
    const cartPage = new CartPage(page)
    await cartPage.verifyCartPageLoad()
    await cartPage.verifyCartContent(firstproduct.name, firstproduct.description, firstproduct.price)
    await cartPage.clickCheckoutBtn()

    //Checkout Page Step 1
    const checkoutPageStepOne = new CheckoutPageStepOne(page)
    await checkoutPageStepOne.verifyCheckoutStepOnePage()
    await checkoutPageStepOne.fillInputFields(
        customer.firstName,
        customer.lastName,
        customer.postalCode
    )
    await checkoutPageStepOne.clickContinueBtn()

    //Checkout Page Step 2
    const checkoutPageStepTwo = new CheckoutPageStepTwo(page)
    await checkoutPageStepTwo.verifyCheckoutStepTwoPage()
    await checkoutPageStepTwo.verifyCheckOutContent(firstproduct.name, firstproduct.description, firstproduct.price)
    await checkoutPageStepTwo.clickFinishBtn()

    //Checkout Page Complete
    const checkoutCompletePage = new CheckoutCompletePage(page)
    await checkoutCompletePage.verifyCheckoutCompletePageLoad()
    await checkoutCompletePage.clickBacktoHomeBtn()

    //Verify Back to Home
    await page.waitForLoadState('networkidle')
    await productPage.verifyProductPage()
})