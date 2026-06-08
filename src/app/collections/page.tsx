import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/products";
import { PageHeader } from "@/components/ui";
import { ArrowUpRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Collections",
  description: "Browse every SavyGurl collection — sets, dresses, jumpsuits, tops, bottoms, plus size and more.",
};

export default function CollectionsPage() {
  return (
    <div>
      <PageHeader eyebrow="Browse" title="Collections" description="Curated edits to help you find exactly what you're looking for." />
      <div className="shell grid grid-cols-1 gap-5 pb-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <Link key={c.slug} href={`/collections/${c.slug}`} className="group relative block aspect-[5/4] overflow-hidden rounded-3xl bg-lilac">
            {c.heroImage && (
              <Image src={c.heroImage} alt={c.name} fill sizes="(max-width:1024px) 50vw, 30vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-plum-deep/80 via-plum-deep/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-paper">
              <div>
                <p className="font-display text-2xl">{c.name}</p>
                <p className="mt-1 max-w-[14rem] text-xs text-paper/80">{c.blurb}</p>
                <p className="mt-2 text-[0.68rem] uppercase tracking-widest text-paper/70">{c.count} styles</p>
              </div>
              <span className="grid h-10 w-10 place-items-center rounded-full bg-paper/20 backdrop-blur transition-colors group-hover:bg-paper group-hover:text-plum">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
