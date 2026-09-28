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
    activeSlideIndex: 0,
    isMobileNavOpen: false
  };

  // Dynamic Pricing Model Registry (Deeply Immutable)
  const PRICING_MODEL = Object.freeze({
    'business-cards': Object.freeze({
      id: 'business-cards',
      title: 'Premium Business Cards',
      category: 'Branding & Stationery',
      unitBasePrice: 85,
      minQty: 100,
      maxQty: 5000,
      stepQty: 50,
      defaultQty: 250,
      qtyPresets: [100, 250, 500, 1000, 2500],
      discounts: [
        { minQty: 1000, rate: 0.20 },
        { minQty: 500, rate: 0.15 },
        { minQty: 250, rate: 0.10 },
        { minQty: 100, rate: 0.00 }
      ],
      options: [
        {
          id: 'sides',
          label: 'Print Sides',
          type: 'radio',
          choices: [
            { value: 'single', label: 'Single-Sided', priceDelta: 0, desc: 'Front full color only' },
            { value: 'double', label: 'Double-Sided', priceDelta: 25, desc: 'Front & back full color (+₦25/unit)' }
          ],
          default: 'double'
        },
        {
          id: 'finish',
          label: 'Surface Finish',
          type: 'radio',
          choices: [
            { value: 'matte', label: 'Matte Lamination', priceDelta: 15, desc: 'Silky smooth anti-glare' },
            { value: 'gloss', label: 'Gloss Lamination', priceDelta: 10, desc: 'High-shine reflective sheen' },
            { value: 'spot-uv', label: 'Matte + Raised Spot UV', priceDelta: 45, desc: 'Tactile gloss accent (+₦45/unit)' }
          ],
          default: 'matte'
        }
      ]
    }),
    'brochures': Object.freeze({
      id: 'brochures',
      title: 'Corporate Brochures & Catalogues',
      category: 'Editorial & Publications',
      unitBasePrice: 420,
      minQty: 50,
      maxQty: 5000,
      stepQty: 50,
      defaultQty: 250,
      qtyPresets: [50, 100, 250, 500, 1000],
      discounts: [
        { minQty: 1000, rate: 0.25 },
        { minQty: 500, rate: 0.18 },
        { minQty: 250, rate: 0.12 },
        { minQty: 100, rate: 0.05 },
        { minQty: 50, rate: 0.00 }
      ],
      options: [
        {
          id: 'pages',
          label: 'Page Extent (A4/A5)',
          type: 'radio',
          choices: [
            { value: '8pp', label: '8-Page Compendium', priceDelta: 0, desc: 'Saddle-stitched booklet' },
            { value: '16pp', label: '16-Page Booklet', priceDelta: 280, desc: 'Standard company profile' },
            { value: '24pp', label: '24-Page Catalogue', priceDelta: 520, desc: 'Comprehensive annual report' }
          ],
          default: '16pp'
        },
        {
          id: 'lamination',
          label: 'Cover Finish',
          type: 'radio',
          choices: [
            { value: 'matte', label: 'Matte Lamination', priceDelta: 50, desc: 'Executive matte coating' },
            { value: 'gloss', label: 'Gloss Lamination', priceDelta: 40, desc: 'Vibrant glossy sheen' },
            { value: 'foil', label: 'Gold / Silver Foil Accent', priceDelta: 120, desc: 'Metallic luxury foil stamping' }
          ],
          default: 'matte'
        }
      ]
    }),
    't-shirts': Object.freeze({
      id: 't-shirts',
      title: 'Custom Branded Shirts & Merch',
      category: 'Apparel & Uniforms',
      unitBasePrice: 4500,
      minQty: 20,
      maxQty: 1000,
      stepQty: 10,
      defaultQty: 50,
      qtyPresets: [20, 50, 100, 200, 500],
      discounts: [
        { minQty: 500, rate: 0.20 },
        { minQty: 200, rate: 0.15 },
        { minQty: 100, rate: 0.10 },
        { minQty: 50, rate: 0.05 },
        { minQty: 20, rate: 0.00 }
      ],
      options: [
        {
          id: 'printLocation',
          label: 'Print Placements',
          type: 'radio',
          choices: [
            { value: 'chest', label: 'Front Chest Only', priceDelta: 0, desc: 'High-res DTF / Screenprint' },
            { value: 'front-back', label: 'Front + Back Print', priceDelta: 950, desc: 'Dual-side branding' },
            { value: 'full-custom', label: 'Front, Back + Sleeve', priceDelta: 1600, desc: 'Complete 3-point corporate branding' }
          ],
          default: 'front-back'
        },
        {
          id: 'fabric',
          label: 'Fabric Weight',
          type: 'radio',
          choices: [
            { value: 'standard', label: '180gsm Combed Cotton', priceDelta: 0, desc: 'Lightweight & breathable' },
            { value: 'heavyweight', label: '220gsm Heavyweight Cotton', priceDelta: 750, desc: 'Luxury streetwear density' }
          ],
          default: 'heavyweight'
        }
      ]
    }),
    'banners': Object.freeze({
      id: 'banners',
      title: 'Roll-Up Display Banners & Signage',
      category: 'Large Format & Events',
      unitBasePrice: 24500,
      minQty: 1,
      maxQty: 50,
      stepQty: 1,
      defaultQty: 2,
      qtyPresets: [1, 2, 4, 8, 15],
      discounts: [
        { minQty: 20, rate: 0.18 },
        { minQty: 10, rate: 0.12 },
        { minQty: 4, rate: 0.08 },
        { minQty: 1, rate: 0.00 }
      ],
      options: [
        {
          id: 'baseType',
          label: 'Roll-up Stand Base',
          type: 'radio',
          choices: [
            { value: 'standard', label: 'Standard Aluminium Base', priceDelta: 0, desc: 'Lightweight dual-foot stand' },
            { value: 'luxury', label: 'Luxury Broad Base Stand', priceDelta: 6500, desc: 'Chrome teardrop base + padded bag' }
          ],
          default: 'luxury'
        },
        {
          id: 'material',
          label: 'Banner Substrate',
          type: 'radio',
          choices: [
            { value: 'matte-vinyl', label: 'Matte Anti-Glare Solvo', priceDelta: 0, desc: 'Zero reflection under hall lighting' },
            { value: 'pvc-canvas', label: 'Heavy Duty PVC Canvas', priceDelta: 3500, desc: 'Textured outdoor tear-resistant' }
          ],
          default: 'matte-vinyl'
        }
      ]
    })
  });

  // Calculator Runtime State
  const calculatorState = {
    productId: 'business-cards',
    quantity: 250,
    options: {
      sides: 'double',
      finish: 'matte'
    },
    isRush: false
  };

  // Cached trigger element for focus restoration
  let lastFocusedElement = null;

  // WhatsApp Configuration & Template Registry
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

    const projectTitle = (options && typeof options.projectTitle === 'string' && options.projectTitle.trim())
      ? options.projectTitle.trim()
      : 'featured';

    template = template.replace('{projectTitle}', projectTitle);

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
    if (actionEl.tagName && actionEl.tagName.toLowerCase() === 'a') {
      actionEl.href = url;
      actionEl.target = '_blank';
      actionEl.rel = 'noopener noreferrer';
    } else if (typeof window !== 'undefined' && typeof window.open === 'function') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }

  /**
   * Root Event Delegation Handler
   */
  if (typeof document !== 'undefined') {
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
        case 'next-slide': {
          event.preventDefault();
          nextSlide();
          break;
        }
        case 'prev-slide': {
          event.preventDefault();
          prevSlide();
          break;
        }
        case 'go-to-slide': {
          event.preventDefault();
          const slideIdx = parseInt(actionEl.dataset.slideIndex, 10);
          if (!isNaN(slideIdx)) {
            goToSlide(slideIdx);
          }
          break;
        }
        case 'filter-category': {
          event.preventDefault();
          const selectedCategory = actionEl.dataset.category || 'all';
          filterPortfolio(selectedCategory);
          break;
        }
        case 'jump-to-category': {
          event.preventDefault();
          const selectedCategory = actionEl.dataset.category || 'all';
          filterPortfolio(selectedCategory);
          const portfolioEl = document.getElementById('portfolio');
          if (portfolioEl && typeof portfolioEl.scrollIntoView === 'function') {
            portfolioEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          const activeTab = document.getElementById(`filter-tab-${selectedCategory}`);
          if (activeTab && typeof activeTab.focus === 'function') {
            activeTab.focus();
          }
          break;
        }
        case 'prev-project': {
          event.preventDefault();
          prevProject();
          break;
        }
        case 'next-project': {
          event.preventDefault();
          nextProject();
          break;
        }
        case 'calc-select-product': {
          event.preventDefault();
          const prodId = actionEl.dataset.productId;
          if (prodId) {
            setCalculatorProduct(prodId);
          }
          break;
        }
        case 'calc-qty-preset': {
          event.preventDefault();
          const presetQty = parseInt(actionEl.dataset.qty, 10);
          if (!isNaN(presetQty)) {
            setCalculatorQuantity(presetQty);
          }
          break;
        }
        case 'calc-whatsapp-inquire': {
          handleCalculatorWhatsAppInquiry(actionEl);
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

    // Delegated Input & Change Listeners for Calculator
    document.addEventListener('input', (event) => {
      const target = event.target;
      if (!target) return;

      if (target.id === 'calc-quantity-range') {
        const val = parseInt(target.value, 10);
        const numberInput = document.getElementById('calc-quantity');
        if (numberInput) numberInput.value = val;
        setCalculatorQuantity(val, false);
      } else if (target.id === 'calc-quantity') {
        const val = parseInt(target.value, 10);
        const rangeSlider = document.getElementById('calc-quantity-range');
        if (rangeSlider && !isNaN(val)) rangeSlider.value = val;
        setCalculatorQuantity(val, false);
      }
    });

    document.addEventListener('change', (event) => {
      const target = event.target;
      if (!target) return;

      if (target.name === 'calc-turnaround') {
        calculatorState.isRush = (target.value === 'rush');
        const pillLabels = document.querySelectorAll('.calc-turnaround-options .calc-radio-pill');
        pillLabels.forEach(label => {
          const radio = label.querySelector('input[type="radio"]');
          if (radio) {
            label.classList.toggle('active', radio.checked);
          }
        });
        updateCalculatorSummary();
      } else if (target.name && target.name.startsWith('calc-opt-')) {
        const optGroupId = target.dataset.optionGroup;
        if (optGroupId) {
          calculatorState.options[optGroupId] = target.value;
          const groupContainer = target.closest('.calc-pill-options-grid');
          if (groupContainer) {
            const pills = groupContainer.querySelectorAll('.calc-radio-pill');
            pills.forEach(p => {
              const r = p.querySelector('input[type="radio"]');
              if (r) p.classList.toggle('active', r.checked);
            });
          }
          updateCalculatorSummary();
        }
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
   * Global Keyboard Event Handling (Modal Escape & Focus Trap, Tablist Navigation & Mobile Drawer)
   */
  if (typeof document !== 'undefined') {
    document.addEventListener('keydown', (event) => {
      // 1. Modal Escape, Arrow Navigation & Focus Trap Handling
      if (state.activeModalId) {
        const modal = document.getElementById('portfolio-modal');
        if (modal) {
          if (event.key === 'Escape') {
            event.preventDefault();
            closeModal();
            return;
          }

          // Case study navigation (Alt + Arrow or P/N keys)
          const isTextInput = event.target && ['INPUT', 'TEXTAREA'].includes(event.target.tagName);
          if ((event.altKey && event.key === 'ArrowLeft') || (!event.altKey && !event.ctrlKey && !event.metaKey && (event.key === 'p' || event.key === 'P') && !isTextInput)) {
            event.preventDefault();
            prevProject();
            return;
          }

          if ((event.altKey && event.key === 'ArrowRight') || (!event.altKey && !event.ctrlKey && !event.metaKey && (event.key === 'n' || event.key === 'N') && !isTextInput)) {
            event.preventDefault();
            nextProject();
            return;
          }

          // Slide navigation within current case study
          if (event.key === 'ArrowRight' && !event.altKey) {
            event.preventDefault();
            nextSlide();
            return;
          }

          if (event.key === 'ArrowLeft' && !event.altKey) {
            event.preventDefault();
            prevSlide();
            return;
          }

          if (event.key === 'Tab') {
            const focusables = Array.from(
              modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
            ).filter(el => !el.hasAttribute('disabled') && (el.offsetParent !== null || el.offsetWidth > 0 || el.offsetHeight > 0));

            if (focusables.length === 0) {
              event.preventDefault();
              return;
            }

            const firstEl = focusables[0];
            const lastEl = focusables[focusables.length - 1];

            // If focus is outside modal, constrain to first or last element
            if (!modal.contains(document.activeElement)) {
              event.preventDefault();
              if (event.shiftKey) {
                lastEl.focus();
              } else {
                firstEl.focus();
              }
              return;
            }

            if (event.shiftKey && document.activeElement === firstEl) {
              event.preventDefault();
              lastEl.focus();
              return;
            } else if (!event.shiftKey && document.activeElement === lastEl) {
              event.preventDefault();
              firstEl.focus();
              return;
            }
          }
        }
        return;
      }

      // 2. Tablist Arrow Navigation for Portfolio Filters
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

      // 3. Mobile Drawer Escape & Focus Trap
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
      thumbnail: "assets/images/portfolio/cyma-1-hardhat.jpg",
      fullImage: "assets/images/portfolio/cyma-1-hardhat.jpg",
      images: Object.freeze([
        Object.freeze({
          url: "assets/images/portfolio/cyma-1-hardhat.jpg",
          caption: "Custom Branded Construction Hard Hats & Logo Mark"
        }),
        Object.freeze({
          url: "assets/images/portfolio/cyma-2-stationery.jpg",
          caption: "Corporate Identity Suite, Presentation Folders & Stationery"
        }),
        Object.freeze({
          url: "assets/images/portfolio/cyma-3-fleet-apparel.jpg",
          caption: "Branded Staff Apparel, Caps & Fleet Vehicle Graphics"
        })
      ]),
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
      thumbnail: "assets/images/portfolio/apparel-1-branded-tees.jpg",
      fullImage: "assets/images/portfolio/apparel-1-branded-tees.jpg",
      images: Object.freeze([
        Object.freeze({
          url: "assets/images/portfolio/apparel-1-branded-tees.jpg",
          caption: "Precision Screen Printed Heavyweight Cotton T-Shirts & Caps"
        }),
        Object.freeze({
          url: "assets/images/portfolio/apparel-2-hoodies-backpacks.jpg",
          caption: "Custom Branded Hoodies, Backpacks & Event Merch"
        }),
        Object.freeze({
          url: "assets/images/portfolio/apparel-3-custom-aprons.jpg",
          caption: "Embroidered Aprons & Hospitality Uniform Production"
        })
      ]),
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
      thumbnail: "assets/images/portfolio/glazing-2-packaging.jpg",
      fullImage: "assets/images/portfolio/glazing-2-packaging.jpg",
      images: Object.freeze([
        Object.freeze({
          url: "assets/images/portfolio/glazing-2-packaging.jpg",
          caption: "Yoghurt Bottle Labels, Snack Pouches & Takeaway Packaging"
        }),
        Object.freeze({
          url: "assets/images/portfolio/glazing-1-signage.jpg",
          caption: "Brand Identity Mark & Illuminated Storefront Lightbox"
        }),
        Object.freeze({
          url: "assets/images/portfolio/glazing-3-chef-culinary.jpg",
          caption: "Culinary Apparel & Food Photography Branding"
        })
      ]),
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
      thumbnail: "assets/images/portfolio/tolw-1-magazine-cover.jpg",
      fullImage: "assets/images/portfolio/tolw-1-magazine-cover.jpg",
      images: Object.freeze([
        Object.freeze({
          url: "assets/images/portfolio/tolw-1-magazine-cover.jpg",
          caption: "5th Edition Magazine Cover & Waterways Feature Spreads"
        }),
        Object.freeze({
          url: "assets/images/portfolio/tolw-2-editorial-spread.jpg",
          caption: "Luxury Open Editorial Spread — 'See Lagos Differently'"
        }),
        Object.freeze({
          url: "assets/images/portfolio/tolw-3-bound-book.jpg",
          caption: "Hardcover 3D Bound Compendium & Publication Spine"
        }),
        Object.freeze({
          url: "assets/images/portfolio/tolw-4-highway-gantry.jpg",
          caption: "Lagos Island Overpass Highway Gantry Billboard"
        })
      ]),
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
      thumbnail: "assets/images/portfolio/skillforge-1-billboard.jpg",
      fullImage: "assets/images/portfolio/skillforge-1-billboard.jpg",
      images: Object.freeze([
        Object.freeze({
          url: "assets/images/portfolio/skillforge-1-billboard.jpg",
          caption: "Large-Format Highway Billboard Campaign Mockup"
        }),
        Object.freeze({
          url: "assets/images/portfolio/skillforge-2-digital-campaigns.jpg",
          caption: "Digital Skills Training & Robotics Social Media Collateral"
        })
      ]),
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
      thumbnail: "assets/images/portfolio/oab-2-apparel-merch.jpg",
      fullImage: "assets/images/portfolio/oab-2-apparel-merch.jpg",
      images: Object.freeze([
        Object.freeze({
          url: "assets/images/portfolio/oab-2-apparel-merch.jpg",
          caption: "Custom Branded Backpacks, Desk Calendars & Apparel"
        }),
        Object.freeze({
          url: "assets/images/portfolio/oab-1-identity.jpg",
          caption: "Primary Brand Identity System & Logo Architecture"
        }),
        Object.freeze({
          url: "assets/images/portfolio/oab-3-editorial-rollup.jpg",
          caption: "Civic Outreach Rollup Banners & Educational Editorial Design"
        })
      ]),
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
            ${project.thumbnail ? `<img src="${escapeHtml(project.thumbnail)}" alt="${escapeHtml(title)} mockup preview" class="portfolio-thumb-img" loading="lazy" onerror="this.style.display='none'">` : ''}
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
    state.activeFilter = category;

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
   * Render Multi-Image Modal Slider Track & Dots
   * @param {Object} project - Portfolio project item
   */
  function renderModalSlider(project) {
    if (!project || typeof document === 'undefined') return;

    const track = document.getElementById('modal-slider-track');
    const dotsContainer = document.getElementById('modal-slider-dots');
    const captionEl = document.getElementById('modal-slider-caption');
    const prevArrow = typeof document.querySelector === 'function' ? document.querySelector('.slider-arrow-prev') : null;
    const nextArrow = typeof document.querySelector === 'function' ? document.querySelector('.slider-arrow-next') : null;

    const images = Array.isArray(project.images) && project.images.length > 0
      ? project.images
      : [{ url: project.fullImage || project.thumbnail, caption: project.title }];

    if (track) {
      track.innerHTML = images.map((img, idx) => `
        <div class="modal-slide" data-slide-index="${idx}">
          <img src="${escapeHtml(img.url)}" 
               alt="${escapeHtml(img.caption || project.title)}" 
               class="modal-slide-img" 
               loading="${idx === 0 ? 'eager' : 'lazy'}"
               onerror="this.style.opacity='0.4'">
        </div>
      `).join('');
    }

    if (dotsContainer) {
      dotsContainer.innerHTML = images.map((img, idx) => `
        <button type="button" 
                class="slider-dot ${idx === 0 ? 'active' : ''}" 
                role="tab" 
                aria-selected="${idx === 0 ? 'true' : 'false'}" 
                aria-label="Slide ${idx + 1} of ${images.length}" 
                data-action="go-to-slide" 
                data-slide-index="${idx}">
        </button>
      `).join('');
      dotsContainer.style.display = images.length > 1 ? 'flex' : 'none';
    }

    if (prevArrow && nextArrow) {
      const showArrows = images.length > 1 ? 'flex' : 'none';
      prevArrow.style.display = showArrows;
      nextArrow.style.display = showArrows;
    }

    state.activeSlideIndex = 0;
    goToSlide(0);
  }

  /**
   * Transition to Specific Slide Index in Modal
   * @param {number} targetIndex - Target slide index
   */
  function goToSlide(targetIndex) {
    if (typeof targetIndex !== 'number' || isNaN(targetIndex)) return;
    if (typeof document === 'undefined') return;

    const project = PORTFOLIO_DATA.find(item => item.id === state.activeModalId);
    if (!project) return;

    const images = Array.isArray(project.images) && project.images.length > 0
      ? project.images
      : [{ url: project.fullImage || project.thumbnail, caption: project.title }];

    const total = images.length;
    const index = ((targetIndex % total) + total) % total;
    state.activeSlideIndex = index;

    // 1. Hardware-accelerated CSS TranslateX Transform
    const track = document.getElementById('modal-slider-track');
    if (track) {
      track.style.transform = `translateX(-${index * 100}%)`;
    }

    // 2. Synchronize Active Dot Class & ARIA Selected
    const dots = typeof document.querySelectorAll === 'function'
      ? document.querySelectorAll('#modal-slider-dots .slider-dot')
      : [];
    if (dots && typeof dots.forEach === 'function') {
      dots.forEach((dot, idx) => {
        const isActive = idx === index;
        if (dot.classList && typeof dot.classList.toggle === 'function') {
          dot.classList.toggle('active', isActive);
        }
        if (typeof dot.setAttribute === 'function') {
          dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
        }
      });
    }

    // 3. Update Accessible Live Caption
    const captionEl = document.getElementById('modal-slider-caption');
    if (captionEl) {
      const currentCaption = images[index].caption || project.title;
      captionEl.textContent = currentCaption;
    }
  }

  /**
   * Navigate to Next Slide
   */
  function nextSlide() {
    goToSlide(state.activeSlideIndex + 1);
  }

  /**
   * Navigate to Previous Slide
   */
  function prevSlide() {
    goToSlide(state.activeSlideIndex - 1);
  }

  /**
   * Initialize Touch Gestures on Modal Media & Content Body
   */
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;

  function initTouchGestures() {
    if (typeof document === 'undefined') return;
    const mediaWrap = document.getElementById('modal-media-wrap');
    const modalContent = document.querySelector('#portfolio-modal .modal-content');

    const recordTouchStart = (e) => {
      if (e.touches && e.touches.length > 0) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchEndX = touchStartX;
        touchEndY = touchStartY;
      }
    };

    const recordTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        touchEndX = e.touches[0].clientX;
        touchEndY = e.touches[0].clientY;
      }
    };

    // 1. Image Slider Swipe with Boundary-Aware Project Transitions
    if (mediaWrap) {
      mediaWrap.addEventListener('touchstart', recordTouchStart, { passive: true });
      mediaWrap.addEventListener('touchmove', recordTouchMove, { passive: true });
      mediaWrap.addEventListener('touchend', () => {
        const dx = touchEndX - touchStartX;
        const dy = touchEndY - touchStartY;
        // Require minimum 40px swipe distance and horizontal dominant vector
        if (Math.abs(dx) >= 40 && Math.abs(dx) > Math.abs(dy)) {
          const project = PORTFOLIO_DATA.find(p => p.id === state.activeModalId);
          const totalSlides = (project && Array.isArray(project.images) && project.images.length > 0)
            ? project.images.length
            : 1;

          if (dx < 0) {
            // Swiping left (forward)
            if (state.activeSlideIndex >= totalSlides - 1) {
              nextProject(); // Seamlessly advance to next case study
            } else {
              nextSlide();
            }
          } else {
            // Swiping right (backward)
            if (state.activeSlideIndex <= 0) {
              prevProject(); // Step back to previous case study
            } else {
              prevSlide();
            }
          }
        }
      }, { passive: true });
    }

    // 2. Modal Body Swipe (Direct Inter-Project Case Study Navigation)
    if (modalContent) {
      modalContent.addEventListener('touchstart', recordTouchStart, { passive: true });
      modalContent.addEventListener('touchmove', recordTouchMove, { passive: true });
      modalContent.addEventListener('touchend', (e) => {
        if (mediaWrap && mediaWrap.contains(e.target)) return;
        const dx = touchEndX - touchStartX;
        const dy = touchEndY - touchStartY;
        if (Math.abs(dx) >= 45 && Math.abs(dx) > Math.abs(dy) * 1.2) {
          if (dx < 0) {
            nextProject();
          } else {
            prevProject();
          }
        }
      }, { passive: true });
    }
  }

  /**
   * Retrieve active filtered projects subset
   * @returns {Array} Filtered list of portfolio projects
   */
  function getFilteredProjects() {
    const filter = state.activeFilter || state.activeCategory || 'all';
    if (filter === 'all') {
      return PORTFOLIO_DATA;
    }
    const filtered = PORTFOLIO_DATA.filter(item => item.category === filter);
    return filtered.length > 0 ? filtered : PORTFOLIO_DATA;
  }

  /**
   * Populate Modal DOM with Case Study Data
   * @param {Object} project - Portfolio project item
   */
  function populateModalContent(project) {
    if (!project || typeof document === 'undefined') return;

    state.activeModalId = project.id;

    // 1. Populate Text Metadata & Badges
    const titleEl = document.getElementById('modal-title');
    const clientEl = document.getElementById('modal-client-name');
    const descEl = document.getElementById('modal-desc');
    const catBadgeEl = document.getElementById('modal-category-badge');
    const monogramEl = document.getElementById('modal-media-monogram');
    const scopeListEl = document.getElementById('modal-scope-list');
    const ctaBtn = document.getElementById('modal-whatsapp-cta');

    if (titleEl) titleEl.textContent = project.title;
    if (clientEl) clientEl.textContent = project.client || project.title;
    if (descEl) descEl.textContent = project.description;
    if (catBadgeEl) catBadgeEl.textContent = project.categoryLabel;
    if (monogramEl) monogramEl.textContent = (project.client || project.title || 'MJ').substring(0, 2).toUpperCase();

    if (scopeListEl) {
      scopeListEl.innerHTML = (Array.isArray(project.scope) ? project.scope : [])
        .map(tag => `<li class="modal-scope-chip">#${escapeHtml(String(tag))}</li>`)
        .join('');
    }

    // 2. Dynamically Synchronize WhatsApp CTA
    if (ctaBtn) {
      ctaBtn.href = generateWhatsAppUrl(WHATSAPP_CONFIG.defaultPhone, 'modal', { projectTitle: project.title });
      ctaBtn.dataset.context = 'modal';
      ctaBtn.dataset.projectId = project.id;
    }

    // 3. Update Continuous Project Navigation Controls & Counter
    const filteredProjects = getFilteredProjects();
    const currentIndex = filteredProjects.findIndex(p => p.id === project.id);
    const counterEl = document.getElementById('modal-project-counter');
    let prevProjBtns = typeof document.querySelectorAll === 'function' ? Array.from(document.querySelectorAll('[data-action="prev-project"]')) : [];
    let nextProjBtns = typeof document.querySelectorAll === 'function' ? Array.from(document.querySelectorAll('[data-action="next-project"]')) : [];

    if (prevProjBtns.length === 0 && typeof document.querySelector === 'function') {
      const single = document.querySelector('[data-action="prev-project"]');
      if (single) prevProjBtns = [single];
    }
    if (nextProjBtns.length === 0 && typeof document.querySelector === 'function') {
      const single = document.querySelector('[data-action="next-project"]');
      if (single) nextProjBtns = [single];
    }

    const sidePrevTitle = document.getElementById('modal-side-prev-title');
    const sideNextTitle = document.getElementById('modal-side-next-title');

    if (counterEl && currentIndex !== -1) {
      counterEl.textContent = `Project ${currentIndex + 1} of ${filteredProjects.length}`;
    }

    const prevIdx = ((currentIndex - 1) % filteredProjects.length + filteredProjects.length) % filteredProjects.length;
    const nextIdx = (currentIndex + 1) % filteredProjects.length;
    const prevProj = filteredProjects[prevIdx];
    const nextProj = filteredProjects[nextIdx];

    if (sidePrevTitle && prevProj) sidePrevTitle.textContent = prevProj.title;
    if (sideNextTitle && nextProj) sideNextTitle.textContent = nextProj.title;

    const isSingle = filteredProjects.length <= 1;

    if (prevProjBtns && typeof prevProjBtns.forEach === 'function') {
      prevProjBtns.forEach(btn => {
        if (typeof btn.setAttribute === 'function') {
          btn.disabled = isSingle;
          if (prevProj) btn.setAttribute('aria-label', `Previous case study: ${prevProj.title}`);
        }
      });
    }

    if (nextProjBtns && typeof nextProjBtns.forEach === 'function') {
      nextProjBtns.forEach(btn => {
        if (typeof btn.setAttribute === 'function') {
          btn.disabled = isSingle;
          if (nextProj) btn.setAttribute('aria-label', `Next case study: ${nextProj.title}`);
        }
      });
    }

    // 4. Render Interactive Image Slider for new project
    renderModalSlider(project);
  }

  /**
   * Navigate to Next Filtered Case Study
   */
  function nextProject() {
    if (!state.activeModalId) return;
    const filtered = getFilteredProjects();
    if (!filtered || filtered.length <= 1) return;

    const currentIndex = filtered.findIndex(p => p.id === state.activeModalId);
    if (currentIndex === -1) return;

    const nextIndex = (currentIndex + 1) % filtered.length;
    const targetProject = filtered[nextIndex];
    if (targetProject) {
      populateModalContent(targetProject);
    }
  }

  /**
   * Navigate to Previous Filtered Case Study
   */
  function prevProject() {
    if (!state.activeModalId) return;
    const filtered = getFilteredProjects();
    if (!filtered || filtered.length <= 1) return;

    const currentIndex = filtered.findIndex(p => p.id === state.activeModalId);
    if (currentIndex === -1) return;

    const prevIndex = ((currentIndex - 1) % filtered.length + filtered.length) % filtered.length;
    const targetProject = filtered[prevIndex];
    if (targetProject) {
      populateModalContent(targetProject);
    }
  }

  /**
   * Open Accessible Portfolio Case Study Lightbox Modal
   * @param {string} projectId - Unique project identifier
   */
  function openModal(projectId) {
    if (typeof projectId !== 'string' || !projectId.trim()) return;

    const project = PORTFOLIO_DATA.find(item => item.id === projectId.trim());
    if (!project) {
      if (typeof console !== 'undefined' && console.warn) {
        console.warn(`[MJr Engine] Project with id "${projectId}" not found in PORTFOLIO_DATA.`);
      }
      return;
    }

    if (typeof document === 'undefined') return;

    const modal = document.getElementById('portfolio-modal');
    if (!modal) return;

    // Cache current focused element to restore upon modal close
    lastFocusedElement = document.activeElement;

    // Populate Modal Content
    populateModalContent(project);

    // Display Modal & Lock Body Scroll
    modal.removeAttribute('hidden');
    if (document.body && document.body.classList) {
      document.body.classList.add('modal-open');
    }

    // Move initial focus into Modal for Accessibility
    const focusTarget = modal.querySelector('.modal-close-btn') || modal.querySelector('button, [href]');
    if (focusTarget && typeof focusTarget.focus === 'function') {
      focusTarget.focus();
    }
  }

  /**
   * Close Case Study Lightbox Modal & Restore State
   */
  function closeModal() {
    if (!state.activeModalId) return;

    if (typeof document === 'undefined') return;

    const modal = document.getElementById('portfolio-modal');
    if (!modal) return;

    state.activeModalId = null;
    modal.setAttribute('hidden', '');
    if (document.body && document.body.classList) {
      document.body.classList.remove('modal-open');
    }

    // Restore keyboard focus to originating element
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
      lastFocusedElement = null;
    }
  }

  /**
   * Get active pricing model with fallback to localStorage overrides
   * @returns {Object} Active pricing model configuration
   */
  function getActivePricing() {
    if (typeof localStorage !== 'undefined') {
      try {
        const stored = localStorage.getItem('mjr_custom_pricing');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && typeof parsed === 'object') return parsed;
        }
      } catch (e) {
        // Fallback gracefully
      }
    }
    return PRICING_MODEL;
  }

  /**
   * Format numerical currency into Nigerian Naira (NGN)
   * @param {number} amount
   * @returns {string} Formatted currency string
   */
  function formatCurrency(amount) {
    const val = typeof amount === 'number' && !isNaN(amount) ? amount : 0;
    try {
      return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        maximumFractionDigits: 0
      }).format(val);
    } catch {
      return `₦${Math.round(val).toLocaleString()}`;
    }
  }

  /**
   * Calculate volume discount fraction for a given product and quantity
   * @param {string} productId
   * @param {number} quantity
   * @returns {number} Fractional discount (0.00 to 1.00)
   */
  function calculateVolumeDiscount(productId, quantity) {
    const pricing = getActivePricing();
    const product = pricing[productId] || PRICING_MODEL[productId];
    if (!product || !Array.isArray(product.discounts)) return 0;
    const qty = Math.max(1, parseInt(quantity, 10) || 1);
    for (const tier of product.discounts) {
      if (qty >= tier.minQty) {
        return tier.rate;
      }
    }
    return 0;
  }

  /**
   * Pure estimate calculation function
   * @param {Object} params - { productId, quantity, options, isRush }
   * @returns {Object} Itemized estimate breakdown
   */
  function calculateEstimate({ productId, quantity, options = {}, isRush = false }) {
    const pricing = getActivePricing();
    const product = pricing[productId] || PRICING_MODEL[productId] || PRICING_MODEL['business-cards'];
    let qty = parseInt(quantity, 10);
    if (isNaN(qty) || qty < product.minQty) qty = product.minQty;
    if (qty > product.maxQty) qty = product.maxQty;

    let unitOptionDeltas = 0;
    if (Array.isArray(product.options)) {
      product.options.forEach(optGroup => {
        const chosenVal = options[optGroup.id] || optGroup.default;
        const match = optGroup.choices.find(c => c.value === chosenVal);
        if (match && typeof match.priceDelta === 'number') {
          unitOptionDeltas += match.priceDelta;
        }
      });
    }

    const unitPrice = product.unitBasePrice + unitOptionDeltas;
    const subtotal = unitPrice * qty;
    const discountRate = calculateVolumeDiscount(product.id, qty);
    const discountAmount = Math.round(subtotal * discountRate);
    const discountedSubtotal = subtotal - discountAmount;
    const rushMultiplier = isRush ? 1.25 : 1.0;
    const finalTotal = Math.round(discountedSubtotal * rushMultiplier);
    const rushFee = isRush ? (finalTotal - discountedSubtotal) : 0;

    return {
      productId: product.id,
      productTitle: product.title,
      quantity: qty,
      unitPrice,
      subtotal,
      discountRate,
      discountAmount,
      isRush: Boolean(isRush),
      rushFee,
      finalTotal
    };
  }

  /**
   * Generate itemized WhatsApp RFC 3986 payload for Calculator quote
   * @param {Object} params
   * @returns {string} WhatsApp message text
   */
  function generateCalculatorWhatsAppText({ productId, quantity, options = {}, isRush = false, estimate }) {
    const product = PRICING_MODEL[productId] || PRICING_MODEL['business-cards'];
    const est = estimate || calculateEstimate({ productId, quantity, options, isRush });

    const specLines = [];
    if (Array.isArray(product.options)) {
      product.options.forEach(optGroup => {
        const chosenVal = options[optGroup.id] || optGroup.default;
        const match = optGroup.choices.find(c => c.value === chosenVal);
        if (match) {
          specLines.push(`${optGroup.label}: ${match.label}`);
        }
      });
    }

    const turnaroundStr = isRush ? '⚡ Express Rush (24–48 Hours)' : 'Standard Production (3–5 Days)';
    const totalFormatted = formatCurrency(est.finalTotal);

    const message = [
      `Hello MJr Designs & Print Solutions,`,
      ``,
      `I calculated a project quote on your website estimator:`,
      `• Product: ${product.title}`,
      `• Quantity: ${est.quantity.toLocaleString()} units`,
      `• Specs: ${specLines.join(' | ')}`,
      `• Schedule: ${turnaroundStr}`,
      `• Estimated Total: ${totalFormatted}`,
      ``,
      `Please verify this configuration and let me know the next steps to proceed.`
    ].join('\n');

    return message;
  }

  /**
   * Handle WhatsApp inquiry for the dynamic calculator
   * @param {HTMLElement} actionEl
   */
  function handleCalculatorWhatsAppInquiry(actionEl) {
    if (!actionEl) return;
    const message = generateCalculatorWhatsAppText({
      productId: calculatorState.productId,
      quantity: calculatorState.quantity,
      options: calculatorState.options,
      isRush: calculatorState.isRush
    });
    const cleanPhone = sanitizePhoneNumber(WHATSAPP_CONFIG.defaultPhone);
    const encodedText = encodeURIComponent(message);
    const url = `${WHATSAPP_CONFIG.baseUrl}${cleanPhone}?text=${encodedText}`;

    if (actionEl.tagName && actionEl.tagName.toLowerCase() === 'a') {
      actionEl.href = url;
      actionEl.target = '_blank';
      actionEl.rel = 'noopener noreferrer';
    } else if (typeof window !== 'undefined' && typeof window.open === 'function') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }

  /**
   * Render dynamic option fields for the selected product
   * @param {string} productId
   */
  function renderCalculatorOptions(productId) {
    const product = PRICING_MODEL[productId];
    if (typeof document === 'undefined') return;
    const container = document.getElementById('calc-dynamic-options');
    if (!product || !container) return;

    if (!calculatorState.options || typeof calculatorState.options !== 'object') {
      calculatorState.options = {};
    }

    let markup = '';
    if (Array.isArray(product.options)) {
      product.options.forEach(optGroup => {
        if (!calculatorState.options[optGroup.id]) {
          calculatorState.options[optGroup.id] = optGroup.default;
        }
        const activeVal = calculatorState.options[optGroup.id];

        markup += `
          <div class="calc-field-group">
            <span class="calc-opt-group-label">${escapeHtml(optGroup.label)}</span>
            <div class="calc-pill-options-grid" role="radiogroup" aria-label="${escapeHtml(optGroup.label)}">
        `;

        optGroup.choices.forEach(choice => {
          const isChecked = (choice.value === activeVal);
          markup += `
            <label class="calc-radio-pill ${isChecked ? 'active' : ''}">
              <input type="radio" 
                     name="calc-opt-${escapeHtml(optGroup.id)}" 
                     value="${escapeHtml(choice.value)}" 
                     data-option-group="${escapeHtml(optGroup.id)}"
                     ${isChecked ? 'checked' : ''}>
              <span class="pill-title">${escapeHtml(choice.label)}</span>
              <span class="pill-desc">${escapeHtml(choice.desc || '')}</span>
            </label>
          `;
        });

        markup += `
            </div>
          </div>
        `;
      });
    }

    container.innerHTML = markup;
  }

  /**
   * Render preset quantity chips for active product
   * @param {string} productId
   * @param {number} currentQty
   */
  function renderCalculatorPresets(productId, currentQty) {
    const pricing = getActivePricing();
    const product = pricing[productId] || PRICING_MODEL[productId];
    if (typeof document === 'undefined') return;
    const container = document.getElementById('calc-qty-presets');
    if (!product || !container || !Array.isArray(product.qtyPresets)) return;

    let markup = '';
    product.qtyPresets.forEach(preset => {
      const isActive = (preset === currentQty);
      markup += `
        <button type="button" 
                class="calc-preset-chip ${isActive ? 'active' : ''}" 
                data-action="calc-qty-preset" 
                data-qty="${preset}">
          ${preset.toLocaleString()} pcs
        </button>
      `;
    });

    container.innerHTML = markup;
  }

  /**
   * Update the live estimate summary card in DOM
   */
  function updateCalculatorSummary() {
    if (typeof document === 'undefined') return;

    const est = calculateEstimate({
      productId: calculatorState.productId,
      quantity: calculatorState.quantity,
      options: calculatorState.options,
      isRush: calculatorState.isRush
    });

    const pricing = getActivePricing();
    const product = pricing[calculatorState.productId] || PRICING_MODEL[calculatorState.productId] || PRICING_MODEL['business-cards'];

    // 1. Product Title
    const titleEl = document.getElementById('calc-summary-product-title');
    if (titleEl) titleEl.textContent = product.title;

    // 2. Qty Display Badge
    const qtyDisplay = document.getElementById('calc-qty-display');
    if (qtyDisplay) qtyDisplay.textContent = `${est.quantity.toLocaleString()} units`;

    // 3. Spec Pills
    const specsContainer = document.getElementById('calc-summary-specs');
    if (specsContainer && Array.isArray(product.options)) {
      const specPills = [];
      product.options.forEach(optGroup => {
        const val = calculatorState.options[optGroup.id] || optGroup.default;
        const choice = optGroup.choices.find(c => c.value === val);
        if (choice) specPills.push(choice.label);
      });
      specPills.push(est.isRush ? '⚡ Express Rush' : 'Standard Turnaround');

      specsContainer.innerHTML = specPills
        .map(pill => `<span class="spec-pill">${escapeHtml(pill)}</span>`)
        .join('');
    }

    // 4. Line Items
    const unitPriceEl = document.getElementById('calc-unit-price');
    if (unitPriceEl) unitPriceEl.textContent = `${formatCurrency(est.unitPrice)} / unit`;

    const subtotalEl = document.getElementById('calc-subtotal');
    if (subtotalEl) subtotalEl.textContent = formatCurrency(est.subtotal);

    // 5. Volume Discount Line
    const discountLine = document.getElementById('calc-discount-line');
    const discountRateEl = document.getElementById('calc-discount-rate');
    const discountAmountEl = document.getElementById('calc-discount-amount');
    if (discountLine && discountRateEl && discountAmountEl) {
      if (est.discountRate > 0) {
        discountLine.style.display = 'flex';
        discountRateEl.textContent = `-${Math.round(est.discountRate * 100)}%`;
        discountAmountEl.textContent = `-${formatCurrency(est.discountAmount)}`;
      } else {
        discountLine.style.display = 'none';
      }
    }

    // 6. Rush Fee Line
    const rushLine = document.getElementById('calc-rush-line');
    const rushFeeEl = document.getElementById('calc-rush-fee');
    if (rushLine && rushFeeEl) {
      if (est.isRush) {
        rushLine.style.display = 'flex';
        rushFeeEl.textContent = `+${formatCurrency(est.rushFee)}`;
      } else {
        rushLine.style.display = 'none';
      }
    }

    // 7. Total Amount
    const totalAmountEl = document.getElementById('calc-total-amount');
    if (totalAmountEl) {
      totalAmountEl.textContent = formatCurrency(est.finalTotal);
    }

    // 8. Update WhatsApp Button Link
    const whatsappBtn = document.getElementById('calc-whatsapp-btn');
    if (whatsappBtn) {
      const message = generateCalculatorWhatsAppText({
        productId: calculatorState.productId,
        quantity: calculatorState.quantity,
        options: calculatorState.options,
        isRush: calculatorState.isRush,
        estimate: est
      });
      const cleanPhone = sanitizePhoneNumber(WHATSAPP_CONFIG.defaultPhone);
      whatsappBtn.href = `${WHATSAPP_CONFIG.baseUrl}${cleanPhone}?text=${encodeURIComponent(message)}`;
    }

    // 9. Sync Preset Chips Active State
    const presetButtons = document.querySelectorAll('.calc-preset-chip');
    presetButtons.forEach(btn => {
      const q = parseInt(btn.dataset.qty, 10);
      btn.classList.toggle('active', q === est.quantity);
    });
  }

  /**
   * Set active calculator product and reconfigure form controls
   * @param {string} productId
   */
  function setCalculatorProduct(productId) {
    const pricing = getActivePricing();
    const product = pricing[productId] || PRICING_MODEL[productId];
    if (!product) return;

    calculatorState.productId = productId;
    calculatorState.quantity = product.defaultQty;
    calculatorState.options = {};
    if (Array.isArray(product.options)) {
      product.options.forEach(opt => {
        calculatorState.options[opt.id] = opt.default;
      });
    }

    // Update Product Tabs Active State
    if (typeof document !== 'undefined') {
      const tabs = document.querySelectorAll('.calc-product-tab');
      tabs.forEach(tab => {
        const isActive = (tab.dataset.productId === productId);
        tab.classList.toggle('active', isActive);
        tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      // Update Slider Bounds & Value
      const rangeSlider = document.getElementById('calc-quantity-range');
      const numberInput = document.getElementById('calc-quantity');
      if (rangeSlider) {
        rangeSlider.min = product.minQty;
        rangeSlider.max = product.maxQty;
        rangeSlider.step = product.stepQty || 1;
        rangeSlider.value = product.defaultQty;
      }
      if (numberInput) {
        numberInput.min = product.minQty;
        numberInput.max = product.maxQty;
        numberInput.step = product.stepQty || 1;
        numberInput.value = product.defaultQty;
      }

      renderCalculatorOptions(productId);
      renderCalculatorPresets(productId, product.defaultQty);
      updateCalculatorSummary();
    }
  }

  /**
   * Set quantity and update slider/input/summary
   * @param {number} qty
   * @param {boolean} [updateInputs=true]
   */
  function setCalculatorQuantity(qty, updateInputs = true) {
    const product = PRICING_MODEL[calculatorState.productId] || PRICING_MODEL['business-cards'];
    let val = parseInt(qty, 10);
    if (isNaN(val)) val = product.minQty;
    if (val < product.minQty) val = product.minQty;
    if (val > product.maxQty) val = product.maxQty;

    calculatorState.quantity = val;

    if (typeof document !== 'undefined') {
      if (updateInputs) {
        const rangeSlider = document.getElementById('calc-quantity-range');
        const numberInput = document.getElementById('calc-quantity');
        if (rangeSlider) rangeSlider.value = val;
        if (numberInput) numberInput.value = val;
      }

      updateCalculatorSummary();
    }
  }

  /**
   * Initialize Calculator on page load
   */
  function initCalculator() {
    if (typeof document === 'undefined') return;
    const calcSection = document.getElementById('calculator');
    if (!calcSection) return;

    setCalculatorProduct(calculatorState.productId);
  }

  /**
   * Initialize Application on DOM Ready
   */
  if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
      renderPortfolioCards(PORTFOLIO_DATA);
      initTouchGestures();
      initCalculator();
    });
  }

  // Expose for browser runtime & Node testing environments
  if (typeof window !== 'undefined') {
    window.PORTFOLIO_DATA = PORTFOLIO_DATA;
    window.renderPortfolioCards = renderPortfolioCards;
    window.escapeHtml = escapeHtml;
    window.createPortfolioCardMarkup = createPortfolioCardMarkup;
    window.filterPortfolio = filterPortfolio;
    window.openModal = openModal;
    window.closeModal = closeModal;
    window.renderModalSlider = renderModalSlider;
    window.goToSlide = goToSlide;
    window.nextSlide = nextSlide;
    window.prevSlide = prevSlide;
    window.getFilteredProjects = getFilteredProjects;
    window.populateModalContent = populateModalContent;
    window.nextProject = nextProject;
    window.prevProject = prevProject;
    window.state = state;
    window.PRICING_MODEL = PRICING_MODEL;
    window.calculatorState = calculatorState;
    window.calculateEstimate = calculateEstimate;
    window.calculateVolumeDiscount = calculateVolumeDiscount;
    window.formatCurrency = formatCurrency;
    window.generateCalculatorWhatsAppText = generateCalculatorWhatsAppText;
    window.setCalculatorProduct = setCalculatorProduct;
    window.setCalculatorQuantity = setCalculatorQuantity;
    window.updateCalculatorSummary = updateCalculatorSummary;
    window.initCalculator = initCalculator;
    window.WHATSAPP_CONFIG = WHATSAPP_CONFIG;
    window.WHATSAPP_TEMPLATES = WHATSAPP_TEMPLATES;
    window.sanitizePhoneNumber = sanitizePhoneNumber;
    window.resolveWhatsAppMessage = resolveWhatsAppMessage;
    window.generateWhatsAppUrl = generateWhatsAppUrl;
    window.handleWhatsAppInquiry = handleWhatsAppInquiry;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      PORTFOLIO_DATA,
      renderPortfolioCards,
      escapeHtml,
      createPortfolioCardMarkup,
      filterPortfolio,
      openModal,
      closeModal,
      renderModalSlider,
      goToSlide,
      nextSlide,
      prevSlide,
      getFilteredProjects,
      populateModalContent,
      nextProject,
      prevProject,
      state,
      PRICING_MODEL,
      calculatorState,
      calculateEstimate,
      calculateVolumeDiscount,
      formatCurrency,
      generateCalculatorWhatsAppText,
      setCalculatorProduct,
      setCalculatorQuantity,
      updateCalculatorSummary,
      initCalculator,
      WHATSAPP_CONFIG,
      WHATSAPP_TEMPLATES,
      sanitizePhoneNumber,
      resolveWhatsAppMessage,
      generateWhatsAppUrl,
      handleWhatsAppInquiry
    };
  }
})();

