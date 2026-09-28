# Story 8.5: Global Cloud Pricing Synchronization via Vercel Serverless API

## Status: Complete
## Epic: Epic 8 — Standalone Admin Pricing Center & Visual Code Configurator

---

## 1. Description
Implement real-time global pricing synchronization across all visitors and administrative devices worldwide using a dedicated Vercel Serverless API route (`/api/pricing`) backed by Vercel KV (Redis) with zero-downtime client-side fallback. When an administrator adjusts pricing parameters in `admin.html` and clicks *"Publish Global"*, the updated pricing model propagates globally across the web.

---

## 2. Acceptance Criteria

### AC-1: Vercel Serverless Endpoint (`api/pricing.js`)
- `GET /api/pricing`: Returns the active global pricing model (cached at the edge with `s-maxage=30, stale-while-revalidate=120`), reading from Vercel KV or falling back cleanly to in-memory/factory baseline defaults.
- `POST /api/pricing`: Validates the caller's Administrative PIN (`x-admin-pin` header or payload `pin`), verifies data integrity across all 4 products, persists to Vercel KV, and updates the global cache.

### AC-2: Zero-Downtime Public Visitor Synchronization (`app.js`)
- `index.html` loads and renders immediately using local/baseline pricing with zero layout shift or network delay.
- `initCalculator()` asynchronously queries `GET /api/pricing` via `fetchGlobalPricing()` and updates the live estimator calculations seamlessly if updated rates exist.

### AC-3: Admin Publishing & Multi-Admin Collaboration (`admin.html` & `admin.js`)
- Admin header features a prominent *"Publish Global"* button (`#btn-publish-global`, `data-action="publish-global-pricing"`).
- `admin.html` automatically queries `GET /api/pricing` on load via `fetchGlobalAdminPricing()` so distributed team members always start with the latest published rates.

### AC-4: Automated Verification Suite
- Comprehensive automated test suite (`_bmad-output/test-artifacts/story-8.5.test.mjs`) verifying HTTP status codes (200, 401, 403, 422), authorization gates, and data schema persistence.
