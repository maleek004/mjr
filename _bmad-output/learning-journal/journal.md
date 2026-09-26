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

### Story 2.2: Verified Client Trust Matrix & Semantic Footer
* **Date**: 2026-09-26
* **Files Implemented**: `index.html`, `styles.css`
* **Flashcards**: `_bmad-output/learning-journal/flashcards/story-2.2.tsv` (25 cards)

#### Core Concepts Mastered:
1. **CSS Filter Post-Processing & GPU Compositing**:
   - `filter: grayscale(100%) opacity(0.75)` applies pixel manipulation post-processing at the GPU compositing stage without altering DOM geometry or triggering reflow.
   - Smoothly transitioning `filter` and `transform` on hover creates hardware-accelerated micro-interactions.
   - Scoping hover effects to `@media (hover: hover) and (pointer: fine)` and providing fallback `@media (hover: none), (pointer: coarse) { filter: grayscale(0%) opacity(1); }` avoids sticky-hover artifacts on touch devices.

2. **Semantic HTML5 Addressing & Footer Landmarks**:
   - The `<address>` element is semantically dedicated to author/business contact channels (`tel:`, `mailto:`, `https://wa.me/...`) for its ancestor document, distinct from arbitrary physical addresses.
   - Wrapping secondary navigation in `<nav aria-label="Footer Navigation">` provides dedicated landmark boundaries for assistive technology without colliding with the primary site header navigation.

3. **Touch-Target Ergonomics (WCAG 2.1 AA \(\ge 48\text{px}\))**:
   - Using `min-height: 48px; display: inline-flex; align-items: center;` guarantees touch targets meet accessibility standards on mobile viewports without forcing unnaturally large text font sizes.
   - Custom focus indicators using `:focus-visible` and `outline-offset: 3px` create unmistakable high-contrast keyboard navigation rings without introducing box-model layout shifts.

4. **Reduced-Motion Universal Defense (`prefers-reduced-motion`)**:
   - Honoring `@media (prefers-reduced-motion: reduce)` by neutralizing `transition: none !important;` and `transform: none !important;` across cards, badges, and links guarantees accessible comfort for vestibular disorder users.

## Sprint 3: Interactive Filterable Portfolio & Accessible Lightbox

### Story 3.1: JavaScript Portfolio Data Modeling & Card Grid Layout
* **Date**: 2026-09-26
* **Files Implemented**: `index.html`, `styles.css`, `app.js`
* **Test Suite**: `_bmad-output/test-artifacts/story-3.1.test.mjs` (4/4 suites passed, 12 total assertions)
* **Flashcards**: `_bmad-output/learning-journal/flashcards/story-3.1.tsv` (25 cards)

#### Core Concepts Mastered:
1. **Data-Driven Architecture & Deep Immutability**:
   - Decoupled data model (`PORTFOLIO_DATA`) from DOM markup, enforcing single-source-of-truth invariants (AD-2).
   - `Object.freeze()` applied recursively to both outer arrays and nested project objects/arrays to guarantee true runtime immutability against accidental mutations.

2. **Secure Dynamic DOM Rendering & XSS Elimination**:
   - Dynamic template generation using `createPortfolioCardMarkup` with HTML entity sanitization (`escapeHtml` escaping `&`, `<`, `>`, `"`, `'`).
   - String concatenation of sanitized template literals versus `document.createElement()` memory allocations.
   - Initializing on `DOMContentLoaded` to execute DOM mounting as soon as the HTML parser completes without waiting for image assets.

3. **2D Responsive CSS Grid & Track Calculations**:
   - `repeat(auto-fit, minmax(320px, 1fr))` dynamically manages column counts across 320px–1440px viewports with zero media query clutter.
   - Vertical card flex layout (`display: flex; flex-direction: column;`) paired with `margin-top: auto` on `.portfolio-card-footer` guarantees uniform baseline button alignment across cards with varying title or description lengths.

4. **Zero Cumulative Layout Shift (CLS = 0) with `aspect-ratio`**:
   - Applying `aspect-ratio: 16 / 10` on `.portfolio-media-wrap` reserves the exact layout dimensions in the browser's Box Model prior to image downloads, eliminating visual layout jumps.
   - High-fidelity CSS gradient placeholders with custom monogram badges provide instant visual feedback.

5. **Universal Module Export & Accessibility Standards**:
   - Dual-environment module exporting (`window` for browsers, `module.exports` for Node.js test runners) wrapped in `typeof document !== 'undefined'` checks.
   - Touch target accessibility (`min-height: 48px;`), WCAG 2.1 AA text contrast (\(\ge 4.5:1\)), and `@media (prefers-reduced-motion: reduce)` support.

### Story 3.2: Zero-Framework Category Filter Tab Bar (Event Delegation)
* **Date**: 2026-09-26
* **Files Implemented**: `index.html`, `styles.css`, `app.js`
* **Test Suite**: `_bmad-output/test-artifacts/story-3.2.test.mjs` (4/4 suites passed, 16 total assertions)
* **Flashcards**: `_bmad-output/learning-journal/flashcards/story-3.2.tsv`

#### Core Concepts Mastered:
1. **The DOM Event Propagation Lifecycle & Event Delegation**:
   - Centralized root event listener on `document` intercepts bubbling click actions via `event.target.closest('[data-action="filter-category"]')`.
   - Eliminates \(N\) separate event listeners, preventing memory leaks, garbage collection overhead, and stale listener bindings.

