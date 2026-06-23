import React from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "../ScrollReveal";
import { Button } from "../ui/Button";

const featured = [
  { name: "Smaragdni Leptir Prsten", price: "€1,200", tag: "Limitirano Izdanje", image: "/emerald-butterfly-ring.png" },
  { name: "Cvjetne Naušnice", price: "€850", tag: "Novo", image: "/floral-droplet-earrings.png" },
  { name: "Šumsko Zelenilo Ogrlica", price: "€2,100", tag: "Ekskluzivno", image: "/forest-greens-necklace.png" },
  { name: "Ružina Latica Narukvica", price: "€1,450", tag: "Ručni Rad", image: "/rose-petal-bracelet.png" },
];

export default function FeaturedProducts() {
  return (
    <section className="bg-warm-beige py-24 md:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <ScrollReveal className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8 md:gap-10">
           <div className="max-w-xl">
             <h3 className="font-serif tracking-widest uppercase leading-tight text-astera-900 text-3xl md:text-5xl lg:text-6xl mb-6 md:mb-8">
               Proljetni Favoriti
             </h3>
             <p className="font-sans text-[15px] md:text-[17px] text-gray-600 leading-relaxed max-w-md">
               Pažljivo odabrani komadi definirani profinjenom izradom i elegantnom estetikom, proizašli iz naše proljetne palete boja.
             </p>
           </div>
           <Link href="/shop" className="group flex items-center gap-4 md:gap-6 text-[11px] md:text-[12px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] text-astera-700 hover:text-astera-900 transition-all">
              <span>Kupi Sve</span>
              <div className="w-8 md:w-12 h-[1px] bg-astera-700 group-hover:w-16 md:group-hover:w-24 transition-all duration-700" />
           </Link>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-8">
          {featured.map((item, i) => (
            <ScrollReveal key={item.name} delay={i * 100} direction="up" className="bg-white rounded-3xl border border-black/5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
              <div className="relative aspect-square bg-gray-50 flex items-center justify-center overflow-hidden">
                {item.tag && (
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full font-sans text-[9px] font-bold tracking-[0.15em] uppercase shadow-sm bg-white/90 backdrop-blur-md border border-black/5 text-astera-900 absolute top-4 left-4 md:top-6 md:left-6 z-10">
                    {item.tag}
                  </span>
                )}
                <Link href="/shop" className="block w-full h-full group">
                  <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                </Link>
              </div>
              <div className="p-8 md:p-10 text-center flex flex-col items-center">
                <h4 className="font-serif text-[14px] md:text-[16px] text-charcoal mb-4 line-clamp-1 border-b border-transparent group-hover:border-astera-300 transition-colors">
                  {item.name}
                </h4>
                <p className="font-serif text-[18px] md:text-[22px] text-astera-900 italic tracking-wider mb-8 md:mb-10">
                  {item.price}
                </p>
                <Link href="/shop" className="w-full">
                  <Button variant="luxuryOutline" className="w-full rounded-full border-black/10 py-3 text-[10px] tracking-widest font-bold uppercase transition-all duration-300 hover:bg-black/5">
                    Pogledaj Detalje
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
