import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";
import ProductGrid from "../ProductGrid";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { getStripeProducts, type StripeProduct } from "@/lib/stripe-products";
import {
  validCategories,
  subcategoryLabels,
  belongsToCategory,
  categoryLabelHr,
} from "@/lib/categories";
import { BRAND_NAME, SITE_URL } from "@/lib/company";
import {
  absoluteUrl,
  buildBreadcrumbJsonLd,
  buildProductJsonLd,
  collectionDescription,
  productDescription,
  productTitle,
  type SeoProduct,
} from "@/lib/seo";
import type { MetalKey } from "@/lib/pricing";
import type { SearchableProduct } from "@/lib/searchEngine";

/** Normalises a catalogue product for SEO helpers (titles, descriptions, JSON-LD). */
function toSeoProduct(p: StripeProduct): SeoProduct {
  const price: Partial<Record<MetalKey, number>> = {};
  p.prices.forEach((pr) => {
    price[(pr.metadata.material || "gold_14k") as MetalKey] = (pr.unit_amount || 0) / 100;
  });
  return {
    id: p.metadata.original_id || p.id,
    name: p.name,
    description: p.description,
    brand: p.brand || p.metadata.brand || BRAND_NAME,
    images: p.images,
    material: p.metadata.materials ? p.metadata.materials.split(",") : [],
    category: categoryLabelHr[p.metadata.category || ""] || p.metadata.category,
    line: p.metadata.line,
    price,
    basePrice: p.basePrice,
  };
}

