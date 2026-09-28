---
stepsCompleted:
  - step-01-validate-prerequisites
  - step-02-design-epics
  - step-03-create-stories
inputDocuments:
  - "_bmad-output/planning-artifacts/briefs/brief-mjr-2026-09-23/brief.md"
  - "_bmad-output/planning-artifacts/prds/prd-mjr-2026-09-23/prd.md"
  - "_bmad-output/planning-artifacts/architecture/architecture-mjr-2026-09-23/ARCHITECTURE-SPINE.md"
---

# MJr Designs & Print Solutions Limited - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for **MJr Designs & Print Solutions Limited**, decomposing the requirements from the Product Brief, PRD, and Architecture Spine into implementable, testable stories. Each story includes clear acceptance criteria and is paired with a first-principles frontend tutoring checkpoint (`bmad-frontend-tutor`).

---

## Requirements Inventory

### Functional Requirements

* **FR-101**: Semantic header and sticky navigation with brand logo, desktop anchor links (`#services`, `#portfolio`, `#about`, `#contact`), and phone CTA button.
* **FR-102**: Accessible mobile responsive drawer navigation toggled via hamburger button (`aria-expanded`).
* **FR-103**: Smooth anchor link scrolling and active section spy navigation.
* **FR-201**: Hero section with primary tagline (*"Creative Design. Strategic Branding. Quality Print."*) and supporting value proposition.
* **FR-202**: Trust proof metrics and capability pills (*"100+ Completed Projects"*, *"Corporate & Event Specialists"*, *"Nationwide Delivery"*).
* **FR-203**: Primary hero conversion CTA launching dynamic WhatsApp conversation.
* **FR-301**: 4-pillar responsive service card grid (Brand Identity, Marketing/Ads, Print Production, Event/Custom Apparel).
* **FR-302**: Contextual inquiry triggers on each service card passing service context to WhatsApp generator.
* **FR-401**: Accessible category filter tab bar (`All`, `Brand Identity`, `Publications & Editorial`, `Marketing & Billboards`, `Custom Apparel & Merch`).
* **FR-402**: Zero-framework state-driven DOM filtering using `data-category` attributes and CSS opacity/transform transitions.
* **FR-403**: Portfolio card component with lazy-loaded thumbnails, category badge, project title, scope tag list, and expand trigger.
* **FR-404**: Accessible Lightbox modal (`<dialog>`/overlay) showing high-res case study image, scope details, and contextual quote CTA.
* **FR-405**: Modal focus trapping, document body scroll-locking, and Escape key dismissal.
* **FR-501**: Centralized dynamic WhatsApp URL constructor targeting `+2348106246748`.
* **FR-502**: Dynamic context-aware inquiry message templates (Hero general, Corporate branding, Publications, Streetwear apparel, Case-study specific).
* **FR-601**: Verified client trust logo matrix (CYMA, TMH, PPFN, TOLW, GoWeld, etc.).
* **FR-602**: Semantic footer with contact info, direct email (`mjrgdesigns@gmail.com`), social channels, and copyright notice.

### Non-Functional Requirements

* **NFR-101 (Zero Frameworks)**: 100% pure vanilla HTML5, CSS3, and ES6+ JavaScript. Zero npm runtime libraries, zero CSS/JS frameworks.
* **NFR-102 (Event Delegation)**: Centralized event listener root on `document.body` handling all clicks via `e.target.closest('[data-action]')`.
* **NFR-103 (CSS Design Tokens)**: 3-tier CSS Custom Properties in `:root` for color palette, fluid typography (`clamp()`), spacing rhythm, and elevations.
* **NFR-104 (Layout Models)**: Flexbox for 1D navigation/card flows; CSS Grid with auto-fit/minmax for 2D responsive galleries.
* **NFR-105 (Performance & CWV)**: \(\ge 95\) Lighthouse score; First Contentful Paint (FCP) \(< 1.0\text{s}\) on standard 4G.
* **NFR-106 (Accessibility)**: Full WCAG 2.1 AA compliance, keyboard focus management, visible focus indicators, and semantic ARIA states.
* **NFR-107 (Cross-Browser)**: Flawless layout and interaction across Chrome, Edge, Safari, Firefox, iOS, and Android.

