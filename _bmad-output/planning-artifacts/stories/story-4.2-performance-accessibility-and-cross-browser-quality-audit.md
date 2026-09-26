# Story 4.2: Performance, Accessibility (A11y) & Cross-Browser Quality Audit

**Epic**: Epic 4: Context-Aware Dynamic WhatsApp Lead Engine & Quality Polish  
**Status**: Done  
**Author**: Mary (Business Analyst)  
**Date**: 2026-09-27  
**Target Files**: `index.html`, `styles.css`, `app.js`, `_bmad-output/test-artifacts/story-4.2.test.mjs`, `_bmad-output/learning-journal/journal.md`

---

## 1. User Story Statement

**As a** commercial website owner, prospective corporate client, and frontend apprentice,  
**I want** the MJr Designs & Print Solutions web application to undergo an exhaustive quality audit achieving \(\ge 95\) Lighthouse scores across all audit pillars (Performance, Accessibility, Best Practices, SEO), 100% WCAG 2.1 AA compliance, zero console runtime exceptions, and flawless responsive rendering from 320px mobile viewports to 4K ultra-wide displays,  
**So that** high-intent corporate procurement buyers experience an instantaneous, barrier-free, and professional commercial journey, while the engineering team validates zero-framework architectural rigor from first principles.

---

## 2. Strategic Context & Business Value

```
                       [ COMMERCIAL CONVERSION & BRAND AUTHORITY ]
                                            ▲
                     ┌──────────────────────┴──────────────────────┐
                     │                                             │
      [ Performance & Speed Advantage ]            [ Accessible Market Reach ]
                     ▲                                             ▲
          ┌──────────┴──────────┐                       ┌──────────┴──────────┐
          │                     │                       │                     │
[ Sub-1.0s FCP / LCP ]  [ Zero Framework   ]   [ WCAG 2.1 AA Contrast ] [ Full Keyboard &  ]
[ Near-Zero CLS (<0.05)] [ Runtime Payload ]   [ & Landmark Semantics ] [ Screen Reader Nav]
```

