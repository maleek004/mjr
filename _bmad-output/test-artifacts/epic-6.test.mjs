import { test, describe, before } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

// Import app.js modules for testing
import appModule from '../../app.js';
const {
  PORTFOLIO_DATA,
  filterPortfolio,
  openModal,
  state
} = appModule;

const ROOT_DIR = path.resolve('.');
const HTML_PATH = path.join(ROOT_DIR, 'index.html');
const CSS_PATH = path.join(ROOT_DIR, 'styles.css');

describe('Epic 6: Proof-First Conversion Architecture & Mobile Layout Optimization', () => {
  let htmlContent = '';
  let cssContent = '';

  before(() => {
    htmlContent = fs.readFileSync(HTML_PATH, 'utf-8');
    cssContent = fs.readFileSync(CSS_PATH, 'utf-8');
  });

  test('Story 6.1: Semantic Section Landmark Inversion (Hero -> Portfolio -> Services)', () => {
    // Check positions of section landmarks in main
    const heroIndex = htmlContent.indexOf('<section id="hero"');
    const portfolioIndex = htmlContent.indexOf('<section id="portfolio"');
    const servicesIndex = htmlContent.indexOf('<section id="services"');
    const aboutIndex = htmlContent.indexOf('<section id="about"');
    const contactIndex = htmlContent.indexOf('<section id="contact"');

    assert.ok(heroIndex !== -1, 'Hero section must exist');
    assert.ok(portfolioIndex !== -1, 'Portfolio section must exist');
    assert.ok(servicesIndex !== -1, 'Services section must exist');
    assert.ok(aboutIndex !== -1, 'About section must exist');
    assert.ok(contactIndex !== -1, 'Contact section must exist');

    assert.ok(heroIndex < portfolioIndex, '#portfolio must follow #hero');
    assert.ok(portfolioIndex < servicesIndex, '#services must follow #portfolio');
    assert.ok(servicesIndex < aboutIndex, '#about must follow #services');
    assert.ok(aboutIndex < contactIndex, '#contact must follow #about');

    // Desktop nav link order
    assert.match(
      htmlContent,
      /<nav[^>]*class=["']site-nav["'][^>]*>[\s\S]*href=["']#portfolio["'][\s\S]*href=["']#services["'][\s\S]*href=["']#about["'][\s\S]*href=["']#contact["']/
    );

    // Mobile drawer nav link order
    assert.match(
      htmlContent,
      /<div[^>]*id=["']mobile-nav["'][^>]*>[\s\S]*href=["']#portfolio["'][\s\S]*href=["']#services["'][\s\S]*href=["']#about["'][\s\S]*href=["']#contact["']/
    );
  });

  test('Story 6.2: Service Cards Cross-Linking to Category Filters', () => {
    // 1. Check jump-to-category buttons exist on service cards
    assert.match(htmlContent, /data-action=["']jump-to-category["'][^>]*data-category=["']branding["']/);
    assert.match(htmlContent, /data-action=["']jump-to-category["'][^>]*data-category=["']marketing["']/);
    assert.match(htmlContent, /data-action=["']jump-to-category["'][^>]*data-category=["']publications["']/);
    assert.match(htmlContent, /data-action=["']jump-to-category["'][^>]*data-category=["']apparel["']/);

    // 2. CSS classes for service actions & jump buttons
    assert.match(cssContent, /\.service-actions\s*\{[^}]*display:\s*flex/);
    assert.match(cssContent, /\.service-jump-btn\s*\{[^}]*cursor:\s*pointer/);

    // 3. Functional category filter test
    filterPortfolio('branding');
    assert.equal(state.activeFilter, 'branding', 'filterPortfolio should set activeFilter to branding');

    filterPortfolio('apparel');
    assert.equal(state.activeFilter, 'apparel', 'filterPortfolio should set activeFilter to apparel');
  });

  test('Story 6.3: Zero-Scroll Featured Proof Peek Strip in Hero', () => {
    // 1. Proof strip container and label
    assert.match(htmlContent, /class=["']hero-proof-strip["']/);
    assert.match(htmlContent, /class=["']proof-strip-label["']/);
    assert.match(htmlContent, /class=["']proof-pills-list["']/);

    // 2. Flagship client proof buttons
    const pillMatches = htmlContent.match(/<button[^>]*class=["']proof-pill["'][^>]*data-project-id=["']([^"']+)["']/g) || [];
    assert.ok(pillMatches.length >= 4, 'Must have at least 4 hero proof pills');

    // Verify all project IDs referenced in pills exist in PORTFOLIO_DATA
    const projectIds = pillMatches.map(m => m.match(/data-project-id=["']([^"']+)["']/)[1]);
    const validIds = new Set(PORTFOLIO_DATA.map(p => p.id));
    projectIds.forEach(id => {
      assert.ok(validIds.has(id), `Hero pill project ID "${id}" must exist in PORTFOLIO_DATA`);
    });

    // 3. CSS styling for proof pills
    assert.match(cssContent, /\.hero-proof-strip\s*\{[^}]*display:\s*flex/);
    assert.match(cssContent, /\.proof-pill\s*\{[^}]*display:\s*inline-flex/);
    assert.match(cssContent, /\.proof-pill:hover\s*\{/);
    assert.match(cssContent, /\.proof-pill:focus-visible\s*\{/);
    assert.match(cssContent, /\.proof-pill-dot\s*\{/);
  });
});
