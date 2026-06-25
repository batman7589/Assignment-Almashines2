const { test, expect } = require('@playwright/test');

test('TC-16 | Already registered email shows E-mail login form', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('https://www.almashines.com/dtc/account');

  const emailInput = page.locator('input').filter({ visible: true }).last();
  await emailInput.fill('thesaransenan@gmail.com');
  await emailInput.press('Enter');

  await expect(page.getByText(/E-mail login/i)).toBeVisible({ timeout: 10000 });

  const emailField = page.locator('input[type="email"], input[ng-model*="email"]').first();
  
  await expect(emailField).toHaveValue('thesaransenan@gmail.com');
  await expect(page.locator('input[type="password"]')).toBeVisible();
  await expect(page.getByRole('button', { name: /LOGIN/i })).toBeVisible();
  await expect(page.getByText(/Login with OTP/i).first()).toBeVisible();
  await expect(page.getByText(/Forgot password/i).first()).toBeVisible();
});