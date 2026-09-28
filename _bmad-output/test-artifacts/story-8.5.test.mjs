import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import pricingHandler from '../../api/pricing.js';
import appModule from '../../app.js';
import adminModule from '../../admin.js';

const projectRoot = process.cwd();
const apiPricingPath = path.join(projectRoot, 'api', 'pricing.js');
const adminHtmlPath = path.join(projectRoot, 'admin.html');
const appJsPath = path.join(projectRoot, 'app.js');
const adminJsPath = path.join(projectRoot, 'admin.js');

// Mock Node HTTP req/res objects for testing serverless function handler
function createMockHttp() {
  const headers = {};
  const responseHeaders = {};
  let statusCode = 200;
  let responseBody = null;
  let ended = false;

  const req = {
    method: 'GET',
    headers: {},
    body: null
  };

  const res = {
    statusCode: 200,
    setHeader(key, value) {
      responseHeaders[key.toLowerCase()] = value;
    },
    status(code) {
      statusCode = code;
      return this;
    },
    json(data) {
      responseBody = data;
      ended = true;
      return this;
    },
    end(data) {
      responseBody = data;
      ended = true;
      return this;
    },
    _getData: () => ({ statusCode, responseHeaders, responseBody, ended })
  };

  return { req, res };
}

test('Story 8.5: Global Cloud Pricing Synchronization & Vercel Serverless API', async (t) => {
  await t.test('AC-1: api/pricing.js Endpoint Architecture & Schema Validation', async () => {
    assert.ok(fs.existsSync(apiPricingPath), 'api/pricing.js must exist on disk');
    assert.equal(typeof pricingHandler, 'function', 'api/pricing.js must export a handler function');

    const pricingSource = fs.readFileSync(apiPricingPath, 'utf8');
    assert.match(pricingSource, /DEFAULT_PIN_HASH|sha256/i, 'api/pricing.js must verify PIN security');
    assert.match(pricingSource, /KV_REST_API_URL|fetchKv/i, 'api/pricing.js must support Vercel KV REST integration');
  });

  await t.test('AC-2: GET /api/pricing Returns Valid Baseline Pricing Model', async () => {
    const { req, res } = createMockHttp();
    req.method = 'GET';

    await pricingHandler(req, res);
    const { statusCode, responseHeaders, responseBody } = res._getData();

    assert.equal(statusCode, 200, 'GET /api/pricing must return HTTP 200');
    assert.equal(responseHeaders['content-type'], 'application/json', 'Content-Type must be application/json');
    assert.ok(responseBody, 'Response body must be present');
    assert.equal(responseBody.success, true, 'Response must indicate success');
    assert.ok(responseBody.pricing, 'Response must contain pricing payload');
    assert.ok(responseBody.pricing['business-cards'], 'Pricing must contain business-cards');
    assert.ok(responseBody.pricing['brochures'], 'Pricing must contain brochures');
    assert.ok(responseBody.pricing['t-shirts'], 'Pricing must contain t-shirts');
    assert.ok(responseBody.pricing['banners'], 'Pricing must contain banners');
  });

  await t.test('AC-3: POST /api/pricing Security & Authorization Controls', async () => {
    // 1. Missing PIN should fail with 401
    const { req: req1, res: res1 } = createMockHttp();
    req1.method = 'POST';
    req1.body = { pricing: pricingHandler.FACTORY_DEFAULTS };

    await pricingHandler(req1, res1);
    assert.equal(res1._getData().statusCode, 401, 'POST without PIN must return 401 Unauthorized');

    // 2. Incorrect PIN should fail with 403
    const { req: req2, res: res2 } = createMockHttp();
    req2.method = 'POST';
    req2.body = { pin: '000000', pricing: pricingHandler.FACTORY_DEFAULTS };

    await pricingHandler(req2, res2);
    assert.equal(res2._getData().statusCode, 403, 'POST with wrong PIN must return 403 Forbidden');

    // 3. Valid PIN with malformed payload should fail with 422
    const { req: req3, res: res3 } = createMockHttp();
    req3.method = 'POST';
    req3.body = { pin: '246748', pricing: { 'invalid-prod': {} } };

    await pricingHandler(req3, res3);
    assert.equal(res3._getData().statusCode, 422, 'POST with invalid pricing schema must return 422');

    // 4. Valid PIN and valid payload should succeed with 200
    const testCustomPricing = JSON.parse(JSON.stringify(pricingHandler.FACTORY_DEFAULTS));
    testCustomPricing['business-cards'].unitBasePrice = 95; // Updated rate

    const { req: req4, res: res4 } = createMockHttp();
    req4.method = 'POST';
    req4.headers['x-admin-pin'] = '246748';
    req4.body = { pricing: testCustomPricing };

    await pricingHandler(req4, res4);
    assert.equal(res4._getData().statusCode, 200, 'POST with correct PIN must return 200 OK');
    assert.equal(res4._getData().responseBody.success, true, 'Response must indicate successful update');

    // 5. Subsequent GET should reflect updated pricing
    const { req: req5, res: res5 } = createMockHttp();
    req5.method = 'GET';
    await pricingHandler(req5, res5);
    assert.equal(res5._getData().responseBody.pricing['business-cards'].unitBasePrice, 95, 'GET must return newly updated pricing');
  });

  await t.test('AC-4: Visitor Client Synchronization in app.js', () => {
    assert.equal(typeof appModule.getActivePricing, 'function', 'app.js must export getActivePricing');
    assert.equal(typeof appModule.fetchGlobalPricing, 'function', 'app.js must export fetchGlobalPricing');

    const appJsContent = fs.readFileSync(appJsPath, 'utf8');
    assert.match(appJsContent, /fetch\(['"]\/api\/pricing['"]/i, 'app.js must asynchronously fetch /api/pricing');
    assert.match(appJsContent, /globalPricingModel/i, 'app.js must cache global pricing in memory');
  });

  await t.test('AC-5: Admin Publishing & Multi-User Collaboration in admin.html & admin.js', () => {
    const adminHtmlContent = fs.readFileSync(adminHtmlPath, 'utf8');
    assert.match(adminHtmlContent, /data-action="publish-global-pricing"/i, 'admin.html must contain Publish Global trigger');
    assert.match(adminHtmlContent, /id="btn-publish-global"/i, 'admin.html must have #btn-publish-global button');

    assert.equal(typeof adminModule.publishGlobalPricing, 'function', 'admin.js must export publishGlobalPricing');
    assert.equal(typeof adminModule.fetchGlobalAdminPricing, 'function', 'admin.js must export fetchGlobalAdminPricing');

    const adminJsContent = fs.readFileSync(adminJsPath, 'utf8');
    assert.match(adminJsContent, /fetch\(['"]\/api\/pricing['"],\s*\{\s*method:\s*['"]POST['"]/i, 'admin.js must POST to /api/pricing on publish');
  });
});
