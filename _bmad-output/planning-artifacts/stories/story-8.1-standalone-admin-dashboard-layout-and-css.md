# Story 8.1: Standalone Admin Dashboard Layout & CSS Architecture

## Status: Planned
## Epic: Epic 8 — Standalone Admin Pricing Center & Visual Code Configurator

---

## 1. Description
Create a standalone, accessible, and responsive administrative dashboard interface in `admin.html` with dedicated styles in `admin.css`. The interface features a header with brand navigation back to the main site, a sidebar/tabbed product switcher, an interactive form layout for base economics and option deltas, and a sticky live simulator receipt.

---

## 2. Acceptance Criteria

### AC-1: Semantic HTML5 Document Structure (`admin.html`)
- Standalone HTML5 document with `<!DOCTYPE html>`, `<html lang="en">`, responsive `<meta name="viewport">`, and clean semantic landmarks (`<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`).
- Header bar containing:
  - MJr Admin branding badge (*"MJr Pricing & Margin Control Center"*).
  - Navigation action: *"← Back to Live Website"* linking to `index.html`.
  - Quick action toolbar: *"Copy ES6 Code"*, *"Export JSON"*, *"Import JSON"*, *"Reset Defaults"*.

### AC-2: 2-Column Responsive Dashboard Layout
- **Left / Center Column (Configurator Canvas)**:
  - Product selection tabs/cards for all 4 print products.
  - Section 1: Base Economics & Volume Limits (Base Unit Price, Min/Max/Step/Default Quantity).
  - Section 2: Specification Options & Price Delta Editor (Dynamic table/list of option groups and price adjustments).
  - Section 3: Tiered Volume Discount Matrix (Threshold quantities and discount percentage fields).
  - Section 4: Global Multipliers (Express rush surcharge %).
- **Right Column (Sticky Live Simulation Sandbox)**:
  - Interactive test calculator allowing the admin to test live calculations with custom sliders and dropdowns based on the uncommitted or active edits.
  - Line-by-line price breakdown and profit/margin preview.

### AC-3: Modern Dashboard CSS Architecture (`admin.css`)
- Leverages shared design tokens (`--color-primary`, `--color-charcoal`, `--color-surface`, `--radius-lg`, `--shadow-md`).
- Responsive across desktop, tablet, and mobile viewports.
- High-contrast inputs, clean numerical badges, toggle switches, and accessible `:focus-visible` outlines.
