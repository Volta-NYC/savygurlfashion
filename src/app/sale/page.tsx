import type { Metadata } from "next";
import { onSaleProducts } from "@/lib/products";
import { ProductBrowser } from "@/components/product-browser";
import { Breadcrumb } from "@/components/ui";

export const metadata: Metadata = {
  title: "Sale",
  description: "Shop marked-down styles at SavyGurl. Limited-time prices on dresses, sets, and more.",
};

export default function SalePage() {
  const items = onSaleProducts();
  return (
    <div className="shell py-10">
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Sale" }]} />
      <div className="mt-6 max-w-2xl">
        <p className="eyebrow text-berry">Limited time</p>
        <h1 className="mt-2 display-lg">The sale edit</h1>
        <p className="mt-3 text-ink-soft">{items.length} styles marked down. Once they&apos;re gone, they&apos;re gone.</p>
      </div>
      <div className="mt-8">
        <ProductBrowser items={items} />
      </div>
    </div>
  );
}
