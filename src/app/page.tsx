import Image from "next/image";
import Link from "next/link";
import { categories, newArrivals, onSaleProducts, getProduct } from "@/lib/products";
import { site } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { SectionHeading, ProductGrid } from "@/components/ui";
import { Newsletter } from "@/components/newsletter";
import { Testimonials } from "@/components/testimonials";
import { ArrowRight, Truck, Sparkle, Shield, Heart, Instagram, ArrowUpRight } from "@/components/icons";

const perkIcons = [Truck, Sparkle, Shield, Heart];

export default function HomePage() {
  const heroMain = getProduct("candy-gurl") ?? newArrivals(1)[0];
  const heroSide = getProduct("tropical-princess") ?? newArrivals(2)[1];
  const fresh = newArrivals(8);
  const sale = onSaleProducts(8);
  const community = onSaleProducts(12).filter((p) => p.images[0]).slice(0, 6);

  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="shell grid items-center gap-10 pb-8 pt-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pt-16">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-cream px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-widest text-plum">
            <Sparkle className="h-3.5 w-3.5" /> New arrivals weekly
          </span>
          <h1 className="mt-6 display-xl text-balance">
            More than fashion,
            <span className="block italic text-plum">it&apos;s how you show up.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
            Trendy, affordable, size-inclusive women&apos;s fashion in regular &amp; plus sizes — curated for the woman who dresses for herself.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/collections/new-arrivals" className="btn-primary">
              Shop new arrivals <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/shop" className="btn-outline">Browse the boutique</Link>
          </div>
          <dl className="mt-10 flex gap-8 border-t border-line pt-6">
            {[
              { k: `${newArrivals().length}+`, v: "Fresh styles" },
              { k: "Reg & Plus", v: "Size-inclusive" },
              { k: "$2 Tue", v: "Shipping deals" },
            ].map((s) => (
              <div key={s.v}>
                <dt className="font-display text-2xl">{s.k}</dt>
                <dd className="text-xs uppercase tracking-widest text-ink-soft">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-lilac blur-2xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-6 h-40 w-40 rounded-full bg-sand blur-2xl" />
          <div className="relative grid grid-cols-5 grid-rows-6 gap-4">
            {heroMain && (
              <div className="col-span-3 row-span-6 overflow-hidden rounded-[2rem] bg-lilac shadow-soft">
                <div className="relative h-full min-h-[440px] w-full">
                  <Image src={heroMain.images[0]} alt={heroMain.alt || heroMain.name} fill priority sizes="(max-width:1024px) 60vw, 36vw" className="object-cover" />
                </div>
              </div>
            )}
            {heroSide && (
              <div className="col-span-2 row-span-4 self-start overflow-hidden rounded-[1.5rem] bg-sand shadow-soft">
                <div className="relative aspect-[3/4] w-full">
                  <Image src={heroSide.images[0]} alt={heroSide.alt || heroSide.name} fill sizes="24vw" className="object-cover" />
                </div>
              </div>
            )}
            <div className="col-span-2 row-span-2 grid place-items-center rounded-[1.5rem] bg-plum p-5 text-center text-paper shadow-soft">
              <div>
                <p className="font-display text-3xl leading-none">100%</p>
                <p className="mt-1 text-[0.62rem] uppercase tracking-widest text-paper/80">Shopped with love</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- PERKS ---------------- */}
      <section className="shell mt-14">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-4">
          {site.perks.map((perk, i) => {
            const Icon = perkIcons[i];
            return (
              <div key={perk.title} className="flex flex-col gap-3 bg-cream p-6">
                <Icon className="h-6 w-6 text-plum" />
                <div>
                  <p className="font-display text-lg leading-tight">{perk.title}</p>
                  <p className="mt-1 text-sm text-ink-soft">{perk.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------------- CATEGORIES ---------------- */}
      <section className="shell mt-24">
        <Reveal>
          <SectionHeading eyebrow="Shop by category" title="Find your next favorite" href="/shop" hrefLabel="Shop all" />
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {categories.slice(0, 8).map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.05}>
              <Link href={`/collections/${c.slug}`} className="group relative block aspect-[4/5] overflow-hidden rounded-3xl bg-lilac">
                {c.heroImage && (
                  <Image src={c.heroImage} alt={c.name} fill sizes="(max-width:1024px) 45vw, 22vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-plum-deep/75 via-plum-deep/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5 text-paper">
                  <div>
                    <p className="font-display text-xl leading-tight">{c.name}</p>
                    <p className="text-[0.68rem] uppercase tracking-widest opacity-80">{c.count} styles</p>
                  </div>
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-paper/20 backdrop-blur transition-colors group-hover:bg-paper group-hover:text-plum">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- NEW ARRIVALS ---------------- */}
      <section className="shell mt-24">
        <Reveal>
          <SectionHeading eyebrow="Just dropped" title="New arrivals" description="The latest pieces to land in the boutique — gone before you know it." href="/collections/new-arrivals" />
        </Reveal>
        <div className="mt-10">
          <ProductGrid items={fresh} />
        </div>
      </section>

      {/* ---------------- EDITORIAL BANNER ---------------- */}
      <section className="shell mt-24">
        <div className="grid overflow-hidden rounded-4xl bg-ink text-paper lg:grid-cols-2">
          <div className="grain flex flex-col justify-center gap-6 p-8 sm:p-14">
            <p className="eyebrow text-orchid">The SavyGurl ethos</p>
            <h2 className="font-display text-[clamp(2rem,3.6vw,3.2rem)] leading-tight">
              Style that&apos;s kind to your wallet <span className="italic text-orchid">and</span> the planet.
            </h2>
            <p className="max-w-md text-paper/75">
              We believe great fashion should be accessible to everyone. That means thoughtfully sourced pieces, inclusive sizing, and prices that let you express yourself — guilt-free.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/about" className="btn bg-paper text-ink hover:bg-orchid hover:text-paper">Our story</Link>
              <Link href="/collections/plus-size" className="btn border border-paper/30 text-paper hover:bg-paper/10">Shop plus size</Link>
            </div>
          </div>
          <div className="relative min-h-[320px]">
            {getProduct("in-the-wild")?.images[0] && (
              <Image src={getProduct("in-the-wild")!.images[0]} alt="SavyGurl style" fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" />
            )}
          </div>
        </div>
      </section>

      {/* ---------------- SALE EDIT ---------------- */}
      {sale.length > 0 && (
        <section className="shell mt-24">
          <Reveal>
            <SectionHeading eyebrow="Limited time" title="The sale edit" description="Iconic pieces, marked down. While stocks last." href="/sale" hrefLabel="Shop sale" />
          </Reveal>
          <div className="mt-10">
            <ProductGrid items={sale} />
          </div>
        </section>
      )}

      {/* ---------------- TESTIMONIALS ---------------- */}
      <section className="shell mt-24">
        <Testimonials />
      </section>

      {/* ---------------- REWARDS BAND ---------------- */}
      <section className="shell mt-24">
        <div className="flex flex-col items-center gap-6 rounded-4xl border border-line bg-cream px-6 py-12 text-center sm:px-12">
          <Sparkle className="h-8 w-8 text-plum" />
          <h2 className="font-display text-[clamp(1.8rem,3.4vw,2.8rem)] leading-tight">Earn points, unlock rewards</h2>
          <p className="max-w-lg text-ink-soft">
            Join Savy Rewards and earn 5 points for every $1 spent. Redeem for discounts and members-only perks — sign up takes less than 3 minutes.
          </p>
          <Link href="/rewards" className="btn-primary">Become a member</Link>
        </div>
      </section>

      {/* ---------------- COMMUNITY ---------------- */}
      <section className="shell mt-24">
        <Reveal>
          <div className="text-center">
            <p className="eyebrow">@savygurlfashion</p>
            <h2 className="mt-2 display-lg">Join the SavyGurl community</h2>
            <p className="mx-auto mt-3 max-w-md text-ink-soft">Tag us for a chance to be featured. We love seeing how you style your finds.</p>
          </div>
        </Reveal>
        <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-4 md:grid-cols-6">
          {community.map((p) => (
            <a key={p.slug} href={site.social.instagram} target="_blank" rel="noreferrer" className="group relative aspect-square overflow-hidden rounded-2xl bg-lilac">
              <Image src={p.images[0]} alt={p.alt || p.name} fill sizes="(max-width:768px) 30vw, 15vw" className="object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 grid place-items-center bg-plum/0 text-paper opacity-0 transition-all duration-300 group-hover:bg-plum/40 group-hover:opacity-100">
                <Instagram className="h-6 w-6" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ---------------- NEWSLETTER ---------------- */}
      <section className="shell mt-24 mb-4">
        <Reveal>
          <Newsletter />
        </Reveal>
      </section>
    </>
  );
}
