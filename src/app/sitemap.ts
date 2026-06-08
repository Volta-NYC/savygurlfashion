import type { MetadataRoute } from "next";
import { products, categories } from "@/lib/products";
import { policies } from "@/lib/policies";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const staticRoutes = ["", "/shop", "/sale", "/collections", "/rewards", "/support", "/contact", "/about", "/size-chart"];
  return [
    ...staticRoutes.map((r) => ({ url: `${base}${r}`, changeFrequency: "weekly" as const, priority: r === "" ? 1 : 0.7 })),
    ...categories.map((c) => ({ url: `${base}/collections/${c.slug}`, changeFrequency: "weekly" as const, priority: 0.6 })),
    ...products.map((p) => ({ url: `${base}/product/${p.slug}`, changeFrequency: "weekly" as const, priority: 0.6 })),
    ...policies.map((p) => ({ url: `${base}/policies/${p.slug}`, changeFrequency: "yearly" as const, priority: 0.3 })),
  ];
}
