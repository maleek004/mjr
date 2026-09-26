# Story 3.3: Accessible Lightbox Modal with Keyboard Focus Management

**Epic**: Epic 3: Interactive Filterable Portfolio & Accessible Case Study Lightbox  
**Status**: Ready for Implementation  
**Author**: Mary (Business Analyst)  
**Date**: 2026-09-26  
**Target Files**: `index.html`, `styles.css`, `app.js`

---

## 1. User Story Statement

**As a** corporate marketing director, brand manager, or procurement decision-maker inspecting MJr Designs & Print Solutions' portfolio,  
**I want** to click any case study's "Inspect Case Study" trigger to open a high-resolution, accessible lightbox modal dialog featuring expanded project details, full deliverable scopes, rich visual presentations, and contextual quote actions, with strict keyboard focus trapping, background scroll locking, and seamless Escape dismissal,  
**So that** I can thoroughly evaluate MJr's execution caliber and transition effortlessly into a qualified WhatsApp consultation without losing my place on the page or experiencing accessibility friction.

---

## 2. Strategic Context & Business Value

* **The High-Intent Conversion Moment (Conversion Architecture)**: When a visitor clicks *"Inspect Case Study"*, they transition from passive browsing to active evaluation. The lightbox modal serves as the definitive deep-dive showcase, presenting:
  1. High-resolution visual mockups showcasing physical and digital craftsmanship.
  2. Full project metadata (client name, industry sector, comprehensive deliverables list, executive problem-solution narrative).
  3. Direct, high-conversion contextual WhatsApp trigger: *"Request a Similar Quote on WhatsApp"*, passing the exact project identifier to the lead generator.
* **Strict WAI-ARIA 1.2 & WCAG 2.1 AA Dialog Compliance (AD-6 & NFR-106)**: Modals are notoriously prone to severe accessibility flaws (focus loss, keyboard trapping failures, screen reader disorientation, background scroll bleeding). Story 3.3 implements the gold standard native dialog pattern:
  * Modal container equipped with `role="dialog"`, `aria-modal="true"`, `aria-labelledby="modal-title"`, and `aria-describedby="modal-desc"`.
  * **Focus Restoration**: Captures `document.activeElement` before opening and restores focus to the exact originating trigger button upon closing.
  * **Active Focus Trapping**: Constrains `Tab` and `Shift+Tab` cycling strictly within the modal's focusable elements (`close button`, `deliverable links`, `WhatsApp CTA`).
  * **Multi-Modal Dismissal**: Closes smoothly on `Escape` keydown, explicit close button click (`data-action="close-modal"`), or backdrop overlay click.
* **Pure Zero-Framework DOM Architecture (AD-2, AD-3, NFR-101)**: Rather than injecting third-party bloated modal libraries or micro-frameworks, the modal engine leverages vanilla ES6+ state binding:
  * Application state updates `state.activeModalId = projectId`.
  * Dynamically populates modal elements from the immutable `PORTFOLIO_DATA` single source of truth.
  * Unlocks \(O(1)\) memory overhead via centralized `document.body` event delegation (`data-action="open-modal"`, `data-action="close-modal"`).
* **Scroll-Locking & Layout Stability (CLS = 0)**: When open, `document.body.classList.add('modal-open')` locks background viewport scrolling (`overflow: hidden`) while preventing horizontal layout shift.
* **Pedagogical Significance**: Teaches foundational browser mechanics: Focus Management algorithms, Keyboard Trap cycles, `document.activeElement` caching, ARIA accessibility trees, CSS Backdrop filters (`backdrop-filter: blur()`), and CSS transition orchestration.

---

## 3. Detailed Acceptance Criteria (Gherkin Format)

### Scenario 1: Modal Trigger & Centralized Event Delegation
* **Given** the user is viewing rendered portfolio cards in `#portfolio-grid`,
* **When** the user clicks any card's *"Inspect Case Study"* button (`[data-action="open-modal"][data-project-id="..."]`) or presses `Enter`/`Space` while it is focused,
* **Then** the global event delegator on `document.body` catches the event via `e.target.closest('[data-action="open-modal"]')`.
* **And** extracts the `projectId` from `dataset.projectId`.
* **And** caches the initiating element as `lastFocusedElement`.
* **And** invokes `openModal(projectId)`.

