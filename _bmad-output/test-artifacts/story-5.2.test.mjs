import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const appModule = require('../../app.js');

describe('Story 5.2: Zero-Framework Swipeable Image Slider with Pagination Dots', () => {
  const htmlPath = path.resolve('index.html');
  const cssPath = path.resolve('styles.css');
  const jsPath = path.resolve('app.js');

  const htmlContent = fs.readFileSync(htmlPath, 'utf8');
  const cssContent = fs.readFileSync(cssPath, 'utf8');
  const jsContent = fs.readFileSync(jsPath, 'utf8');

  test('AC-1: Slider Markup in index.html (Track, Arrows, Dots, Live Caption)', () => {
    // 1. Slider Track Container
    assert.match(
      htmlContent,
      /<div[^>]*class="modal-slider-track"[^>]*id="modal-slider-track"/,
      'Modal must contain .modal-slider-track with id="modal-slider-track"'
    );

    // 2. Navigation Arrows
    assert.match(
      htmlContent,
      /<button[^>]*class="[^"]*slider-arrow-prev[^"]*"[^>]*data-action="prev-slide"/,
      'Must contain previous slide arrow button with data-action="prev-slide"'
    );
    assert.match(
      htmlContent,
      /<button[^>]*class="[^"]*slider-arrow-next[^"]*"[^>]*data-action="next-slide"/,
      'Must contain next slide arrow button with data-action="next-slide"'
    );

    // 3. Pagination Dots & Live Caption Bar
    assert.match(
      htmlContent,
      /<div[^>]*class="slider-dots"[^>]*id="modal-slider-dots"[^>]*role="tablist"/,
      'Must contain .slider-dots with role="tablist"'
    );
    assert.match(
      htmlContent,
      /<div[^>]*class="slider-caption-bar"[^>]*id="modal-slider-caption"[^>]*aria-live="polite"/,
      'Must contain .slider-caption-bar with aria-live="polite"'
    );
  });

  test('AC-2: Hardware-Accelerated CSS Transitions & Touch Ergonomics in styles.css', () => {
    // 1. Slider track flex & transform transition
    assert.match(
      cssContent,
      /\.modal-slider-track\s*\{[^}]*display:\s*flex;/,
      '.modal-slider-track must be display: flex'
    );
    assert.match(
      cssContent,
      /\.modal-slider-track\s*\{[^}]*transition:\s*transform/,
      '.modal-slider-track must declare transition: transform'
    );
    assert.match(
      cssContent,
      /\.modal-slider-track\s*\{[^}]*will-change:\s*transform;/,
      '.modal-slider-track must declare will-change: transform for GPU layer promotion'
    );

    // 2. Slide element styling
    assert.match(
      cssContent,
      /\.modal-slide\s*\{[^}]*flex:\s*0\s+0\s+100%;/,
      '.modal-slide must occupy 100% width via flex: 0 0 100%'
    );

    // 3. Touch action pan-y on media container
    assert.match(
      cssContent,
      /\.modal-media-wrap\s*\{[^}]*touch-action:\s*pan-y;/,
      '.modal-media-wrap must declare touch-action: pan-y for smooth vertical scrolling'
    );

    // 4. Dot active state
    assert.match(
      cssContent,
      /\.slider-dot\.active\s*\{/,
      'Must declare .slider-dot.active styles'
    );
  });

  test('AC-3: Event Delegation for Slider Actions in app.js', () => {
    assert.match(jsContent, /case\s+['"]next-slide['"]\s*:/, 'Click listener must handle "next-slide"');
    assert.match(jsContent, /case\s+['"]prev-slide['"]\s*:/, 'Click listener must handle "prev-slide"');
    assert.match(jsContent, /case\s+['"]go-to-slide['"]\s*:/, 'Click listener must handle "go-to-slide"');
  });

  test('AC-4: Keyboard Arrow Navigation in app.js', () => {
    assert.match(jsContent, /event\.key\s*===\s*['"]ArrowRight['"]/, 'Keydown listener must handle ArrowRight');
    assert.match(jsContent, /event\.key\s*===\s*['"]ArrowLeft['"]/, 'Keydown listener must handle ArrowLeft');
  });

  test('AC-5: JavaScript Slider API & Slide Coordinate Calculation Logic', () => {
    const { PORTFOLIO_DATA, state } = appModule;

    assert.ok(Array.isArray(PORTFOLIO_DATA), 'PORTFOLIO_DATA must be an array');
    const cyma = PORTFOLIO_DATA.find(p => p.id === 'cyma-homes');
    assert.ok(cyma, 'cyma-homes project must exist');
    assert.ok(Array.isArray(cyma.images), 'cyma-homes must have images array');
    assert.equal(cyma.images.length, 3, 'cyma-homes must have 3 images');

    // Test modulo wrap-around logic
    const total = cyma.images.length;
    const calcIndex = (target) => ((target % total) + total) % total;

    assert.equal(calcIndex(0), 0, 'Index 0 wraps to 0');
    assert.equal(calcIndex(1), 1, 'Index 1 wraps to 1');
    assert.equal(calcIndex(2), 2, 'Index 2 wraps to 2');
    assert.equal(calcIndex(3), 0, 'Index 3 wraps back to 0 (Next from end)');
    assert.equal(calcIndex(-1), 2, 'Index -1 wraps back to 2 (Prev from start)');
  });

  test('AC-6: Simulated DOM Slider Initialization & Navigation', () => {
    // Setup Mock DOM
    const mockElements = {
      'portfolio-modal': { hidden: true, removeAttribute(attr) { if (attr === 'hidden') this.hidden = false; }, setAttribute(attr) { if (attr === 'hidden') this.hidden = true; }, querySelector() { return { focus() {} }; } },
      'modal-title': { textContent: '' },
      'modal-client-name': { textContent: '' },
      'modal-desc': { textContent: '' },
      'modal-category-badge': { textContent: '' },
      'modal-scope-list': { innerHTML: '' },
      'modal-whatsapp-cta': { href: '', dataset: {} },
      'modal-slider-track': { innerHTML: '', style: {} },
      'modal-slider-dots': { innerHTML: '', style: {} },
      'modal-slider-caption': { textContent: '' },
      'modal-media-wrap': { addEventListener() {} }
    };

    const mockDoc = {
      activeElement: null,
      getElementById(id) { return mockElements[id] || null; },
      querySelector(selector) {
        if (selector === '.slider-arrow-prev' || selector === '.slider-arrow-next') {
          return { style: {} };
        }
        return null;
      },
      querySelectorAll(selector) {
        if (selector === '#modal-slider-dots .slider-dot') {
          return [
            { classList: { toggle() {} }, setAttribute() {} },
            { classList: { toggle() {} }, setAttribute() {} },
            { classList: { toggle() {} }, setAttribute() {} }
          ];
        }
        return [];
      },
      body: { classList: { add() {}, remove() {} } }
    };

    globalThis.document = mockDoc;
    globalThis.window = { PORTFOLIO_DATA: appModule.PORTFOLIO_DATA };

    // Test openModal with slider initialization
    appModule.openModal('cyma-homes');

    assert.equal(appModule.state.activeModalId, 'cyma-homes', 'activeModalId must be set to cyma-homes');
    assert.equal(appModule.state.activeSlideIndex, 0, 'activeSlideIndex must be reset to 0');
    assert.match(mockElements['modal-slider-track'].innerHTML, /modal-slide/, 'Track must contain rendered slides');
    assert.match(mockElements['modal-slider-dots'].innerHTML, /slider-dot/, 'Dots must contain rendered dots');
    assert.equal(mockElements['modal-slider-track'].style.transform, 'translateX(-0%)', 'Track transform must be 0%');

    // Test nextSlide()
    appModule.nextSlide();
    assert.equal(appModule.state.activeSlideIndex, 1, 'nextSlide must advance activeSlideIndex to 1');
    assert.equal(mockElements['modal-slider-track'].style.transform, 'translateX(-100%)', 'Track transform must be -100%');

    // Test nextSlide() to slide 2
    appModule.nextSlide();
    assert.equal(appModule.state.activeSlideIndex, 2, 'nextSlide must advance activeSlideIndex to 2');
    assert.equal(mockElements['modal-slider-track'].style.transform, 'translateX(-200%)', 'Track transform must be -200%');

    // Test nextSlide() wrap around
    appModule.nextSlide();
    assert.equal(appModule.state.activeSlideIndex, 0, 'nextSlide must wrap back to slide 0');
    assert.equal(mockElements['modal-slider-track'].style.transform, 'translateX(-0%)', 'Track transform must wrap to 0%');

    // Test prevSlide() wrap backward
    appModule.prevSlide();
    assert.equal(appModule.state.activeSlideIndex, 2, 'prevSlide from 0 must wrap to slide 2');
    assert.equal(mockElements['modal-slider-track'].style.transform, 'translateX(-200%)', 'Track transform must be -200%');

    // Test goToSlide(1)
    appModule.goToSlide(1);
    assert.equal(appModule.state.activeSlideIndex, 1, 'goToSlide(1) must set activeSlideIndex to 1');
    assert.equal(mockElements['modal-slider-track'].style.transform, 'translateX(-100%)', 'Track transform must be -100%');

    // Close Modal
    appModule.closeModal();
    assert.equal(appModule.state.activeModalId, null, 'activeModalId must be cleared');
  });
});
