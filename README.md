# PPC Profitability Calculator: ROAS, Break-Even ROAS and Contribution Margin

**[Open the live calculator](https://hustlemarketers-art.github.io/ppc-profitability-calculator/)**

A free browser calculator that shows whether your Google Ads, Meta Ads or Microsoft Ads spend is actually profitable once product margin and agency or creative costs are included. It calculates ROAS, break-even ROAS, break-even revenue and contribution after marketing.

Built by [Ishant Sharma](https://ishantsharmamarketer.com/), Google Ads specialist and founder of [Hustle Marketers](https://hustlemarketers.com/).

## Why it exists

A campaign can report 4x ROAS and still lose money when margins are thin or marketing costs are high. This calculator puts those assumptions on screen and handles blank inputs and zero denominators explicitly, so it never shows a made-up infinite ROI.

## Run it

Use the [live version](https://hustlemarketers-art.github.io/ppc-profitability-calculator/), or open `index.html` in any modern browser. No account, API key, install or build step. Your figures stay in the browser: the page makes no network requests and saves nothing.

The default values are a fictional example. Press **Clear inputs** to start fresh.

## Inputs

Use the same period and currency for every amount.

| Input | Meaning |
| --- | --- |
| Attributed revenue | Revenue recorded for the campaigns being modeled (use net revenue consistently). |
| Ad spend | Media spend for those campaigns. |
| Contribution margin before marketing | Percentage of revenue left after variable product and fulfillment costs, before the marketing costs entered here. |
| Other marketing costs | Agency fees, creative and other marketing costs for the same revenue and period. |

## Formulas

With `R = revenue`, `A = ad spend`, `O = other marketing costs` and `m = contribution margin as a decimal`:

| Result | Formula |
| --- | --- |
| ROAS | `R / A` |
| Contribution before marketing | `R * m` |
| Contribution after marketing | `R * m - A - O` |
| Modeled contribution ROI | `(R * m - A - O) / (A + O)` |
| Break-even revenue | `(A + O) / m` |
| Break-even ROAS (including other costs) | `(A + O) / (A * m)` |

Ratios with a zero denominator show as **Not defined**. With zero margin and positive marketing cost there is no finite break-even revenue; if both are zero, break-even revenue is zero.

This models contribution on attributed revenue. It does not measure incremental revenue or causal ROMI, deduct fixed overhead, taxes or financing costs, or model lifetime value. Break-even figures hold margin and costs fixed, so recalculate when spend changes.

## Use the math in your own code

`metrics.js` works in the browser and in Node.js:

```js
const { calculate } = require('./metrics.js');
const r = calculate({ revenue: 40000, adSpend: 10000, marginPercent: 35, otherMarketingCost: 2000 });
console.log(r.roas, r.breakEvenROAS, r.contributionAfterMarketing); // 4 3.428... 2000
```

## Tests

With Node.js 18 or later:

```sh
npm test
```

Ten tests cover profit, loss, exact break-even, zero and blank inputs, invalid values and overflow.

## Related

- [google-ads-scripts](https://github.com/hustlemarketers-art/google-ads-scripts): read-only Google Ads audit and reporting scripts.
- [ROAS Calculator](https://hustlemarketers.com/roas-calculator/), [CPA Calculator](https://hustlemarketers.com/tools/cpa-calculator/) and more [free PPC tools](https://hustlemarketers.com/tools/).

## Author

**Ishant Sharma** (Chandigarh, India) has run paid search and ecommerce advertising since 2013 and leads [Hustle Marketers](https://hustlemarketers.com/), a digital marketing agency. [Get in touch](https://hustlemarketers.com/contact-us/).

## License

[MIT](LICENSE). Example values are fictional.
