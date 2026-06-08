import Link from "next/link";
import { site, shopMenu } from "@/lib/site";
import { Logo } from "./logo";
import { Newsletter } from "./newsletter";
import { Facebook, Instagram, Mail, Phone } from "./icons";

const help = [
  { label: "Customer Support", href: "/support" },
  { label: "Size Chart", href: "/size-chart" },
  { label: "Shipping & Returns", href: "/support#shipping" },
  { label: "FAQ", href: "/support#faq" },
  { label: "SavyGurl Rewards", href: "/rewards" },
];

const about = [
  { label: "Our Story", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Collections", href: "/collections" },
  { label: "Terms of Service", href: "/policies/terms" },
  { label: "Privacy Policy", href: "/policies/privacy" },
  { label: "Accessibility", href: "/policies/accessibility" },
];

export function Footer() {
  return (
    <footer className="mt-24 bg-ink text-paper">
      <div className="shell py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="paper" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-paper/70">{site.mantra}</p>
            <div className="mt-6 flex flex-col gap-2 text-sm text-paper/80">
              <a href={site.phoneHref} className="flex items-center gap-2 hover:text-orchid">
                <Phone className="h-4 w-4" /> {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-orchid">
                <Mail className="h-4 w-4" /> {site.email}
              </a>
            </div>
            <div className="mt-6 flex gap-3">
              <a href={site.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full border border-paper/20 transition-colors hover:border-orchid hover:text-orchid">
                <Instagram className="h-5 w-5" />
              </a>
              <a href={site.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full border border-paper/20 transition-colors hover:border-orchid hover:text-orchid">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            <div>
              <h3 className="text-[0.72rem] font-semibold uppercase tracking-widest text-orchid">Shop</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-paper/75">
                {shopMenu.slice(0, 7).map((m) => (
                  <li key={m.href}><Link href={m.href} className="hover:text-paper">{m.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[0.72rem] font-semibold uppercase tracking-widest text-orchid">Help</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-paper/75">
                {help.map((m) => (
                  <li key={m.href}><Link href={m.href} className="hover:text-paper">{m.label}</Link></li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-[0.72rem] font-semibold uppercase tracking-widest text-orchid">Boutique</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-paper/75">
                {about.map((m) => (
                  <li key={m.href}><Link href={m.href} className="hover:text-paper">{m.label}</Link></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-[0.72rem] font-semibold uppercase tracking-widest text-orchid">Stay in the loop</h3>
            <p className="mt-4 text-sm text-paper/70">Subscribe for exclusive updates — don&apos;t miss out!</p>
            <div className="mt-4">
              <Newsletter variant="inline" />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-paper/15 pt-6 text-xs text-paper/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            We accept Visa, Mastercard, Amex, PayPal, Apple Pay &amp; Afterpay.
          </p>
          <Link href="https://nyc.voltanpo.org" target="_blank" rel="noreferrer" className="hover:text-paper">
            Website made by @VoltaNYC
          </Link>
        </div>
      </div>
    </footer>
  );
}
