# Story 5.1: Case Study Multi-Image Data Modeling & Asset Extraction

**Epic**: Epic 5: Case Study Multi-Media Gallery & Continuous Modal Navigation  
**Status**: Completed  
**Author**: Mary (Business Analyst)  
**Date**: 2026-09-27  
**Target Files**: `app.js`, `assets/images/portfolio/*`

---

## 1. User Story Statement

**As a** prospective corporate or retail client inspecting MJr's work in the lightbox modal,  
**I want** to see multiple authentic photo proofs of finished physical deliverables (stationery suites, hard hats, branded apparel, packaging, magazines, billboards) for each case study,  
**So that** I can verify MJr's end-to-end craftsmanship and physical print quality before initiating a project inquiry.

---

## 2. Strategic Context & Business Value

* **Physical Proof of Manufacturing Quality**: High-converting portfolio sites for print production require more than a single flat graphic or mockup. Clients need to see the tangible tactile artifacts: the printed texture on custom hoodies, spot UV gloss on magazine covers, physical branded hard hats, and real-world billboard placements.
* **Multi-Media Data Structure (`images: [{ url, caption }]`)**: Extending `PORTFOLIO_DATA` with a structured `images` array per project enables Story 5.2's swipeable slider and Story 5.3's continuous modal navigation while maintaining backward compatibility with `thumbnail` and `fullImage` fallback properties.
* **Asset Pipeline Integrity**: Extracting authentic high-resolution imagery directly from `mjr portfolio.pdf` into optimized web assets (`assets/images/portfolio/`) ensures zero external network latency and zero missing assets.
* **Pedagogical Significance**: Deconstructs nested data modeling in modern JavaScript, image optimization tradeoffs (WebP/JPEG, responsive sizing), array manipulation methods (`Array.prototype.map`, `Array.prototype.findIndex`), and asset naming conventions.

---

## 3. Detailed Acceptance Criteria (Gherkin Format)

### Scenario 1: Case Study Asset Extraction & Organization
* **Given** the source file `mjr portfolio.pdf` in the project root,
* **When** the asset extraction process executes,
* **Then** high-resolution, web-optimized image assets are extracted and placed into `assets/images/portfolio/`.
* **And** assets are organized cleanly by case study slug:
  * `cyma-homes`: e.g. `cyma-1-logo-stationery.jpg`, `cyma-2-safety-hardhats.jpg`, `cyma-3-vehicle-fleet.jpg`
  * `streetwear-merch`: e.g. `apparel-1-hoodies.jpg`, `apparel-2-tees-screenprint.jpg`, `apparel-3-caps-labels.jpg`
  * `glazing-memoirs`: e.g. `glazing-1-bottles.jpg`, `glazing-2-boxes-bags.jpg`, `glazing-3-brand-suite.jpg`
  * `tolw-brochure`: e.g. `tolw-1-magazine-cover.jpg`, `tolw-2-editorial-spread.jpg`, `tolw-3-event-signage.jpg`
  * `skillforge-billboard`: e.g. `skillforge-1-billboard.jpg`, `skillforge-2-rollup-banners.jpg`, `skillforge-3-catalogs.jpg`
  * `oab-foundation`: e.g. `oab-1-annual-report.jpg`, `oab-2-event-merch.jpg`, `oab-3-identity-guidelines.jpg`
* **And** each image is optimized for fast web delivery (< 400KB per slide image).

---

### Scenario 2: Extended Multi-Image `PORTFOLIO_DATA` Schema in `app.js`
* **Given** the application script `app.js`,
* **When** `PORTFOLIO_DATA` is defined and frozen (`Object.freeze`),
* **Then** every case study object contains an `images` array with 2 to 4 proof items:
  ```javascript
  images: Object.freeze([
    {
      url: "assets/images/portfolio/cyma-1-logo-stationery.jpg",
      caption: "Corporate Identity Suite & Letterhead Stationery"
    },
    {
      url: "assets/images/portfolio/cyma-2-safety-hardhats.jpg",
      caption: "Custom Branded Construction Hard Hats & Safety Vests"
    },
    {
      url: "assets/images/portfolio/cyma-3-vehicle-fleet.jpg",
      caption: "Real Estate Site Signage & Fleet Vehicle Graphics"
    }
  ])
  ```
* **And** each project retains backward-compatible `thumbnail` and `fullImage` properties mapped to the primary image in `images`.
* **And** the data model remains strictly immutable using `Object.freeze` on all nested arrays and objects.

---

### Scenario 3: Verification & Backward Compatibility
* **Given** the updated `PORTFOLIO_DATA` in `app.js`,
* **When** `index.html` is rendered in a browser,
* **Then** existing grid card rendering (`createPortfolioCardMarkup`) continues functioning flawlessly.
* **And** opening the lightbox modal displays the primary image without console errors or broken image links.
* **And** running `/bmad-frontend-tutor` breaks down nested immutable object hierarchies and asset loading performance.

---

## 4. Technical Constraints & Design Principles

* **Zero Frameworks (NFR-101)**: Pure ES6+ data structures without external state management libraries.
* **Immutable Single Source of Truth**: All component views (grid cards, modal slider, category filters) consume `PORTFOLIO_DATA`.
* **Web Accessibility (NFR-106)**: Every image in the dataset includes descriptive caption metadata suitable for `alt` tags and visual captions in the upcoming Story 5.2 slider.
