import type { Metadata } from "next";
import { site } from "@/lib/site";
import { ContactForm } from "@/components/contact-form";
import { PageHeader } from "@/components/ui";
import { Phone, Mail, Instagram, Facebook } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the SavyGurl team. Call, email, or send us a message — we'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <div>
      <PageHeader eyebrow="Say hello" title="Let's chat" description="Questions, styling help, or just want to say hi? We're always ready to help." />
      <div className="shell grid gap-12 pb-8 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-6">
          <div className="card-surface p-7">
            <h2 className="font-display text-2xl">Reach us directly</h2>
            <div className="mt-5 space-y-4 text-sm">
              <a href={site.phoneHref} className="flex items-center gap-3 hover:text-plum">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-lilac text-plum"><Phone className="h-5 w-5" /></span>
                <span><span className="block text-xs uppercase tracking-widest text-ink-soft">Phone</span>{site.phone}</span>
              </a>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-plum">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-lilac text-plum"><Mail className="h-5 w-5" /></span>
                <span><span className="block text-xs uppercase tracking-widest text-ink-soft">Email</span>{site.email}</span>
              </a>
            </div>
            <div className="mt-6 border-t border-line pt-5">
              <p className="text-xs uppercase tracking-widest text-ink-soft">Support hours</p>
              {site.hours.map((h) => <p key={h} className="mt-1 text-sm">{h}</p>)}
            </div>
            <div className="mt-6 flex gap-3">
              <a href={site.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-11 w-11 place-items-center rounded-full bg-ink text-paper transition-colors hover:bg-plum">
                <Instagram className="h-5 w-5" />
              </a>
              <a href={site.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="grid h-11 w-11 place-items-center rounded-full bg-ink text-paper transition-colors hover:bg-plum">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
