"use client";

import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  image: string;
  variant?: string | null;
  option?: string | null;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "savygurl-cart-v1";
const keyOf = (i: { slug: string; option?: string | null }) => `${i.slug}::${i.option ?? ""}`;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const add = useCallback((item: Omit<CartItem, "qty">, qty = 1) => {
    setItems((prev) => {
      const k = keyOf(item);
      const existing = prev.find((i) => keyOf(i) === k);
      if (existing) {
        return prev.map((i) => (keyOf(i) === k ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { ...item, qty }];
    });
    setIsOpen(true);
  }, []);

  const remove = useCallback((key: string) => {
    setItems((prev) => prev.filter((i) => keyOf(i) !== key));
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setItems((prev) =>
      prev.flatMap((i) => {
        if (keyOf(i) !== key) return [i];
        if (qty <= 0) return [];
        return [{ ...i, qty }];
      }),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((n, i) => n + i.qty, 0);
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    return {
      items,
      count,
      subtotal,
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      add,
      remove,
      setQty,
      clear,
    };
  }, [items, isOpen, add, remove, setQty, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export const cartKeyOf = keyOf;
