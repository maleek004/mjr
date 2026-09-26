# Story 1.2: Responsive Sticky Header Navigation & Mobile Drawer

**Epic**: Epic 1: Semantic Foundation, Design Tokens & Brand Hero Experience  
**Status**: Ready for Implementation  
**Author**: Mary (Business Analyst)  
**Date**: 2026-09-26  
**Target Files**: `index.html`, `styles.css`, `app.js`

---

## 1. User Story Statement

**As a** mobile or desktop visitor exploring MJr Designs & Print Solutions,  
**I want** an intuitive, responsive navigation bar with smooth anchor links and an accessible mobile drawer,  
**So that** I can seamlessly jump between services, portfolio case studies, credibility details, and direct contact options on any screen size without losing context.

---

## 2. Strategic Context & Business Value

* **Frictionless Discovery**: Direct anchor routing (`#services`, `#portfolio`, `#about`, `#contact`) cuts cognitive overhead and accelerates time-to-conversion for high-intent corporate buyers and retail apparel clients.
* **Persistent Conversion Access**: Sticky header positioning guarantees that the brand logo and phone/WhatsApp action button remain within immediate reach at all scroll depths.
* **Mobile-First Accessibility**: Over 65% of regional traffic arrives via mobile links (Instagram, WhatsApp). The mobile slide-out drawer provides a clean navigation experience compliant with WCAG 2.1 AA standards.

---

## 3. Detailed Acceptance Criteria (Gherkin Format)

### Scenario 1: Desktop Sticky Navigation & Brand Header Layout
* **Given** the viewport width is \(\ge 768\text{px}\) (Desktop/Tablet landscape),
* **When** viewing the header area,
* **Then** the header must stick to the top of the viewport (`position: sticky; top: 0`) with appropriate `z-index` and subtle backdrop blur/surface elevation on scroll.
* **And** the navigation bar displays:
  1. MJr Brand Logo (`.brand-logo`) linking to `#` / top of page.
  2. Unordered desktop navigation links list (`<nav class="nav-links">`):
     - `Services` (`href="#services"`)
     - `Portfolio` (`href="#portfolio"`)
     - `About` (`href="#about"`)
     - `Contact` (`href="#contact"`)
  3. Quick-action Call/WhatsApp consultation button (`href="tel:+2348106246748"` or `data-action="whatsapp-inquire"`).
* **And** the mobile hamburger toggle button is visually hidden (`display: none`).

---

### Scenario 2: Smooth Section Anchor Navigation
* **Given** any navigation link anchor is clicked,
* **When** the event occurs,
* **Then** the viewport smoothly scrolls to the designated target section element (`scroll-behavior: smooth`).
* **And** header offset is accounted for (`scroll-margin-top: var(--header-height, 72px)`) so target headings are never hidden beneath the sticky header bar.

---

### Scenario 3: Mobile Viewport & Hamburger Drawer Trigger
* **Given** the viewport width is \(< 768\text{px}\),
* **When** the page renders,
* **Then** the desktop navigation links list collapses and is hidden from standard flow.
* **And** the accessible hamburger menu button (`button.nav-toggle[data-action="toggle-menu"]`) is visible with:
  * Minimum touch target of \(48\text{px} \times 48\text{px}\).
  * Explicit `aria-expanded="false"`, `aria-controls="mobile-drawer"`, and `aria-label="Toggle navigation menu"`.
* **When** the user taps the hamburger button,
* **Then** `aria-expanded` updates to `"true"`.
* **And** the mobile drawer (`<div id="mobile-drawer" class="mobile-drawer">` or `<nav>`) transitions into view from off-canvas using CSS `transform` / `opacity`.
* **And** document body scroll is locked (`overflow: hidden`) to prevent background scroll bleeding.

---

### Scenario 4: Mobile Drawer Dismissal & Focus Restoration
* **Given** the mobile drawer is open (`aria-expanded="true"`),
* **When** the user:
  1. Clicks any navigation link inside the drawer, OR
  2. Taps the close button / backdrop overlay, OR
  3. Presses the keyboard `Escape` key,
* **Then** the drawer transitions out of view.
* **And** `aria-expanded` is set back to `"false"`.
* **And** document body scrolling is restored (`overflow: ""` / auto).
* **And** keyboard focus is safely returned to the hamburger toggle button.

---

## 4. Technical Specifications & Architectural Compliance

### 4.1. Invariants & Rules Checklist (Architecture Spine)
* [x] **AD-1 (Pure Vanilla Web Standards)**: 100% native HTML5, CSS3, ES6+ JavaScript. No third-party hamburger/drawer packages.
* [x] **AD-3 (Centralized Event Delegation Root)**: Menu toggles, drawer link clicks, and overlay dismissal handled through centralized `document.addEventListener('click', ...)` reading `e.target.closest('[data-action]')`.
* [x] **AD-4 (Tokenized CSS Architecture)**: Header height, background opacity, z-index elevation, and transition timings consume `:root` custom properties (`--header-height`, `--z-header`, `--z-drawer`, `--color-surface`, `--ease-standard`).

