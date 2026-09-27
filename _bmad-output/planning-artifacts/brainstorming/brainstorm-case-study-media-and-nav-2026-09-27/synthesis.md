# Brainstorming Synthesis: Case Study Multi-Media Proof & Filter-Aware Modal Navigation

## 1. Executive Summary

This synthesis document formalizes the agreed architectural and UX specifications for **Epic 5**: expanding **MJr Designs & Print Solutions**' portfolio into a rich multi-media showcase with touch-friendly swipeable sliders and seamless, filter-aware modal navigation.

---

## 2. Core Feature Architecture

### Feature 1: Multi-Media Proof Assets (Extracted from `mjr portfolio.pdf`)
* **Data Schema Upgrade**: Each case study in `PORTFOLIO_DATA` expands from a single image to a rich `images: [...]` gallery array:
  ```javascript
  {
    id: "cyma-homes",
    title: "CYMA HOMES Limited",
    client: "CYMA HOMES Limited",
    category: "branding",
    categoryLabel: "Brand Identity & Corporate Design",
    images: [
      { url: "assets/images/portfolio/cyma-hardhat.jpg", caption: "Branded Safety Gear & Hard Hats" },
      { url: "assets/images/portfolio/cyma-stationery.jpg", caption: "Corporate Stationery & Receipt Booklets" },
      { url: "assets/images/portfolio/cyma-vehicle.jpg", caption: "Commercial Vehicle Branding & Apparel" }
    ],
    scope: ["Logo Design", "Brand Assets", "Stationery", "Hard Hats", "Vehicle Branding"],
    description: "Full-scale corporate identity and safety gear branding for a premier real estate firm.",
    whatsappContext: "CYMA Homes Corporate Branding"
  }
  ```

### Feature 2: Zero-Framework Touch-Friendly Swipeable Slider
* **Visual Components**:
  * **Main Visual Stage**: Smooth CSS `transform: translateX(-100% * index)` transition.
  * **Slide Controls**: On-screen `<` (Prev Slide) and `>` (Next Slide) floating arrows.
  * **Pagination Dots**: Interactive dot indicators showing active slide index.
  * **Image Caption Bar**: Dynamic label describing the specific proof artifact.
* **Touch & Pointer Support**: Native vanilla `touchstart` and `touchend` delta tracking for smooth horizontal swipe gestures on mobile devices.

### Feature 3: Filter-Aware Continuous Case Study Navigation
* **Modal Navigation Controls**:
  * Prominent `< Prev Case Study` and `Next Case Study >` action buttons.
  * Keyboard navigation (`ArrowLeft` for previous project, `ArrowRight` for next project).
* **Filter Context Awareness**: Next/Previous strictly queries the active subset:
  ```javascript
  const visibleProjects = currentCategory === 'all' 
    ? PORTFOLIO_DATA 
    : PORTFOLIO_DATA.filter(p => p.category === currentCategory);
  ```
* **Instant Dynamic Sync**: Switching case studies instantly updates:
  1. Modal title & client name.
  2. Multi-image slider (resets to first slide).
  3. Scope tag list.
  4. Context-aware WhatsApp button URL (`data-context` & dynamic message).

---

## 3. Epic 5 Breakdown & Story Inventory

### Epic 5: Case Study Multi-Media Gallery & Continuous Modal Navigation
* **Story 5.1**: Case Study Multi-Image Data Modeling & Asset Extraction from PDF
* **Story 5.2**: Zero-Framework Swipeable Image Slider with Pagination Dots & Touch Gestures
* **Story 5.3**: Filter-Aware Continuous Case Study Navigation & Dynamic WhatsApp Sync
