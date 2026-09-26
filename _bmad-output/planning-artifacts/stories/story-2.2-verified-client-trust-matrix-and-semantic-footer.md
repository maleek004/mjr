# Story 2.2: Verified Client Trust Matrix & Semantic Footer

**Epic**: Epic 2: Core Service Pillars & Verified Client Trust Matrix  
**Status**: Ready for Implementation  
**Author**: Mary (Business Analyst)  
**Date**: 2026-09-26  
**Target Files**: `index.html`, `styles.css`, `app.js`

---

## 1. User Story Statement

**As a** corporate decision maker, institutional procurement director, or retail brand manager evaluating MJr Designs & Print Solutions,  
**I want** to see an authenticated, visually polished matrix of verified corporate and institutional client trust badges, along with a comprehensive semantic footer containing complete direct contact channels (Phone, WhatsApp, Direct Email, Socials) and legal notices,  
**So that** I have immediate, verifiable proof of MJr's enterprise pedigree, and can seamlessly establish direct business communication through my preferred channel from anywhere on the page.

---

## 2. Strategic Context & Business Value

* **B2B Credibility & Risk Mitigation (Pyramid Principle Top-Down Validation)**: High-value corporate procurement (such as 500+ compendium prints, luxury brochures, or company-wide branded apparel) involves perceived vendor risk. Displaying authenticated clients across diverse industries—Real Estate (*CYMA Homes*), Healthcare (*The Minaret Hospital*), Public Health/NGOs (*PPFN*), Marine Tourism (*Tour of Lagos Waterways*), Industrial Fabrication (*GoWeld*), and FMCG (*Glazing Memoirs*)—instantly validates enterprise reliability and print execution excellence.
* **Zero-Friction Direct Conversion (Persistent Semantic Footer)**: The footer serves as the definitive anchor for contact discovery. Featuring direct WhatsApp bridge (`+2348106246748`), direct email (`mjrgdesigns@gmail.com`), phone dialers, and contextual brand credentials ensures visitors reaching the bottom of the page experience zero drop-off.
* **Micro-Interaction & Visual Polish**: Implementing subtle CSS grayscale-to-color filter transitions (`filter: grayscale(100%) opacity(0.7)` transitioning to `filter: grayscale(0%) opacity(1)`) creates an elegant, non-distracting visual hierarchy on desktop, while automatically rendering crisp and readable on mobile viewports.
* **Pedagogical Engineering Benchmark**: Illustrates CSS filter functions, vector SVG logo framing, responsive 2D grid auto-fit dynamics (`repeat(auto-fit, minmax(140px, 1fr))`), image aspect-ratio handling, and semantic HTML5 landmark accessibility for `<footer>` and `<address>`.

---

## 3. Detailed Acceptance Criteria (Gherkin Format)

### Scenario 1: Verified Client Trust Matrix Layout & Grid Hierarchy
* **Given** a visitor scrolls or navigates to the `#about` section,
* **When** the client trust section renders in the viewport,
* **Then** it must display a semantic section header:
  * Section Tag: `Trusted Pedigree`
  * Section Title: `Powering Leading Brands & Institutions`
  * Section Description: `We are proud design and print production partners to respected corporate, civic, and lifestyle organizations.`
* **And** the `#clients-root` / `.client-trust-grid` container must render a responsive CSS Grid displaying verified client trust cards:
  1. **CYMA HOMES Limited** *(Real Estate & Infrastructure)*
  2. **The Minaret Hospital (TMH)** *(Healthcare & Clinical Institutions)*
  3. **Planned Parenthood Federation of Nigeria (PPFN)** *(Public Health & NGO)*
  4. **Tour of Lagos Waterways (TOLW)** *(Marine Tourism & State Publications)*
  5. **GoWeld Engineering** *(Industrial Fabrication & Technical Services)*
  6. **Thesaurus Bay** *(Coastal Tourism & Hospitality)*
  7. **OAB Foundation** *(Philanthropy & Community Initiatives)*
  8. **Glazing Memoirs** *(FMCG Food, Beverage & Packaging)*
* **And** the grid must reflow fluidly using CSS Grid `repeat(auto-fit, minmax(140px, 1fr))` with `--space-lg` gap spacing.
* **And** each client card must maintain clean vertical and horizontal centering of the client badge/monogram, paired with the client company name and industry category badge.

