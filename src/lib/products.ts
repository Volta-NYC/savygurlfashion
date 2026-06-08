import productsData from "@/data/products.json";
import categoriesData from "@/data/categories.json";
import reviewsData from "@/data/reviews.json";
import type { Category, Product, Review } from "./types";

export const products = productsData as Product[];
export const categories = categoriesData as Category[];
export const reviews = reviewsData as Review[];

export function reviewsForProduct(slug: string): Review[] {
  return reviews.filter((r) => r.productSlug === slug);
}

/** Tidy up scraped location strings like "Fayetteville, US-NC". */
export function cleanLocation(loc: string): string {
  return loc.replace(/,\s*US-/, ", ").replace(/,\s*US$/, "");
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function productsInCategory(slug: string): Product[] {
  if (slug === "all") return [...products];
  if (slug === "new-arrivals") return products.filter((p) => p.isNew);
  if (slug === "sale") return products.filter((p) => p.onSale);
  return products.filter((p) => p.categories.includes(slug));
}

export function newArrivals(limit?: number): Product[] {
  const items = products.filter((p) => p.isNew);
  const list = items.length ? items : products;
  return limit ? list.slice(0, limit) : list;
}

export function onSaleProducts(limit?: number): Product[] {
  const items = products.filter((p) => p.onSale);
  return limit ? items.slice(0, limit) : items;
}

export function relatedProducts(product: Product, limit = 4): Product[] {
  const sameCat = products.filter(
    (p) => p.slug !== product.slug && p.categories.some((c) => product.categories.includes(c)),
  );
  const pool = sameCat.length >= limit ? sameCat : products.filter((p) => p.slug !== product.slug);
  return pool.slice(0, limit);
}

export const effectivePrice = (p: Product): number | null =>
  p.onSale && p.salePrice != null ? p.salePrice : p.price;

export function formatPrice(value: number | null): string {
  if (value == null) return "—";
  return `$${value.toFixed(2)}`;
}
