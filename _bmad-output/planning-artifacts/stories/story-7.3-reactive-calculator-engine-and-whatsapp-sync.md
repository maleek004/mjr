# Story 7.3: Reactive Calculator Event Engine & WhatsApp Quote Sync

## Status: Planned
## Epic: Epic 7 — Interactive Print Estimator & WhatsApp Quote Engine

---

## 1. Description
Integrate the calculator's reactive runtime state engine into `app.js` via event delegation, synchronizing input changes (`input`, `change`, `click`), dynamically re-rendering available product options and calculating live totals, and generating a 1-click RFC 3986 WhatsApp quote payload.

---

## 2. Acceptance Criteria

### AC-1: Centralized Event Delegation for Calculator
- Single delegated listener on `#calculator` (or `document`) catching `input`, `change`, and `click` actions:
  - Switching product tabs updates `calculatorState.productId`, reconfigures available option controls, resets default quantities, and recalibrates estimates.
  - Moving the quantity slider or typing into the number input updates `calculatorState.quantity` with bi-directional synchronization.
  - Toggling options (size, pages, lamination, turnaround) updates `calculatorState.options` and immediately triggers `updateCalculatorSummary()`.

### AC-2: Real-Time DOM Summary Synchronization
- Function `updateCalculatorSummary()` reads active state, runs `calculateEstimate()`, and updates DOM elements in place:
  - Unit base price, line items, volume savings percentage and Naira amount.
  - `#calc-total-amount` updated with localized currency.
  - Formats volume discount badge (e.g. `🎉 15% Volume Discount Applied!`).

### AC-3: Itemized WhatsApp URL Dispatch
- Primary CTA button `"Request Official Quote on WhatsApp"` dynamically updates `href` or dispatches `generateWhatsAppUrl()` with context payload:
  ```text
  Hi MJr Designs, I generated a quote on your website calculator:
  • Product: [Product Title]
  • Quantity: [X] units
  • Specifications: [Option 1, Option 2, ...]
  • Turnaround: [Standard / Express 24-48 hrs]
  • Estimated Total: ₦[Amount]

  Please review my configuration and let me know the next steps.
  ```
- Includes `target="_blank"` and `rel="noopener noreferrer"` for security.

### AC-4: Navigation Link Synchronization
- Update desktop and mobile navigation menus to include an anchor link to `#calculator` (*"Pricing"* or *"Estimator"*).
