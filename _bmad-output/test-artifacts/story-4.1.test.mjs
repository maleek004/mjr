import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const appModule = require('../../app.js');

describe('Story 4.1: Centralized WhatsApp URL Generator & Context Engine', () => {
  const htmlPath = path.resolve('index.html');
  const cssPath = path.resolve('styles.css');
  const jsPath = path.resolve('app.js');

  const htmlContent = fs.readFileSync(htmlPath, 'utf8');
  const cssContent = fs.readFileSync(cssPath, 'utf8');
  const jsContent = fs.readFileSync(jsPath, 'utf8');

  test('AC-1: WhatsApp Constants & Configuration (TC-411, TC-413)', () => {
    assert.ok(appModule.WHATSAPP_CONFIG, 'app.js must export WHATSAPP_CONFIG');
    assert.equal(appModule.WHATSAPP_CONFIG.defaultPhone, '2348106246748', 'defaultPhone must be 2348106246748');
    assert.equal(appModule.WHATSAPP_CONFIG.baseUrl, 'https://wa.me/', 'baseUrl must be https://wa.me/');

    assert.ok(appModule.WHATSAPP_TEMPLATES, 'app.js must export WHATSAPP_TEMPLATES');
    assert.ok(typeof appModule.WHATSAPP_TEMPLATES.hero === 'string', 'Must define hero template');
    assert.ok(typeof appModule.WHATSAPP_TEMPLATES['header-nav'] === 'string', 'Must define header-nav template');
    assert.ok(typeof appModule.WHATSAPP_TEMPLATES['brand-identity'] === 'string', 'Must define brand-identity template');
    assert.ok(typeof appModule.WHATSAPP_TEMPLATES['marketing-ads'] === 'string', 'Must define marketing-ads template');
    assert.ok(typeof appModule.WHATSAPP_TEMPLATES['print-production'] === 'string', 'Must define print-production template');
    assert.ok(typeof appModule.WHATSAPP_TEMPLATES['custom-apparel'] === 'string', 'Must define custom-apparel template');
    assert.ok(typeof appModule.WHATSAPP_TEMPLATES.modal === 'string', 'Must define modal template with {projectTitle}');
    assert.ok(typeof appModule.WHATSAPP_TEMPLATES.footer === 'string', 'Must define footer template');
    assert.ok(typeof appModule.WHATSAPP_TEMPLATES.default === 'string', 'Must define default fallback template');
  });

  test('AC-2: sanitizePhoneNumber Function (TC-411, TC-417)', () => {
    const { sanitizePhoneNumber } = appModule;
    assert.ok(typeof sanitizePhoneNumber === 'function', 'sanitizePhoneNumber must be exported as a function');

    assert.equal(sanitizePhoneNumber('+234 810 624 6748'), '2348106246748');
    assert.equal(sanitizePhoneNumber('+234-810-624-6748'), '2348106246748');
    assert.equal(sanitizePhoneNumber('2348106246748'), '2348106246748');
    assert.equal(sanitizePhoneNumber(''), '2348106246748', 'Empty string must fallback to default phone');
    assert.equal(sanitizePhoneNumber(null), '2348106246748', 'Null must fallback to default phone');
    assert.equal(sanitizePhoneNumber(undefined), '2348106246748', 'Undefined must fallback to default phone');
  });

  test('AC-3: resolveWhatsAppMessage Function (TC-412, TC-417)', () => {
    const { resolveWhatsAppMessage, WHATSAPP_TEMPLATES } = appModule;
    assert.ok(typeof resolveWhatsAppMessage === 'function', 'resolveWhatsAppMessage must be exported');

    assert.equal(resolveWhatsAppMessage('hero'), WHATSAPP_TEMPLATES.hero);
    assert.equal(resolveWhatsAppMessage('header-nav'), WHATSAPP_TEMPLATES['header-nav']);
    assert.equal(resolveWhatsAppMessage('brand-identity'), WHATSAPP_TEMPLATES['brand-identity']);
    assert.equal(resolveWhatsAppMessage('marketing-ads'), WHATSAPP_TEMPLATES['marketing-ads']);
    assert.equal(resolveWhatsAppMessage('print-production'), WHATSAPP_TEMPLATES['print-production']);
    assert.equal(resolveWhatsAppMessage('custom-apparel'), WHATSAPP_TEMPLATES['custom-apparel']);
    assert.equal(resolveWhatsAppMessage('footer'), WHATSAPP_TEMPLATES.footer);

    // Modal template interpolation
    const modalInterpolated = resolveWhatsAppMessage('modal', { projectTitle: 'CYMA HOMES Limited' });
    assert.equal(
      modalInterpolated,
      'Hello MJr Designs, I saw your CYMA HOMES Limited case study and would like to discuss a similar project.'
    );

    const modalDefaultTitle = resolveWhatsAppMessage('modal');
    assert.equal(
      modalDefaultTitle,
      'Hello MJr Designs, I saw your featured case study and would like to discuss a similar project.'
    );

    // Fallbacks
    assert.equal(resolveWhatsAppMessage('non-existent-key'), WHATSAPP_TEMPLATES.default);
    assert.equal(resolveWhatsAppMessage(''), WHATSAPP_TEMPLATES.default);
    assert.equal(resolveWhatsAppMessage(null), WHATSAPP_TEMPLATES.default);
    assert.equal(resolveWhatsAppMessage(undefined), WHATSAPP_TEMPLATES.default);
  });

  test('AC-4: generateWhatsAppUrl RFC 3986 Construction & Sanitization (TC-413, TC-417)', () => {
    const { generateWhatsAppUrl, WHATSAPP_TEMPLATES } = appModule;
    assert.ok(typeof generateWhatsAppUrl === 'function', 'generateWhatsAppUrl must be exported');

    // Hero URL
    const heroUrl = generateWhatsAppUrl('2348106246748', 'hero');
    const expectedHeroText = encodeURIComponent(WHATSAPP_TEMPLATES.hero);
    assert.equal(heroUrl, `https://wa.me/2348106246748?text=${expectedHeroText}`);

    // Modal URL with interpolation
    const modalUrl = generateWhatsAppUrl('+234 810-624-6748', 'modal', { projectTitle: 'Tour of Lagos Waterways (TOLW)' });
    const expectedModalMsg = encodeURIComponent('Hello MJr Designs, I saw your Tour of Lagos Waterways (TOLW) case study and would like to discuss a similar project.');
    assert.equal(modalUrl, `https://wa.me/2348106246748?text=${expectedModalMsg}`);

    // Fallback URL
    const fallbackUrl = generateWhatsAppUrl();
    const expectedDefault = encodeURIComponent(WHATSAPP_TEMPLATES.default);
    assert.equal(fallbackUrl, `https://wa.me/2348106246748?text=${expectedDefault}`);
  });

  test('AC-5: Centralized Event Delegation & Action Routing in app.js (TC-414, TC-415)', () => {
    assert.match(
      jsContent,
      /case\s+['"]whatsapp-inquire['"]\s*:/,
      'app.js must include case "whatsapp-inquire" in root event delegation switch'
    );

    assert.match(
      jsContent,
      /handleWhatsAppInquiry\s*\(\s*actionEl\s*\)/,
      'app.js must call handleWhatsAppInquiry(actionEl)'
    );

    assert.ok(typeof appModule.handleWhatsAppInquiry === 'function', 'handleWhatsAppInquiry must be exported');
  });

  test('AC-6: Semantic HTML5 Markup Attributes across All Landmarks (TC-414, TC-415, TC-416)', () => {
    // Header CTA
    assert.match(
      htmlContent,
      /<a[^>]*class="[^"]*nav-cta-btn[^"]*"[^>]*data-action="whatsapp-inquire"[^>]*data-context="header-nav"/,
      'Header CTA must declare data-action="whatsapp-inquire" and data-context="header-nav"'
    );

    // Hero Primary CTA
    assert.match(
      htmlContent,
      /<a[^>]*id="hero-cta"[^>]*data-action="whatsapp-inquire"[^>]*data-context="hero"/,
      'Hero CTA must declare data-action="whatsapp-inquire" and data-context="hero"'
    );

    // Service Pillar 1 (Brand Identity)
    assert.match(
      htmlContent,
      /<a[^>]*data-action="whatsapp-inquire"[^>]*data-context="brand-identity"/,
      'Service Pillar 1 must declare data-action="whatsapp-inquire" and data-context="brand-identity"'
    );

    // Service Pillar 2 (Marketing & Advertising)
    assert.match(
      htmlContent,
      /<a[^>]*data-action="whatsapp-inquire"[^>]*data-context="marketing-ads"/,
      'Service Pillar 2 must declare data-action="whatsapp-inquire" and data-context="marketing-ads"'
    );

    // Service Pillar 3 (Print Production)
    assert.match(
      htmlContent,
      /<a[^>]*data-action="whatsapp-inquire"[^>]*data-context="print-production"/,
      'Service Pillar 3 must declare data-action="whatsapp-inquire" and data-context="print-production"'
    );

    // Service Pillar 4 (Custom Apparel)
    assert.match(
      htmlContent,
      /<a[^>]*data-action="whatsapp-inquire"[^>]*data-context="custom-apparel"/,
      'Service Pillar 4 must declare data-action="whatsapp-inquire" and data-context="custom-apparel"'
    );

    // Modal CTA
    assert.match(
      htmlContent,
      /<a[^>]*id="modal-whatsapp-cta"[^>]*data-action="whatsapp-inquire"[^>]*data-context="modal"/,
      'Modal WhatsApp CTA must declare data-action="whatsapp-inquire" and data-context="modal"'
    );

    // Footer WhatsApp Link
    assert.match(
      htmlContent,
      /<a[^>]*id="footer-whatsapp-link"[^>]*data-action="whatsapp-inquire"[^>]*data-context="footer"/,
      'Footer contact link must declare data-action="whatsapp-inquire" and data-context="footer"'
    );
  });

  test('AC-7: Security & Tabnabbing Protection', () => {
    // Check that all external whatsapp links have target="_blank" and rel="noopener noreferrer"
    const waAnchorRegex = /<a[^>]+href="https:\/\/wa\.me[^"]*"[^>]*>/g;
    const matches = htmlContent.match(waAnchorRegex) || [];
    assert.ok(matches.length > 0, 'Found WhatsApp anchor links in HTML');

    for (const match of matches) {
      assert.match(match, /target="_blank"/, `Link ${match} must specify target="_blank"`);
      assert.match(match, /rel="noopener noreferrer"/, `Link ${match} must specify rel="noopener noreferrer"`);
    }
  });
});