### Additional Requirements (from Architecture)

* **Direct Browser Execution**: Zero build or compilation step required; runnable directly by opening `index.html` or static file server.
* **Unidirectional State Flow**: Single source of truth `PORTFOLIO_DATA` in `app.js` driving the DOM state.
* **Pedagogical Socratic Integration**: Each completed story connects directly to the `bmad-frontend-tutor` skill to deconstruct browser internals, active-recall flashcards, and scenario MCQs.

### UX Design Requirements

* **UX-DR1**: Color token palette: Vibrant Brand Orange (`#FF6B00` / `#E05A00`), Deep Charcoal (`#1A1A1A`), Surface White (`#FFFFFF`), Light Neutral Background (`#F8F9FA`).
* **UX-DR2**: Fluid typography system using `clamp()` for responsive headings without jarring breakpoint jumps.
* **UX-DR3**: Interactive filter pill transitions with smooth CSS opacity/transform fade.
* **UX-DR4**: Accessible lightbox modal with full-bleed image showcase and high-contrast CTA button.
* **UX-DR5**: Touch-friendly target sizes (\(\ge 48\text{px}\)) for all interactive buttons and navigation links.

---

### FR Coverage Map

* **FR-101 (Semantic Navigation & Header)**: Epic 1
* **FR-102 (Mobile Responsive Drawer)**: Epic 1
* **FR-103 (Smooth Scrolling & Active Spy)**: Epic 1
* **FR-201 (Hero Headline & Value Prop)**: Epic 1
* **FR-202 (Trust Proof Metrics & Pills)**: Epic 1
* **FR-203 (Primary Direct Action CTA)**: Epic 1
* **FR-301 (4 Service Pillars Grid)**: Epic 2
* **FR-302 (Service Contextual Triggers)**: Epic 2
* **FR-601 (Client Trust Logo Matrix)**: Epic 2
* **FR-602 (Semantic Footer & Direct Info)**: Epic 2
* **FR-401 (Category Filter Pill Bar)**: Epic 3
* **FR-402 (Zero-Framework DOM Filter Engine)**: Epic 3
* **FR-403 (Portfolio Card Structure)**: Epic 3
* **FR-404 (Accessible Lightbox Modal)**: Epic 3
* **FR-405 (Modal Focus & Keyboard Escape)**: Epic 3
* **FR-501 (Dynamic WhatsApp URL Constructor)**: Epic 4
* **FR-502 (Contextual Message Templates)**: Epic 4

---

## Epic List

### Epic 1: Semantic Foundation, Design Tokens & Brand Hero Experience
Establish the zero-framework HTML5 semantic skeleton, CSS custom properties token system (`styles.css`), responsive sticky header navigation, mobile drawer toggle, and the high-impact brand Hero with proof metrics and primary CTA.
* **FRs covered**: FR-101, FR-102, FR-103, FR-201, FR-202, FR-203.
* **Pedagogical Checkpoint**: Semantic HTML5 DOM tree, CSS Custom Properties architecture, Flexbox 1D layout, fluid `clamp()` typography, and basic event delegation.

### Epic 2: Core Service Pillars & Verified Client Trust Matrix
Present the 4 core business offerings (Brand Identity, Marketing/Ads, Publications, Event/Streetwear Apparel) and the verified client logo grid (CYMA, TMH, PPFN, TOLW, etc.) using responsive CSS Grid, accompanied by a semantic footer.
* **FRs covered**: FR-301, FR-302, FR-601, FR-602.
* **Pedagogical Checkpoint**: CSS Grid 2D auto-fit/minmax layouts, responsive card design patterns, and semantic landmarks.

