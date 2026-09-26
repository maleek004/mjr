# Story 3.1: JavaScript Portfolio Data Modeling & Card Grid Layout

**Epic**: Epic 3: Interactive Filterable Portfolio & Accessible Case Study Lightbox  
**Status**: Ready for Implementation  
**Author**: Mary (Business Analyst)  
**Date**: 2026-09-26  
**Target Files**: `index.html`, `styles.css`, `app.js`

---

## 1. User Story Statement

**As a** corporate client, marketing director, or creative buyer exploring MJr Designs & Print Solutions,  
**I want** to browse an interactive, visually rich gallery of authentic case studies rendered dynamically from a centralized JavaScript data model (`PORTFOLIO_DATA`), featuring responsive card layouts, deliverable scope tags, and case inspection triggers,  
**So that** I can evaluate MJr's proven craftsmanship across real estate, editorial publications, FMCG packaging, large-format advertising, and custom apparel manufacturing.

---

## 2. Strategic Context & Business Value

* **Tangible Proof of Execution (Credibility Engine)**: B2B buyers and institutional committees make hiring decisions based on demonstrated proof of work. Presenting full-spectrum case studies—from *CYMA Homes* (complete brand identity and safety gear) to *Tour of Lagos Waterways* (editorial magazines) and *Custom Streetwear Apparel* (garment printing)—proves that MJr operates as an industrial-grade creative studio and print manufacturing powerhouse.
* **Unidirectional State Flow & Data-Driven DOM Architecture (AD-2)**: Hardcoding portfolio cards directly into HTML introduces maintenance overhead, duplicate metadata, and synchronization bugs when category filtering or lightbox modals are added. Modeling the portfolio as an immutable JavaScript array (`PORTFOLIO_DATA`) in `app.js` provides a single source of truth that renders cards dynamically into `#portfolio-root`, laying the exact foundation for Story 3.2 (Filtering) and Story 3.3 (Lightbox Modal).
* **Responsive 2D CSS Grid Layout (NFR-104)**: Cards are arranged in a responsive multi-column grid (`repeat(auto-fit, minmax(320px, 1fr))`), delivering equal-height cards, fluid typography, badge pill tags, and polished hover elevations without external CSS frameworks.
* **Pedagogical Significance**: Deconstructs modern ES6+ data structures (object arrays, immutability with `Object.freeze`), DOM generation strategies (template literals with sanitization vs direct element creation), browser native lazy-loading (`loading="lazy"`), aspect-ratio CSS boxes, and metadata attribute binding (`data-action`, `data-project-id`, `data-category`).

---

## 3. Detailed Acceptance Criteria (Gherkin Format)

### Scenario 1: JavaScript Portfolio Data Model Specification (`PORTFOLIO_DATA`)
* **Given** the application script `app.js` initializes,
* **When** the script execution starts,
* **Then** it defines an immutable data structure `PORTFOLIO_DATA` containing exactly 6 authentic case studies:
  1. **`cyma-homes`**: CYMA HOMES Limited (*Category: `branding`*, *Title: CYMA HOMES Limited*, *Deliverables: Logo Design, Brand Identity, Hard Hats, Corporate Stationery, Vehicle Branding*)
  2. **`streetwear-merch`**: Custom Branded Shirts & Streetwear (*Category: `apparel`*, *Title: Custom Branded Shirts & Streetwear*, *Deliverables: Custom T-Shirts, Heavyweight Hoodies, Trucker Caps, Screen & Heatpress Print*)
  3. **`glazing-memoirs`**: Glazing Memoirs (*Category: `branding`*, *Title: Glazing Memoirs FMCG*, *Deliverables: Brand Identity, Yoghurt Bottles, Food Packaging, Takeaway Bags*)
  4. **`tolw-brochure`**: Tour of Lagos Waterways (*Category: `publications`*, *Title: Tour of Lagos Waterways (TOLW)*, *Deliverables: 5th Edition Magazine, Editorial Design, Event Programs, Outdoor Banners*)
  5. **`skillforge-billboard`**: SkillForge ICT Academy (*Category: `marketing`*, *Title: SkillForge ICT Academy*, *Deliverables: Large Format Billboard, Social Media Campaigns, Roll-Up Banners*)
  6. **`oab-foundation`**: OAB Foundation (*Category: `branding`*, *Title: OAB Foundation Civic Outreach*, *Deliverables: Brand Guidelines, Annual Compendium, Souvenir Merchandise, Event Signage*)