---

### Scenario 2: Dynamic Content Population from `PORTFOLIO_DATA`
* **Given** `openModal(projectId)` is called with a valid project ID (e.g. `"cyma-homes"`),
* **When** the modal elements are synchronized with the matching record in `PORTFOLIO_DATA`,
* **Then** the modal DOM updates with:
  * **Header/Badge**: Category label pill (e.g., *"Brand Identity & Corporate Design"*).
  * **Title (`#modal-title`)**: Full project title (e.g., *"CYMA HOMES Limited"*).
  * **Client Info**: Client entity name and industry sector.
  * **Visual Presentation**: High-res mockup banner/image (`fullImage`) with fallback monogram branding.
  * **Description (`#modal-desc`)**: Extended project narrative detailing objectives and execution.
  * **Scope Tag List**: Bulleted chips of all delivered assets (e.g., `Logo System`, `Hard Hats & Safety Vests`, `Corporate Stationery`).
  * **Contextual WhatsApp CTA**: Direct link formatted via `https://wa.me/2348106246748?text=...` pre-populated with: *"Hello MJr Designs, I saw your CYMA HOMES Limited case study and would like to discuss a similar project."*
* **And** the modal container transitions from hidden to visible (`display: flex`, `opacity: 1`, `transform: scale(1)`).

---

### Scenario 3: Focus Trapping & Keyboard Management (WCAG 2.1 AA)
* **Given** the modal dialog is open and visible (`aria-modal="true"`),
* **When** the modal initializes,
* **Then** keyboard focus immediately moves to the first interactive element inside the modal (the Close button or primary CTA).
* **And** when the user presses `Tab` from the last focusable element in the modal:
  * Focus wraps around to the first focusable element inside the modal.
* **And** when the user presses `Shift + Tab` from the first focusable element:
  * Focus wraps backwards to the last focusable element inside the modal.
* **And** keyboard focus cannot escape into background document elements while the modal remains open.

---

### Scenario 4: Multi-Modal Dismissal & Focus Restoration
* **Given** the modal dialog is active,
* **When** any of the following dismissal events occur:
  1. The user presses the `Escape` key (`event.key === 'Escape'`),
  2. The user clicks the explicit Close button (`data-action="close-modal"`),
  3. The user clicks directly on the semi-transparent modal backdrop overlay (`.modal-backdrop` or `data-action="close-modal"`),
* **Then** `closeModal()` is executed.
* **And** the modal smoothly animates out (`opacity: 0`, `transform: scale(0.95)`), receives `hidden` attribute, and updates `state.activeModalId = null`.
* **And** background document body scroll is restored (`document.body.classList.remove('modal-open')`).
* **And** keyboard focus is programmatically returned to `lastFocusedElement` (the initiating "Inspect Case Study" button).

---

### Scenario 5: Defensive Fallbacks & Invalid State Handling
* **Given** `openModal(projectId)` is called with an invalid, null, or non-existent project ID,
* **When** the lookup in `PORTFOLIO_DATA` yields `undefined`,
* **Then** the engine gracefully aborts opening, logs a non-fatal warning in development, and leaves the UI undisturbed without throwing uncaught exceptions.
* **And** rapid successive clicks or key presses do not cause animation glitches or stuck backdrop overlays.

---

## 4. Technical Specifications & Architectural Compliance

### 4.1. Semantic HTML5 Modal Structure (`index.html`)

