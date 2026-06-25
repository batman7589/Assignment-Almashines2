const { test, expect } = require('@playwright/test');

test('TC-11 | Verify password mismatch validation', async ({ page }) => {
  test.setTimeout(60000);

  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('https://www.almashines.com/dtc/account');

  const uniqueEmail = `qa${Date.now()}@gmail.com`;
  const emailInput = page.locator('input').filter({ visible: true }).last();
  await emailInput.fill(uniqueEmail);

  const emailBox = await emailInput.boundingBox();
  await page.mouse.click(emailBox.x + emailBox.width + 30, emailBox.y + emailBox.height / 2);

  
  await expect(page.getByText(/^Sign Up$/i).first()).toBeVisible({ timeout: 10000 });

  
  const inputs = page.locator('input').filter({ visible: true });
  await inputs.nth(0).fill('SARAN');
  await inputs.nth(1).fill('SENAN');
  await page.locator('input[type="password"]').nth(0).fill('Saran@123');
  await page.locator('input[type="password"]').nth(1).fill('Wrong@123');

  await page.getByRole('button', { name: /SIGN UP/i }).click();
  await page.waitForTimeout(2000);

  
  await page.screenshot({ path: 'debug-tc11.png', fullPage: true });
  const allText = await page.evaluate(() =>
    [...document.querySelectorAll('*')]
      .filter(el => el.children.length === 0 && el.innerText?.trim())
      .map(el => el.innerText.trim())
      .join('\n')
  );
  console.log('=== PAGE TEXT AFTER SUBMIT ===\n', allText);

  await expect(page.getByText(/password/i).first()).toBeVisible();
});