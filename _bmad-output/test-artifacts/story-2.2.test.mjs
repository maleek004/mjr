import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('Story 2.2: Verified Client Trust Matrix & Semantic Footer', () => {
  const htmlPath = path.resolve('index.html');
  const cssPath = path.resolve('styles.css');

  const htmlContent = fs.readFileSync(htmlPath, 'utf8');
  const cssContent = fs.readFileSync(cssPath, 'utf8');

  test('AC-1: Section #about Landmark & Verified Client Trust Grid (TC-221)', () => {
    // Verify #about landmark
    assert.match(htmlContent, /<section[^>]*id="about"[^>]*class="[^"]*about-section[^"]*"/, 'Section #about must have about-section class');
    assert.match(htmlContent, /aria-labelledby="about-title"/, 'Section #about must be labelled by about-title');
    assert.match(htmlContent, /<h2[^>]*id="about-title"[^>]*>Powering Leading Brands &amp; Institutions<\/h2>/, 'Section #about must render heading');
    
    // Verify client trust grid container
    assert.match(htmlContent, /<div[^>]*class="[^"]*client-trust-grid[^"]*"[^>]*id="clients-root"/, 'Must contain .client-trust-grid with id="clients-root"');

    // Verify 8 authenticated client cards
    const expectedClients = [
      { monogram: 'CYMA', name: 'CYMA HOMES Limited', sector: 'Real Estate &amp; Construction' },
      { monogram: 'TMH', name: 'The Minaret Hospital', sector: 'Healthcare &amp; Clinical Services' },
      { monogram: 'PPFN', name: 'Planned Parenthood (PPFN)', sector: 'Public Health &amp; NGO' },
      { monogram: 'TOLW', name: 'Tour of Lagos Waterways', sector: 'Marine Tourism &amp; Editorial' },
      { monogram: 'GW', name: 'GoWeld Engineering', sector: 'Industrial Fabrication' },
      { monogram: 'TB', name: 'Thesaurus Bay', sector: 'Hospitality &amp; Leisure' },
      { monogram: 'OAB', name: 'OAB Foundation', sector: 'Civic &amp; Philanthropy' },
      { monogram: 'GM', name: 'Glazing Memoirs', sector: 'FMCG &amp; Food Packaging' }
    ];

    expectedClients.forEach((client) => {
      assert.ok(htmlContent.includes(`<span class="client-monogram">${client.monogram}</span>`), `Must render monogram for ${client.name}`);
      assert.ok(htmlContent.includes(`<h3 class="client-name">${client.name}</h3>`), `Must render name for ${client.name}`);
      assert.ok(htmlContent.includes(`<span class="client-sector">${client.sector}</span>`), `Must render sector for ${client.name}`);
    });
  });

  test('AC-2: Client Trust Grid 2D CSS Layout & Grayscale Transitions (TC-222, TC-223)', () => {
    // CSS Grid layout
    assert.match(cssContent, /\.client-trust-grid\s*\{[\s\S]*?display:\s*grid;/, '.client-trust-grid must use display: grid');
    assert.match(cssContent, /repeat\(auto-fit,\s*minmax\(220px,\s*1fr\)\)/, '.client-trust-grid must use auto-fit minmax(220px, 1fr) on desktop/tablet');
    
    // Grayscale filter in rest state
    assert.match(cssContent, /\.client-card\s*\{[\s\S]*?filter:\s*grayscale\(100%\)\s*opacity\(0?\.75\);/s, '.client-card must have grayscale(100%) opacity(0.75) in default rest state');

    // Color transition on hover
    assert.match(cssContent, /hover: hover[\s\S]*?\.client-card:hover\s*\{[\s\S]*?filter:\s*grayscale\(0%\)\s*opacity\(1\);/s, '.client-card:hover must transition to grayscale(0%) opacity(1) on fine pointer hover');
    assert.match(cssContent, /hover: hover[\s\S]*?\.client-card:hover\s*\{[\s\S]*?transform:\s*translateY\(-4px\);/s, '.client-card:hover must elevate with translateY(-4px)');

    // Mobile optical clarity override
    assert.match(cssContent, /hover: none[\s\S]*?\.client-card\s*\{[\s\S]*?filter:\s*grayscale\(0%\)\s*opacity\(1\);/s, '.client-card must be full color on touch devices (hover: none)');
  });

  test('AC-3: Comprehensive Semantic Footer Architecture (TC-224, TC-225)', () => {
    // Semantic footer landmark & 4-column grid
    assert.match(htmlContent, /<footer[^>]*class="[^"]*site-footer[^"]*"[^>]*id="contact-info">/, 'Must render semantic <footer> landmark with site-footer class and id="contact-info"');
    assert.match(htmlContent, /<div class="footer-grid">/, 'Footer must contain .footer-grid');

    // Column 1: Brand & Description
    assert.match(htmlContent, /class="footer-col footer-col-brand"/, 'Must contain brand column');
    assert.match(htmlContent, /Creative Design\. Strategic Branding\. Quality Print\./, 'Must contain brand tagline in footer');

    // Column 2: Direct Channels with <address>
    assert.match(htmlContent, /<address class="footer-address">/, 'Must wrap contact info in semantic <address> tag');
    assert.match(htmlContent, /href="https:\/\/wa\.me\/2348106246748[^"]*"/, 'Must contain direct WhatsApp link targeting +2348106246748');
    assert.match(htmlContent, /data-action="whatsapp-inquire"/, 'WhatsApp link must have data-action="whatsapp-inquire"');
    assert.match(htmlContent, /href="tel:\+2348106246748"/, 'Must contain direct telephone link');
    assert.match(htmlContent, /href="mailto:mjrgdesigns@gmail\.com"/, 'Must contain direct email link');
    assert.match(htmlContent, /href="https:\/\/instagram\.com"/, 'Must contain Instagram link');

    // Column 3: Quick Navigation
    assert.match(htmlContent, /class="footer-col footer-col-links"/, 'Must contain quick navigation column');
    assert.match(htmlContent, /<nav aria-label="Footer Navigation">/, 'Quick navigation must be wrapped in semantic nav');
    assert.match(htmlContent, /href="#services"[^>]*class="footer-nav-link"/, 'Must link to #services in footer');
    assert.match(htmlContent, /href="#portfolio"[^>]*class="footer-nav-link"/, 'Must link to #portfolio in footer');
    assert.match(htmlContent, /href="#about"[^>]*class="footer-nav-link"/, 'Must link to #about in footer');
    assert.match(htmlContent, /href="#contact"[^>]*class="footer-nav-link"/, 'Must link to #contact in footer');
    assert.match(htmlContent, /href="#top"[^>]*class="footer-nav-link"[^>]*>Back to Top ↑<\/a>/, 'Must contain Back to Top anchor link');

    // Column 4: Core Capabilities
    assert.match(htmlContent, /class="footer-col footer-col-services"/, 'Must contain capabilities column');

    // Sub-Footer Bottom Bar
    assert.match(htmlContent, /&copy; 2026 MJr Designs &amp; Print Solutions Limited\. All rights reserved\./, 'Must render copyright notice');
    assert.match(htmlContent, /Built with 100% Zero-Framework Vanilla Web Standards/, 'Must render zero-framework architecture credit');
  });

  test('AC-4: Accessibility & Responsive Multi-Column CSS (TC-226)', () => {
    // SVG icons have aria-hidden="true"
    assert.match(htmlContent, /<svg class="footer-icon"[^>]*aria-hidden="true"/, 'Footer SVG icons must be aria-hidden="true"');

    // External link attributes
    assert.match(htmlContent, /target="_blank"\s+rel="noopener noreferrer"/, 'External links must have target="_blank" and rel="noopener noreferrer"');
    assert.match(htmlContent, /aria-label="Chat with MJr Designs on WhatsApp"/, 'WhatsApp link must have descriptive aria-label');

    // Footer responsive breakpoints in styles.css
    assert.match(cssContent, /min-width:\s*640px[\s\S]*?\.footer-grid\s*\{[\s\S]*?grid-template-columns:\s*repeat\(2,\s*1fr\);/, 'Footer grid must reflow to 2 columns on >= 640px');
    assert.match(cssContent, /min-width:\s*1024px[\s\S]*?\.footer-grid\s*\{[\s\S]*?grid-template-columns:\s*1\.6fr\s+1\.2fr\s+1fr\s+1fr;/, 'Footer grid must reflow to 4 columns on >= 1024px');
  });
});
