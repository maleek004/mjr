import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const appModule = require('../../app.js');

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

  test('AC-2: JavaScript PORTFOLIO_DATA Model & Deep Immutability (TC-311)', () => {
    const { PORTFOLIO_DATA } = appModule;
    assert.ok(Array.isArray(PORTFOLIO_DATA), 'PORTFOLIO_DATA must be an array');
    assert.equal(PORTFOLIO_DATA.length, 6, 'PORTFOLIO_DATA must contain exactly 6 case studies');
    assert.ok(Object.isFrozen(PORTFOLIO_DATA), 'PORTFOLIO_DATA array must be frozen');

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
      const project = PORTFOLIO_DATA.find(p => p.id === id);
      assert.ok(project, `PORTFOLIO_DATA must include project id '${id}'`);
      assert.ok(Object.isFrozen(project), `Project '${id}' must be deeply frozen`);
      assert.ok(Object.isFrozen(project.scope), `Project '${id}'.scope must be frozen`);
      assert.ok(typeof project.title === 'string' && project.title.length > 0, `Project '${id}' must have valid title`);
      assert.ok(Array.isArray(project.scope) && project.scope.length > 0, `Project '${id}' must have valid scope tags`);
      assert.ok(typeof project.whatsappContext === 'string' && project.whatsappContext.length > 0, `Project '${id}' must have whatsappContext`);
    });
  });

  test('AC-3: Dynamic DOM Rendering Engine, Markup Generation & XSS Sanitization (TC-312, TC-315, TC-316)', () => {
    const { escapeHtml, createPortfolioCardMarkup, PORTFOLIO_DATA } = appModule;

    // Direct runtime unit test for escapeHtml
    assert.equal(escapeHtml('<script>alert("xss") & \'test\'</script>'), '&lt;script&gt;alert(&quot;xss&quot;) &amp; &#039;test&#039;&lt;/script&gt;');
    assert.equal(escapeHtml(null), '');
    assert.equal(escapeHtml(undefined), '');

    // Direct runtime unit test for createPortfolioCardMarkup
    const sampleProject = PORTFOLIO_DATA[0];
    const markup = createPortfolioCardMarkup(sampleProject);

    assert.ok(markup.includes(`data-project-id="${sampleProject.id}"`), 'Card markup must include data-project-id');
    assert.ok(markup.includes(`data-category="${sampleProject.category}"`), 'Card markup must include data-category');
    assert.ok(markup.includes(`data-action="open-modal"`), 'Card markup must include data-action="open-modal"');
    assert.ok(markup.includes(`data-action="whatsapp-inquire"`), 'Card markup must include data-action="whatsapp-inquire"');
    assert.ok(markup.includes(sampleProject.title), 'Card markup must contain project title');

    sampleProject.scope.forEach(tag => {
      assert.ok(markup.includes(`#${escapeHtml(tag)}`), `Card markup must include #${tag} chip`);
    });

    // Defensive handling of malformed input
    assert.equal(createPortfolioCardMarkup(null), '');
    assert.equal(createPortfolioCardMarkup(undefined), '');
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

    // Focus indicators & button touch target standards
    assert.match(cssContent, /\.filter-btn\s*\{[\s\S]*?min-height:\s*48px;/, 'Filter buttons must satisfy 48px touch target standard');
    assert.match(cssContent, /\.filter-btn:focus-visible\s*\{[\s\S]*?outline:\s*3px\s+solid\s+var\(--color-primary\);/, 'Filter buttons must have 3px outline on focus-visible');

    // Reduced motion support
    assert.match(cssContent, /prefers-reduced-motion:\s*reduce[\s\S]*?\.portfolio-card[\s\S]*?transition:\s*none/s, 'prefers-reduced-motion must disable transitions on .portfolio-card');
  });
});
