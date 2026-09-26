import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const appModule = require('../../app.js');

describe('Story 3.3: Accessible Lightbox Modal with Keyboard Focus Management', () => {
  const htmlPath = path.resolve('index.html');
  const cssPath = path.resolve('styles.css');
  const jsPath = path.resolve('app.js');

  const htmlContent = fs.readFileSync(htmlPath, 'utf8');
  const cssContent = fs.readFileSync(cssPath, 'utf8');
  const jsContent = fs.readFileSync(jsPath, 'utf8');

  test('AC-1: Semantic HTML5 Modal Markup & WAI-ARIA Attributes (TC-331, TC-332)', () => {
    // 1. Modal Overlay Landmark with dialog semantics
    assert.match(
      htmlContent,
      /<div[^>]*id="portfolio-modal"[^>]*class="[^"]*modal-overlay[^"]*"[^>]*role="dialog"[^>]*aria-modal="true"[^>]*aria-labelledby="modal-title"[^>]*aria-describedby="modal-desc"[^>]*hidden/,
      'Modal container must have id="portfolio-modal", role="dialog", aria-modal="true", aria-labelledby, aria-describedby, and hidden attribute by default'
    );

    // 2. Backdrop element with close-modal action
    assert.match(
      htmlContent,
      /<div[^>]*class="[^"]*modal-backdrop[^"]*"[^>]*data-action="close-modal"/,
      'Modal backdrop must declare data-action="close-modal"'
    );

    // 3. Modal Close button
    assert.match(
      htmlContent,
      /<button[^>]*class="[^"]*modal-close-btn[^"]*"[^>]*data-action="close-modal"[^>]*aria-label="[^"]*"/,
      'Close button must have data-action="close-modal" and an accessible aria-label'
    );

    // 4. Modal structure elements
    assert.match(htmlContent, /id="modal-title"/, 'Must contain element with id="modal-title"');
    assert.match(htmlContent, /id="modal-desc"/, 'Must contain element with id="modal-desc"');
    assert.match(htmlContent, /id="modal-client-name"/, 'Must contain element with id="modal-client-name"');
    assert.match(htmlContent, /id="modal-category-badge"/, 'Must contain element with id="modal-category-badge"');
    assert.match(htmlContent, /id="modal-scope-list"/, 'Must contain element with id="modal-scope-list"');
    assert.match(htmlContent, /id="modal-whatsapp-cta"[^>]*data-action="whatsapp-inquire"/, 'Must contain modal WhatsApp CTA with data-action="whatsapp-inquire"');
  });

  test('AC-2: Centralized Event Delegation for Modal Open & Close in app.js (TC-331, TC-336)', () => {
    // Verify document-level event delegation contains open-modal and close-modal routes
    assert.match(
      jsContent,
      /case\s+['"]open-modal['"]\s*:/,
      'Global event delegator in app.js must route case "open-modal"'
    );

    assert.match(
      jsContent,
      /case\s+['"]close-modal['"]\s*:/,
      'Global event delegator in app.js must route case "close-modal"'
    );

    assert.match(
      jsContent,
      /openModal\s*\(\s*projectId\s*\)/,
      'Event delegation switch must call openModal(projectId)'
    );

    assert.match(
      jsContent,
      /closeModal\s*\(\s*\)/,
      'Event delegation switch must call closeModal()'
    );
  });

  test('AC-3: Dynamic Content Population, State Sync & WhatsApp Link Context (TC-331, TC-332, TC-333)', () => {
    const { openModal, closeModal, state, PORTFOLIO_DATA } = appModule;
    assert.ok(typeof openModal === 'function', 'app.js must export openModal function');
    assert.ok(typeof closeModal === 'function', 'app.js must export closeModal function');

    // Create a mock DOM environment
    const createMockElement = (tag, id = '', attrs = {}) => {
      const attributes = { ...attrs };
      const classList = new Set();
      let innerHTML = '';
      let textContent = '';
      const styles = {};

      return {
        tagName: tag.toUpperCase(),
        id,
        dataset: {},
        href: '',
        style: {
          setProperty: (k, v) => { styles[k] = String(v); },
          getPropertyValue: (k) => styles[k] || ''
        },
        classList: {
          contains: (cls) => classList.has(cls),
          add: (cls) => classList.add(cls),
          remove: (cls) => classList.delete(cls)
        },
        setAttribute: (k, v) => { attributes[k] = String(v); },
        getAttribute: (k) => attributes[k] || null,
        removeAttribute: (k) => { delete attributes[k]; },
        hasAttribute: (k) => Object.prototype.hasOwnProperty.call(attributes, k),
        get innerHTML() { return innerHTML; },
        set innerHTML(val) { innerHTML = String(val); },
        get textContent() { return textContent; },
        set textContent(val) { textContent = String(val); },
        querySelector: (selector) => {
          if (selector === '.modal-close-btn') return mockCloseBtn;
          return null;
        },
        focus: () => { mockFocusTracker.current = id || tag; },
        _styles: styles,
        _attributes: attributes
      };
    };

    const mockFocusTracker = { current: null };
    const mockModal = createMockElement('div', 'portfolio-modal', { hidden: '' });
    const mockCloseBtn = createMockElement('button', 'modal-close-btn');
    const mockTitle = createMockElement('h2', 'modal-title');
    const mockClient = createMockElement('span', 'modal-client-name');
    const mockDesc = createMockElement('p', 'modal-desc');
    const mockBadge = createMockElement('span', 'modal-category-badge');
    const mockMonogram = createMockElement('span', 'modal-media-monogram');
    const mockPlaceholder = createMockElement('div', 'modal-media-placeholder');
    const mockScopeList = createMockElement('ul', 'modal-scope-list');
    const mockCta = createMockElement('a', 'modal-whatsapp-cta');

    const domElements = {
      'portfolio-modal': mockModal,
      'modal-title': mockTitle,
      'modal-client-name': mockClient,
      'modal-desc': mockDesc,
      'modal-category-badge': mockBadge,
      'modal-media-monogram': mockMonogram,
      'modal-media-placeholder': mockPlaceholder,
      'modal-scope-list': mockScopeList,
      'modal-whatsapp-cta': mockCta
    };

    const mockTrigger = createMockElement('button', 'trigger-btn');

    const originalDocument = global.document;
    global.document = {
      activeElement: mockTrigger,
      body: {
        classList: {
          _set: new Set(),
          add: function (cls) { this._set.add(cls); },
          remove: function (cls) { this._set.delete(cls); },
          contains: function (cls) { return this._set.contains ? this._set.contains(cls) : this._set.has(cls); },
          has: function (cls) { return this._set.has(cls); }
        }
      },
      getElementById: (id) => domElements[id] || null,
      querySelectorAll: () => []
    };

    try {
      // Test 1: Open modal for 'cyma-homes'
      openModal('cyma-homes');

      assert.equal(state.activeModalId, 'cyma-homes', "State activeModalId must be set to 'cyma-homes'");
      assert.equal(mockModal.hasAttribute('hidden'), false, 'Modal hidden attribute must be removed when open');
      assert.ok(global.document.body.classList.has('modal-open'), 'Body must receive modal-open class when open');
      assert.equal(mockTitle.textContent, 'CYMA HOMES Limited', 'Modal title must be populated with project title');
      assert.equal(mockClient.textContent, 'CYMA HOMES Limited', 'Modal client must be populated');
      assert.equal(mockBadge.textContent, 'Brand Identity & Corporate Design', 'Modal badge must display category label');
      assert.equal(mockMonogram.textContent, 'CY', 'Modal monogram must show first 2 letters');
      assert.match(mockScopeList.innerHTML, /Logo System/, 'Modal scope list must render deliverable chips');
      assert.match(mockCta.href, /https:\/\/wa\.me\/2348106246748\?text=/, 'WhatsApp link must target +2348106246748');
      assert.match(mockCta.href, /CYMA%20HOMES%20Limited/, 'WhatsApp message must be URI-encoded with project name');

      // Test 2: Close modal and verify state reset
      closeModal();
      assert.equal(state.activeModalId, null, 'State activeModalId must be reset to null');
      assert.equal(mockModal.hasAttribute('hidden'), true, 'Modal must have hidden attribute restored when closed');
      assert.equal(global.document.body.classList.has('modal-open'), false, 'Body must have modal-open class removed');

      // Test 3: Defensive handling for non-existent project id
      openModal('non_existent_project');
      assert.equal(state.activeModalId, null, 'Invalid project id must not open modal or alter state');
    } finally {
      global.document = originalDocument;
    }
  });

  test('AC-4: CSS Modal Architecture, Blur, Scroll Lock & Reduced Motion (TC-337)', () => {
    // Body scroll lock
    assert.match(
      cssContent,
      /body\.modal-open\s*\{[\s\S]*?overflow:\s*hidden;/,
      'body.modal-open must declare overflow: hidden'
    );

    // Modal overlay positioning & z-index
    assert.match(
      cssContent,
      /\.modal-overlay\s*\{[\s\S]*?position:\s*fixed;/,
      '.modal-overlay must be fixed'
    );
    assert.match(
      cssContent,
      /\.modal-overlay\[hidden\]\s*\{[\s\S]*?display:\s*none\s*!important;/,
      '.modal-overlay[hidden] must be display: none !important'
    );

    // Backdrop filter blur
    assert.match(
      cssContent,
      /\.modal-backdrop\s*\{[\s\S]*?backdrop-filter:\s*blur\(/,
      '.modal-backdrop must use backdrop-filter: blur()'
    );

    // Animation scale in
    assert.match(
      cssContent,
      /@keyframes\s+modalScaleIn\s*\{/,
      'Must define keyframes modalScaleIn for smooth dialog reveal'
    );

    // Reduced motion overrides
    assert.match(
      cssContent,
      /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*?\.modal-container[\s\S]*?animation:\s*none/s,
      'prefers-reduced-motion must disable animation on .modal-container'
    );
  });
});
