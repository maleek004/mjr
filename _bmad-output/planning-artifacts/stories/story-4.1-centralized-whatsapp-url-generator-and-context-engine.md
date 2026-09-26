# Story 4.1: Centralized WhatsApp URL Generator & Context Engine

**Epic**: Epic 4: Context-Aware Dynamic WhatsApp Lead Engine & Quality Polish  
**Status**: Done  
**Author**: Mary (Business Analyst)  
**Date**: 2026-09-27  
**Target Files**: `app.js`, `index.html`, `styles.css`

---

## 1. User Story Statement

**As a** high-intent corporate procurement director, event planner, or business owner exploring MJr Designs & Print Solutions Limited,  
**I want** every call-to-action (CTA) button across the website (Hero, Service Pillars, Case Study Modals, and Footer) to automatically construct and launch a tailored, pre-filled WhatsApp inquiry targeting `+2348106246748` reflecting the exact section, service deliverable, or portfolio project I am currently viewing,  
**So that** I can initiate an immediate, qualified commercial dialogue without having to formulate an introductory message from scratch, copy-paste contact details, or experience routing friction.

---

## 2. Strategic Context & Business Value

* **Zero-Friction Conversion Funnel (The High-Intent Lead Pipeline)**:
  In the West African commercial design and print ecosystem, WhatsApp is the definitive medium for business negotiation, quote approval, file transfer, and invoice settlement. Conventional forms introduce severe drop-off (average 60–75% abandonment). By contrast, dynamic WhatsApp deep-links eliminate 100% of text composition friction, increasing lead capture velocity.
* **Context-Aware Lead Qualification (AD-5 & FR-502)**:
  A generic *"Hello"* requires 3–5 rounds of back-and-forth messaging simply to identify what the prospective client wants. By dynamically attaching contextual intent (e.g. *"I am interested in your Brand Identity & Corporate Design packages"* or *"I saw your CYMA HOMES Limited case study and would like to discuss a similar project"*), the MJr sales and creative team receives an instantly actionable, pre-qualified inquiry on turn zero.
* **Architectural Invariant Adherence (AD-1, AD-3, AD-5)**:
  * **Zero-Framework Purity**: Implemented in 100% pure ES6+ JavaScript with zero third-party marketing SDKs or external routing dependencies.
  * **Centralized Delegation**: All conversion triggers utilize `data-action="whatsapp-inquire"` intercepted at the `document.body` event root via `e.target.closest()`, guaranteeing \(O(1)\) memory overhead and resilient binding across dynamically re-rendered elements.
  * **Single Source of Truth**: Standardized template registry `WHATSAPP_TEMPLATES` mapping context identifiers to curated conversational openers.
* **URL Encoding & Defensive Sanitization**:
  Prevents URL malformations, invalid URI components, emoji clipping, and script injection by strictly enforcing RFC 3986 compliance through native `encodeURIComponent()`.
* **Pedagogical Significance**:
  Teaches essential web platform mechanics: URL protocols (`https:`, `wa.me`), Query Parameter construction (`?text=...`), String encoding algorithms (`encodeURIComponent`), centralized event delegation routing, and graceful degradation for assistive technology.

---

## 3. Detailed Acceptance Criteria (Gherkin Format)

### Scenario 1: Centralized Event Interception & Action Routing
* **Given** a user interacts with any element possessing `data-action="whatsapp-inquire"`,
* **When** a `click` event is dispatched anywhere in the DOM tree,
* **Then** the global listener on `document.body` intercepts the event via `e.target.closest('[data-action="whatsapp-inquire"]')`.
* **And** extracts metadata attributes:
  * `dataset.context` (Context key, e.g. `"hero"`, `"brand-identity"`, `"custom-apparel"`, `"modal-case-study"`)
  * `dataset.projectId` (Optional project identifier when clicked from a portfolio card or modal)
  * `dataset.service` (Optional service identifier when clicked from a service pillar)
* **And** invokes `handleWhatsAppInquiry(context, options)`.

---

### Scenario 2: Context Template Resolution & Inquiry Mapping Matrix
* **Given** `handleWhatsAppInquiry` is called with a recognized context identifier,
* **When** resolving the pre-formatted inquiry text,
* **Then** the engine retrieves and formats the appropriate template string from `WHATSAPP_TEMPLATES`:

