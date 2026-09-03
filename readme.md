# SauceDemo E2E Test Suite

## Overview

This is a comprehensive end-to-end (E2E) test suite for the **SauceDemo e-commerce website**, built using **Playwright** and **TypeScript**.

The test suite follows the **Page Object Model (POM)** design pattern to ensure maintainable, reusable, and readable test code.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Test Scenarios](#test-scenarios)
- [Running Tests](#running-tests)
- [Best Practices](#best-practices)

---

## Prerequisites

Before running the test suite, make sure the following are installed:

- Node.js v14 or higher
- npm or yarn package manager
- Git
- Playwright

---

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-directory>
```


### 2. Install Dependencies
```bash

npm install
```


### 3. Install Playwright Browsers
```bash
npx playwright install
```


## Project Structure
├── pages/
│   ├── components/
│   │   └── Nav.ts                     # Navigation component
│   ├── LoginPage.ts                   # Login page objects
│   ├── ProductPage.ts                 # Products page objects
│   ├── ProductDetailPage.ts           # Product detail page objects
│   ├── CartPage.ts                    # Cart page objects
│   ├── CheckoutStepTwoPage.ts         # Checkout information page
│   ├── CheckoutStepThreePage.ts       # Checkout overview page
│   └── CheckourCompletePage.ts        # Checkout complete page
│
├── tests/
│   └── purchase-flow.spec.ts          # Main test suite
│
├── playwright.config.ts               # Playwright configuration
└── package.json                       # Project dependencies

## Test Scenarios
Complete E2E Purchase Flow

The main test scenario, purchase-flow.spec.ts, covers the complete user journey from login to order completion.

#### 1. Login
- Navigate to the SauceDemo website.
- Login using valid credentials.
#### 2. Product Selection
- Verify that the products page loads correctly.
- Select the Sauce Labs Backpack product.
#### 3. Product Details
- Verify that the product detail page loads.
- Add the product to the cart.
- Verify that the cart badge count is updated.
#### 4. Cart Management
- Navigate to the cart.
- Verify that the cart page loads correctly.
- Proceed to checkout.
#### 5. Checkout Process
- Enter shipping information.
- Continue to the checkout overview page.
- Verify the checkout overview page.
- Complete the purchase.
#### 6. Order Completion
- Verify that the order completion page is displayed.
- Return to the products page.

## Running Tests
##### Run All Tests
```bash
npx playwright test
```

##### Run a Specific Test
```bash
npx playwright test purchase-flow.spec.ts
```

##### Run Tests with UI Mode
```bash
npx playwright test --ui
```

##### Run Tests in Headed Mode
```bash
npx playwright test --headed
```

##### Run Tests in Debug Mode
```bash
npx playwright test --debug
```

##### Generate and View Test Report
```bash
npx playwright show-report
```


## Best Practices
#### 1. Page Object Model

All page interactions are encapsulated within dedicated page classes. This improves maintainability and reduces duplicated code.

#### 2. Assertions

Each major action includes appropriate assertions to verify that the expected application state has been reached.

#### 3. Reusability

Common functionality, such as navigation, is separated into reusable components like Nav.

#### 4. Readability

Test steps are clearly structured and organized to make the test flow easy to understand.

#### 5. Error Handling

Verification steps are included throughout the test flow to help identify failures early and reduce flaky tests.