import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const stylesCssPath = path.join(projectRoot, 'styles.css');
const appJsPath = path.join(projectRoot, 'app.js');
const indexHtmlPath = path.join(projectRoot, 'index.html');

test('Epic 9: Mobile Viewport Horizontalization & Zero-Fatigue Swipe Layouts', async (t) => {
  const stylesCss = fs.readFileSync(stylesCssPath, 'utf8');
  const appJs = fs.readFileSync(appJsPath, 'utf8');
  const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

  await t.test('Story 9.1: Portfolio Section Horizontal Scroll-Snap Card Rail', () => {
    // 1. Check styles.css for mobile scroll-snap track on .portfolio-grid
    assert.match(stylesCss, /\.portfolio-grid\s*\{[^}]*scroll-snap-type:\s*x\s+mandatory/i, 'portfolio-grid must have x mandatory scroll snap');
    assert.match(stylesCss, /\.portfolio-grid\s*\{[^}]*overflow-x:\s*auto/i, 'portfolio-grid must enable horizontal scrolling');
    assert.match(stylesCss, /\.portfolio-grid\s*\{[^}]*display:\s*flex/i, 'portfolio-grid must use flex layout for horizontal single-row track');

    // 2. Check styles.css for .portfolio-card peek width and center snap
    assert.match(stylesCss, /\.portfolio-card\s*\{[^}]*scroll-snap-align:\s*center/i, 'portfolio-card must align center on snap');
    assert.match(stylesCss, /\.portfolio-card\s*\{[^}]*85vw/i, 'portfolio-card must use 85vw width formula for peek affordance');

    // 3. Check desktop media query restoration
    assert.match(stylesCss, /@media\s*\(\s*min-width:\s*768px\s*\)\s*\{[^}]*\.portfolio-grid\s*\{[^}]*display:\s*grid/i, 'portfolio-grid must restore 2D CSS grid at >=768px');

    // 4. Check index.html for mobile swipe hint affordance
    assert.match(indexHtml, /<section id="portfolio"[^>]*>[\s\S]*?<div class="mobile-swipe-hint"/i, 'portfolio section must contain mobile swipe hint badge');

    // 5. Check app.js for horizontal scroll reset on category filtering
    assert.match(appJs, /filterPortfolio[\s\S]*?portfolio-grid[\s\S]*?(scrollTo|scrollLeft)/i, 'filterPortfolio must reset horizontal scroll position on grid');
  });

  await t.test('Story 9.2: Services 4-Pillar Horizontal Carousel with Snap Points', () => {
    // 1. Check styles.css for mobile scroll-snap carousel on .services-grid
    assert.match(stylesCss, /\.services-grid\s*\{[^}]*scroll-snap-type:\s*x\s+mandatory/i, 'services-grid must have x mandatory scroll snap');
    assert.match(stylesCss, /\.services-grid\s*\{[^}]*overflow-x:\s*auto/i, 'services-grid must enable horizontal scrolling');
    assert.match(stylesCss, /\.services-grid\s*\{[^}]*display:\s*flex/i, 'services-grid must use flex layout for mobile row carousel');

    // 2. Check styles.css for .service-card peek sizing
    assert.match(stylesCss, /\.service-card\s*\{[^}]*scroll-snap-align:\s*center/i, 'service-card must align center on snap');
    assert.match(stylesCss, /\.service-card\s*\{[^}]*85vw/i, 'service-card must use 85vw width formula for mobile peek');

    // 3. Check desktop media query restoration
    assert.match(stylesCss, /@media\s*\(\s*min-width:\s*768px\s*\)\s*\{[^}]*\.services-grid\s*\{[^}]*display:\s*grid/i, 'services-grid must restore 4-column grid at >=768px');

    // 4. Check index.html for mobile swipe hint affordance
    assert.match(indexHtml, /<section id="services"[^>]*>[\s\S]*?<div class="mobile-swipe-hint"/i, 'services section must contain mobile swipe hint badge');

    // 5. Check mobile swipe hint hiding on desktop
    assert.match(stylesCss, /@media\s*\(\s*min-width:\s*768px\s*\)\s*\{[^}]*\.mobile-swipe-hint\s*\{[^}]*display:\s*none\s*!important/i, 'mobile swipe hint must hide on desktop');
  });

  await t.test('Story 9.3: Client Trust Matrix Horizontal Scroll-Snap Rail', () => {
    // 1. Check styles.css for mobile scroll-snap track on .client-trust-grid
    assert.match(stylesCss, /\.client-trust-grid\s*\{[^}]*scroll-snap-type:\s*x\s+mandatory/i, 'client-trust-grid must have x mandatory scroll snap');
    assert.match(stylesCss, /\.client-trust-grid\s*\{[^}]*overflow-x:\s*auto/i, 'client-trust-grid must enable horizontal scrolling');
    assert.match(stylesCss, /\.client-trust-grid\s*\{[^}]*display:\s*flex/i, 'client-trust-grid must use flex layout for mobile row');

    // 2. Check styles.css for .client-card peek width and center snap
    assert.match(stylesCss, /\.client-card\s*\{[^}]*scroll-snap-align:\s*center/i, 'client-card must align center on snap');
    assert.match(stylesCss, /\.client-card\s*\{[^}]*60vw/i, 'client-card must use 60vw width formula for peek affordance');

    // 3. Check desktop media query restoration
    assert.match(stylesCss, /@media\s*\(\s*min-width:\s*640px\s*\)\s*\{[^}]*\.client-trust-grid\s*\{[^}]*display:\s*grid/i, 'client-trust-grid must restore 2D CSS grid at >=640px');

    // 4. Check index.html for mobile swipe hint in about section
    assert.match(indexHtml, /<section id="about"[^>]*>[\s\S]*?<div class="mobile-swipe-hint"/i, 'about section must contain mobile swipe hint badge');
  });

  await t.test('Story 9.4: Hero Metrics & Calculator Product Tabs Horizontal Snap Rail', () => {
    // 1. Check styles.css for hero-proof-metrics horizontal track
    assert.match(stylesCss, /\.hero-proof-metrics\s*\{[^}]*scroll-snap-type:\s*x\s+mandatory/i, 'hero-proof-metrics must have x mandatory scroll snap');
    assert.match(stylesCss, /\.hero-proof-metrics\s*\{[^}]*overflow-x:\s*auto/i, 'hero-proof-metrics must enable horizontal scrolling');
    assert.match(stylesCss, /\.proof-metric-card\s*\{[^}]*scroll-snap-align:\s*center/i, 'proof-metric-card must align center on snap');
    assert.match(stylesCss, /@media\s*\(\s*min-width:\s*640px\s*\)\s*\{[^}]*\.hero-proof-metrics\s*\{[^}]*display:\s*grid/i, 'hero-proof-metrics must restore 3-column grid at >=640px');

    // 2. Check styles.css for calc-product-tabs horizontal track
    assert.match(stylesCss, /\.calc-product-tabs\s*\{[^}]*scroll-snap-type:\s*x\s+mandatory/i, 'calc-product-tabs must have x mandatory scroll snap');
    assert.match(stylesCss, /\.calc-product-tabs\s*\{[^}]*overflow-x:\s*auto/i, 'calc-product-tabs must enable horizontal scrolling');
    assert.match(stylesCss, /\.calc-product-tab\s*\{[^}]*scroll-snap-align:\s*start/i, 'calc-product-tab must snap to start');
    assert.match(stylesCss, /@media\s*\(\s*min-width:\s*640px\s*\)\s*\{[^}]*\.calc-product-tabs\s*\{[^}]*display:\s*grid/i, 'calc-product-tabs must restore 4-column grid at >=640px');
  });
});
