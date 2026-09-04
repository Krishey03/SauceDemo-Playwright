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

    const standard_user = users.standardUser
    const problem_user = users.problemUser

    const firstproduct = products.allProducts[0]
    const secondproduct = products.allProducts[1]
    const thirdproduct = products.allProducts[2]
    const fourthproduct = products.allProducts[3]
    const fifthproduct = products.allProducts[4]
    const sixthproduct = products.allProducts[5]


    //Login
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login(standard_user.username, standard_user.password)

    //Product Page
    const productPage = new ProductPage(page)
    await productPage.verifyProductPage()
    await productPage.verifyAllProducts(products.allProducts)
    await productPage.addAllProductToCart()
    await productPage.clickProductByName(firstproduct.name)

    //Product Detail Page
    const productDetailPage = new ProductDetailPage(page)
    await productDetailPage.verifyProductDetailPageLoad()

    for (const product of products.allProducts) {
        await productPage.clickProductByName(product.name)
        await productDetailPage.verifyProductDetailContents(
            product.name, product.description, product.price
        )
        await productDetailPage.clickBackToProducts()
    }

    //Cart Navigation
    const navComponent = new NavComponent(page)
    await navComponent.verifyBadgeCount(6)
    await navComponent.clickCartIcon()
    
    //Cart Page
    const cartPage = new CartPage(page)
    await cartPage.verifyCartPageLoad()

    for (const product of products.allProducts){
        await cartPage.verifyCartContent(product.name, product.description, product.price)
    }
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
    for (const product of products.allProducts){
        await checkoutPageStepTwo.verifyCheckOutContent(product.name, product.description, product.price)
    }
    await checkoutPageStepTwo.clickFinishBtn()

    //Checkout Page Complete
    const checkoutCompletePage = new CheckoutCompletePage(page)
    await checkoutCompletePage.verifyCheckoutCompletePageLoad()
    await checkoutCompletePage.clickBacktoHomeBtn()

    //Verify Back to Home
    await page.waitForLoadState('networkidle')
    await productPage.verifyProductPage()
})