```html
<!-- Accessible Case Study Lightbox Modal Landmark -->
<div id="portfolio-modal" class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-desc" hidden>
  <div class="modal-backdrop" data-action="close-modal" tabindex="-1"></div>
  
  <div class="modal-container">
    <!-- Modal Close Button -->
    <button type="button" 
            class="modal-close-btn" 
            data-action="close-modal" 
            aria-label="Close case study details">
      &times;
    </button>

    <div class="modal-scroll-wrap">
      <!-- Modal Visual Header -->
      <div class="modal-media-wrap">
        <div id="modal-media-placeholder" class="modal-media-placeholder">
          <div class="modal-media-badge" aria-hidden="true">
            <span id="modal-media-monogram" class="modal-monogram">MJ</span>
          </div>
          <span class="modal-media-watermark">MJr Case Study Showcase</span>
        </div>
        <span id="modal-category-badge" class="modal-category-badge">Brand Identity</span>
      </div>

      <!-- Modal Body Content -->
      <div class="modal-content">
        <div class="modal-header-meta">
          <span id="modal-client-name" class="modal-client-name">CYMA HOMES Limited</span>
          <h2 id="modal-title" class="modal-title">CYMA HOMES Limited</h2>
        </div>

        <p id="modal-desc" class="modal-description">
          Complete corporate identity system and industrial safety gear branding for a high-profile real estate development firm in Lagos.
        </p>

        <div class="modal-scope-section">
          <h3 class="modal-section-heading">Delivered Scope &amp; Artifacts</h3>
          <ul id="modal-scope-list" class="modal-scope-list" role="list" aria-label="Delivered Project Scope">
            <!-- Populated dynamically -->
          </ul>
        </div>

        <!-- Modal Action Footer -->
        <div class="modal-actions">
          <a id="modal-whatsapp-cta" 
             href="https://wa.me/2348106246748" 
             class="btn btn-primary btn-lg btn-block" 
             target="_blank" 
             rel="noopener noreferrer" 
             data-action="whatsapp-inquire" 
             data-context="Modal Case Study CTA">
            Request a Similar Quote on WhatsApp
          </a>
          <button type="button" 
                  class="btn btn-outline btn-block modal-dismiss-btn" 
                  data-action="close-modal">
            Back to Portfolio
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

### 4.2. JavaScript Modal Controller (`app.js`)

```javascript
// Variable to store reference to trigger element for focus restoration
let lastFocusedElement = null;

/**
 * Open Accessible Portfolio Case Study Lightbox Modal
 * @param {string} projectId - Unique project identifier
 */
function openModal(projectId) {
  if (typeof projectId !== 'string' || !projectId.trim()) return;

  const project = PORTFOLIO_DATA.find(item => item.id === projectId.trim());
  if (!project) {
    console.warn(`[MJr Engine] Project with id "${projectId}" not found in PORTFOLIO_DATA.`);
    return;
  }

  const modal = document.getElementById('portfolio-modal');
  if (!modal) return;

  // Cache current focused element to restore upon modal close
  lastFocusedElement = document.activeElement;
  state.activeModalId = project.id;

  // 1. Populate Modal Content
  const titleEl = document.getElementById('modal-title');
  const clientEl = document.getElementById('modal-client-name');
  const descEl = document.getElementById('modal-desc');
  const catBadgeEl = document.getElementById('modal-category-badge');
  const monogramEl = document.getElementById('modal-media-monogram');
  const placeholderEl = document.getElementById('modal-media-placeholder');
  const scopeListEl = document.getElementById('modal-scope-list');
  const ctaBtn = document.getElementById('modal-whatsapp-cta');

  if (titleEl) titleEl.textContent = project.title;
  if (clientEl) clientEl.textContent = project.client || project.title;
  if (descEl) descEl.textContent = project.description;
  if (catBadgeEl) catBadgeEl.textContent = project.categoryLabel;
  if (monogramEl) monogramEl.textContent = project.title.substring(0, 2).toUpperCase();
  if (placeholderEl) {
    placeholderEl.style.setProperty('--modal-accent', project.accentColor || '#FF6B00');
  }

  if (scopeListEl) {
    scopeListEl.innerHTML = (Array.isArray(project.scope) ? project.scope : [])
      .map(tag => `<li class="modal-scope-chip">#${escapeHtml(String(tag))}</li>`)
      .join('');
  }

  if (ctaBtn) {
    const waText = encodeURIComponent(`Hello MJr Designs, I saw your ${project.title} case study and would like to discuss a similar project.`);
    ctaBtn.href = `https://wa.me/2348106246748?text=${waText}`;
    ctaBtn.dataset.context = project.whatsappContext || `${project.title} Modal Case Study`;
  }

  // 2. Display Modal & Lock Body Scroll
  modal.removeAttribute('hidden');
  document.body.classList.add('modal-open');

  // 3. Move initial focus into Modal for Screen Readers and Keyboard Navigation
  requestAnimationFrame(() => {
    const closeBtn = modal.querySelector('.modal-close-btn');
    if (closeBtn) {
      closeBtn.focus();
    } else {
      modal.focus();
    }
  });
}

