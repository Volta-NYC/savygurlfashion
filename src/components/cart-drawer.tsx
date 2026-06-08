"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart, cartKeyOf } from "@/lib/cart";
import { formatPrice } from "@/lib/products";
import { Bag, Close, Minus, Plus, Truck } from "./icons";

const FREE_SHIP = 49;

export function CartDrawer() {
  const { items, isOpen, close, subtotal, setQty, remove, count } = useCart();
  const remaining = Math.max(0, FREE_SHIP - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIP) * 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[80] bg-ink/45 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.aside
            className="fixed right-0 top-0 z-[90] flex h-full w-full max-w-md flex-col bg-paper shadow-lift"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            aria-label="Shopping bag"
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <h2 className="font-display text-xl">
                Your Bag <span className="text-ink-soft">({count})</span>
              </h2>
              <button onClick={close} aria-label="Close bag" className="rounded-full p-2 hover:bg-sand">
                <Close className="h-5 w-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-lilac text-plum">
                  <Bag className="h-7 w-7" />
                </div>
                <p className="font-display text-2xl">Your bag is empty</p>
                <p className="text-sm text-ink-soft">Let&apos;s find something you&apos;ll love.</p>
                <button onClick={close} className="btn-primary mt-2">
                  Start shopping
                </button>
              </div>
            ) : (
              <>
                <div className="border-b border-line px-6 py-4">
                  <p className="flex items-center gap-2 text-xs font-medium text-ink-soft">
                    <Truck className="h-4 w-4 text-plum" />
                    {remaining > 0 ? (
                      <>You&apos;re {formatPrice(remaining)} away from free shipping</>
                    ) : (
                      <span className="text-plum">You&apos;ve unlocked free shipping! 🎉</span>
                    )}
                  </p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-sand">
                    <div className="h-full rounded-full bg-plum transition-all duration-500" style={{ width: `${progress}%` }} />
                  </div>
                </div>

                <ul className="flex-1 divide-y divide-line overflow-y-auto px-6">
                  {items.map((item) => {
                    const key = cartKeyOf(item);
                    return (
                      <li key={key} className="flex gap-4 py-5">
                        <Link href={`/product/${item.slug}`} onClick={close} className="relative h-28 w-20 shrink-0 overflow-hidden rounded-xl bg-lilac">
                          <Image src={item.image} alt={item.name} fill sizes="88px" className="object-cover" />
                        </Link>
                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex justify-between gap-2">
                            <Link href={`/product/${item.slug}`} onClick={close} className="font-display text-base leading-tight">
                              {item.name}
                            </Link>
                            <button onClick={() => remove(key)} aria-label={`Remove ${item.name}`} className="text-ink-soft hover:text-berry">
                              <Close className="h-4 w-4" />
                            </button>
                          </div>
                          {item.option && <p className="mt-0.5 text-xs text-ink-soft">{item.variant}: {item.option}</p>}
                          <div className="mt-auto flex items-center justify-between pt-3">
                            <div className="flex items-center rounded-full border border-line">
                              <button onClick={() => setQty(key, item.qty - 1)} aria-label="Decrease quantity" className="px-2.5 py-1.5 hover:text-plum">
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span className="min-w-6 text-center text-sm tabular-nums">{item.qty}</span>
                              <button onClick={() => setQty(key, item.qty + 1)} aria-label="Increase quantity" className="px-2.5 py-1.5 hover:text-plum">
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <span className="text-sm font-semibold">{formatPrice(item.price * item.qty)}</span>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <div className="border-t border-line px-6 py-5">
                  <div className="flex items-center justify-between font-display text-lg">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <p className="mt-1 text-xs text-ink-soft">Taxes & shipping calculated at checkout.</p>
                  <Link href="/checkout" onClick={close} className="btn-primary mt-4 w-full">
                    Checkout
                  </Link>
                  <button onClick={close} className="mt-2 w-full py-2 text-xs font-semibold uppercase tracking-widest text-ink-soft hover:text-plum">
                    Continue shopping
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
