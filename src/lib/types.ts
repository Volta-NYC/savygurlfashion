export type Product = {
  slug: string;
  name: string;
  price: number | null;
  salePrice: number | null;
  onSale: boolean;
  categories: string[];
  isNew: boolean;
  variant: string | null;
  description: string[];
  alt: string | null;
  images: string[];
  rating?: number;
  reviewCount?: number;
};

export type Review = {
  author: string;
  location: string;
  rating: number;
  title: string;
  body: string;
  productName: string;
  productSlug: string;
};

export type Category = {
  slug: string;
  name: string;
  blurb: string;
  count: number;
  heroImage: string | null;
};
