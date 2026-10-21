import os
import re

base_dir = r"C:\Users\HomePC\.gemini\antigravity\brain\792a8f1a-0fce-41a3-95c6-d1341073d446"

# 3. Create sitemap.ts
sitemap_path = os.path.join(base_dir, "src", "app", "sitemap.ts")
with open(sitemap_path, "w", encoding="utf-8") as f:
    f.write("""import { MetadataRoute } from 'next';
import { getStripeProducts } from '@/lib/stripe-products';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getStripeProducts();
  
  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: `https://astera.com/shop/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: 'https://astera.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://astera.com/shop',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://astera.com/shop/astera-nakit',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://astera.com/shop/tradicijski-nakit',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://astera.com/shop/vjerski-nakit',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  return [...staticEntries, ...productEntries];
}
""")
print("Created sitemap.ts")

# 4. Update page.tsx
page_path = os.path.join(base_dir, "src", "app", "shop", "[...slug]", "page.tsx")
with open(page_path, "r", encoding="utf-8") as f:
    page_content = f.read()

# Add Metadata import and generateMetadata function
if "import { Metadata } from 'next';" not in page_content:
    page_content = "import { Metadata } from 'next';\n" + page_content

generate_metadata_str = """
export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || [];
  const categories = ["astera-nakit", "tradicijski-nakit", "vjerski-nakit"];
  
  if (categories.includes(slug[0])) {
    const categoryMap: Record<string, string> = {
      "astera-nakit": "Astera nakit",
      "tradicijski-nakit": "Tradicijski nakit",
      "vjerski-nakit": "Vjerski nakit"
    };
    const title = categoryMap[slug[0]] || "Collection";
    return {
      title,
      description: `Shop the exquisite ${title} collection from Astera.`,
      alternates: { canonical: `https://astera.com/shop/${slug[0]}` }
    };
  }

  // Fetch product for dynamic metadata
  const stripeProducts = await getStripeProducts();
  const product = stripeProducts.find(p => p.id === slug[0] || p.metadata.original_id === slug[0]);
  
  if (!product) {
    return { title: 'Product Not Found' };
  }

  const price = product.prices.length > 0 ? (product.prices[0].unit_amount || 0) / 100 : 0;
  
  return {
    title: product.name,
    description: product.description || `Buy ${product.name} at Astera`,
    alternates: { canonical: `https://astera.com/shop/${slug[0]}` },
    openGraph: {
      title: product.name,
      description: product.description || `Buy ${product.name} at Astera`,
      images: product.images.length > 0 ? [product.images[0]] : [],
      type: 'website',
    },
  };
}

"""

# Insert generateMetadata before export default function
page_content = page_content.replace(
    "export default async function ShopSlugPage",
    generate_metadata_str + "export default async function ShopSlugPage"
)

# Insert JSON-LD script for Product
json_ld_injection = """
  // (Re-fetch products if not loaded by categories block)
  let stripeProducts = null;
  try { stripeProducts = await getStripeProducts(); } catch(e){}
  const product = stripeProducts ? stripeProducts.find(p => p.id === slug[0] || p.metadata.original_id === slug[0]) : null;
  const jsonLd = product ? {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images,
    description: product.description,
    offers: {
      '@type': 'AggregateOffer',
      offerCount: product.prices.length,
      lowPrice: product.prices.length > 0 ? Math.min(...product.prices.map(p => (p.unit_amount || 0)/100)) : 0,
      highPrice: product.prices.length > 0 ? Math.max(...product.prices.map(p => (p.unit_amount || 0)/100)) : 0,
      priceCurrency: product.prices.length > 0 ? product.prices[0].currency.toUpperCase() : 'EUR',
      availability: 'https://schema.org/InStock',
    },
  } : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ProductDetailClient productId={slug[0]} />
    </>
  );
"""

page_content = page_content.replace(
    "  // Else, it's a product\n  return <ProductDetailClient productId={slug[0]} />;",
    "  // Else, it's a product\n" + json_ld_injection
)

with open(page_path, "w", encoding="utf-8") as f:
    f.write(page_content)
print("Updated page.tsx")
