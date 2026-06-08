import type { SVGProps } from "react";

const base = (props: SVGProps<SVGSVGElement>) => ({
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...props,
});

export const Bag = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M6 8h12l-.8 11.2A2 2 0 0 1 15.2 21H8.8a2 2 0 0 1-2-1.8L6 8Z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </svg>
);

export const Search = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.2-3.2" />
  </svg>
);

export const Menu = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
);

export const Close = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const ChevronDown = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const ArrowRight = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ArrowUpRight = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
);

export const Plus = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const Minus = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M5 12h14" />
  </svg>
);

export const Heart = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M12 20s-7-4.3-9.3-8.5C1 8.5 2.5 5.5 5.6 5.5c2 0 3.2 1.3 3.9 2.4.7-1.1 1.9-2.4 3.9-2.4 3.1 0 4.6 3 2.9 6C19 15.7 12 20 12 20Z" />
  </svg>
);

export const Truck = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z" />
    <circle cx="7" cy="18" r="1.6" />
    <circle cx="17.5" cy="18" r="1.6" />
  </svg>
);

export const Sparkle = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M12 3c.5 4 1.8 5.3 6 6-4.2.7-5.5 2-6 6-.5-4-1.8-5.3-6-6 4.2-.7 5.5-2 6-6Z" />
  </svg>
);

export const Shield = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M12 3 5 6v5c0 4.3 3 7.3 7 9 4-1.7 7-4.7 7-9V6l-7-3Z" />
    <path d="m9.5 12 1.8 1.8L15 10" />
  </svg>
);

export const Ruler = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M3 8h18v8H3z" />
    <path d="M7 8v3M11 8v4M15 8v3M19 8v4" />
  </svg>
);

export const Gift = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M4 11h16v9H4zM4 8h16v3H4zM12 8v12" />
    <path d="M12 8S10 3 7.5 4.2 9.5 8 12 8Zm0 0s2-5 4.5-3.8S14.5 8 12 8Z" />
  </svg>
);

export const Instagram = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="3.6" />
    <circle cx="17" cy="7" r="0.6" fill="currentColor" />
  </svg>
);

export const Facebook = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M14.5 8.5H16V5.8h-2.1c-2 0-3.1 1.2-3.1 3.2v1.6H8.7v2.7h2.1V21h2.8v-7.7h2.1l.4-2.7h-2.5V9.3c0-.6.2-.8.9-.8Z" />
  </svg>
);

export const Star = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)} fill="currentColor" stroke="none">
    <path d="M12 3.5l2.4 5 5.4.7-4 3.7 1 5.4-4.8-2.7-4.8 2.7 1-5.4-4-3.7 5.4-.7z" />
  </svg>
);

export const Phone = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M5 4h3l1.5 4-2 1.5a12 12 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16 16 0 0 1 3 6.2 2 2 0 0 1 5 4Z" />
  </svg>
);

export const Mail = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 6.5 8.5 6 8.5-6" />
  </svg>
);