### 4.2. HTML Semantic Structure
```html
<header class="site-header" id="site-header">
  <div class="header-container container">
    <a href="#" class="brand-logo" aria-label="MJr Designs Homepage">
      <!-- MJr Brand Logo / Wordmark -->
      <span class="brand-name">MJr<span class="brand-accent">Designs</span></span>
    </a>

    <!-- Desktop Navigation -->
    <nav class="desktop-nav" aria-label="Primary Desktop Navigation">
      <ul class="nav-list">
        <li><a href="#services" class="nav-link">Services</a></li>
        <li><a href="#portfolio" class="nav-link">Portfolio</a></li>
        <li><a href="#about" class="nav-link">About</a></li>
        <li><a href="#contact" class="nav-link">Contact</a></li>
      </ul>
    </nav>

    <!-- Header Actions -->
    <div class="header-actions">
      <a href="tel:+2348106246748" class="btn btn-primary btn-sm nav-cta" aria-label="Call MJr Designs">
        <span>+234 810 624 6748</span>
      </a>
      <!-- Mobile Toggle Button -->
      <button 
        type="button" 
        class="nav-toggle" 
        data-action="toggle-menu" 
        aria-label="Toggle navigation menu" 
        aria-expanded="false" 
        aria-controls="mobile-drawer">
        <span class="hamburger-bar"></span>
        <span class="hamburger-bar"></span>
        <span class="hamburger-bar"></span>
      </button>
    </div>
  </div>

  <!-- Mobile Drawer Overlay & Menu -->
  <div class="mobile-drawer" id="mobile-drawer" aria-hidden="true">
    <div class="drawer-backdrop" data-action="close-menu"></div>
    <div class="drawer-panel" role="dialog" aria-modal="true" aria-label="Mobile Navigation Menu">
      <div class="drawer-header">
        <span class="brand-name">MJr<span class="brand-accent">Designs</span></span>
        <button type="button" class="drawer-close" data-action="close-menu" aria-label="Close menu">&times;</button>
      </div>
      <nav class="drawer-nav" aria-label="Primary Mobile Navigation">
        <ul class="drawer-list">
          <li><a href="#services" class="drawer-link" data-action="navigate-menu">Services</a></li>
          <li><a href="#portfolio" class="drawer-link" data-action="navigate-menu">Portfolio</a></li>
          <li><a href="#about" class="drawer-link" data-action="navigate-menu">About</a></li>
          <li><a href="#contact" class="drawer-link" data-action="navigate-menu">Contact</a></li>
        </ul>
      </nav>
      <div class="drawer-footer">
        <a href="https://wa.me/2348106246748" class="btn btn-primary btn-block" data-action="whatsapp-inquire">
          Chat on WhatsApp
        </a>
      </div>
    </div>
  </div>
</header>
```

### 4.3. Event Delegation Handling (`app.js`)
```javascript
// Navigation & Mobile Drawer Action Handlers
function initNavigation() {
  const toggleBtn = document.querySelector('[data-action="toggle-menu"]');
  const drawer = document.getElementById('mobile-drawer');

  function openMenu() {
    if (!drawer || !toggleBtn) return;
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-locked');
  }

  function closeMenu() {
    if (!drawer || !toggleBtn) return;
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-locked');
  }

  // Centralized Event Delegation
  document.addEventListener('click', (e) => {
    const actionEl = e.target.closest('[data-action]');
    if (!actionEl) return;

    const action = actionEl.dataset.action;
    if (action === 'toggle-menu') {
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      isExpanded ? closeMenu() : openMenu();
    } else if (action === 'close-menu' || action === 'navigate-menu') {
      closeMenu();
    }
  });

  // Keyboard Escape Handler
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer && drawer.classList.contains('is-open')) {
      closeMenu();
      toggleBtn.focus();
    }
  });
}
```

---

## 5. Non-Functional & Quality Requirements

1. **Performance**:
   - Zero layout shifts during header stickiness or drawer animation (`transform: translateX()` and `opacity` only; avoid animating `left`, `right`, or `width`).
   - Frame rate target \(\ge 60\text{fps}\) for slide transitions.
2. **Accessibility (A11y)**:
   - Full keyboard navigability (Tab, Shift+Tab, Enter, Escape).
   - High contrast ratios (\(\ge 4.5:1\)) for all navigation link states (default, hover, focus-visible).
   - Clear `:focus-visible` outline rings for keyboard accessibility.
3. **Responsive Breakpoints**:
   - Desktop view: \(\ge 768\text{px}\)
   - Mobile/Drawer view: \(< 768\text{px}\)

---

## 6. Pedagogical Checkpoint (`bmad-frontend-tutor`)

Upon implementation completion, Mary prompts the user to activate `/bmad-frontend-tutor` to deconstruct:
* **Flexbox 1D Distribution**: `justify-content: space-between`, `align-items: center`, and flex shrinking behaviors.
* **Stacking Contexts & Z-Index**: How `position: sticky` and `position: fixed` create new stacking contexts in browser rendering engines.
* **Event Bubbling & Centralized Delegation**: Why `e.target.closest('[data-action]')` avoids memory leaks compared to multiple inline click handlers.
* **WAI-ARIA State Synchronization**: How `aria-expanded` and `aria-hidden` communicate UI state dynamically to screen readers.
