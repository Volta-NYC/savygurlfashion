import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FAF5EF",
        sand: "#F2E8DE",
        cream: "#FFFCF8",
        ink: "#2A2025",
        "ink-soft": "#6B5C64",
        plum: {
          DEFAULT: "#5A2950",
          deep: "#3C1A37",
          soft: "#7E4573",
        },
        orchid: "#9C5A8C",
        lilac: "#ECE0EA",
        berry: "#B23A6B",
        gold: "#B5894F",
        line: "#E8DBCF",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        widest: "0.28em",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        soft: "0 18px 40px -24px rgba(60, 26, 55, 0.35)",
        lift: "0 30px 60px -30px rgba(60, 26, 55, 0.45)",
      },
      maxWidth: {
        wide: "84rem",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
