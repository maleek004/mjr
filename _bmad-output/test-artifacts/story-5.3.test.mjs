import { test, describe, before, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

// Import app.js modules for testing
import appModule from '../../app.js';
const {
  PORTFOLIO_DATA,
  getFilteredProjects,
  populateModalContent,
  nextProject,
  prevProject,
  openModal,
  closeModal,
  state,
  generateWhatsAppUrl,
  WHATSAPP_CONFIG
} = appModule;

const ROOT_DIR = path.resolve('.');
const HTML_PATH = path.join(ROOT_DIR, 'index.html');
const CSS_PATH = path.join(ROOT_DIR, 'styles.css');

describe('Story 5.3: Filter-Aware Continuous Case Study Navigation & Dynamic WhatsApp Sync', () => {
  let htmlContent = '';
  let cssContent = '';

  before(() => {
    htmlContent = fs.readFileSync(HTML_PATH, 'utf-8');
    cssContent = fs.readFileSync(CSS_PATH, 'utf-8');
  });

  beforeEach(() => {
    state.activeFilter = 'all';
    state.activeModalId = null;
    state.activeSlideIndex = 0;
  });

  test('AC-1: Continuous Case Study Navigation Markup in index.html', () => {
    // 1. Navigation bar container
    assert.match(htmlContent, /id=["']modal-project-nav["']/, 'Modal must include #modal-project-nav element');
    assert.match(htmlContent, /aria-label=["']Adjacent case study navigation["']/, 'Navigation bar must have descriptive aria-label');

    // 2. Previous Project Button
    assert.match(htmlContent, /data-action=["']prev-project["']/, 'Prev button must have data-action="prev-project"');
    assert.match(htmlContent, /class=["'][^"']*btn-project-prev[^"']*["']/, 'Prev button must include .btn-project-prev class');

    // 3. Position Counter
    assert.match(htmlContent, /id=["']modal-project-counter["']/, 'Modal must include #modal-project-counter element');
    assert.match(htmlContent, /aria-live=["']polite["']/, 'Position counter must have aria-live="polite"');

    // 4. Next Project Button
    assert.match(htmlContent, /data-action=["']next-project["']/, 'Next button must have data-action="next-project"');
    assert.match(htmlContent, /class=["'][^"']*btn-project-next[^"']*["']/, 'Next button must include .btn-project-next class');
  });

  test('AC-2: CSS Navigation Bar & Button Styling in styles.css', () => {
    // 1. Navigation bar container layout
    assert.match(cssContent, /\.modal-project-nav\s*\{[^}]*display:\s*flex/s, '.modal-project-nav must use flexbox');
    assert.match(cssContent, /\.modal-project-nav\s*\{[^}]*justify-content:\s*space-between/s, '.modal-project-nav must space items');

    // 2. Navigation button styling & hover/focus states
    assert.match(cssContent, /\.btn-project-nav\s*\{[^}]*display:\s*inline-flex/s, '.btn-project-nav must use inline-flex');
    assert.match(cssContent, /\.btn-project-nav:hover/, '.btn-project-nav must have hover styles');
    assert.match(cssContent, /\.btn-project-nav:focus-visible/, '.btn-project-nav must have focus-visible styles');
    assert.match(cssContent, /\.btn-project-nav:disabled/, '.btn-project-nav must have disabled styles');

    // 3. Counter typography
    assert.match(cssContent, /\.project-nav-counter\s*\{[^}]*font-weight:/s, '.project-nav-counter must define bold styling');
  });

  test('AC-3: getFilteredProjects Functionality & Filter Awareness', () => {
    // 1. Default 'all' filter returns full list
    state.activeFilter = 'all';
    const allProjects = getFilteredProjects();
    assert.equal(allProjects.length, PORTFOLIO_DATA.length, 'When filter is all, returns all PORTFOLIO_DATA projects');

    // 2. Category filter 'branding'
    state.activeFilter = 'branding';
    const brandingProjects = getFilteredProjects();
    assert.ok(brandingProjects.length >= 2, 'Branding category must have matching projects');
    brandingProjects.forEach(p => {
      assert.equal(p.category, 'branding', 'All filtered projects must match category branding');
    });

    // 3. Category filter 'publications'
    state.activeFilter = 'publications';
    const pubProjects = getFilteredProjects();
    assert.equal(pubProjects.length, 1, 'Publications category has 1 project');
    assert.equal(pubProjects[0].id, 'tolw-brochure');

    // 4. Category filter 'apparel'
    state.activeFilter = 'apparel';
    const apparelProjects = getFilteredProjects();
    assert.equal(apparelProjects[0].id, 'streetwear-merch');
  });

  test('AC-4: Continuous Case Study Stepping Logic (Next & Previous with Modulo Wrap)', () => {
    // Setup Mock DOM
    const mockElements = {
      'modal-title': { textContent: '' },
      'modal-client-name': { textContent: '' },
      'modal-desc': { textContent: '' },
      'modal-category-badge': { textContent: '' },
      'modal-scope-list': { innerHTML: '' },
      'modal-project-counter': { textContent: '' },
      'modal-slider-track': { innerHTML: '', style: {} },
      'modal-slider-dots': { innerHTML: '', style: {} },
      'modal-slider-caption': { textContent: '' },
      'modal-project-nav': { style: {} },
      'modal-whatsapp-cta': { href: '', dataset: {} },
      'portfolio-modal': {
        removeAttribute: () => {},
        setAttribute: () => {},
        querySelector: () => ({ focus: () => {} })
      }
    };

    const prevBtn = {
      disabled: false,
      attrs: {},
      setAttribute: function(k, v) { this.attrs[k] = v; }
    };
    const nextBtn = {
      disabled: false,
      attrs: {},
      setAttribute: function(k, v) { this.attrs[k] = v; }
    };

    const originalDocument = global.document;
    global.document = {
      getElementById: (id) => mockElements[id] || null,
      querySelector: (sel) => {
        if (sel === '[data-action="prev-project"]') return prevBtn;
        if (sel === '[data-action="next-project"]') return nextBtn;
        return null;
      },
      querySelectorAll: () => [],
      body: { classList: { add: () => {}, remove: () => {} } }
    };

    try {
      // 1. Open first project in 'all' view
      state.activeFilter = 'all';
      openModal('cyma-homes');

      assert.equal(state.activeModalId, 'cyma-homes');
      assert.equal(mockElements['modal-title'].textContent, 'CYMA HOMES Limited');
      assert.equal(mockElements['modal-project-counter'].textContent, `Project 1 of ${PORTFOLIO_DATA.length}`);
      assert.match(nextBtn.attrs['aria-label'], /Custom Branded Shirts/);

      // 2. Step forward (Next Project)
      nextProject();
      assert.equal(state.activeModalId, 'streetwear-merch');
      assert.equal(mockElements['modal-title'].textContent, 'Custom Branded Shirts & Streetwear');
      assert.equal(mockElements['modal-project-counter'].textContent, `Project 2 of ${PORTFOLIO_DATA.length}`);

      // 3. Step forward again
      nextProject();
      assert.equal(state.activeModalId, 'glazing-memoirs');
      assert.equal(mockElements['modal-title'].textContent, 'Glazing Memoirs FMCG');

      // 4. Step backward (Previous Project)
      prevProject();
      assert.equal(state.activeModalId, 'streetwear-merch');

      // 5. Wrap around backward from first item to last item
      prevProject(); // back to cyma-homes (index 0)
      assert.equal(state.activeModalId, 'cyma-homes');
      prevProject(); // wraps to last item (oab-foundation)
      assert.equal(state.activeModalId, 'oab-foundation');
      assert.equal(mockElements['modal-project-counter'].textContent, `Project ${PORTFOLIO_DATA.length} of ${PORTFOLIO_DATA.length}`);

      // 6. Wrap around forward from last item to first item
      nextProject();
      assert.equal(state.activeModalId, 'cyma-homes');
      assert.equal(mockElements['modal-project-counter'].textContent, `Project 1 of ${PORTFOLIO_DATA.length}`);

    } finally {
      global.document = originalDocument;
    }
  });

  test('AC-5: Filter-Constrained Stepping (e.g. Branding Category)', () => {
    const mockElements = {
      'modal-title': { textContent: '' },
      'modal-client-name': { textContent: '' },
      'modal-desc': { textContent: '' },
      'modal-category-badge': { textContent: '' },
      'modal-scope-list': { innerHTML: '' },
      'modal-project-counter': { textContent: '' },
      'modal-slider-track': { innerHTML: '', style: {} },
      'modal-slider-dots': { innerHTML: '', style: {} },
      'modal-slider-caption': { textContent: '' },
      'modal-project-nav': { style: {} },
      'modal-whatsapp-cta': { href: '', dataset: {} },
      'portfolio-modal': {
        removeAttribute: () => {},
        setAttribute: () => {},
        querySelector: () => ({ focus: () => {} })
      }
    };

    const prevBtn = { disabled: false, attrs: {}, setAttribute: function(k, v) { this.attrs[k] = v; } };
    const nextBtn = { disabled: false, attrs: {}, setAttribute: function(k, v) { this.attrs[k] = v; } };

    const originalDocument = global.document;
    global.document = {
      getElementById: (id) => mockElements[id] || null,
      querySelector: (sel) => {
        if (sel === '[data-action="prev-project"]') return prevBtn;
        if (sel === '[data-action="next-project"]') return nextBtn;
        return null;
      },
      querySelectorAll: () => [],
      body: { classList: { add: () => {}, remove: () => {} } }
    };

    try {
      // Set active filter to 'branding' (Contains: cyma-homes, glazing-memoirs, oab-foundation)
      state.activeFilter = 'branding';
      openModal('cyma-homes');

      const brandingCount = getFilteredProjects().length;
      assert.equal(brandingCount, 3, 'Branding filter should have 3 projects');
      assert.equal(mockElements['modal-project-counter'].textContent, `Project 1 of 3`);

      // Next project must step to glazing-memoirs (skipping streetwear-merch which is apparel)
      nextProject();
      assert.equal(state.activeModalId, 'glazing-memoirs');
      assert.equal(mockElements['modal-project-counter'].textContent, `Project 2 of 3`);

      // Next project must step to oab-foundation (skipping tolw-brochure & skillforge-billboard)
      nextProject();
      assert.equal(state.activeModalId, 'oab-foundation');
      assert.equal(mockElements['modal-project-counter'].textContent, `Project 3 of 3`);

      // Next project wraps back to cyma-homes
      nextProject();
      assert.equal(state.activeModalId, 'cyma-homes');
      assert.equal(mockElements['modal-project-counter'].textContent, `Project 1 of 3`);

    } finally {
      global.document = originalDocument;
    }
  });

  test('AC-6: Dynamic WhatsApp CTA Synchronization on Project Change', () => {
    const mockCta = { href: '', dataset: {} };
    const mockElements = {
      'modal-title': { textContent: '' },
      'modal-client-name': { textContent: '' },
      'modal-desc': { textContent: '' },
      'modal-category-badge': { textContent: '' },
      'modal-scope-list': { innerHTML: '' },
      'modal-project-counter': { textContent: '' },
      'modal-slider-track': { innerHTML: '', style: {} },
      'modal-slider-dots': { innerHTML: '', style: {} },
      'modal-slider-caption': { textContent: '' },
      'modal-project-nav': { style: {} },
      'modal-whatsapp-cta': mockCta,
      'portfolio-modal': {
        removeAttribute: () => {},
        setAttribute: () => {},
        querySelector: () => ({ focus: () => {} })
      }
    };

    const originalDocument = global.document;
    global.document = {
      getElementById: (id) => mockElements[id] || null,
      querySelector: () => null,
      querySelectorAll: () => [],
      body: { classList: { add: () => {}, remove: () => {} } }
    };

    try {
      state.activeFilter = 'all';

      // 1. Open cyma-homes
      openModal('cyma-homes');
      assert.match(mockCta.href, /https:\/\/wa\.me\/2348106246748\?text=/);
      assert.match(mockCta.href, /CYMA%20HOMES%20Limited/);
      assert.equal(mockCta.dataset.projectId, 'cyma-homes');

      // 2. Step to streetwear-merch
      nextProject();
      assert.match(mockCta.href, /Custom%20Branded%20Shirts%20%26%20Streetwear/);
      assert.equal(mockCta.dataset.projectId, 'streetwear-merch');

      // 3. Step to tolw-brochure
      const tolwProject = PORTFOLIO_DATA.find(p => p.id === 'tolw-brochure');
      populateModalContent(tolwProject);
      assert.match(mockCta.href, /Tour%20of%20Lagos%20Waterways/);
      assert.equal(mockCta.dataset.projectId, 'tolw-brochure');

    } finally {
      global.document = originalDocument;
    }
  });
});
