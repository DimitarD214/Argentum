import React from "react";
import Image from "next/image";
import Link from "next/link";

export function CategoriesGrid() {
  return (
    <section className="py-24 px-4 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4 animate-fade-in-up">
          <h2 className="font-serif text-4xl md:text-5xl text-anthracite">Curated For You</h2>
          <p className="text-anthracite/60 max-w-xl mx-auto pt-2">
            Explore our defining collections, from timeless traditional motifs to modern silver elegance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
          
          {/* Large Left Column */}
          <Link href="/shop" className="md:col-span-7 relative group overflow-hidden block h-96 md:h-full">
            <Image 
              src="https://images.unsplash.com/photo-1599643478514-4a4e09f52f5e?q=80&w=1200&auto=format&fit=crop" 
              alt="Silver Elegance" 
              fill 
              className="object-cover transition-transform duration-[2000ms] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-anthracite/80 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-8 left-8 text-white z-10 transition-transform duration-500 group-hover:-translate-y-2">
              <h3 className="font-serif text-3xl mb-2">Silver Elegance</h3>
              <span className="text-sm uppercase tracking-widest border-b border-white/50 pb-1">Explore Collection</span>
            </div>
          </Link>

          {/* Right Column Stack */}
          <div className="md:col-span-5 flex flex-col gap-6 h-[800px] md:h-full">
            
            {/* Top Right */}
            <Link href="/shop" className="relative flex-1 group overflow-hidden block">
              <Image 
                src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=800&auto=format&fit=crop" 
                alt="Luxury Watches" 
                fill 
                className="object-cover transition-transform duration-[2000ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-anthracite/80 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 text-white z-10 transition-transform duration-500 group-hover:-translate-y-2">
                <h3 className="font-serif text-2xl mb-1">Men's Watches</h3>
                <span className="text-xs uppercase tracking-widest border-b border-white/50 pb-1">Shop Timepieces</span>
              </div>
            </Link>
            
            {/* Bottom Right */}
            <Link href="/shop" className="relative flex-1 group overflow-hidden block">
              <Image 
                src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop" 
                alt="Heritage Collection" 
                fill 
                className="object-cover transition-transform duration-[2000ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-anthracite/80 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 text-white z-10 transition-transform duration-500 group-hover:-translate-y-2">
                <h3 className="font-serif text-2xl mb-1">Traditional Heritage</h3>
                <span className="text-xs uppercase tracking-widest border-b border-white/50 pb-1">Discover History</span>
              </div>
            </Link>
            
          </div>
        </div>
      </div>
    </section>
  );
}
