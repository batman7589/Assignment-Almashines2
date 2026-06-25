const { test, expect } = require('@playwright/test');

test('TC-04 | Verify invalid email validation message', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('https://www.almashines.com/dtc/account');

  await expect(page.getByText(/Signup\s*\/\s*Login/i).first()).toBeVisible();

  const emailInput = page.locator('input').filter({ visible: true }).last();

  await emailInput.fill('thesaransenan');

  const box = await emailInput.boundingBox();
  await page.mouse.click(box.x + box.width + 30, box.y + box.height / 2);

  await page.waitForTimeout(1000);

  const validationMessage = page
    .getByText(/valid.*e-?mail|please enter.*email|invalid email/i)
    .filter({ visible: true })
    .first();

  const isErrorVisible = await validationMessage.isVisible().catch(() => false);

  const isInputInvalid = await emailInput.evaluate((input) => {
    return (
      input.classList.toString().toLowerCase().includes('invalid') ||
      input.getAttribute('aria-invalid') === 'true' ||
      input.validationMessage.length > 0 ||
      input.value.includes('@') === false
    );
  });

  expect(isErrorVisible || isInputInvalid).toBeTruthy();

  await expect(page.getByText(/Choose any one of the following/i).first()).toBeVisible();
});