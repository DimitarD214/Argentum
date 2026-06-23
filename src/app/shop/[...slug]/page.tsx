import ProductDetailClient from './ProductDetailClient';
import ProductGrid from '../ProductGrid';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getStripeProducts } from '@/lib/stripe-products';

export default async function ShopSlugPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || [];
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
          <header className="bg-warm-beige border-b border-black/5 flex flex-col items-center justify-center py-32 lg:py-40">
            <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
              <p className="subfont-serif tracking-widest uppercase leading-tight text-astera-900 mb-6 tracking-[0.4em] uppercase text-astera-400">
                {slug[1] ? slug[1].replace(/-/g, ' ') : mainCategory}
              </p>
              <h1 className="font-serif tracking-widest uppercase leading-tight text-astera-900 text-5xl md:text-7xl lg:text-[8rem] mb-12 drop-shadow-xl capitalize">
                {mainCategory}
              </h1>
              <div className="w-48 h-[1px] bg-astera-300 mx-auto opacity-30 mt-8" />
            </div>
          </header>
          <section className="py-20 md:py-24 lg:py-32">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
              <ProductGrid initialProducts={products as any} />
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
