---
title: 'Story 3.1: JavaScript Portfolio Data Modeling & Card Grid Layout'
type: 'feature'
created: '2026-09-26'
status: 'done'
route: 'dispatch'
review_loop_iteration: 0
context:
  - '_bmad-output/planning-artifacts/stories/story-3.1-javascript-portfolio-data-modeling-and-card-grid-layout.md'
  - '_bmad-output/planning-artifacts/epics.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** The portfolio section currently contains a blank placeholder (`<div class="portfolio-placeholder" id="portfolio-root"></div>`), preventing visitors from evaluating MJr's proven client case studies and deliverables across brand identity, editorial publications, marketing billboards, and custom apparel.

**Approach:** Model an immutable JavaScript dataset (`PORTFOLIO_DATA`) in `app.js` representing 6 validated client case studies, build a secure dynamic DOM rendering engine (`renderPortfolioCards`) with HTML sanitization (`escapeHtml`), update `index.html` with the filter tab bar and portfolio grid container, and apply responsive 2D CSS Grid and hover elevation styling in `styles.css`.

## Boundaries & Constraints

**Always:**
- Keep all client runtime code 100% vanilla ES6+ JavaScript, HTML5, and CSS3 without external npm/CDN libraries (AD-1).
- Use `Object.freeze()` on `PORTFOLIO_DATA` to enforce immutability as the single source of truth (AD-2).
- Sanitize all injected data strings with `escapeHtml()` to eliminate XSS risks during dynamic DOM construction.
- Use CSS `aspect-ratio: 16 / 10` for media wrappers to eliminate Cumulative Layout Shift (CLS = 0).
- Maintain WCAG 2.1 AA text contrast (\(\ge 4.5:1\)) and distinct `:focus-visible` outlines on all interactive buttons.

**Never:**
- Hardcode case study cards directly into `index.html` (must be state-driven via `PORTFOLIO_DATA`).
- Introduce inline framework styling or external icon packages.
- Add AI tracking tags or workflow metadata in code comments.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Page Initialization | `DOMContentLoaded` event fires | `renderPortfolioCards(PORTFOLIO_DATA)` executes, populating `#portfolio-grid` with 6 semantic `<article class="portfolio-card">` elements | Fallback container structure if container missing |
| Scope Tag Rendering | Project with 4–5 tags in `project.scope` | Renders a flex list of `#Tag` chips inside `.portfolio-tag-list` | Gracefully handles empty or missing tag arrays |
| Metadata Action Binding | Primary & secondary card buttons | Render `data-action="open-modal"` with `data-project-id` and `data-action="whatsapp-inquire"` with `data-context` | Attributes escaped and sanitized |
| Responsive Viewport Reflow | Screen resized from 320px to 1440px | CSS Grid reflows from 1 column (\(<640\text{px}\)) to 2–3 columns on tablet/desktop with equal card heights | CSS Grid `repeat(auto-fit, minmax(320px, 1fr))` |

</frozen-after-approval>

## Code Map

- `index.html` -- Update `#portfolio` section: replace `.portfolio-placeholder` with `.portfolio-filter-bar` and `<div class="portfolio-grid" id="portfolio-grid"></div>`.
- `styles.css` -- Append production CSS for `.portfolio-filter-bar`, `.filter-btn`, `.portfolio-grid`, `.portfolio-card`, `.portfolio-media-wrap`, `.portfolio-media-placeholder`, `.portfolio-tag-list`, and hover transitions.
- `app.js` -- Add `PORTFOLIO_DATA` constant, `escapeHtml()` utility, `createPortfolioCardMarkup()` template generator, and `renderPortfolioCards()` initialization on DOM ready.

## Tasks & Acceptance

**Execution:**
- [x] `index.html` -- Add category filter bar tabs and dynamic portfolio grid container inside `#portfolio`.
- [x] `styles.css` -- Add 2D CSS Grid rules, card layout flex structures, aspect-ratio media boxes, badge styling, and elevation hover states.
- [x] `app.js` -- Implement `PORTFOLIO_DATA` (6 frozen case study objects), `escapeHtml()`, `createPortfolioCardMarkup()`, and `renderPortfolioCards()` integration.
- [x] `test-artifacts/story-3.1.test.mjs` -- Author automated Playwright/Node verification test asserting 6 cards, schema fields, scope tags, and responsive layout.

**Acceptance Criteria:**
- Given `index.html` and `app.js` are loaded in a browser, when the page renders, then exactly 6 portfolio cards are dynamically injected into `#portfolio-grid`.
- Given the 6 portfolio cards, when inspected, then each card contains a category badge, project title, descriptive text, deliverable scope tags with `#` prefix, an *"Inspect Case Study"* button with `data-action="open-modal"`, and an *"Inquire Similar"* WhatsApp button with `data-action="whatsapp-inquire"`.
- Given the portfolio grid on desktop, when hovered, then cards elevate by `-6px` with deepened box shadows and smooth image scaling.

## Implementation Notes

- Added `PORTFOLIO_DATA` in `app.js` containing 6 frozen case study objects (`cyma-homes`, `streetwear-merch`, `glazing-memoirs`, `tolw-brochure`, `skillforge-billboard`, `oab-foundation`).
- Implemented `escapeHtml()` for XSS sanitization and `createPortfolioCardMarkup()` with `aspect-ratio: 16 / 10` fallback placeholders and deliverable tag chips.
- Updated `index.html` with `.portfolio-filter-bar` and `#portfolio-grid`.
- Appended responsive 2D CSS Grid and micro-interaction styling in `styles.css`.
- Verified with 4 automated test assertions in `_bmad-output/test-artifacts/story-3.1.test.mjs`, all passing.

## Spec Change Log

## Review Triage Log

## Design Notes

The card media container uses modern CSS gradients with styled monograms and subtle accent borders per card (`--card-accent`), providing an instant, high-fidelity visual experience before binary jpg assets are loaded.

## Verification

**Commands:**
- `node test-artifacts/story-3.1.test.mjs` -- expected: All assertion checks pass with 0 errors.

**Manual checks (if no CLI):**
- Open `index.html` in a browser and verify 6 case study cards appear with proper alignment, tags, and action buttons.
