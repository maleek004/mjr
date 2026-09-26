---
title: 'Story 1.3: Brand Hero Section with Proof Metrics & Primary CTA'
type: 'feature'
created: '2026-09-26'
status: 'done'
route: 'dispatch'
review_loop_iteration: 0
context: ['_bmad-output/planning-artifacts/epics.md', '_bmad-output/planning-artifacts/stories/story-1.3-brand-hero-section-with-proof-metrics-and-primary-cta.md']
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Visitors arriving on the MJr Designs homepage need immediate clarity on core capabilities, quantified institutional trust, and zero-friction paths to initiate project consultations.

**Approach:** Construct and verify a responsive Hero section with the brand triplet tagline, value proposition copy, three proof metric cards, and a dual CTA cluster (Primary WhatsApp CTA + Secondary Portfolio Anchor) adhering to vanilla web standards and tokenized CSS.

## Boundaries & Constraints

**Always:** 
- 100% pure vanilla HTML5, CSS3, and ES6+ JavaScript.
- Fluid typography using `clamp()` and CSS Custom Properties declared in `:root`.
- WCAG 2.1 AA accessibility compliance including \(\ge 4.5:1\) text contrast, visible focus rings, and touch targets \(\ge 48\text{px}\).
- Centralized event delegation pattern via `document.addEventListener('click', ...)`.

**Never:**
- No third-party UI libraries, icon fonts, CSS frameworks (Bootstrap/Tailwind), or JS dependencies.
- No hardcoded breakpoint hacks or layout shift (CLS).

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Hero Render | Viewport loaded (any size) | Displays authority badge, H1 tagline, subhead, dual CTAs, and 3 metric cards | Fallback fonts apply instantly |
| Primary CTA Click | User clicks "Start a Project" | Opens WhatsApp URL (`wa.me/2348106246748`) with pre-filled lead message in new tab | Graceful link target navigation |
| Secondary CTA Click | User clicks "Explore Portfolio" | Smoothly scrolls down to `#portfolio` with header offset compensation | Section anchor fallback |
| Mobile Viewport (\(< 640\text{px}\)) | Viewport width 320px–639px | CTAs and proof cards stack vertically in 100% width flow | Zero horizontal overflow |
| Desktop Viewport (\(\ge 640\text{px}\)) | Viewport width \(\ge 640\text{px}\) | CTAs align horizontally; proof cards render in a 3-column grid | Grid auto-reflow |

</frozen-after-approval>

## Code Map

- `index.html` (Lines 85-116) -- Semantic HTML5 `<section id="hero">` structure with H1, subhead, CTA buttons, and proof metric badges.
- `styles.css` (Lines 563-656, 742-751) -- Hero layout styles, fluid typography, badge chips, CTA elevations, and responsive media query reflows.
- `app.js` -- Centralized event delegation and click handling for action tracking.

## Tasks & Acceptance

**Execution:**
- [x] `index.html` -- Verify semantic landmarks, accessible attributes (`aria-labelledby="hero-title"`, `data-action="whatsapp-inquire"`), and dual CTA links.
- [x] `styles.css` -- Ensure fluid responsive scaling (`--font-size-h1`), card hover elevations (`translateY(-2px)`), button focus outlines, and mobile-to-desktop grid breakpoints.
- [x] `app.js` -- Verify event delegation integrity and non-interfering anchor click handling.

**Acceptance Criteria:**
- Given `index.html` is loaded in a browser, when viewing `#hero`, then the tagline *"Creative Design. Strategic Branding. Quality Print."* is rendered as the primary H1.
- Given the hero section, when inspected, then three proof metric cards (*100+ Completed Projects*, *100% Corporate & Event Specialists*, *Direct Nationwide Delivery*) are visible with responsive grid alignment.
- Given the CTA buttons, when clicked, then "Start a Project" navigates to WhatsApp with pre-filled text and "Explore Portfolio" scrolls to `#portfolio`.

## Implementation Notes

- Verified that `index.html` has complete semantic markup for the Hero section including the authority badge chip, H1 title, subhead copy, primary and secondary CTA buttons, and the 3 proof metric cards.
- Verified that `styles.css` defines tokenized properties, linear gradients, card elevations, hover states, and responsive media queries (`min-width: 640px`).
- Verified zero layout shifts and complete WCAG 2.1 AA contrast compliance.

## Design Notes

- The hero section uses `background: linear-gradient(180deg, #FFFFFF 0%, var(--color-bg) 100%)` to create a smooth transition into the content sections.
- Primary CTA uses `--color-primary` (`#FF6B00`) with hover `--color-primary-dark` (`#E05A00`) and active `scale(0.98)` for tactile feedback.
- Proof metric cards use CSS Grid with `repeat(3, 1fr)` at `min-width: 640px` and single-column stack on smaller viewports.
