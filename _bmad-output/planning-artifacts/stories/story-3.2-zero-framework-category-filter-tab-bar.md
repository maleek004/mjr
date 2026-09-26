# Story 3.2: Zero-Framework Category Filter Tab Bar (Event Delegation)

**Epic**: Epic 3: Interactive Filterable Portfolio & Accessible Case Study Lightbox  
**Status**: Done  
**Author**: Mary (Business Analyst)  
**Date**: 2026-09-26  
**Target Files**: `index.html`, `styles.css`, `app.js`

---

## 1. User Story Statement

**As a** corporate marketing director, brand manager, or print buyer evaluating specific services (e.g., custom apparel manufacturing, corporate publications, or brand identity packages),  
**I want** to click interactive category filter tabs (`All`, `Brand Identity`, `Publications & Editorial`, `Marketing & Billboards`, `Custom Apparel & Merch`) and experience instantaneous, smooth portfolio filtering with accessible state synchronization and zero page reloads,  
**So that** I can seamlessly narrow down MJr's proven case studies to match my exact project requirements without layout jank or cognitive friction.

---

## 2. Strategic Context & Business Value

* **Targeted Intent & Frictionless Discovery (Conversion Architecture)**: B2B decision-makers arrive with specific procurement mandates. A client seeking custom corporate shirts for 500 staff members should not have to parse through real estate logo packages to find apparel mockups. Providing instant, single-click category slicing dramatically improves user task completion rate and accelerates qualification to WhatsApp consultation.
* **Pure Zero-Framework Reactive State Engine (AD-2 & AD-3)**: Rather than pulling in heavyweight reactive frameworks (React/Vue) or manipulating the DOM with messy jQuery spaghetti, Story 3.2 implements an elegant, native ES6+ unidirectional state model:
  1. UI click fires on a filter tab.
  2. The centralized `document.body` event delegator captures the event via `e.target.closest('[data-action="filter-category"]')`.
  3. The application state updates `state.activeCategory = selectedCategory`.
  4. The DOM synchronizes declaratively: active filter button receives visual pill highlights and `aria-selected="true"`, while portfolio card nodes toggle CSS visibility classes (`is-hidden` / `is-filtered-out`) with smooth opacity/transform transitions.
* **Performance & Memory Efficiency (Zero Leakage Invariant)**: Instead of binding individual `addEventListener('click')` handlers to every filter button and dynamically rendered card (which risks memory leaks and stale event listeners during DOM mutations), a single root delegator handles all category dispatch with \(O(1)\) memory overhead.
* **Strict WCAG 2.1 AA Accessibility & ARIA State Binding (NFR-106)**: Filter controls conform to WAI-ARIA tablist semantics (`role="tablist"`, `role="tab"`, `aria-selected="true"|"false"`), ensuring screen readers accurately announce active filter states and keyboard navigation remains intuitive.
* **Pedagogical Significance**: Unlocks foundational mastery of the DOM Event Phase lifecycle (Capture \(\rightarrow\) Target \(\rightarrow\) Bubbling), the mechanics of `Event.target.closest()`, CSS rendering engine compositing (animating `opacity` and `transform` vs triggering expensive `display: none` layout thrashing), and accessible state reflection in vanilla JavaScript.

---

## 3. Detailed Acceptance Criteria (Gherkin Format)

### Scenario 1: Centralized Event Delegation for Category Filtering
* **Given** the user is viewing the `#portfolio` section with the category filter bar rendered,
* **When** the user clicks any filter button element (`.filter-btn`) or any of its child nodes,
* **Then** the global event delegation listener on `document` catches the click event via `event.target.closest('[data-action="filter-category"]')`.
* **And** the handler extracts the selected category string from `dataset.category`.
* **And** no separate event listeners are attached directly to individual filter buttons.

---

### Scenario 2: Unidirectional State Update & ARIA Tab Synchronization
* **Given** the current application state has `state.activeCategory = "all"`,
* **When** the user clicks a specific category filter button (e.g., `data-category="apparel"`),
* **Then** the internal state updates to `state.activeCategory = "apparel"`.
* **And** the clicked tab button receives:
  * CSS class `.active`.
  * Attribute `aria-selected="true"`.
  * Attribute `tabindex="0"`.
* **And** all sibling filter tab buttons have:
  * CSS class `.active` removed.
  * Attribute `aria-selected="false"`.
  * Attribute `tabindex="-1"` (or standard accessible tab sequence).

---

### Scenario 3: DOM Card Filtering & Smooth CSS Visibility Transitions
* **Given** the portfolio grid contains 6 rendered case study cards (`data-category="branding"`, `"publications"`, `"marketing"`, `"apparel"`),
* **When** a category filter is activated (e.g., `data-category="publications"`):
  * **Matching Cards** (`data-category="publications"`):
    * Retain full opacity (`opacity: 1`), normal scale (`transform: scale(1)`), and `display: flex`.
    * Are fully accessible in the keyboard tab order.
    * Do not possess the `.is-hidden` or `.is-filtered-out` class.
  * **Non-Matching Cards** (`data-category !== "publications"`):
    * Smoothly transition to `opacity: 0` and `transform: scale(0.95)` before being hidden (`display: none` or `visibility: hidden; position: absolute`).
    * Are removed from keyboard focus flow so users cannot tab into hidden cards.
