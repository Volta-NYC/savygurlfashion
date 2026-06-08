import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getProduct, newArrivals } from "@/lib/products";
import { site } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { Heart, Sparkle, Shield, Truck } from "@/components/icons";

export const metadata: Metadata = {
  title: "Our Story",
  description: "SavyGurl is an online boutique built on affordable, sustainable, size-inclusive women's fashion — because it's more than fashion, it's how you show up for yourself.",
};

const values = [
  { icon: Heart, title: "Size-inclusive", text: "Designed for women of every size, in regular and plus — because everyone deserves to feel amazing." },
  { icon: Sparkle, title: "Affordable", text: "Trend-led pieces at prices that let you express yourself, guilt-free." },
  { icon: Shield, title: "Sustainable", text: "Thoughtfully sourced styles, made to be loved and worn again and again." },
  { icon: Truck, title: "Customer-first", text: "Fast shipping, real support, and rewards that give back to you." },
];

export default function AboutPage() {
  const hero = getProduct("stripe-tease") ?? newArrivals(1)[0];
  const secondary = getProduct("candy-gurl") ?? newArrivals(2)[1];

  return (
    <div>
      <section className="shell grid items-center gap-10 py-14 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="eyebrow">Our story</p>
          <h1 className="mt-3 display-xl">More than fashion.</h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
            SavyGurl was born from a simple belief: looking good shouldn&apos;t cost a fortune or compromise your values.
            We curate trendy, affordable, and sustainable women&apos;s fashion for real women of every size.
          </p>
          <p className="mt-4 max-w-md leading-relaxed text-ink-soft">
            Because getting dressed is about so much more than clothes — it&apos;s how you show up for yourself.
          </p>
          <Link href="/shop" className="btn-primary mt-8">Explore the boutique</Link>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="grid grid-cols-2 gap-4">
            {hero && (
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-lilac">
                <Image src={hero.images[0]} alt={hero.alt || hero.name} fill sizes="40vw" className="object-cover" priority />
              </div>
            )}
            {secondary && (
              <div className="relative mt-10 aspect-[3/4] overflow-hidden rounded-3xl bg-sand">
                <Image src={secondary.images[0]} alt={secondary.alt || secondary.name} fill sizes="40vw" className="object-cover" />
              </div>
            )}
          </div>
        </Reveal>
      </section>

      <section className="bg-cream py-20">
        <div className="shell">
          <Reveal>
            <h2 className="text-center display-lg">What we stand for</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.05}>
                <div className="flex h-full flex-col gap-3 rounded-3xl border border-line bg-paper p-7">
                  <v.icon className="h-7 w-7 text-plum" />
                  <h3 className="font-display text-xl">{v.title}</h3>
                  <p className="text-sm text-ink-soft">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="shell py-20">
        <div className="grain relative overflow-hidden rounded-4xl bg-plum px-6 py-16 text-center text-paper sm:px-12">
          <h2 className="mx-auto max-w-2xl font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-tight">
            {site.mantra}
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/collections/new-arrivals" className="btn bg-paper text-plum hover:bg-orchid hover:text-paper">Shop new arrivals</Link>
            <Link href="/contact" className="btn border border-paper/30 text-paper hover:bg-paper/10">Get in touch</Link>
          </div>
          <div className="pointer-events-none absolute -left-16 -top-16 h-60 w-60 rounded-full bg-orchid/30 blur-3xl" />
        </div>
      </section>
    </div>
  );
}
