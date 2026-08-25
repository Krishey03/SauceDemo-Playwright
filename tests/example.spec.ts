import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Swag Labs/);

  const username = page.locator('#user-name')
  await username.click()
  await username.fill('standard_user')

  const password = page.locator('#password')
  await password.click()
  await password.fill('secret_sauce')

  const login = page.locator('#login-button')
  await login.click()

  const login_success = page.locator('#Products')
  console.log (login_success)
});