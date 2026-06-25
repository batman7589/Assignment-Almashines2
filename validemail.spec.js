const { test, expect } = require('@playwright/test');

test('TC-03 | Verify signup flow till OTP page', async ({ page }) => {
  test.setTimeout(60000);

  await page.setViewportSize({ width: 1920, height: 1080 });

  await page.goto('https://www.almashines.com/dtc/account');

  async function verifyTextRegex(regex) {
    await expect(
      page.getByText(regex).filter({ visible: true }).first()
    ).toBeVisible();
  }

  await expect(page).toHaveTitle(/Sign In \/ Sign Up/i);

  await verifyTextRegex(/Signup\s*\/\s*Login/i);
  await verifyTextRegex(/Test Platform/i);
  await verifyTextRegex(/Sign up or log in to stay connected with your community/i);
  await verifyTextRegex(/Choose any one of the following\s*to Signup\/Login/i);
  await verifyTextRegex(/CONNECT\s+WITH\s+FACEBOOK/i);
  await verifyTextRegex(/CONNECT\s+WITH\s+GOOGLE/i);
  await verifyTextRegex(/CONNECT\s+WITH\s+LINKEDIN/i);
  await verifyTextRegex(/^OR$/i);

  const emailInput = page.locator('input').filter({ visible: true }).last();

  await emailInput.fill('thesara@gmail.com');
  await emailInput.press('Enter');

  await verifyTextRegex(/^Sign Up$/i);
  await verifyTextRegex(/First Name/i);
  await verifyTextRegex(/Last Name/i);
  await verifyTextRegex(/E-mail/i);
  await verifyTextRegex(/Password/i);
  await verifyTextRegex(/Re-type password/i);

  await page.locator('input').filter({ visible: true }).nth(0).fill('SARAN');
  await page.locator('input').filter({ visible: true }).nth(1).fill('SENAN');

  await page.locator('input[type="password"]').nth(0).fill('Password@123');
  await page.locator('input[type="password"]').nth(1).fill('Password@123');

  await page.getByRole('button', { name: /SIGN UP/i }).click();

  await verifyTextRegex(/Verify OTP/i);
  await verifyTextRegex(/Enter OTP/i);
  await verifyTextRegex(/One Time Password/i);
  await verifyTextRegex(/registered email/i);
  await verifyTextRegex(/Resend OTP/i);

  await expect(page.getByRole('button', { name: /VERIFY/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /BACK/i })).toBeVisible();
});