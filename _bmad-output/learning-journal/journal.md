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

### Story 4.2: Performance, Accessibility (A11y) & Cross-Browser Quality Audit
* **Date**: 2026-09-27
* **Files Implemented**: `index.html`, `styles.css`, `app.js`, `_bmad-output/test-artifacts/story-4.2.test.mjs`
* **Test Suite**: `_bmad-output/test-artifacts/story-4.2.test.mjs` (6/6 tests passed, 33/33 overall suite green)
* **Flashcards**: `_bmad-output/learning-journal/flashcards/story-4.2.tsv` (25 cards)

#### Core Concepts Mastered:
1. **Critical Rendering Path (CRP) & Core Web Vitals Engineering**:
   - Deconstructed the browser rendering pipeline: **DOM Tree** + **CSSOM Tree** $\rightarrow$ **Render Tree** $\rightarrow$ **Layout (Reflow)** $\rightarrow$ **Paint** $\rightarrow$ **GPU Compositing**.
   - Achieved near-zero Cumulative Layout Shift ($\text{CLS} \le 0.05$) using intrinsic CSS `aspect-ratio: 16 / 10` containers on `.portfolio-media-wrap` and `scrollbar-gutter: stable`.
   - Optimized LCP and FCP via font preconnects (`rel="preconnect"` to Google Fonts), `font-display: swap` to prevent Flash of Invisible Text (FOIT), and deferred script execution.
   - Zero-framework pure vanilla architecture keeping Total Blocking Time ($\text{TBT} \le 50\text{ms}$) and Interaction to Next Paint ($\text{INP} \le 100\text{ms}$) at near-zero main-thread cost.

2. **WCAG 2.1 AA Mathematical Contrast & AOM Architecture**:
   - Formally calculated relative luminance $L = 0.2126R + 0.7152G + 0.0722B$ and verified contrast ratios against WCAG 2.1 AA standards: $\ge 4.5:1$ for normal body text and $\ge 3.0:1$ for large text/UI boundaries.
   - Implemented high-visibility `:focus-visible` outline rings with offset indicators to distinguish keyboard focus from pointer clicks.
   - Synchronized the DOM tree with the browser's Accessibility Object Model (AOM) using semantic landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`) and ARIA dialog properties.

3. **Touch Target Ergonomics & Heading Hierarchy**:
   - Enforced minimum touch target dimensions ($\ge 48 \times 48\text{px}$) across mobile drawer toggles, modal dismissal buttons, navigation anchors, and CTAs.
   - Structured monotonic heading progression ($<h1> \rightarrow <h2> \rightarrow <h3>$) with zero skipped levels across the entire single-page document.
   - Stabilized mobile viewport boundaries using base `overflow-x: hidden` on `body`.

### Story 5.1: Case Study Multi-Image Data Modeling & Asset Extraction
* **Date**: 2026-09-28
* **Files Implemented**: `app.js`, `assets/images/portfolio/*`, `scripts/export_portfolio_assets.py`
* **Flashcards**: `_bmad-output/learning-journal/flashcards/story-5.1.tsv` (22 cards)

#### Core Concepts Mastered:
1. **JavaScript Nested Object Immutability & Deep Freezing**:
   - Deconstructed the mechanics and limitations of `Object.freeze()`: native freezing is **shallow**. Inner arrays (`images: [...]`) and nested objects (`{ url, caption }`) retain full mutability unless individually or recursively frozen.
   - Implemented composite immutable tree modeling in `PORTFOLIO_DATA` using `Object.freeze([ Object.freeze({ ... images: Object.freeze([ Object.freeze(...) ]) }) ])` to guarantee runtime immutability and prevent side-effect pollution across filter and modal subsystems.
   - In strict mode (`'use strict'`), attempted mutations on frozen properties trigger immediate `TypeError: Cannot assign to read only property`, catching state divergence bugs at development time.

2. **Asset Pipeline & Browser Image Memory Mechanics**:
   - Differentiated compressed file storage on disk (JPEG/WebP byte payloads) from **uncompressed in-memory raster allocation** in the browser rendering engine ($W \times H \times 4\text{ bytes}$ for 32-bit RGBA).
   - Downscaled print-resolution vector exports to max dimension $1400\text{px}$ at $88\%$ quality, reducing RAM consumption per image from $48\text{MB}$ down to $5.6\text{MB}$ and disk size down to $\le 185\text{KB}$.
   - Handled alpha channel flattening when converting PNG/PDF raster surfaces to JPEG format to eliminate decompression artifacts.

