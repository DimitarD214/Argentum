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

      <section className="py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-0 bg-white">
        <div className="flex flex-col items-center w-full">
          <div className="text-center mb-12 md:mb-16 lg:mb-20 space-y-3 md:space-y-4 px-4 max-w-2xl">
            <span className="text-gray-400 uppercase tracking-[0.25em] text-[10px] font-bold block">Trending Now</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground">Spring Favorites</h2>
            <p className="text-gray-500 text-xs md:text-sm pt-2">Our most-loved pieces this season</p>
            <div className="pt-2">
              <Link href="/shop" className="text-xs uppercase font-semibold tracking-widest border-b border-foreground pb-1 hover:text-gray-500 transition-colors">
                View Entire Collection
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 w-full max-w-none">
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 md:mt-16 lg:mt-20">
            <Link href="/shop" className="px-12 md:px-14 py-4 md:py-5 border border-foreground text-foreground font-semibold uppercase tracking-[0.2em] text-[10px] md:text-[11px] hover:bg-foreground hover:text-white transition-colors duration-500">
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