* **And** each project object conforms strictly to the schema:
  * `id` (string, unique kebab-case slug)
  * `title` (string, official client/project title)
  * `client` (string, client organization name)
  * `category` (string, slug: `branding` | `publications` | `marketing` | `apparel`)
  * `categoryLabel` (string, human-readable category badge)
  * `thumbnail` (string, image asset path or inline stylized SVG data URI)
  * `fullImage` (string, high-resolution mockup image path or preview SVG)
  * `scope` (array of strings, deliverable tags e.g. `['Logo Design', 'Stationery', 'Safety Gear']`)
  * `description` (string, 2–3 sentence executive summary of project objectives and delivered artifacts)
  * `accentColor` (string, hex color or gradient theme for card accent)
  * `whatsappContext` (string, specific context identifier for lead routing)

---

### Scenario 2: Dynamic DOM Card Grid Generation into `#portfolio-root`
* **Given** `index.html` contains the container `<div class="portfolio-grid" id="portfolio-grid">` inside `<section id="portfolio">`,
* **When** `DOMContentLoaded` fires,
* **Then** the application engine calls `renderPortfolioCards(PORTFOLIO_DATA)` to populate the container.
* **And** each rendered card (`<article class="portfolio-card" data-project-id="..." data-category="...">`) contains:
  * **Card Visual Media Wrapper (`.portfolio-media`)**:
    * Responsive image or visual mock banner with `aspect-ratio: 16 / 10`.
    * Lazy loading attribute `loading="lazy"` with descriptive `alt` text.
    * Category badge pill overlaid in top corner (e.g. `Brand Identity`, `Custom Apparel`).
  * **Card Body Content (`.portfolio-body`)**:
    * Project title (`<h3 class="portfolio-card-title">`).
    * Brief project summary paragraph (`<p class="portfolio-card-desc">`).
    * Deliverable scope tag list (`<ul class="portfolio-tag-list" role="list">`) rendering chips with `#` prefix (e.g. `<span>#LogoDesign</span>`).
  * **Card Action Footer (`.portfolio-footer`)**:
    * Primary action button: *"Inspect Case Study"* with attributes `data-action="open-modal"` and `data-project-id="[id]"`.
    * Secondary quick WhatsApp trigger: *"Inquire"* with attributes `data-action="whatsapp-inquire"` and `data-context="[whatsappContext]"`.
* **And** the cards render symmetrically in a CSS Grid with `repeat(auto-fit, minmax(320px, 1fr))` and `--space-xl` gaps.

---

### Scenario 3: Hover Elevation, Focus & Visual Polish
* **Given** a user interacts with portfolio cards on desktop (`@media (hover: hover)`),
* **When** hovering over any portfolio card,
* **Then** the card executes a smooth elevation transition:
  * `transform: translateY(-6px);`
  * `box-shadow: var(--shadow-lg);`
  * `border-color: var(--color-primary-subtle);`
  * Media image smoothly scales slightly (`transform: scale(1.03)` with `overflow: hidden` on parent).
* **And** when tabbing through via keyboard:
  * Interactive buttons receive distinct focus outlines (`outline: 3px solid var(--color-primary); outline-offset: 2px`).
  * DOM tab order flows logically from card media \(\rightarrow\) scope tags \(\rightarrow\) Inspect button \(\rightarrow\) WhatsApp button.

---