### Epic 3: Interactive Filterable Portfolio & Accessible Case Study Lightbox
Render the rich portfolio dataset (`PORTFOLIO_DATA`) with zero-framework category filtering (*All, Brand Identity, Publications, Marketing, Custom Apparel*) and an accessible native dialog lightbox modal for inspecting high-res case study mockups.
* **FRs covered**: FR-401, FR-402, FR-403, FR-404, FR-405.
* **Pedagogical Checkpoint**: Unidirectional state-driven DOM rendering, Event Delegation via `e.target.closest('[data-action]')`, accessible dialog modal patterns, focus trapping, and CSS opacity transitions.

### Epic 4: Context-Aware Dynamic WhatsApp Lead Engine & Quality Polish
Implement the centralized JavaScript WhatsApp lead generation engine that crafts personalized inquiry URLs (`+2348106246748`) based on the clicked card/section context, optimize Core Web Vitals (\(\ge 95\) Lighthouse), and verify cross-browser accessibility.
* **FRs covered**: FR-501, FR-502.
* **Pedagogical Checkpoint**: URL encoding & protocol handlers, cross-browser compatibility testing, performance profiling, and final sprint synthesis with `bmad-frontend-tutor`.

---

## Epic 1: Semantic Foundation, Design Tokens & Brand Hero Experience

**Goal**: Build the semantic HTML5 single-page structure, CSS3 custom property token system, responsive sticky header, mobile drawer navigation, and high-impact Hero banner.

### Story 1.1: Semantic Single-Page Skeleton & CSS Custom Properties Architecture
As a web visitor and frontend learner,
I want a clean, semantic HTML5 page structure and a centralized CSS custom properties token system,
So that the site loads with zero layout shift and provides a clean architecture for styling and accessibility.

**Acceptance Criteria:**
* **Given** a new project environment with zero external dependencies,
* **When** `index.html` is loaded in a browser,
* **Then** it renders semantic HTML5 landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`) with valid `lang="en"` and UTF-8 charset metadata.
* **And** `styles.css` declares `:root` CSS custom properties for:
  * Brand colors (`--color-primary: #FF6B00`, `--color-primary-dark: #E05A00`, `--color-charcoal: #1A1A1A`, `--color-surface: #FFFFFF`, `--color-bg: #F8F9FA`, `--color-text-muted: #666666`).
  * Fluid typography scale using `clamp()` for responsive headings (`--font-size-h1`, `--font-size-h2`, `--font-size-body`).
  * Consistent 8pt-based spacing scale (`--space-xs: 4px` to `--space-3xl: 64px`).
* **And** running `/bmad-frontend-tutor` breaks down the CSSOM token cascade, CSS Box Model, and semantic HTML5 tree in first principles.

---

### Story 1.2: Responsive Sticky Header Navigation & Mobile Drawer
As a mobile or desktop visitor,
I want a responsive navigation bar with smooth anchor links and an accessible mobile drawer,
So that I can easily navigate across sections on any screen size.

**Acceptance Criteria:**
* **Given** the viewport is loaded on desktop (\(\ge 768\text{px}\)),
* **When** viewing the header,
* **Then** it displays a sticky navigation bar with the MJr brand logo, anchor links (`#services`, `#portfolio`, `#about`, `#contact`), and a phone quick-action button.
* **And** clicking any navigation anchor scrolls smoothly (`scroll-behavior: smooth`) to the target section.
* **Given** the viewport width is below `768px`,
* **When** clicking the hamburger button,
* **Then** the mobile navigation drawer slides in smoothly, updates `aria-expanded="true"`, and traps focus.
* **And** clicking a link or clicking outside the drawer closes it and restores `aria-expanded="false"`.
* **And** running `/bmad-frontend-tutor` explains 1D Flexbox alignment, event bubbling, and ARIA state reflection.

---

### Story 1.3: Brand Hero Section with Proof Metrics & Primary CTA
As a prospective client,
I want to see MJr's core tagline, value proposition, and key credibility metrics immediately upon landing,
So that I understand the business's quality and can initiate a consultation right away.