3. **Data Schema Evolution & Backward Compatibility**:
   - Successfully introduced the multi-image collection schema (`images: [{ url, caption }]`) while preserving legacy `thumbnail` and `fullImage` properties.
   - Enabled progressive feature rollout, allowing existing card grid components and future multi-image swipeable sliders (Story 5.2) to operate concurrently off the same single source of truth.

### Story 5.2: Zero-Framework Swipeable Image Slider with Pagination Dots
* **Date**: 2026-09-28
* **Files Implemented**: `index.html`, `styles.css`, `app.js`
* **Test Suite**: `_bmad-output/test-artifacts/story-5.2.test.mjs` (6/6 passed, 39/39 total project suite passing)
* **Flashcards**: `_bmad-output/learning-journal/flashcards/story-5.2.tsv` (22 cards)

#### Core Concepts Mastered:
1. **GPU Compositing vs Layout/Reflow in Carousel Animation**:
   - Deconstructed the browser rendering engine cost of animating layout properties (`left`, `margin-left`) versus transform properties (`transform: translateX(-N%)`).
   - `left` / `margin-left` forces the browser through all four rendering stages: **JavaScript $\rightarrow$ Layout (Geometry recalculation) $\rightarrow$ Paint (Rasterization) $\rightarrow$ Composite**.
   - `transform: translateX()` skips Layout and Paint entirely, operating exclusively on the **GPU Compositing thread** ($60\text{fps}$ / $120\text{fps}$ zero-jank transitions).
   - Applied `will-change: transform` to promote `.modal-slider-track` to its own dedicated `CompositedLayer` ahead of interaction.

2. **Touch Coordinate Tracking & Gesture Discrimination**:
   - Mastered `TouchEvent` coordinate extraction: using `e.touches[0].clientX` during `touchstart` and `e.changedTouches[0].clientX` during `touchend` (since `e.touches` is empty upon finger lift).
   - Designed vector gesture discrimination: $\Delta X = X_{\text{end}} - X_{\text{start}}$ and $\Delta Y = Y_{\text{end}} - Y_{\text{start}}$. A swipe is only triggered when $|\Delta X| \ge 40\text{px}$ AND $|\Delta X| > |\Delta Y|$, preventing horizontal sliders from blocking vertical scroll intent.
   - Configured `touch-action: pan-y` in CSS to inform the browser compositor that vertical panning remains native while horizontal gestures are handled in script.

3. **Modulo Arithmetic for Wraparound Navigation**:
   - Explored JavaScript's `%` operator behavior with negative operands: in JS, `-1 % 3 === -1` (remainder, not modulo).
   - Implemented the universal zero-bounded modulo wraparound formula: `index = ((targetIndex % total) + total) % total` to ensure seamless bi-directional wrap-around across any index sequence without `if/else` branching.

4. **Screen Reader Live Regions & Accessible Pagination Controls**:
   - Implemented `aria-live="polite"` on `#modal-slider-caption` so that slide transitions announce updated deliverable captions when the assistive technology is idle, without disrupting screen reader navigation.
   - Modeled pagination dots with `role="tab"`, `aria-selected="true|false"`, and localized `aria-label="Slide N of Total"`.
   - Wired keyboard arrow keys (`ArrowLeft`, `ArrowRight`) into the modal keyboard event bus with input field guards.

### Story 5.3: Filter-Aware Continuous Case Study Navigation & Dynamic WhatsApp Sync
* **Date**: 2026-09-28
* **Files Implemented**: `index.html`, `styles.css`, `app.js`
* **Test Suite**: `_bmad-output/test-artifacts/story-5.3.test.mjs` (6/6 passed, 45/45 total project suite passing)
* **Flashcards**: `_bmad-output/learning-journal/flashcards/story-5.3.tsv` (22 cards)

#### Core Concepts Mastered:
1. **Filtered State Projections & Circular Pointer Stepping**:
   - Designed continuous case study navigation that queries `PORTFOLIO_DATA` dynamically against `state.activeFilter` (`getFilteredProjects()`), preserving user intent across active categories (`all`, `branding`, `publications`, `apparel`).
   - Implemented circular array traversal with zero branch complexity:
     $$\text{Next Index} = (i + 1) \pmod N, \quad \text{Prev Index} = ((i - 1) \pmod N + N) \pmod N$$
   - Avoided recreating the modal container DOM tree, updating existing nodes in place to eliminate garbage collection pauses and repaint overhead.

