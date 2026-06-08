"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "./icons";

export function Accordion({ items }: { items: { q: string; a: React.ReactNode }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen((cur) => (cur === i ? null : i))}
            className="flex w-full items-center justify-between gap-4 py-5 text-left"
            aria-expanded={open === i}
          >
            <span className="font-display text-lg leading-tight sm:text-xl">{item.q}</span>
            <Plus className={`h-5 w-5 shrink-0 text-plum transition-transform duration-300 ${open === i ? "rotate-45" : ""}`} />
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="pb-5 text-ink-soft">{item.a}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