---

### Scenario 2: Logo Filter Micro-Interactions & Visual States
* **Given** the client trust badges are displayed on desktop displays with fine pointers (`@media (hover: hover)`),
* **When** in default rest state,
* **Then** client badge containers display in an elegant, muted monochrome state:
  * `filter: grayscale(100%) opacity(0.7);`
  * Background: `var(--color-surface);`
  * Border: `1px solid var(--color-border);`
* **When** a user hovers over or focuses a client card,
* **Then** the card smoothly executes a transition over `var(--transition-normal)` (250ms):
  * `filter: grayscale(0%) opacity(1);`
  * `transform: translateY(-3px);`
  * `border-color: var(--color-primary-subtle);`
  * `box-shadow: var(--shadow-md);`
* **And** on touch/mobile devices, logos remain legible with full optical clarity without requiring touch interaction.

---

### Scenario 3: Comprehensive Semantic Footer Architecture & Direct Channels
* **Given** the page renders the global `<footer>` landmark (`<footer class="site-footer">`),
* **When** viewing the footer on any device,
* **Then** it must contain a multi-column responsive layout comprising 4 logical blocks:
  1. **Brand & Identity Block**:
     * MJr brand logo with accent badge (`MJr DESIGNS`).
     * Brand tagline: *"Creative Design. Strategic Branding. Quality Print."*
     * Brief business descriptor highlighting registered corporate status and full-service print capabilities.
  2. **Direct Contact & Channels Block (`<address>`)**:
     * **WhatsApp Consultation**: Direct clickable link to `https://wa.me/2348106246748` (`+234 810 624 6748`).
     * **Direct Phone Line**: `tel:+2348106246748`.
     * **Official Email**: `mailto:mjrgdesigns@gmail.com`.
     * **Operating Location**: Lagos, Nigeria (with nationwide delivery coverage note).
  3. **Quick Navigation Links Block**:
     * Smooth anchor links matching site landmarks: `#services` (Services), `#portfolio` (Portfolio), `#about` (About & Clients), `#contact` (Start Project), and `#top` (Back to Top).
  4. **Core Capabilities & Services Block**:
     * List of key services: Brand Identity Systems, Large Format Billboards, Commercial Publications, Custom Apparel & Merch.
* **And** the sub-footer bottom bar (`.footer-bottom`) must render:
  * Copyright notice: `© 2026 MJr Designs & Print Solutions Limited. All rights reserved.`
  * Pedagogical architectural credit: `Engineered with 100% Zero-Framework Vanilla Web Standards.`

---

### Scenario 4: Social Channels & External Link Security
* **Given** social channel triggers and external communication links inside the footer,
* **When** rendered,
* **Then** each external link must include:
  * `target="_blank"`
  * `rel="noopener noreferrer"`
  * Descriptive `aria-label` (e.g. `aria-label="Chat with MJr Designs on WhatsApp"`, `aria-label="Send email to MJr Designs"`).
  * Accessible inline SVG icons for WhatsApp, Email, Phone, and Instagram.

---

### Scenario 5: Accessibility (WCAG 2.1 AA) & Responsive Layout Reflow
* **Given** keyboard navigation or screen reader usage,
* **When** navigating through the `#about` client matrix and `<footer>`,
* **Then** all interactive elements receive high-contrast, visible focus indicators (`outline: 3px solid var(--color-primary); outline-offset: 2px;`).
* **And** all footer body text, contact links, and copyright notices maintain a minimum contrast ratio of \(\ge 4.5:1\) against `--color-charcoal-dark` (`#121212`).
* **And** on mobile viewports (\(< 768\text{px}\)), the footer collapses cleanly from a 4-column horizontal layout into a stacked single-column layout with touch-friendly targets (\(\ge 48\text{px}\)).

---

## 4. Technical Specifications & Architectural Compliance

### 4.1. Semantic HTML5 Markup (`index.html`)