* **And** when the `"All Projects"` tab (`data-category="all"`) is clicked:
  * All 6 portfolio cards immediately transition back to active, visible state (`opacity: 1`, `transform: scale(1)`).
* **And** the filter transition duration executes within `200ms`–`300ms` adhering to standard fluid UI timing curves without layout thrashing.

---

### Scenario 4: Keyboard Navigation & Screen Reader Accessibility
* **Given** a keyboard-only user navigates into the `.portfolio-filter-bar`,
* **When** pressing `Tab` or Arrow Keys (`ArrowLeft`, `ArrowRight`):
  * Focus moves seamlessly between filter buttons with a distinct 3px brand orange focus indicator (`outline: 3px solid var(--color-primary); outline-offset: 2px`).
  * Pressing `Enter` or `Space` activates the focused filter tab, triggering the exact same filtering behavior as a mouse click.
* **And** screen readers announce the selected tab status accurately via `aria-selected="true"` and the accessible label of the active tab.

---

### Scenario 5: Graceful Handling & Defensive Invariants
* **Given** a filter action is dispatched with an unrecognized or corrupted category slug,
* **When** the handler processes the event,
* **Then** it defaults safely to `"all"`, logs a non-fatal warning in development mode, and keeps all cards visible rather than emptying the grid or throwing uncaught runtime exceptions.
* **And** rapid successive clicks on different filter tabs do not cause animation race conditions, lingering ghost elements, or broken grid layouts.

---

## 4. Technical Specifications & Architectural Compliance

### 4.1. Semantic HTML5 Filter Bar Landmark (`index.html`)

```html
<!-- Category Filter Tab Bar Landmark inside #portfolio -->
<div class="portfolio-filter-bar" role="tablist" aria-label="Filter case studies by category">
  <button type="button" 
          class="filter-btn active" 
          role="tab" 
          id="filter-tab-all"
          aria-selected="true" 
          aria-controls="portfolio-grid"
          data-action="filter-category" 
          data-category="all">
    All Projects
  </button>
  <button type="button" 
          class="filter-btn" 
          role="tab" 
          id="filter-tab-branding"
          aria-selected="false" 
          aria-controls="portfolio-grid"
          data-action="filter-category" 
          data-category="branding">
    Brand Identity
  </button>
  <button type="button" 
          class="filter-btn" 
          role="tab" 
          id="filter-tab-publications"
          aria-selected="false" 
          aria-controls="portfolio-grid"
          data-action="filter-category" 
          data-category="publications">
    Publications &amp; Editorial
  </button>
  <button type="button" 
          class="filter-btn" 
          role="tab" 
          id="filter-tab-marketing"
          aria-selected="false" 
          aria-controls="portfolio-grid"
          data-action="filter-category" 
          data-category="marketing">
    Marketing &amp; Billboards
  </button>
  <button type="button" 
          class="filter-btn" 
          role="tab" 
          id="filter-tab-apparel"
          aria-selected="false" 
          aria-controls="portfolio-grid"
          data-action="filter-category" 
          data-category="apparel">
    Custom Apparel &amp; Merch
  </button>
</div>
```

---

### 4.2. Core Filter Engine & State Integration (`app.js`)

```javascript
/**
 * Filter Portfolio Cards by Category
 * Updates state, synchronizes ARIA tab states, and toggles card visibility classes.
 * 
 * @param {string} targetCategory - Category slug ('all', 'branding', 'publications', 'marketing', 'apparel')
 */
function filterPortfolio(targetCategory) {
  const category = (typeof targetCategory === 'string' && targetCategory.trim()) 
    ? targetCategory.trim().toLowerCase() 
    : 'all';

  // 1. Update State
  state.activeCategory = category;

  // 2. Synchronize Filter Tab Buttons UI & ARIA Attributes
  const filterButtons = document.querySelectorAll('[data-action="filter-category"]');
  filterButtons.forEach((btn) => {
    const btnCategory = btn.dataset.category || 'all';
    const isActive = btnCategory === category;
    
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

  // 3. Filter Portfolio Cards in DOM
  const cards = document.querySelectorAll('.portfolio-card');
  cards.forEach((card) => {
    const cardCategory = card.dataset.category;
    const shouldShow = (category === 'all' || cardCategory === category);

    if (shouldShow) {
      card.classList.remove('is-hidden');
      card.removeAttribute('aria-hidden');
      // Enable focusable elements inside visible card
      card.querySelectorAll('button, a').forEach(el => el.removeAttribute('tabindex'));
    } else {
      card.classList.add('is-hidden');
      card.setAttribute('aria-hidden', 'true');
      // Remove focusable elements inside hidden card from keyboard flow
      card.querySelectorAll('button, a').forEach(el => el.setAttribute('tabindex', '-1'));
    }
  });
}
```