const findProduct = (products: StripeProduct[], slug: string) =>
  products.find((p) => p.id === slug || p.metadata.original_id === slug);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || [];

  if (slug[0] === "vjerski-nakit" || slug[1] === "kompleti" || slug.length > 2) {
    return { title: "Stranica nije pronađena | Astera", robots: { index: false } };
  }

  if (validCategories[slug[0]]) {
    const cat = validCategories[slug[0]];
    const subSlug = slug[1]?.toLowerCase();
    if (subSlug && !subcategoryLabels[subSlug]) {
      return { title: "Stranica nije pronađena | Astera", robots: { index: false } };
    }
    const sub = subSlug ? subcategoryLabels[subSlug] : null;
    const title = sub ? `${cat.title} — ${sub}` : cat.title;
    const description = collectionDescription(cat.description, title);
    const path = `/shop/${slug.join("/")}`;
    return {
      title,
      description,
      alternates: { canonical: path },
      openGraph: {
        title: `${title} | ${BRAND_NAME}`,
        description,
        url: path,
        siteName: BRAND_NAME,
        locale: "hr_HR",
        type: "website",
        images: [{ url: "/images/astera-showcase.jpg", width: 1200, height: 630, alt: title }],
      },
    };
  }

  const stripeProducts = await getStripeProducts();
  const product = findProduct(stripeProducts, slug[0]);

  if (!product) {
    return { title: "Proizvod nije pronađen | Astera", robots: { index: false } };
  }

  const seo = toSeoProduct(product);
  const title = productTitle(seo); // [Naziv] - [Materijal/Finoća] | [Brand]
  const description = productDescription(seo);
  const path = `/shop/${seo.id}`;
  const image = seo.images?.[0] ? absoluteUrl(seo.images[0]) : absoluteUrl("/images/astera-showcase.jpg");

  return {
    // `absolute` skips the layout "%s | Astera" template – the formula already ends with the brand.
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: BRAND_NAME,
      locale: "hr_HR",
      images: [{ url: image, alt: seo.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function ShopSlugPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || [];

  if (slug[0] === "vjerski-nakit" || slug[1] === "kompleti" || slug.length > 2) {
    notFound();
  }

  if (validCategories[slug[0]]) {
    const stripeProducts = await getStripeProducts();
    const allProducts: SearchableProduct[] = stripeProducts.map((p) => ({
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

    const catInfo = validCategories[slug[0]];
    const subSlug = slug[1]?.toLowerCase();

    if (subSlug && !subcategoryLabels[subSlug]) {
      notFound();
    }

    let categoryProducts = allProducts.filter((p) =>
      belongsToCategory(p, slug[0])
    );

    if (subSlug) {
      const subFiltered = categoryProducts.filter(
        (p) =>
          p.subcategory?.toLowerCase() === subSlug ||
          (subSlug === "prstenje" && p.category === "Rings")
      );
      if (subFiltered.length === 0) {
        notFound();
      }
      categoryProducts = subFiltered;
    }

    const displaySub = subSlug
      ? subcategoryLabels[subSlug] || subSlug.replace(/-/g, " ")
      : catInfo.subtitle;

    const crumbs = [
      { name: "Početna", path: "/" },
      { name: "Trgovina", path: "/shop" },
      { name: catInfo.title, path: `/shop/${slug[0]}` },
      ...(subSlug
        ? [{ name: displaySub, path: `/shop/${slug[0]}/${subSlug}` }]
        : []),
    ];

    const defaultLineScope: "all" | "astera-nakit" | "tradicijski-nakit" =
      slug[0] === "astera-nakit" || slug[0] === "tradicijski-nakit"
        ? slug[0]
        : "all";

    return (
      <div className="bg-cream">
        <JsonLd data={buildBreadcrumbJsonLd(crumbs)} />
        <Navbar />
        <main className="min-h-screen">
          <header className="bg-warm-beige border-b border-astera-200/80 flex flex-col items-center justify-center pt-32 pb-12 lg:pt-36 lg:pb-16">
            <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
              <nav
                aria-label="Navigacijske mrvice"
                className="font-sans text-[10px] uppercase tracking-[0.25em] text-astera-600 mb-4 flex flex-wrap items-center justify-center gap-2"
              >
                {crumbs.map((c, i) => (
                  <span key={c.path} className="flex items-center gap-2">
                    {i > 0 && <span className="opacity-40">/</span>}
                    {i < crumbs.length - 1 ? (
                      <Link href={c.path} className="hover:text-astera-900 transition-colors">
                        {c.name}
                      </Link>
                    ) : (
                      <span aria-current="page" className="font-bold">
                        {c.name}
                      </span>
                    )}
                  </span>
                ))}
              </nav>
              <p className="font-sans text-[10px] font-bold uppercase tracking-[0.35em] text-astera-600 mb-3">
                {displaySub}
              </p>
              <h1 className="font-serif tracking-wider uppercase leading-tight text-astera-900 text-2xl sm:text-4xl lg:text-5xl mb-3">
                {subSlug ? `${catInfo.title} — ${displaySub}` : catInfo.title}
              </h1>
              <p className="font-sans text-xs md:text-sm text-charcoal/70 max-w-xl mx-auto leading-relaxed">
                {catInfo.description}
              </p>
            </div>
          </header>
          <section className="py-10 md:py-16">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
              <ProductGrid
                initialProducts={categoryProducts}
                defaultMaterial={slug[0] === "zlatni-nakit" ? "14k Gold" : "All"}
                defaultLineScope={defaultLineScope}
                compactHeader={true}
              />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  let stripeProducts: StripeProduct[] | null = null;
  try {
    stripeProducts = await getStripeProducts();
  } catch {
    // Fallback handled below
  }
  const product = stripeProducts ? findProduct(stripeProducts, slug[0]) : null;

  // Unknown slug => real 404 (previously a soft-404 "Komad nije pronađen" with HTTP 200).
  if (!product) {
    notFound();
  }

  const seo = toSeoProduct(product);
  const line = product.metadata.line || "astera-nakit";
  const lineInfo = validCategories[line];
  const sub = product.metadata.subcategory;

  const crumbs = [
    { name: "Početna", path: "/" },
    { name: "Trgovina", path: "/shop" },
    ...(lineInfo ? [{ name: lineInfo.title, path: `/shop/${line}` }] : []),
    ...(lineInfo && sub && subcategoryLabels[sub]
      ? [{ name: subcategoryLabels[sub], path: `/shop/${line}/${sub}` }]
      : []),
    { name: seo.name, path: `/shop/${seo.id}` },
  ];

  const firstKey = Object.keys(seo.price || {})[0] as MetalKey | undefined;
  const lowPrice = firstKey ? seo.price?.[firstKey] : undefined;

  return (
    <>
      <JsonLd data={[buildProductJsonLd(seo), buildBreadcrumbJsonLd(crumbs)]} />
      {/* Open Graph commerce tags (hoisted into <head> by React 19) */}
      <meta property="og:type" content="product" />
      <meta property="og:url" content={`${SITE_URL}/shop/${seo.id}`} />
      {typeof lowPrice === "number" && (
        <>
          <meta property="product:price:amount" content={lowPrice.toFixed(2)} />
          <meta property="product:price:currency" content="EUR" />
        </>
      )}
      <meta property="product:availability" content="in stock" />
      <meta property="product:condition" content="new" />
      <meta property="product:brand" content={seo.brand || BRAND_NAME} />
      <ProductDetailClient
        productId={slug[0]}
        breadcrumbs={crumbs.slice(1).map((c) => ({ name: c.name, path: c.path }))}
      />
    </>
  );
}