### Scenario 4: Graceful Degradation & Visual Fallbacks
* **Given** image assets are loading or network bandwidth is constrained,
* **When** portfolio cards render,
* **Then** media containers display a styled background gradient and SVG monogram fallback so the card maintains zero layout shift (CLS = 0) and pristine visual structure.
* **And** all text elements pass WCAG 2.1 AA contrast standards (\(\ge 4.5:1\)).

---

## 4. Technical Specifications & Architectural Compliance

### 4.1. Data Model Schema (`app.js`)

```javascript
/**
 * Immutable Portfolio Data Model
 * Single source of truth for all portfolio items, filtering, and modal dialogs.
 */
const PORTFOLIO_DATA = Object.freeze([
  {
    id: "cyma-homes",
    title: "CYMA HOMES Limited",
    client: "CYMA HOMES Limited",
    category: "branding",
    categoryLabel: "Brand Identity & Corporate Design",
    thumbnail: "assets/images/portfolio/cyma-preview.jpg",
    fullImage: "assets/images/portfolio/cyma-full.jpg",
    scope: ["Logo System", "Brand Identity", "Hard Hats & Safety Vests", "Corporate Stationery", "Vehicle Fleet Graphics"],
    description: "Complete corporate identity system and industrial safety gear branding for a high-profile real estate development firm in Lagos.",
    accentColor: "#FF6B00",
    whatsappContext: "CYMA Homes Corporate Branding"
  },
  {
    id: "streetwear-merch",
    title: "Custom Branded Shirts & Streetwear",
    client: "Streetwear & Corporate Apparel Clients",
    category: "apparel",
    categoryLabel: "Custom Apparel & Merch",
    thumbnail: "assets/images/portfolio/apparel-preview.jpg",
    fullImage: "assets/images/portfolio/apparel-full.jpg",
    scope: ["Heavyweight Cotton Tees", "Embroidery & Screenprint", "Trucker Caps", "Tote Bags", "Woven Neck Labels"],
    description: "High-volume custom t-shirt and lifestyle apparel production featuring precision screen printing, heat press, and bespoke brand packaging.",
    accentColor: "#1A1A1A",
    whatsappContext: "Custom Shirt & Apparel Printing"
  },
  {
    id: "glazing-memoirs",
    title: "Glazing Memoirs FMCG",
    client: "Glazing Memoirs Food & Beverage",
    category: "branding",
    categoryLabel: "Packaging & Brand Identity",
    thumbnail: "assets/images/portfolio/glazing-preview.jpg",
    fullImage: "assets/images/portfolio/glazing-full.jpg",
    scope: ["Logo Refresh", "Yoghurt Bottle Labels", "Food Packaging", "Takeaway Bags", "Marketing Flyers"],
    description: "Vibrant brand identity, custom product bottle labels, and food packaging suites engineered for fast-moving retail consumer appeal.",
    accentColor: "#E05A00",
    whatsappContext: "Glazing Memoirs Product Packaging"
  },
  {
    id: "tolw-brochure",
    title: "Tour of Lagos Waterways (TOLW)",
    client: "Tour of Lagos Waterways Initiative",
    category: "publications",
    categoryLabel: "Publications & Editorial",
    thumbnail: "assets/images/portfolio/tolw-preview.jpg",
    fullImage: "assets/images/portfolio/tolw-full.jpg",
    scope: ["5th Edition Magazine", "Editorial Layout", "Event Program Compendium", "VIP Badges", "Outdoor Signage"],
    description: "High-volume editorial magazine and event publication production with luxury spot UV finishing, perfect binding, and color fidelity.",
    accentColor: "#006699",
    whatsappContext: "Tour of Lagos Waterways Publications"
  },
  {
    id: "skillforge-billboard",
    title: "SkillForge ICT Academy",
    client: "SkillForge Tech Institute",
    category: "marketing",
    categoryLabel: "Marketing & Billboards",
    thumbnail: "assets/images/portfolio/skillforge-preview.jpg",
    fullImage: "assets/images/portfolio/skillforge-full.jpg",
    scope: ["Highway Billboard Creative", "Digital Campaign Ads", "Roll-Up Banners", "Course Catalogs"],
    description: "High-visibility outdoor billboard campaigns and multi-channel marketing collateral designed to maximize student enrollment conversions.",
    accentColor: "#2E5BFF",
    whatsappContext: "SkillForge Large Format Billboard"
  },
  {
    id: "oab-foundation",
    title: "OAB Foundation Civic Outreach",
    client: "OAB Philanthropic Foundation",
    category: "branding",
    categoryLabel: "Civic & Editorial Branding",
    thumbnail: "assets/images/portfolio/oab-preview.jpg",
    fullImage: "assets/images/portfolio/oab-full.jpg",
    scope: ["Brand Identity Guidelines", "Annual Report Compendium", "Custom Event Shirts", "Souvenir Gift Sets"],
    description: "Comprehensive institutional branding, annual report editorial printing, and custom-branded souvenirs for high-impact civic empowerment programs.",
    accentColor: "#00875A",
    whatsappContext: "OAB Foundation Civic Branding"
  }
]);
```

