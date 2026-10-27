import { MetadataRoute } from "next";
import { getStripeProducts } from "@/lib/stripe-products";
import { SITE_URL } from "@/lib/company";
import { absoluteUrl } from "@/lib/seo";
import { belongsToCategory, validCategories } from "@/lib/categories";

/**
 * Evaluated when the sitemap is generated (build / revalidation), so the fallback date is the
 * date of the current catalogue deployment – not "now" on every crawl. A product may carry its own
 * `updatedAt` (ISO date) in products.json, which always wins.
 */
const CATALOG_LAST_MODIFIED = new Date();

const LEGAL_PAGES = [
  "/uvjeti-poslovanja",
  "/pravila-privatnosti",
  "/kolacici",
  "/drzavni-zigovi",
  "/vodic-za-velicine",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getStripeProducts();

  const toDate = (iso?: string) => {
    const d = iso ? new Date(iso) : null;
    return d && !isNaN(d.getTime()) ? d : CATALOG_LAST_MODIFIED;
  };

  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/shop/${product.metadata.original_id || product.id}`,
    lastModified: toDate(product.updatedAt),
    changeFrequency: "weekly",
    priority: 0.8,
    images: product.images.map(absoluteUrl),
  }));

  // Categories + sub-categories derived from the live catalogue (only non-empty collections).
  const normalized = products.map((p) => ({
    line: p.metadata.line,
    subcategory: p.metadata.subcategory,
    material: p.metadata.materials ? p.metadata.materials.split(",") : [],
    updatedAt: p.updatedAt,
  }));

  const latest = (items: { updatedAt?: string }[]) =>
    items.reduce<Date>((acc, i) => {
      const d = toDate(i.updatedAt);
      return d > acc ? d : acc;
    }, new Date(0));

  const categoryEntries: MetadataRoute.Sitemap = [];
  for (const slug of Object.keys(validCategories)) {
    const inCategory = normalized.filter((p) => belongsToCategory(p, slug));
    if (inCategory.length === 0) continue;
    categoryEntries.push({
      url: `${SITE_URL}/shop/${slug}`,
      lastModified: latest(inCategory),
      changeFrequency: "weekly",
      priority: 0.8,
    });
    const subs = Array.from(
      new Set(inCategory.map((p) => p.subcategory).filter(Boolean) as string[])
    );
    for (const sub of subs) {
      categoryEntries.push({
        url: `${SITE_URL}/shop/${slug}/${sub}`,
        lastModified: latest(inCategory.filter((p) => p.subcategory === sub)),
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: latest(normalized),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/shop`,
      lastModified: latest(normalized),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...LEGAL_PAGES.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: CATALOG_LAST_MODIFIED,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];

  return [...staticEntries, ...categoryEntries, ...productEntries];
}