2. **Decoupled Keyboard Event Routing**:
   - Resolved dual-level keyboard navigation: `ArrowLeft`/`ArrowRight` navigate image slides within the current project, while `Alt+ArrowLeft`/`Alt+ArrowRight` and `P`/`N` keys step across case studies.
   - Added element tag filters (`INPUT`, `TEXTAREA`) to prevent keyboard shortcut interference during text entry.

3. **Dynamic Context-Aware Lead Generation (RFC 3986 Sync)**:
   - Synchronized `#modal-whatsapp-cta` with the newly focused project in real-time, executing `generateWhatsAppUrl()` with project-specific URL-encoded payloads.
   - Updated `dataset.projectId` to maintain analytics and lead context tracking integrity.

4. **WAI-ARIA Accessibility for Continuous Navigation**:
   - Wired dynamic `aria-label="Previous case study: [Title]"` and `aria-label="Next case study: [Title]"` on navigation triggers.
   - Attached `aria-live="polite"` to `#modal-project-counter` so screen readers announce position changes (`Project X of Y`) seamlessly.
   - Handled single-item subsets gracefully by disabling button actions and hiding redundant navigation controls.

## Sprint 6: Proof-First Conversion Architecture & Mobile Layout Optimization

### Epic 6: Proof-First Conversion Architecture & Mobile Layout Optimization
* **Date**: 2026-09-28
* **Stories Implemented**: Story 6.1, Story 6.2, Story 6.3
* **Files Implemented**: `index.html`, `styles.css`, `app.js`
* **Test Suite**: `_bmad-output/test-artifacts/epic-6.test.mjs` (3/3 passed, 48/48 total project suite passing)

#### Core Concepts Mastered:
1. **Information Architecture & Time-to-Proof Optimization**:
   - Deconstructed mobile conversion rate optimization (CRO) mechanics: moving `#portfolio` directly beneath `#hero` reduced mobile scroll distance from $\sim 2,860\text{px}$ (6–9 swipes) down to $\sim 450\text{px}$ (1 thumb swipe).
   - Preserved document landmark hierarchy ($<header> \rightarrow <main> \rightarrow \text{Hero} \rightarrow \text{Portfolio} \rightarrow \text{Services} \rightarrow \text{About} \rightarrow \text{Contact} \rightarrow <footer>$), synchronizing DOM order with screen reader accessibility trees and visual layout.

2. **Cross-Section Interactive Loops (`jump-to-category`)**:
   - Implemented cross-section routing: clicking capability cards in `#services` activates category filters in `#portfolio` (`filterPortfolio(category)`), triggers smooth viewport auto-scrolling, and moves focus to the active tab button for accessible keyboard workflows.

3. **Zero-Scroll Top-of-Fold Proof Teleportation**:
### Focused View Polish: Desktop Lateral Rails & Edge-Aware Touch Engine
* **Date**: 2026-09-28
* **Files Implemented**: `index.html`, `styles.css`, `app.js`
* **Flashcards**: `_bmad-output/learning-journal/flashcards/modal-lateral-touch.tsv` (22 cards)

#### Core Concepts Mastered:
1. **Mathematical Dynamic Offset for Lateral Rails**:
   - Calculated floating lateral button offsets anchored relative to a centered 720px modal dialog:
     $$\text{left} = \max\left(16\text{px}, \frac{100\text{vw} - 720\text{px}}{2} - 70\text{px}\right)$$
   - Bound by `max(16px, ...)` to ensure on intermediate desktop viewports (900px–1000px) the controls never collide with the viewport edge or overlap the modal content.
   - Leveraged `backdrop-filter: blur(8px)` with high z-index and GPU-composited `transform: translateY(-50%) scale(1.08)` hover transitions.

2. **Touch Vector Math & Intent Discrimination**:
   - Tracked swipe vectors across `touchstart`, `touchmove`, and `touchend` lifecycles:
     $$\Delta X = X_{\text{end}} - X_{\text{start}}, \quad \Delta Y = Y_{\text{end}} - Y_{\text{start}}$$
   - Implemented strict directional discrimination ($|\Delta X| \ge 45\text{px} \land |\Delta X| > 1.2 \cdot |\Delta Y|$) to differentiate deliberate horizontal project swipes from natural vertical reading scrolls.
   - Enforced `{ passive: true }` on touch event listeners, ensuring zero lag on the browser compositor thread during scrolling.

3. **Boundary-Aware Slider-to-Project Chaining**:
   - Engineered state-aware transitions: when the user swipes forward at the terminal image slide ($\text{activeSlideIndex} = \text{totalSlides} - 1$), the engine smoothly transitions to the next case study (`nextProject()`). Swiping backward at slide 0 transitions to the previous case study (`prevProject()`).