---

### 4.2. Semantic HTML5 Section Container (`index.html`)

```html
<!-- Interactive Portfolio Section Landmark -->
<section id="portfolio" class="section portfolio-section" aria-labelledby="portfolio-title">
  <div class="container">
    <div class="section-header">
      <p class="section-tag">Featured Works</p>
      <h2 id="portfolio-title" class="section-title">Proven Craftsmanship in Action</h2>
      <p class="section-desc">Browse our validated case studies across identity systems, editorial publications, marketing campaigns, and custom apparel.</p>
    </div>

    <!-- Filter Bar (Tab buttons hooked in Story 3.2) -->
    <div class="portfolio-filter-bar" role="tablist" aria-label="Portfolio Category Filter">
      <button type="button" class="filter-btn active" role="tab" aria-selected="true" data-action="filter-category" data-category="all">All Projects</button>
      <button type="button" class="filter-btn" role="tab" aria-selected="false" data-action="filter-category" data-category="branding">Brand Identity</button>
      <button type="button" class="filter-btn" role="tab" aria-selected="false" data-action="filter-category" data-category="publications">Publications &amp; Editorial</button>
      <button type="button" class="filter-btn" role="tab" aria-selected="false" data-action="filter-category" data-category="marketing">Marketing &amp; Billboards</button>
      <button type="button" class="filter-btn" role="tab" aria-selected="false" data-action="filter-category" data-category="apparel">Custom Apparel &amp; Merch</button>
    </div>

    <!-- Dynamic 2D Portfolio Grid Container -->
    <div class="portfolio-grid" id="portfolio-grid">
      <!-- Populated dynamically by app.js: renderPortfolioCards(PORTFOLIO_DATA) -->
    </div>
  </div>
</section>
```

---

### 4.3. Card DOM Template & Rendering Function (`app.js`)

