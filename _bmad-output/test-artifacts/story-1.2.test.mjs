import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('Story 1.2: Responsive Sticky Header Navigation & Mobile Drawer', () => {
  const htmlPath = path.resolve('index.html');
  const cssPath = path.resolve('styles.css');
  const jsPath = path.resolve('app.js');

  const htmlContent = fs.readFileSync(htmlPath, 'utf8');
  const cssContent = fs.readFileSync(cssPath, 'utf8');
  const jsContent = fs.readFileSync(jsPath, 'utf8');

  test('AC-1: Desktop Sticky Navigation & Semantic Header Layout', () => {
    // Verify semantic header landmark and sticky positioning
    assert.match(htmlContent, /<header\s+class="[^"]*site-header[^"]*"/, 'Header element must have site-header class');
    assert.match(cssContent, /\.site-header\s*\{[^}]*position:\s*sticky/s, 'Header must be sticky in CSS');
    assert.match(cssContent, /\.site-header\s*\{[^}]*top:\s*0/s, 'Header must stick to top: 0');
    
    // Verify desktop navigation links
    assert.match(htmlContent, /href="#services"/, 'Must contain link to #services');
    assert.match(htmlContent, /href="#portfolio"/, 'Must contain link to #portfolio');
    assert.match(htmlContent, /href="#about"/, 'Must contain link to #about');
    assert.match(htmlContent, /href="#contact"/, 'Must contain link to #contact');
    
    // Verify desktop breakpoint hiding nav-toggle and showing site-nav
    assert.match(cssContent, /min-width:\s*768px[\s\S]*?\.site-nav\s*\{[\s\S]*?display:\s*block/, 'site-nav must be displayed on >= 768px');
    assert.match(cssContent, /min-width:\s*768px[\s\S]*?\.nav-toggle\s*\{[\s\S]*?display:\s*none/, 'nav-toggle must be hidden on >= 768px');
  });

  test('AC-2: Smooth Section Anchor Navigation & Scroll Offset', () => {
    assert.match(cssContent, /html\s*\{[\s\S]*?scroll-behavior:\s*smooth/, 'html must declare scroll-behavior: smooth');
    assert.match(cssContent, /scroll-margin-top:/, 'Sections or headers must declare scroll-margin-top offset');
  });

  test('AC-3: Mobile Viewport & Hamburger Drawer Trigger', () => {
    // Touch target >= 48px
    assert.match(cssContent, /\.nav-toggle\s*\{[\s\S]*?(?:min-height:\s*48px|height:\s*48px)/, 'nav-toggle must meet >= 48px touch target');
    assert.match(cssContent, /\.nav-toggle\s*\{[\s\S]*?(?:min-width:\s*48px|width:\s*48px)/, 'nav-toggle must meet >= 48px touch width');

    // ARIA attributes on hamburger button
    assert.match(htmlContent, /aria-expanded="false"/, 'nav-toggle must initialize with aria-expanded="false"');
    assert.match(htmlContent, /aria-controls="mobile-nav"/, 'nav-toggle must have aria-controls="mobile-nav"');
    assert.match(htmlContent, /aria-label="Toggle navigation menu"/, 'nav-toggle must have aria-label');

    // Body scroll locking utility in CSS
    assert.match(cssContent, /body\.menu-locked\s*\{[\s\S]*?overflow:\s*hidden/, 'body.menu-locked must lock scroll with overflow: hidden');
  });

  test('AC-4: Mobile Drawer Dismissal, Backdrop & Escape Handling in app.js', () => {
    // Check Escape key event handler
    assert.match(jsContent, /Escape/, 'app.js must handle Escape key for drawer dismissal');
    // Check focus restoration
    assert.match(jsContent, /focus\(\)/, 'app.js must restore focus on dismissal');
    // Check body scroll lock class toggling
    assert.match(jsContent, /menu-locked/, 'app.js must toggle menu-locked class on body');
    // Check drawer close on navigation link click
    assert.match(jsContent, /close-mobile-nav/, 'app.js must handle close-mobile-nav action');
  });
});
