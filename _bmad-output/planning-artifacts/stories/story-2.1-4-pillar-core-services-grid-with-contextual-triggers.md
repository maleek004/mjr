# Story 2.1: 4-Pillar Core Services Grid with Contextual Triggers

**Epic**: Epic 2: Core Service Pillars & Verified Client Trust Matrix  
**Status**: Ready for Implementation  
**Author**: Mary (Business Analyst)  
**Date**: 2026-09-26  
**Target Files**: `index.html`, `styles.css`, `app.js`

---

## 1. User Story Statement

**As a** prospective corporate procurement officer, event manager, or brand owner exploring MJr Designs & Print Solutions,  
**I want** to browse a responsive, highly structured 4-pillar service grid detailing specific design, marketing, commercial printing, and custom apparel capabilities,  
**So that** I can clearly identify the exact service package suited for my organization and initiate an instant, pre-filled WhatsApp consultation tailored directly to that service pillar.

---

## 2. Strategic Context & Business Value

* **Eliminating Service Ambiguity (Categorical Clarity)**: Clients often struggle to understand whether an agency handles pure creative design, high-volume industrial printing, or both. Organizing MJr’s capabilities into four distinct, exhaustive pillars immediately demonstrates end-to-end full-lifecycle capability (from conceptual logo design to mass garment printing and outdoor billboards).
* **Contextual Lead Qualification (Reduced Friction)**: Generic *"Contact Us"* CTAs introduce cognitive friction. Providing a dedicated *"Inquire for [Service]"* trigger on each pillar card passes the specific service metadata directly into WhatsApp (`+2348106246748`), ensuring the client doesn't need to type an introductory pitch from scratch.
* **Responsive 2D Grid Architecture**: Implements CSS Grid with `repeat(auto-fit, minmax(280px, 1fr))` ensuring cards automatically distribute symmetrically across desktop, tablet, and mobile displays without hardcoded media query hacks.
* **Pedagogical Significance**: Demonstrates 2D layout mechanics, the difference between intrinsic and extrinsic grid tracks, flexbox distribution within grid items (equal height cards and sticky bottom CTAs), and event delegation metadata routing.

---

## 3. Detailed Acceptance Criteria (Gherkin Format)

### Scenario 1: 4-Pillar Service Grid Layout & Structural Hierarchy
* **Given** a visitor navigates or scrolls to `#services`,
* **When** the section renders,
* **Then** it must display a semantic section header:
  * Section Tag: `Core Capabilities`
  * Section Title: `End-to-End Design & Print Production`
  * Section Description: `From concept to physical execution, we deliver uncompromised precision across four core pillars.`
* **And** the `#services-grid` container must render exactly four service pillar cards:
  1. **Pillar 1**: *Brand Identity & Graphic Design*
  2. **Pillar 2**: *Marketing & Advertising Design*
  3. **Pillar 3**: *Print & Publication Production*
  4. **Pillar 4**: *Event & Environmental Branding (Custom Shirts & Merch)*
* **And** the grid must use responsive CSS Grid `repeat(auto-fit, minmax(280px, 1fr))` with `--space-xl` gap spacing.
* **And** all cards in the grid must maintain uniform equal height (`align-items: stretch`), with internal content distributed vertically so the CTA button is pinned to the card bottom (`margin-top: auto`).

---

### Scenario 2: Service Deliverables & Pillar Content Breakdown
* **Given** the 4 service cards are rendered,
* **When** reviewing individual card contents,
* **Then** each card must contain:
  * **Visual Pillar Icon / SVG Badge**: Accessible icon container styled with brand accent tints (`--color-primary-light` background, `--color-primary` foreground).
  * **Pillar Title (`<h3>`)**: Crisp title with `--font-size-h3` (20px–24px) in `--color-charcoal`.
  * **Pillar Description**: 2-line strategic overview explaining the business impact of the service.
  * **Deliverables Bullet List (`<ul class="service-deliverables">`)**: 4–5 concrete deliverables featuring custom checkmark bullets.
  * **Contextual Action CTA**: Button or anchor with specific service labeling.

#### Pillar Specifications Breakdown:

