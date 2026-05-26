import os
import shutil

old_dir = 'src/app/shop/[id]'
new_dir = 'src/app/shop/[...slug]'

if os.path.exists(old_dir):
    os.rename(old_dir, new_dir)

# Read the old page.tsx
with open(os.path.join(new_dir, 'page.tsx'), 'r', encoding='utf-8') as f:
    client_code = f.read()

# Modify ProductDetailClient
client_code = client_code.replace('export default function ProductDetailPage() {', 'export default function ProductDetailClient({ productId }: { productId: string }) {')
client_code = client_code.replace('const params = useParams();\n  const productId = params.id as string;', '')

# Write ProductDetailClient.tsx
with open(os.path.join(new_dir, 'ProductDetailClient.tsx'), 'w', encoding='utf-8') as f:
    f.write(client_code)

# Create the new page.tsx Server Component
server_code = """import ProductDetailClient from './ProductDetailClient';
import ProductGrid from '../ProductGrid';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getStripeProducts } from '@/lib/stripe-products';

export default async function ShopSlugPage({ params }: { params: { slug: string[] } }) {
  const slug = params.slug;
  const categories = ["astera-nakit", "tradicijski-nakit", "vjerski-nakit"];
  
  if (categories.includes(slug[0])) {
    const stripeProducts = await getStripeProducts();
    const products = stripeProducts.map(p => ({
      id: p.metadata.original_id || p.id,
      stripe_id: p.id,
      name: p.name,
      description: p.description,
      images: p.images,
      category: p.metadata.category || 'Jewelry',
      theme: p.metadata.theme || 'Classic',
      stoneColor: p.metadata.stoneColor || 'Clear',
      material: p.metadata.materials ? p.metadata.materials.split(',') : [],
      price: p.prices.reduce((acc, price) => {
        const material = price.metadata.material || 'sterling_silver';
        acc[material] = (price.unit_amount || 0) / 100;
        return acc;
      }, {} as Record<string, number>),
      badges: p.metadata.materials ? [] : ['Novo']
    }));

    // Mapping slugs to our JSON categories
    const categoryMap: Record<string, string> = {
      "astera-nakit": "Astera nakit",
      "tradicijski-nakit": "Tradicijski nakit",
      "vjerski-nakit": "Vjerski nakit"
    };
    
    // Simple mock filter for the demonstration (since existing products might not match exactly)
    // We'll pass the category as a filter, or just pass all and let the grid filter, but let's pre-filter
    const mainCategory = categoryMap[slug[0]] || "Astera nakit";
    
    // In a real app we'd filter by mainCategory and subcategory (slug[1])
    // But since the JSON doesn't have these exact categories yet, we will just show the products and
    // modify ProductGrid to show a title for the category.

    return (
      <div className="bg-white">
        <Navbar />
        <main className="min-h-screen">
          <header className="section-luxury bg-luxury-beige border-b border-black/5 flex flex-col items-center justify-center py-32">
            <div className="container-luxury text-center">
              <p className="subheading-luxury mb-6 tracking-[0.4em] uppercase text-astera-400">
                {slug[1] ? slug[1].replace(/-/g, ' ') : mainCategory}
              </p>
              <h1 className="heading-luxury text-5xl md:text-7xl lg:text-[8rem] mb-12 drop-shadow-xl capitalize">
                {mainCategory}
              </h1>
              <div className="w-48 h-[1px] bg-astera-300 mx-auto opacity-30 mt-8" />
            </div>
          </header>
          <section className="section-luxury">
            <div className="container-luxury">
              <ProductGrid initialProducts={products} />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  // Else, it's a product
  return <ProductDetailClient productId={slug[0]} />;
}
"""

with open(os.path.join(new_dir, 'page.tsx'), 'w', encoding='utf-8') as f:
    f.write(server_code)

print("Created Catch-All Route")
