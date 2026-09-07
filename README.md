# TaxaOn
Finnish taxi-meter webshop configurator with Semel product photography, 6/12/24-month contracts, live pricing, optional mPOS, exclusive Phone/Tablet dispatch selection, Vuoro.NET BASIC/EXTRA, and downloadable order review.

## Run
Use the generated pnpm lockfile. `pnpm run dev` starts the app; `pnpm run build` builds for Sites. If your pnpm runtime automatically reinstalls dependencies before scripts, invoke `node_modules/.bin/vinext dev` or `node_modules/.bin/vinext build` directly with Node on PATH.

## Commercial assumptions
This is an explicitly labeled demonstration store. No payment processor, order backend, recipient, merchant identity or TaxaOn terms were supplied. Review/download works locally and does not submit an order. Connect a real order service and approved commercial terms before accepting orders.

Semel source checked 2026-09-07: https://semel.fi/verkkokauppa/ and linked product pages. Original image URLs: public/products/sources.json.
Semel advertises 75/85/95 EUR for 48 months; these are provisionally used as TaxaOn 6-month meter bases, with the user's 10 EUR discount for 12 months and 20 EUR discount for 24 months. These are not Semel quotes for those terms. Accessory prices are provisional constant amounts based on source options: mPOS 34 EUR, Phone 43 EUR, Tablet 61 EUR, EXTRA 8.20 EUR/month. Fee: 150 EUR once, per source. All figures exclude VAT. Semel's actual accessory prices vary by its own contract term. SIM and installation are not included in the calculated quote.

## Validation
Pricing test: `node --experimental-strip-types --test tests/pricing.test.mjs`.
WebMCP configure_taxi_package is feature-detected and shares pricing and React state. No supported WebMCP validation context was available; runtime contract verification remains unverified. No browser visual QA was requested or performed.