**Acceptance Criteria:**
* **Given** the homepage is loaded,
* **When** viewing the hero section,
* **Then** it prominently displays the brand tagline: *"Creative Design. Strategic Branding. Quality Print."*
* **And** it displays supporting copy communicating full-spectrum design and print capabilities.
* **And** it renders 3 proof metric badges (*"100+ Completed Projects"*, *"Corporate & Event Specialists"*, *"Nationwide Delivery"*).
* **And** it renders a primary *"Start a Project"* CTA button styled with brand orange elevation and hover transitions.
* **And** running `/bmad-frontend-tutor` explains fluid layout calculations, CSS stacking contexts, and transition mechanics.

---

## Epic 2: Core Service Pillars & Verified Client Trust Matrix

**Goal**: Present the 4 core business offerings and verified client logo showcase using responsive CSS Grid layouts, complete with a semantic footer.

### Story 2.1: 4-Pillar Core Services Grid with Contextual Triggers
As a prospective corporate or retail buyer,
I want to explore the 4 core service pillars and see detailed service deliverables,
So that I can identify the exact design or printing solution for my project.

**Acceptance Criteria:**
* **Given** the visitor scrolls to the `#services` section,
* **When** the section is viewed,
* **Then** it renders a responsive 2D grid containing the 4 service pillars:
  1. *Brand Identity & Graphic Design*
  2. *Marketing & Advertising Design*
  3. *Print & Publication Production*
  4. *Event & Environmental Branding (including Custom Branded Shirts)*
* **And** each service card contains an icon, pillar title, deliverable bullet list, and a contextual *"Inquire for [Service]"* CTA button with `data-service` attribute.
* **And** the layout is constructed using CSS Grid `repeat(auto-fit, minmax(280px, 1fr))` without hardcoded breakpoint hacks.
* **And** running `/bmad-frontend-tutor` explains CSS Grid formatting context, intrinsic vs extrinsic tracks (`minmax` / `fr`), and card flex distribution.

---

### Story 2.2: Verified Client Trust Matrix & Semantic Footer
As a business decision maker,
I want to see verified client logos and complete business contact information,
So that I can trust MJr's track record and easily contact the team.

**Acceptance Criteria:**
* **Given** the visitor scrolls past the services section,
* **When** viewing the `#about` / client trust section,
* **Then** it renders a clean responsive grid of verified client logos extracted from the portfolio (CYMA Homes, The Minaret Hospital, PPFN, Tour of Lagos Waterways, GoWeld, etc.).
* **And** logos feature a subtle grayscale-to-color hover transition.
* **And** the semantic `<footer>` renders company details:
  * Phone/WhatsApp: `+2348106246748`
  * Direct Email: `mjrgdesigns@gmail.com`
  * Quick navigation links, social channel icons, and copyright notice.
* **And** running `/bmad-frontend-tutor` explains CSS filter transitions, image aspect ratios, and semantic footer landmark accessibility.

---

## Epic 3: Interactive Filterable Portfolio & Accessible Case Study Lightbox

**Goal**: Implement the client-side JavaScript portfolio engine with dynamic category filtering, responsive case study cards, and an accessible lightbox modal.

### Story 3.1: JavaScript Portfolio Data Modeling & Card Grid Layout
As a user browsing the portfolio,
I want to see a rich showcase of real case studies with thumbnails, project titles, and deliverable tags,
So that I can inspect MJr's real-world craftsmanship across various industries.

**Acceptance Criteria:**
* **Given** the application script `app.js` is loaded,
* **When** the page initializes,
* **Then** it reads the immutable `PORTFOLIO_DATA` array containing case studies for CYMA Homes, Glazing Memoirs, OAB Foundation, Tour of Lagos Waterways, Custom Streetwear Apparel, and SkillForge Billboard.
* **And** each card is rendered in the `#portfolio` section containing a lazy-loaded thumbnail (`loading="lazy"`), category badge pill, project title, and scope tags.
* **And** each card contains an *"Inspect Case Study"* button with `data-action="open-modal"` and `data-project-id`.
* **And** running `/bmad-frontend-tutor` explains data structures in vanilla JS, DOM node generation vs template literals, and browser lazy-loading.

---

### Story 3.2: Zero-Framework Category Filter Tab Bar (Event Delegation)
As a visitor interested in a specific service (e.g. Custom Shirts or Publications),
I want to click category filter tabs and have the portfolio instantaneously filter without page reloads,
So that I can focus only on relevant case studies.

