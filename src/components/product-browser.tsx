"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { effectivePrice } from "@/lib/products";
import { ProductGrid } from "./ui";
import { ChevronDown } from "./icons";

type SortKey = "featured" | "price-asc" | "price-desc" | "name-asc" | "name-desc";

const sortLabels: Record<SortKey, string> = {
  featured: "Featured",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  "name-asc": "Name: A–Z",
  "name-desc": "Name: Z–A",
};

const filters = [
  { key: "all", label: "All" },
  { key: "new", label: "New In" },
  { key: "sale", label: "On Sale" },
] as const;

export function ProductBrowser({ items }: { items: Product[] }) {
  const [sort, setSort] = useState<SortKey>("featured");
  const [filter, setFilter] = useState<(typeof filters)[number]["key"]>("all");
  const [menuOpen, setMenuOpen] = useState(false);

  const visible = useMemo(() => {
    let list = [...items];
    if (filter === "new") list = list.filter((p) => p.isNew);
    if (filter === "sale") list = list.filter((p) => p.onSale);
    const price = (p: Product) => effectivePrice(p) ?? Number.POSITIVE_INFINITY;
    switch (sort) {
      case "price-asc": list.sort((a, b) => price(a) - price(b)); break;
      case "price-desc": list.sort((a, b) => price(b) - price(a)); break;
      case "name-asc": list.sort((a, b) => a.name.localeCompare(b.name)); break;
      case "name-desc": list.sort((a, b) => b.name.localeCompare(a.name)); break;
      default: list.sort((a, b) => Number(b.isNew) - Number(a.isNew) || Number(b.onSale) - Number(a.onSale));
    }
    return list;
  }, [items, sort, filter]);

  const hasNew = items.some((p) => p.isNew);
  const hasSale = items.some((p) => p.onSale);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-y border-line py-4">
        <div className="flex flex-wrap gap-2">
          {filters
            .filter((f) => f.key === "all" || (f.key === "new" && hasNew) || (f.key === "sale" && hasSale))
            .map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`rounded-full px-4 py-2 text-[0.78rem] font-semibold uppercase tracking-widest transition-colors ${
                  filter === f.key ? "bg-plum text-paper" : "bg-sand text-ink hover:bg-lilac"
                }`}
              >
                {f.label}
              </button>
            ))}
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden text-xs uppercase tracking-widest text-ink-soft sm:block">{visible.length} items</span>
          <div className="relative">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              onBlur={() => setTimeout(() => setMenuOpen(false), 150)}
              className="flex items-center gap-2 rounded-full border border-line bg-cream px-4 py-2 text-[0.78rem] font-semibold uppercase tracking-widest hover:border-plum"
            >
              {sortLabels[sort]}
              <ChevronDown className={`h-4 w-4 transition-transform ${menuOpen ? "rotate-180" : ""}`} />
            </button>
            {menuOpen && (
              <div className="absolute right-0 z-30 mt-2 w-56 overflow-hidden rounded-2xl border border-line bg-cream py-1.5 shadow-soft">
                {(Object.keys(sortLabels) as SortKey[]).map((k) => (
                  <button
                    key={k}
                    onMouseDown={() => { setSort(k); setMenuOpen(false); }}
                    className={`block w-full px-4 py-2.5 text-left text-sm hover:bg-sand ${sort === k ? "text-plum" : ""}`}
                  >
                    {sortLabels[k]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-10">
        {visible.length ? (
          <ProductGrid items={visible} priorityCount={4} />
        ) : (
          <p className="py-20 text-center text-ink-soft">Nothing here yet — check back soon.</p>
        )}
      </div>
    </div>
  );
}
