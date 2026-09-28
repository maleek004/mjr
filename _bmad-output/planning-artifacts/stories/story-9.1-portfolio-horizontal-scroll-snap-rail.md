# Story 9.1: Portfolio Section Horizontal Scroll-Snap Card Rail

## Status: Complete
## Epic: Epic 9 — Mobile Viewport Horizontalization & Zero-Fatigue Swipe Layouts

---

## 1. Description
Transform the mobile rendering of the `#portfolio` case study grid from a heavy vertical column into an ergonomic, swipeable horizontal scroll-snap rail (`scroll-snap-type: x mandatory`). On mobile screens ($< 768\text{px}$), each card occupies 85% of the viewport width with the adjacent card peeking in from the side, providing an intuitive swipe affordance that reduces vertical scroll depth by over 3,000 pixels.

---

## 2. Acceptance Criteria

### AC-1: CSS Horizontal Scroll-Snap Track (`styles.css`)
- On mobile viewports ($< 768\text{px}$), `.portfolio-grid` renders with `display: flex; flex-direction: row; overflow-x: auto; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch;`.
- `.portfolio-card` scales to `flex: 0 0 calc(85vw - 16px)` with `scroll-snap-align: center`, displaying a 15% visual peek of the subsequent case study.
- Custom ultra-slim, accessible scrollbar styling (`scrollbar-width: thin`, `scrollbar-color: var(--color-primary-subtle) transparent`).

### AC-2: Visual Mobile Swipe Affordance Hint (`index.html` & `styles.css`)
- Displays an accessible badge `<div class="mobile-swipe-hint" aria-hidden="true"><span>👈 Swipe to explore proofs 👉</span></div>` above the grid on mobile viewports.
- Hidden on desktop viewports ($\ge 768\text{px}$) via `display: none !important`.

### AC-3: Filter State Scroll Reset (`app.js`)
- When a user selects a category filter tab (*All, Brand Identity, Publications, Marketing, Apparel*), `filterPortfolio()` smoothly scrolls the track back to `scrollLeft = 0` so filtered results start at the beginning.

### AC-4: Desktop 2D/3D Grid Integrity
- On screens $\ge 768\text{px}$, `.portfolio-grid` gracefully expands back to its responsive multi-column CSS grid (`display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr))`) without horizontal scrollbars.
