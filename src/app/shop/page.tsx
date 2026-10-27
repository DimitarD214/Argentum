import ProductGrid from "./ProductGrid";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { getStripeProducts } from "@/lib/stripe-products";
import { buildBreadcrumbJsonLd } from "@/lib/seo";
import type { SearchableProduct } from "@/lib/searchEngine";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trgovina – srebrni i zlatni nakit ručne izrade",
  description:
    "Srebrni nakit ručne izrade, certificirano srebro 925 i zlato 585. Prstenje, naušnice, ogrlice i narukvice – besplatna dostava Hrvatska.",
  alternates: { canonical: "/shop" },
  openGraph: {
    title: "Trgovina – srebrni i zlatni nakit | Astera",
    description:
      "Srebrni nakit ručne izrade, certificirano srebro 925 i zlato 585. Besplatna dostava Hrvatska.",
    url: "/shop",
    locale: "hr_HR",
    type: "website",
  },
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string }>;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const stripeProducts = await getStripeProducts();

  const products: SearchableProduct[] = stripeProducts
    .filter(
      (p) =>
        p.metadata.category !== "Vjerski nakit" &&
        p.metadata.line !== "vjerski-nakit"
    )
    .map((p) => ({
      id: p.metadata.original_id || p.id,
      stripe_id: p.id,
      name: p.name,
      description: p.description,
      images: p.images,
      brand: p.brand || p.metadata.brand || "Astera Atelier",
      tags:
        p.tags ||
        (p.metadata.tags ? p.metadata.tags.split(",").filter(Boolean) : []),
      rating:
        typeof p.rating === "number"
          ? p.rating
          : Number(p.metadata.rating || 4.8),
      reviewCount:
        typeof p.reviewCount === "number"
          ? p.reviewCount
          : Number(p.metadata.reviewCount || 120),
      basePrice:
        typeof p.basePrice === "number"
          ? p.basePrice
          : Number(p.metadata.basePrice || 0),
      category: p.metadata.category || "Jewelry",
      line: p.metadata.line || "astera-nakit",
      subcategory: p.metadata.subcategory || "",
      theme: p.metadata.theme || "Klasično",
      stoneColor: p.metadata.stoneColor || "14k Zlato",
      material: p.metadata.materials ? p.metadata.materials.split(",") : [],
      price: p.prices.reduce((acc, price) => {
        const material = price.metadata.material || "gold_14k";
        acc[material] = (price.unit_amount || 0) / 100;
        return acc;
      }, {} as Record<string, number>),
      priceHistory30d: p.priceHistory30d,
      badges: p.metadata.badges
        ? p.metadata.badges.split(",").filter(Boolean)
        : ["Ručni Rad"],
    }));

  return (
    <div className="bg-cream">
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Početna", path: "/" },
          { name: "Trgovina", path: "/shop" },
        ])}
      />
      <Navbar />

      <main className="min-h-screen pt-28 lg:pt-32 pb-20">
        <section className="px-4 md:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <ProductGrid
              initialProducts={products}
              initialQuery={resolvedSearchParams?.q || ""}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
