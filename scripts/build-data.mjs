/**
 * SavyGurl data pipeline
 * ----------------------
 * Source of truth: the markdown crawl in `raw messy data 2/` (flat folder,
 * `www.savygurlfashion.com_*.md`). Imagery is resolved against the already
 * downloaded high-resolution library in `raw messy data/assets/images`, mapped
 * by the shared Wix hash. Output:
 *
 *   src/data/products.json    – full product catalog
 *   src/data/categories.json  – browsable collections
 *   src/data/reviews.json     – real customer testimonials
 *   public/images/products/*  – clean-named product imagery
 *   public/images/brand/*     – logo / favicon source
 */
import { readFileSync, readdirSync, writeFileSync, mkdirSync, copyFileSync, existsSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

// Source renders are wildly oversized (up to 2250×3000 / 5 MB). The UI never
// shows them larger than ~700px CSS, so we downscale to a retina-safe cap and
// emit compact WebP — this is what keeps the image optimizer fast at runtime.
const MAX_EDGE = 1600;
const WEBP_QUALITY = 82;

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PAGES = join(ROOT, "raw messy data 2");
const IMG_SRC = join(ROOT, "raw messy data", "assets", "images");
const BRAND_SRC = join(ROOT, "raw messy data", "assets", "branding");
const DATA_OUT = join(ROOT, "src", "data");
const IMG_OUT = join(ROOT, "public", "images", "products");
const BRAND_OUT = join(ROOT, "public", "images", "brand");

const BRAND_HASH = "97c46b5cb0a8418e9577832eba992dd4"; // SG logo / favicon source
// Hashes that are chrome (logos, icons) rather than product imagery.
const EXCLUDED_HASHES = new Set([BRAND_HASH, "0c64a2abf711468fb02b7fe9dc829010"]);

// File key (filename minus the `www.savygurlfashion.com_` prefix and `.md`) → collection.
const CATEGORY_OF_KEY = {
  "": "new-arrivals", "general-2": "new-arrivals", "new-arrivals": "new-arrivals",
  shop: "all", "shop_page=2": "all",
  dresses: "dresses", jumpsuits: "jumpsuits", tops: "tops", pants: "bottoms",
  skirts: "skirts", shoes: "shoes", outerwear: "outerwear",
  sets: "sets", "sets_page=2": "sets", "plus-size": "plus-size",
  "savygurl-merchandise": "merch",
};

const CATEGORY_META = {
  "new-arrivals": { name: "New Arrivals", blurb: "The latest drops, fresh off the rack." },
  sets: { name: "Sets", blurb: "Effortless two-pieces that do the styling for you." },
  dresses: { name: "Dresses", blurb: "From brunch to black-tie, a dress for every moment." },
  jumpsuits: { name: "Jumpsuits", blurb: "One and done — bold silhouettes, zero effort." },
  tops: { name: "Tops", blurb: "The building blocks of an unforgettable fit." },
  bottoms: { name: "Bottoms", blurb: "Pants that move with you, all day long." },
  skirts: { name: "Skirts", blurb: "Twirl-worthy shapes in every length." },
  shoes: { name: "Shoes", blurb: "Finish the look from the ground up." },
  outerwear: { name: "Outerwear", blurb: "Layers that make the whole outfit." },
  merch: { name: "SavyGurl Merch", blurb: "Wear the brand. Live the mantra." },
  "plus-size": { name: "Plus Size", blurb: "Size-inclusive style, designed to celebrate every curve." },
};

const CATEGORY_ORDER = ["new-arrivals", "sets", "dresses", "jumpsuits", "tops", "bottoms", "skirts", "shoes", "outerwear", "plus-size", "merch"];

const fileKey = (f) => f.replace(/^www\.savygurlfashion\.com_/, "").replace(/\.md$/, "");

// ---------------------------------------------------------------------------
// Dependency-free image dimension reader (JPEG + PNG) used to pick the highest
// quality render for each hash (Wix stores several sizes on disk).
// ---------------------------------------------------------------------------
function imageSize(path) {
  let buf;
  try { buf = readFileSync(path); } catch { return null; }
  if (buf.length > 24 && buf[0] === 0x89 && buf[1] === 0x50) {
    return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
  }
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let o = 2;
    while (o < buf.length) {
      if (buf[o] !== 0xff) { o++; continue; }
      const marker = buf[o + 1];
      if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
        return { h: buf.readUInt16BE(o + 5), w: buf.readUInt16BE(o + 7) };
      }
      o += 2 + buf.readUInt16BE(o + 2);
    }
  }
  return null;
}

