# Epic 3 Context: Interactive Filterable Portfolio & Accessible Case Study Lightbox

<!-- Compiled from planning artifacts. Edit freely. Regenerate with compile-epic-context if planning docs change. -->

## Goal

Deliver a dynamic, zero-framework client-side portfolio showcase that lets prospective clients seamlessly filter real case studies by category and inspect high-resolution project mockups in an accessible lightbox modal, driving qualified leads into WhatsApp consultations.

## Stories

- Story 3.1: JavaScript Portfolio Data Modeling & Card Grid Layout
- Story 3.2: Zero-Framework Category Filter Tab Bar (Event Delegation)
- Story 3.3: Accessible Lightbox Modal with Keyboard Focus Management

## Requirements & Constraints

- **Single Source of Truth**: Dynamic rendering powered by immutable client-side `PORTFOLIO_DATA` array in `app.js`.
- **Zero Frameworks (NFR-101)**: Pure vanilla HTML5, CSS3, and ES6+ JavaScript. No React, Vue, jQuery, or CSS framework libraries.
- **Centralized Event Delegation (NFR-102)**: Single event listener on `document.body` catching `[data-action="open-modal"]`, `[data-action="close-modal"]`, `[data-action="filter-category"]`, and `[data-action="whatsapp-inquire"]`.
- **WAI-ARIA & Accessibility (AD-6, NFR-106)**: Accessible dialog modal with `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, and `aria-describedby`.
- **Focus Management (FR-405)**: Active focus trapping for `Tab` and `Shift+Tab`, auto-focusing the first interactive element on open, and returning focus to the originating button on close.
- **Multi-Modal Dismissal**: Smooth closure on `Escape` keydown, backdrop overlay click, or close button click.
- **Scroll Locking (CLS = 0)**: Viewport scroll locking via `body.modal-open` without introducing horizontal layout shift.
- **Contextual WhatsApp Routing (AD-5)**: Modal quote CTA pre-populates dynamic inquiry message tailored to the active case study.

## Technical Decisions

- **State Model**: `state.activeCategory` controls visible cards; `state.activeModalId` controls open modal dialog.
- **Focus Restoration**: Cache `document.activeElement` before modal activation as `lastFocusedElement` and call `.focus()` on dismissal.
- **DOM Transitions**: Use CSS `opacity` and `transform: scale()` transitions with `@media (prefers-reduced-motion)` overrides.

## Cross-Story Dependencies

- **Story 3.1**: Establishes `PORTFOLIO_DATA` data model and rendered cards with `data-project-id` and `data-action="open-modal"`.
- **Story 3.2**: Establishes centralized event delegation in `app.js` and tablist navigation.
- **Story 3.3**: Consumes `PORTFOLIO_DATA` and extends the centralized delegator to open/close the accessible lightbox modal.
