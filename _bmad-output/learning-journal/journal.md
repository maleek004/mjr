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

### Story 1.3: Brand Hero Section with Proof Metrics & Primary CTA
* **Date**: 2026-09-26
* **Files Implemented**: `index.html`, `styles.css`, `app.js`
* **Flashcards**: `_bmad-output/learning-journal/flashcards/story-1.3.tsv` (24 cards)

#### Core Concepts Mastered:
1. **Fluid Typography Calculus & The `clamp()` Function**:
   - `clamp(MIN, PREFERRED, MAX)` computes dynamic font sizes at runtime on the fly.
   - Using viewport units like `5vw + 1rem` inside the preferred expression establishes a continuous mathematical slope across viewports without breakpoint jumps.
   - The browser's layout engine recalculates text dimensions during viewport resize events without triggering stylesheet re-parsing.

2. **Compositing Layers & Hardware-Accelerated Micro-Interactions**:
   - Hover and active states using `transform: translateY(-2px)` and `transform: scale(0.98)` bypass the Layout (Reflow) and Paint stages, executing exclusively on the GPU Compositor thread.
   - Traditional properties like `margin-top` or `top` force the browser to invalidate geometry and perform an expensive full subtree layout recalculation.

3. **WCAG 2.1 AA Color Contrast Hierarchy**:
   - Normal text (\(< 18\text{pt}\) or \(< 14\text{pt}\) bold) requires a minimum contrast ratio of \(4.5:1\).
   - Large text (\(\ge 18\text{pt}\) / \(24\text{px}\) regular or \(\ge 14\text{pt}\) / \(18.66\text{px}\) bold) requires \(3.0:1\).
   - High-contrast pairing (`#E05A00` text on `#FFF4EC` badge background $\rightarrow$ 4.6:1) guarantees readability for users with low vision or color perception variations.

4. **URL Encoding & Protocol Handling**:
   - Context-aware WhatsApp conversion triggers utilize URL query string parameters (`wa.me/2348106246748?text=...`) with RFC 3986 percent-encoding (`%20` for spaces, `%2C` for commas, `%27` for apostrophes).
   - Adding `target="_blank"` paired with `rel="noopener noreferrer"` prevents reverse tabnabbing security vulnerabilities and protects browser thread isolation.

## Sprint 2: Core Service Pillars & Verified Client Trust Matrix

### Story 2.1: 4-Pillar Core Services Grid with Contextual Triggers
* **Date**: 2026-09-26
* **Files Implemented**: `index.html`, `styles.css`
* **Flashcards**: `_bmad-output/learning-journal/flashcards/story-2.1.tsv` (24 cards)

#### Core Concepts Mastered:
1. **2D CSS Grid Track Sizing (`repeat(auto-fit, minmax(...))`)**:
   - `repeat(auto-fit, minmax(280px, 1fr))` dynamically calculates column tracks at runtime based on container width.
   - `auto-fit` collapses empty tracks to 0px, allowing existing items to expand across the full width, whereas `auto-fill` preserves empty space.
   - Eliminates hardcoded breakpoint media query jumps for grid items while guaranteeing a minimum width constraint.

2. **The Magic of `margin-top: auto` in Flexbox Column Layouts**:
   - Grid cells stretch to equal height by default (`align-items: stretch`).
   - By making the card a flex column (`display: flex; flex-direction: column`), setting `margin-top: auto` on the terminal button (`.service-cta`) forces it to absorb all residual vertical space.
   - This produces uniform baseline alignment for all CTA buttons regardless of varying title or description text lengths.

3. **Touch Device Hover Isolation (`@media (hover: hover) and (pointer: fine)`)**:
   - Mobile touchscreens trigger synthetic hover events on tap, which can leave buttons stuck in an active/hovered state after interaction.
   - Wrapping hover pseudo-classes in fine-pointer media queries ensures hover micro-interactions (elevation lift, shadow expansion, color inversion) only execute on mouse/trackpad environments.

4. **Accessibility Landmarks & List Semantics Restoration**:
   - Applying `list-style: none` to `<ul>` elements causes Safari VoiceOver to strip list semantics in the accessibility tree; adding `role="list"` explicitly restores the correct structural announcements.
   - Semantic `<article>` tags with `aria-labelledby="service-title-N"` provide discrete landmark navigation boundaries for screen reader users.
   - Inline decorative SVGs are isolated with `aria-hidden="true"` to prevent unhelpful coordinate strings from cluttering the accessibility tree.

5. **Multi-Line Deliverable Typography Alignment**:
   - Setting `align-items: flex-start` with a subtle `margin-top: 2px` on custom `::before` pseudo-element checkmark badges prevents icons from floating to the vertical midpoint when deliverable text wraps onto multiple lines.


