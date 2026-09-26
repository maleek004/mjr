# Frontend Engineering Learning Journal

## Sprint 1: Foundation, Design Tokens & Hero Experience

### Story 1.1: Semantic HTML5 Skeleton & CSS Custom Properties Architecture
* **Date**: 2026-09-23
* **Files Implemented**: `index.html`, `styles.css`, `app.js`

#### Core Concepts Mastered:
1. **The Critical Rendering Path & Tree Construction**:
   - HTML Tokenization & DOM Tree construction.
   - CSS Tokenization, Rule Cascading, and CSSOM (CSS Object Model) generation.
   - Render Tree creation: Intersecting visible DOM nodes with computed CSSOM styles (ignoring `<head>`, `<meta>`, `display: none`).
   - Layout / Reflow: Calculating geometry and exact coordinate boxes on the 2D plane.
   - Paint & Composite: Converting vectors and text into pixel bitmaps on GPU layers.

2. **Accessibility Tree (A11y Tree) & Semantic Landmarks**:
   - Semantic tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`) automatically map to WAI-ARIA landmark roles (`banner`, `navigation`, `main`, `region`, `contentinfo`) in the browser's accessibility tree.
   - Screen readers navigate directly across landmarks, eliminating cognitive friction and the need for redundant `role=""` attributes.

3. **CSS Custom Properties (`:root`) & Runtime Resolution**:
   - `:root` targets the document root (`<html>`) with high specificity and global scope.
   - Unlike preprocessor variables (Sass/Less) which compile statically to fixed values, CSS variables remain live in the CSSOM at runtime, enable dynamic cascade inheritance, and trigger minimal paint/composite updates when modified.

4. **Fluid Typography with `clamp(min, preferred, max)`**:
   - Mathematical formula: `clamp(MIN, PREFERRED, MAX)`.
   - `preferred` combines a fixed base with viewport units (`5vw + 1rem`) to smoothly interpolate between minimum mobile size and maximum desktop cap without media query threshold jarring.

5. **Box-Sizing Reset & The Box Model**:
   - Standard `content-box`: `width = content` (padding and border expand total footprint outward, causing layout overflow bugs).
   - Modern `border-box`: `width = content + padding + border` (padding and border are absorbed inward, making layout math predictable).

### Story 1.2: Responsive Sticky Header Navigation & Mobile Drawer
* **Date**: 2026-09-26
* **Files Implemented**: `index.html`, `styles.css`, `app.js`
* **Test Suite**: `_bmad-output/test-artifacts/story-1.2.test.mjs` (4/4 passed)

#### Core Concepts Mastered:
1. **Sticky Header Positioning & Stacking Contexts**:
   - `position: sticky; top: 0` keeps the header pinned to the viewport viewport boundary without removing it from the normal document flow layout calculation.
   - `backdrop-filter: blur(10px)` with semi-transparent background renders a frosted glass effect on supported compositing layers.
   - `scroll-margin-top` ensures anchor jumps (`#services`, `#portfolio`) maintain vertical offset clearance equal to header height + spacing.

2. **Off-Canvas Drawer Layout & 60fps GPU Acceleration**:
   - Animating `transform: translateX()` and `opacity` avoids costly browser layout/reflow and repaint cycles, running entirely on the GPU composite thread.
   - Backdrop overlay with `aria-hidden` / `aria-modal="true"` dialog semantics provides WCAG-compliant modal behavior.

3. **Centralized Event Delegation & Bubbling**:
   - Root listener on `document` catches clicks via `e.target.closest('[data-action]')`, preventing event listener memory leaks.
   - Decoupled `data-action` attributes allow multiple UI triggers (hamburger button, close button, backdrop overlay, navigation links) to dispatch uniform action logic.

4. **Keyboard Accessibility & Focus Management**:
   - Dynamic `aria-expanded="true|false"` communicates open/closed state to screen readers.
   - `Escape` key dismissal and focus trapping inside the drawer keep keyboard focus bounded.
   - Closing the drawer restores document body scrolling (`body.menu-locked`) and safely returns active focus to the hamburger toggle.
