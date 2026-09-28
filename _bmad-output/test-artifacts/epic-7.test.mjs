import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import appModule from '../../app.js';

const {
  PRICING_MODEL,
  calculateEstimate,
  calculateVolumeDiscount,
  formatCurrency,
  generateCalculatorWhatsAppText,
  calculatorState,
  setCalculatorProduct,
  setCalculatorQuantity,
  updateCalculatorSummary
} = appModule;

const projectRoot = process.cwd();
const htmlPath = path.join(projectRoot, 'index.html');
const cssPath = path.join(projectRoot, 'styles.css');
const jsPath = path.join(projectRoot, 'app.js');

const htmlContent = fs.readFileSync(htmlPath, 'utf8');
const cssContent = fs.readFileSync(cssPath, 'utf8');
const jsContent = fs.readFileSync(jsPath, 'utf8');

test('Epic 7: Interactive Print Estimator & WhatsApp Quote Engine', async (t) => {
  await t.test('Story 7.1: PRICING_MODEL Engine Data Modeling & Calculation Rules', () => {
    assert.match(jsContent, /const\s+PRICING_MODEL\s*=/i, 'PRICING_MODEL must be defined in app.js');
    assert.ok(PRICING_MODEL['business-cards'], 'PRICING_MODEL must support business cards');
    assert.ok(PRICING_MODEL['brochures'], 'PRICING_MODEL must support brochures');
    assert.ok(PRICING_MODEL['t-shirts'], 'PRICING_MODEL must support t-shirts');
    assert.ok(PRICING_MODEL['banners'], 'PRICING_MODEL must support banners');
    
    // Check deep immutability
    assert.ok(Object.isFrozen(PRICING_MODEL), 'PRICING_MODEL must be frozen');
    assert.ok(Object.isFrozen(PRICING_MODEL['business-cards']), 'Product definitions must be frozen');
  });

  await t.test('Story 7.2: Semantic Section Landmark & Accessible HTML5 Calculator', () => {
    assert.match(htmlContent, /<section[^>]+id="calculator"[^>]*class="[^"]*calculator-section/i, 'index.html must contain #calculator section');
    assert.match(htmlContent, /href="#calculator"/i, 'Header nav and/or drawer must link to #calculator');
    assert.match(htmlContent, /class="calc-product-tabs"/i, 'Calculator must include product selection tabs');
    assert.match(htmlContent, /id="calc-quantity-range"/i, 'Calculator must include quantity range slider');
    assert.match(htmlContent, /id="calc-quantity"/i, 'Calculator must include numeric quantity input');
    assert.match(htmlContent, /id="calc-total-amount"/i, 'Calculator must include total amount container');
    assert.match(htmlContent, /data-action="calc-whatsapp-inquire"|id="calc-whatsapp-btn"/i, 'Calculator must include WhatsApp quote CTA');
    assert.match(htmlContent, /aria-live="polite"/i, 'Dynamic total/summary must have aria-live="polite" for accessibility');
  });

  await t.test('Story 7.2: CSS Architecture & Responsive Layout in styles.css', () => {
    assert.match(cssContent, /\.calculator-section/i, 'styles.css must style .calculator-section');
    assert.match(cssContent, /\.calc-grid/i, 'styles.css must contain responsive calculator grid');
    assert.match(cssContent, /\.calc-summary-card/i, 'styles.css must style summary card');
    assert.match(cssContent, /var\(--color-primary\)/i, 'Calculator must use design tokens for primary color');
  });

  await t.test('Story 7.3: Reactive Calculator State & Calculation Correctness', () => {
    // 1. Test Business Cards calculation with volume discount
    const bcEstimate = calculateEstimate({
      productId: 'business-cards',
      quantity: 500,
      options: { sides: 'double', finish: 'matte' },
      isRush: false
    });
    assert.ok(bcEstimate.finalTotal > 0, 'Business cards total should be positive');
    assert.equal(bcEstimate.quantity, 500, 'Quantity should be 500');
    assert.equal(bcEstimate.discountRate, 0.15, '500 business cards should have 15% discount');
    assert.equal(bcEstimate.isRush, false);

    // 2. Test Rush turnaround surcharge (+25%)
    const rushEstimate = calculateEstimate({
      productId: 'business-cards',
      quantity: 500,
      options: { sides: 'double', finish: 'matte' },
      isRush: true
    });
    assert.ok(rushEstimate.finalTotal > bcEstimate.finalTotal, 'Rush fee should increase the final price');
    assert.equal(rushEstimate.isRush, true);
    assert.ok(rushEstimate.rushFee > 0, 'Rush fee should be positive');

    // 3. Test Brochures calculation (250 units, 16pp)
    const brochureEstimate = calculateEstimate({
      productId: 'brochures',
      quantity: 250,
      options: { pages: '16pp', lamination: 'matte' },
      isRush: false
    });
    assert.ok(brochureEstimate.finalTotal > 0, 'Brochure estimate should be positive');
    assert.equal(brochureEstimate.discountRate, 0.12, '250 brochures should have 12% discount');

    // 4. Test Currency Formatter
    const formatted = formatCurrency(185000);
    assert.match(formatted, /185[,\.]000/, 'Currency should format 185,000 correctly');

    // 5. Test WhatsApp message generator
    const waMessage = generateCalculatorWhatsAppText({
      productId: 'brochures',
      quantity: 250,
      options: { pages: '16pp', lamination: 'matte' },
      isRush: false,
      estimate: brochureEstimate
    });
    assert.match(waMessage, /MJr Designs/i, 'WhatsApp text should include brand greeting');
    assert.match(waMessage, /Brochures/i, 'WhatsApp text should mention configured product');
    assert.match(waMessage, /250/i, 'WhatsApp text should mention quantity');
    assert.match(waMessage, /Estimated Total/i, 'WhatsApp text should include estimated total line');
  });
});
