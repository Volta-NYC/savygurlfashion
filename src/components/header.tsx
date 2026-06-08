"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { primaryNav, shopMenu } from "@/lib/site";
import { categories } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { AnnouncementBar } from "./announcement-bar";
import { SearchModal } from "./search-modal";
import { Logo } from "./logo";
import { Bag, ChevronDown, Close, Menu, Search } from "./icons";

export function Header() {
  const { count, open } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopExpanded, setShopExpanded] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const featured = categories.filter((c) => c.heroImage).slice(0, 2);

  return (
    <header className="sticky top-0 z-50">
      <AnnouncementBar />
      <div
        className={`relative border-b transition-all duration-300 ${
          scrolled ? "border-line bg-paper/90 backdrop-blur-md" : "border-transparent bg-paper"
        }`}
        onMouseLeave={() => setMegaOpen(false)}
      >
        <div className="shell flex items-center justify-between gap-4 py-4">
          {/* left: mobile menu + nav */}
          <div className="flex flex-1 items-center gap-6">
            <button
              className="lg:hidden -ml-1 rounded-full p-1.5 hover:bg-sand"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
            <nav className="hidden items-center gap-7 lg:flex">
              {primaryNav.map((item) => {
                const active = pathname === item.href || (item.children && pathname.startsWith("/collections"));
                return (
                  <div
                    key={item.label}
                    onMouseEnter={() => setMegaOpen(Boolean(item.children))}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center gap-1 text-[0.82rem] font-medium uppercase tracking-[0.12em] transition-colors hover:text-plum ${
                        active ? "text-plum" : "text-ink"
                      }`}
                    >
                      {item.label}
                      {item.children && <ChevronDown className="h-3.5 w-3.5" />}
                    </Link>
                  </div>
                );
              })}
            </nav>
          </div>

          {/* center: logo */}
          <Logo className="shrink-0" />

          {/* right: actions */}
          <div className="flex flex-1 items-center justify-end gap-1 sm:gap-2">
            <button onClick={() => setSearchOpen(true)} aria-label="Search" className="rounded-full p-2.5 hover:bg-sand">
              <Search className="h-5 w-5" />
            </button>
            <button onClick={open} aria-label="Open bag" className="relative rounded-full p-2.5 hover:bg-sand">
              <Bag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-plum px-1 text-[0.6rem] font-bold text-paper">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* mega menu */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="absolute inset-x-0 top-full hidden border-b border-line bg-paper shadow-soft lg:block"
            >
              <div className="shell grid grid-cols-12 gap-8 py-8">
                <div className="col-span-5 grid grid-cols-2 gap-x-6 gap-y-2.5">
                  <p className="col-span-2 eyebrow mb-1">Shop by category</p>
                  {shopMenu.map((m) => (
                    <Link
                      key={m.href}
                      href={m.href}
                      className="link-underline w-fit text-[0.95rem] text-ink/80 hover:text-plum"
                    >
                      {m.label}
                    </Link>
                  ))}
                  <Link href="/shop" className="col-span-2 mt-2 w-fit text-[0.82rem] font-semibold uppercase tracking-widest text-plum link-underline">
                    Shop all →
                  </Link>
                </div>
                <div className="col-span-7 grid grid-cols-2 gap-4">
                  {featured.map((c) => (
                    <Link key={c.slug} href={`/collections/${c.slug}`} className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-lilac">
                      {c.heroImage && (
                        <Image src={c.heroImage} alt={c.name} fill sizes="320px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-plum-deep/70 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-paper">
                        <p className="font-display text-xl">{c.name}</p>
                        <p className="text-xs uppercase tracking-widest opacity-80">Shop now</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div className="fixed inset-0 z-[60] bg-ink/40 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileOpen(false)} />
            <motion.div
              className="fixed left-0 top-0 z-[70] flex h-full w-[86%] max-w-sm flex-col bg-paper lg:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <div className="flex items-center justify-between border-b border-line px-5 py-4">
                <Logo />
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="rounded-full p-2 hover:bg-sand">
                  <Close className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-5 py-4">
                <button
                  onClick={() => setShopExpanded((v) => !v)}
                  className="flex w-full items-center justify-between py-3 font-display text-2xl"
                >
                  Shop
                  <ChevronDown className={`h-5 w-5 transition-transform ${shopExpanded ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {shopExpanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="flex flex-col gap-0.5 pb-2 pl-1">
                        <Link href="/shop" className="py-2 text-sm font-medium text-plum">Shop all</Link>
                        {shopMenu.map((m) => (
                          <Link key={m.href} href={m.href} className="py-2 text-sm text-ink/80">{m.label}</Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                {primaryNav.filter((n) => !n.children).map((item) => (
                  <Link key={item.href} href={item.href} className="block border-t border-line py-3 font-display text-2xl">
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="border-t border-line px-5 py-4 text-sm text-ink-soft">
                <button onClick={() => { setMobileOpen(false); setSearchOpen(true); }} className="mb-2 flex items-center gap-2">
                  <Search className="h-4 w-4" /> Search the boutique
                </button>
                <p>Need help? <Link href="/support" className="text-plum link-underline">Customer support</Link></p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
