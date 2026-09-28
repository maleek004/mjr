# Story 8.3: ES6 Code Generator, LocalStorage Sync & JSON Export/Import

## Status: Planned
## Epic: Epic 8 — Standalone Admin Pricing Center & Visual Code Configurator

---

## 1. Description
Implement the code generation and export capabilities in `admin.js`, along with a local storage override adapter in `app.js`. This allows the admin to generate clean ES6+ code ready to paste into `app.js`, save changes directly to `localStorage` for instant testing on `index.html`, download/upload JSON backup files, and easily reset to factory defaults.

---

## 2. Acceptance Criteria

### AC-1: Clean ES6+ Code Generator
- Function `generateES6PricingCode(model)` generates a formatted, syntax-valid ES6 JavaScript code block (`const PRICING_MODEL = Object.freeze({...});`).
- Displays the generated code in an accessible modal or drawer with a 1-click **"Copy to Clipboard"** button and visual toast confirmation.

### AC-2: LocalStorage Persistence & Live Site Override
- Button **"Save & Apply to Local Website"** writes the current configuration to `localStorage.setItem('mjr_custom_pricing', JSON.stringify(model))`.
- In `app.js`, initialization checks for `localStorage.getItem('mjr_custom_pricing')` and gracefully merges valid custom pricing over default `PRICING_MODEL`, allowing instant live testing without editing files.

### AC-3: JSON Import, Export & Factory Reset
- **Export JSON**: Downloads `mjr-pricing-config.json` with formatted JSON content.
- **Import JSON**: File picker or text area allowing upload of previously saved configurations with schema validation.
- **Reset to Baseline**: Restores original baseline pricing, clears `localStorage`, and updates the form and sandbox.

### AC-4: Navigation Link in Main Site
- Discrete, professional administrative link in `index.html` footer (*"Admin Pricing Configurator"* or lock icon) pointing to `admin.html`.