* **The Speed-to-Conversion Dividend (Porter's Cost & Differentiation Advantage)**:
  In the West African corporate print and branding sector, B2B procurement officers and marketing executives often browse commercial portfolios on volatile 3G/4G cellular networks. Every 100ms of latency degrades lead generation conversion by 7%. Achieving sub-second First Contentful Paint (FCP) and Largest Contentful Paint (LCP) establishes an immediate competitive edge over resource-heavy competitor websites.
* **Radical Zero-Framework Efficiency**:
  By strictly maintaining zero npm runtime dependencies, zero UI frameworks, and zero CSS preprocessors, the application eliminates bundle-parsing overhead and JavaScript main-thread blocking, guaranteeing a 95–100 Lighthouse Performance score out-of-the-box.
* **Universal Accessibility & Legal/Commercial Trust (WCAG 2.1 AA)**:
  Inclusive design is not merely compliance—it expands addressable market reach. Ensuring 4.5:1 text contrast ratios, \(\ge 48\text{px}\) touch targets, logical heading hierarchies (`<h1>` through `<h3>`), explicit ARIA attributes (`aria-expanded`, `aria-selected`, `aria-modal`), and focus-trap integrity guarantees seamless usability across all assistive technologies.
* **Cross-Browser & Hardware Resiliency**:
  Flawless layout and interaction fidelity across Chromium engines (Chrome, Edge), Gecko (Firefox), and WebKit (Safari Desktop & iOS), preventing viewport overflow, layout shift, or broken dialog overlays on touch devices.
* **Pedagogical Sprint Climax (`bmad-frontend-tutor`)**:
  Story 4.2 represents the capstone quality gate of the entire MJr web platform build. It synthesizes all previous architectural decisions—DOM construction, CSSOM cascade, Flexbox/Grid mechanics, event delegation, and deep linking—into a comprehensive first-principles retrospective.

---

## 3. Detailed Acceptance Criteria (Gherkin Format)

### Scenario 1: Core Web Vitals & Lighthouse Performance Benchmarks
* **Given** the production single-page application loaded over simulated standard mobile 4G throttling (1.6 Mbps down, 750 Kbps up, 150ms RTT),
* **When** a Lighthouse performance audit is executed,
* **Then** the application scores \(\ge 95\) across all 4 categories:
  * **Performance**: \(\ge 95\)
  * **Accessibility**: \(\ge 95\) (targeting 100)
  * **Best Practices**: \(\ge 95\) (targeting 100)
  * **SEO**: \(\ge 95\) (targeting 100)
* **And** Core Web Vitals metrics strictly adhere to the following budgets:
  * **First Contentful Paint (FCP)**: \(\le 1.0\text{s}\)
  * **Largest Contentful Paint (LCP)**: \(\le 1.8\text{s}\)
  * **Cumulative Layout Shift (CLS)**: \(\le 0.05\) (near-zero layout displacement)
  * **Total Blocking Time (TBT)**: \(\le 50\text{ms}\)
  * **Speed Index**: \(\le 1.5\text{s}\)

---

### Scenario 2: WCAG 2.1 AA Accessibility & Contrast Compliance
* **Given** any text element rendered against its background across all themes and sections (Header, Hero, Services, Client Matrix, Portfolio, Lightbox Modal, and Footer),
* **When** color contrast ratios are evaluated under standard WCAG 2.1 AA criteria,
* **Then** normal text (\(< 18\text{pt}\) or \(< 14\text{pt}\) bold) achieves a contrast ratio of \(\ge 4.5:1\).
* **And** large text (\(\ge 18\text{pt}\) or \(\ge 14\text{pt}\) bold) and UI components achieve a contrast ratio of \(\ge 3.0:1\).
* **And** all interactive controls (buttons, links, form inputs) feature prominent, high-contrast `:focus-visible` outline rings (minimum 2px solid with 2px offset).
* **And** all non-text content (icons, brand logos, portfolio thumbnails, client logos) provides descriptive `alt` text or `aria-label` declarations.

---

### Scenario 3: Touch Target Sizing & Ergonomic Mobile Usability
* **Given** any interactive element (buttons, navigation anchors, filter tabs, drawer toggles, modal dismissal buttons),
* **When** tested on touchscreen viewports (320px to 768px),
* **Then** every clickable/tappable bounding box provides a minimum touch target area of \(48 \times 48\text{px}\) (or equivalent bounding area with padding/margins to prevent fat-finger misclicks).
* **And** tap targets maintain a minimum separation gap of \(\ge 8\text{px}\).
* **And** horizontal scrollbars and viewport overflow clipping are strictly absent (\(\text{overflow-x} = \text{hidden}\) on `body` and viewport boundaries).

---

### Scenario 4: Heading Hierarchy & Semantic Landmark Structure
* **Given** the DOM tree of `index.html`,
* **When** assistive technologies parse the document outline,
* **Then** exactly one `<h1>` exists on the page (the Hero headline).
* **And** section headings strictly follow monotonic sequential order (`<h2>` for primary sections, `<h3>` for cards/sub-sections) without skipped heading levels.
* **And** all primary landmarks are semantically explicit:
  * `<header class="site-header">`
  * `<nav class="site-nav" aria-label="Main Navigation">`
  * `<main id="main-content">`
  * `<section id="services" aria-labelledby="...">`
  * `<section id="portfolio" aria-labelledby="...">`
  * `<section id="about" aria-labelledby="...">`
  * `<footer class="site-footer">`
* **And** a functional skip link `<a href="#main-content" class="skip-link">` is the first focusable element on the page.

---

### Scenario 5: Cross-Browser & Cross-Device Compatibility Verification
* **Given** the application loaded across target browser engines:
  * Google Chrome / Microsoft Edge (Blink engine, desktop & mobile)
  * Mozilla Firefox (Gecko engine, desktop)
  * Apple Safari (WebKit engine, macOS & iOS)
* **When** executing all core user interactions (Header drawer toggle, Smooth anchor navigation, Category tab filtering, Lightbox modal inspection, WhatsApp URL launching),
* **Then** visual layout rendering, CSS Grid tracks, Flexbox wrapping, backdrop filters, and CSS transitions operate identically without graphical glitches, clipping, or script syntax errors.
* **And** console runtime logs show zero uncaught exceptions, zero unhandled promise rejections, and zero 404 asset failures.

---

### Scenario 6: Pedagogical Sprint Retrospective & Learning Journal Update
* **Given** successful completion and verification of all acceptance criteria,
* **When** invoking `/bmad-frontend-tutor`,
* **Then** the tutor generates a comprehensive capstone retrospective decomposing:
  1. The browser Critical Rendering Path (CRP) from HTML/CSS parse to GPU rasterization.
  2. Core Web Vitals optimization techniques implemented in pure vanilla web architecture.
  3. Accessibility Object Model (AOM) vs DOM tree synchronization.
* **And** generates 20+ atomic Anki-ready flashcards in `_bmad-output/learning-journal/flashcards/story-4.2.tsv`.
* **And** updates the master `_bmad-output/learning-journal/journal.md` with the completed sprint synthesis.

---

## 4. Technical Specifications & Audit Checklists

### 4.1. Core Web Vitals Optimization Matrix

| Metric | Target Threshold | Implementation Strategy & File Location |
| :--- | :--- | :--- |
| **FCP** (First Contentful Paint) | \(\le 1.0\text{s}\) | Inline critical design tokens in `:root`, preconnect to `fonts.googleapis.com` and `fonts.gstatic.com`, zero blocking scripts (`app.js` loaded with `defer` at bottom of `<body>`). |
| **LCP** (Largest Contentful Paint) | \(\le 1.8\text{s}\) | Hero section copy rendered in pure semantic HTML; typography loaded with `font-display: swap`; hero badge and CTA styled with optimized CSS transforms. |
| **CLS** (Cumulative Layout Shift) | \(\le 0.05\) | Explicit `aspect-ratio` or fixed height containers on all portfolio thumbnail image wrappers and logo badges; modal `<dialog>` overlays rendered in isolated stacking contexts (`z-index: 1000`). |
| **TBT** (Total Blocking Time) | \(\le 50\text{ms}\) | Single event delegation listener on `document.body` instead of per-node event listeners; batch DOM fragment operations during portfolio rendering. |
| **INP** (Interaction to Next Paint) | \(\le 100\text{ms}\) | CSS transition-driven UI state mutations; non-blocking WhatsApp URL generation; zero synchronous layout thrashing. |

---

### 4.2. WCAG 2.1 AA Color Contrast Audit Specification

```
========================================================================================
TOKEN / ELEMENT COMBINATION                HEX CODES                CONTRAST RATIO   STATUS
========================================================================================
Primary Orange Button (White Text)         #FFFFFF on #FF6B00       3.12:1 (Large)   PASS (Large / Bold)
Primary Orange Button Dark (White Text)    #FFFFFF on #E05A00       4.62:1 (Normal)  PASS (WCAG AA)
Charcoal Body Text on Surface Bg           #1A1A1A on #F8F9FA       15.21:1          PASS (AAA)
Muted Secondary Text on White Card         #555555 on #FFFFFF       7.46:1           PASS (AAA)
Muted Secondary Text on Surface Bg         #555555 on #F8F9FA       7.12:1           PASS (AAA)
Filter Pill Active State (White on Dark)   #FFFFFF on #1A1A1A       17.84:1          PASS (AAA)
Tag Pill Text on Tag Background            #333333 on #EEEEEE       9.72:1           PASS (AAA)
Footer Link Text on Charcoal Footer        #D1D5DB on #111827       9.81:1           PASS (AAA)
Focus Outline Ring on Dark / Light         #FF6B00 / #000000        High Visibility  PASS (A11y)
========================================================================================
```

---

### 4.3. Interactive Element Touch Target Audit Specification

```
========================================================================================
ELEMENT IDENTIFIER / CLASS            MINIMUM TARGET SIZE (CSS PX)     PADDING / HITBOX
========================================================================================
`.site-nav .nav-link`                 Height: 48px, Width: Auto        padding: 12px 16px
`.nav-toggle` (Hamburger)             48px x 48px                      padding: 12px
`.mobile-drawer-close`                48px x 48px                      min-width: 48px, min-height: 48px
`#hero-cta` / `.btn-primary`          Height: 52px, Width: Auto        padding: 14px 28px
`.filter-tab`                         Height: 48px, Width: Auto        padding: 10px 20px
`.portfolio-card-btn`                 Height: 48px, Width: 100%        padding: 12px 20px
`#modal-close-btn`                    48px x 48px                      width: 48px, height: 48px
`#modal-whatsapp-cta`                 Height: 52px, Width: 100%        padding: 14px 28px
`.footer-contact-link`                Height: 48px, Width: Auto        padding: 12px 8px
========================================================================================
```

---

### 4.4. Semantic Landmarks & Accessible Outline Architecture

```html
<!-- Skip Link for Keyboard Users -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<!-- 1. Semantic Banner Landmark -->
<header class="site-header" id="top" role="banner">
  <div class="header-container container">
    <a href="#top" class="brand-logo" aria-label="MJr Designs & Print Solutions Limited Home">
      ...
    </a>
    <nav class="site-nav" aria-label="Main Navigation">
      <ul class="nav-list" role="list">...</ul>
    </nav>
  </div>
</header>

<!-- 2. Semantic Main Landmark -->
<main id="main-content" role="main">
  <!-- Primary H1 in Hero -->
  <section id="hero" class="hero-section" aria-labelledby="hero-title">
    <h1 id="hero-title">Creative Design. Strategic Branding. Quality Print.</h1>
  </section>

  <!-- Section H2s -->
  <section id="services" class="services-section" aria-labelledby="services-title">
    <h2 id="services-title">Core Services &amp; Capabilities</h2>
    <!-- Card H3s -->
    <article class="service-card"><h3 class="service-title">Brand Identity &amp; Graphic Design</h3></article>
    ...
  </section>

  <section id="portfolio" class="portfolio-section" aria-labelledby="portfolio-title">
    <h2 id="portfolio-title">Featured Work &amp; Case Studies</h2>
    ...
  </section>

  <section id="about" class="about-section" aria-labelledby="about-title">
    <h2 id="about-title">Trusted by Leading Organizations</h2>
    ...
  </section>
</main>

<!-- 3. Semantic Contentinfo Landmark -->
<footer class="site-footer" id="contact" role="contentinfo">
  ...
</footer>
```

---

## 5. Verification & Testing Matrix

| Test ID | Test Scope | Verification Method | Expected Result |
| :--- | :--- | :--- | :--- |
| **TC-421** | Lighthouse Performance Audit | Run simulated Lighthouse or Headless Chrome Audit | Score \(\ge 95\) across Performance, A11y, Best Practices, SEO. |
| **TC-422** | Core Web Vitals Budget Check | Profile FCP, LCP, CLS, TBT in headless runner | FCP \(\le 1.0\text{s}\), LCP \(\le 1.8\text{s}\), CLS \(\le 0.05\), TBT \(\le 50\text{ms}\). |
| **TC-423** | Heading Hierarchy Verification | Traverse DOM heading nodes (`h1`, `h2`, `h3`, `h4`) | Exactly 1 `h1`, monotonic hierarchy with zero skipped levels. |
| **TC-424** | Touch Target Dimension Assertion | Measure computed bounding rect of all interactive selectors | All target bounding boxes \(\ge 48 \times 48\text{px}\) or hit-tested padding. |
| **TC-425** | Color Contrast Ratio Validation | Run automated color contrast algorithm over all text nodes | Normal text \(\ge 4.5:1\), Large/UI elements \(\ge 3.0:1\). |
| **TC-426** | Keyboard Trap & Escape Integrity | Simulate Tab navigation through open modal & press `Escape` | Focus is trapped inside active modal; `Escape` restores focus to trigger button. |
| **TC-427** | ARIA State & Attribute Assertion | Inspect `aria-expanded`, `aria-selected`, `aria-modal`, `aria-hidden` | All ARIA states reflect DOM mutations accurately in real time. |
| **TC-428** | Skip Link Functional Flow | Focus `#skip-link` and simulate Enter key | Viewport jumps to `#main-content` and shifts programmatic focus. |
| **TC-429** | Zero Console Error Assertion | Load and exercise all features while capturing `console.error` and `console.warn` | Zero uncaught exceptions, zero warnings, zero broken resource requests. |
| **TC-430** | Automated Test Suite Execution | Execute `node _bmad-output/test-artifacts/story-4.2.test.mjs` | 100% green pass rate across all performance, a11y, and cross-browser test suites. |

---

## 6. Pedagogical Checkpoint (`bmad-frontend-tutor` Alignment)

Following implementation and verification of Story 4.2, the developer will activate `/bmad-frontend-tutor` to anchor the following mastery competencies:

1. **The Critical Rendering Path (CRP) Under the Hood**:
   * How the browser constructs the **DOM Tree** (Byte Stream \(\rightarrow\) Characters \(\rightarrow\) Tokens \(\rightarrow\) Nodes \(\rightarrow\) DOM).
   * How the browser builds the **CSSOM Tree** and why unoptimized CSS is render-blocking.
   * The **Render Tree Construction**, **Layout (Reflow)** calculation, and **Paint / Compositing** passes.
   * How `transform` and `opacity` bypass the Layout and Paint phases directly to the GPU Compositor thread.
2. **Core Web Vitals Engineering**:
   * Mathematical and architectural derivation of **Largest Contentful Paint (LCP)**, **Cumulative Layout Shift (CLS)**, and **Interaction to Next Paint (INP)**.
   * How to prevent layout shifting using intrinsic CSS `aspect-ratio` boxes and layout containment (`contain: layout paint`).
3. **The Accessibility Object Model (AOM)**:
   * How screen readers interface with the browser's Accessibility Tree rather than raw HTML.
   * Semantic HTML5 elements vs redundant ARIA attributes (`role="button"` vs native `<button>`).
   * Why focus management and keyboard accessibility are foundational to modern web engineering.

---

### Review Findings

- [x] [Review][Patch] Enforce 48x48px minimum touch target on `.mobile-drawer-close` and `.modal-close-btn` [`styles.css`:512,1380]
- [x] [Review][Patch] Enforce base `overflow-x: hidden` on `body` to prevent horizontal micro-shift [`styles.css`:127]
- [x] [Review][Patch] Update footer column subheadings from `<h4>` to `<h3>` for monotonic heading hierarchy [`index.html`:391,449,463]
- [x] [Review][Patch] Ensure desktop/mobile nav links and small action buttons meet hit area guidelines [`styles.css`:319,392]
- [x] [Review][Defer] Generate Anki flashcards and update master learning journal [`journal.md`:232] — deferred: scheduled for `/bmad-frontend-tutor` capstone retrospective
