import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { policies, getPolicy } from "@/lib/policies";
import { Breadcrumb } from "@/components/ui";

export function generateStaticParams() {
  return policies.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getPolicy(params.slug);
  return p ? { title: p.title, description: p.intro } : {};
}

export default function PolicyPage({ params }: { params: { slug: string } }) {
  const policy = getPolicy(params.slug);
  if (!policy) notFound();

  return (
    <div className="shell py-10">
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: policy.title }]} />
      <div className="mx-auto mt-8 max-w-3xl">
        <h1 className="display-lg">{policy.title}</h1>
        {policy.updated && <p className="mt-2 text-xs uppercase tracking-widest text-ink-soft">{policy.updated}</p>}
        <p className="mt-5 text-lg leading-relaxed text-ink-soft">{policy.intro}</p>

        <div className="mt-10 space-y-8">
          {policy.sections.map((s, i) => (
            <section key={i}>
              {s.heading && <h2 className="font-display text-xl text-ink">{s.heading}</h2>}
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-ink-soft">
                {s.paragraphs.map((p, j) => <p key={j}>{p}</p>)}
                {s.bullets && (
                  <ul className="space-y-2">
                    {s.bullets.map((b, j) => (
                      <li key={j} className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-plum" />{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-3xl bg-lilac/50 p-6 text-sm text-ink-soft">
          Questions about our policies? <Link href="/contact" className="text-plum link-underline">Contact our team</Link> — we&apos;re happy to help.
        </div>
      </div>
    </div>
  );
}
