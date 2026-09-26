/**
 * MJr Designs & Print Solutions Limited
 * Core Application Engine (app.js)
 * 
 * Vanilla ES6+ architecture adhering to zero-framework invariants,
 * centralized event delegation, and unidirectional state flow.
 */

(function () {
  'use strict';

  // Application State
  const state = {
    activeCategory: 'all',
    activeModalId: null,
    isMobileNavOpen: false
  };

  /**
   * Root Event Delegation Handler
   */
  document.addEventListener('click', (event) => {
    const actionEl = event.target.closest('[data-action]');
    if (!actionEl) return;

    const action = actionEl.dataset.action;

    switch (action) {
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

  /**
   * Mobile Navigation Toggle
   */
  function toggleMobileNav() {
    const navToggle = document.querySelector('[data-action="toggle-mobile-nav"]');
    const mobileDrawer = document.getElementById('mobile-nav');
    if (!navToggle || !mobileDrawer) return;

    state.isMobileNavOpen = !state.isMobileNavOpen;
    navToggle.setAttribute('aria-expanded', String(state.isMobileNavOpen));
    
    if (state.isMobileNavOpen) {
      mobileDrawer.removeAttribute('hidden');
    } else {
      mobileDrawer.setAttribute('hidden', '');
    }
  }

  function closeMobileNav() {
    if (!state.isMobileNavOpen) return;
    const navToggle = document.querySelector('[data-action="toggle-mobile-nav"]');
    const mobileDrawer = document.getElementById('mobile-nav');
    if (!navToggle || !mobileDrawer) return;

    state.isMobileNavOpen = false;
    navToggle.setAttribute('aria-expanded', 'false');
    mobileDrawer.setAttribute('hidden', '');
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    // Initialized
  });
})();