**Acceptance Criteria:**
* **Given** the visitor is in the Portfolio section,
* **When** clicking a filter tab (`All`, `Brand Identity`, `Publications`, `Marketing`, `Custom Apparel`),
* **Then** a single event delegation listener on `document.body` catches the event via `e.target.closest('[data-action="filter-category"]')`.
* **And** the active tab updates with `aria-selected="true"` and visual pill styling.
* **And** cards matching the selected category remain visible while non-matching cards smoothly fade out and hide using CSS classes.
* **And** selecting `All` restores visibility to all portfolio items.
* **And** running `/bmad-frontend-tutor` explains the DOM Event Bubbling phase, event delegation performance vs memory leaks, and CSS display vs opacity transitions.

---

### Story 3.3: Accessible Lightbox Modal with Keyboard Focus Management
As a visitor inspecting a case study,
I want to open a high-resolution lightbox modal with extended project details and keyboard navigation,
So that I can inspect the full mockup and seamlessly request a similar quote.

**Acceptance Criteria:**
* **Given** the visitor clicks any portfolio card's *"Inspect Case Study"* button,
* **When** the event is dispatched,
* **Then** the lightbox modal opens with `role="dialog"`, `aria-modal="true"`, and displays the high-res mockup, project overview, and scope tags.
* **And** background document body scrolling is locked (`overflow: hidden`).
* **And** pressing the `Escape` key or clicking the backdrop overlay closes the modal and restores body scroll.
* **And** keyboard focus is trapped inside the modal while open and returned to the trigger button upon closing.
* **And** running `/bmad-frontend-tutor` explains focus management, keyboard accessibility, and DOM cleanup.

---

## Epic 4: Context-Aware Dynamic WhatsApp Lead Engine & Quality Polish

**Goal**: Build the context-aware WhatsApp URL generation engine, conduct performance and accessibility audits, and finalize the production-ready site.

### Story 4.1: Centralized WhatsApp URL Generator & Context Engine
As a prospective client clicking any consultation button across the website,
I want WhatsApp to launch with a customized, pre-filled message relevant to what I was just viewing,
So that I don't have to type my inquiry from scratch.

**Acceptance Criteria:**
* **Given** any CTA button on the page (`data-action="whatsapp-inquire"`),
* **When** the user clicks the button from:
  * The Hero section \(\rightarrow\) Message is: *"Hello MJr Designs, I'd like to discuss a custom design and print project."*
  * A Service Card (e.g. Brand Identity) \(\rightarrow\) Message is: *"Hello MJr Designs, I am interested in your Brand Identity & Corporate Design packages."*
  * The Custom Apparel Card \(\rightarrow\) Message is: *"Hello MJr Designs, I am looking for custom shirt and apparel printing for my brand/organization."*
  * A Case Study Modal (e.g. CYMA Homes) \(\rightarrow\) Message is: *"Hello MJr Designs, I saw your CYMA Homes case study and would like to discuss a similar project."*
* **Then** the engine calls `generateWhatsAppUrl("+2348106246748", context)` and opens the sanitized, URL-encoded `wa.me` link in a new tab.
* **And** running `/bmad-frontend-tutor` explains URL encoding, web protocols, and centralized action routing.

---

### Story 4.2: Performance, Accessibility (A11y) & Cross-Browser Quality Audit
As a site owner and developer,
I want the website to achieve \(\ge 95\) Lighthouse scores, flawless responsive layouts, and zero console errors,
So that real clients enjoy a fast, accessible experience across all devices.

**Acceptance Criteria:**
* **Given** the complete single-page website,
* **When** tested across mobile (375px) and desktop (1440px) viewports in modern browsers,
* **Then** all touch targets meet minimum \(\ge 48\text{px}\) size guidelines.
* **And** text contrast ratios meet WCAG 2.1 AA (\(\ge 4.5:1\)).
* **And** Lighthouse audit scores achieve \(\ge 95\) in Performance, Accessibility, Best Practices, and SEO.
* **And** running `/bmad-frontend-tutor` provides a full sprint retrospective, complete concept quiz, and updates the `_bmad-output/learning-journal/journal.md`.

