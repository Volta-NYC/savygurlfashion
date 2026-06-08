"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { products, effectivePrice, formatPrice } from "@/lib/products";
import { Close, Search } from "./icons";

export function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQ("");
      const t = setTimeout(() => inputRef.current?.focus(), 60);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.categories.some((c) => c.includes(term)) ||
          p.description.some((d) => d.toLowerCase().includes(term)),
      )
      .slice(0, 8);
  }, [q]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="card-surface relative z-10 mt-10 w-full max-w-2xl overflow-hidden shadow-lift"
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 border-b border-line px-5">
              <Search className="h-5 w-5 text-plum" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search dresses, sets, jumpsuits…"
                className="flex-1 bg-transparent py-5 text-base outline-none placeholder:text-ink-soft"
              />
              <button onClick={onClose} aria-label="Close search" className="rounded-full p-2 hover:bg-sand">
                <Close className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {q && results.length === 0 && (
                <p className="px-4 py-10 text-center text-sm text-ink-soft">
                  No matches for “{q}”. Try “dress”, “set”, or “plus”.
                </p>
              )}
              {results.map((p) => (
                <Link
                  key={p.slug}
                  href={`/product/${p.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-4 rounded-2xl p-2.5 transition-colors hover:bg-sand"
                >
                  <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-xl bg-lilac">
                    <Image src={p.images[0]} alt="" fill sizes="56px" className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-base">{p.name}</p>
                    <p className="text-xs capitalize text-ink-soft">{p.categories.join(" · ") || "Boutique"}</p>
                  </div>
                  <span className="text-sm font-medium">{formatPrice(effectivePrice(p))}</span>
                </Link>
              ))}
              {!q && (
                <p className="px-4 py-10 text-center text-sm text-ink-soft">
                  Start typing to search {products.length} pieces.
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