```javascript
/**
 * Generate HTML string for an individual portfolio card
 * @param {Object} project - Portfolio project data object
 * @returns {string} HTML markup string
 */
function createPortfolioCardMarkup(project) {
  const scopeTagsMarkup = project.scope
    .map(tag => `<span class="portfolio-tag">#${escapeHtml(tag)}</span>`)
    .join('');

  return `
    <article class="portfolio-card" data-project-id="${escapeHtml(project.id)}" data-category="${escapeHtml(project.category)}">
      <div class="portfolio-media-wrap">
        <div class="portfolio-media-placeholder" style="--card-accent: ${escapeHtml(project.accentColor)};">
          <div class="media-badge-icon" aria-hidden="true">
            <span class="media-monogram">${escapeHtml(project.title.substring(0, 2).toUpperCase())}</span>
          </div>
          <span class="media-watermark">MJr Case Study</span>
        </div>
        <span class="portfolio-category-badge">${escapeHtml(project.categoryLabel)}</span>
      </div>

      <div class="portfolio-card-body">
        <h3 class="portfolio-card-title">${escapeHtml(project.title)}</h3>
        <p class="portfolio-card-desc">${escapeHtml(project.description)}</p>
        <div class="portfolio-tag-list" role="list" aria-label="Project Scope">
          ${scopeTagsMarkup}
        </div>
      </div>

      <div class="portfolio-card-footer">
        <button type="button" 
                class="btn btn-primary btn-sm btn-block" 
                data-action="open-modal" 
                data-project-id="${escapeHtml(project.id)}"
                aria-label="Inspect ${escapeHtml(project.title)} Case Study">
          Inspect Case Study
        </button>
        <a href="https://wa.me/2348106246748?text=${encodeURIComponent('Hello MJr Designs, I saw your ' + project.title + ' case study and would like to discuss a similar project.')}"
           class="btn btn-outline btn-sm btn-block"
           target="_blank"
           rel="noopener noreferrer"
           data-action="whatsapp-inquire"
           data-context="${escapeHtml(project.whatsappContext)}"
           aria-label="Inquire on WhatsApp about ${escapeHtml(project.title)}">
          Inquire Similar
        </a>
      </div>
    </article>
  `;
}

/**
 * Utility helper to safely escape string content before HTML injection
 * @param {string} str 
 * @returns {string}
 */
function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Render portfolio cards into the grid container
 * @param {Array} items 
 */
function renderPortfolioCards(items) {
  const grid = document.getElementById('portfolio-grid');
  if (!grid) return;
  grid.innerHTML = items.map(createPortfolioCardMarkup).join('');
}
```

---

### 4.4. CSS Styling Implementation (`styles.css`)

```css
/* --------------------------------------------------------------------------
   PORTFOLIO SECTION & DYNAMIC GRID STYLES
   -------------------------------------------------------------------------- */
.portfolio-section {
  background-color: var(--color-surface);
  padding-top: var(--space-4xl);
  padding-bottom: var(--space-4xl);
  border-top: 1px solid var(--color-border);
}

.portfolio-filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  justify-content: center;
  margin-top: var(--space-2xl);
  margin-bottom: var(--space-3xl);
}

.filter-btn {
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  color: var(--color-charcoal);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  padding: var(--space-sm) var(--space-lg);
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.filter-btn:hover {
  background-color: var(--color-primary-light);
  border-color: var(--color-primary-subtle);
  color: var(--color-primary-dark);
}

.filter-btn.active,
.filter-btn[aria-selected="true"] {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

.portfolio-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-2xl);
}

@media (min-width: 640px) {
  .portfolio-grid {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }
}

.portfolio-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal);
}

@media (hover: hover) and (pointer: fine) {
  .portfolio-card:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-lg);
    border-color: var(--color-primary-subtle);
  }
}

.portfolio-media-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  background-color: var(--color-charcoal);
  overflow: hidden;
}

.portfolio-media-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1f242d 0%, #11141a 100%);
  border-bottom: 3px solid var(--card-accent, var(--color-primary));
  position: relative;
  transition: transform var(--transition-normal);
}

.portfolio-card:hover .portfolio-media-placeholder {
  transform: scale(1.03);
}

.media-badge-icon {
  width: 54px;
  height: 54px;
  border-radius: var(--radius-lg);
  background-color: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-xs);
}

.media-monogram {
  font-size: var(--font-size-h3);
  font-weight: var(--font-weight-extrabold);
  color: var(--color-surface);
  letter-spacing: -0.02em;
}