---

## Epic 5: Case Study Multi-Media Gallery & Continuous Modal Navigation

**Goal**: Transform case studies into rich multi-media showcases with touch-friendly swipeable image sliders and seamless, filter-aware modal navigation.

### Story 5.1: Case Study Multi-Image Data Modeling & Asset Extraction
As a prospective client inspecting a project,
I want to see multiple authentic photo proofs of finished work (packaging, stationery, shirts, billboards) for each case study,
So that I can verify MJr's full physical print craftsmanship.

**Acceptance Criteria:**
* **Given** the portfolio asset pipeline,
* **When** case study images are extracted from `mjr portfolio.pdf`,
* **Then** high-quality image assets are stored in `assets/images/portfolio/` for all flagship case studies (CYMA Homes, Glazing Memoirs, OAB Foundation, Tour of Lagos Waterways, Custom Streetwear Apparel, SkillForge Billboard).
* **And** `PORTFOLIO_DATA` in `app.js` is structured with an `images: [{ url, caption }]` array containing 2–4 proof photos per project.
* **And** running `/bmad-frontend-tutor` explains image optimization, responsive formats, and array data structures in first principles.

---

### Story 5.2: Zero-Framework Swipeable Image Slider with Pagination Dots
As a mobile or desktop visitor inside the case study modal,
I want to swipe or click through multiple proof photos with pagination dots and slide arrows,
So that I can smoothly inspect all physical artifacts without cluttering the screen.

**Acceptance Criteria:**
* **Given** a case study modal is open,
* **When** viewing the media section,
* **Then** it renders a swipeable slider with previous/next slide arrow buttons, clickable pagination dot indicators, and an artifact caption bar.
* **And** on mobile touch screens, horizontal swipe gestures (`touchstart`/`touchend`) smoothly change the active slide.
* **And** slide transitions execute using smooth CSS hardware-accelerated transforms (`transform: translateX(...)`).
* **And** running `/bmad-frontend-tutor` breaks down touch coordinate math, CSS transform performance vs left offsets, and `aria-live` accessibility.

---

### Story 5.3: Filter-Aware Continuous Case Study Navigation & Dynamic WhatsApp Sync
As a visitor browsing case studies in focused view,
I want to navigate to the Next and Previous case studies within my active category filter and have the WhatsApp CTA dynamically update,
So that I can browse relevant projects continuously without opening and closing the modal.

**Acceptance Criteria:**
* **Given** a case study modal is open under an active category filter (e.g., `Brand Identity` or `All Projects`),
* **When** clicking the `< Prev Case Study` or `Next Case Study >` buttons or pressing `ArrowLeft` / `ArrowRight` on the keyboard,
* **Then** the modal transitions smoothly to the adjacent case study strictly matching the active category filter.
* **And** the modal title, client name, image slider, and scope tags update instantaneously.
* **And** the modal's primary *"Inquire on WhatsApp"* CTA button dynamically updates its message payload to the newly focused project.
* **And** running `/bmad-frontend-tutor` explains state indexing over filtered arrays, keyboard event listeners, and dynamic DOM attribute updates.

---

## Epic 6: Proof-First Conversion Architecture & Mobile Layout Optimization

**Goal**: Maximize mobile lead conversion and minimize time-to-proof by elevating the interactive portfolio to the immediate top-of-funnel fold and streamlining service capability discovery.

### Story 6.1: Semantic Section Inversion & Hero Anchor Optimization
As a mobile visitor landing on the website,
I want the interactive portfolio and authentic work proofs to appear immediately below the hero fold,
So that I can evaluate physical craftsmanship within 1 scroll without digging through dense service descriptions.

**Acceptance Criteria:**
* **Given** the main document structure in `index.html`,
* **When** a user scrolls down past the `#hero` landmark,
* **Then** `#portfolio` renders as the immediate first content section (`Hero` $\rightarrow$ `Portfolio` $\rightarrow$ `Services` $\rightarrow$ `About` $\rightarrow$ `Contact`).
* **And** the primary hero CTA button links directly to `#portfolio` with smooth scrolling.
* **And** desktop and mobile header navigation links are ordered logically (`Portfolio`, `Services`, `About`, `Contact`).

