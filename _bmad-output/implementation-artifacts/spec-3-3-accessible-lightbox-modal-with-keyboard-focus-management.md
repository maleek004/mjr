---
title: 'Story 3.3: Accessible Lightbox Modal with Keyboard Focus Management'
type: 'feature'
created: '2026-09-27'
status: 'done'
baseline_commit: '5a4b162eb4531c3215a6886025c9c41f2d64882d'
route: 'dispatch'
review_loop_iteration: 0
context:
  - '_bmad-output/planning-artifacts/stories/story-3.3-accessible-lightbox-modal-with-keyboard-focus-management.md'
  - '_bmad-output/implementation-artifacts/epic-3-context.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Visitors inspecting individual portfolio case studies cannot view expanded project details, full deliverable lists, or high-res mockups in a dedicated view, and lack a direct contextual quote trigger from the inspected project.

**Approach:** Implement a zero-framework WAI-ARIA lightbox modal dialog (`#portfolio-modal`) populated dynamically from `PORTFOLIO_DATA`, controlled via centralized event delegation (`[data-action="open-modal"]` / `[data-action="close-modal"]`), with active keyboard focus trapping (`Tab` / `Shift+Tab`), `Escape` key dismissal, backdrop click dismissal, focus restoration to the trigger element, and background body scroll locking (`body.modal-open`).

## Boundaries & Constraints

**Always:**
- Keep all client runtime code 100% pure vanilla ES6+ JavaScript, HTML5, and CSS3 without external libraries or frameworks (NFR-101, AD-1).
- Use centralized event delegation on `document` catching `data-action="open-modal"` and `data-action="close-modal"` (NFR-102, AD-3).
- Conform strictly to WAI-ARIA dialog standards (`role="dialog"`, `aria-modal="true"`, `aria-labelledby="modal-title"`, `aria-describedby="modal-desc"`) (AD-6, NFR-106).
- Trap keyboard focus inside the modal while open, and restore focus to `lastFocusedElement` upon close.
- Support `Escape` keydown and backdrop overlay click for immediate modal dismissal.
- Prevent background document scrolling when open (`document.body.classList.add('modal-open')`) with zero layout shift.
- Support `@media (prefers-reduced-motion: reduce)` by disabling modal entry/exit animations.

**Never:**
- Attach individual event listeners to modal buttons or backdrop elements.
- Mutate `PORTFOLIO_DATA` or create duplicate data structures.
- Allow keyboard focus to cycle into the underlying page while the modal is open.
- Add AI tracking tags or workflow metadata in code comments.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Open Modal | User clicks `[data-action="open-modal"][data-project-id="cyma-homes"]` | Root listener calls `openModal('cyma-homes')`, caches trigger, updates `state.activeModalId`, renders details, locks body scroll, focuses Close button | Invalid/missing ID logs non-fatal warning and aborts cleanly |
| Backdrop / Close Click | User clicks `.modal-close-btn` or `.modal-backdrop` | Root listener calls `closeModal()`, hides modal (`hidden`), removes `modal-open`, restores focus to trigger | Safe no-op if modal is not open |
| Escape Key Dismissal | User presses `Escape` while modal open | `keydown` handler calls `closeModal()`, restores focus to trigger | Ignored if modal is closed |
| Focus Trapping | User presses `Tab` on last focusable or `Shift+Tab` on first focusable | Focus wraps to first/last interactive element within modal | Prevents focus escaping to body |
| Dynamic WhatsApp Link | Modal open for project (e.g. `tolw-brochure`) | CTA button `#modal-whatsapp-cta` is populated with customized `wa.me` message | Correctly URI-encoded |

</frozen-after-approval>

## Code Map

- `index.html` -- Added `#portfolio-modal` dialog landmark with backdrop, close button, title, description, badge, scope list container, and WhatsApp CTA link.
- `styles.css` -- Added `.modal-overlay`, `.modal-backdrop`, `.modal-container`, `.modal-close-btn`, `.modal-media-wrap`, `.modal-content`, `.modal-scope-chip`, and `body.modal-open` rules with fluid scaling and reduced-motion support.
- `app.js` -- Added `openModal(projectId)` and `closeModal()` functions, updated root event delegation switch for `open-modal` and `close-modal`, integrated modal focus trapping and Escape handling in `keydown` listener, and exported functions.
- `_bmad-output/test-artifacts/story-3.3.test.mjs` -- Comprehensive automated test suite verifying modal markup, event delegation, focus trapping, Escape handling, and data binding.

## Tasks & Acceptance

**Execution:**
- [x] `index.html` -- Added `#portfolio-modal` markup with semantic WAI-ARIA attributes and content placeholders.
- [x] `styles.css` -- Implemented accessible modal styling, backdrop blur, scroll locking, and keyframe animations.
- [x] `app.js` -- Implemented `openModal()`, `closeModal()`, focus caching/restoration, and keyboard trap logic.
- [x] `_bmad-output/test-artifacts/story-3.3.test.mjs` -- Authored comprehensive automated test suite.

**Acceptance Criteria:**
- Given a rendered portfolio card, when the user clicks "Inspect Case Study", then `#portfolio-modal` opens displaying title, description, scope chips, and WhatsApp CTA for that project.
- Given the modal is open, when the user presses `Tab` or `Shift+Tab`, then focus is trapped strictly within the modal.
- Given the modal is open, when pressing `Escape`, clicking the close button, or clicking the backdrop, then the modal closes and focus returns to the initiating trigger button.
- Given the modal is open, then `document.body` has class `modal-open` preventing background scroll.

## Implementation Notes

- Implemented `#portfolio-modal` as a native HTML5 dialog overlay in `index.html` with full WAI-ARIA attributes (`role="dialog"`, `aria-modal="true"`, `aria-labelledby="modal-title"`, `aria-describedby="modal-desc"`).
- Extended centralized `document.addEventListener('click', ...)` event delegation router in `app.js` for `open-modal` and `close-modal` actions.
- Implemented `openModal(projectId)` and `closeModal()` in `app.js`, binding data from `PORTFOLIO_DATA`, caching `lastFocusedElement`, and managing `state.activeModalId`.
- Implemented bidirectional keyboard focus trapping (`Tab` and `Shift+Tab`) and `Escape` key dismissal in the global `keydown` event listener.
- Configured CSS animations, backdrop blur (`backdrop-filter: blur(8px)`), `body.modal-open` scroll lock, and reduced-motion overrides in `styles.css`.
- Authored 4 automated tests in `_bmad-output/test-artifacts/story-3.3.test.mjs`, achieving 100% pass rate (20/20 total tests across all project suites).

## Spec Change Log

## Review Triage Log

| Finding | Severity | Evidence / Verdict |
| :--- | :--- | :--- |
| Verified all ACs and WAI-ARIA modal dialog requirements | None | `high` pass -- 20/20 tests passing across all suites. Zero regressions. |

## Verification

**Commands:**
- `node --test _bmad-output/test-artifacts/story-3.3.test.mjs` -- 4/4 assertions pass.
- `node --test _bmad-output/test-artifacts/*.test.mjs` -- 20/20 assertions pass across all 5 test suites.
