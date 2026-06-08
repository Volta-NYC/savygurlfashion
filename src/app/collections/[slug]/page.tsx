import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { categories, getCategory, productsInCategory } from "@/lib/products";
import { ProductBrowser } from "@/components/product-browser";
import { Breadcrumb } from "@/components/ui";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const cat = getCategory(params.slug);
  if (!cat) return {};
  return {
    title: cat.name,
    description: `${cat.blurb} Shop ${cat.name} at SavyGurl.`,
  };
}

export default function CollectionPage({ params }: { params: { slug: string } }) {
  const cat = getCategory(params.slug);
  if (!cat) notFound();
  const items = productsInCategory(params.slug);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-line bg-plum text-paper">
        {cat.heroImage && (
          <Image src={cat.heroImage} alt="" fill sizes="100vw" className="object-cover opacity-25" priority />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-plum-deep/90 to-plum/60" />
        <div className="shell relative py-16 sm:py-20">
          <Breadcrumb
            trail={[{ label: "Home", href: "/" }, { label: "Shop", href: "/shop" }, { label: cat.name }]}
          />
          <h1 className="mt-5 font-display text-[clamp(2.4rem,5vw,4rem)] leading-none tracking-tightest">{cat.name}</h1>
          <p className="mt-3 max-w-lg text-paper/80">{cat.blurb}</p>
          <p className="mt-4 text-xs uppercase tracking-widest text-paper/60">{items.length} styles</p>
        </div>
      </section>

      <div className="shell py-10">
        <ProductBrowser items={items} />
      </div>
    </div>
  );
}
