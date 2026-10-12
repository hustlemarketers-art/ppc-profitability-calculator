'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { calculate } = require('../metrics');
const example = { revenue: 10000, adSpend: 2500, marginPercent: 40, otherMarketingCost: 500 };

test('A 4x ROAS example includes margin and other marketing costs', () => {
  const r = calculate(example);
  assert.equal(r.roas, 4);
  assert.equal(r.contributionBeforeMarketing, 4000);
  assert.equal(r.contributionAfterMarketing, 1000);
  assert.equal(r.contributionROI, 1 / 3);
  assert.equal(r.breakEvenRevenue, 7500);
  assert.equal(r.breakEvenROAS, 3);
  assert.equal(r.status, 'positive');
});

test('The same ROAS can lose contribution at a lower margin', () => {
  const r = calculate({ ...example, marginPercent: 20 });
  assert.equal(r.roas, 4);
  assert.equal(r.contributionAfterMarketing, -1000);
  assert.equal(r.status, 'negative');
});

test('Zero revenue is a valid loss scenario', () => {
  const r = calculate({ ...example, revenue: 0 });
  assert.equal(r.roas, 0);
  assert.equal(r.contributionROI, -1);
  assert.equal(r.contributionAfterMarketing, -3000);
});

test('Zero ad spend produces an undefined ROAS but valid cost modeling', () => {
  const r = calculate({ ...example, adSpend: 0 });
  assert.equal(r.roas, null);
  assert.equal(r.breakEvenROAS, null);
  assert.equal(r.breakEvenRevenue, 1250);
  assert.equal(r.contributionAfterMarketing, 3500);
});

test('Zero total marketing cost never produces infinity or a made-up ROI', () => {
  const r = calculate({ ...example, adSpend: 0, otherMarketingCost: 0 });
  assert.equal(r.contributionROI, null);
  assert.equal(r.breakEvenRevenue, 0);
});

test('A zero margin and positive cost has no finite break-even revenue', () => {
  const r = calculate({ ...example, marginPercent: 0 });
  assert.equal(r.breakEvenRevenue, null);
  assert.equal(r.breakEvenROAS, null);
  assert.equal(r.contributionAfterMarketing, -3000);
});

test('All-zero amounts do not throw and ratios remain undefined', () => {
  const r = calculate({ revenue: 0, adSpend: 0, marginPercent: 0, otherMarketingCost: 0 });
  assert.equal(r.status, 'break-even');
  assert.equal(r.breakEvenRevenue, 0);
  assert.equal(r.roas, null);
  assert.equal(r.contributionROI, null);
});

test('Blank, missing, negative, nonnumeric and nonfinite fields are rejected', () => {
  for (const field of Object.keys(example)) {
    for (const value of ['', ' ', null, undefined, -1, NaN, Infinity, 'oops', {}, true]) {
      assert.throws(() => calculate({ ...example, [field]: value }));
    }
  }
  assert.throws(() => calculate({ ...example, marginPercent: 100.1 }));
});

test('Decimal inputs retain precision and exact break-even is identified', () => {
  const r = calculate({ revenue: '7500', adSpend: '2500', marginPercent: '40', otherMarketingCost: '500' });
  assert.equal(r.contributionAfterMarketing, 0);
  assert.equal(r.status, 'break-even');
  assert.equal(r.contributionROI, 0);
});

test('Overflow is rejected instead of showing misleading results', () => {
  assert.throws(() => calculate({ ...example, adSpend: 1e308, otherMarketingCost: 1e308 }));
});
