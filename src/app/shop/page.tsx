import ProductGrid from './ProductGrid';
import { promises as fs } from 'fs';
import path from 'path';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default async function ShopPage() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'products.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const products = JSON.parse(fileContents);

  return (
    <>
      <Navbar variant="solid" />
      <div className="min-h-screen bg-white pt-64 pb-48">
        <div className="max-w-[1720px] mx-auto px-12 md:px-32">
          <header className="mb-16 text-center border-b border-gray-100 pb-12 pt-8">
            <h1 className="text-6xl md:text-7xl font-serif mb-6 text-black tracking-tighter uppercase">The Collection</h1>
            <p className="text-gray-400 font-sans tracking-[0.3em] text-xs uppercase italic">Spring / Summer 2026 Edition</p>
          </header>
          <ProductGrid initialProducts={products} />
        </div>
      </div>
      <Footer />
    </>
  );
}