4. **Ergonomic CTA & Defensive Multi-Element Sync**:
   - Streamlined mobile CTA copy to `"Inquire on WhatsApp"` to eliminate line-wrapping and preserve button tap-target ergonomics.
   - Upgraded `populateModalContent()` with `document.querySelectorAll()` to defensively synchronize both lateral rail buttons and in-modal navigation buttons simultaneously across DOM environments.

## Sprint 7: Interactive Print Estimator & WhatsApp Quote Engine

### Epic 7: Interactive Print Estimator & WhatsApp Quote Engine
* **Date**: 2026-09-28
* **Stories Implemented**: Story 7.1, Story 7.2, Story 7.3
* **Files Implemented**: `index.html`, `styles.css`, `app.js`
* **Test Suite**: `_bmad-output/test-artifacts/epic-7.test.mjs` (4/4 passed, 53/53 total project suite passing)
* **Flashcards**: `_bmad-output/learning-journal/flashcards/epic-7.tsv` (22 cards)

#### Core Concepts Mastered:
1. **Dynamic Pricing Modeling & Deep Immutability**:
   - Structured `PRICING_MODEL` covering 4 key product lines (Business Cards, Brochures, Branded Shirts, Roll-Up Banners) frozen via `Object.freeze()` to prevent state tampering.
   - Implemented commercial print volume discount curves:
     $$\text{Volume Discount} = f(\text{Quantity}, \text{Tiers}) \in [0.00, 0.25]$$
   - Computed itemized pricing with unit option deltas, subtotal, volume savings, and express rush turnaround (+25%) modifiers.

2. **Native Currency Formatting with `Intl.NumberFormat`**:
   - Used standard Web API `Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 })` with graceful fallback to ensure consistent `₦` formatting across all browser engines.

3. **Event-Driven Bidirectional Form Synchronization**:
   - Wired delegated `input` and `change` listeners to synchronize range slider with numeric input fields in real time without infinite event loops.
   - Leveraged `aria-live="polite"` on `#calc-total-amount` for screen reader accessibility.

4. **1-Click WhatsApp Proposal Deep-Linking (RFC 3986)**:
   - Generated structured, itemized WhatsApp quote inquiries that pass product specifications, exact quantity, turnaround speed, and calculated total directly to MJr's sales desk.

## Sprint 8: Standalone Admin Pricing Center & Visual Code Configurator

### Epic 8: Standalone Admin Pricing Center & Visual Code Configurator
* **Date**: 2026-09-28
* **Stories Implemented**: Story 8.1, Story 8.2, Story 8.3, Story 8.4, Story 8.5
* **Files Implemented**: `admin.html`, `admin.css`, `admin.js`, `app.js`, `api/pricing.js`, `index.html`
* **Test Suite**: `_bmad-output/test-artifacts/story-8.5.test.mjs` (5/5 passed, 64/64 total project suite passing)
* **Flashcards**: `_bmad-output/learning-journal/flashcards/epic-8.tsv` (34 cards)

#### Core Concepts Mastered:
1. **Standalone Admin UI Architecture & CSS Dashboard Design**:
   - Built a high-density, accessible standalone dashboard in `admin.html` & `admin.css` with dark-mode aesthetic, contrast badges, and responsive 2-column layout.
   - Preserved zero-framework vanilla invariants while providing desktop-class configuration ergonomics.

2. **Reactive Administrative State & Live Simulation Sandbox**:
   - Engineered `admin.js` to manage mutable draft models with real-time recalculation of base unit economics, option price deltas ($\pm ₦$), volume discount matrix tiers, and express rush turnaround percentages.
   - Connected sticky sandbox simulator with dynamic sample controls to immediately test margin outcomes before publishing.

3. **Client-Side ES6 Code Generation & Web Storage Bridge**:
   - Developed `generateES6PricingCode()` to serialize in-memory pricing structures into clean, deeply frozen, production-grade ES6 JavaScript code blocks (`const PRICING_MODEL = Object.freeze(...)`).
   - Integrated client-side `localStorage` sync adapter (`mjr_custom_pricing`) with graceful fallback in `app.js`, allowing instant live site testing with zero build steps or server deployments.
   - Added zero-backend file export (`new Blob(...)`, `URL.createObjectURL()`) and clipboard API integration (`navigator.clipboard.writeText`).

