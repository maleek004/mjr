import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import adminModule from '../../admin.js';

const {
  adminState,
  FACTORY_DEFAULTS,
  generateES6PricingCode,
  calculateAdminSandbox,
  exportPricingJson,
  importPricingJson,
  saveLocalPricing,
  resetToBaseline
} = adminModule;

const projectRoot = process.cwd();
const adminHtmlPath = path.join(projectRoot, 'admin.html');
const adminCssPath = path.join(projectRoot, 'admin.css');
const adminJsPath = path.join(projectRoot, 'admin.js');
const appJsPath = path.join(projectRoot, 'app.js');
const indexHtmlPath = path.join(projectRoot, 'index.html');

test('Epic 8: Standalone Admin Pricing Center & Visual Code Configurator', async (t) => {
  await t.test('Story 8.1: Standalone admin.html Markup & admin.css Dashboard Styling', () => {
    assert.ok(fs.existsSync(adminHtmlPath), 'admin.html must exist on disk');
    assert.ok(fs.existsSync(adminCssPath), 'admin.css must exist on disk');
    assert.ok(fs.existsSync(adminJsPath), 'admin.js must exist on disk');

    const adminHtml = fs.readFileSync(adminHtmlPath, 'utf8');
    const adminCss = fs.readFileSync(adminCssPath, 'utf8');

    assert.match(adminHtml, /<!DOCTYPE\s+html>/i, 'admin.html must have valid doctype');
    assert.match(adminHtml, /href="index\.html"/i, 'admin.html must have link back to index.html');
    assert.match(adminHtml, /id="admin-product-tabs"|class="admin-tab/i, 'admin.html must have product selection tabs');
    assert.match(adminHtml, /id="admin-sandbox"|class="admin-sandbox/i, 'admin.html must have live simulation sandbox');
    assert.match(adminHtml, /data-action="copy-es6-code"|id="btn-copy-code"/i, 'admin.html must have ES6 code generator trigger');

    assert.match(adminCss, /\.admin-/i, 'admin.css must contain admin class styles');
    assert.match(adminCss, /var\(--color-primary/i, 'admin.css must reuse design tokens');
  });

  await t.test('Story 8.2: Dynamic Admin State & Simulation Calculations in admin.js', () => {
    assert.ok(FACTORY_DEFAULTS['business-cards'], 'Factory defaults must contain business cards');
    assert.ok(FACTORY_DEFAULTS['brochures'], 'Factory defaults must contain brochures');
    assert.ok(FACTORY_DEFAULTS['t-shirts'], 'Factory defaults must contain t-shirts');
    assert.ok(FACTORY_DEFAULTS['banners'], 'Factory defaults must contain banners');

    // Test code generation output
    const code = generateES6PricingCode(FACTORY_DEFAULTS);
    assert.match(code, /const\s+PRICING_MODEL\s*=\s*Object\.freeze/i, 'Generated code must declare frozen PRICING_MODEL');
    assert.match(code, /'business-cards':\s*Object\.freeze/i, 'Generated code must freeze individual products');
    assert.match(code, /unitBasePrice:\s*85/i, 'Generated code must contain unitBasePrice');
    assert.match(code, /discounts:\s*\[/i, 'Generated code must serialize volume discount arrays');
  });

  await t.test('Story 8.3: LocalStorage Override Support in app.js and Link in index.html', () => {
    const appJs = fs.readFileSync(appJsPath, 'utf8');
    const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

    assert.match(appJs, /mjr_custom_pricing|localStorage/i, 'app.js must check localStorage for custom pricing overrides');
    assert.match(indexHtml, /href="admin\.html"/i, 'index.html footer must link to admin.html');
  });
});