```html
<!-- =========================================================================
     About & Verified Client Trust Section Landmark
     ========================================================================= -->
<section id="about" class="section about-section" aria-labelledby="about-title">
  <div class="container">
    <div class="section-header">
      <p class="section-tag">Trusted Pedigree</p>
      <h2 id="about-title" class="section-title">Powering Leading Brands &amp; Institutions</h2>
      <p class="section-desc">We are proud design and print production partners to respected corporate, civic, and lifestyle organizations.</p>
    </div>

    <!-- Verified Client Trust Grid -->
    <div class="client-trust-grid" id="clients-root">
      
      <!-- Client 1: CYMA Homes -->
      <div class="client-card">
        <div class="client-badge" aria-hidden="true">
          <span class="client-monogram">CYMA</span>
        </div>
        <h3 class="client-name">CYMA HOMES Limited</h3>
        <span class="client-sector">Real Estate &amp; Construction</span>
      </div>

      <!-- Client 2: The Minaret Hospital -->
      <div class="client-card">
        <div class="client-badge" aria-hidden="true">
          <span class="client-monogram">TMH</span>
        </div>
        <h3 class="client-name">The Minaret Hospital</h3>
        <span class="client-sector">Healthcare &amp; Clinical Services</span>
      </div>

      <!-- Client 3: PPFN -->
      <div class="client-card">
        <div class="client-badge" aria-hidden="true">
          <span class="client-monogram">PPFN</span>
        </div>
        <h3 class="client-name">Planned Parenthood (PPFN)</h3>
        <span class="client-sector">Public Health &amp; NGO</span>
      </div>

      <!-- Client 4: Tour of Lagos Waterways -->
      <div class="client-card">
        <div class="client-badge" aria-hidden="true">
          <span class="client-monogram">TOLW</span>
        </div>
        <h3 class="client-name">Tour of Lagos Waterways</h3>
        <span class="client-sector">Marine Tourism &amp; Editorial</span>
      </div>

      <!-- Client 5: GoWeld Engineering -->
      <div class="client-card">
        <div class="client-badge" aria-hidden="true">
          <span class="client-monogram">GW</span>
        </div>
        <h3 class="client-name">GoWeld Engineering</h3>
        <span class="client-sector">Industrial Fabrication</span>
      </div>

      <!-- Client 6: Thesaurus Bay -->
      <div class="client-card">
        <div class="client-badge" aria-hidden="true">
          <span class="client-monogram">TB</span>
        </div>
        <h3 class="client-name">Thesaurus Bay</h3>
        <span class="client-sector">Hospitality &amp; Leisure</span>
      </div>

      <!-- Client 7: OAB Foundation -->
      <div class="client-card">
        <div class="client-badge" aria-hidden="true">
          <span class="client-monogram">OAB</span>
        </div>
        <h3 class="client-name">OAB Foundation</h3>
        <span class="client-sector">Civic &amp; Philanthropy</span>
      </div>

      <!-- Client 8: Glazing Memoirs -->
      <div class="client-card">
        <div class="client-badge" aria-hidden="true">
          <span class="client-monogram">GM</span>
        </div>
        <h3 class="client-name">Glazing Memoirs</h3>
        <span class="client-sector">FMCG &amp; Food Packaging</span>
      </div>

    </div>
  </div>
</section>

<!-- =========================================================================
     Semantic Footer Landmark
     ========================================================================= -->
<footer class="site-footer" id="contact-info">
  <div class="container footer-container">
    <div class="footer-grid">
      
      <!-- Column 1: Brand & Tagline -->
      <div class="footer-col footer-col-brand">
        <a href="#top" class="brand-logo footer-logo" aria-label="MJr Designs & Print Solutions Home">
          <span class="logo-accent">MJr</span>
          <span class="logo-text">DESIGNS</span>
        </a>
        <p class="footer-tagline">Creative Design. Strategic Branding. Quality Print.</p>
        <p class="footer-about-text">
          A premier full-service design studio and commercial print production house delivering high-impact brand systems, publications, and apparel across Nigeria.
        </p>
      </div>

      <!-- Column 2: Direct Contact Channels -->
      <div class="footer-col footer-col-contact">
        <h4 class="footer-heading">Direct Channels</h4>
        <address class="footer-address">
          <ul class="footer-contact-list">
            <li>
              <a href="https://wa.me/2348106246748?text=Hello%20MJr%20Designs%2C%20I%20would%20like%20to%20inquire%20about%20a%20project." 
                 class="footer-contact-link" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 data-action="whatsapp-inquire"
                 data-context="Footer Direct WhatsApp">
                <svg class="footer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
                <span>WhatsApp: +234 810 624 6748</span>
              </a>
            </li>
            <li>
              <a href="tel:+2348106246748" class="footer-contact-link">
                <svg class="footer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>Call: +234 810 624 6748</span>
              </a>
            </li>
            <li>
              <a href="mailto:mjrgdesigns@gmail.com" class="footer-contact-link">
                <svg class="footer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>Email: mjrgdesigns@gmail.com</span>
              </a>
            </li>
            <li class="footer-location-item">
              <svg class="footer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>Lagos, Nigeria (Nationwide Dispatch)</span>
            </li>
          </ul>
        </address>
      </div>

      <!-- Column 3: Quick Navigation -->
      <div class="footer-col footer-col-links">
        <h4 class="footer-heading">Navigation</h4>
        <ul class="footer-nav-list">
          <li><a href="#services" class="footer-nav-link">Service Pillars</a></li>
          <li><a href="#portfolio" class="footer-nav-link">Portfolio &amp; Case Studies</a></li>
          <li><a href="#about" class="footer-nav-link">About &amp; Verified Clients</a></li>
          <li><a href="#contact" class="footer-nav-link">Consultation Quote</a></li>
          <li><a href="#top" class="footer-nav-link">Back to Top ↑</a></li>
        </ul>
      </div>

      <!-- Column 4: Core Capabilities -->
      <div class="footer-col footer-col-services">
        <h4 class="footer-heading">Capabilities</h4>
        <ul class="footer-capabilities-list">
          <li>Brand Identity &amp; Strategy</li>
          <li>Publications &amp; Catalogs</li>
          <li>Large Format Billboard Ads</li>
          <li>Custom Branded Apparel &amp; Caps</li>
          <li>Safety Gear &amp; Hard Hats</li>
        </ul>
      </div>

    </div>

    <!-- Sub-Footer Bottom Bar -->
    <div class="footer-bottom">
      <div class="footer-bottom-content">
        <p class="copyright">&copy; 2026 MJr Designs &amp; Print Solutions Limited. All rights reserved.</p>
        <p class="architecture-credit">Built with 100% Zero-Framework Vanilla Web Standards</p>
      </div>
    </div>
  </div>
</footer>
```

