import ProductGrid from './ProductGrid';
import { promises as fs } from 'fs';
import path from 'path';

export default async function ShopPage() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'products.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const products = JSON.parse(fileContents);

  return (
    <div className="min-h-screen bg-[var(--pure-white)] text-[var(--foreground)] pt-32 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <header className="mb-16 text-center border-b border-gray-100 pb-10">
          <h1 className="text-5xl font-serif mb-4 text-black tracking-wide">Spring Collection</h1>
          <p className="text-gray-500 font-sans tracking-widest text-sm uppercase">Explore our meticulously handcrafted seasonal pieces</p>
        </header>
        <ProductGrid initialProducts={products} />
      </div>
    </div>
  );
}
