import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Size Chart",
  description: "SavyGurl size guide. Use as a general guideline — sizing and fit vary per item, so always check the product description.",
};

const rows = [
  { size: "XS", us: "0–2", bust: "31–32", waist: "24–25", hip: "34–35" },
  { size: "S", us: "4–6", bust: "33–34", waist: "26–27", hip: "36–37" },
  { size: "M", us: "8–10", bust: "35–37", waist: "28–30", hip: "38–40" },
  { size: "L", us: "12–14", bust: "38–40", waist: "31–33", hip: "41–43" },
  { size: "XL", us: "16", bust: "41–43", waist: "34–36", hip: "44–46" },
  { size: "1X", us: "16–18", bust: "44–46", waist: "37–39", hip: "47–49" },
  { size: "2X", us: "20–22", bust: "47–49", waist: "40–42", hip: "50–52" },
  { size: "3X", us: "24–26", bust: "50–52", waist: "43–45", hip: "53–55" },
];

export default function SizeChartPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Find your fit"
        title="Size chart"
        description="A general guideline to help you choose. Measurements are in inches."
      />

      <div className="shell pb-4">
        <div className="overflow-hidden rounded-3xl border border-line">
          <table className="w-full border-collapse text-center text-sm">
            <thead>
              <tr className="bg-plum text-paper">
                {["Size", "US", "Bust", "Waist", "Hip"].map((h) => (
                  <th key={h} className="px-3 py-4 font-display text-base font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.size} className={i % 2 ? "bg-cream" : "bg-paper"}>
                  <td className="px-3 py-4 font-semibold text-plum">{r.size}</td>
                  <td className="px-3 py-4 text-ink-soft">{r.us}</td>
                  <td className="px-3 py-4 text-ink-soft">{r.bust}</td>
                  <td className="px-3 py-4 text-ink-soft">{r.waist}</td>
                  <td className="px-3 py-4 text-ink-soft">{r.hip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 rounded-3xl bg-lilac/50 p-6 text-sm leading-relaxed text-ink-soft">
          <p className="font-semibold text-ink">A note on sizing</p>
          <p className="mt-2">
            This size chart is only to be used as a guideline. Sizing and fit vary per item. Every item has a detailed
            description, including whether it runs small or true to size — please read the item description to help choose
            your size. Still unsure? <Link href="/contact" className="text-plum link-underline">Contact us</Link> and we&apos;ll help you find the perfect fit.
          </p>
        </div>
      </div>
    </div>
  );
}
