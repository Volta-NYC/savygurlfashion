import Link from "next/link";
import { reviews, cleanLocation } from "@/lib/products";
import { Stars } from "./stars";
import { Reveal } from "./reveal";

export function Testimonials() {
  if (!reviews.length) return null;
  return (
    <div>
      <Reveal>
        <div className="text-center">
          <p className="eyebrow">Loved by the community</p>
          <h2 className="mt-2 display-lg">What SavyGurls are saying</h2>
        </div>
      </Reveal>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {reviews.map((r, i) => {
          const showBody = r.body && r.body !== r.title;
          return (
            <Reveal key={`${r.author}-${i}`} delay={(i % 3) * 0.05}>
              <figure className="flex h-full flex-col rounded-3xl border border-line bg-cream p-7">
                <Stars rating={r.rating} />
                <blockquote className="mt-4 flex-1">
                  <p className="font-display text-xl leading-snug text-ink">“{r.title}”</p>
                  {showBody && <p className="mt-2 text-sm leading-relaxed text-ink-soft">{r.body}</p>}
                </blockquote>
                <figcaption className="mt-6 border-t border-line pt-4 text-sm">
                  <span className="font-semibold text-ink">{r.author}</span>
                  <span className="text-ink-soft"> · {cleanLocation(r.location)}</span>
                  <Link href={`/product/${r.productSlug}`} className="mt-1 block text-xs uppercase tracking-widest text-plum link-underline w-fit">
                    on {r.productName}
                  </Link>
                </figcaption>
              </figure>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
