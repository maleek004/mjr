# Story 5.2: Zero-Framework Swipeable Image Slider with Pagination Dots

**Epic**: Epic 5: Case Study Multi-Media Gallery & Continuous Modal Navigation  
**Status**: Completed  
**Author**: Mary (Business Analyst) & Amelia (Dev)  
**Date**: 2026-09-28  
**Target Files**: `index.html`, `styles.css`, `app.js`

---

## 1. User Story Statement

**As a** mobile or desktop visitor inspecting a case study inside the lightbox modal,  
**I want** to smoothly slide through multiple authentic proof photos using swipe gestures, previous/next arrows, and pagination dots, with live artifact captions,  
**So that** I can inspect all printed deliverables (stationery, safety gear, apparel, packaging, magazines, billboards) effortlessly without modal clutter.

---

## 2. Strategic Context & Business Value

* **Interactive Proof Inspection**: Prospective clients assessing print quality need intuitive multi-photo viewing. A swipeable gallery showcases diverse production artifacts (e.g., magazine cover + interior spread + hardcover spine) in a single compact viewport.
* **Hardware-Accelerated Zero-Framework Performance**: Implementing slide transitions using CSS `transform: translateX()` and `will-change: transform` executes directly on the GPU compositor thread, avoiding CPU layout reflows and maintaining 60fps on mobile devices.
* **Touch-First Accessibility**: Seamless support for mobile touch swipes (`touchstart`/`touchend` with horizontal gesture discrimination), keyboard arrow keys (`ArrowLeft`/`ArrowRight`), and `aria-live="polite"` caption updates ensures universal accessibility across all input modalities.
* **Pedagogical Significance**: Deconstructs touch coordinate trigonometry ($\Delta X$ vs $\Delta Y$), CSS hardware acceleration and compositing layers, roving tabindex and ARIA tablist patterns for pagination dots, and screen reader live regions.

---

## 3. Detailed Acceptance Criteria (Gherkin Format)

### Scenario 1: Slider DOM Markup & Track Initialization
* **Given** a visitor opens any case study modal by clicking *"Inspect Case Study"*,
* **When** `openModal(projectId)` executes,
* **Then** the media container `.modal-media-wrap` renders:
  * A slider track container (`.modal-slider-track`) with a slide (`.modal-slide`) for each item in `project.images`.
  * Each slide contains a responsive `<img>` with `loading="lazy"` and alt text derived from the image caption.
  * Previous (`data-action="prev-slide"`) and Next (`data-action="next-slide"`) navigation arrows.
  * A pagination dot bar (`.slider-dots`) containing a dot button (`data-action="go-to-slide"`, `data-slide-index="[i]"`) for each slide.
  * An accessible caption bar (`.slider-caption-bar` with `aria-live="polite"`) displaying the current image caption.
  * The active category badge in the top-left corner.
* **And** the slider initializes at slide index 0 (`transform: translateX(0%)`).

---

### Scenario 2: Slide Navigation (Arrows, Dots, and Keyboard)
* **Given** the case study modal is open,
* **When** the user clicks the Next Arrow (`data-action="next-slide"`),
* **Then** the track transitions smoothly to `translateX(-100%)`, the second dot receives `.active` and `aria-selected="true"`, and the caption updates.
* **When** the user clicks any pagination dot (`data-action="go-to-slide"`),
* **Then** the slider immediately transitions to the selected slide index.
* **When** the user presses `ArrowRight` or `ArrowLeft` on the keyboard while the modal is open,
* **Then** the slider advances or moves backward accordingly.
* **And** navigation gracefully wraps around or bounds cleanly between `0` and `images.length - 1`.

---

### Scenario 3: Mobile Touch Swipe Gestures
* **Given** the modal is opened on a touch-enabled mobile device,
* **When** the user performs a left horizontal swipe gesture ($\Delta X < -40\text{px}$ and $|\Delta X| > |\Delta Y|$),
* **Then** the slider advances to the next slide.
* **When** the user performs a right horizontal swipe gesture ($\Delta X > 40\text{px}$ and $|\Delta X| > |\Delta Y|$),
* **Then** the slider transitions to the previous slide.
* **And** vertical scrolling inside the modal body is not blocked during non-horizontal touch moves.

---

## 4. Technical Specifications

* **CSS Transform Transition**: `transition: transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)` on `.modal-slider-track`.
* **GPU Layer Promotion**: `will-change: transform` to promote the track to its own compositing layer.
* **Touch Event Listeners**: Passive touch listeners on `.modal-media-wrap` recording `touchstart` and `touchend` coordinates.