.media-watermark {
  font-size: var(--font-size-xs);
  color: rgba(255, 255, 255, 0.5);
  font-weight: var(--font-weight-medium);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.portfolio-category-badge {
  position: absolute;
  top: var(--space-md);
  left: var(--space-md);
  background-color: rgba(26, 26, 26, 0.85);
  backdrop-filter: blur(8px);
  color: var(--color-surface);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  padding: 4px var(--space-sm);
  border-radius: var(--radius-full);
  border: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 2;
}

.portfolio-card-body {
  padding: var(--space-xl);
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.portfolio-card-title {
  font-size: var(--font-size-h3);
  font-weight: var(--font-weight-bold);
  color: var(--color-charcoal);
  margin-bottom: var(--space-xs);
  line-height: var(--line-height-snug);
}

.portfolio-card-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  line-height: var(--line-height-normal);
  margin-bottom: var(--space-lg);
}

.portfolio-tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
  margin-top: auto;
  margin-bottom: var(--space-lg);
}

.portfolio-tag {
  font-size: var(--font-size-xs);
  background-color: var(--color-bg);
  color: var(--color-charcoal);
  padding: 2px var(--space-sm);
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  font-weight: var(--font-weight-medium);
}

.portfolio-card-footer {
  padding: 0 var(--space-xl) var(--space-xl) var(--space-xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

@media (min-width: 480px) {
  .portfolio-card-footer {
    flex-direction: row;
  }
}
```

---

## 5. Verification & Testing Matrix

| Test ID | Test Scope | Verification Method | Expected Result |
| :--- | :--- | :--- | :--- |
| **TC-311** | Data Model Integrity | Inspect `PORTFOLIO_DATA` in console | Array contains exactly 6 frozen case study objects with all required schema keys (`id`, `title`, `category`, `scope`, `description`, `whatsappContext`). |
| **TC-312** | Dynamic Card DOM Generation | Inspect `#portfolio-grid` in browser DOM | Exactly 6 `<article class="portfolio-card">` nodes are injected with corresponding category badges, deliverable chips, and buttons. |
| **TC-313** | 2D CSS Grid Layout & Reflow | Resize browser viewport from 320px to 1440px | Grid reflows seamlessly: 1 column on mobile (\(<640\text{px}\)), 2 columns on tablet, 3 columns on desktop. Equal card heights maintained. |
| **TC-314** | Deliverable Scope Tag Rendering | Inspect card tags | Each project's scope tags render as distinct `#Tag` chips without string concatenation flaws. |
| **TC-315** | Card Action Triggers | Check button attributes | Primary button contains `data-action="open-modal"` and `data-project-id="[id]"`. Inquire button contains `data-action="whatsapp-inquire"` and valid `data-context`. |
| **TC-316** | XSS Sanitization | Validate `escapeHtml()` utility | User/data-supplied strings are sanitized against `<script>`, `"`, and HTML entity injection before DOM insertion. |
| **TC-317** | Accessibility & Focus Rings | Tab navigation across portfolio cards | Inspect button and WhatsApp link receive visible 3px focus outline. All card text meets WCAG AA contrast (\(\ge 4.5:1\)). |

---

## 6. Pedagogical Checkpoint (`bmad-frontend-tutor`)

Upon completion of Story 3.1 implementation, the developer/student will engage with `bmad-frontend-tutor` to deconstruct:
1. **Vanilla JavaScript Data Modeling**: Benefits of `Object.freeze()`, schema design for UI state representation, and decoupling data arrays from presentation markup.
2. **DOM Injection Mechanics & Security**: Comparing `innerHTML` with template literals vs `document.createElement()`, DOM reflow performance costs, and why HTML sanitization (`escapeHtml`) is mandatory when injecting template strings.
3. **Responsive Media Layouts (`aspect-ratio: 16 / 10`)**: How modern CSS `aspect-ratio` reserves space in the layout before images/media load, completely eliminating Cumulative Layout Shift (CLS).
4. **Active-Recall Flashcards & MCQs**: Generation of 20+ atomic cards covering JavaScript object immutability, DOM generation algorithms, CSS `aspect-ratio`, and component metadata routing.
