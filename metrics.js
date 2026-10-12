(function (root) {
  'use strict';

  function readNumber(value, label) {
    if (value === null || value === undefined ||
        (typeof value === 'string' && value.trim() === '')) {
      throw new Error('Enter ' + label + '.');
    }
    if (typeof value !== 'number' && typeof value !== 'string') {
      throw new Error(label + ' must be a number.');
    }
    const result = Number(value);
    if (!Number.isFinite(result) || result < 0) {
      throw new Error(label + ' must be a finite number of zero or more.');
    }
    return result;
  }

  function calculate(input) {
    const revenue = readNumber(input.revenue, 'attributed revenue');
    const adSpend = readNumber(input.adSpend, 'ad spend');
    const marginPercent = readNumber(input.marginPercent, 'contribution margin');
    const otherMarketingCost = readNumber(input.otherMarketingCost, 'other marketing costs');
    if (marginPercent > 100) {
      throw new Error('Contribution margin must be between 0 and 100 percent.');
    }
    const margin = marginPercent / 100;
    const marketingCost = adSpend + otherMarketingCost;
    const contributionBeforeMarketing = revenue * margin;
    const contributionAfterMarketing = contributionBeforeMarketing - marketingCost;
    const results = {
      revenue, adSpend, marginPercent, otherMarketingCost, marketingCost,
      contributionBeforeMarketing, contributionAfterMarketing,
      roas: adSpend > 0 ? revenue / adSpend : null,
      contributionROI: marketingCost > 0 ? contributionAfterMarketing / marketingCost : null,
      breakEvenRevenue: margin > 0 ? marketingCost / margin : (marketingCost === 0 ? 0 : null),
      breakEvenROAS: adSpend > 0 && margin > 0 ? marketingCost / (adSpend * margin) : null
    };
    for (const value of Object.values(results)) {
      if (value !== null && !Number.isFinite(value)) {
        throw new Error('These values are too large to calculate. Use smaller amounts.');
      }
    }
    results.status = contributionAfterMarketing > 0 ? 'positive' :
      contributionAfterMarketing < 0 ? 'negative' : 'break-even';
    return Object.freeze(results);
  }

  const api = Object.freeze({ calculate });
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.PPCProfitability = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
