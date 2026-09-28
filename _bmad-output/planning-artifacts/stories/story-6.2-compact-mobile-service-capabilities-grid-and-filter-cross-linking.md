# Story 6.2: Compact Mobile Service Capabilities Grid & Filter Cross-Linking

**Epic**: Epic 6: Proof-First Conversion Architecture & Mobile Layout Optimization  
**Status**: Completed  
**Author**: Mary (Business Analyst) & Amelia (Dev)  
**Date**: 2026-09-28  
**Target Files**: `index.html`, `styles.css`, `app.js`

---

## 1. User Story Statement

**As a** prospective client exploring MJr's production capabilities,  
**I want** high-density, scannable service cards that feature direct *"View [Category] Proofs"* cross-links to the portfolio gallery,  
**So that** I can seamlessly jump between technical service specifications and live proof examples with a single tap.

---

## 2. Strategic Context & Business Value

* **High-Density Information Architecture**: Transitioning from bulky, verbose cards to concise capability cards with visual icon badges reduces vertical scrolling on mobile while elevating scanability.
* **Bi-directional Navigation**: Connecting each service card (`Brand Identity`, `Packaging`, `Print Production`, `Custom Apparel`) directly to its corresponding portfolio filter category (`branding`, `publications`, `apparel`) provides a seamless interactive loop between capabilities and proof.
* **Direct Lead Capture**: Each service card preserves a dedicated WhatsApp consultation button pre-configured with that service's specific inquiry context.

---

## 3. Detailed Acceptance Criteria (Gherkin Format)

### Scenario 1: Compact 2D Grid Layout in styles.css
* **Given** the `#services` section,
* **When** rendered across mobile (375px+) and desktop (1024px+) viewports,
* **Then** service cards render in an ergonomic multi-column grid with concise deliverable chips and reduced padding.
* **And** card heights are optimized for rapid vertical scanning.

---

### Scenario 2: Interactive Filter Cross-Linking in app.js
* **Given** any service card in `#services`,
* **When** the user clicks the *"View [Category] Proofs"* action button (`data-action="jump-to-category"`, `data-category="[category]"`),
* **Then** `app.js`:
  1. Activates the corresponding portfolio filter tab (`filterPortfolio(category)`).
  2. Smoothly scrolls the viewport to `#portfolio`.
  3. Moves focus to the active filter tab button for accessibility.

---

### Scenario 3: Contextual WhatsApp Inquiry Action
* **Given** any service card,
* **When** clicking *"Inquire on WhatsApp"*,
* **Then** the WhatsApp context engine generates the dedicated inquiry URL for that service pillar.