// Index local files by hash, preferring the largest portrait/square render
// (keeps full-body fashion composition); fall back to the largest landscape.
const variantsByHash = new Map();
for (const f of readdirSync(IMG_SRC)) {
  const m = f.match(/^b47473_([a-f0-9]{20,})_mv2(?:_(\d+))?\.(\w+)$/);
  if (!m) continue;
  const [, hash, , ext] = m;
  const dim = imageSize(join(IMG_SRC, f)) ?? { w: 0, h: 0 };
  const list = variantsByHash.get(hash) ?? [];
  list.push({ file: f, ext, area: dim.w * dim.h, portrait: dim.h >= dim.w });
  variantsByHash.set(hash, list);
}
const localByHash = new Map();
for (const [hash, list] of variantsByHash) {
  const portrait = list.filter((v) => v.portrait && v.area > 0);
  const pool = portrait.length ? portrait : list;
  localByHash.set(hash, pool.reduce((a, b) => (b.area > a.area ? b : a)));
}

const parseImageUrl = (url) => {
  const m = url.match(/b47473_([a-f0-9]{20,})~mv2\.(\w+)/);
  return m ? { hash: m[1], ext: m[2] } : null;
};

function parsePrice(text) {
  const sale = text.match(/\$([\d.]+)\s*Regular Price\s*\$([\d.]+)\s*Sale Price/i)
    || text.match(/Regular Price\s*\$([\d.]+)\s*Sale Price\s*\$([\d.]+)/i);
  if (sale) {
    const a = Number(sale[1]), b = Number(sale[2]);
    return { price: Math.max(a, b), salePrice: Math.min(a, b) };
  }
  const one = text.match(/\$([\d.]+)\s*Price|Price\s*\$([\d.]+)|\$([\d.]+)/i);
  return one ? { price: Number(one[1] || one[2] || one[3]), salePrice: null } : { price: null, salePrice: null };
}

// ---------------------------------------------------------------------------
// Collect products.
// ---------------------------------------------------------------------------
const products = new Map();
const LINK_RE = /\[([\s\S]*?)\]\(https:\/\/www\.savygurlfashion\.com\/product-page\/([a-z0-9-]+)\)/g;

function ensure(slug) {
  if (!products.has(slug)) {
    products.set(slug, {
      slug, name: null, price: null, salePrice: null,
      categories: new Set(), isNew: false, description: [], variant: null,
      alt: null, imageHashes: [],
    });
  }
  return products.get(slug);
}
function addHash(p, hash, ext) {
  if (EXCLUDED_HASHES.has(hash)) return;
  if (!p.imageHashes.find((h) => h.hash === hash)) p.imageHashes.push({ hash, ext });
}

const files = readdirSync(PAGES).filter((f) => f.endsWith(".md"));

