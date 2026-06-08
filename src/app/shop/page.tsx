import type { Metadata } from "next";
import { products } from "@/lib/products";
import { ProductBrowser } from "@/components/product-browser";
import { Breadcrumb } from "@/components/ui";

export const metadata: Metadata = {
  title: "Shop All",
  description: "Browse the full SavyGurl boutique — dresses, sets, jumpsuits, tops, bottoms and more, in regular and plus sizes.",
};

export default function ShopPage() {
  return (
    <div className="shell py-10">
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Shop all" }]} />
      <div className="mt-6 max-w-2xl">
        <p className="eyebrow">The boutique</p>
        <h1 className="mt-2 display-lg">Shop all</h1>
        <p className="mt-3 text-ink-soft">
          Every piece in one place — {products.length} curated styles for women of all sizes. Filter, sort, and find your next favorite.
        </p>
      </div>
      <div className="mt-8">
        <ProductBrowser items={products} />
      </div>
    </div>
  );
}