| Context Identifier / Trigger Location | Target Element Selector / Attributes | Pre-Filled WhatsApp Message Template |
| :--- | :--- | :--- |
| **Hero Primary CTA** | `#hero-cta` / `data-context="hero"` | `"Hello MJr Designs, I'd like to discuss a custom design and print project for my organization."` |
| **Header Quick-Action Button** | `.nav-cta-btn` / `data-context="header-nav"` | `"Hello MJr Designs, I would like to make a general inquiry about your creative branding and print services."` |
| **Pillar 1: Brand Identity** | `[data-service="brand-identity"]` | `"Hello MJr Designs, I am interested in your Brand Identity & Corporate Design packages."` |
| **Pillar 2: Marketing & Advertising** | `[data-service="marketing-ads"]` | `"Hello MJr Designs, I would like to discuss Marketing & Advertising Design services for my campaign."` |
| **Pillar 3: Print Production** | `[data-service="print-production"]` | `"Hello MJr Designs, I would like to request a quote for Print & Publication Production."` |
| **Pillar 4: Event & Custom Apparel** | `[data-service="custom-apparel"]` | `"Hello MJr Designs, I am looking for custom shirt and apparel printing for my brand/organization."` |
| **Portfolio Modal Case Study** | `#modal-whatsapp-cta` / `data-context="modal"` | `"Hello MJr Designs, I saw your [Project Title] case study and would like to discuss a similar project."` |
| **Footer Contact Link** | `#footer-whatsapp-link` / `data-context="footer"` | `"Hello MJr Designs, I'm reaching out from your website footer to inquire about your services."` |
| **Generic / Fallback Trigger** | Any unmapped `data-action="whatsapp-inquire"` | `"Hello MJr Designs, I would like to inquire about your design and print services."` |

---

### Scenario 3: Standardized URL Construction & Sanitization
* **Given** a target phone number `"2348106246748"` and a resolved message string,
* **When** `generateWhatsAppUrl(phone, message)` is executed,
* **Then** it strips all non-numeric characters from the phone number (e.g. `+`, `-`, spaces) leaving `2348106246748`.
* **And** it encodes the message string using `encodeURIComponent()` to safely represent spaces, punctuation, and Unicode characters.
* **And** it returns a clean, fully qualified URI in the exact format:
  `https://wa.me/2348106246748?text=Hello%20MJr%20Designs%2C%20...`

---

### Scenario 4: Browser Navigation & Window Opening Security
* **Given** a valid constructed WhatsApp URI,
* **When** triggered via a click event,
* **Then** for native `<a>` elements:
  * The `href` attribute is dynamically synchronized to the generated URL.
  * The element enforces `target="_blank"` and `rel="noopener noreferrer"` to eliminate reverse tab-nabbing vulnerabilities.
* **And** for programmatic button triggers:
  * The handler executes `window.open(url, '_blank', 'noopener,noreferrer')`.

---

### Scenario 5: Defensive Fallbacks & Malformed State Handling
* **Given** an invalid, null, undefined, or empty context parameter,
* **When** `resolveWhatsAppMessage(context, options)` is evaluated,
* **Then** the engine gracefully returns the default fallback template without throwing exceptions or logging uncaught errors.
* **And** if `encodeURIComponent` encounters unexpected edge cases, safe string coercion (`String(msg).trim()`) prevents runtime crashes.

---

## 4. Technical Specifications & Architectural Compliance

### 4.1. Core WhatsApp Lead Engine Implementation (`app.js`)

