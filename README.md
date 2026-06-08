# SavyGurl — Boutique Storefront

A modern, fast, fully responsive storefront for **SavyGurl**, an online boutique for
affordable, sustainable, size-inclusive women's fashion. Rebuilt from scraped source
material into a polished, self-contained Next.js application.

> _More than fashion — it's how you show up for yourself._

---

## ✨ Highlights

- **74 products** across **11 collections**, normalized from raw scraped markdown.
- **100% self-hosted media** — every image is served locally from `/public`; there are
  **no runtime dependencies on the original Wix CDN**.
- **103 statically prerendered pages** (products, collections, policies, etc.).
- Editorial design system: warm ivory + aubergine-plum palette, Fraunces × Hanken Grotesk.
- Full shopping experience: mega-menu nav, instant search, persistent cart drawer,
  quick-add, product galleries, filtering/sorting, and a demo checkout.
- SEO + a11y baked in: per-page metadata, JSON-LD product schema, sitemap, robots,
  semantic HTML, focus styles, reduced-motion support.

---

## 🛠 Tech Stack

- **Next.js 14** (App Router, static export-friendly SSG)
- **React 18** + **TypeScript**
- **Tailwind CSS 3** (custom design tokens)
- **Framer Motion** (tasteful, reduced-motion-aware animation)
- **next/font** (self-hosted Google fonts at build time)

---

## 📂 Project Structure

```
raw messy data/          # Source: scraped markdown + already-downloaded image assets
scripts/build-data.mjs   # Data pipeline (markdown → JSON + image copy)
src/
  app/                   # Routes (home, shop, collections, product, support, …)
  components/            # Reusable UI (header, cart, product card, etc.)
  data/                  # Generated products.json + categories.json (do not edit by hand)
  lib/                   # Types, data accessors, cart context, site config, policies
public/images/           # Generated product imagery + brand assets
```

### Key routes

| Route | Description |
|-------|-------------|
| `/` | Home — hero, categories, new arrivals, sale edit, community |
| `/shop` | All products, with filter + sort |
| `/collections` · `/collections/[slug]` | Collection index + per-category pages |
| `/product/[slug]` | Product detail (gallery, variants, add-to-cart, related) |
| `/sale` | Marked-down styles |
| `/rewards` | Savy Rewards loyalty program |
| `/support` · `/contact` | FAQ + customer support + contact form |
| `/size-chart` | Sizing guide |
| `/about` | Brand story |
| `/policies/[terms\|privacy\|accessibility]` | Legal pages |
| `/checkout` | Cart review + demo checkout |

---

## 🧬 Data Pipeline

`scripts/build-data.mjs` runs automatically before `dev` and `build`. It:

1. Parses every listing + product markdown file in `raw messy data/pages`.
2. Extracts names, prices, sale prices, descriptions, variants, categories, and the
   `New In` flag.
3. Maps each scraped Wix image URL to its already-downloaded local file **by hash**
   (`b47473_<hash>~mv2.jpg` → `assets/images/b47473_<hash>_mv2.jpg`), de-duplicates,
   and copies them into `public/images/products/` with clean slug-based names.
4. Emits `src/data/products.json` and `src/data/categories.json`.

Re-run manually any time with:

```bash
npm run data
```

---

## 🧑‍💻 Development

```bash
npm install
npm run dev      # http://localhost:3000  (regenerates data first)
```

Production build:

```bash
npm run build && npm run start
```

---

## 🚀 Deployment

Deploys cleanly to Vercel (or any Node host). The data pipeline runs in `prebuild`, so the
generated datasets and imagery are produced as part of the build — no manual steps needed.

---

_Website made by [@VoltaNYC](https://nyc.voltanpo.org)._
