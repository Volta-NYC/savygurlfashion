"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart, cartKeyOf } from "@/lib/cart";
import { formatPrice } from "@/lib/products";
import { Breadcrumb } from "@/components/ui";
import { Shield, Truck } from "@/components/icons";

const field = "w-full rounded-2xl border border-line bg-cream px-4 py-3.5 text-sm outline-none transition-colors focus:border-plum";

export default function CheckoutPage() {
  const { items, subtotal, clear, count } = useCart();
  const [placed, setPlaced] = useState(false);
  const shipping = subtotal >= 49 || subtotal === 0 ? 0 : 6.99;

  if (placed) {
    return (
      <div className="shell flex flex-col items-center gap-4 py-28 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-lilac text-3xl">💜</span>
        <h1 className="display-lg">Thank you!</h1>
        <p className="max-w-md text-ink-soft">
          This is a demo storefront, so no payment was taken. On the live boutique, your order confirmation would arrive by email.
        </p>
        <Link href="/shop" className="btn-primary mt-2">Continue shopping</Link>
      </div>
    );
  }

  if (count === 0) {
    return (
      <div className="shell flex flex-col items-center gap-4 py-28 text-center">
        <h1 className="display-lg">Your bag is empty</h1>
        <p className="text-ink-soft">Add a few favorites and they&apos;ll show up here.</p>
        <Link href="/shop" className="btn-primary mt-2">Start shopping</Link>
      </div>
    );
  }

  return (
    <div className="shell py-10">
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Bag", href: "/shop" }, { label: "Checkout" }]} />
      <h1 className="mt-6 display-lg">Checkout</h1>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1.2fr_1fr]">
        {/* form */}
        <form onSubmit={(e) => { e.preventDefault(); clear(); setPlaced(true); }} className="space-y-8">
          <fieldset className="space-y-4">
            <legend className="font-display text-xl">Contact</legend>
            <input required type="email" placeholder="Email address" className={field} />
          </fieldset>
          <fieldset className="space-y-4">
            <legend className="font-display text-xl">Shipping address</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <input required placeholder="First name" className={field} />
              <input required placeholder="Last name" className={field} />
            </div>
            <input required placeholder="Address" className={field} />
            <div className="grid gap-4 sm:grid-cols-3">
              <input required placeholder="City" className={field} />
              <input required placeholder="State" className={field} />
              <input required placeholder="ZIP" className={field} />
            </div>
          </fieldset>
          <fieldset className="space-y-4">
            <legend className="font-display text-xl">Payment</legend>
            <div className="rounded-2xl border border-dashed border-line bg-lilac/30 px-4 py-4 text-sm text-ink-soft">
              <p className="flex items-center gap-2"><Shield className="h-4 w-4 text-plum" /> Secure checkout — demo mode, no card required.</p>
            </div>
          </fieldset>
          <button className="btn-primary w-full">Place order · {formatPrice(subtotal + shipping)}</button>
        </form>

        {/* summary */}
        <aside className="h-fit rounded-3xl border border-line bg-cream p-6">
          <h2 className="font-display text-xl">Order summary</h2>
          <ul className="mt-5 divide-y divide-line">
            {items.map((item) => (
              <li key={cartKeyOf(item)} className="flex gap-4 py-4">
                <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-xl bg-lilac">
                  <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
                  <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-plum text-[0.6rem] font-bold text-paper">{item.qty}</span>
                </div>
                <div className="flex flex-1 flex-col">
                  <p className="font-display text-base leading-tight">{item.name}</p>
                  {item.option && <p className="text-xs text-ink-soft">{item.variant}: {item.option}</p>}
                  <span className="mt-auto text-sm font-medium">{formatPrice(item.price * item.qty)}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
            <div className="flex justify-between text-ink-soft"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <div className="flex justify-between text-ink-soft">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
            </div>
            {shipping > 0 && (
              <p className="flex items-center gap-1.5 text-xs text-plum"><Truck className="h-3.5 w-3.5" /> {formatPrice(49 - subtotal)} away from free shipping</p>
            )}
            <div className="flex justify-between border-t border-line pt-3 font-display text-lg">
              <span>Total</span><span>{formatPrice(subtotal + shipping)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
