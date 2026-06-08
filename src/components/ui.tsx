import Link from "next/link";
import type { Product } from "@/lib/types";
import { ProductCard } from "./product-card";
import { ArrowRight } from "./icons";

export function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  hrefLabel = "View all",
  center = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  hrefLabel?: string;
  center?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between ${center ? "sm:flex-col sm:items-center sm:text-center" : ""}`}>
      <div className={center ? "mx-auto max-w-2xl" : "max-w-2xl"}>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="mt-2 display-lg">{title}</h2>
        {description && <p className="mt-3 text-ink-soft">{description}</p>}
      </div>
      {href && (
        <Link href={href} className="group inline-flex w-fit items-center gap-2 text-[0.82rem] font-semibold uppercase tracking-widest text-plum">
          {hrefLabel}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}

export function ProductGrid({ items, priorityCount = 0 }: { items: Product[]; priorityCount?: number }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-6 lg:grid-cols-4">
      {items.map((p, i) => (
        <ProductCard key={p.slug} product={p} priority={i < priorityCount} />
      ))}
    </div>
  );
}

export function Breadcrumb({ trail }: { trail: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs uppercase tracking-widest text-ink-soft">
      {trail.map((c, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {c.href ? (
            <Link href={c.href} className="hover:text-plum">{c.label}</Link>
          ) : (
            <span className="text-ink">{c.label}</span>
          )}
          {i < trail.length - 1 && <span className="text-line">/</span>}
        </span>
      ))}
    </nav>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="shell pb-10 pt-12 text-center sm:pt-16">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1 className="mx-auto mt-3 max-w-3xl display-lg text-balance">{title}</h1>
      {description && <p className="mx-auto mt-4 max-w-xl text-ink-soft">{description}</p>}
      {children}
    </header>
  );
}
