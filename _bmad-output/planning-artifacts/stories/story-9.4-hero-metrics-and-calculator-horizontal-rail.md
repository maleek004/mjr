# Story 9.4: Hero Metrics & Calculator Product Tabs Horizontal Snap Rail

## Status: Ready to Implement
## Epic: Epic 9 — Mobile Viewport Horizontalization & Zero-Fatigue Swipe Layouts

---

## 1. Description
Horizontalize the Hero proof metrics (`.hero-proof-metrics`) and ensure fluid horizontal scrolling for Calculator product switcher tabs (`.calc-product-tabs`) and quantity preset chips (`.calc-presets-row`). This prevents clumsy multi-line button wrapping on compact mobile devices ($< 640\text{px}$) and consolidates the hero fold into a single high-impact screen.

---

## 2. Acceptance Criteria

### AC-1: Hero Proof Metrics Horizontal Snap Track (`styles.css`)
- On mobile screens ($< 640\text{px}$), `.hero-proof-metrics` renders with `display: flex; flex-direction: row; overflow-x: auto; scroll-snap-type: x mandatory; scroll-padding: 0 16px; -webkit-overflow-scrolling: touch; gap: var(--space-sm); padding: 8px 16px 12px; margin-left: calc(-1 * var(--space-md)); margin-right: calc(-1 * var(--space-md)); scrollbar-width: none;`.
- `.proof-metric-card` scales to `flex: 0 0 calc(70vw - 16px); max-width: 260px; scroll-snap-align: center;`.
- On desktop viewports ($\ge 640\text{px}$), `.hero-proof-metrics` restores to `display: grid; grid-template-columns: repeat(3, 1fr); overflow-x: visible; margin-left: 0; margin-right: 0; padding: 0;` and `.proof-metric-card` resets to `flex: initial; max-width: none; scroll-snap-align: none;`.

### AC-2: Calculator Product Tabs & Preset Chips Horizontal Rail (`styles.css`)
- `.calc-product-tabs` renders with `flex-wrap: nowrap; overflow-x: auto; scroll-snap-type: x mandatory; scroll-padding: 0 12px; -webkit-overflow-scrolling: touch; scrollbar-width: none;` on mobile, allowing tabs to slide horizontally rather than stacking vertically.
- `.calc-product-tab` has `flex-shrink: 0; scroll-snap-align: start;`.
- `.calc-presets-row` allows smooth horizontal overflow on narrow screens without wrap jitter.

### AC-3: Accessibility & Touch Targets
- All buttons and tabs maintain $\ge 44\text{px}$ touch targets.
- Keyboard navigation (tabbing and arrow navigation) remains fully functional across all viewports.
