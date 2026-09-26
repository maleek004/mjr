# Story 1.3: Brand Hero Section with Proof Metrics & Primary CTA

**Epic**: Epic 1: Semantic Foundation, Design Tokens & Brand Hero Experience  
**Status**: Ready for Implementation  
**Author**: Mary (Business Analyst)  
**Date**: 2026-09-26  
**Target Files**: `index.html`, `styles.css`, `app.js`

---

## 1. User Story Statement

**As a** prospective corporate decision-maker or retail client landing on the MJr Designs & Print Solutions website,  
**I want** to see an immediate, high-impact Hero banner featuring MJr's core tagline, compelling value proposition, quantified proof metrics, and prominent call-to-action buttons,  
**So that** I instantly understand the full-spectrum design and print capabilities, perceive verified institutional credibility, and can initiate a consultation via WhatsApp or explore the portfolio without friction.

---

## 2. Strategic Context & Business Value

* **Immediate Value Articulation (The 5-Second Test)**: B2B corporate buyers and fast-moving event coordinators evaluate agency credibility within seconds. The hero section articulates MJr’s core triplet (*Creative Design. Strategic Branding. Quality Print.*) above the fold, eliminating ambiguity about service scope.
* **Quantified Social Proof & De-risking**: Displaying quantified trust metrics (*100+ Completed Projects*, *Corporate & Event Specialists*, *Nationwide Delivery*) directly mitigates perceived risk for first-time institutional clients and establishes pedigree before they even scroll.
* **Dual-Path Action Architecture**: 
  1. **Primary High-Intent Path**: Direct WhatsApp conversion (*"Start a Project"*) pre-loaded with contextual lead text targeting `+2348106246748`.
  2. **Secondary Exploratory Path**: Smooth anchor transition (*"Explore Portfolio"*) routing to `#portfolio` for evaluators needing visual proof before engagement.
* **Responsive Visual Hierarchy & Performance**: Leverages fluid typography (`clamp()`), semantic badge chips, and CSS-driven elevation effects ensuring sub-second First Contentful Paint (FCP) and zero Cumulative Layout Shift (CLS).

---

## 3. Detailed Acceptance Criteria (Gherkin Format)

### Scenario 1: Hero Visual Hierarchy & Brand Value Delivery
* **Given** a visitor navigates to the root URL on any modern viewport,
* **When** the page renders,
* **Then** the Hero section (`<section id="hero" class="hero-section" aria-labelledby="hero-title">`) must be visible above the fold.
* **And** it must feature an authoritative category pill/badge:
  * Text: `Creative Studio & Commercial Print Factory`
  * Styling: Brand orange subtle tint background (`--color-primary-light`), uppercase letter-spacing, and rounded pill border.
* **And** it must render the primary `<h1>` heading with `id="hero-title"`:
  * Text: `Creative Design. Strategic Branding. Quality Print.`
  * Typography: Fluid responsive scale (`--font-size-h1`, 36px–60px) utilizing `clamp()`, extra-bold weight (800), and tight line-height (1.15).
* **And** it must render supporting value proposition copy (`<p class="hero-subhead">`):
  * Copy: *"We elevate ambitious corporate enterprises, institutions, and lifestyle brands through authoritative visual identities, high-volume publication printing, and premium apparel manufacturing."*
  * Max-width constrained (\(\le 680\text{px}\)) for optimal reading measure (\(50\)–\(75\) characters per line).

---

### Scenario 2: Dual Conversion Action Triggers
* **Given** the Hero action cluster (`.hero-actions`) is rendered,
* **When** viewed on mobile or desktop viewports,
* **Then** it presents two distinct, accessible action buttons:
  1. **Primary CTA Button** (`.btn.btn-primary.btn-lg`):
     * Label: `Start a Project`
     * Anchor `href`: `https://wa.me/2348106246748?text=Hello%20MJr%20Designs%2C%20I%27d%20like%20to%20discuss%20a%20custom%20design%20and%20print%20project.`
     * Attributes: `target="_blank"`, `rel="noopener noreferrer"`, `data-action="whatsapp-inquire"`, `data-context="Hero Primary CTA"`.
     * Elevation: High-contrast brand orange (`#FF6B00`), hover color (`#E05A00`), and active elevation scale `transform: scale(0.98)`.
  2. **Secondary Exploration Button** (`.btn.btn-secondary.btn-lg`):
     * Label: `Explore Portfolio`
     * Anchor `href`: `#portfolio`
     * Behavior: Smooth scroll to `#portfolio` with header offset compensation.
