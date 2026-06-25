const { test, expect } = require('@playwright/test');

test('TC-01 | Almashine page loads successfully', async ({ page }) => {
  await page.goto('https://www.almashines.com/dtc/account');
  await page.waitForTimeout(2000);
});