import React from "react";
import { getProducts } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Sidebar Mockup */}
          <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
            <div>
              <h3 className="font-serif text-xl text-anthracite mb-4 border-b border-anthracite/10 pb-2">Categories</h3>
              <ul className="space-y-3 text-sm text-anthracite/70">
                <li><button className="hover:text-silver-dark font-medium transition-colors">All Jewelry</button></li>
                <li><button className="hover:text-silver-dark transition-colors">Traditional Heritage</button></li>
                <li><button className="hover:text-silver-dark transition-colors">Luxury Watches</button></li>
                <li><button className="hover:text-silver-dark transition-colors">Silver Elegance</button></li>
                <li><button className="hover:text-silver-dark transition-colors">TiAmi Personalized</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-serif text-xl text-anthracite mb-4 border-b border-anthracite/10 pb-2">Materials</h3>
              <ul className="space-y-3 text-sm text-anthracite/70">
                <li>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="accent-anthracite" />
                    <span>925 Sterling Silver</span>
                  </label>
                </li>
                <li>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="accent-anthracite" />
                    <span>Gold Plated</span>
                  </label>
                </li>
                <li>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="accent-anthracite" />
                    <span>Rose Gold Plated</span>
                  </label>
                </li>
              </ul>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            <div className="flex justify-between items-end mb-8">
              <h1 className="font-serif text-4xl text-anthracite">All Collections</h1>
              <span className="text-sm text-anthracite/50">{products.length} Products</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </main>
          
        </div>
      </div>
    </div>
  );
}
