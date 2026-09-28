/**
 * MJr Designs & Print Solutions Limited
 * Global Dynamic Pricing Serverless API (/api/pricing)
 *
 * Handles global pricing distribution for all visitors worldwide.
 * Backed by Vercel KV / Upstash Redis with zero-downtime fallback.
 */

const crypto = require('crypto');

// Default Master Factory PIN Hash (SHA-256 of "246748")
const DEFAULT_PIN_HASH = 'd6dac16e6ddfeddf2388c92a4013e58a24a0468b6501264c7d6bb60f2ff1cf1b';
const KV_PRICING_KEY = 'mjr_global_pricing';
const KV_PIN_KEY = 'mjr_admin_pin_hash';

// In-Memory process fallback (for local dev / transient container lifetime)
let inMemoryPricing = null;
let inMemoryUpdatedAt = null;

// Baseline Factory Defaults
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
    qtyPresets: [1, 2, 5, 10, 20],
    discounts: [
      { minQty: 10, rate: 0.15 },
      { minQty: 5, rate: 0.10 },
      { minQty: 2, rate: 0.05 },
      { minQty: 1, rate: 0.00 }
    ],
    options: [
      {
        id: 'baseType',
        label: 'Stand Mechanism',
        type: 'radio',
        choices: [
          { value: 'standard-base', label: 'Standard Aluminum Base', priceDelta: 0, desc: 'Lightweight retractable base' },
          { value: 'broad-base', label: 'Luxury Broad Base', priceDelta: 7500, desc: 'Weighted chrome teardrop foot' }
        ],
        default: 'standard-base'
      },
      {
        id: 'media',
        label: 'Banner Substrate',
        type: 'radio',
        choices: [
          { value: 'matte-vinyl', label: 'Smooth Matte Solvo-Vinyl', priceDelta: 0, desc: 'Vibrant anti-curl film' },
          { value: 'fabric-flag', label: 'Polyester Fabric Print', priceDelta: 4500, desc: 'Washable glare-free textile' }
        ],
        default: 'matte-vinyl'
      }
    ]
  }
};

/**
 * SHA-256 Digest Helper
 */
function sha256(text) {
  return crypto.createHash('sha256').update(String(text || '').trim()).digest('hex');
}

/**
 * Fetch helper for Vercel KV REST API
 */
async function fetchKv(command, ...args) {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) return null;

  try {
    const cleanUrl = url.replace(/\/$/, '');
    const endpoint = `${cleanUrl}/${command}/${args.map(a => encodeURIComponent(typeof a === 'object' ? JSON.stringify(a) : a)).join('/')}`;
    const res = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.result;
  } catch (err) {
    console.warn('[Vercel KV] REST fetch error:', err.message);
    return null;
  }
}

/**
 * Validate pricing model structure
 */
function isValidPricingModel(model) {
  if (!model || typeof model !== 'object') return false;
  const requiredProducts = ['business-cards', 'brochures', 't-shirts', 'banners'];
  for (const pId of requiredProducts) {
    const p = model[pId];
    if (!p || typeof p.unitBasePrice !== 'number' || p.unitBasePrice < 0) {
      return false;
    }
  }
  return true;
}

/**
 * Serverless Route Handler
 */
module.exports = async function handler(req, res) {
  // Set CORS & Security Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-admin-pin');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // --------------------------------------------------------------------------
  // GET: Retrieve Global Pricing Model
  // --------------------------------------------------------------------------
  if (req.method === 'GET') {
    // 1. Try Vercel KV
    const kvResult = await fetchKv('get', KV_PRICING_KEY);
    if (kvResult) {
      try {
        const parsed = typeof kvResult === 'string' ? JSON.parse(kvResult) : kvResult;
        if (isValidPricingModel(parsed)) {
          res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=120');
          return res.status(200).json({
            success: true,
            source: 'vercel-kv',
            pricing: parsed
          });
        }
      } catch (e) {
        // Fallback
      }
    }

    // 2. Try In-Memory Fallback
    if (inMemoryPricing && isValidPricingModel(inMemoryPricing)) {
      return res.status(200).json({
        success: true,
        source: 'in-memory',
        updatedAt: inMemoryUpdatedAt,
        pricing: inMemoryPricing
      });
    }

    // 3. Baseline Factory Defaults Fallback
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    return res.status(200).json({
      success: true,
      source: 'factory-defaults',
      pricing: FACTORY_DEFAULTS
    });
  }

  // --------------------------------------------------------------------------
  // POST: Update Global Pricing Model (Admin Authentication Required)
  // --------------------------------------------------------------------------
  if (req.method === 'POST') {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        return res.status(400).json({ success: false, error: 'Invalid JSON request payload' });
      }
    }

    const providedPin = req.headers['x-admin-pin'] || (body && body.pin);
    const pricingPayload = body && (body.pricing || body);

    if (!providedPin) {
      return res.status(401).json({ success: false, error: 'Administrative PIN or x-admin-pin header required' });
    }

    // Verify PIN / Hash
    const hashedAttempt = sha256(providedPin);
    const directMatch = (providedPin === DEFAULT_PIN_HASH || hashedAttempt === DEFAULT_PIN_HASH);

    // Also check if custom PIN hash is stored in KV
    let kvPinMatch = false;
    const storedPinHash = await fetchKv('get', KV_PIN_KEY);
    if (storedPinHash && (hashedAttempt === storedPinHash || providedPin === storedPinHash)) {
      kvPinMatch = true;
    }

    if (!directMatch && !kvPinMatch) {
      return res.status(403).json({ success: false, error: 'Invalid Administrative PIN' });
    }

    // Validate Pricing Schema
    if (!isValidPricingModel(pricingPayload)) {
      return res.status(422).json({
        success: false,
        error: 'Invalid pricing model structure. Must contain business-cards, brochures, t-shirts, and banners.'
      });
    }

    const nowIso = new Date().toISOString();

    // Persist to Vercel KV if available
    const kvSaved = await fetchKv('set', KV_PRICING_KEY, JSON.stringify(pricingPayload));

    // Persist to in-memory cache
    inMemoryPricing = pricingPayload;
    inMemoryUpdatedAt = nowIso;

    return res.status(200).json({
      success: true,
      message: 'Global pricing updated successfully across all visitors.',
      persistedToKv: Boolean(kvSaved),
      updatedAt: nowIso,
      pricing: pricingPayload
    });
  }

  // Method Not Allowed
  return res.status(455).json({ success: false, error: `Method ${req.method} not allowed` });
};

// Export helpers for testing
module.exports.FACTORY_DEFAULTS = FACTORY_DEFAULTS;
module.exports.DEFAULT_PIN_HASH = DEFAULT_PIN_HASH;
module.exports.isValidPricingModel = isValidPricingModel;
