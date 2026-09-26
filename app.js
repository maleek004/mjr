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
  if (typeof document !== 'undefined') {
    document.addEventListener('click', (event) => {
      const actionEl = event.target.closest('[data-action]');
      if (!actionEl) return;

      const action = actionEl.dataset.action;

      switch (action) {
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
  }

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
   * Global Keyboard Event Handling (Escape Dismissal, Focus Trap & Tablist Navigation)
   */
  if (typeof document !== 'undefined') {
    document.addEventListener('keydown', (event) => {
      // 1. Tablist Arrow Navigation for Portfolio Filters
      const activeTab = document.activeElement;
      if (activeTab && activeTab.matches && activeTab.matches('.portfolio-filter-bar [role="tab"]')) {
        const tabs = Array.from(document.querySelectorAll('.portfolio-filter-bar [role="tab"]'));
        const currentIndex = tabs.indexOf(activeTab);

        if (currentIndex !== -1) {
          let nextIndex = -1;

          if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
            event.preventDefault();
            nextIndex = (currentIndex + 1) % tabs.length;
          } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
            event.preventDefault();
            nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
          } else if (event.key === 'Home') {
            event.preventDefault();
            nextIndex = 0;
          } else if (event.key === 'End') {
            event.preventDefault();
            nextIndex = tabs.length - 1;
          }

          if (nextIndex !== -1) {
            const nextTab = tabs[nextIndex];
            nextTab.focus();
            const nextCategory = nextTab.dataset.category || 'all';
            filterPortfolio(nextCategory);
            return;
          }
        }
      }

      // 2. Mobile Drawer Escape & Focus Trap
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
  }

  /**
   * Viewport Resize Listener - Auto-close mobile drawer on desktop transition
   */
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768 && state.isMobileNavOpen) {
        closeMobileNav();
      }
    });
  }

  /**
   * Immutable Portfolio Data Model
   * Single source of truth for all portfolio items, filtering, and modal dialogs.
   */
  const PORTFOLIO_DATA = Object.freeze([
    {
      id: "cyma-homes",
      title: "CYMA HOMES Limited",
      client: "CYMA HOMES Limited",
      category: "branding",
      categoryLabel: "Brand Identity & Corporate Design",
      thumbnail: "assets/images/portfolio/cyma-preview.jpg",
      fullImage: "assets/images/portfolio/cyma-full.jpg",
      scope: Object.freeze(["Logo System", "Brand Identity", "Hard Hats & Safety Vests", "Corporate Stationery", "Vehicle Fleet Graphics"]),
      description: "Complete corporate identity system and industrial safety gear branding for a high-profile real estate development firm in Lagos.",
      accentColor: "#FF6B00",
      whatsappContext: "CYMA Homes Corporate Branding"
    },
    {
      id: "streetwear-merch",
      title: "Custom Branded Shirts & Streetwear",
      client: "Streetwear & Corporate Apparel Clients",
      category: "apparel",
      categoryLabel: "Custom Apparel & Merch",
      thumbnail: "assets/images/portfolio/apparel-preview.jpg",
      fullImage: "assets/images/portfolio/apparel-full.jpg",
      scope: Object.freeze(["Heavyweight Cotton Tees", "Embroidery & Screenprint", "Trucker Caps", "Tote Bags", "Woven Neck Labels"]),
      description: "High-volume custom t-shirt and lifestyle apparel production featuring precision screen printing, heat press, and bespoke brand packaging.",
      accentColor: "#1A1A1A",
      whatsappContext: "Custom Shirt & Apparel Printing"
    },
    {
      id: "glazing-memoirs",
      title: "Glazing Memoirs FMCG",
      client: "Glazing Memoirs Food & Beverage",
      category: "branding",
      categoryLabel: "Packaging & Brand Identity",
      thumbnail: "assets/images/portfolio/glazing-preview.jpg",
      fullImage: "assets/images/portfolio/glazing-full.jpg",
      scope: Object.freeze(["Logo Refresh", "Yoghurt Bottle Labels", "Food Packaging", "Takeaway Bags", "Marketing Flyers"]),
      description: "Vibrant brand identity, custom product bottle labels, and food packaging suites engineered for fast-moving retail consumer appeal.",
      accentColor: "#E05A00",
      whatsappContext: "Glazing Memoirs Product Packaging"
    },
    {
      id: "tolw-brochure",
      title: "Tour of Lagos Waterways (TOLW)",
      client: "Tour of Lagos Waterways Initiative",
      category: "publications",
      categoryLabel: "Publications & Editorial",
      thumbnail: "assets/images/portfolio/tolw-preview.jpg",
      fullImage: "assets/images/portfolio/tolw-full.jpg",
      scope: Object.freeze(["5th Edition Magazine", "Editorial Layout", "Event Program Compendium", "VIP Badges", "Outdoor Signage"]),
      description: "High-volume editorial magazine and event publication production with luxury spot UV finishing, perfect binding, and color fidelity.",
      accentColor: "#006699",
      whatsappContext: "Tour of Lagos Waterways Publications"
    },
    {
      id: "skillforge-billboard",
      title: "SkillForge ICT Academy",
      client: "SkillForge Tech Institute",
      category: "marketing",
      categoryLabel: "Marketing & Billboards",
      thumbnail: "assets/images/portfolio/skillforge-preview.jpg",
      fullImage: "assets/images/portfolio/skillforge-full.jpg",
      scope: Object.freeze(["Highway Billboard Creative", "Digital Campaign Ads", "Roll-Up Banners", "Course Catalogs"]),
      description: "High-visibility outdoor billboard campaigns and multi-channel marketing collateral designed to maximize student enrollment conversions.",
      accentColor: "#2E5BFF",
      whatsappContext: "SkillForge Large Format Billboard"
    },
    {
      id: "oab-foundation",
      title: "OAB Foundation Civic Outreach",
      client: "OAB Philanthropic Foundation",
      category: "branding",
      categoryLabel: "Civic & Editorial Branding",
      thumbnail: "assets/images/portfolio/oab-preview.jpg",
      fullImage: "assets/images/portfolio/oab-full.jpg",
      scope: Object.freeze(["Brand Identity Guidelines", "Annual Report Compendium", "Custom Event Shirts", "Souvenir Gift Sets"]),
      description: "Comprehensive institutional branding, annual report editorial printing, and custom-branded souvenirs for high-impact civic empowerment programs.",
      accentColor: "#00875A",
      whatsappContext: "OAB Foundation Civic Branding"
    }
  ].map(Object.freeze));

  /**
   * Utility helper to safely escape string content before HTML injection
   * @param {string} str 
   * @returns {string}
   */
  function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * Generate HTML string for an individual portfolio card
   * @param {Object} project - Portfolio project data object
   * @returns {string} HTML markup string
   */
  function createPortfolioCardMarkup(project) {
    if (!project || typeof project !== 'object') return '';

    const title = typeof project.title === 'string' ? project.title : '';
    const id = typeof project.id === 'string' ? project.id : '';
    const category = typeof project.category === 'string' ? project.category : '';
    const categoryLabel = typeof project.categoryLabel === 'string' ? project.categoryLabel : '';
    const description = typeof project.description === 'string' ? project.description : '';
    const accentColor = typeof project.accentColor === 'string' ? project.accentColor : '#FF6B00';
    const whatsappContext = typeof project.whatsappContext === 'string' ? project.whatsappContext : '';

    const scopeTagsMarkup = (Array.isArray(project.scope) ? project.scope : [])
      .map(tag => `<li class="portfolio-tag">#${escapeHtml(String(tag))}</li>`)
      .join('');

    const monogram = escapeHtml(title.substring(0, 2).toUpperCase());
    const waUrl = `https://wa.me/2348106246748?text=${encodeURIComponent('Hello MJr Designs, I saw your ' + title + ' case study and would like to discuss a similar project.')}`;

    return `
      <article class="portfolio-card" data-project-id="${escapeHtml(id)}" data-category="${escapeHtml(category)}">
        <div class="portfolio-media-wrap">
          <div class="portfolio-media-placeholder" style="--card-accent: ${escapeHtml(accentColor)};">
            <div class="media-badge-icon" aria-hidden="true">
              <span class="media-monogram">${monogram}</span>
            </div>
            <span class="media-watermark">MJr Case Study</span>
          </div>
          <span class="portfolio-category-badge">${escapeHtml(categoryLabel)}</span>
        </div>

        <div class="portfolio-card-body">
          <h3 class="portfolio-card-title">${escapeHtml(title)}</h3>
          <p class="portfolio-card-desc">${escapeHtml(description)}</p>
          <ul class="portfolio-tag-list" role="list" aria-label="Project Scope">
            ${scopeTagsMarkup}
          </ul>
        </div>

        <div class="portfolio-card-footer">
          <button type="button" 
                  class="btn btn-primary btn-sm btn-block" 
                  data-action="open-modal" 
                  data-project-id="${escapeHtml(id)}"
                  aria-label="Inspect ${escapeHtml(title)} Case Study">
            Inspect Case Study
          </button>
          <a href="${waUrl}"
             class="btn btn-outline btn-sm btn-block"
             target="_blank"
             rel="noopener noreferrer"
             data-action="whatsapp-inquire"
             data-context="${escapeHtml(whatsappContext)}"
             aria-label="Inquire on WhatsApp about ${escapeHtml(title)}">
            Inquire Similar
          </a>
        </div>
      </article>
    `;
  }

  /**
   * Render portfolio cards into the grid container
   * @param {Array} items 
   */
  function renderPortfolioCards(items) {
    const grid = document.getElementById('portfolio-grid');
    if (!grid) return;
    if (!Array.isArray(items)) {
      grid.innerHTML = '<p class="portfolio-empty-note">No case studies available.</p>';
      return;
    }
    grid.innerHTML = items.map(createPortfolioCardMarkup).join('');
  }

  const VALID_PORTFOLIO_CATEGORIES = Object.freeze(new Set(['all', 'branding', 'publications', 'marketing', 'apparel']));

  /**
   * Filter Portfolio Cards by Category
   * Updates state, synchronizes ARIA tab states, and toggles card visibility classes.
   * 
   * @param {string} targetCategory - Category slug ('all', 'branding', 'publications', 'marketing', 'apparel')
   */
  function filterPortfolio(targetCategory) {
    const rawCategory = (typeof targetCategory === 'string' && targetCategory.trim()) 
      ? targetCategory.trim().toLowerCase() 
      : 'all';

    // Validate against allowed categories, fallback gracefully to 'all'
    const category = VALID_PORTFOLIO_CATEGORIES.has(rawCategory) ? rawCategory : 'all';

    // 1. Update State
    state.activeCategory = category;

    // 2. Synchronize Filter Tab Buttons UI & ARIA Attributes (Roving Tabindex)
    if (typeof document !== 'undefined') {
      const filterButtons = document.querySelectorAll('[data-action="filter-category"]');
      filterButtons.forEach((btn) => {
        const btnCategory = (btn.dataset.category || 'all').trim().toLowerCase();
        const isActive = btnCategory === category;
        
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
        btn.setAttribute('tabindex', isActive ? '0' : '-1');
      });

      // 3. Filter Portfolio Cards in DOM with Defensive Normalization
      const cards = document.querySelectorAll('.portfolio-card');
      cards.forEach((card) => {
        const cardCategory = (card.dataset.category || '').trim().toLowerCase();
        const shouldShow = (category === 'all' || cardCategory === category);

        if (shouldShow) {
          card.classList.remove('is-hidden');
          card.removeAttribute('aria-hidden');
          const focusables = card.querySelectorAll('button, a');
          if (focusables) {
            focusables.forEach(el => el.removeAttribute('tabindex'));
          }
        } else {
          card.classList.add('is-hidden');
          card.setAttribute('aria-hidden', 'true');
          const focusables = card.querySelectorAll('button, a');
          if (focusables) {
            focusables.forEach(el => el.setAttribute('tabindex', '-1'));
          }
        }
      });
    }
  }

  /**
   * Initialize Application on DOM Ready
   */
  if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
      renderPortfolioCards(PORTFOLIO_DATA);
    });
  }

  // Expose for browser runtime & Node testing environments
  if (typeof window !== 'undefined') {
    window.PORTFOLIO_DATA = PORTFOLIO_DATA;
    window.renderPortfolioCards = renderPortfolioCards;
    window.escapeHtml = escapeHtml;
    window.createPortfolioCardMarkup = createPortfolioCardMarkup;
    window.filterPortfolio = filterPortfolio;
    window.state = state;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      PORTFOLIO_DATA,
      renderPortfolioCards,
      escapeHtml,
      createPortfolioCardMarkup,
      filterPortfolio,
      state
    };
  }
})();
