import React from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "../ScrollReveal";

const categories = [
  { name: "Bezvremenske Ogrlice", bg: "var(--color-seafoam)", image: "/forest-greens-necklace.png", size: "lg:col-span-2 lg:row-span-2" },
  { name: "Umjetničko Prstenje", bg: "var(--color-luxury-beige)", image: "/emerald-butterfly-ring.png", size: "lg:col-span-1 lg:row-span-1" },
  { name: "Kolekcija Naušnica", bg: "var(--color-aqua)", image: "/floral-droplet-earrings.png", size: "lg:col-span-1 lg:row-span-1" },
  { name: "Remek-djela Narukvica", bg: "var(--color-mint)", image: "/rose-petal-bracelet.png", size: "lg:col-span-2 lg:row-span-1" },
];

export default function CategoryGrid() {
  return (
    <section id="discover" className="bg-white py-24 lg:py-32 px-4">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
         <ScrollReveal className="text-left mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <p className="subfont-serif tracking-widest uppercase leading-tight text-astera-900 tracking-[0.2em] md:tracking-[0.4em] font-bold text-xs text-astera-600 mb-4">
                Kolekcije
              </p>
              <h3 className="font-serif tracking-widest uppercase leading-tight text-astera-900 text-4xl md:text-5xl lg:text-6xl tracking-[0.05em] leading-tight">
                Definirano <br className="hidden md:block" /> Posebnošću
              </h3>
            </div>
            <Link href="/shop" className="group flex items-center gap-4 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-charcoal hover:text-astera-600 transition-colors">
              Sve Kolekcije
              <div className="w-8 md:w-12 h-[1px] bg-charcoal group-hover:w-24 group-hover:bg-astera-600 transition-all duration-700" />
            </Link>
         </ScrollReveal>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[300px] md:auto-rows-[350px]">
           {categories.map((cat, i) => (
             <ScrollReveal key={cat.name} delay={i * 150} className={`group ${cat.size || 'col-span-1'}`}>
               <Link href="/shop" className="block w-full h-full relative overflow-hidden rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-700 flex flex-col group">
                 <div className="flex-1 relative overflow-hidden" style={{ backgroundColor: cat.bg }}>
                   <Image 
                     src={cat.image} 
                     alt={cat.name} 
                     fill 
                     className="object-cover mix-blend-multiply transition-transform duration-[1500ms] group-hover:scale-110" 
                   />
                 </div>
                 <div className="bg-charcoal p-6 lg:p-8 flex items-center justify-between group-hover:bg-obsidian transition-colors duration-500 min-h-[90px]">
                    <h4 className="font-sans text-[11px] md:text-[13px] font-bold tracking-[0.2em] uppercase text-white">
                      {cat.name}
                    </h4>
                    <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                      &rarr;
                    </span>
                 </div>
               </Link>
             </ScrollReveal>
           ))}
         </div>
      </div>
    </section>
  );
}