// --- Pass 1: listing pages → category membership, isNew, fallback name/price/image
for (const file of files) {
  const key = fileKey(file);
  const cat = CATEGORY_OF_KEY[key];
  if (cat === undefined) continue;
  const md = readFileSync(join(PAGES, file), "utf8");
  let m;
  LINK_RE.lastIndex = 0;
  while ((m = LINK_RE.exec(md))) {
    const text = m[1];
    const p = ensure(m[2]);
    if (cat === "new-arrivals") p.isNew = true;
    else if (cat !== "all") p.categories.add(cat);

    if (text.trimStart().startsWith("![")) {
      const im = text.match(/!\[([^\]]*)\]\((https:\/\/static\.wixstatic\.com\/media\/[^)]+)\)/);
      if (im) {
        if (!p.alt && im[1].trim()) p.alt = im[1].trim();
        const info = parseImageUrl(im[2]);
        if (info) addHash(p, info.hash, info.ext);
      }
    } else {
      const cleaned = text.replace(/\\/g, "").replace(/\* \* \*/g, "\n").trim();
      const name = cleaned.split(/\n/).map((s) => s.trim()).filter(Boolean)[0];
      if (name && !p.name) p.name = name.replace(/\s+\|.*$/, "").trim();
      const pr = parsePrice(cleaned);
      if (pr.price != null && p.price == null) { p.price = pr.price; p.salePrice = pr.salePrice; }
    }
  }
}

// --- Pass 2: product detail pages → canonical content (authoritative)
const reviews = [];
const seenReview = new Set();

for (const file of files) {
  if (!file.includes("_product-page_")) continue;
  const md = readFileSync(join(PAGES, file), "utf8");
  const slug = (md.match(/url:\s*"[^"]*\/product-page\/([a-z0-9-]+)"/) || [])[1]
    || fileKey(file).replace(/^product-page_/, "");
  const p = ensure(slug);

  const reviewsIdx = md.search(/^##\s+Reviews/m);
  const head = reviewsIdx > -1 ? md.slice(0, reviewsIdx) : md;

  // Name: first ATX H1, minus any " | category" suffix.
  const nameM = head.match(/^#\s+(.+)$/m);
  if (nameM) p.name = nameM[1].replace(/\s*\|.*$/, "").trim();

  const pr = parsePrice(head);
  if (pr.price != null) { p.price = pr.price; p.salePrice = pr.salePrice; }

  if (/Color\\?\*/.test(head)) p.variant = "Color";
  else if (/Size\\?\*/.test(head)) p.variant = "Size";

  // Description lives in a fenced code block.
  const fence = head.match(/```+\s*\n([\s\S]*?)```/);
  if (fence) {
    const bullets = fence[1].split(/\n/).map((l) => l.replace(/\\/g, "").trim())
      .filter((l) => l && l !== "* * *" && !/^[-—]+$/.test(l));
    if (bullets.length) p.description = [...new Set(bullets)].slice(0, 14);
  }

  // Images (before the reviews block), unique by hash, in order.
  const imgRe = /!\[[^\]]*\]\((https:\/\/static\.wixstatic\.com\/media\/[^)]+)\)/g;
  let im;
  const detail = [];
  while ((im = imgRe.exec(head))) {
    const info = parseImageUrl(im[1]);
    if (info && !EXCLUDED_HASHES.has(info.hash) && !detail.find((h) => h.hash === info.hash)) detail.push(info);
  }
  if (detail.length) p.imageHashes = detail;

  // Reviews: the site-wide carousel repeats on every product page → dedupe.
  if (reviewsIdx > -1) {
    const segments = md.slice(reviewsIdx).split(/!\[Review author avatar image\]/).slice(1);
    for (const seg of segments) {
      const productM = seg.match(/Product:\s*\[([^\]]+)\]\(https:\/\/www\.savygurlfashion\.com\/product-page\/([a-z0-9-]+)\)/);
      if (!productM) continue;
      const lines = seg.replace(/^\([^)]*\)/, "").split(/\n/).map((l) => l.trim()).filter(Boolean);
      const starIdx = lines.findIndex((l) => /^★+$/.test(l.replace(/\s/g, "")));
      if (starIdx < 2) continue;
      const rating = Number(lines[starIdx - 1]) || 5;
      const author = lines[0];
      const location = lines[1];
      const title = lines[starIdx + 1] || "";
      const body = lines[starIdx + 2] && !/^Product:/.test(lines[starIdx + 2]) ? lines[starIdx + 2] : title;
      const dedupe = `${author}|${title}|${body}`;
      if (seenReview.has(dedupe)) continue;
      seenReview.add(dedupe);
      reviews.push({ author, location, rating, title, body, productName: productM[1], productSlug: productM[2] });
    }
  }
}