| Pillar # | Title | Icon Theme | Key Deliverables | Contextual CTA Text | Context String |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | **Brand Identity & Graphic Design** | Vector / Pen Tool | • Logo Systems & Brand Guidelines<br>• Business Stationery & Letterheads<br>• Corporate Profiles & Pitch Decks<br>• Vector Illustrations & Rebranding | `Inquire: Brand Identity` | `Brand Identity & Corporate Design` |
| **2** | **Marketing & Advertising Design** | Campaign / Megaphone | • Outdoor & Highway Billboard Creatives<br>• Social Media Campaign Graphics<br>• Roll-Up Banners & Posters<br>• Promotional Flyers & Handbills | `Inquire: Marketing Design` | `Marketing & Advertising Design` |
| **3** | **Print & Publication Production** | Book / Print Press | • High-Volume Magazines & Compendiums<br>• Annual Reports & Catalogs<br>• Custom Event Programs & Brochures<br>• Luxury Calendars & Presentation Folders | `Inquire: Print Production` | `Print & Publication Production` |
| **4** | **Event & Environmental Branding** | Apparel / T-Shirt | • Custom Branded T-Shirts & Polos<br>• Corporate Hard Hats & Safety Vests<br>• Branded Caps, Bags & Corporate Gifts<br>• Stage Backdrops & Exhibition Booths | `Inquire: Custom Apparel` | `Event & Custom Apparel Branding` |

---

### Scenario 3: Contextual WhatsApp Lead Generation Triggers
* **Given** any of the 4 contextual CTA buttons is clicked,
* **When** the centralized event listener on `document.body` catches the event via `e.target.closest('[data-action="whatsapp-inquire"]')`,
* **Then** it reads the `data-context` or `data-service` attribute from the element.
* **And** it generates a sanitized WhatsApp URL targeting `+2348106246748` containing the specific pre-formatted message:
  * **Pillar 1**: `Hello MJr Designs, I am interested in your Brand Identity & Corporate Design packages.`
  * **Pillar 2**: `Hello MJr Designs, I would like to discuss Marketing & Advertising Design services for my campaign.`
  * **Pillar 3**: `Hello MJr Designs, I would like to request a quote for Print & Publication Production.`
  * **Pillar 4**: `Hello MJr Designs, I am looking for custom shirt and apparel printing for my brand/organization.`
* **And** it opens the URL in a new browser tab with `rel="noopener noreferrer"`.

---

### Scenario 4: Hover Micro-Interactions, Polish & Accessibility
* **Given** a user hovers over any service card on desktop,
* **When** the cursor enters the card boundary,
* **Then** the card executes a smooth elevation transition:
  * `transform: translateY(-4px);`
  * `box-shadow: var(--shadow-lg);`
  * `border-color: var(--color-primary-subtle);`
  * Transition duration: `var(--transition-normal)` (250ms ease).
* **And** when tabbing through the service cards via keyboard,
* **Then** each CTA button receives a visible `outline: 3px solid var(--color-primary); outline-offset: 2px`.
* **And** all text and deliverable items satisfy WCAG 2.1 AA contrast requirements (\(\ge 4.5:1\)).

---

## 4. Technical Specifications & Architectural Compliance

### 4.1. Semantic HTML5 Markup (`index.html`)

