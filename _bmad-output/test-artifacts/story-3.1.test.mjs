import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('Story 3.1: JavaScript Portfolio Data Modeling & Card Grid Layout', () => {
  const htmlPath = path.resolve('index.html');
  const cssPath = path.resolve('styles.css');
  const jsPath = path.resolve('app.js');

  const htmlContent = fs.readFileSync(htmlPath, 'utf8');
  const cssContent = fs.readFileSync(cssPath, 'utf8');
  const jsContent = fs.readFileSync(jsPath, 'utf8');

  test('AC-1: Section #portfolio Landmark & Category Filter Bar (TC-311, TC-312)', () => {
    // Verify #portfolio landmark
    assert.match(htmlContent, /<section[^>]*id="portfolio"[^>]*class="[^"]*portfolio-section[^"]*"/, 'Section #portfolio must have portfolio-section class');
    assert.match(htmlContent, /aria-labelledby="portfolio-title"/, 'Section #portfolio must be labelled by portfolio-title');
    assert.match(htmlContent, /<h2[^>]*id="portfolio-title"[^>]*>Proven Craftsmanship in Action<\/h2>/, 'Section #portfolio must render heading');
    
    // Verify filter bar container and tablist role
    assert.match(htmlContent, /<div[^>]*class="[^"]*portfolio-filter-bar[^"]*"[^>]*role="tablist"/, 'Must contain .portfolio-filter-bar with role="tablist"');
    
    // Verify filter buttons with data-action and data-category
    const expectedFilters = ['all', 'branding', 'publications', 'marketing', 'apparel'];
    expectedFilters.forEach((cat) => {
      assert.match(htmlContent, new RegExp(`data-action="filter-category"\\s+data-category="${cat}"`), `Must contain filter button for ${cat}`);
    });

    // Verify dynamic portfolio grid container
    assert.match(htmlContent, /<div[^>]*class="[^"]*portfolio-grid[^"]*"[^>]*id="portfolio-grid"/, 'Must contain #portfolio-grid container');
  });

  test('AC-2: JavaScript PORTFOLIO_DATA Model & Immutability (TC-311)', () => {
    // Verify PORTFOLIO_DATA definition & Object.freeze
    assert.match(jsContent, /const\s+PORTFOLIO_DATA\s*=\s*Object\.freeze\(\[/, 'PORTFOLIO_DATA must be defined with Object.freeze()');

    // Verify 6 authentic case studies exist in data model
    const expectedProjectIds = [
      'cyma-homes',
      'streetwear-merch',
      'glazing-memoirs',
      'tolw-brochure',
      'skillforge-billboard',
      'oab-foundation'
    ];

    expectedProjectIds.forEach((id) => {
      assert.match(jsContent, new RegExp(`id:\\s*["']${id}["']`), `PORTFOLIO_DATA must include project id '${id}'`);
    });

    // Verify required schema keys are present
    assert.match(jsContent, /category:\s*["']branding["']/, 'Must contain branding category');
    assert.match(jsContent, /category:\s*["']apparel["']/, 'Must contain apparel category');
    assert.match(jsContent, /category:\s*["']publications["']/, 'Must contain publications category');
    assert.match(jsContent, /category:\s*["']marketing["']/, 'Must contain marketing category');
    assert.match(jsContent, /scope:\s*\[/, 'Must contain scope array');
    assert.match(jsContent, /whatsappContext:\s*["']/, 'Must contain whatsappContext identifier');
  });

  test('AC-3: Dynamic DOM Rendering Engine & XSS Sanitization (TC-312, TC-315, TC-316)', () => {
    // Verify escapeHtml utility
    assert.match(jsContent, /function\s+escapeHtml\s*\(/, 'Must define escapeHtml() function');
    assert.match(jsContent, /replace\(\/&\/g,\s*['"]&amp;['"]\)/, 'escapeHtml must sanitize & ampersands');
    assert.match(jsContent, /replace\(\/<\//, 'escapeHtml must sanitize < brackets');
    assert.match(jsContent, /replace\(\/>\//, 'escapeHtml must sanitize > brackets');

    // Verify createPortfolioCardMarkup template generator
    assert.match(jsContent, /function\s+createPortfolioCardMarkup\s*\(/, 'Must define createPortfolioCardMarkup() function');
    assert.match(jsContent, /data-action=["']open-modal["']/, 'Card markup must include data-action="open-modal"');
    assert.match(jsContent, /data-project-id=/, 'Card markup must bind data-project-id');
    assert.match(jsContent, /data-action=["']whatsapp-inquire["']/, 'Card markup must include data-action="whatsapp-inquire"');

    // Verify renderPortfolioCards function and DOMContentLoaded hook
    assert.match(jsContent, /function\s+renderPortfolioCards\s*\(/, 'Must define renderPortfolioCards() function');
    assert.match(jsContent, /document\.addEventListener\(['"]DOMContentLoaded['"],\s*\(\)\s*=>\s*\{[\s\S]*?renderPortfolioCards\(PORTFOLIO_DATA\);/s, 'Must call renderPortfolioCards on DOMContentLoaded');
  });

  test('AC-4: Responsive 2D CSS Grid & Micro-Interaction Styling (TC-313, TC-314, TC-317)', () => {
    // 2D CSS Grid layout
    assert.match(cssContent, /\.portfolio-grid\s*\{[\s\S]*?display:\s*grid;/, '.portfolio-grid must use display: grid');
    assert.match(cssContent, /repeat\(auto-fit,\s*minmax\(320px,\s*1fr\)\)/, '.portfolio-grid must use repeat(auto-fit, minmax(320px, 1fr))');

    // Aspect ratio & media container
    assert.match(cssContent, /\.portfolio-media-wrap\s*\{[\s\S]*?aspect-ratio:\s*16\s*\/\s*10;/, '.portfolio-media-wrap must declare aspect-ratio: 16 / 10');

    // Hover elevation transition
    assert.match(cssContent, /hover: hover[\s\S]*?\.portfolio-card:hover\s*\{[\s\S]*?transform:\s*translateY\(-6px\);/s, '.portfolio-card:hover must elevate with translateY(-6px)');
    assert.match(cssContent, /\.portfolio-card:hover\s*\.portfolio-media-placeholder\s*\{[\s\S]*?transform:\s*scale\(1\.03\);/s, 'Media placeholder must scale slightly on card hover');

    // Focus indicators & button styles
    assert.match(cssContent, /\.filter-btn:focus-visible\s*\{[\s\S]*?outline:\s*3px\s+solid\s+var\(--color-primary\);/, 'Filter buttons must have 3px outline on focus-visible');
  });
});
