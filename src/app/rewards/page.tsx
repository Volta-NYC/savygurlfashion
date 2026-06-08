import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui";
import { Sparkle } from "@/components/icons";

export const metadata: Metadata = {
  title: "Savy Rewards",
  description: "Join Savy Rewards and earn points on every purchase. Redeem for discounts and members-only perks.",
};

const steps = [
  { n: "01", title: "Sign up", text: "Create a free account to start enjoying the loyalty program." },
  { n: "02", title: "Earn points", text: "Earn points by signing up and by placing orders — 5 points for every $1 spent." },
  { n: "03", title: "Redeem rewards", text: "Turn your points into discounts and exclusive perks at checkout." },
];

const tiers = [
  { name: "Basic", req: "0 points to join", perks: ["5 points per $1 spent", "5 points for signing up", "Birthday surprise"] },
  { name: "Insider", req: "Earn more to unlock", perks: ["Everything in Basic", "Early access to new drops", "Members-only sales"] },
  { name: "VIP", req: "Top tier", perks: ["Everything in Insider", "Bonus point events", "First dibs on restocks"] },
];

export default function RewardsPage() {
  return (
    <div>
      <section className="grain relative overflow-hidden bg-plum text-paper">
        <div className="shell relative py-20 text-center">
          <Sparkle className="mx-auto h-9 w-9 text-orchid" />
          <p className="mt-4 text-[0.7rem] font-semibold uppercase tracking-widest text-orchid">SavyGurl Loyalty</p>
          <h1 className="mx-auto mt-3 max-w-2xl font-display text-[clamp(2.4rem,5vw,4rem)] leading-none tracking-tightest">
            Earn points, turn them into rewards
          </h1>
          <p className="mx-auto mt-4 max-w-md text-paper/75">
            The more you shop, the more you earn. Sign up takes less than 3 minutes.
          </p>
          <Link href="/contact" className="btn mt-8 bg-paper text-plum hover:bg-orchid hover:text-paper">Become a member</Link>
        </div>
        <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-orchid/30 blur-3xl" />
      </section>

      <section className="shell py-20">
        <h2 className="text-center display-lg">How it works</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="card-surface relative p-8">
              <span className="font-display text-5xl text-lilac">{s.n}</span>
              <h3 className="mt-3 font-display text-2xl">{s.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="shell pb-20">
        <h2 className="text-center display-lg">Program tiers</h2>
        <p className="mt-3 text-center text-ink-soft">Reach new tiers as you earn more points.</p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {tiers.map((t, i) => (
            <div key={t.name} className={`rounded-4xl border p-8 ${i === 1 ? "border-plum bg-plum text-paper shadow-lift" : "border-line bg-cream"}`}>
              <p className={`text-[0.7rem] font-semibold uppercase tracking-widest ${i === 1 ? "text-orchid" : "text-plum"}`}>{t.req}</p>
              <h3 className="mt-2 font-display text-3xl">{t.name}</h3>
              <ul className={`mt-6 space-y-3 text-sm ${i === 1 ? "text-paper/85" : "text-ink-soft"}`}>
                {t.perks.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${i === 1 ? "bg-orchid" : "bg-plum"}`} />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