```html
<!-- Core Services Section Landmark -->
<section id="services" class="section services-section" aria-labelledby="services-title">
  <div class="container">
    <div class="section-header">
      <p class="section-tag">Core Capabilities</p>
      <h2 id="services-title" class="section-title">End-to-End Design &amp; Print Production</h2>
      <p class="section-desc">From concept to physical execution, we deliver uncompromised precision across four core pillars.</p>
    </div>

    <!-- 4-Pillar Grid -->
    <div class="services-grid" id="services-grid">
      
      <!-- Pillar 1: Brand Identity -->
      <article class="service-card" aria-labelledby="service-title-1">
        <div class="service-icon-wrap" aria-hidden="true">
          <svg class="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
            <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
            <path d="M2 2l7.586 7.586"></path>
            <circle cx="11" cy="11" r="2"></circle>
          </svg>
        </div>
        <h3 id="service-title-1" class="service-title">Brand Identity &amp; Graphic Design</h3>
        <p class="service-description">Distill your company's core ethos into authoritative, memorable visual identity systems that command market respect.</p>
        <ul class="service-deliverables" role="list">
          <li>Logo Systems &amp; Brand Style Guides</li>
          <li>Corporate Stationery &amp; Letterheads</li>
          <li>Company Profiles &amp; Executive Decks</li>
          <li>Vector Art &amp; Full Brand Rebranding</li>
        </ul>
        <a href="https://wa.me/2348106246748?text=Hello%20MJr%20Designs%2C%20I%20am%20interested%20in%20your%20Brand%20Identity%20%26%20Corporate%20Design%20packages." 
           class="btn btn-outline btn-block service-cta" 
           target="_blank" 
           rel="noopener noreferrer" 
           data-action="whatsapp-inquire" 
           data-context="Brand Identity & Corporate Design">
          Inquire: Brand Identity
        </a>
      </article>

      <!-- Pillar 2: Marketing & Advertising -->
      <article class="service-card" aria-labelledby="service-title-2">
        <div class="service-icon-wrap" aria-hidden="true">
          <svg class="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 11l18-5v12L3 13v-2z"></path>
            <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path>
          </svg>
        </div>
        <h3 id="service-title-2" class="service-title">Marketing &amp; Advertising Design</h3>
        <p class="service-description">High-impact creative collateral designed to drive customer acquisition across physical and digital touchpoints.</p>
        <ul class="service-deliverables" role="list">
          <li>Highway &amp; Street Billboard Creatives</li>
          <li>Social Media &amp; Digital Ad Campaigns</li>
          <li>Roll-Up Banners &amp; Event Posters</li>
          <li>Direct Marketing Flyers &amp; Handbills</li>
        </ul>
        <a href="https://wa.me/2348106246748?text=Hello%20MJr%20Designs%2C%20I%20would%20like%20to%20discuss%20Marketing%20%26%20Advertising%20Design%20services%20for%20my%20campaign." 
           class="btn btn-outline btn-block service-cta" 
           target="_blank" 
           rel="noopener noreferrer" 
           data-action="whatsapp-inquire" 
           data-context="Marketing & Advertising Design">
          Inquire: Marketing Design
        </a>
      </article>

      <!-- Pillar 3: Print & Publication -->
      <article class="service-card" aria-labelledby="service-title-3">
        <div class="service-icon-wrap" aria-hidden="true">
          <svg class="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
          </svg>
        </div>
        <h3 id="service-title-3" class="service-title">Print &amp; Publication Production</h3>
        <p class="service-description">Commercial-grade offset and digital printing with premium paper stock, flawless binding, and precise color reproduction.</p>
        <ul class="service-deliverables" role="list">
          <li>High-Volume Magazines &amp; Compendiums</li>
          <li>Annual Corporate Reports &amp; Catalogs</li>
          <li>Event Programs &amp; Glossy Brochures</li>
          <li>Luxury Calendars &amp; Branded Folders</li>
        </ul>
        <a href="https://wa.me/2348106246748?text=Hello%20MJr%20Designs%2C%20I%20would%20like%20to%20request%20a%20quote%20for%20Print%20%26%20Publication%20Production." 
           class="btn btn-outline btn-block service-cta" 
           target="_blank" 
           rel="noopener noreferrer" 
           data-action="whatsapp-inquire" 
           data-context="Print & Publication Production">
          Inquire: Print Production
        </a>
      </article>

      <!-- Pillar 4: Event & Custom Apparel -->
      <article class="service-card" aria-labelledby="service-title-4">
        <div class="service-icon-wrap" aria-hidden="true">
          <svg class="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"></path>
          </svg>
        </div>
        <h3 id="service-title-4" class="service-title">Event &amp; Environmental Branding</h3>
        <p class="service-description">Transform corporate teams, streetwear brands, and venue environments with custom garments and physical branding.</p>
        <ul class="service-deliverables" role="list">
          <li>Custom Branded T-Shirts, Hoodies &amp; Polos</li>
          <li>Corporate Hard Hats &amp; Safety Vests</li>
          <li>Branded Caps, Tote Bags &amp; Souvenirs</li>
          <li>Stage Backdrops &amp; Exhibition Displays</li>
        </ul>
        <a href="https://wa.me/2348106246748?text=Hello%20MJr%20Designs%2C%20I%20am%20looking%20for%20custom%20shirt%20and%20apparel%20printing%20for%20my%20brand%2Forganization." 
           class="btn btn-outline btn-block service-cta" 
           target="_blank" 
           rel="noopener noreferrer" 
           data-action="whatsapp-inquire" 
           data-context="Event & Custom Apparel Branding">
          Inquire: Custom Apparel
        </a>
      </article>

    </div>
  </div>
</section>
```