```javascript
/**
 * WhatsApp Lead Generation Configuration & Template Registry
 */
const WHATSAPP_CONFIG = {
  defaultPhone: '2348106246748',
  baseUrl: 'https://wa.me/'
};

const WHATSAPP_TEMPLATES = {
  hero: "Hello MJr Designs, I'd like to discuss a custom design and print project for my organization.",
  'header-nav': "Hello MJr Designs, I would like to make a general inquiry about your creative branding and print services.",
  'brand-identity': "Hello MJr Designs, I am interested in your Brand Identity & Corporate Design packages.",
  'marketing-ads': "Hello MJr Designs, I would like to discuss Marketing & Advertising Design services for my campaign.",
  'print-production': "Hello MJr Designs, I would like to request a quote for Print & Publication Production.",
  'custom-apparel': "Hello MJr Designs, I am looking for custom shirt and apparel printing for my brand/organization.",
  modal: "Hello MJr Designs, I saw your {projectTitle} case study and would like to discuss a similar project.",
  footer: "Hello MJr Designs, I'm reaching out from your website footer to inquire about your services.",
  default: "Hello MJr Designs, I would like to inquire about your design and print services."
};

/**
 * Format phone number to international digits-only format
 * @param {string} phone - Input phone number
 * @returns {string} Sanitized phone digits
 */
function sanitizePhoneNumber(phone) {
  if (typeof phone !== 'string') return WHATSAPP_CONFIG.defaultPhone;
  const digits = phone.replace(/\D/g, '');
  return digits.length > 0 ? digits : WHATSAPP_CONFIG.defaultPhone;
}

/**
 * Resolve context-specific message from template registry
 * @param {string} context - Context key
 * @param {Object} [options={}] - Dynamic interpolation variables (e.g. { projectTitle })
 * @returns {string} Fully interpolated message string
 */
function resolveWhatsAppMessage(context, options = {}) {
  const key = (typeof context === 'string' && context.trim().toLowerCase()) || 'default';
  let template = WHATSAPP_TEMPLATES[key] || WHATSAPP_TEMPLATES['default'];

  if (options && options.projectTitle) {
    template = template.replace('{projectTitle}', options.projectTitle);
  }

  return template;
}

/**
 * Construct sanitized, RFC 3986-compliant WhatsApp deep link URL
 * @param {string} [phone] - Target phone number
 * @param {string} [context] - Context template key
 * @param {Object} [options={}] - Additional interpolation parameters
 * @returns {string} Fully qualified wa.me URL
 */
function generateWhatsAppUrl(phone, context, options = {}) {
  const cleanPhone = sanitizePhoneNumber(phone || WHATSAPP_CONFIG.defaultPhone);
  const message = resolveWhatsAppMessage(context, options);
  const encodedText = encodeURIComponent(message);
  return `${WHATSAPP_CONFIG.baseUrl}${cleanPhone}?text=${encodedText}`;
}

/**
 * Centralized Handler for WhatsApp Inquiry Action
 * @param {HTMLElement} actionEl - The trigger element containing metadata
 */
function handleWhatsAppInquiry(actionEl) {
  if (!actionEl) return;

  const context = actionEl.dataset.context || actionEl.dataset.service || 'default';
  let projectTitle = '';

  if (context === 'modal' || actionEl.id === 'modal-whatsapp-cta') {
    const titleEl = document.getElementById('modal-title');
    projectTitle = titleEl ? titleEl.textContent.trim() : '';
  } else if (actionEl.dataset.projectId) {
    const project = PORTFOLIO_DATA.find(p => p.id === actionEl.dataset.projectId);
    if (project) projectTitle = project.title;
  }

  const url = generateWhatsAppUrl(WHATSAPP_CONFIG.defaultPhone, context, { projectTitle });

  // Update href if element is an anchor
  if (actionEl.tagName.toLowerCase() === 'a') {
    actionEl.href = url;
    actionEl.target = '_blank';
    actionEl.rel = 'noopener noreferrer';
  } else {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
```

---

### 4.2. Action Delegation Wiring in `document.addEventListener('click')`

```javascript
document.addEventListener('click', (event) => {
  const actionEl = event.target.closest('[data-action]');
  if (!actionEl) return;

  const action = actionEl.dataset.action;

  switch (action) {
    case 'whatsapp-inquire': {
      handleWhatsAppInquiry(actionEl);
      break;
    }
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
    case 'filter-category': {
      event.preventDefault();
      const selectedCategory = actionEl.dataset.category || 'all';
      filterPortfolio(selectedCategory);
      break;
    }
    case 'toggle-mobile-nav': {
      event.preventDefault();
      toggleMobileNav();
      break;
    }
    case 'close-mobile-nav': {
      closeMobileNav();
      break;
    }
    default:
      break;
  }
});
```

---

### 4.3. HTML Markup Integration Attributes across Landmarks (`index.html`)

