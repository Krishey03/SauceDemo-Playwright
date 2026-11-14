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
- [Docker](#docker)
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


## Docker

The image is built on `mcr.microsoft.com/playwright:v1.62.1-noble`. The image tag
and the `@playwright/test` version in `package.json` / `package-lock.json` must
always match, because the image ships only the browser builds for its own
Playwright release. The Dockerfile fails the build if they drift apart.

Build the image:

```bash
docker build -t playwright-tests:latest .
```

Run the full suite:

```bash
docker run --init --ipc=host --rm playwright-tests:latest
```

Run a subset with CI retries and copy the HTML report out of the container:

```bash
docker run --init --ipc=host --rm -e CI=true \
  -v "$PWD/playwright-report:/app/playwright-report" \
  playwright-tests:latest npx playwright test tests/e2e --project=chromium
```

### Why `--init`

Without an init process, `npx playwright test` runs as PID 1. PID 1 does not
get the kernel's default signal handling (no automatic reaping of orphaned
child processes, and `SIGTERM` from `docker stop` is not forwarded to the
children Playwright spawned). `--init` injects a tiny init (tini) that reaps
zombie browser/driver processes and forwards signals, so the suite starts
cleanly and stops promptly.

### Why `--ipc=host`

Chromium uses `/dev/shm` as shared memory for its renderer processes. Docker
caps `/dev/shm` at 64 MB by default, which makes Chromium renderers crash
mid-test and surfaces as `Target page, context or browser has been closed` or
`Failed to start browser process`. `--ipc=host` lets the container use the
host's IPC namespace, removing the cap. If you cannot share the host IPC
namespace, use `--shm-size=2gb` instead.

### Notes

- The container runs as `pwuser` (non-root), which keeps Chromium's sandbox
  enabled. Do not run it as root unless you also pass `--no-sandbox` via
  Playwright launch options; that disables a key security boundary.
- `-e CI=true` enables the CI behaviour already defined in
  `playwright.config.ts` (2 retries, 1 worker, `forbidOnly`).
- Test artifacts (`test-results/`, `playwright-report/`) are written inside the
  container; mount a volume if you need them after the container exits.

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