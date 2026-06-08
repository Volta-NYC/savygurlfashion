import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { Accordion } from "@/components/accordion";
import { ContactForm } from "@/components/contact-form";
import { PageHeader } from "@/components/ui";
import { Phone, Mail, Ruler } from "@/components/icons";

export const metadata: Metadata = {
  title: "Customer Support",
  description: "Get help with your SavyGurl order — shipping, returns, sizing and FAQs. We're always ready to help.",
};

const faqs = [
  { q: "Do you provide international shipping?", a: <p>Yes, but currently only to Canada.</p> },
  { q: "How can I track my order?", a: <p>Tracking information is sent via email to the address provided at the time of purchase.</p> },
  { q: "How can I pay for my order?", a: <p>We accept most major credit cards, PayPal, Apple Pay and Afterpay.</p> },
  { q: "How long will my order take to ship?", a: <p>All orders are processed and shipped within 1–2 business days (excluding weekends/holidays) upon receipt.</p> },
  { q: "How do I know which size to get?", a: <p>Sizing varies between styles and can always be found in the product description. You can also refer to our <Link href="/size-chart" className="text-plum link-underline">size chart</Link>. Still unsure? <Link href="/contact" className="text-plum link-underline">Contact us</Link>.</p> },
  { q: "How can I keep track of my loyalty rewards?", a: <p>To earn and track loyalty points, create an account and remember to sign in at the time of each purchase.</p> },
  { q: "Can I pick up my order?", a: <p>Unfortunately, at the moment we do not offer pickup service.</p> },
];

export default function SupportPage() {
  return (
    <div>
      <PageHeader
        eyebrow="We're here for you"
        title="Customer support"
        description="Have a question or concern? We're always ready to help. Browse our FAQs or reach out directly — we'd love to hear from you."
      />

      <div className="shell grid gap-5 sm:grid-cols-3">
        <a href={site.phoneHref} className="card-surface flex flex-col gap-2 p-6 transition-shadow hover:shadow-soft">
          <Phone className="h-6 w-6 text-plum" />
          <p className="font-display text-lg">Call or text</p>
          <p className="text-sm text-ink-soft">{site.phone}</p>
        </a>
        <a href={`mailto:${site.email}`} className="card-surface flex flex-col gap-2 p-6 transition-shadow hover:shadow-soft">
          <Mail className="h-6 w-6 text-plum" />
          <p className="font-display text-lg">Email us</p>
          <p className="text-sm text-ink-soft">{site.email}</p>
        </a>
        <Link href="/size-chart" className="card-surface flex flex-col gap-2 p-6 transition-shadow hover:shadow-soft">
          <Ruler className="h-6 w-6 text-plum" />
          <p className="font-display text-lg">Size guide</p>
          <p className="text-sm text-ink-soft">Find your perfect fit</p>
        </Link>
      </div>

      <div className="shell mt-6">
        <div className="rounded-3xl bg-lilac/50 px-6 py-5 text-sm text-ink-soft sm:flex sm:items-center sm:justify-between">
          <p className="font-medium text-ink">Telephone support hours</p>
          <p>{site.hours.join("  ·  ")}</p>
        </div>
      </div>

      <div className="shell mt-20 grid gap-14 lg:grid-cols-[1.1fr_1fr]">
        <div id="faq" className="scroll-mt-32">
          <p className="eyebrow">FAQ</p>
          <h2 className="mb-6 mt-2 display-lg">Frequently asked</h2>
          <Accordion items={faqs} />

          <div id="shipping" className="mt-12 scroll-mt-32">
            <h3 className="font-display text-2xl">Shipping &amp; returns</h3>
            <div className="mt-4 space-y-3 text-sm text-ink-soft">
              <p><span className="font-semibold text-ink">Shipping.</span> Orders ship via USPS Priority Mail or UPS Ground. Price varies by weight and location. On Tuesdays, all orders ship for a flat $2 — and orders over $49 ship absolutely free.</p>
              <p><span className="font-semibold text-ink">Returns.</span> Unfortunately, all sales are final. We are unable to offer refunds, returns, or exchanges.</p>
            </div>
          </div>
        </div>

        <div>
          <p className="eyebrow">Get in touch</p>
          <h2 className="mb-6 mt-2 display-lg">Send a message</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
