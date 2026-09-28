# Story 7.2: Semantic Calculator Layout & CSS Styling

## Status: Planned
## Epic: Epic 7 — Interactive Print Estimator & WhatsApp Quote Engine

---

## 1. Description
Implement a responsive, semantic HTML5 `<section id="calculator" class="calculator-section">` located between `#portfolio` and `#services`, along with CSS styling supporting product tabs, quantity range sliders / numeric steppers, option pill selectors, a live summary receipt card, and WCAG 2.1 AA compliant contrast and focus rings.

---

## 2. Acceptance Criteria

### AC-1: Semantic Section Landmark & Layout Architecture
- `<section id="calculator" class="calculator-section" aria-labelledby="calc-heading">` containing:
  - Header with title *"Instant Print & Branding Cost Estimator"* and subtitle *"Configure your project specifications for an immediate commercial cost estimate"*.
  - 2-Column Responsive Layout:
    - Left Column: Interactive Configuration Form (`.calc-form-container`).
    - Right Column: Sticky Live Summary & Quote Receipt Card (`.calc-summary-card`).

### AC-2: Interactive Product Tabs & Form Controls
- Semantic tablist / radio buttons to select active product (`business-cards`, `brochures`, `t-shirts`, `banners`).
- Dynamic option fieldsets (rendered or toggled depending on active product).
- Ergonomic quantity input with synchronized range slider and number input field, plus quick-preset buttons (e.g. `[100] [250] [500] [1000]`).
- Checkbox / Toggle for Turnaround Speed (*Standard: 3–5 Days* vs *Rush: 24–48 Hours*).

### AC-3: Live Summary Receipt Card & Accessibility
- Summary card featuring:
  - Selected product name and specification badges.
  - Itemized pricing lines (Unit Price, Subtotal, Volume Savings Badge, Turnaround surcharge).
  - Prominent Total Estimated Price display formatted in Naira.
  - Live region `aria-live="polite"` on dynamic totals.
  - Disclaimer text: *"Estimated cost only. Final quote confirmed upon artwork & file specification check."*

### AC-4: Mobile-First Responsive CSS & Design Tokens
- Modern CSS using design tokens (`--color-primary`, `--color-surface`, `--color-charcoal`, `--shadow-md`, `--radius-lg`).
- Responsive breakpoint transitions: 1 column on mobile viewports (<900px), 2-column side-by-side on desktop (>=900px).
- High-contrast focus rings (`:focus-visible`) and minimum 44px touch targets for mobile accessibility.