---

### 4.2. CSS Styling Implementation (`styles.css`)

```css
/* --------------------------------------------------------------------------
   ABOUT & CLIENT TRUST MATRIX STYLES
   -------------------------------------------------------------------------- */
.about-section {
  background-color: var(--color-bg);
  padding-top: var(--space-4xl);
  padding-bottom: var(--space-4xl);
  border-top: 1px solid var(--color-border);
}

.client-trust-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-md);
  margin-top: var(--space-2xl);
}

@media (min-width: 640px) {
  .client-trust-grid {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: var(--space-lg);
  }
}

.client-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-lg) var(--space-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal), filter var(--transition-normal);
  filter: grayscale(100%) opacity(0.75);
}

@media (hover: hover) and (pointer: fine) {
  .client-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
    border-color: var(--color-primary-subtle);
    filter: grayscale(0%) opacity(1);
  }
}

@media (hover: none) {
  .client-card {
    filter: grayscale(0%) opacity(1);
  }
}

.client-badge {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-md);
  background-color: var(--color-primary-light);
  border: 1px solid var(--color-primary-subtle);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-md);
  transition: background-color var(--transition-fast);
}

.client-card:hover .client-badge {
  background-color: var(--color-primary);
}

.client-monogram {
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-extrabold);
  color: var(--color-primary-dark);
  letter-spacing: -0.02em;
  transition: color var(--transition-fast);
}

.client-card:hover .client-monogram {
  color: var(--color-surface);
}

.client-name {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  color: var(--color-charcoal);
  margin-bottom: var(--space-xs);
  line-height: var(--line-height-snug);
}

.client-sector {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  font-weight: var(--font-weight-medium);
}

/* --------------------------------------------------------------------------
   SEMANTIC FOOTER STYLES
   -------------------------------------------------------------------------- */
.site-footer {
  background-color: var(--color-charcoal-dark);
  color: #B0B0B0;
  padding-top: var(--space-4xl);
  padding-bottom: var(--space-2xl);
  border-top: 1px solid #282828;
  margin-top: auto;
}

.footer-container {
  display: flex;
  flex-direction: column;
  gap: var(--space-3xl);
}

.footer-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-2xl);
}

@media (min-width: 640px) {
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .footer-grid {
    grid-template-columns: 1.6fr 1.2fr 1fr 1fr;
    gap: var(--space-3xl);
  }
}

.footer-logo .logo-text {
  color: var(--color-surface);
}

.footer-tagline {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  margin-top: var(--space-sm);
  margin-bottom: var(--space-sm);
}

.footer-about-text {
  font-size: var(--font-size-sm);
  line-height: var(--line-height-normal);
  color: #999999;
  max-width: 320px;
}

.footer-heading {
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-bold);
  color: var(--color-surface);
  margin-bottom: var(--space-lg);
  letter-spacing: -0.01em;
}

.footer-address {
  font-style: normal;
}

.footer-contact-list,
.footer-nav-list,
.footer-capabilities-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.footer-contact-link,
.footer-nav-link {
  font-size: var(--font-size-sm);
  color: #B0B0B0;
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  transition: color var(--transition-fast), padding-left var(--transition-fast);
}

.footer-contact-link:hover,
.footer-nav-link:hover {
  color: var(--color-primary);
  padding-left: var(--space-xs);
}

.footer-icon {
  width: 18px;
  height: 18px;
  color: var(--color-primary);
  flex-shrink: 0;
}

.footer-location-item {
  font-size: var(--font-size-sm);
  color: #888888;
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  margin-top: var(--space-xs);
}

.footer-capabilities-list li {
  font-size: var(--font-size-sm);
  color: #888888;
}

.footer-bottom {
  padding-top: var(--space-xl);
  border-top: 1px solid #222222;
}

.footer-bottom-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  align-items: center;
  text-align: center;
  font-size: var(--font-size-xs);
  color: #777777;
}

@media (min-width: 768px) {
  .footer-bottom-content {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
}

.architecture-credit {
  color: var(--color-text-light);
  font-weight: var(--font-weight-medium);
}
```

