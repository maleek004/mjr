/**
 * MJr Designs & Print Solutions Limited
 * Admin Pricing Center & Visual Configurator Engine (admin.js)
 */

(function () {
  'use strict';

  // Fallback Baseline Factory Defaults (if app.js PRICING_MODEL not in scope)
  const FACTORY_DEFAULTS = {
    'business-cards': {
      id: 'business-cards',
      title: 'Premium Business Cards',
      category: 'Branding & Stationery',
      unitBasePrice: 85,
      minQty: 100,
      maxQty: 5000,
      stepQty: 50,
      defaultQty: 250,
      qtyPresets: [100, 250, 500, 1000, 2500],
      discounts: [
        { minQty: 1000, rate: 0.20 },
        { minQty: 500, rate: 0.15 },
        { minQty: 250, rate: 0.10 },
        { minQty: 100, rate: 0.00 }
      ],
      options: [
        {
          id: 'sides',
          label: 'Print Sides',
          type: 'radio',
          choices: [
            { value: 'single', label: 'Single-Sided', priceDelta: 0, desc: 'Front full color only' },
            { value: 'double', label: 'Double-Sided', priceDelta: 25, desc: 'Front & back full color (+₦25/unit)' }
          ],
          default: 'double'
        },
        {
          id: 'finish',
          label: 'Surface Finish',
          type: 'radio',
          choices: [
            { value: 'matte', label: 'Matte Lamination', priceDelta: 15, desc: 'Silky smooth anti-glare' },
            { value: 'gloss', label: 'Gloss Lamination', priceDelta: 10, desc: 'High-shine reflective sheen' },
            { value: 'spot-uv', label: 'Matte + Raised Spot UV', priceDelta: 45, desc: 'Tactile gloss accent (+₦45/unit)' }
          ],
          default: 'matte'
        }
      ]
    },
    'brochures': {
      id: 'brochures',
      title: 'Corporate Brochures & Catalogues',
      category: 'Editorial & Publications',
      unitBasePrice: 420,
      minQty: 50,
      maxQty: 5000,
      stepQty: 50,
      defaultQty: 250,
      qtyPresets: [50, 100, 250, 500, 1000],
      discounts: [
        { minQty: 1000, rate: 0.25 },
        { minQty: 500, rate: 0.18 },
        { minQty: 250, rate: 0.12 },
        { minQty: 100, rate: 0.05 },
        { minQty: 50, rate: 0.00 }
      ],
      options: [
        {
          id: 'pages',
          label: 'Page Extent (A4/A5)',
          type: 'radio',
          choices: [
            { value: '8pp', label: '8-Page Compendium', priceDelta: 0, desc: 'Saddle-stitched booklet' },
            { value: '16pp', label: '16-Page Booklet', priceDelta: 280, desc: 'Standard company profile' },
            { value: '24pp', label: '24-Page Catalogue', priceDelta: 520, desc: 'Comprehensive annual report' }
          ],
          default: '16pp'
        },
        {
          id: 'lamination',
          label: 'Cover Finish',
          type: 'radio',
          choices: [
            { value: 'matte', label: 'Matte Lamination', priceDelta: 50, desc: 'Executive matte coating' },
            { value: 'gloss', label: 'Gloss Lamination', priceDelta: 40, desc: 'Vibrant glossy sheen' },
            { value: 'foil', label: 'Gold / Silver Foil Accent', priceDelta: 120, desc: 'Metallic luxury foil stamping' }
          ],
          default: 'matte'
        }
      ]
    },
    't-shirts': {
      id: 't-shirts',
      title: 'Custom Branded Shirts & Merch',
      category: 'Apparel & Uniforms',
      unitBasePrice: 4500,
      minQty: 20,
      maxQty: 1000,
      stepQty: 10,
      defaultQty: 50,
      qtyPresets: [20, 50, 100, 200, 500],
      discounts: [
        { minQty: 500, rate: 0.20 },
        { minQty: 200, rate: 0.15 },
        { minQty: 100, rate: 0.10 },
        { minQty: 50, rate: 0.05 },
        { minQty: 20, rate: 0.00 }
      ],
      options: [
        {
          id: 'printLocation',
          label: 'Print Placements',
          type: 'radio',
          choices: [
            { value: 'chest', label: 'Front Chest Only', priceDelta: 0, desc: 'High-res DTF / Screenprint' },
            { value: 'front-back', label: 'Front + Back Print', priceDelta: 950, desc: 'Dual-side branding' },
            { value: 'full-custom', label: 'Front, Back + Sleeve', priceDelta: 1600, desc: 'Complete 3-point corporate branding' }
          ],
          default: 'front-back'
        },
        {
          id: 'fabric',
          label: 'Fabric Weight',
          type: 'radio',
          choices: [
            { value: 'standard', label: '180gsm Combed Cotton', priceDelta: 0, desc: 'Lightweight & breathable' },
            { value: 'heavyweight', label: '220gsm Heavyweight Cotton', priceDelta: 750, desc: 'Luxury streetwear density' }
          ],
          default: 'heavyweight'
        }
      ]
    },
    'banners': {
      id: 'banners',
      title: 'Roll-Up Display Banners & Signage',
      category: 'Large Format & Events',
      unitBasePrice: 24500,
      minQty: 1,
      maxQty: 50,
      stepQty: 1,
      defaultQty: 2,
      qtyPresets: [1, 2, 4, 8, 15],
      discounts: [
        { minQty: 20, rate: 0.18 },
        { minQty: 10, rate: 0.12 },
        { minQty: 4, rate: 0.08 },
        { minQty: 1, rate: 0.00 }
      ],
      options: [
        {
          id: 'baseType',
          label: 'Roll-up Stand Base',
          type: 'radio',
          choices: [
            { value: 'standard', label: 'Standard Aluminium Base', priceDelta: 0, desc: 'Lightweight dual-foot stand' },
            { value: 'luxury', label: 'Luxury Broad Base Stand', priceDelta: 6500, desc: 'Chrome teardrop base + padded bag' }
          ],
          default: 'luxury'
        },
        {
          id: 'material',
          label: 'Banner Substrate',
          type: 'radio',
          choices: [
            { value: 'matte-vinyl', label: 'Matte Anti-Glare Solvo', priceDelta: 0, desc: 'Zero reflection under hall lighting' },
            { value: 'pvc-canvas', label: 'Heavy Duty PVC Canvas', priceDelta: 3500, desc: 'Textured outdoor tear-resistant' }
          ],
          default: 'matte-vinyl'
        }
      ]
    }
  };

  /**
   * Helper to deep-clone JSON-safe objects
   */
  function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  // Admin Working State
  const adminState = {
    activeProductId: 'business-cards',
    model: deepClone(FACTORY_DEFAULTS),
    rushRate: 25,
    sandbox: {
      quantity: 250,
      options: {},
      isRush: false
    }
  };

  /**
   * Load custom pricing from localStorage if present
   */
  function loadPersistedModel() {
    if (typeof localStorage !== 'undefined') {
      try {
        const stored = localStorage.getItem('mjr_custom_pricing');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && typeof parsed === 'object') {
            adminState.model = deepClone(parsed);
          }
        }
      } catch (err) {
        console.warn('[MJr Admin] Failed to load custom pricing from localStorage:', err);
      }
    }
  }

  /**
   * Format numerical currency into Nigerian Naira (NGN)
   */
  function formatCurrency(amount) {
    const val = typeof amount === 'number' && !isNaN(amount) ? amount : 0;
    try {
      return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        maximumFractionDigits: 0
      }).format(val);
    } catch {
      return `₦${Math.round(val).toLocaleString()}`;
    }
  }

  /**
   * Populate Product Form with working state
   */
  function loadProductIntoForm(productId) {
    const product = adminState.model[productId];
    if (!product || typeof document === 'undefined') return;

    adminState.activeProductId = productId;

    // 1. Update Tabs
    const tabs = document.querySelectorAll('.admin-tab');
    tabs.forEach(tab => {
      const isActive = (tab.dataset.productId === productId);
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    // 2. Base Fields
    const unitPriceInput = document.getElementById('admin-unit-price');
    const defaultQtyInput = document.getElementById('admin-default-qty');
    const minQtyInput = document.getElementById('admin-min-qty');
    const maxQtyInput = document.getElementById('admin-max-qty');
    const stepQtyInput = document.getElementById('admin-step-qty');

    if (unitPriceInput) unitPriceInput.value = product.unitBasePrice;
    if (defaultQtyInput) defaultQtyInput.value = product.defaultQty;
    if (minQtyInput) minQtyInput.value = product.minQty;
    if (maxQtyInput) maxQtyInput.value = product.maxQty;
    if (stepQtyInput) stepQtyInput.value = product.stepQty || 1;

    // 3. Render Option Editors & Discount Tables
    renderOptionsEditor(productId);
    renderDiscountsTable(productId);

    // 4. Reset Sandbox State for Product
    adminState.sandbox.quantity = product.defaultQty;
    adminState.sandbox.options = {};
    if (Array.isArray(product.options)) {
      product.options.forEach(opt => {
        adminState.sandbox.options[opt.id] = opt.default;
      });
    }

    // 5. Update Sandbox Controls
    const sbTitle = document.getElementById('sandbox-product-title');
    if (sbTitle) sbTitle.textContent = product.title;

    const sbSlider = document.getElementById('sandbox-qty-slider');
    if (sbSlider) {
      sbSlider.min = product.minQty;
      sbSlider.max = product.maxQty;
      sbSlider.step = product.stepQty || 1;
      sbSlider.value = product.defaultQty;
    }

    renderSandboxOptions(productId);
    calculateAdminSandbox();
  }

  /**
   * Render dynamic option editor for the current product
   */
  function renderOptionsEditor(productId) {
    const product = adminState.model[productId];
    const container = document.getElementById('admin-options-editor');
    if (!product || !container) return;

    if (!Array.isArray(product.options) || product.options.length === 0) {
      container.innerHTML = '<p class="admin-help">No specification add-ons configured for this product.</p>';
      return;
    }

    let markup = '';
    product.options.forEach((optGroup, groupIdx) => {
      markup += `
        <div class="admin-opt-group-box">
          <h3 class="admin-opt-group-title">${escapeHtml(optGroup.label)} (Group ID: ${escapeHtml(optGroup.id)})</h3>
          <table class="admin-choices-table">
            <thead>
              <tr>
                <th style="width: 35%;">Choice Label</th>
                <th style="width: 35%;">Description</th>
                <th style="width: 30%;">Price Delta (₦)</th>
              </tr>
            </thead>
            <tbody>
      `;

      optGroup.choices.forEach((choice, choiceIdx) => {
        markup += `
          <tr>
            <td>
              <input type="text" class="admin-input" value="${escapeHtml(choice.label)}" 
                     data-group-idx="${groupIdx}" data-choice-idx="${choiceIdx}" data-field="label">
            </td>
            <td>
              <input type="text" class="admin-input" value="${escapeHtml(choice.desc || '')}" 
                     data-group-idx="${groupIdx}" data-choice-idx="${choiceIdx}" data-field="desc">
            </td>
            <td>
              <div class="admin-input-prefix-wrap">
                <span class="admin-prefix">₦</span>
                <input type="number" class="admin-input" value="${choice.priceDelta}" 
                       data-group-idx="${groupIdx}" data-choice-idx="${choiceIdx}" data-field="priceDelta">
              </div>
            </td>
          </tr>
        `;
      });

      markup += `
            </tbody>
          </table>
        </div>
      `;
    });

    container.innerHTML = markup;
  }

  /**
   * Render Volume Discount Matrix Table
   */
  function renderDiscountsTable(productId) {
    const product = adminState.model[productId];
    const tbody = document.getElementById('admin-discounts-body');
    if (!product || !tbody) return;

    if (!Array.isArray(product.discounts) || product.discounts.length === 0) {
      tbody.innerHTML = '<tr><td colspan="3" class="admin-help">No volume discounts configured.</td></tr>';
      return;
    }

    let markup = '';
    product.discounts.forEach((tier, idx) => {
      const discountPct = Math.round(tier.rate * 100);
      const sampleSavings = formatCurrency(product.unitBasePrice * (tier.rate));

      markup += `
        <tr>
          <td>
            <strong>${tier.minQty.toLocaleString()} units +</strong>
          </td>
          <td>
            <div class="admin-input-suffix-wrap" style="max-width: 140px;">
              <input type="number" class="admin-input" min="0" max="100" value="${discountPct}" 
                     data-discount-idx="${idx}">
              <span class="admin-suffix">%</span>
            </div>
          </td>
          <td>
            <span class="discount-val">Save ${sampleSavings} / unit</span>
          </td>
        </tr>
      `;
    });

    tbody.innerHTML = markup;
  }

  /**
   * Render Interactive Sandbox Radio Options
   */
  function renderSandboxOptions(productId) {
    const product = adminState.model[productId];
    const container = document.getElementById('sandbox-options-container');
    if (!product || !container) return;

    let markup = '';
    if (Array.isArray(product.options)) {
      product.options.forEach(optGroup => {
        const activeVal = adminState.sandbox.options[optGroup.id] || optGroup.default;

        markup += `
          <div class="sandbox-opt-group">
            <span class="admin-label">${escapeHtml(optGroup.label)}</span>
            <div class="calc-pill-options-grid" style="margin-top: 6px;">
        `;

        optGroup.choices.forEach(choice => {
          const isChecked = (choice.value === activeVal);
          markup += `
            <label class="calc-radio-pill ${isChecked ? 'active' : ''}">
              <input type="radio" 
                     name="sb-opt-${escapeHtml(optGroup.id)}" 
                     value="${escapeHtml(choice.value)}" 
                     data-sb-group="${escapeHtml(optGroup.id)}"
                     ${isChecked ? 'checked' : ''}>
              <span class="pill-title">${escapeHtml(choice.label)}</span>
              <span class="pill-desc">${choice.priceDelta > 0 ? `+₦${choice.priceDelta}` : 'Included'}</span>
            </label>
          `;
        });

        markup += `
            </div>
          </div>
        `;
      });
    }

    container.innerHTML = markup;
  }

  /**
   * Calculate and update the Sandbox Live Receipt
   */
  function calculateAdminSandbox() {
    if (typeof document === 'undefined') return;

    const product = adminState.model[adminState.activeProductId];
    if (!product) return;

    let qty = parseInt(adminState.sandbox.quantity, 10) || product.defaultQty;
    if (qty < product.minQty) qty = product.minQty;
    if (qty > product.maxQty) qty = product.maxQty;

    let optionsDelta = 0;
    if (Array.isArray(product.options)) {
      product.options.forEach(optGroup => {
        const val = adminState.sandbox.options[optGroup.id] || optGroup.default;
        const choice = optGroup.choices.find(c => c.value === val);
        if (choice && typeof choice.priceDelta === 'number') {
          optionsDelta += choice.priceDelta;
        }
      });
    }

    const effectiveUnit = product.unitBasePrice + optionsDelta;
    const grossSubtotal = effectiveUnit * qty;

    // Volume discount
    let discountRate = 0;
    if (Array.isArray(product.discounts)) {
      for (const tier of product.discounts) {
        if (qty >= tier.minQty) {
          discountRate = tier.rate;
          break;
        }
      }
    }

    const discountAmount = Math.round(grossSubtotal * discountRate);
    const discountedSubtotal = grossSubtotal - discountAmount;

    // Rush
    const isRush = Boolean(adminState.sandbox.isRush);
    const rushMultiplier = isRush ? (1 + (adminState.rushRate / 100)) : 1.0;
    const finalTotal = Math.round(discountedSubtotal * rushMultiplier);
    const rushFee = isRush ? (finalTotal - discountedSubtotal) : 0;

    // Update DOM
    const qtyBadge = document.getElementById('sandbox-qty-badge');
    if (qtyBadge) qtyBadge.textContent = `${qty.toLocaleString()} units`;

    const unitBaseEl = document.getElementById('sb-unit-base');
    if (unitBaseEl) unitBaseEl.textContent = `${formatCurrency(product.unitBasePrice)} / unit`;

    const optionsDeltaEl = document.getElementById('sb-options-delta');
    if (optionsDeltaEl) optionsDeltaEl.textContent = `+${formatCurrency(optionsDelta)} / unit`;

    const effectiveUnitEl = document.getElementById('sb-effective-unit');
    if (effectiveUnitEl) effectiveUnitEl.textContent = `${formatCurrency(effectiveUnit)} / unit`;

    const grossSubtotalEl = document.getElementById('sb-gross-subtotal');
    if (grossSubtotalEl) grossSubtotalEl.textContent = formatCurrency(grossSubtotal);

    const discountLine = document.getElementById('sb-discount-line');
    const discountPctEl = document.getElementById('sb-discount-pct');
    const discountAmtEl = document.getElementById('sb-discount-amt');
    if (discountLine && discountPctEl && discountAmtEl) {
      if (discountRate > 0) {
        discountLine.style.display = 'flex';
        discountPctEl.textContent = `${Math.round(discountRate * 100)}%`;
        discountAmtEl.textContent = `-${formatCurrency(discountAmount)}`;
      } else {
        discountLine.style.display = 'none';
      }
    }

    const rushLine = document.getElementById('sb-rush-line');
    const rushFeeEl = document.getElementById('sb-rush-fee');
    if (rushLine && rushFeeEl) {
      if (isRush) {
        rushLine.style.display = 'flex';
        rushFeeEl.textContent = `+${formatCurrency(rushFee)}`;
      } else {
        rushLine.style.display = 'none';
      }
    }

    const finalTotalEl = document.getElementById('sb-final-total');
    if (finalTotalEl) finalTotalEl.textContent = formatCurrency(finalTotal);
  }

  /**
   * Generate Clean ES6 JavaScript Code Block for PRICING_MODEL
   */
  function generateES6PricingCode(model) {
    const data = model || adminState.model;
    const lines = [];

    lines.push('  // Dynamic Pricing Model Registry (Deeply Immutable)');
    lines.push('  const PRICING_MODEL = Object.freeze({');

    const productKeys = Object.keys(data);
    productKeys.forEach((key, pIdx) => {
      const prod = data[key];
      const isLastProduct = (pIdx === productKeys.length - 1);

      lines.push(`    '${key}': Object.freeze({`);
      lines.push(`      id: '${prod.id}',`);
      lines.push(`      title: '${prod.title.replace(/'/g, "\\'")}',`);
      lines.push(`      category: '${prod.category.replace(/'/g, "\\'")}',`);
      lines.push(`      unitBasePrice: ${prod.unitBasePrice},`);
      lines.push(`      minQty: ${prod.minQty},`);
      lines.push(`      maxQty: ${prod.maxQty},`);
      lines.push(`      stepQty: ${prod.stepQty || 1},`);
      lines.push(`      defaultQty: ${prod.defaultQty},`);
      lines.push(`      qtyPresets: [${(prod.qtyPresets || []).join(', ')}],`);

      // Discounts
      lines.push(`      discounts: [`);
      (prod.discounts || []).forEach((d, dIdx) => {
        const isLastD = (dIdx === prod.discounts.length - 1);
        lines.push(`        { minQty: ${d.minQty}, rate: ${d.rate} }${isLastD ? '' : ','}`);
      });
      lines.push(`      ],`);

      // Options
      lines.push(`      options: [`);
      (prod.options || []).forEach((opt, oIdx) => {
        const isLastOpt = (oIdx === prod.options.length - 1);
        lines.push(`        {`);
        lines.push(`          id: '${opt.id}',`);
        lines.push(`          label: '${opt.label.replace(/'/g, "\\'")}',`);
        lines.push(`          type: '${opt.type}',`);
        lines.push(`          choices: [`);
        (opt.choices || []).forEach((ch, cIdx) => {
          const isLastC = (cIdx === opt.choices.length - 1);
          lines.push(`            { value: '${ch.value}', label: '${ch.label.replace(/'/g, "\\'")}', priceDelta: ${ch.priceDelta}, desc: '${(ch.desc || '').replace(/'/g, "\\'")}' }${isLastC ? '' : ','}`);
        });
        lines.push(`          ],`);
        lines.push(`          default: '${opt.default}'`);
        lines.push(`        }${isLastOpt ? '' : ','}`);
      });
      lines.push(`      ]`);
      lines.push(`    })${isLastProduct ? '' : ','}`);
    });

    lines.push('  });');

    return lines.join('\n');
  }

  /**
   * Export Pricing Configuration as JSON
   */
  function exportPricingJson() {
    const jsonString = JSON.stringify(adminState.model, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mjr-pricing-config.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Exported pricing configuration as JSON!');
  }

  /**
   * Import Pricing Configuration from JSON
   */
  function importPricingJson(jsonString) {
    if (!jsonString || typeof jsonString !== 'string') {
      alert('Please paste valid JSON configuration text.');
      return false;
    }
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || typeof parsed !== 'object') {
        throw new Error('Invalid JSON format');
      }
      adminState.model = deepClone(parsed);
      saveLocalPricing();
      loadProductIntoForm(adminState.activeProductId);
      showToast('Configuration successfully imported!');
      return true;
    } catch (err) {
      alert('Failed to parse JSON: ' + err.message);
      return false;
    }
  }

  /**
   * Save model to browser localStorage
   */
  function saveLocalPricing() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('mjr_custom_pricing', JSON.stringify(adminState.model));
      showToast('Pricing saved and applied to live website!');
    }
  }

  /**
   * Reset all products to factory baseline
   */
  function resetToBaseline() {
    if (confirm('Are you sure you want to reset all product pricing to factory baseline defaults?')) {
      adminState.model = deepClone(FACTORY_DEFAULTS);
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('mjr_custom_pricing');
      }
      loadProductIntoForm(adminState.activeProductId);
      showToast('Reset to factory baseline defaults!');
    }
  }

  /**
   * Show Toast Notification
   */
  function showToast(message) {
    if (typeof document === 'undefined') return;
    const toast = document.getElementById('admin-toast');
    if (!toast) return;

    toast.textContent = message;
    toast.removeAttribute('hidden');
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.setAttribute('hidden', ''), 300);
    }, 3000);
  }

  /**
   * Escape HTML utility
   */
  function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/[&<>"']/g, match => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[match]));
  }

  /**
   * Event Delegation Setup
   */
  if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
      loadPersistedModel();
      loadProductIntoForm(adminState.activeProductId);
    });

    // Delegated Click Handlers
    document.addEventListener('click', (e) => {
      const actionEl = e.target.closest('[data-action]');
      if (!actionEl) return;

      const action = actionEl.dataset.action;

      switch (action) {
        case 'admin-select-product': {
          e.preventDefault();
          const prodId = actionEl.dataset.productId;
          if (prodId) loadProductIntoForm(prodId);
          break;
        }
        case 'copy-es6-code': {
          e.preventDefault();
          const codeOutput = document.getElementById('code-output');
          const codeModal = document.getElementById('code-modal');
          const code = generateES6PricingCode(adminState.model);
          if (codeOutput) codeOutput.textContent = code;
          if (codeModal) codeModal.removeAttribute('hidden');
          break;
        }
        case 'close-code-modal': {
          e.preventDefault();
          const codeModal = document.getElementById('code-modal');
          if (codeModal) codeModal.setAttribute('hidden', '');
          break;
        }
        case 'copy-code-text': {
          e.preventDefault();
          const code = generateES6PricingCode(adminState.model);
          if (navigator && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
            navigator.clipboard.writeText(code).then(() => {
              showToast('ES6 code copied to clipboard!');
            });
          } else {
            showToast('Code displayed in viewer.');
          }
          break;
        }
        case 'export-json': {
          e.preventDefault();
          exportPricingJson();
          break;
        }
        case 'open-import-modal': {
          e.preventDefault();
          const importModal = document.getElementById('import-modal');
          if (importModal) importModal.removeAttribute('hidden');
          break;
        }
        case 'close-import-modal': {
          e.preventDefault();
          const importModal = document.getElementById('import-modal');
          if (importModal) importModal.setAttribute('hidden', '');
          break;
        }
        case 'execute-import-json': {
          e.preventDefault();
          const textarea = document.getElementById('import-json-text');
          if (textarea && importPricingJson(textarea.value)) {
            const importModal = document.getElementById('import-modal');
            if (importModal) importModal.setAttribute('hidden', '');
          }
          break;
        }
        case 'save-local-pricing': {
          e.preventDefault();
          saveLocalPricing();
          break;
        }
        case 'reset-defaults': {
          e.preventDefault();
          resetToBaseline();
          break;
        }
        default:
          break;
      }
    });

    // Delegated Input Handlers for Form Mutations
    document.addEventListener('input', (e) => {
      const target = e.target;
      if (!target) return;

      const prod = adminState.model[adminState.activeProductId];
      if (!prod) return;

      // Base fields
      if (target.dataset.param) {
        const param = target.dataset.param;
        const val = parseInt(target.value, 10);
        if (!isNaN(val) && val >= 0) {
          prod[param] = val;
          calculateAdminSandbox();
        }
      }

      // Choice field updates
      if (target.dataset.field) {
        const groupIdx = parseInt(target.dataset.groupIdx, 10);
        const choiceIdx = parseInt(target.dataset.choiceIdx, 10);
        const field = target.dataset.field;

        if (prod.options[groupIdx] && prod.options[groupIdx].choices[choiceIdx]) {
          const choice = prod.options[groupIdx].choices[choiceIdx];
          if (field === 'priceDelta') {
            choice.priceDelta = parseInt(target.value, 10) || 0;
          } else {
            choice[field] = target.value;
          }
          renderSandboxOptions(adminState.activeProductId);
          calculateAdminSandbox();
        }
      }

      // Discount rate updates
      if (target.dataset.discountIdx !== undefined) {
        const dIdx = parseInt(target.dataset.discountIdx, 10);
        const pct = parseFloat(target.value) || 0;
        if (prod.discounts[dIdx]) {
          prod.discounts[dIdx].rate = pct / 100;
          calculateAdminSandbox();
        }
      }

      // Rush rate update
      if (target.id === 'admin-rush-rate') {
        adminState.rushRate = parseFloat(target.value) || 25;
        calculateAdminSandbox();
      }

      // Sandbox slider
      if (target.id === 'sandbox-qty-slider') {
        adminState.sandbox.quantity = parseInt(target.value, 10) || prod.defaultQty;
        calculateAdminSandbox();
      }
    });

    // Delegated Change Handlers for Radios and Checkboxes
    document.addEventListener('change', (e) => {
      const target = e.target;
      if (!target) return;

      // Sandbox Option Pills
      if (target.dataset.sbGroup) {
        const optGroup = target.dataset.sbGroup;
        adminState.sandbox.options[optGroup] = target.value;

        const groupEl = target.closest('.calc-pill-options-grid');
        if (groupEl) {
          const pills = groupEl.querySelectorAll('.calc-radio-pill');
          pills.forEach(p => {
            const r = p.querySelector('input[type="radio"]');
            if (r) p.classList.toggle('active', r.checked);
          });
        }
        calculateAdminSandbox();
      }

      // Sandbox Rush Toggle
      if (target.id === 'sandbox-rush-toggle') {
        adminState.sandbox.isRush = target.checked;
        calculateAdminSandbox();
      }
    });
  }

  // Export for testing & runtime
  if (typeof window !== 'undefined') {
    window.adminState = adminState;
    window.FACTORY_DEFAULTS = FACTORY_DEFAULTS;
    window.generateES6PricingCode = generateES6PricingCode;
    window.calculateAdminSandbox = calculateAdminSandbox;
    window.exportPricingJson = exportPricingJson;
    window.importPricingJson = importPricingJson;
    window.saveLocalPricing = saveLocalPricing;
    window.resetToBaseline = resetToBaseline;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      adminState,
      FACTORY_DEFAULTS,
      generateES6PricingCode,
      calculateAdminSandbox,
      exportPricingJson,
      importPricingJson,
      saveLocalPricing,
      resetToBaseline
    };
  }
})();