---

### 4.2. CSS Styling Implementation (`styles.css`)

```css
/* --------------------------------------------------------------------------
   SERVICES SECTION & 4-PILLAR GRID STYLES
   -------------------------------------------------------------------------- */
.services-section {
  background-color: var(--color-surface);
  padding-top: var(--space-4xl);
  padding-bottom: var(--space-4xl);
}

.services-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-xl);
  margin-top: var(--space-2xl);
}

@media (min-width: 640px) {
  .services-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
}

.service-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-xl);
  display: flex;
  flex-direction: column;
  transition: transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal);
  box-shadow: var(--shadow-sm);
  position: relative;
}

.service-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary-subtle);
}

.service-icon-wrap {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-lg);
  background-color: var(--color-primary-light);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-lg);
}

.service-icon {
  width: 24px;
  height: 24px;
}

.service-title {
  font-size: var(--font-size-h3);
  font-weight: var(--font-weight-bold);
  color: var(--color-charcoal);
  margin-bottom: var(--space-sm);
  line-height: var(--line-height-snug);
}

.service-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  line-height: var(--line-height-normal);
  margin-bottom: var(--space-lg);
}

.service-deliverables {
  list-style: none;
  padding: 0;
  margin: 0 0 var(--space-xl) 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.service-deliverables li {
  font-size: var(--font-size-sm);
  color: var(--color-text);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.service-deliverables li::before {
  content: "✓";
  color: var(--color-primary);
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-xs);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  background-color: var(--color-primary-light);
  border-radius: var(--radius-full);
  flex-shrink: 0;
}

.service-cta {
  margin-top: auto;
  border-color: var(--color-border);
  color: var(--color-charcoal);
  font-weight: var(--font-weight-semibold);
  transition: all var(--transition-fast);
}

.service-card:hover .service-cta {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-surface);
}
```

---

## 5. Verification & Testing Matrix

| Test ID | Test Scope | Verification Method | Expected Result |
| :--- | :--- | :--- | :--- |
| **TC-201** | 4-Pillar Grid Rendering | Inspect `#services-grid` in browser | Exactly 4 semantic cards render with correct icons, titles, descriptions, deliverables, and buttons. |
| **TC-202** | 2D CSS Grid Reflow | Resize browser viewport from 320px to 1440px | Grid reflows smoothly: 1 column on mobile (\(<640\text{px}\)), 2 columns on tablet, and 4 columns / auto-fit on desktop. |
| **TC-203** | Equal Height Alignment | Inspect cards with differing content heights | All 4 cards stretch to equal height; all `.service-cta` buttons align perfectly at the bottom. |
| **TC-204** | Contextual WhatsApp Triggers | Click each of the 4 service CTA buttons | Opens `wa.me/2348106246748` with the exact corresponding service inquiry pre-filled. |
| **TC-205** | Card Elevation Micro-Interactions | Hover over each service card on desktop | Card lifts by `4px`, shadow deepens to `--shadow-lg`, and CTA button transitions to brand orange. |
| **TC-206** | A11y & Keyboard Navigation | Tab key navigation across cards | Focus rings outline CTAs visibly with `outline: 3px solid var(--color-primary)`; SVG icons are hidden from screen readers (`aria-hidden="true"`). |

---

## 6. Pedagogical Checkpoint (`bmad-frontend-tutor`)

Upon completion of Story 2.1 implementation, the developer/student will engage with `bmad-frontend-tutor` to deconstruct:
1. **CSS Grid 2D Mechanics vs Flexbox 1D**: How `repeat(auto-fit, minmax(280px, 1fr))` computes track sizing and prevents orphan cards without JavaScript resize listeners.
2. **Intrinsic vs Extrinsic Sizing**: The interplay of `minmax()`, `fr` units, and container widths.
3. **Card Flex Alignment (`margin-top: auto`)**: How `margin-top: auto` in a column flex container consumes all remaining vertical space to keep CTA buttons perfectly aligned across varying text lengths.
4. **Active-Recall Flashcards & MCQs**: Generation of 20+ atomic cards on CSS Grid formatting context, layout algorithms, and B2B conversion design patterns.
