const { test, expect } = require('@playwright/test');

test('TC-02 | Verify Signup/Login page content', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });

  await page.goto('https://www.almashines.com/dtc/account');

  await expect(page).toHaveURL(/.*\/dtc\/account/);
  await expect(page).toHaveTitle(/Sign In \/ Sign Up/i);

  async function verifyText(text) {
    await expect(
      page.getByText(text, { exact: true }).filter({ visible: true }).first()
    ).toBeVisible();
  }

  async function verifyTextRegex(regex) {
    await expect(
      page.getByText(regex).filter({ visible: true }).first()
    ).toBeVisible();
  }

  await verifyText('Signup / Login');

  await verifyText('News & Stories');
  await verifyText('Events');
  await verifyText('Batchmates');
  await verifyText('Find Alumni');
  await verifyText('Careers');
  await verifyText('About');
  await verifyText('Alumni Mentorship');

  await verifyTextRegex(/JOIN\s*\/\s*LOGIN/i);

  await verifyText('Test Platform');

  await verifyTextRegex(/Sign up or log in to stay connected with your community/i);

  await verifyTextRegex(/Choose any one of the following\s*to Signup\/Login/i);

  await verifyTextRegex(/CONNECT\s+WITH\s+FACEBOOK/i);
  await verifyTextRegex(/CONNECT\s+WITH\s+GOOGLE/i);
  await verifyTextRegex(/CONNECT\s+WITH\s+LINKEDIN/i);

  await verifyText('OR');

  const emailInput = page.locator(
    'input[type="email"], input[placeholder*="Email"], input[placeholder*="email"], input[name*="email"], input[id*="email"]'
  ).filter({ visible: true }).first();

  await expect(emailInput).toBeVisible();
  await expect(emailInput).toBeEditable();
});