// ---------------------------------------------------------------------------
// Resolve imagery → copy to public.
// ---------------------------------------------------------------------------
for (const dir of [IMG_OUT, BRAND_OUT, DATA_OUT]) {
  if (existsSync(dir)) rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
}

let copied = 0, missing = 0;
const finalProducts = [];
for (const p of products.values()) {
  const images = [];
  let i = 0;
  for (const { hash } of p.imageHashes) {
    const local = localByHash.get(hash);
    if (!local) { missing++; continue; }
    const outName = `${p.slug}-${++i}.webp`;
    await sharp(join(IMG_SRC, local.file), { failOn: "none" })
      .rotate() // honor EXIF orientation
      .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toFile(join(IMG_OUT, outName));
    images.push(`/images/products/${outName}`);
    copied++;
  }
  finalProducts.push({
    slug: p.slug,
    name: p.name || p.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    price: p.price,
    salePrice: p.salePrice,
    onSale: p.salePrice != null,
    categories: [...p.categories],
    isNew: p.isNew,
    variant: p.variant,
    description: p.description,
    alt: p.alt,
    images: images.length ? images : ["/images/placeholder.svg"],
  });
}
finalProducts.sort((a, b) => a.name.localeCompare(b.name));

// Attach review counts/ratings to products.
const reviewBySlug = new Map();
for (const r of reviews) {
  const list = reviewBySlug.get(r.productSlug) ?? [];
  list.push(r);
  reviewBySlug.set(r.productSlug, list);
}
for (const p of finalProducts) {
  const rs = reviewBySlug.get(p.slug) ?? [];
  if (rs.length) {
    p.rating = Number((rs.reduce((s, r) => s + r.rating, 0) / rs.length).toFixed(1));
    p.reviewCount = rs.length;
  }
}

// ---------------------------------------------------------------------------
// Categories.
// ---------------------------------------------------------------------------
const categories = [];
for (const slug of CATEGORY_ORDER) {
  const items = slug === "new-arrivals"
    ? finalProducts.filter((p) => p.isNew)
    : finalProducts.filter((p) => p.categories.includes(slug));
  if (!items.length) continue;
  const hero = items.find((p) => !p.images[0].endsWith(".svg"));
  categories.push({
    slug, name: CATEGORY_META[slug].name, blurb: CATEGORY_META[slug].blurb,
    count: items.length, heroImage: hero ? hero.images[0] : null,
  });
}

// ---------------------------------------------------------------------------
// Brand asset + write datasets.
// ---------------------------------------------------------------------------
const logoFile = `b47473_${BRAND_HASH}_mv2.png`;
if (existsSync(join(BRAND_SRC, logoFile))) copyFileSync(join(BRAND_SRC, logoFile), join(BRAND_OUT, "savygurl-logo.png"));

writeFileSync(join(DATA_OUT, "products.json"), JSON.stringify(finalProducts, null, 2));
writeFileSync(join(DATA_OUT, "categories.json"), JSON.stringify(categories, null, 2));
writeFileSync(join(DATA_OUT, "reviews.json"), JSON.stringify(reviews, null, 2));

const withImages = finalProducts.filter((p) => !p.images[0].endsWith(".svg")).length;
const withDesc = finalProducts.filter((p) => p.description.length).length;
console.log(`✓ products: ${finalProducts.length} (with images: ${withImages}, with description: ${withDesc})`);
console.log(`✓ categories: ${categories.length} -> ${categories.map((c) => `${c.slug}(${c.count})`).join(", ")}`);
console.log(`✓ reviews: ${reviews.length}`);
console.log(`✓ images copied: ${copied}, missing-local: ${missing}`);
