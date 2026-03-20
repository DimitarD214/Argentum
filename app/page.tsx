import React from "react";
import { Hero } from "@/components/Hero";
import { JewelersNote } from "@/components/JewelersNote";
import { CategoriesGrid } from "@/components/CategoriesGrid";
import { HeritageSection } from "@/components/HeritageSection";
import { ProductCard } from "@/components/ProductCard";
import { getProducts } from "@/lib/shopify";
import Link from "next/link";

export default async function Home() {
  // Fetch mock products and slice the first 3 for Bestsellers
  const products = await getProducts();
  const bestsellers = products.slice(0, 3);

  return (
    <div className="bg-background">
      <Hero />
      <JewelersNote />
      
      {/* Categories Grid Section */}
      <CategoriesGrid />

      {/* Heritage Section */}
      <HeritageSection />

      {/* Bestsellers Section */}
      <section className="py-32 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="text-center mb-20 space-y-4 animate-fade-in-up">
            <span className="text-silver-dark uppercase tracking-[0.2em] text-xs font-bold">Trending Now</span>
            <h2 className="font-serif text-4xl md:text-6xl text-anthracite">Bestsellers</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16 w-full max-w-6xl mx-auto">
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-24">
            <Link href="/shop" className="px-12 py-5 border border-anthracite text-anthracite font-semibold uppercase tracking-[0.2em] text-xs hover:bg-anthracite hover:text-white transition-colors duration-500 shadow-sm">
              View All Collections
            </Link>
          </div>
        </div>
      </section>

      {/* Minimal Footer Mockup */}
      <footer className="bg-anthracite text-white py-16 px-6 text-center">
         <h2 className="font-serif text-4xl mb-6 tracking-widest">ARGENTUM STIL</h2>
         <p className="text-white/50 text-sm uppercase tracking-widest">© 2026 Argentum Stil. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
