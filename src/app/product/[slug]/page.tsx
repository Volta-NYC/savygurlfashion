import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, getProduct, relatedProducts, effectivePrice, reviewsForProduct, cleanLocation } from "@/lib/products";
import { site } from "@/lib/site";
import { ProductDetail } from "@/components/product-detail";
import { ProductGrid, Breadcrumb, SectionHeading } from "@/components/ui";
import { Stars } from "@/components/stars";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProduct(params.slug);
  if (!p) return {};
  const desc = p.description.slice(0, 3).join(". ") || site.description;
  return {
    title: p.name,
    description: desc,
    openGraph: { title: p.name, description: desc, images: [p.images[0]], type: "website" },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();
  const related = relatedProducts(product, 4);
  const productReviews = reviewsForProduct(product.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images.map((i) => `${site.url}${i}`),
    description: product.description.join(". "),
    brand: { "@type": "Brand", name: site.name },
    ...(product.rating != null
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.reviewCount,
          },
        }
      : {}),
    offers: {
      "@type": "Offer",
      price: effectivePrice(product) ?? undefined,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div className="shell py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb
        trail={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          ...(product.categories[0] ? [{ label: product.categories[0].replace("-", " "), href: `/collections/${product.categories[0]}` }] : []),
          { label: product.name },
        ]}
      />
      <div className="mt-8">
        <ProductDetail product={product} />
      </div>

      {productReviews.length > 0 && (
        <section id="reviews" className="mt-24 scroll-mt-32">
          <SectionHeading eyebrow="Reviews" title="What customers think" />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {productReviews.map((r, i) => {
              const showBody = r.body && r.body !== r.title;
              return (
                <figure key={i} className="flex h-full flex-col rounded-3xl border border-line bg-cream p-7">
                  <Stars rating={r.rating} />
                  <blockquote className="mt-4 flex-1">
                    <p className="font-display text-xl leading-snug">“{r.title}”</p>
                    {showBody && <p className="mt-2 text-sm text-ink-soft">{r.body}</p>}
                  </blockquote>
                  <figcaption className="mt-6 border-t border-line pt-4 text-sm">
                    <span className="font-semibold">{r.author}</span>
                    <span className="text-ink-soft"> · {cleanLocation(r.location)}</span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-24">
          <SectionHeading eyebrow="You may also love" title="Complete the look" />
          <div className="mt-10">
            <ProductGrid items={related} />
          </div>
        </section>
      )}
    </div>
  );
}
