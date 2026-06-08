import "./globals.css";
import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import { CartProvider } from "@/lib/cart";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart-drawer";
import { site } from "@/lib/site";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const body = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: ["women's fashion", "boutique", "plus size", "affordable fashion", "sustainable fashion", "sets", "dresses"],
  openGraph: {
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    type: "website",
    url: site.url,
    siteName: site.name,
    images: ["/images/brand/savygurl-logo.png"],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/images/brand/savygurl-logo.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="flex min-h-screen flex-col bg-paper font-body text-ink antialiased">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