```html
<!-- 1. Header Quick Navigation CTA -->
<a href="https://wa.me/2348106246748" 
   class="btn btn-primary nav-cta-btn" 
   data-action="whatsapp-inquire" 
   data-context="header-nav" 
   target="_blank" 
   rel="noopener noreferrer" 
   aria-label="Start WhatsApp consultation with MJr Designs">
  Start Project
</a>

<!-- 2. Hero Section Primary CTA -->
<a href="https://wa.me/2348106246748" 
   id="hero-cta" 
   class="btn btn-primary btn-lg" 
   data-action="whatsapp-inquire" 
   data-context="hero" 
   target="_blank" 
   rel="noopener noreferrer">
  Start a Project
</a>

<!-- 3. Service Pillar Card CTAs (Example: Pillar 4 Custom Apparel) -->
<a href="https://wa.me/2348106246748" 
   class="btn btn-primary btn-block" 
   data-action="whatsapp-inquire" 
   data-context="custom-apparel" 
   data-service="custom-apparel" 
   target="_blank" 
   rel="noopener noreferrer">
  Inquire: Custom Apparel
</a>

<!-- 4. Lightbox Modal Dynamic CTA -->
<a id="modal-whatsapp-cta" 
   href="https://wa.me/2348106246748" 
   class="btn btn-primary btn-lg btn-block" 
   data-action="whatsapp-inquire" 
   data-context="modal" 
   target="_blank" 
   rel="noopener noreferrer">
  Request a Similar Quote on WhatsApp
</a>

<!-- 5. Footer Quick-Contact WhatsApp Link -->
<a href="https://wa.me/2348106246748" 
   id="footer-whatsapp-link" 
   class="footer-contact-link" 
   data-action="whatsapp-inquire" 
   data-context="footer" 
   target="_blank" 
   rel="noopener noreferrer">
  +234 810 624 6748
</a>
```

---

## 5. Verification & Testing Matrix

| Test ID | Test Scope | Verification Method | Expected Result |
| :--- | :--- | :--- | :--- |
| **TC-411** | Phone Number Sanitization | Call `sanitizePhoneNumber("+234 810-624-6748")` | Returns `"2348106246748"` with all punctuation and whitespaces stripped. |
| **TC-412** | Template Message Interpolation | Call `resolveWhatsAppMessage('modal', { projectTitle: 'CYMA HOMES Limited' })` | Returns `"Hello MJr Designs, I saw your CYMA HOMES Limited case study and would like to discuss a similar project."` |
| **TC-413** | RFC 3986 URL Encoding | Call `generateWhatsAppUrl("2348106246748", "brand-identity")` | Produces `https://wa.me/2348106246748?text=Hello%20MJr%20Designs%2C%20I%20am%20interested%20in%20your%20Brand%20Identity%20%26%20Corporate%20Design%20packages.` |
| **TC-414** | Hero CTA Event Interception | Click `#hero-cta` button | `document.body` delegation catches event, updates `href`, and opens tab to Hero inquiry link. |
| **TC-415** | Pillar Context Routing | Click each of the 4 Service Pillar CTAs | Each button opens WhatsApp with its distinct, pillar-specific inquiry string. |
| **TC-416** | Modal Dynamic Lead Generation | Open Modal for `glazing-memoirs` and click `#modal-whatsapp-cta` | WhatsApp link contains `"Glazing Memoirs"` embedded in the pre-filled text. |
| **TC-417** | Fallback Resiliency | Trigger `generateWhatsAppUrl(null, 'non-existent-key')` | Generates valid URL using default phone number and default general inquiry template without runtime errors. |
| **TC-418** | Automated Vitest Test Suite | Execute automated Node test suite (`story-4.1.test.mjs`) | 100% green pass rate across all URL generation, template resolution, and DOM interaction assertions. |

---

## 6. Pedagogical Checkpoint (`bmad-frontend-tutor` Alignment)

Upon completion and verification of Story 4.1, the developer will invoke `/bmad-frontend-tutor` to reinforce:
1. **URI Component Encoding Deep-Dive**: The differences between `encodeURI` vs `encodeURIComponent`, ASCII percent-encoding, reserved characters (`&`, `?`, `=`, `#`, `/`), and UTF-8 multibyte character handling.
2. **Web Deep Linking & Custom Scheme Protocols**: How custom application URI schemes (`whatsapp://`, `mailto:`, `tel:`) operate relative to universal web landing endpoints (`https://wa.me/`).
3. **Tabnabbing Security Mechanics**: Why `rel="noopener noreferrer"` is mandatory when using `target="_blank"` to protect the `window.opener` object from malicious hijacking.

---

### Review Findings

- [x] [Review][Patch] Safe fallback for unpopulated modal projectTitle placeholder [`app.js`:58-65]

