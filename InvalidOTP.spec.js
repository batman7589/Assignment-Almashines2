const { test, expect } = require('@playwright/test');

test.describe('OTP Page Validation', () => {
  test.setTimeout(60000);

  async function goToOTPPage(page) {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('https://www.almashines.com/dtc/account');

    const emailInput = page.locator('input').filter({ visible: true }).last();
    const uniqueEmail = `qa${Date.now()}@gmail.com`;
    await emailInput.fill(uniqueEmail);

    const box = await emailInput.boundingBox();
    await page.mouse.click(box.x + box.width + 30, box.y + box.height / 2);

    await expect(page.getByText(/^Sign Up$/i).first()).toBeVisible({ timeout: 10000 });

    const inputs = page.locator('input').filter({ visible: true });
    await inputs.nth(0).fill('SARAN');
    await inputs.nth(1).fill('SENAN');
    await page.locator('input[type="password"]').nth(0).fill('Saran@123');
    await page.locator('input[type="password"]').nth(1).fill('Saran@123');

    await page.getByRole('button', { name: /SIGN UP/i }).click();
    await page.waitForTimeout(3000);

    await expect(page.getByText(/Verify OTP/i)).toBeVisible({ timeout: 10000 });

    return uniqueEmail;
  }

  async function verifyAndDismissSwalError(page) {
    await expect(page.locator('.swal-title')).toBeVisible({ timeout: 8000 });
    await expect(page.locator('.swal-title')).toHaveText(/OTP verification failed/i);
    await expect(page.locator('.swal-text')).toHaveText(/Invalid Code/i);

    // Click OK and wait for the overlay to lose its active class
    await page.locator('.swal-button--confirm').click();
    await page.waitForTimeout(2000);

    // The overlay stays in DOM but loses the active class when dismissed
    await expect(
      page.locator('.swal-overlay--show-modal')
    ).toHaveCount(0, { timeout: 5000 });
  }

  test('TC-12 | Enter invalid OTP shows OTP verification failed', async ({ page }) => {
    await goToOTPPage(page);

    const otpInput = page.locator('input').filter({ visible: true }).first();
    await otpInput.fill('000000');

    await page.getByRole('button', { name: /VERIFY/i }).click();
    await page.waitForTimeout(2000);

    await verifyAndDismissSwalError(page);

    // Confirm still on OTP page after dismissing
    await expect(page.getByText(/Verify OTP/i)).toBeVisible();
  });

  test('TC-13 | Special characters in OTP field shows OTP verification failed', async ({ page }) => {
    await goToOTPPage(page);

    const otpInput = page.locator('input').filter({ visible: true }).first();
    await otpInput.fill('!@#$%^&*()');

    await page.getByRole('button', { name: /VERIFY/i }).click();
    await page.waitForTimeout(2000);

    await verifyAndDismissSwalError(page);

    // Confirm still on OTP page after dismissing
    await expect(page.getByText(/Verify OTP/i)).toBeVisible();
  });

  test('TC-14 | Resend OTP button works', async ({ page }) => {
    await goToOTPPage(page);

    const resendButton = page.getByText(/Resend OTP/i);
    await expect(resendButton).toBeVisible();

    await resendButton.click();
    await page.waitForTimeout(2000);

    await expect(page.getByText(/Verify OTP/i)).toBeVisible();

    const otpInput = page.locator('input').filter({ visible: true }).first();
    await expect(otpInput).toBeVisible();
    await expect(otpInput).toBeEnabled();
  });

  test('TC-15 | Registered email is displayed on OTP page', async ({ page }) => {
    await goToOTPPage(page);

    const shownEmail = await page.evaluate(() => {
      const els = [...document.querySelectorAll('p, span, div')];
      for (const el of els) {
        const match = el.innerText && el.innerText.match(/\(([^)]+@[^)]+)\)/);
        if (match) return match[1];
      }
      return null;
    });

    console.log('Email shown on OTP page:', shownEmail);
    expect(shownEmail).not.toBeNull();
    expect(shownEmail).toMatch(/@/);
  });

});