---
title: 'Story 2.1: 4-Pillar Core Services Grid with Contextual Triggers'
type: 'feature'
created: '2026-09-26'
status: 'done'
route: 'dispatch'
review_loop_iteration: 0
context: ['_bmad-output/planning-artifacts/epics.md', '_bmad-output/planning-artifacts/stories/story-2.1-4-pillar-core-services-grid-with-contextual-triggers.md']
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Prospective corporate clients, event planners, and retail apparel buyers need immediate visibility into MJr's full-spectrum services without confusing creative design with industrial commercial printing, and need a frictionless method to initiate inquiries for specific service pillars.

**Approach:** Construct a responsive 2D CSS Grid (`repeat(auto-fit, minmax(280px, 1fr))`) rendering 4 semantic cards (*Brand Identity & Graphic Design*, *Marketing & Advertising Design*, *Print & Publication Production*, *Event & Environmental Branding*) featuring custom SVG icons, deliverable checklists, hover elevation effects, and contextual WhatsApp consultation triggers.

## Boundaries & Constraints

**Always:**
- 100% pure vanilla HTML5, modern CSS3, and ES6+ JavaScript.
- Fluid layout calculations utilizing CSS Grid `auto-fit` and `minmax()` without hardcoded breakpoint hacks.
- Vertical flex alignment within cards (`margin-top: auto` on `.service-cta`) ensuring equal card height and sticky bottom CTAs.
- WCAG 2.1 AA accessibility compliance including \(\ge 4.5:1\) text contrast, visible focus rings, and touch targets \(\ge 48\text{px}\).
- Centralized event delegation compatibility via `document.addEventListener('click', ...)`.

**Never:**
- No external icon font libraries (FontAwesome/Bootstrap Icons) or UI frameworks.
- No fixed card heights that cause text overflow on smaller screens.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Services Render | Visitor scrolls to `#services` | Renders section header and 4-pillar grid with 4 cards | Fallback fonts apply instantly |
| Mobile Viewport (\(< 640\text{px}\)) | Viewport 320px–639px | Cards stack vertically in 1-column layout | Zero horizontal overflow |
| Desktop Viewport (\(\ge 640\text{px}\)) | Viewport \(\ge 640\text{px}\) | Cards arrange in responsive auto-fit multi-column grid | Grid track recalculation |
| Hover Micro-Interaction | Cursor enters card | Card lifts `translateY(-4px)`, shadow expands (`--shadow-lg`), and button transitions to orange | Hardware-accelerated transform |
| Contextual CTA Click | User clicks "Inquire: [Service]" | Opens WhatsApp with pre-filled message specific to that pillar | Target `_blank` with `rel="noopener noreferrer"` |

</frozen-after-approval>

## Code Map

- `index.html` (Lines 120-234) -- Semantic HTML5 `<section id="services">` structure containing the 4 `<article class="service-card">` components with inline SVG icons, titles, descriptions, deliverable lists, and contextual CTA buttons.
- `styles.css` (Lines 301-312, 670-785) -- `.btn-outline` component and complete `.services-section`, `.services-grid`, `.service-card`, `.service-icon-wrap`, `.service-deliverables`, and `.service-cta` styling.
- `app.js` -- Event delegation architecture and non-interfering action routing.

## Tasks & Acceptance

**Execution:**
- [x] `index.html` -- Replaced placeholder `#services-grid` with the 4 semantic service cards, accessible landmark attributes (`aria-labelledby="services-title"`), deliverable checklists, and contextual WhatsApp anchors.
- [x] `styles.css` -- Added `.btn-outline` button class and implemented 2D CSS Grid `repeat(auto-fit, minmax(280px, 1fr))` rules, card flex column distributions, hover transitions, and checkmark bullet pseudo-elements.
- [x] Verified zero runtime build steps, responsive reflow, and full keyboard focus accessibility.

**Acceptance Criteria:**
- Given `#services` is viewed, exactly 4 service pillar cards render with correct visual icons, titles, descriptions, and deliverable items.
- Given varying screen sizes, the grid reflows automatically from 1 column on mobile to multi-column on desktop while maintaining equal card height.
- Given each contextual CTA button, clicking opens WhatsApp targeting `+2348106246748` with the respective service pillar inquiry text.

## Implementation Notes

- Implemented inline SVGs for the 4 service icons (Pen tool for Brand Identity, Megaphone for Marketing Design, Book/Publication for Print Production, T-Shirt for Event & Custom Apparel).
- Styled deliverable list items with custom CSS `::before` pseudo-elements creating brand orange rounded checkmark badges.
- Configured `.service-cta` with `margin-top: auto` so CTA buttons maintain uniform baseline alignment regardless of text variation.