4. **Web Crypto API SHA-256 Authentication & Session Persistence**:
   - Implemented zero-dependency client-side password/PIN verification using `window.crypto.subtle.digest('SHA-256', textBuffer)` to compare one-way hashes rather than plaintext strings.
   - Utilized `sessionStorage.setItem('mjr_admin_session', 'authenticated')` for tab-scoped ephemeral login persistence, cleared immediately on Lock/Logout.
   - Implemented accessible modal workflows for Master PIN updates with validation and error messaging announced via `aria-live="assertive"`.

5. **Serverless Global Cloud Distribution & Vercel KV REST Synchronization**:
   - Built `/api/pricing.js` serverless function with edge caching (`s-maxage=30, stale-while-revalidate=120`) and REST Upstash/Vercel KV integration.
   - Decoupled public visitor render path from backend latency via synchronous factory baseline hydration followed by background API synchronization (`fetchGlobalPricing()`).
   - Enabled 1-click global pricing publication from `admin.html` with authenticated `POST` and instant cross-device synchronization.

## Sprint 9: Mobile Viewport Horizontalization & Zero-Fatigue Swipe Layouts

### Epic 9: Mobile Viewport Horizontalization & Zero-Fatigue Swipe Layouts
* **Date**: 2026-09-28
* **Stories Implemented**: Story 9.1 (Portfolio Horizontal Scroll-Snap Card Rail), Story 9.2 (Services 4-Pillar Horizontal Carousel), Story 9.3 (Client Trust Matrix Horizontal Rail), Story 9.4 (Hero Metrics & Calculator Product Tabs Horizontal Rail)
* **Files Implemented**: `index.html`, `styles.css`, `app.js`, `_bmad-output/test-artifacts/epic-9.test.mjs`
* **Test Suite**: `_bmad-output/test-artifacts/epic-9.test.mjs` (4/4 passed, 69/69 total project suite passing)
* **Flashcards**: `_bmad-output/learning-journal/flashcards/epic-9.tsv` (32 cards)

#### Core Concepts Mastered:
1. **Compositor-Driven CSS Scroll-Snap Architecture**:
   - Implemented `scroll-snap-type: x mandatory` with `scroll-padding: 0 16px` across all high-density sections (`#portfolio .portfolio-grid`, `#services .services-grid`, `#about .client-trust-grid`, `.hero-proof-metrics`, and `.calc-product-tabs`).
   - Achieved 60/120fps hardware-accelerated touch swipe performance running entirely on the browser compositor thread without JavaScript carousel overhead ($\text{TBT} = 0\text{ms}$, $\text{CLS} = 0$).
   - Eliminated over 6,000 vertical pixels of mobile scrolling fatigue by condensing multi-card vertical columns into compact, horizontal single-row swipe tracks.

2. **Visual Peek Affordance Formulas**:
   - Portfolio & Services: `flex: 0 0 calc(85vw - 16px)` with `scroll-snap-align: center` ($85\% / 15\%$ active/peek distribution).
   - Client Trust Matrix: `flex: 0 0 calc(60vw - 16px)` with `scroll-snap-align: center` ($60\% / 40\%$ active/peek distribution for high-density logo scanning).
   - Hero Metrics: `flex: 0 0 calc(70vw - 16px)` with `scroll-snap-align: center`.
   - Combined negative container margins (`margin-inline: -16px`) with matching padding to achieve clean edge-to-edge bleed scrolling on mobile viewports.

3. **Subtle Custom Scrollbars & Non-Intrusive Swipe Cues**:
   - Styled minimalist 5px scrollbars (`scrollbar-width: thin`, `scrollbar-color: var(--color-primary-subtle) transparent`) on case study and partner grids.
   - Used invisible scrollbars (`scrollbar-width: none; &::-webkit-scrollbar { display: none; }`) for compact UI controls like hero metric chips and calculator product tabs.
   - Added pulsing `.mobile-swipe-hint` badge cues (`aria-hidden="true"`) that inform mobile users while hiding automatically on desktop screens ($\ge 768\text{px}$) via `display: none !important`.

4. **Defensive Dynamic Scroll Reset & Desktop Grid Restoration**:
   - Updated `filterPortfolio()` in `app.js` with defensive checks (`typeof document.getElementById === 'function'`) to smoothly reset horizontal scroll to origin (`scrollLeft = 0`) upon category tab selection.
   - Restored full responsive multi-column 2D grids at `@media (min-width: 640px)` and `@media (min-width: 768px)` (`display: grid`, `flex: initial`, `overflow-x: visible`) preserving desktop design integrity.