/**
 * Close Case Study Lightbox Modal & Restore State
 */
function closeModal() {
  if (!state.activeModalId) return;

  const modal = document.getElementById('portfolio-modal');
  if (!modal) return;

  state.activeModalId = null;
  modal.setAttribute('hidden', '');
  document.body.classList.remove('modal-open');

  // Restore keyboard focus to originating element
  if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
    lastFocusedElement.focus();
    lastFocusedElement = null;
  }
}

/**
 * Centralized Event Delegation Routing Addition for Modal
 */
document.addEventListener('click', (event) => {
  const actionEl = event.target.closest('[data-action]');
  if (!actionEl) return;

  const action = actionEl.dataset.action;

  switch (action) {
    case 'open-modal': {
      event.preventDefault();
      const projectId = actionEl.dataset.projectId;
      openModal(projectId);
      break;
    }
    case 'close-modal': {
      event.preventDefault();
      closeModal();
      break;
    }
    // other actions (filter-category, toggle-mobile-nav, etc.)
  }
});
```

---

### 4.3. Focus Trap Handler Integration in Global `keydown`

```javascript
document.addEventListener('keydown', (event) => {
  // Modal Escape & Focus Trap Handling
  if (state.activeModalId) {
    const modal = document.getElementById('portfolio-modal');
    if (!modal) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      closeModal();
      return;
    }

    if (event.key === 'Tab') {
      const focusables = Array.from(
        modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
      ).filter(el => !el.hasAttribute('disabled') && el.offsetParent !== null);

      if (focusables.length === 0) {
        event.preventDefault();
        return;
      }

      const firstEl = focusables[0];
      const lastEl = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === firstEl) {
        event.preventDefault();
        lastEl.focus();
      } else if (!event.shiftKey && document.activeElement === lastEl) {
        event.preventDefault();
        firstEl.focus();
      }
    }
    return;
  }

  // Other keyboard listeners (Tablist arrow navigation, mobile drawer)
});
```

---

### 4.4. CSS Modal Styles (`styles.css`)

```css
/* --------------------------------------------------------------------------
   ACCESSIBLE LIGHTBOX MODAL STYLES
   -------------------------------------------------------------------------- */
body.modal-open {
  overflow: hidden;
  touch-action: none;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: var(--z-modal);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-md);
  opacity: 1;
  transition: opacity var(--transition-normal) ease;
}

.modal-overlay[hidden] {
  display: none !important;
  opacity: 0;
}

.modal-backdrop {
  position: absolute;
  inset: 0;
  background-color: rgba(26, 26, 26, 0.75);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  cursor: pointer;
}

.modal-container {
  position: relative;
  z-index: 1;
  background-color: var(--color-surface);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-2xl);
  max-width: 680px;
  width: 100%;
  max-height: calc(100vh - var(--space-2xl));
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: modalScaleIn var(--transition-normal) cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes modalScaleIn {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-close-btn {
  position: absolute;
  top: var(--space-md);
  right: var(--space-md);
  z-index: 10;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  background-color: rgba(26, 26, 26, 0.6);
  color: var(--color-surface);
  border: none;
  font-size: 24px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color var(--transition-fast), transform var(--transition-fast);
}

.modal-close-btn:hover {
  background-color: var(--color-primary);
  transform: rotate(90deg);
}

.modal-close-btn:focus-visible {
  outline: 3px solid var(--color-surface);
  outline-offset: 2px;
}

.modal-scroll-wrap {
  overflow-y: auto;
  overscroll-behavior: contain;
}

.modal-media-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background-color: var(--color-charcoal);
  overflow: hidden;
}

