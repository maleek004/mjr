# Story 6.3: Zero-Scroll Featured Proof Peek Strip in Hero

**Epic**: Epic 6: Proof-First Conversion Architecture & Mobile Layout Optimization  
**Status**: Completed  
**Author**: Mary (Business Analyst) & Amelia (Dev)  
**Date**: 2026-09-28  
**Target Files**: `index.html`, `styles.css`, `app.js`

---

## 1. User Story Statement

**As a** prospective client landing on the homepage on a smartphone or desktop,  
**I want** interactive proof badges for flagship client projects embedded directly inside the Hero section fold,  
**So that** I can inspect full case studies instantly in zero scrolls without having to move down the page.

---

## 2. Strategic Context & Business Value

* **Zero-Scroll Time-to-Proof**: Even with the portfolio moved directly below the hero, having direct interactive proof chips in the hero fold achieves **0-scroll time-to-proof**.
* **Instant Social Proof & Legitimacy**: Highlighting recognized brand proofs (CYMA Homes, TOLW Magazine, Glazing Memoirs, Custom Apparel) immediately below the main value proposition anchors brand credibility in the first 3 seconds of a visit.
* **Accessible Modal Teleportation**: Tapping any proof pill immediately opens the case study modal (`openModal(projectId)`) with full focus trapping, slider controls, and WhatsApp consultation synchronization.

---

## 3. Detailed Acceptance Criteria (Gherkin Format)

### Scenario 1: Hero Proof Peek Strip Markup in index.html
* **Given** the `#hero` section landmark,
* **When** viewing the hero content container,
* **Then** it renders a `.hero-proof-strip` container containing:
  * An accessible label *"Quick Proof Inspection:"*.
  * Interactive proof pill buttons (`data-action="open-modal"`, `data-project-id="[id]"`) for flagship projects:
    - CYMA Homes Limited (`data-project-id="cyma-homes"`)
    - Tour of Lagos Waterways (`data-project-id="tolw-brochure"`)
    - Glazing Memoirs FMCG (`data-project-id="glazing-memoirs"`)
    - Streetwear Apparel (`data-project-id="streetwear-merch"`)

---

### Scenario 2: Modern Pill Styling in styles.css
* **Given** `.hero-proof-strip`,
* **When** rendered on mobile and desktop devices,
* **Then** proof pills render with glassmorphism styling, subtle borders, high-contrast text, `:hover` scale micro-interactions, and `:focus-visible` outline rings.
* **And** touch targets meet minimum $\ge 44\text{px}$ accessibility standards.

---

### Scenario 3: Zero-Friction Event Delegation in app.js
* **Given** any hero proof pill,
* **When** clicked or tapped by the user,
* **Then** the existing `open-modal` delegation action intercepts the click, sets `state.activeModalId`, populates the modal content, and opens the lightbox modal.
