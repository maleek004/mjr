# Story 8.2: Dynamic Admin Engine, Form Binding & Live Simulation Sandbox

## Status: Planned
## Epic: Epic 8 — Standalone Admin Pricing Center & Visual Code Configurator

---

## 1. Description
Implement the core administrative reactive state engine in `admin.js`. The engine initializes with the active `PRICING_MODEL`, populates form fields upon product switching, binds form modifications (`input`/`change`) to working draft state, and dynamically drives the live simulation sandbox on the right column.

---

## 2. Acceptance Criteria

### AC-1: Dynamic Admin Form Population
- Function `loadProductIntoForm(productId)` reads the product configuration and renders:
  - Base unit price, min/max quantity, step, default quantity inputs.
  - Option groups and choices with customizable labels and price deltas ($\pm ₦$).
  - Volume discount threshold table with rate percentage inputs.

### AC-2: Bidirectional Reactive State Synchronization
- Centralized event delegation listening for input changes:
  - Updating a price delta or base price immediately mutates working draft state in memory.
  - Changes immediately update the **Live Simulation Sandbox** without requiring a page refresh.

### AC-3: Live Simulation Sandbox Engine
- Admin can adjust sample order quantity and toggle options in the sandbox.
- Shows live updated calculations:
  - Base Unit Price + Option Deltas
  - Subtotal
  - Volume Discount Savings in ₦ and %
  - Rush Surcharge
  - Final Customer Price in ₦
