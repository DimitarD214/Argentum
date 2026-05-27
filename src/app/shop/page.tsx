import ProductGrid from './ProductGrid';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getStripeProducts } from '@/lib/stripe-products';

export default async function ShopPage() {
  // Fetch real-time products and prices from Stripe Sandbox
  const stripeProducts = await getStripeProducts();

  // Transform Stripe data back to the format the UI expects if necessary
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
    // Map individual prices to the price object the UI uses
    price: p.prices.reduce((acc, price) => {
      const material = price.metadata.material || 'sterling_silver';
      acc[material] = (price.unit_amount || 0) / 100;
      return acc;
    }, {} as Record<string, number>),
    badges: p.metadata.materials ? [] : ['Novo'] // Custom logic for badges
  }));

  return (
    <div className="bg-white">
      <Navbar />
      
      <main className="min-h-screen">
        {/* ========== SHOP HEADER (LUXURY CONSTITUTION) ========== */}
        <header className="section-luxury bg-luxury-beige border-b border-black/5 flex flex-col items-center justify-center py-32">
          <div className="container-luxury text-center">
            <p className="subheading-luxury mb-6 tracking-[0.4em] uppercase text-astera-400">Proljeće / Ljeto 2026</p>
            <h1 className="heading-luxury text-5xl md:text-7xl lg:text-[8rem] mb-12 drop-shadow-xl">
              Kolekcija
            </h1>
            <div className="w-48 h-[1px] bg-astera-300 mx-auto opacity-30 mt-8" />
          </div>
        </header>

        <section className="section-luxury">
          <div className="container-luxury">
             {/* Pass real-time products to the client component */}
            <ProductGrid initialProducts={products as any} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
