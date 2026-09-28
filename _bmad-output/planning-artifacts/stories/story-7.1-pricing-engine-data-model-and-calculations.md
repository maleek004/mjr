# Story 7.1: Pricing Engine Data Model & Calculation Rules

## Status: Planned
## Epic: Epic 7 — Interactive Print Estimator & WhatsApp Quote Engine

---

## 1. Description
Define a deeply immutable, type-safe JavaScript configuration object `PRICING_MODEL` and pure mathematical helper functions in `app.js` to compute dynamic commercial print estimates with tiered volume discounts, material finishes, turnaround speeds, and localized currency formatting.

---

## 2. Acceptance Criteria

### AC-1: Deeply Immutable `PRICING_MODEL` Object
- `PRICING_MODEL` contains structured definitions for 4 core print products:
  - `business-cards`: Base unit price, min/max quantity (100 to 5000), options for single/double-sided print and matte/gloss/spot-UV finishes.
  - `brochures`: Base unit price, min/max quantity (50 to 5000), page count options (8pp, 16pp, 24pp), and lamination finishes.
  - `t-shirts`: Base unit price, min/max quantity (20 to 1000), print locations (1-side, 2-sides), fabric weight modifiers.
  - `banners`: Base unit price, min/max quantity (1 to 50), stand type (Standard Base, Luxury Broad Base).
- Frozen via `Object.freeze()` (recursively or shallow) to prevent runtime mutation bugs.

### AC-2: Tiered Volume Discount Algorithm
- Function `calculateVolumeDiscount(productId, quantity)` returns the fractional discount (e.g. `0.0`, `0.05`, `0.10`, `0.15`, `0.20`) based on scale thresholds:
  - Higher quantities unlock proportional unit discounts reflecting commercial print economies of scale.

### AC-3: Pure Estimate Calculation Function
- Function `calculateEstimate({ productId, quantity, options, isRush })`:
  - Validates and clamps quantity between product `min` and `max`.
  - Computes:
    $$\text{Unit Base} = \text{Product Base} + \sum \text{Option Modifiers}$$
    $$\text{Subtotal} = \text{Unit Base} \times \text{Quantity}$$
    $$\text{Discount Amount} = \text{Subtotal} \times \text{Discount Rate}$$
    $$\text{Discounted Total} = \text{Subtotal} - \text{Discount Amount}$$
    $$\text{Final Total} = \text{Discounted Total} \times (\text{isRush} ? 1.25 : 1.0)$$
  - Returns an itemized breakdown object: `{ unitPrice, subtotal, discountRate, discountAmount, rushFee, finalTotal }`.

### AC-4: Localized Currency Formatter
- Function `formatCurrency(amount)` uses `Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 })` with a safe fallback to `₦${amount.toLocaleString()}` for robust cross-environment execution.