---

## 5. Verification & Testing Matrix

| Test ID | Test Scope | Verification Method | Expected Result |
| :--- | :--- | :--- | :--- |
| **TC-221** | Client Trust Grid Rendering | Inspect `#about` in browser | Exactly 8 authenticated client cards render with clean badges, names, and industry sectors. |
| **TC-222** | Responsive CSS Grid Reflow | Resize viewport from 320px to 1440px | Reflows cleanly: 2 columns on mobile, 3–4 columns on tablet, auto-fit on desktop without horizontal scroll. |
| **TC-223** | Grayscale Filter Micro-Interactions | Hover over client cards on desktop | Smooth transition from `grayscale(100%)` to `grayscale(0%)`, card lifts by `4px`, and badge background shifts to brand primary. |
| **TC-224** | Semantic Footer Contact Routing | Click WhatsApp, phone, and email links in `<footer>` | WhatsApp launches `wa.me/2348106246748`, phone link triggers `tel:`, and email opens mail client to `mjrgdesigns@gmail.com`. |
| **TC-225** | Navigation & Smooth Back-to-Top | Click `Back to Top ↑` and section anchors in footer | Viewport smoothly scrolls to target landmark (`#top`, `#services`, etc.) respecting `scroll-margin-top`. |
| **TC-226** | A11y & Contrast Audit | Chrome DevTools Lighthouse / Axe accessibility audit | WCAG 2.1 AA compliant; footer text contrast \(\ge 4.5:1\); all icon SVGs marked `aria-hidden="true"`; interactive links receive high-contrast focus rings. |

---

## 6. Pedagogical Checkpoint (`bmad-frontend-tutor`)

Upon completion of Story 2.2 implementation, the developer/student will engage with `bmad-frontend-tutor` to deconstruct:
1. **CSS Filter Matrix & Hardware Acceleration**: How `filter: grayscale()` interacts with the browser's compositing layer, GPU acceleration, and `@media (hover: hover)` media queries for touch devices.
2. **Semantic HTML5 Landmarks & Addressing**: The role of `<footer>`, `<address>`, and heading levels (`<h2>` to `<h4>`) in assistive technology navigation trees.
3. **Multi-Column Responsive Grid Architecture**: Auto-fit minmax patterns vs multi-tier media query breakpoints for comprehensive footer layouts.
4. **Active-Recall Flashcards & MCQs**: Generation of 20+ atomic cards covering CSS filters, semantic footer landmarks, NAP (Name, Address, Phone) SEO principles, and accessibility contrast standards.