* **And** on mobile viewports (\(< 640\text{px}\)), the buttons stack vertically at 100% container width with \(\ge 48\text{px}\) minimum touch target height.
* **And** on tablet/desktop viewports (\(\ge 640\text{px}\)), the buttons align horizontally in a centered flex row.

---

### Scenario 3: Quantified Proof Metrics & Credibility Grid
* **Given** the proof metrics container (`.hero-proof-metrics`) is displayed,
* **When** inspecting the rendered cards,
* **Then** it renders exactly 3 distinct credibility metrics:
  1. **Metric 1**:
     * Value: `100+` (`.metric-value`)
     * Label: `Completed Projects` (`.metric-label`)
  2. **Metric 2**:
     * Value: `100%` or `Specialists` (`.metric-value`)
     * Label: `Corporate & Event Specialists` (`.metric-label`)
  3. **Metric 3**:
     * Value: `Direct` / `Nationwide` (`.metric-value`)
     * Label: `Nationwide Delivery` (`.metric-label`)
* **And** each metric card (`.proof-metric-card`) is styled with:
  * Surface white background (`--color-surface`) on subtle neutral backdrop.
  * 1px subtle border (`--color-border`) and rounded corners (`--radius-lg: 16px`).
  * Micro-interaction: Subtle `translateY(-2px)` and shadow lift (`--shadow-md`) on cursor hover.
* **And** responsive layout behavior:
  * Single-column vertical stack on mobile screens (\(< 640\text{px}\)).
  * 3-column balanced grid (`repeat(3, 1fr)`) on viewports \(\ge 640\text{px}\).

---

### Scenario 4: Accessibility, Performance & Keyboard Focus
* **Given** assistive technology or keyboard navigation is active,
* **When** tabbing through the Hero section,
* **Then** the primary and secondary CTA buttons receive a distinct, visible 3px focus ring with 2px offset (`outline: 3px solid var(--color-primary); outline-offset: 2px`).
* **And** text contrast ratios for all elements meet or exceed WCAG 2.1 AA requirements (\(\ge 4.5:1\) for normal text, \(\ge 3.0:1\) for large headings and buttons).
* **And** all interactive anchors carry explicit `aria-label` or descriptive inner text.

---

## 4. Technical Specifications & Architectural Compliance

### 4.1. Architectural Invariants (Architecture Spine)
* [x] **AD-1 (Pure Vanilla Web Standards)**: 100% pure HTML5, CSS3, ES6+. Zero third-party icon fonts or UI frameworks.
* [x] **AD-3 (Centralized Event Delegation Root)**: All CTA tracking and WhatsApp redirection handled cleanly through `document.addEventListener('click', ...)` reading `e.target.closest('[data-action="whatsapp-inquire"]')`.
* [x] **AD-4 (3-Tier Tokenized CSS Architecture)**: Headings, button padding, gap metrics, and radii strictly consume CSS Custom Properties declared in `:root`.

---

### 4.2. Semantic HTML5 Structure (`index.html`)

```html
<!-- Hero Section Landmark -->
<section id="hero" class="hero-section" aria-labelledby="hero-title">
  <div class="container hero-container">
    <!-- Authority Pill -->
    <div class="hero-badge">Creative Studio &amp; Commercial Print Factory</div>
    
    <!-- Primary H1 Tagline -->
    <h1 id="hero-title" class="hero-headline">Creative Design. Strategic Branding. Quality Print.</h1>
    
    <!-- Core Value Proposition Copy -->
    <p class="hero-subhead">
      We elevate ambitious corporate enterprises, institutions, and lifestyle brands through authoritative visual identities, high-volume publication printing, and premium apparel manufacturing.
    </p>

    <!-- Dual Conversion Action Cluster -->
    <div class="hero-actions">
      <a href="https://wa.me/2348106246748?text=Hello%20MJr%20Designs%2C%20I%27d%20like%20to%20discuss%20a%20custom%20design%20and%20print%20project." 
         class="btn btn-primary btn-lg" 
         target="_blank" 
         rel="noopener noreferrer" 
         data-action="whatsapp-inquire" 
         data-context="Hero Primary CTA">
        Start a Project
      </a>
      <a href="#portfolio" class="btn btn-secondary btn-lg">
        Explore Portfolio
      </a>
    </div>

    <!-- Credibility & Proof Metric Grid -->
    <div class="hero-proof-metrics" role="region" aria-label="Key Proof Metrics">
      <div class="proof-metric-card">
        <span class="metric-value">100+</span>
        <span class="metric-label">Completed Projects</span>
      </div>
      <div class="proof-metric-card">
        <span class="metric-value">100%</span>
        <span class="metric-label">Corporate &amp; Event Specialists</span>
      </div>
      <div class="proof-metric-card">
        <span class="metric-value">Direct</span>
        <span class="metric-label">Nationwide Delivery</span>
      </div>
    </div>
  </div>
</section>
```

