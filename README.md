# Almashines Automation Test Suite

Automated end-to-end tests for [Almashines](https://www.almashines.com/dtc/account) using [Playwright](https://playwright.dev/).

---

## Project Structure

```
almashines-assessment/
├── tests/
│   ├── Gotoalamashinepage.spec.js       # TC-01: Page load
│   ├── Verifycontentalamshine.spec.js   # TC-02: Page content verification
│   ├── validemail.spec.js               # TC-03: Valid email signup flow
│   ├── invailemail.spec.js              # TC-04: Invalid email validation
│   ├── signupvalidations.spec.js        # TC-05 to TC-10: Sign Up form validations
│   ├── Wrongpasswordvalidation.spec.js  # TC-11: Password mismatch validation
│   ├── InvalidOTP.spec.js               # TC-12 to TC-15: OTP page validations
│   └── Registeredmail.spec.js           # TC-16: Already registered email login form
├── playwright.config.js
├── package.json
└── README.md
```

---

## Test Cases

### Page Load & Content
| TC | File | Description |
|----|------|-------------|
| TC-01 | `Gotoalamashinepage.spec.js` | Verify Almashines page loads successfully |
| TC-02 | `Verifycontentalamshine.spec.js` | Verify all content on Signup/Login page |

### Email Entry
| TC | File | Description |
|----|------|-------------|
| TC-03 | `validemail.spec.js` | Valid email triggers Sign Up form and reaches OTP page |
| TC-04 | `invailemail.spec.js` | Invalid email (no @) shows validation error |

### Sign Up Form Validations
| TC | File | Description |
|----|------|-------------|
| TC-05 | `signupvalidations.spec.js` | Sign Up without first name shows error |
| TC-06 | `signupvalidations.spec.js` | Sign Up without first name and last name shows errors |
| TC-07 | `signupvalidations.spec.js` | Sign Up after clearing email shows error |
| TC-08 | `signupvalidations.spec.js` | Sign Up without confirm password shows error |
| TC-09 | `signupvalidations.spec.js` | Sign Up without password shows error |
| TC-10 | `signupvalidations.spec.js` | Sign Up with all fields empty shows all errors |

### Password Validation
| TC | File | Description |
|----|------|-------------|
| TC-11 | `Wrongpasswordvalidation.spec.js` | Mismatched passwords show validation error |

### OTP Page Validations
| TC | File | Description |
|----|------|-------------|
| TC-12 | `InvalidOTP.spec.js` | Invalid OTP shows "OTP verification failed" dialog |
| TC-13 | `InvalidOTP.spec.js` | Special characters in OTP show "OTP verification failed" dialog |
| TC-14 | `InvalidOTP.spec.js` | Resend OTP button keeps user on OTP page |
| TC-15 | `InvalidOTP.spec.js` | Registered email is displayed on OTP page |

### Registered Email
| TC | File | Description |
|----|------|-------------|
| TC-16 | `Registeredmail.spec.js` | Already registered email shows E-mail login form with password field |

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm

---

## Setup

**1. Clone the repository and install dependencies:**
```bash
npm install
npx playwright install
```

**2. Install Chromium browser:**
```bash
npx playwright install chromium
```

---

## Running Tests

**Run all tests:**
```bash
npx playwright test
```

**Run a specific file:**
```bash
npx playwright test tests/InvalidOTP.spec.js
```

**Run a specific test case by name:**
```bash
npx playwright test --grep "TC-12"
```

**Run tests in headed mode (see the browser):**
```bash
npx playwright test --headed
```

**View HTML report after run:**
```bash
npx playwright show-report
```

---

## Configuration

Tests run in **headed Chromium** by default (`headless: false` in `playwright.config.js`).

To run headless, open `playwright.config.js` and change:
```js
headless: false  →  headless: true
```

---

## Notes

- Each test that requires sign up uses a **unique email** (`qa<timestamp>@mailinator.com`) to avoid conflicts with already-registered accounts.
- TC-16 uses `thesaransenan@gmail.com` which is a pre-registered account on the platform.
- OTP tests (`TC-12` to `TC-15`) navigate to the OTP page by completing a fresh sign up — no real OTP is entered.
