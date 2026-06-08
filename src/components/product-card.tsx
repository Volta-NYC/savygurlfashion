"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { effectivePrice, formatPrice } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { Bag } from "./icons";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { add } = useCart();
  const [hover, setHover] = useState(false);
  const price = effectivePrice(product);
  const hasAlt = product.images.length > 1;
  // Only true size selections force a trip to the product page; color / one-size add instantly.
  const sizeRequired =
    product.variant === "Size" && !product.description.some((d) => /one size/i.test(d));

  const quickAdd = (e: React.MouseEvent) => {
    if (sizeRequired || price == null) return; // let the Link navigate to choose a size
    e.preventDefault();
    add({
      slug: product.slug,
      name: product.name,
      price,
      image: product.images[0],
      variant: product.variant,
      option: product.variant === "Color" ? "As pictured" : null,
    });
  };

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-lilac/60">
        <Image
          src={product.images[0]}
          alt={product.alt || product.name}
          fill
          sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 22vw"
          priority={priority}
          className={`object-cover transition-all duration-700 ease-out ${
            hasAlt && hover ? "scale-105 opacity-0" : "group-hover:scale-105 opacity-100"
          }`}
        />
        {hasAlt && (
          <Image
            src={product.images[1]}
            alt=""
            aria-hidden
            fill
            sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 22vw"
            className={`object-cover transition-opacity duration-700 ease-out ${hover ? "opacity-100" : "opacity-0"}`}
          />
        )}

        {/* badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.onSale && (
            <span className="rounded-full bg-berry px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-widest text-white shadow-soft">
              Sale
            </span>
          )}
          {product.isNew && !product.onSale && (
            <span className="rounded-full bg-ink px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-widest text-paper">
              New
            </span>
          )}
        </div>

        {/* quick add */}
        <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            onClick={quickAdd}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-paper/95 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-ink backdrop-blur transition-colors hover:bg-plum hover:text-paper"
          >
            <Bag className="h-4 w-4" />
            {sizeRequired ? "View options" : "Quick add"}
          </button>
        </div>
      </div>

      <div className="mt-3.5 px-0.5">
        <h3 className="font-display text-[1.05rem] leading-tight tracking-tight">{product.name}</h3>
        <div className="mt-1 flex items-center gap-2 text-sm">
          {product.onSale ? (
            <>
              <span className="font-semibold text-berry">{formatPrice(product.salePrice)}</span>
              <span className="text-ink-soft line-through">{formatPrice(product.price)}</span>
            </>
          ) : (
            <span className="font-medium text-ink">{formatPrice(price)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
