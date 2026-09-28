# Story 8.4: PIN-Protected Access Control & Session Management

## Status: Complete
## Epic: Epic 8 — Standalone Admin Pricing Center & Visual Code Configurator

---

## 1. Description
Implement a secure, client-side PIN authentication gate on `admin.html` using the Web Crypto API (`crypto.subtle.digest('SHA-256')`). The system hides the workspace until authenticated, persists the session in `sessionStorage`, provides a "Lock / Logout" action in the header, and allows administrators to change their access PIN.

---

## 2. Acceptance Criteria

### AC-1: Accessible PIN Gate Overlay (`admin.html`)
- An authentication overlay `<div id="admin-auth-overlay" class="admin-auth-overlay">` renders on top of the workspace if unauthenticated.
- Includes PIN input field (`type="password"`, `inputmode="numeric"`, `maxlength="12"`), submit button, error alert container with `aria-live="assertive"`, and link back to `index.html`.

### AC-2: Web Crypto SHA-256 Hash Verification (`admin.js`)
- Function `hashPin(pin)` converts the input string to SHA-256 hex digest using `window.crypto.subtle.digest('SHA-256', ...)`.
- Validates against default hash or custom hash stored in `localStorage.getItem('mjr_admin_pin_hash')`.
- Default factory PIN: `"246748"` (derived from official WhatsApp digits `...246748`).

### AC-3: Ephemeral Session Management & Logout
- Successful authentication stores session flag in `sessionStorage.setItem('mjr_admin_session', 'authenticated')` and removes the overlay.
- Header includes a *"Lock / Logout"* button (`data-action="admin-logout"`) that clears `sessionStorage` and immediately re-engages the PIN gate.

### AC-4: Change Access PIN Capability
- Modal dialog allowing authenticated admins to set a new PIN with current PIN confirmation.
- Updates `localStorage.setItem('mjr_admin_pin_hash', newHash)`.
