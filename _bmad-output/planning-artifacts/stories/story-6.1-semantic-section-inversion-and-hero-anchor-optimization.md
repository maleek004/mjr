# Story 6.1: Semantic Section Inversion & Hero Anchor Optimization

**Epic**: Epic 6: Proof-First Conversion Architecture & Mobile Layout Optimization  
**Status**: Completed  
**Author**: Mary (Business Analyst) & Amelia (Dev)  
**Date**: 2026-09-28  
**Target Files**: `index.html`, `styles.css`, `app.js`

---

## 1. User Story Statement

**As a** mobile visitor seeking print production and brand design services,  
**I want** the interactive portfolio and authentic work proofs to appear immediately beneath the hero fold,  
**So that** I can assess MJr's physical craftsmanship within one thumb scroll instead of wading through ~2,800px of abstract service descriptions.

---

## 2. Strategic Context & Business Value

* **Time-to-Proof Minimization**: In conversion rate optimization (CRO), shortening the scroll distance to primary proof assets directly decreases bounce rates and increases average session engagement.
* **Top-of-Funnel Clarity**: The value proposition in the Hero promises exceptional quality; presenting the portfolio immediately validates that promise with tangible evidence.
* **Seamless Navigation Flow**: Reordering the document structure to `Hero` $\rightarrow$ `Portfolio` $\rightarrow$ `Services` $\rightarrow$ `About` $\rightarrow$ `Contact` aligns the narrative: *"What we deliver"* $\rightarrow$ *"Proof of delivery"* $\rightarrow$ *"Capabilities & specs"* $\rightarrow$ *"Trust & credentials"* $\rightarrow$ *"Direct contact"*.

---

## 3. Detailed Acceptance Criteria (Gherkin Format)

### Scenario 1: Document Structure Reordering
* **Given** the `index.html` main landmark `<main id="main-content">`,
* **When** rendering the page landmarks,
* **Then** `<section id="portfolio">` is positioned immediately after `<section id="hero">`.
* **And** `<section id="services">` is positioned immediately after `<section id="portfolio">`.
* **And** `<section id="about">` and `<section id="contact">` follow subsequently.

---

### Scenario 2: Header Navigation & Anchor Reordering
* **Given** the site header `<nav class="site-nav">` and mobile drawer `<div id="mobile-nav">`,
* **When** viewing the navigation links,
* **Then** the links are ordered:
  1. `Portfolio & Proofs` (`href="#portfolio"`)
  2. `Services & Capabilities` (`href="#services"`)
  3. `Verified Trust` (`href="#about"`)
  4. `Direct Contact` (`href="#contact"`)
* **And** clicking any navigation link smoothly scrolls to the target section with proper sticky header offset clearance (`scroll-margin-top: 80px`).

---

### Scenario 3: Hero Primary Anchor CTA Update
* **Given** the Hero action buttons container `.hero-actions`,
* **When** the page renders,
* **Then** the primary action button is *"Explore Verified Proofs"* linking to `href="#portfolio"`.
* **And** the secondary action button remains *"Start WhatsApp Consultation"* (`data-action="whatsapp-inquire"`).
