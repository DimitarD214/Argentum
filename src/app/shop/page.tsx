import ProductGrid from './ProductGrid';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getStripeProducts } from '@/lib/stripe-products';

export default async function ShopPage() {
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

  return (
    <div className="bg-white">
      <Navbar />
      
      <main className="min-h-screen pt-32 lg:pt-48 pb-24">
        <header className="px-6 md:px-12 lg:px-24 mb-20 lg:mb-32">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between gap-10">
            <div className="max-w-2xl">
              <p className="font-sans text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-astera-400 mb-6 md:mb-10">Katalog • Proljeće/Ljeto '26</p>
              <h1 className="font-serif text-6xl md:text-8xl lg:text-[10rem] leading-tight tracking-tighter text-charcoal">
                Arhiv.
              </h1>
            </div>
            <div className="max-w-xs md:pb-4">
              <p className="font-sans text-xs md:text-sm leading-relaxed text-gray-500 text-right md:text-left">
                Pažljivo kurirana selekcija naših najistaknutijih kreacija. Dizajnirano za vječnost.
              </p>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-16 md:mt-24 h-[1px] w-full bg-gradient-to-r from-charcoal via-gray-200 to-transparent opacity-20" />
        </header>

        <section className="px-4 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <ProductGrid initialProducts={products as any} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
