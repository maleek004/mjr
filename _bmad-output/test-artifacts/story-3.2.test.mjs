import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const appModule = require('../../app.js');

describe('Story 3.2: Zero-Framework Category Filter Tab Bar (Event Delegation)', () => {
  const htmlPath = path.resolve('index.html');
  const cssPath = path.resolve('styles.css');
  const jsPath = path.resolve('app.js');

  const htmlContent = fs.readFileSync(htmlPath, 'utf8');
  const cssContent = fs.readFileSync(cssPath, 'utf8');
  const jsContent = fs.readFileSync(jsPath, 'utf8');

  test('AC-1: Semantic HTML5 Tablist Markup & ARIA Controls (TC-321, TC-322)', () => {
    // 1. Tablist container landmark
    assert.match(
      htmlContent,
      /<div[^>]*class="[^"]*portfolio-filter-bar[^"]*"[^>]*role="tablist"[^>]*aria-label="[^"]*"/,
      'Filter bar must have role="tablist" and descriptive aria-label'
    );

    // 2. Filter buttons attributes (role="tab", data-action="filter-category", aria-controls="portfolio-grid", tabindex)
    const categories = ['all', 'branding', 'publications', 'marketing', 'apparel'];
    categories.forEach((cat) => {
      const pattern = new RegExp(
        `<button[^>]*class="[^"]*filter-btn[^"]*"[^>]*role="tab"[^>]*id="filter-tab-${cat}"[^>]*aria-controls="portfolio-grid"[^>]*data-action="filter-category"[^>]*data-category="${cat}"`,
        'i'
      );
      assert.match(
        htmlContent,
        pattern,
        `Filter button for category '${cat}' must have role="tab", aria-controls="portfolio-grid", data-action="filter-category", and data-category="${cat}"`
      );
    });

    // 3. Initial active state & roving tabindex on 'all' tab
    assert.match(
      htmlContent,
      /<button[^>]*class="[^"]*filter-btn[^"]*active[^"]*"[^>]*role="tab"[^>]*id="filter-tab-all"[^>]*aria-selected="true"[^>]*aria-controls="portfolio-grid"[^>]*tabindex="0"[^>]*data-category="all"/,
      "'All Projects' tab must have active class, aria-selected='true', and tabindex='0' on initial render"
    );
  });

  test('AC-2: Centralized Event Delegation & Filter Dispatch in app.js (TC-321)', () => {
    // Verify document-level event delegation contains filter-category route
    assert.match(
      jsContent,
      /case\s+['"]filter-category['"]\s*:/,
      'Global event delegator in app.js must route case "filter-category"'
    );

    // Verify filter function invocation
    assert.match(
      jsContent,
      /filterPortfolio\s*\(\s*selectedCategory\s*\)/,
      'Event delegation switch must call filterPortfolio(selectedCategory)'
    );
  });

  test('AC-3: Runtime DOM Filter Engine, State Synchronization & Focus Management (TC-322, TC-323, TC-324, TC-325)', () => {
    const { filterPortfolio, state, PORTFOLIO_DATA } = appModule;
    assert.ok(typeof filterPortfolio === 'function', 'app.js must export filterPortfolio function');

    // Create a simulated DOM structure
    const createMockElement = (tag, dataset = {}, classes = [], attrs = {}) => {
      const classList = new Set(classes);
      const attributes = { ...attrs };
      const children = [];

      return {
        tagName: tag.toUpperCase(),
        dataset: { ...dataset },
        classList: {
          contains: (cls) => classList.has(cls),
          add: (cls) => classList.add(cls),
          remove: (cls) => classList.delete(cls),
          toggle: (cls, force) => {
            if (typeof force === 'boolean') {
              if (force) classList.add(cls);
              else classList.delete(cls);
            } else {
              if (classList.has(cls)) classList.delete(cls);
              else classList.add(cls);
            }
          }
        },
        setAttribute: (k, v) => { attributes[k] = String(v); },
        getAttribute: (k) => attributes[k] || null,
        removeAttribute: (k) => { delete attributes[k]; },
        hasAttribute: (k) => Object.prototype.hasOwnProperty.call(attributes, k),
        querySelectorAll: (selector) => {
          if (selector === 'button, a') return children;
          return [];
        },
        _children: children,
        _classList: classList,
        _attributes: attributes
      };
    };

    const categories = ['all', 'branding', 'publications', 'marketing', 'apparel'];
    const mockFilterBtns = categories.map((cat, idx) => {
      return createMockElement(
        'button',
        { action: 'filter-category', category: cat },
        idx === 0 ? ['filter-btn', 'active'] : ['filter-btn'],
        { 'role': 'tab', 'aria-selected': idx === 0 ? 'true' : 'false', 'tabindex': idx === 0 ? '0' : '-1' }
      );
    });

    const mockCards = PORTFOLIO_DATA.map((item) => {
      const card = createMockElement(
        'article',
        { projectId: item.id, category: item.category },
        ['portfolio-card']
      );
      const btn1 = createMockElement('button', { action: 'open-modal' });
      const btn2 = createMockElement('a', { action: 'whatsapp-inquire' });
      card._children.push(btn1, btn2);
      return card;
    });

    // Mock global document
    const originalDocument = global.document;
    global.document = {
      querySelectorAll: (selector) => {
        if (selector === '[data-action="filter-category"]') return mockFilterBtns;
        if (selector === '.portfolio-card') return mockCards;
        return [];
      }
    };

    try {
      // 1. Filter by specific category: 'branding'
      filterPortfolio('branding');
      assert.equal(state.activeCategory, 'branding', "State activeCategory must be updated to 'branding'");

      // Verify button attributes
      const brandingBtn = mockFilterBtns.find(b => b.dataset.category === 'branding');
      const allBtn = mockFilterBtns.find(b => b.dataset.category === 'all');
      assert.ok(brandingBtn.classList.contains('active'), "Branding button must have 'active' class");
      assert.equal(brandingBtn.getAttribute('aria-selected'), 'true', "Branding button must have aria-selected='true'");
      assert.equal(brandingBtn.getAttribute('tabindex'), '0', "Branding button must have roving tabindex='0'");
      assert.ok(!allBtn.classList.contains('active'), "All button must not have 'active' class");
      assert.equal(allBtn.getAttribute('aria-selected'), 'false', "All button must have aria-selected='false'");
      assert.equal(allBtn.getAttribute('tabindex'), '-1', "All button must have roving tabindex='-1'");

      // Verify card visibility
      mockCards.forEach((card) => {
        const isBranding = card.dataset.category === 'branding';
        if (isBranding) {
          assert.ok(!card.classList.contains('is-hidden'), `Card ${card.dataset.projectId} must be visible`);
          assert.equal(card.hasAttribute('aria-hidden'), false, `Card ${card.dataset.projectId} must not have aria-hidden`);
          card._children.forEach(child => assert.equal(child.hasAttribute('tabindex'), false));
        } else {
          assert.ok(card.classList.contains('is-hidden'), `Card ${card.dataset.projectId} must be hidden`);
          assert.equal(card.getAttribute('aria-hidden'), 'true', `Card ${card.dataset.projectId} must have aria-hidden='true'`);
          card._children.forEach(child => assert.equal(child.getAttribute('tabindex'), '-1'));
        }
      });

      // 2. Filter by 'apparel' (Single item)
      filterPortfolio('apparel');
      assert.equal(state.activeCategory, 'apparel', "State activeCategory must be 'apparel'");
      const visibleApparelCards = mockCards.filter(c => !c.classList.contains('is-hidden'));
      assert.equal(visibleApparelCards.length, 1, 'Only 1 card should be visible for apparel');
      assert.equal(visibleApparelCards[0].dataset.projectId, 'streetwear-merch');

      // 3. Reset to 'all'
      filterPortfolio('all');
      assert.equal(state.activeCategory, 'all', "State activeCategory must be 'all'");
      const visibleAllCards = mockCards.filter(c => !c.classList.contains('is-hidden'));
      assert.equal(visibleAllCards.length, 6, 'All 6 cards must be visible for all category');

      // 4. Defensive handling for invalid category slug
      filterPortfolio('non_existent_category_slug');
      assert.equal(state.activeCategory, 'all', "Invalid category must fallback gracefully to 'all'");
      const visibleFallbackCards = mockCards.filter(c => !c.classList.contains('is-hidden'));
      assert.equal(visibleFallbackCards.length, 6, 'All cards remain visible on invalid category fallback');
    } finally {
      global.document = originalDocument;
    }
  });

  test('AC-4: CSS Filtering Classes, Animations & Reduced Motion (TC-326, TC-327)', () => {
    // .portfolio-card.is-hidden rules
    assert.match(
      cssContent,
      /\.portfolio-card\.is-hidden\s*\{[\s\S]*?display:\s*none\s*!important;/,
      '.portfolio-card.is-hidden must declare display: none !important'
    );
    assert.match(
      cssContent,
      /\.portfolio-card\.is-hidden\s*\{[\s\S]*?opacity:\s*0;/,
      '.portfolio-card.is-hidden must declare opacity: 0'
    );

    // .portfolio-card transition includes opacity
    assert.match(
      cssContent,
      /\.portfolio-card\s*\{[\s\S]*?opacity\s+var\(--transition-normal\)/,
      '.portfolio-card must transition opacity for smooth category filtering'
    );

    // Filter button active styles
    assert.match(
      cssContent,
      /\.filter-btn\.active,\s*\.filter-btn\[aria-selected="true"\]\s*\{/,
      'Must define active and [aria-selected="true"] styles for filter buttons'
    );

    // Reduced motion support
    assert.match(
      cssContent,
      /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*?\.portfolio-card[\s\S]*?transition:\s*none/s,
      'prefers-reduced-motion must disable transitions on .portfolio-card'
    );
  });
});