#### Event Delegation Switch Route in `app.js`:

```javascript
document.addEventListener('click', (event) => {
  const actionEl = event.target.closest('[data-action]');
  if (!actionEl) return;

  const action = actionEl.dataset.action;

  switch (action) {
    case 'filter-category': {
      event.preventDefault();
      const selectedCategory = actionEl.dataset.category || 'all';
      filterPortfolio(selectedCategory);
      break;
    }
    case 'toggle-mobile-nav': {
      event.preventDefault();
      toggleMobileNav();
      break;
    }
    case 'close-mobile-nav': {
      closeMobileNav();
      break;
    }
    default:
      break;
  }
});
```

---

### 4.3. CSS Transition & Visibility Rules (`styles.css`)

```css
/* --------------------------------------------------------------------------
   PORTFOLIO FILTER PILLS & CARD VISIBILITY TRANSITIONS
   -------------------------------------------------------------------------- */
.portfolio-filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  justify-content: center;
  margin-top: var(--space-2xl);
  margin-bottom: var(--space-3xl);
}

.filter-btn {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-charcoal);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  padding: var(--space-sm) var(--space-lg);
  border-radius: var(--radius-full);
  cursor: pointer;
  min-height: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background-color var(--transition-fast), 
              border-color var(--transition-fast), 
              color var(--transition-fast), 
              box-shadow var(--transition-fast), 
              transform var(--transition-fast);
}

.filter-btn:hover {
  background-color: var(--color-primary-light);
  border-color: var(--color-primary-subtle);
  color: var(--color-primary-dark);
  transform: translateY(-1px);
}

.filter-btn.active,
.filter-btn[aria-selected="true"] {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

.filter-btn:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
}

/* Portfolio Card Dynamic Filtering Transition */
.portfolio-card {
  transition: transform var(--transition-normal), 
              box-shadow var(--transition-normal), 
              border-color var(--transition-normal),
              opacity var(--transition-normal);
  opacity: 1;
}

.portfolio-card.is-hidden {
  display: none !important;
  opacity: 0;
  transform: scale(0.95);
  pointer-events: none;
}

/* Motion Sensitivity Compliance */
@media (prefers-reduced-motion: reduce) {
  .filter-btn,
  .portfolio-card {
    transition: none !important;
    transform: none !important;
  }
}
```

---

## 5. Verification & Testing Matrix

| Test ID | Test Scope | Verification Method | Expected Result |
| :--- | :--- | :--- | :--- |
| **TC-321** | Event Delegation Routing | Click `.filter-btn` span, inner text, or padding | Root listener on `document` catches event via `closest('[data-action="filter-category"]')` and triggers `filterPortfolio()`. Zero individual listeners on buttons. |
| **TC-322** | Tab Visual & ARIA Sync | Click `"Brand Identity"` filter tab | Clicked tab gains `.active` class and `aria-selected="true"`. All other tabs receive `aria-selected="false"` and have `.active` removed. |
| **TC-323** | Category Filtering Accuracy | Click `"Publications & Editorial"` | Only cards with `data-category="publications"` (e.g. TOLW) remain visible. Other cards receive `.is-hidden` and are removed from display. |
| **TC-324** | All Projects Reset | Click `"All Projects"` tab | All 6 portfolio case study cards (`cyma-homes`, `streetwear-merch`, `glazing-memoirs`, `tolw-brochure`, `skillforge-billboard`, `oab-foundation`) are visible. |
| **TC-325** | Single Category Filtering (`Apparel`) | Click `"Custom Apparel & Merch"` | Only `streetwear-merch` is displayed. Grid layout reflows symmetrically without empty whitespace distortion. |
| **TC-326** | Keyboard A11y & Focus Trap Prevention | Tab through hidden cards | Hidden cards (`.is-hidden`) have buttons set to `tabindex="-1"`, preventing keyboard focus from getting trapped in invisible DOM elements. |
| **TC-327** | Automated E2E & Unit Test Coverage | Run automated Vitest / Playwright suite (`story-3.2.test.mjs`) | All filter assertions pass with 100% assertion green rate. |

---

### Review Findings

- [x] [Review][Patch] Defensive category normalization and unknown category fallback [`app.js`:325-365]
- [x] [Review][Patch] WAI-ARIA tablist roving tabindex and ArrowLeft/ArrowRight keyboard navigation [`app.js`:340-365, `index.html`:248-256]
- [x] [Review][Patch] CSS filter animation and discrete transition optimization [`styles.css`:865-885]
- [x] [Review][Patch] Sync Story 3.2 pedagogical notes in learning journal [`_bmad-output/learning-journal/journal.md`:130-170]
- [x] [Review][Defer] Screen reader live region result count announcement [`index.html`:260] — deferred: Not required by core Story 3.2 ACs, slated for Epic 4 polish.

### Rejected

- Live region result count announcement: `low` — Not part of Story 3.2 Gherkin ACs; standard ARIA selected states on tabs sufficiently communicate filter selection.