---

### 4.3. CSS Styling Implementation (`styles.css`)

```css
/* --------------------------------------------------------------------------
   HERO SECTION DESIGN SYSTEM SPECIFICATION
   -------------------------------------------------------------------------- */
.hero-section {
  padding-top: var(--space-3xl);
  padding-bottom: var(--space-4xl);
  background: linear-gradient(180deg, #FFFFFF 0%, var(--color-bg) 100%);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-badge {
  display: inline-block;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-dark);
  background-color: var(--color-primary-light);
  border: 1px solid var(--color-primary-subtle);
  padding: var(--space-xs) var(--space-md);
  border-radius: var(--radius-full);
  margin-bottom: var(--space-md);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.hero-headline {
  font-size: var(--font-size-h1);
  font-weight: var(--font-weight-extrabold);
  line-height: var(--line-height-tight);
  color: var(--color-charcoal);
  max-width: 900px;
  margin-bottom: var(--space-lg);
  letter-spacing: -0.03em;
}

.hero-subhead {
  font-size: var(--font-size-body);
  color: var(--color-text-muted);
  max-width: 680px;
  line-height: var(--line-height-normal);
  margin-bottom: var(--space-2xl);
}

.hero-actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  width: 100%;
  max-width: 440px;
  margin-bottom: var(--space-3xl);
}

.hero-proof-metrics {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-md);
  width: 100%;
  max-width: 800px;
}

.proof-metric-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-lg) var(--space-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xs);
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}

.proof-metric-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.metric-value {
  font-size: var(--font-size-h3);
  font-weight: var(--font-weight-extrabold);
  color: var(--color-primary);
}

.metric-label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-muted);
}

/* Responsive Breakpoints */
@media (min-width: 640px) {
  .hero-actions {
    flex-direction: row;
    justify-content: center;
  }
  
  .hero-proof-metrics {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

## 5. Verification & Testing Matrix

| Test ID | Test Scope | Verification Method | Expected Result |
| :--- | :--- | :--- | :--- |
| **TC-101** | Visual Hierarchy | Visual inspection on desktop & mobile | Tagline, subhead, CTA buttons, and 3 metric cards render clearly above the fold. |
| **TC-102** | Primary WhatsApp Action | Click *"Start a Project"* button | Opens `wa.me/2348106246748` in new tab with pre-filled Hero inquiry message. |
| **TC-103** | Secondary Portfolio Navigation | Click *"Explore Portfolio"* button | Smoothly scrolls down to the `#portfolio` anchor position with correct header offset. |
| **TC-104** | Responsive Reflow (640px) | Resize viewport between 320px and 1200px | Buttons and metrics reflow seamlessly from 1-column stack to multi-column rows. |
| **TC-105** | Color Contrast (WCAG AA) | Accessibility inspector / Lighthouse | Primary CTA, text, badges, and cards achieve \(\ge 4.5:1\) contrast ratio against backgrounds. |
| **TC-106** | Keyboard Navigation | Tab key traversal | Focus lands on "Start a Project" and "Explore Portfolio" with distinct 3px focus rings. |

---

## 6. Pedagogical Checkpoint (`bmad-frontend-tutor`)

Upon completion of this story's implementation, the developer/student will engage with `bmad-frontend-tutor` to solidify:
1. **Fluid Typography Calculus**: How `clamp(MIN, PREFERRED, MAX)` computes dynamic font sizes at runtime without media query thrashing.
2. **CSS Stacking Context & Linear Gradients**: How gradient backgrounds and z-index layers interact with sticky headers.
3. **Micro-Interactions & Hardware Acceleration**: Why `transform: translateY()` outperforms top-margin animations in composite paint layers.
4. **Active-Recall Flashcards & MCQs**: Generating atomic revision cards on CSS layout algorithms and conversion psychology.
