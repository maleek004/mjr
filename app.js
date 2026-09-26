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
   * Open Mobile Navigation Drawer
   */
  function openMobileNav() {
    const navToggle = document.querySelector('[data-action="toggle-mobile-nav"]');
    const mobileDrawer = document.getElementById('mobile-nav');
    if (!navToggle || !mobileDrawer) return;

    state.isMobileNavOpen = true;
    navToggle.setAttribute('aria-expanded', 'true');
    mobileDrawer.removeAttribute('hidden');
    document.body.classList.add('menu-locked');

    // Move initial focus into drawer for accessibility
    const firstFocusable = mobileDrawer.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (firstFocusable) {
      firstFocusable.focus();
    }
  }

  /**
   * Close Mobile Navigation Drawer & Restore Focus
   */
  function closeMobileNav() {
    if (!state.isMobileNavOpen) return;
    const navToggle = document.querySelector('[data-action="toggle-mobile-nav"]');
    const mobileDrawer = document.getElementById('mobile-nav');
    if (!navToggle || !mobileDrawer) return;

    state.isMobileNavOpen = false;
    navToggle.setAttribute('aria-expanded', 'false');
    mobileDrawer.setAttribute('hidden', '');
    document.body.classList.remove('menu-locked');

    // Return focus to toggle button
    navToggle.focus();
  }

  /**
   * Toggle Mobile Navigation Drawer
   */
  function toggleMobileNav() {
    if (state.isMobileNavOpen) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  }

  /**
   * Global Keyboard Event Handling (Escape Dismissal & Focus Trap)
   */
  document.addEventListener('keydown', (event) => {
    if (!state.isMobileNavOpen) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      closeMobileNav();
      return;
    }

    if (event.key === 'Tab') {
      const mobileDrawer = document.getElementById('mobile-nav');
      if (!mobileDrawer) return;

      const focusables = Array.from(
        mobileDrawer.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
      ).filter(el => !el.hasAttribute('disabled') && el.offsetParent !== null);

      if (focusables.length === 0) return;

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
  });

  /**
   * Viewport Resize Listener - Auto-close mobile drawer on desktop transition
   */
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && state.isMobileNavOpen) {
      closeMobileNav();
    }
  });

  /**
   * Initialize Application on DOM Ready
   */
  document.addEventListener('DOMContentLoaded', () => {
    // Initialized
  });
})();
