const messages = [
  "$2 Shipping Every Tuesday",
  "Free Shipping On Orders Over $49",
  "Shop Now, Pay Later With PayPal & Afterpay",
  "Size-Inclusive Styles — Regular & Plus",
  "New Arrivals Dropping Weekly",
];

export function AnnouncementBar() {
  const row = [...messages, ...messages];
  return (
    <div className="bg-plum-deep text-paper">
      <div className="relative flex overflow-hidden py-2.5">
        <div className="flex shrink-0 animate-marquee items-center gap-10 whitespace-nowrap pr-10">
          {row.map((m, i) => (
            <span key={i} className="flex items-center gap-10 text-[0.68rem] font-medium uppercase tracking-[0.22em]">
              {m}
              <span className="text-orchid">✦</span>
            </span>
          ))}
        </div>
        <div aria-hidden className="flex shrink-0 animate-marquee items-center gap-10 whitespace-nowrap pr-10">
          {row.map((m, i) => (
            <span key={i} className="flex items-center gap-10 text-[0.68rem] font-medium uppercase tracking-[0.22em]">
              {m}
              <span className="text-orchid">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