---

### Story 6.2: Compact Mobile Service Capabilities Grid & Filter Cross-Linking
As a prospective client interested in specific production capabilities,
I want to view compact, high-density service cards that link directly to filtered portfolio proofs,
So that I can seamlessly transition between learning about a service and seeing its authentic deliverables.

**Acceptance Criteria:**
* **Given** the `#services` section positioned after the portfolio,
* **When** viewed on mobile and desktop devices,
* **Then** service cards render in an ergonomic, high-density grid with iconography, concise descriptions, and deliverable badges.
* **And** each service card features a *"View [Category] Proofs"* action (`data-action="jump-to-category"`) that activates the corresponding filter and smooth-scrolls to the `#portfolio` gallery.
* **And** WhatsApp inquiry buttons on service cards remain directly accessible with context-aware payloads.

---

### Story 6.3: Zero-Scroll Featured Proof Peek Strip in Hero
As a prospective client evaluating MJr from the top fold,
I want to see interactive proof pill badges for flagship client projects inside the hero,
So that I can tap and inspect full case study mockups instantly without any scrolling.

**Acceptance Criteria:**
* **Given** the `#hero` section landmark,
* **When** the page loads,
* **Then** a *"Featured Case Studies"* proof strip renders directly below the hero CTA buttons with badges for flagship clients (CYMA Homes, TOLW Magazine, Glazing Memoirs, Custom Apparel).
* **And** clicking any proof badge immediately opens the lightbox modal (`openModal(projectId)`) for that project.
* **And** all buttons are fully accessible with `:focus-visible` styling and minimum $\ge 44\text{px}$ touch targets.

---

## Epic 7: Interactive Print Estimator & WhatsApp Quote Engine

### Story 7.1: Pricing Engine Data Model & Calculation Rules
As a commercial buyer visiting the website,  
I want transparent, mathematically sound print pricing calculations with volume discounts,  
So that I can understand realistic project costs and budget accurately before contacting sales.

### Story 7.2: Semantic Calculator Layout & CSS Styling
As a mobile or desktop visitor,  
I want an intuitive, responsive, and accessible calculator interface with sliders, tabs, and live receipts,  
So that I can effortlessly configure print specifications and see immediate pricing feedback.

### Story 7.3: Reactive Calculator Event Engine & WhatsApp Quote Sync
As a ready-to-buy customer,  
I want my configured specifications and calculated total exported directly into a 1-click WhatsApp message,  
So that I can initiate an official quote verification with MJr's sales team in seconds without retyping details.

---

## Epic 8: Standalone Admin Pricing Center & Visual Code Configurator

### Story 8.1: Standalone Admin Dashboard Layout & CSS Architecture
As an MJr business administrator,  
I want a dedicated, responsive standalone dashboard (`admin.html` & `admin.css`) with product tabs, parameter form fields, and sticky live preview,  
So that I can visually manage print costs and profit margins without modifying raw code.

### Story 8.2: Dynamic Admin Engine, Form Binding & Live Simulation Sandbox
As an operations manager tuning print prices,  
I want an interactive simulation sandbox (`admin.js`) that recalculates live customer quotes in real time as I edit base prices, add-on deltas, and discount brackets,  
So that I can verify calculations and ensure healthy margins before publishing changes.

### Story 8.3: ES6 Code Generator, LocalStorage Sync & JSON Export/Import
As a developer or site administrator,  
I want 1-click ES6 JavaScript code generation, `localStorage` live browser overrides, and JSON export/import capabilities,  
So that I can immediately test new pricing on the live website or copy updated configuration code directly into `app.js`.

### Story 8.4: PIN-Protected Access Control & Session Management
As a site owner protecting business operations,  
I want a secure PIN authentication gate using Web Crypto SHA-256 verification and session persistence,  
So that unauthorized visitors cannot alter production pricing configurations.

