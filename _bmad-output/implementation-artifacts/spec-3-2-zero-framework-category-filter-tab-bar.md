---
title: 'Story 3.2: Zero-Framework Category Filter Tab Bar (Event Delegation)'
type: 'feature'
created: '2026-09-26'
status: 'done'
route: 'dispatch'
review_loop_iteration: 0
context:
  - '_bmad-output/planning-artifacts/stories/story-3.2-zero-framework-category-filter-tab-bar.md'
  - '_bmad-output/planning-artifacts/epics.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Visitors looking for specific service solutions (such as custom apparel, corporate identity, or high-volume publications) had to visually sift through all portfolio cards without any way to filter down to relevant case studies, causing cognitive friction and slowing qualification.

**Approach:** Implement a zero-framework reactive category filter engine powered by centralized event delegation on `document.body` (`e.target.closest('[data-action="filter-category"]')`), dynamic unidirectional state updates (`state.activeCategory`), ARIA tab accessibility synchronization (`role="tablist"`, `role="tab"`, `aria-selected`), and smooth CSS opacity/visibility transitions (`.portfolio-card.is-hidden`).

## Boundaries & Constraints

**Always:**
- Keep all client runtime code 100% vanilla ES6+ JavaScript, HTML5, and CSS3 without external npm/CDN libraries (AD-1).
- Use a single centralized event delegation root on `document` rather than attaching individual listeners to buttons (AD-3).
- Maintain unidirectional state flow from `state.activeCategory` to the DOM (AD-2).
- Update ARIA attributes (`aria-selected="true"|"false"`, `aria-hidden="true"`) and `tabindex="-1"` on hidden card focusables for WCAG 2.1 AA accessibility (NFR-106).
- Support `prefers-reduced-motion: reduce` by disabling transitions.

**Never:**
- Attach direct event listeners to individual filter tab buttons.
- Mutate `PORTFOLIO_DATA` during filtering operations (DOM display classes only).
- Leave keyboard focus traps inside hidden portfolio cards.
- Add AI tracking tags or workflow metadata in code comments.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Category Filter Click | User clicks `.filter-btn` with `data-category="apparel"` | Root listener delegates to `filterPortfolio('apparel')`, updates `state.activeCategory`, marks apparel tab `active`/`aria-selected="true"`, shows only matching cards, hides non-matching cards | Unrecognized categories default gracefully to `'all'` |
| All Projects Reset | User clicks `data-category="all"` | All 6 portfolio cards have `.is-hidden` removed and restore full opacity/scale | Grid reflows smoothly |
| Keyboard Tab Navigation | User tabs into filter bar and activates tab via Space/Enter | Filter activates identically to click; focus outline remains clearly visible | Buttons maintain minimum 48px touch target |
| Hidden Card Focus Prevention | Card receives `.is-hidden` | Child interactive buttons/links receive `tabindex="-1"` and `aria-hidden="true"` | Restored to normal tabindex when visible |

</frozen-after-approval>

## Code Map

- `index.html` -- Add `id="filter-tab-*"` and `aria-controls="portfolio-grid"` to filter buttons inside `.portfolio-filter-bar`.
- `styles.css` -- Add `.portfolio-card.is-hidden` rule (`display: none !important; opacity: 0; transform: scale(0.95); pointer-events: none;`) and include `opacity` in `.portfolio-card` transition property.
- `app.js` -- Add `case 'filter-category'` in root event delegation switch and implement `filterPortfolio(targetCategory)` function managing `state.activeCategory`, tab ARIA synchronization, and DOM card visibility toggling.

## Tasks & Acceptance

**Execution:**
- [x] `index.html` -- Added accessible IDs and `aria-controls="portfolio-grid"` on all category filter buttons.
- [x] `styles.css` -- Configured `.portfolio-card.is-hidden` rules and opacity transition for fluid filtering animations.
- [x] `app.js` -- Added event delegation handler for `filter-category` and implemented `filterPortfolio()` with ARIA tab sync and focus management.
- [x] `_bmad-output/test-artifacts/story-3.2.test.mjs` -- Authored 4 automated tests verifying tab markup, delegation routing, DOM filtering logic, and CSS classes.

**Acceptance Criteria:**
- Given the portfolio section, when clicking any filter tab (`All`, `Brand Identity`, `Publications`, `Marketing`, `Custom Apparel`), then event delegation catches the event via `e.target.closest('[data-action="filter-category"]')`.
- Given the selected category, then the active tab updates with `aria-selected="true"` and `.active` class while siblings are marked `aria-selected="false"`.
- Given matching and non-matching cards, then matching cards remain visible while non-matching cards receive `.is-hidden` with `display: none` and `tabindex="-1"`.
- Given the `All Projects` tab is clicked, then all 6 case study cards are visible.

## Implementation Notes

- Fully implemented `filterPortfolio(targetCategory)` in `app.js`, updating `state.activeCategory` and synchronizing `.filter-btn` and `.portfolio-card` elements in the DOM.
- Integrated `case 'filter-category'` directly into the top-level `document.addEventListener('click', ...)` delegator, adhering to AD-3.
- Set `tabindex="-1"` and `aria-hidden="true"` on hidden card children, ensuring complete keyboard accessibility compliance.
- Added smooth opacity and transform transitions in `styles.css` alongside `@media (prefers-reduced-motion: reduce)` overrides.
- Validated with 4 automated test suites in `_bmad-output/test-artifacts/` (16 tests total, 100% pass rate).

## Verification

**Commands:**
- `node --test _bmad-output/test-artifacts/story-3.2.test.mjs` -- 4/4 assertions pass.
- `node --test _bmad-output/test-artifacts/*.test.mjs` -- 16/16 assertions pass across all 4 suites.
