const { test, expect } = require('@playwright/test');

test.describe('Sign Up form validation after valid email', () => {
  test.setTimeout(60000);

  async function visibleText(page, regex) {
    await expect(
      page.getByText(regex).filter({ visible: true }).first()
    ).toBeVisible();
  }

  async function goToSignupForm(page) {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('https://www.almashines.com/dtc/account');

    await visibleText(page, /Signup\s*\/\s*Login/i);

    const email = `qa${Date.now()}${Math.floor(Math.random() * 1000)}@gmail.com`;

    const emailInput = page.locator('input').filter({ visible: true }).last();
    await emailInput.fill(email);

    const box = await emailInput.boundingBox();
    await page.mouse.click(box.x + box.width + 30, box.y + box.height / 2);

    await visibleText(page, /^Sign Up$/i);

    return email;
  }

  async function getSignupInputs(page) {
    const inputs = page.locator('input').filter({ visible: true });

    return {
      firstName: inputs.nth(0),
      lastName: inputs.nth(1),
      email: inputs.nth(2),
      password: page.locator('input[type="password"]').nth(0),
      confirmPassword: page.locator('input[type="password"]').nth(1)
    };
  }

  async function clickSignUp(page) {
    await page.getByRole('button', { name: /SIGN UP/i }).click();
    await page.waitForTimeout(1000);
  }

  async function expectStillOnSignupForm(page) {
    await visibleText(page, /^Sign Up$/i);
    await expect(page.getByText(/Verify OTP/i)).toHaveCount(0);
  }

  test('TC-05 | Click Sign Up without first name', async ({ page }) => {
    await goToSignupForm(page);
    const form = await getSignupInputs(page);

    await form.lastName.fill('SENAN');
    await form.password.fill('Saran@123');
    await form.confirmPassword.fill('Saran@123');

    await clickSignUp(page);

    await expectStillOnSignupForm(page);
    await visibleText(page, /First Name/i);
  });

  test('TC-06 | Click Sign Up without first name and last name', async ({ page }) => {
    await goToSignupForm(page);
    const form = await getSignupInputs(page);

    await form.password.fill('Saran@123');
    await form.confirmPassword.fill('Saran@123');

    await clickSignUp(page);

    await expectStillOnSignupForm(page);
    await visibleText(page, /First Name/i);
    await visibleText(page, /Last Name/i);
  });

  test('TC-07 | Click Sign Up after clearing valid email', async ({ page }) => {
    await goToSignupForm(page);
    const form = await getSignupInputs(page);

    await form.firstName.fill('SARAN');
    await form.lastName.fill('SENAN');
    await form.email.fill('');
    await form.password.fill('Saran@123');
    await form.confirmPassword.fill('Saran@123');

    await clickSignUp(page);

    await expectStillOnSignupForm(page);
    await visibleText(page, /E-mail/i);
  });

  test('TC-08 | Click Sign Up without confirm password', async ({ page }) => {
    await goToSignupForm(page);
    const form = await getSignupInputs(page);

    await form.firstName.fill('SARAN');
    await form.lastName.fill('SENAN');
    await form.password.fill('Saran@123');

    await clickSignUp(page);

    await expectStillOnSignupForm(page);
    await visibleText(page, /Re-type password/i);
  });

  test('TC-09 | Click Sign Up without password', async ({ page }) => {
    await goToSignupForm(page);
    const form = await getSignupInputs(page);

    await form.firstName.fill('SARAN');
    await form.lastName.fill('SENAN');
    await form.confirmPassword.fill('Saran@123');

    await clickSignUp(page);

    await expectStillOnSignupForm(page);
    await visibleText(page, /Password/i);
  });

  test('TC-10 | Click Sign Up without filling anything', async ({ page }) => {
    await goToSignupForm(page);
    const form = await getSignupInputs(page);

    await form.firstName.fill('');
    await form.lastName.fill('');
    await form.email.fill('');
    await form.password.fill('');
    await form.confirmPassword.fill('');

    await clickSignUp(page);

    await expectStillOnSignupForm(page);
    await visibleText(page, /First Name/i);
    await visibleText(page, /Last Name/i);
    await visibleText(page, /E-mail/i);
    await visibleText(page, /Password/i);
    await visibleText(page, /Re-type password/i);
  });

});