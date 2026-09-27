# Story 5.3: Filter-Aware Continuous Case Study Navigation & Dynamic WhatsApp Sync

**Epic**: Epic 5: Case Study Multi-Media Gallery & Continuous Modal Navigation  
**Status**: Completed  
**Author**: Mary (Business Analyst) & Amelia (Dev)  
**Date**: 2026-09-28  
**Target Files**: `index.html`, `styles.css`, `app.js`

---

## 1. User Story Statement

**As a** prospective client browsing case studies in the lightbox modal,  
**I want** to navigate directly to the Next and Previous case studies strictly within my active category filter and have the WhatsApp consultation CTA dynamically sync to the newly focused project,  
**So that** I can explore related portfolio proofs continuously in a single focused session without needing to repeatedly open and close the modal dialog.

---

## 2. Strategic Context & Business Value

* **Reduced Interaction Friction**: Requiring users to close the modal, locate another card on the grid, and re-open the modal increases cognitive load and drop-off. Continuous in-modal stepping lets visitors evaluate multiple proofs in seconds.
* **Filter Context Awareness**: If a visitor selected the "Apparel" filter on the homepage, navigating through case studies must strictly cycle through apparel projects (`streetwear-merch`, `oab-foundation`, etc.), respecting their demonstrated intent rather than jumping into unrelated categories.
* **Dynamic Lead Generation Synchronization**: When switching projects, the WhatsApp CTA must immediately regenerate its customized query string (`Hello MJr Designs, I saw your [Title] case study...`) and data attributes.
* **Universal Accessibility**: Navigating adjacent case studies provides accessible buttons with descriptive `aria-label` tags, updates position counters (`Project X of Y` with `aria-live="polite"`), and handles keyboard shortcuts while preserving focus within the modal.
* **Pedagogical Significance**: Deconstructs filtered subset array indexing, circular pointer arithmetic over filtered projections, state synchronization across decoupled DOM nodes, and dynamic RFC 3986 URL generation.

---

## 3. Detailed Acceptance Criteria (Gherkin Format)

### Scenario 1: Filter-Aware Project List Resolution
* **Given** an active category filter in state (e.g. `'all'` or `'packaging'`),
* **When** `getFilteredProjects()` is invoked,
* **Then** it returns an array of `PORTFOLIO_DATA` items where `state.activeFilter === 'all' || item.category === state.activeFilter`.
* **And** if only 1 project matches the active filter, the continuous navigation buttons are gracefully disabled or hidden.

---

### Scenario 2: Continuous Case Study Stepping (Next & Previous)
* **Given** the case study modal is open for a project,
* **When** the user clicks the *"Next Case Study"* button (`data-action="next-project"`),
* **Then** the engine locates the current project's index in the filtered subset and steps to `(index + 1) % filteredTotal`.
* **When** the user clicks the *"Previous Case Study"* button (`data-action="prev-project"`),
* **Then** the engine steps to `((index - 1) % filteredTotal + filteredTotal) % filteredTotal`.
* **And** all modal content (title, client, description, category badge, delivered scope chips, counter) immediately updates to the newly selected project.
* **And** the multi-image slider re-renders and resets to slide index 0.

---

### Scenario 3: Dynamic WhatsApp CTA Synchronization
* **Given** the modal updates to a new project (e.g., "Tour of Lagos Waterways"),
* **When** the modal content is populated,
* **Then** `#modal-whatsapp-cta`'s `href` is regenerated with `generateWhatsAppUrl(WHATSAPP_CONFIG.defaultPhone, 'modal', { projectTitle: newProject.title })`.
* **And** `dataset.projectId` is synchronized with `newProject.id`.

---

### Scenario 4: Accessible Navigation UI & Keyboard Shortcuts
* **Given** the modal is open,
* **When** viewing the modal actions / navigation bar,
* **Then** it renders:
  * Previous button (`data-action="prev-project"`, `aria-label="Previous Case Study: [Title]"`)
  * Next button (`data-action="next-project"`, `aria-label="Next Case Study: [Title]"`)
  * Position indicator (`#modal-project-counter`, e.g., "Project 2 of 6")
* **When** the user presses `KeyP` / `KeyN` or uses the on-screen controls,
* **Then** adjacent case study navigation executes cleanly.

---

## 4. Technical Specifications

* **Filtered Project Projection**: Helper function `getFilteredProjects()` querying `PORTFOLIO_DATA` against `state.activeFilter`.
* **Step Functions**: `nextProject()` and `prevProject()` updating `state.activeModalId` and calling `populateModalContent(project)`.
* **Event Delegation**: Added `prev-project` and `next-project` handlers to the centralized `document` click delegation bus.