2. **Unidirectional State Flow & Declarative DOM Updates**:
   - UI interaction updates `state.activeCategory = selectedCategory` (with whitelist validation and defensive fallback).
   - Filter state drives both tab visual selection and card visibility (`.portfolio-card.is-hidden`) deterministically from a single source of truth.

3. **WAI-ARIA Tablist Pattern & Roving Tabindex**:
   - `role="tablist"` paired with `role="tab"`, `aria-selected`, `aria-controls="portfolio-grid"`, and roving `tabindex` (`0` on active tab, `-1` on inactive tabs).
   - Full keyboard arrow key navigation (`ArrowLeft`, `ArrowRight`, `Home`, `End`) enables fluid, screen-reader-compliant category switching.

4. **Compositor Efficiency vs Layout Reflow**:
   - Managing focus protection on hidden DOM elements (`aria-hidden="true"` and child `tabindex="-1"`) ensures keyboard navigation is never trapped in invisible elements.
   - Smooth opacity transitions and `@media (prefers-reduced-motion: reduce)` defense.

### Story 3.3: Accessible Lightbox Modal with Keyboard Focus Management
* **Date**: 2026-09-27
* **Files Implemented**: `index.html`, `styles.css`, `app.js`
* **Test Suite**: `_bmad-output/test-artifacts/story-3.3.test.mjs` (4/4 suites passed, 20 total assertions)
* **Flashcards**: `_bmad-output/learning-journal/flashcards/story-3.3.tsv` (25 cards)

#### Core Concepts Mastered:
1. **WAI-ARIA 1.2 Dialog Pattern & Assistive Tree Semantics**:
   - Implemented `#portfolio-modal` with `role="dialog"`, `aria-modal="true"`, `aria-labelledby="modal-title"`, and `aria-describedby="modal-desc"`.
   - Programmatically mapped the dialog name and description to DOM nodes, informing screen readers of modal boundaries and inert background content.

2. **Focus Management Lifecycle & Focus Trapping Algorithms**:
   - **Focus Caching**: Captured `lastFocusedElement = document.activeElement` before modal activation to enable clean return navigation.
   - **Focus Wrapping**: Constrained `Tab` (first \(\rightarrow\) last wrap) and `Shift+Tab` (last \(\rightarrow\) first wrap) strictly within interactive modal children (`button`, `[href]`).
   - **Visibility Filtering**: Used `(el.offsetParent !== null || el.offsetWidth > 0 || el.offsetHeight > 0)` to reliably ignore unrendered DOM elements.
   - **Out-of-Bounds Recovery**: Added `if (!modal.contains(document.activeElement))` guard to re-constrain rogue focus states.
   - **Focus Restoration**: Returned keyboard focus back to the initiating trigger button (`lastFocusedElement.focus()`) on dismissal.

3. **Background Scroll-Locking & Layout Stability (CLS = 0)**:
   - Locked background document viewport with `body.modal-open { overflow: hidden; touch-action: none; }`.
   - Added `html { scrollbar-gutter: stable; }` to prevent jarring horizontal layout reflow when scrollbars are toggled.
   - Used `overscroll-behavior: contain` on `.modal-scroll-wrap` to prevent scroll chaining into the underlying document.

4. **GPU Compositing & Reduced-Motion Ergonomics**:
   - Engineered backdrop frosted-glass effect with `backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);`.
   - Designed keyframe entrance animation (`@keyframes modalScaleIn`) utilizing compositor-only properties (`opacity` and `transform`) to avoid paint/reflow cycles.
   - Enforced `@media (prefers-reduced-motion: reduce)` to disable animations for motion-sensitive users.

### Story 4.1: Centralized WhatsApp URL Generator & Context Engine
* **Date**: 2026-09-27
* **Files Implemented**: `app.js`, `index.html`, `styles.css`
* **Test Suite**: `_bmad-output/test-artifacts/story-4.1.test.mjs` (7/7 tests passed)
* **Flashcards**: `_bmad-output/learning-journal/flashcards/story-4.1.tsv` (25 cards)

#### Core Concepts Mastered:
1. **RFC 3986 URI Percent-Encoding & Parameter Construction**:
   - Used `encodeURIComponent()` to safely convert Unicode text, whitespace, punctuation, and emoji into standard ASCII percent-encoded octets.
   - Built a deterministic deep-link constructor targeting `https://wa.me/2348106246748?text=...`.
2. **Context-Aware Conversational Routing & Template Interpolation**:
   - Implemented `WHATSAPP_CONFIG` and `WHATSAPP_TEMPLATES` dictionary mapping section contexts (`hero`, `header-nav`, `brand-identity`, `marketing-ads`, `print-production`, `custom-apparel`, `modal`, `footer`) to tailored sales openers.
   - Dynamic interpolation of `{projectTitle}` for modal case studies with fallback safety.
3. **Event Delegation Action Dispatching**:
   - Routed `data-action="whatsapp-inquire"` dynamically through the centralized `document.body` click listener.
4. **Tabnabbing Security & External Anchor Hardening**:
   - Enforced `target="_blank"` and `rel="noopener noreferrer"` across all conversion triggers to isolate the `window.opener` context.






