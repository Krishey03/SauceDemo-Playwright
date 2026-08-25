import { describe } from "node:test";
import { LoginPage } from "../pages/LoginPage"
import { ProductPage } from "../pages/ProductPage";
import { test, expect } from '@playwright/test';

const testUsers = [
    {
        username: 'standard_user',
        password: 'secret_sauce',
        shouldSucceed: true,
        description: 'Standard user should correctly login.'
    },
    {
        username: 'locked_out_user',
        password: 'secret_sauce',
        shouldSucceed: false,
        expectedError: 'Epic sadface: Sorry, this user has been locked out.',
        description: 'Locked out user should not be logged in.'
    },
    {
        username: 'problem_user',
        password: 'secret_sauce',
        shouldSucceed: true,
        description: 'Problem user should correctly login.'
    },
    {
        username: 'performance_glitch_user',
        password: 'secret_sauce',
        shouldSucceed: true,
        description: 'Performance Glitch user should correctly login.'
    },
    {
        username: 'error_user',
        password: 'secret_sauce',
        shouldSucceed: true,
        description: 'Error user should correctly login.'
    },
    {
        username: 'visual_user',
        password: 'secret_sauce',
        shouldSucceed: true,
        description: 'Visual user should correctly login.'
    },

]

test.describe('Check login for various users', () => {
    testUsers.forEach(({username, password, shouldSucceed, description, expectedError}) => {
        test(`login for ${username} - ${description}`, async ({ page }) => {
            const loginPage = new LoginPage (page)

            await loginPage.goto()
            await loginPage.login(username, password)
            
            if(shouldSucceed){
                const productPage = new ProductPage (page)

                await productPage.verifyProductPage()
                await expect(page).toHaveURL(/.*\/inventory/)
            } else{
                await loginPage.errorMessage(expectedError!) // Using ! tells TypeScript it's not undefined
            }
        })
    })
    
})