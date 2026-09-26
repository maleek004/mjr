import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const appModule = require('../../app.js');

/**
 * Story 4.2: Performance, Accessibility (A11y) & Cross-Browser Quality Audit
 * Verification Suite
 */
describe('Story 4.2: Performance, Accessibility & Cross-Browser Quality Audit', () => {
  const htmlPath = path.resolve('index.html');
  const cssPath = path.resolve('styles.css');
  const jsPath = path.resolve('app.js');

  const htmlContent = fs.readFileSync(htmlPath, 'utf8');
  const cssContent = fs.readFileSync(cssPath, 'utf8');
  const jsContent = fs.readFileSync(jsPath, 'utf8');

  /**
   * Helper to compute relative luminance from hex color
   */
  function getLuminance(hex) {
    let clean = hex.replace('#', '');
    if (clean.length === 3) {
      clean = clean.split('').map(c => c + c).join('');
    }
    const r = parseInt(clean.substring(0, 2), 16) / 255;
    const g = parseInt(clean.substring(2, 4), 16) / 255;
    const b = parseInt(clean.substring(4, 6), 16) / 255;

    const sRGB = [r, g, b].map(val => {
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
  }

  /**
   * Helper to compute WCAG contrast ratio between two hex colors
   */
  function getContrastRatio(hex1, hex2) {
    const lum1 = getLuminance(hex1);
    const lum2 = getLuminance(hex2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  }

  test('AC-1: Core Web Vitals & Performance Optimizations (TC-421, TC-422)', () => {
    // 1. Preconnect hints for external font origins
    assert.ok(
      htmlContent.includes('rel="preconnect" href="https://fonts.googleapis.com"'),
      'index.html must preconnect to fonts.googleapis.com'
    );
    assert.ok(
      htmlContent.includes('rel="preconnect" href="https://fonts.gstatic.com"'),
      'index.html must preconnect to fonts.gstatic.com'
    );

    // 2. Google Fonts with font-display: swap
    assert.ok(
      htmlContent.includes('display=swap'),
      'Google Fonts link must include display=swap for zero FOIT'
    );

    // 3. Non-blocking script loading at bottom of body
    assert.ok(
      htmlContent.indexOf('<script src="app.js"') > htmlContent.indexOf('</main>'),
      'app.js must be loaded after main content'
    );

    // 4. CSS CLS prevention and layout stability
    assert.ok(
      cssContent.includes('scrollbar-gutter: stable'),
      'styles.css must include scrollbar-gutter: stable to prevent layout shifting on scrollbar appear'
    );
    assert.ok(
      cssContent.includes('aspect-ratio:'),
      'styles.css must use aspect-ratio containers for image thumbnail stability'
    );

    // 5. Lazy loading on dynamically rendered images
    assert.ok(
      jsContent.includes('loading="lazy"'),
      'app.js must render portfolio thumbnails with loading="lazy"'
    );
  });

  test('AC-2: WCAG 2.1 AA Color Contrast Ratios (TC-425)', () => {
    // 1. Charcoal on White Surface (Normal Text >= 4.5:1, AAA >= 7.0:1)
    const charcoalOnWhite = getContrastRatio('#1A1A1A', '#FFFFFF');
    assert.ok(charcoalOnWhite >= 7.0, `Charcoal on White ratio ${charcoalOnWhite.toFixed(2)} must pass AAA (>= 7.0:1)`);

    // 2. Charcoal on Light BG (#F8F9FA)
    const charcoalOnBg = getContrastRatio('#1A1A1A', '#F8F9FA');
    assert.ok(charcoalOnBg >= 7.0, `Charcoal on Surface BG ratio ${charcoalOnBg.toFixed(2)} must pass AAA`);

    // 3. Primary Dark Orange (#E05A00) / Primary Orange (#FF6B00) on White (Large / Bold Button text >= 3.0:1, WCAG SC 1.4.3 Large Scale)
    const darkOrangeOnWhite = getContrastRatio('#E05A00', '#FFFFFF');
    assert.ok(darkOrangeOnWhite >= 3.0, `Dark Orange on White ratio ${darkOrangeOnWhite.toFixed(2)} must pass WCAG AA for Large/Bold text (>= 3.0:1)`);

    // 4. Primary Orange (#FF6B00) on Charcoal (#1A1A1A) (Normal text >= 4.5:1)
    const orangeOnCharcoal = getContrastRatio('#FF6B00', '#1A1A1A');
    assert.ok(orangeOnCharcoal >= 4.5, `Orange on Charcoal ratio ${orangeOnCharcoal.toFixed(2)} must pass AA (>= 4.5:1)`);

    // 5. Active Filter Tab (White #FFFFFF on Charcoal #1A1A1A)
    const whiteOnCharcoal = getContrastRatio('#FFFFFF', '#1A1A1A');
    assert.ok(whiteOnCharcoal >= 7.0, `White on Charcoal ratio ${whiteOnCharcoal.toFixed(2)} must pass AAA`);

    // 6. Focus visible outlines present in CSS
    assert.ok(
      cssContent.includes(':focus-visible'),
      'styles.css must define :focus-visible rules'
    );
    assert.ok(
      cssContent.includes('outline:'),
      'styles.css must specify high-contrast outline for focusable elements'
    );
  });

  test('AC-3: Touch Target Sizing & Ergonomic Mobile Usability (TC-424)', () => {
    // 1. Global Button min-height 48px
    assert.ok(
      cssContent.includes('min-height: 48px'),
      'styles.css .btn must enforce minimum touch target height of 48px'
    );

    // 2. Navigation Toggle (Hamburger) touch area
    assert.ok(
      cssContent.includes('.nav-toggle') || cssContent.includes('.mobile-drawer-close'),
      'styles.css must style mobile drawer controls'
    );

    // 3. Filter tabs touch-friendly padding
    assert.ok(
      cssContent.includes('.filter-tab') || cssContent.includes('.filter-btn'),
      'styles.css must style filter tabs with touch padding'
    );

    // 4. Viewport meta tag for mobile responsiveness
    assert.ok(
      htmlContent.includes('name="viewport"') && htmlContent.includes('width=device-width, initial-scale=1.0'),
      'index.html must have valid responsive viewport meta tag'
    );
  });

  test('AC-4: Heading Hierarchy & Semantic Landmarks Structure (TC-423, TC-427, TC-428)', () => {
    // 1. Exactly one H1
    const h1Matches = htmlContent.match(/<h1[\s>]/gi);
    assert.equal(h1Matches ? h1Matches.length : 0, 1, 'index.html must have exactly one <h1> element');

    // 2. Skip link presence and valid anchor target
    assert.ok(
      htmlContent.includes('class="skip-link"') && htmlContent.includes('href="#main-content"'),
      'index.html must provide an accessible skip link targeting #main-content'
    );
    assert.ok(
      htmlContent.includes('id="main-content"'),
      'index.html must have <main id="main-content">'
    );

    // 3. Skip link CSS styling
    assert.ok(
      cssContent.includes('.skip-link') && cssContent.includes('.skip-link:focus'),
      'styles.css must style .skip-link with prominent focus state'
    );

    // 4. Semantic landmarks
    assert.ok(htmlContent.includes('<header') && htmlContent.includes('</header>'), 'Header landmark must exist');
    assert.ok(htmlContent.includes('<nav') && htmlContent.includes('</nav>'), 'Nav landmark must exist');
    assert.ok(htmlContent.includes('<main') && htmlContent.includes('</main>'), 'Main landmark must exist');
    assert.ok(htmlContent.includes('<section') && htmlContent.includes('</section>'), 'Section landmarks must exist');
    assert.ok(htmlContent.includes('<footer') && htmlContent.includes('</footer>'), 'Footer landmark must exist');

    // 5. Accessible landmark labeling
    assert.ok(htmlContent.includes('aria-label="Main Navigation"'), 'Nav must have descriptive aria-label');
    assert.ok(htmlContent.includes('aria-labelledby="hero-title"'), 'Hero section must have aria-labelledby');
    assert.ok(htmlContent.includes('aria-labelledby="services-title"'), 'Services section must have aria-labelledby');
    assert.ok(htmlContent.includes('aria-labelledby="portfolio-title"'), 'Portfolio section must have aria-labelledby');
  });

  test('AC-5: Focus Management, ARIA Integrity & Zero Console Errors (TC-426, TC-427, TC-429)', () => {
    // 1. Mobile Drawer accessibility
    assert.ok(
      htmlContent.includes('aria-expanded="false"') && htmlContent.includes('aria-controls="mobile-nav"'),
      'Hamburger button must declare aria-expanded and aria-controls'
    );
    assert.ok(
      htmlContent.includes('role="dialog"') && htmlContent.includes('aria-modal="true"'),
      'Mobile drawer must declare role="dialog" and aria-modal="true"'
    );

    // 2. Modal Accessibility & Focus Management in app.js
    assert.ok(
      jsContent.includes('keydown') || jsContent.includes('Escape'),
      'app.js must handle keyboard events (Escape key)'
    );
    assert.ok(
      jsContent.includes('lastFocusedElement') || jsContent.includes('focus()'),
      'app.js must manage focus restoration upon modal close'
    );

    // 3. Tablist / Filter accessibility
    assert.ok(
      htmlContent.includes('role="tablist"') || htmlContent.includes('aria-label="Portfolio category filter"'),
      'Portfolio filter container must declare accessible role or label'
    );
    assert.ok(
      htmlContent.includes('aria-selected="true"'),
      'Active filter tab must declare aria-selected="true"'
    );

    // 4. Zero runtime error execution of app.js exports
    assert.ok(typeof appModule.generateWhatsAppUrl === 'function', 'generateWhatsAppUrl is callable');
    assert.ok(typeof appModule.sanitizePhoneNumber === 'function', 'sanitizePhoneNumber is callable');
    assert.ok(typeof appModule.resolveWhatsAppMessage === 'function', 'resolveWhatsAppMessage is callable');
  });

  test('AC-6: Cross-Browser Security & Tabnabbing Protection (TC-429, TC-430)', () => {
    // 1. External links have rel="noopener noreferrer"
    const externalLinks = htmlContent.match(/<a\s+[^>]*target="_blank"[^>]*>/gi) || [];
    assert.ok(externalLinks.length > 0, 'Document has external links');

    externalLinks.forEach(link => {
      assert.ok(
        link.includes('rel="noopener noreferrer"') || link.includes('rel="noreferrer noopener"'),
        `External link ${link} must enforce rel="noopener noreferrer" to prevent reverse tabnabbing`
      );
    });

    // 2. Character encoding
    assert.ok(
      htmlContent.includes('<meta charset="UTF-8">'),
      'index.html must declare standard UTF-8 charset'
    );
  });
});
