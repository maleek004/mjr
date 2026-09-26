# Addendum: MJr Designs & Print Solutions

This addendum captures strategic context, detailed domain specifications, parked roadmap items, and pedagogical notes generated during the discovery phase of the Product Brief.

---

## 1. Parked Roadmap & Specialized Sub-brands

### Custom Apparel & Streetwear Vertical (`streetwear.mjr.com`)
* **Current Context**: Designing and printing customized shirts, hoodies, branded caps, and streetwear merchandise is a major revenue stream for MJr Designs.
* **v1 Representation**: Featured prominently in the **Event & Environmental Branding / Branded Merchandise** and **Portfolio** sections with a dedicated category tag (`Custom Apparel & Merchandise`).
* **Future Phase (v2 / Subdomain)**: Plan to launch a dedicated e-commerce/lookbook subdomain (`streetwear.mjr.com`) with an interactive 3D shirt customizer, mock-up previewer, and direct batch ordering pipeline.

---

## 2. Technical Architecture & Pedagogical Masterclass Notes

### Core Pedagogical Modules (Zero-Framework Vanilla Mastery)
1. **DOM Structure & Accessibility (A11y)**:
   * Native HTML5 landmarks: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`.
   * Accessible buttons with `aria-pressed`, `aria-expanded`, and keyboard accessibility (Tab, Enter, Escape for modal).
2. **CSS3 Layout Engines & Design System**:
   * Tokenized variables (`:root`) for color palettes (`--color-primary`, `--color-charcoal`, `--color-surface`, `--color-accent`), fluid typography (`clamp()`), and uniform spacing scales (`--spacing-xs` to `--spacing-2xl`).
   * Flexbox: 1-dimensional layouts (Navbar alignment, pill filter bar, badge groups, button actions).
   * CSS Grid: 2-dimensional auto-fitting layouts (`grid-template-columns: repeat(auto-fit, minmax(320px, 1fr))`) for the portfolio showcase and client logo matrix.
3. **Vanilla JavaScript Architecture (`app.js`)**:
   * **Event Delegation Pattern**: A single unified event listener on main containers using `event.target.closest('[data-action]')` to avoid memory leaks and multiple listener attachments.
   * **State-Driven UI Filtering**: Maintaining active filter state (`'all'`, `'branding'`, `'publications'`, `'marketing'`, `'apparel'`) in a lightweight JS state object and dispatching render updates cleanly.
   * **Dynamic WhatsApp Link Generator**:
     ```javascript
     function generateWhatsAppUrl(phone, context) {
       const base = `https://wa.me/${phone}`;
       const text = encodeURIComponent(context);
       return `${base}?text=${text}`;
     }
     ```

---