.modal-media-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--modal-accent, var(--color-primary)) 0%, #1A1A1A 100%);
  color: var(--color-surface);
}

.modal-media-badge {
  width: 64px;
  height: 64px;
  border-radius: var(--radius-full);
  background-color: rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-xs);
}

.modal-monogram {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-extrabold);
  letter-spacing: -0.02em;
}

.modal-media-watermark {
  font-size: var(--font-size-xs);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.7;
}

.modal-category-badge {
  position: absolute;
  bottom: var(--space-md);
  left: var(--space-md);
  background-color: var(--color-primary);
  color: var(--color-surface);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 4px 12px;
  border-radius: var(--radius-full);
}

.modal-content {
  padding: var(--space-xl);
}

.modal-header-meta {
  margin-bottom: var(--space-md);
}

.modal-client-name {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  display: block;
  margin-bottom: 2px;
}

.modal-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-extrabold);
  color: var(--color-charcoal);
}

.modal-description {
  font-size: var(--font-size-body);
  color: var(--color-text-muted);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--space-lg);
}

.modal-section-heading {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  color: var(--color-charcoal);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--space-sm);
}

.modal-scope-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
  margin-bottom: var(--space-xl);
}

.modal-scope-chip {
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  color: var(--color-charcoal);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  padding: 4px 10px;
  border-radius: var(--radius-md);
}

.modal-actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

/* Reduced Motion Compliance */
@media (prefers-reduced-motion: reduce) {
  .modal-container {
    animation: none !important;
  }
  .modal-close-btn {
    transition: none !important;
  }
}
```

---

## 5. Verification & Testing Matrix

| Test ID | Test Scope | Verification Method | Expected Result |
| :--- | :--- | :--- | :--- |
| **TC-331** | Modal Open via Event Delegation | Click *"Inspect Case Study"* button on `cyma-homes` card | `document.body` delegation catches event, calls `openModal('cyma-homes')`, removes `hidden` attribute, updates `state.activeModalId = 'cyma-homes'`. |
| **TC-332** | Data Population Fidelity | Inspect modal DOM elements after opening `tolw-brochure` | `#modal-title` displays *"Tour of Lagos Waterways (TOLW)"*, badge displays *"Publications & Editorial"*, scope chips render all 5 deliverable tags. |
| **TC-333** | WhatsApp Link Context Binding | Verify `href` on `#modal-whatsapp-cta` | URL targets `+2348106246748` with sanitized pre-filled text referencing the exact active case study. |
| **TC-334** | Focus Trapping Cycling | Press `Tab` through modal interactive elements | Focus strictly cycles `Close Button` \(\rightarrow\) `WhatsApp CTA` \(\rightarrow\) `Back to Portfolio Button` \(\rightarrow\) `Close Button`. Cannot escape into background DOM. |
| **TC-335** | Escape Key Dismissal | Press `Escape` while modal is open | Modal closes immediately, `state.activeModalId` resets to `null`, `hidden` attribute restored, and focus returns to initiating card button. |
| **TC-336** | Backdrop Click Dismissal | Click on `.modal-backdrop` overlay outside `.modal-container` | Modal closes cleanly and background body scroll (`modal-open`) is removed. |
| **TC-337** | Background Scroll Locking | Inspect `document.body` classes while modal is active | `body` contains `.modal-open` (`overflow: hidden`), preventing background scrolling on desktop and mobile. |
| **TC-338** | Automated Test Suite Execution | Run automated Vitest test suite (`story-3.3.test.mjs`) | 100% green pass rate across all modal lifecycle assertions. |

---

### Review Findings

- [ ] [Review][Pending] Verify focus trap wraps both forwards (`Tab`) and backwards (`Shift+Tab`).
- [ ] [Review][Pending] Verify focus restores cleanly to exact triggering button.
- [ ] [Review][Pending] Verify layout stability with zero horizontal shift when body scroll locks.
- [ ] [Review][Pending] Sync Story 3.3 learning checkpoints with `bmad-frontend-tutor`.

### Rejected

- None yet recorded.
