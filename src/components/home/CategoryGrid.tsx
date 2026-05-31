import React from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "../ScrollReveal";

const categories = [
  { name: "Bezvremenske Ogrlice", bg: "var(--color-seafoam)", image: "/forest-greens-necklace.png" },
  { name: "Umjetničko Prstenje", bg: "var(--color-luxury-beige)", image: "/emerald-butterfly-ring.png" },
  { name: "Kolekcija Naušnica", bg: "var(--color-aqua)", image: "/floral-droplet-earrings.png" },
  { name: "Remek-djela Narukvica", bg: "var(--color-mint)", image: "/rose-petal-bracelet.png" },
];

export default function CategoryGrid() {
  return (
    <section id="discover" className="section-luxury bg-white py-24 md:py-32 px-4">
      <div className="container-luxury">
         <ScrollReveal className="text-center mb-16 md:mb-32">
            <h3 className="heading-luxury text-3xl md:text-5xl lg:text-6xl mb-4 md:mb-6 tracking-[0.1em] md:tracking-[0.3em]">
              Kolekcije
            </h3>
            <p className="subheading-luxury tracking-[0.2em] md:tracking-[0.4em] font-bold text-xs md:text-sm">
              Definirano Posebnošću
            </p>
         </ScrollReveal>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16 lg:gap-12">
           {categories.map((cat, i) => (
             <ScrollReveal key={cat.name} delay={i * 150} className="group">
               <Link href="/shop" className="block outline-none">
                 <div 
                   className="aspect-[3/4] sm:aspect-square lg:aspect-[3/4] rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-cover bg-center border border-black/5 shadow-sm transition-all duration-1000 group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] group-hover:scale-[1.03]"
                   style={{ backgroundColor: cat.bg }}
                 >
                    <div className="relative w-full h-full">
                      <Image 
                        src={cat.image} 
                        alt={cat.name} 
                        fill 
                        className="object-cover mix-blend-multiply opacity-90 transition-transform duration-1000 group-hover:scale-110" 
                      />
                    </div>
                 </div>
                 <div className="mt-8 md:mt-12 text-center px-4">
                    <h4 className="font-sans text-[11px] md:text-[12px] font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase text-black mb-2 group-hover:text-astera-600 transition-colors">
                      {cat.name}
                    </h4>
                    <div className="h-[1.5px] w-0 bg-astera-600 mx-auto transition-all duration-700 group-hover:w-20" />
                 </div>
               </Link>
             </ScrollReveal>
           ))}
         </div>
      </div>
    </section>
  );
}
