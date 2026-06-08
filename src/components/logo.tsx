import Link from "next/link";

export function Logo({ className = "", tone = "ink" }: { className?: string; tone?: "ink" | "paper" }) {
  const color = tone === "paper" ? "text-paper" : "text-ink";
  return (
    <Link href="/" aria-label="SavyGurl — home" className={`group inline-flex flex-col leading-none ${color} ${className}`}>
      <span className="font-display text-2xl tracking-tightest sm:text-[1.7rem]">
        Savy<span className="text-plum group-hover:text-orchid transition-colors">Gurl</span>
      </span>
      <span className="mt-0.5 text-[0.55rem] font-semibold uppercase tracking-[0.42em] text-ink-soft">
        Boutique
      </span>
    </Link>
  );
}
