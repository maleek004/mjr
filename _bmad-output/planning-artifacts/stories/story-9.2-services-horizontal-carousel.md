# Story 9.2: Services 4-Pillar Horizontal Carousel with Snap Points

## Status: Complete
## Epic: Epic 9 — Mobile Viewport Horizontalization & Zero-Fatigue Swipe Layouts

---

## 1. Description
Convert the mobile rendering of the 4 Core Services pillars (`#services`) from a 4-card vertical stack into a high-density, horizontal swipeable carousel with native CSS scroll-snap alignment. This consolidates MJr's primary business offerings into a single compact mobile viewport area while preserving direct interactive CTA triggers.

---

## 2. Acceptance Criteria

### AC-1: CSS Horizontal Snap Carousel Layout (`styles.css`)
- On mobile viewports ($< 768\text{px}$), `#services .services-grid` adopts a single-row flex layout with `overflow-x: auto` and `scroll-snap-type: x mandatory`.
- Each `.service-card` is sized to `flex: 0 0 calc(85vw - 16px)` with `scroll-snap-align: center`, giving users an intuitive card peek.
- Smooth touch scrolling with `-webkit-overflow-scrolling: touch` and customized minimal scrollbars.

### AC-2: Visual Mobile Swipe Affordance Hint (`index.html` & `styles.css`)
- Embeds a subtle, pulsing mobile swipe cue above the services track (`<div class="mobile-swipe-hint" aria-hidden="true"><span>👈 Swipe to view capabilities 👉</span></div>`).
- Hidden on desktop screens ($\ge 768\text{px}$).

### AC-3: Interactive Button Ergonomics & Touch Isolation
- Cross-linking jump buttons (*"View Identity Proofs"*) and WhatsApp conversion buttons (*"Inquire: Brand Identity"*) maintain compliant $\ge 44\text{px}$ touch targets and prevent touch gesture interference during horizontal scrolling.

### AC-4: Desktop Grid Integrity
- Desktop viewports ($\ge 768\text{px}$) retain the 4-pillar auto-fitting CSS grid (`grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`) without horizontal scrolling.
