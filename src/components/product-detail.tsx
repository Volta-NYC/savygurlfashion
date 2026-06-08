"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { effectivePrice, formatPrice } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { Stars } from "./stars";
import { Bag, Minus, Plus, Truck, Shield, Ruler, ChevronDown, Heart } from "./icons";

const STANDARD_SIZES = ["XS", "S", "M", "L", "XL", "1X", "2X", "3X"];

function deriveSizes(p: Product): string[] {
  if (p.variant !== "Size") return [];
  const oneSize = p.description.some((d) => /one size/i.test(d));
  if (oneSize) return ["One Size"];
  return STANDARD_SIZES;
}

export function ProductDetail({ product }: { product: Product }) {
  const { add, open } = useCart();
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [option, setOption] = useState<string | null>(null);
  const [openSection, setOpenSection] = useState<string | null>("details");
  const [error, setError] = useState(false);

  const price = effectivePrice(product);
  const sizes = useMemo(() => deriveSizes(product), [product]);
  const needsOption = sizes.length > 1;
  const isColor = product.variant === "Color";

  const handleAdd = () => {
    if (needsOption && !option) {
      setError(true);
      return;
    }
    if (price == null) return;
    add(
      {
        slug: product.slug,
        name: product.name,
        price,
        image: product.images[0],
        variant: product.variant,
        option: option ?? (isColor ? "As pictured" : null),
      },
      qty,
    );
  };

  const sections = [
    { id: "details", label: "Product details", content: (
      <ul className="space-y-2 text-sm text-ink-soft">
        {product.description.length ? product.description.map((d, i) => (
          <li key={i} className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-plum" />{d}</li>
        )) : <li>A SavyGurl boutique exclusive. Contact us for more details on fit and fabric.</li>}
      </ul>
    ) },
    { id: "shipping", label: "Shipping & returns", content: (
      <div className="space-y-2 text-sm text-ink-soft">
        <p>Orders ship via USPS Priority or UPS Ground within 1–2 business days. Flat $2 shipping every Tuesday, and free shipping on orders over $49.</p>
        <p>All sales are final — we&apos;re unable to offer refunds, returns, or exchanges. Questions? <Link href="/support" className="text-plum link-underline">Contact support</Link>.</p>
      </div>
    ) },
    { id: "size", label: "Sizing", content: (
      <div className="space-y-2 text-sm text-ink-soft">
        <p>Fit varies per style — check the product details above for specific guidance. When in doubt, refer to our size chart.</p>
        <Link href="/size-chart" className="inline-flex items-center gap-2 text-plum link-underline"><Ruler className="h-4 w-4" /> View size chart</Link>
      </div>
    ) },
  ];

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
      {/* Gallery */}
      <div className="flex flex-col-reverse gap-4 sm:flex-row">
        {product.images.length > 1 && (
          <div className="flex gap-3 sm:flex-col">
            {product.images.map((img, i) => (
              <button
                key={img}
                onClick={() => setActive(i)}
                className={`relative aspect-[3/4] w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-colors sm:w-20 ${
                  active === i ? "border-plum" : "border-transparent hover:border-line"
                }`}
                aria-label={`View image ${i + 1}`}
              >
                <Image src={img} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        )}
        <div className="relative aspect-[3/4] flex-1 overflow-hidden rounded-3xl bg-lilac">
          <Image
            src={product.images[active]}
            alt={product.alt || product.name}
            fill
            priority
            sizes="(max-width:1024px) 100vw, 45vw"
            className="object-cover"
          />
          {product.onSale && (
            <span className="absolute left-4 top-4 rounded-full bg-berry px-3 py-1 text-[0.62rem] font-bold uppercase tracking-widest text-white">Sale</span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="lg:py-2">
        <div className="flex flex-wrap gap-2">
          {product.categories.map((c) => (
            <Link key={c} href={`/collections/${c}`} className="rounded-full bg-sand px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-widest text-plum capitalize hover:bg-lilac">
              {c.replace("-", " ")}
            </Link>
          ))}
        </div>

        <h1 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] leading-none tracking-tightest">{product.name}</h1>

        {product.rating != null && (
          <a href="#reviews" className="mt-3 inline-flex items-center gap-2 text-sm text-ink-soft hover:text-plum">
            <Stars rating={product.rating} />
            {product.rating.toFixed(1)} · {product.reviewCount} review{product.reviewCount === 1 ? "" : "s"}
          </a>
        )}

        <div className="mt-4 flex items-center gap-3">
          {product.onSale ? (
            <>
              <span className="font-display text-2xl text-berry">{formatPrice(product.salePrice)}</span>
              <span className="text-lg text-ink-soft line-through">{formatPrice(product.price)}</span>
              <span className="rounded-full bg-berry/10 px-2.5 py-0.5 text-xs font-semibold text-berry">
                Save {formatPrice((product.price ?? 0) - (product.salePrice ?? 0))}
              </span>
            </>
          ) : (
            <span className="font-display text-2xl">{formatPrice(price)}</span>
          )}
        </div>

        <p className="mt-4 text-sm text-ink-soft">
          {product.description[0] || "A boutique exclusive, styled to make you feel unstoppable."}
        </p>

        {/* Options */}
        {needsOption && (
          <div className="mt-7">
            <div className="flex items-center justify-between">
              <span className="text-[0.72rem] font-semibold uppercase tracking-widest">Select size</span>
              <Link href="/size-chart" className="text-xs text-plum link-underline">Size chart</Link>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => { setOption(s); setError(false); }}
                  className={`min-w-[3rem] rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
                    option === s ? "border-plum bg-plum text-paper" : "border-line bg-cream hover:border-plum"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            {error && <p className="mt-2 text-xs text-berry">Please select a size first.</p>}
          </div>
        )}

        {isColor && !needsOption && (
          <p className="mt-7 text-[0.72rem] font-semibold uppercase tracking-widest text-ink-soft">Color · As pictured</p>
        )}

        {/* Qty + add */}
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="flex items-center rounded-full border border-line">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="px-4 py-3.5 hover:text-plum">
              <Minus className="h-4 w-4" />
            </button>
            <span className="min-w-8 text-center tabular-nums">{qty}</span>
            <button onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity" className="px-4 py-3.5 hover:text-plum">
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <button onClick={handleAdd} className="btn-primary flex-1">
            <Bag className="h-4 w-4" /> Add to bag — {formatPrice(price ? price * qty : null)}
          </button>
          <button aria-label="Add to wishlist" className="grid h-[52px] w-[52px] place-items-center rounded-full border border-line transition-colors hover:border-plum hover:text-plum">
            <Heart className="h-5 w-5" />
          </button>
        </div>

        <button onClick={open} className="mt-3 w-full text-center text-xs font-semibold uppercase tracking-widest text-ink-soft hover:text-plum">
          View bag
        </button>

        {/* Trust */}
        <div className="mt-7 grid grid-cols-2 gap-3 rounded-2xl border border-line bg-cream p-4 text-xs text-ink-soft">
          <p className="flex items-center gap-2"><Truck className="h-4 w-4 text-plum" /> $2 shipping every Tuesday</p>
          <p className="flex items-center gap-2"><Shield className="h-4 w-4 text-plum" /> Secure checkout</p>
          <p className="flex items-center gap-2"><Heart className="h-4 w-4 text-plum" /> Shop now, pay later</p>
          <p className="flex items-center gap-2"><Ruler className="h-4 w-4 text-plum" /> Size-inclusive fit</p>
        </div>

        {/* Accordions */}
        <div className="mt-7 divide-y divide-line border-y border-line">
          {sections.map((s) => (
            <div key={s.id}>
              <button
                onClick={() => setOpenSection((cur) => (cur === s.id ? null : s.id))}
                className="flex w-full items-center justify-between py-4 text-left font-display text-lg"
              >
                {s.label}
                <ChevronDown className={`h-5 w-5 transition-transform ${openSection === s.id ? "rotate-180" : ""}`} />
              </button>
              {openSection === s.id && <div className="pb-5">{s.content}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
