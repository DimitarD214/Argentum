import React from "react";
import { Hero } from "@/components/Hero";
import { JewelersNote } from "@/components/JewelersNote";
import { CategoriesGrid } from "@/components/CategoriesGrid";
import { HeritageSection } from "@/components/HeritageSection";
import { ProductCard } from "@/components/ProductCard";
import { getProducts } from "@/lib/shopify";
import Link from "next/link";

export default async function Home() {
  const products = await getProducts();
  const bestsellers = products.slice(0, 3);

  return (
    <div className="bg-background">
      <Hero />
      <JewelersNote />
      
      <CategoriesGrid />
      <HeritageSection />

      <section className="py-32 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="text-center mb-24 space-y-4">
            <span className="text-gray-400 uppercase tracking-[0.25em] text-[10px] font-bold block mb-4">Trending Now</span>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground">Bestsellers</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16 w-full max-w-6xl mx-auto">
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-24">
            <Link href="/shop" className="px-14 py-5 border border-foreground text-foreground font-semibold uppercase tracking-[0.2em] text-[11px] hover:bg-foreground hover:text-white transition-colors duration-500">
              View All Collections
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-white py-24 px-6 text-center">
         <h2 className="font-serif text-3xl mb-8 tracking-[0.2em]">ARGENTUM STIL</h2>
         <div className="flex justify-center flex-wrap gap-8 mb-12 text-[10px] uppercase tracking-widest text-white/60">
           <Link href="#" className="hover:text-white transition-colors">Client Services</Link>
           <Link href="#" className="hover:text-white transition-colors">Our Boutiques</Link>
           <Link href="#" className="hover:text-white transition-colors">Careers</Link>
         </div>
         <p className="text-white/30 text-[9px] uppercase tracking-widest">© 2026 Argentum Stil. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
