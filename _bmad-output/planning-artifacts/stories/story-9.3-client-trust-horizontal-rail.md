# Story 9.3: Client Trust Matrix Horizontal Scroll-Snap Rail

## Status: Ready to Implement
## Epic: Epic 9 — Mobile Viewport Horizontalization & Zero-Fatigue Swipe Layouts

---

## 1. Description
Convert the mobile rendering of the 8 client pedigree partner cards in the `#about` section (`#clients-root .client-trust-grid`) from a tall 2x4 vertical grid into a compact, single-row horizontal swipe rail with native CSS scroll snap points (`scroll-snap-type: x mandatory`). This eliminates ~600px of mobile vertical scroll fatigue while maintaining high-trust social proof.

---

## 2. Acceptance Criteria

### AC-1: CSS Horizontal Scroll-Snap Track (`styles.css`)
- On mobile screens ($< 640\text{px}$), `.client-trust-grid` renders with `display: flex; flex-direction: row; overflow-x: auto; scroll-snap-type: x mandatory; scroll-padding: 0 16px; -webkit-overflow-scrolling: touch;`.
- `.client-card` is styled with `flex: 0 0 calc(60vw - 16px); min-width: 180px; max-width: 240px; scroll-snap-align: center;`, displaying a peek of the subsequent partner card.
- Edge-to-edge bleed margins (`margin-left: calc(-1 * var(--space-md)); margin-right: calc(-1 * var(--space-md)); padding: 8px 16px 16px;`).
- Custom slim scrollbar styling (`scrollbar-width: thin`, `scrollbar-color: var(--color-primary-subtle) transparent`).

### AC-2: Mobile Swipe Affordance Hint (`index.html` & `styles.css`)
- Displays an accessible badge `<div class="mobile-swipe-hint" aria-hidden="true"><span>👈 Swipe to view partners 👉</span></div>` above `.client-trust-grid`.
- Hidden on desktop viewports ($\ge 768\text{px}$) via `display: none !important`.

### AC-3: Desktop Responsive Grid Restoration
- On viewports $\ge 640\text{px}$, `.client-trust-grid` smoothly restores to `display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); overflow-x: visible; margin-left: 0; margin-right: 0; padding: 0;`.
- `.client-card` resets to `flex: initial; max-width: none; scroll-snap-align: none;`.
