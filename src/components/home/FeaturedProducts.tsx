import React from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "../ScrollReveal";
import { Button } from "../ui/Button";

const featured = [
  { name: "Smaragdni Leptir Prsten", price: ",200", tag: "Limitirano Izdanje", image: "/emerald-butterfly-ring.png" },
  { name: "Cvjetne Naušnice", price: "", tag: "Novo", image: "/floral-droplet-earrings.png" },
  { name: "Šumsko Zelenilo Ogrlica", price: ",100", tag: "Ekskluzivno", image: "/forest-greens-necklace.png" },
  { name: "Ružina Latica Narukvica", price: ",450", tag: "Ručni Rad", image: "/rose-petal-bracelet.png" },
];

export default function FeaturedProducts() {
  return (
    <section className="section-luxury bg-warm-beige py-24 md:py-32 lg:py-48 px-4">
      <div className="container-luxury">
        <ScrollReveal className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-32 gap-6 md:gap-10">
           <div className="max-w-xl">
             <h3 className="heading-luxury text-3xl md:text-5xl lg:text-6xl mb-4 md:mb-8 tracking-[0.1em] md:tracking-[0.2em]">
               Proljetni Favoriti
             </h3>
             <p className="font-sans text-[14px] md:text-[16px] text-gray-500 tracking-wide leading-relaxed">
               Pažljivo odabrani komadi definirani profinjenom izradom i elegantnom estetikom, proizašli iz naše proljetne palete boja.
             </p>
           </div>
           <Link href="/shop" className="group flex items-center gap-4 md:gap-6 text-[11px] md:text-[13px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] text-astera-700 hover:text-astera-900 transition-all">
              <span>Kupi Sve</span>
              <div className="w-8 md:w-12 h-[1px] bg-astera-700 group-hover:w-16 md:group-hover:w-24 transition-all duration-700" />
           </Link>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-10">
          {featured.map((item, i) => (
            <ScrollReveal key={item.name} delay={i * 100} direction="up" className="card-luxury hover:-translate-y-2 duration-1000">
              <div className="relative aspect-square bg-white flex items-center justify-center overflow-hidden">
                {item.tag && (
                  <span className="pill-luxury absolute top-4 left-4 md:top-8 md:left-8 z-10 text-astera-900 !bg-white/80 !backdrop-blur-xl">
                    {item.tag}
                  </span>
                )}
                <Link href="/shop" className="block w-full h-full group">
                  <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                </Link>
              </div>
              <div className="p-8 md:p-12 text-center flex flex-col items-center">
                <h4 className="heading-luxury text-[13px] md:text-[15px] mb-3 md:mb-4 line-clamp-1 border-b border-transparent group-hover:border-astera-300">
                  {item.name}
                </h4>
                <p className="font-serif text-[18px] md:text-[22px] text-astera-900 italic tracking-wider mb-8 md:mb-10">
                  {item.price}
                </p>
                <Link href="/shop">
                  <Button variant="luxuryOutline" className="w-full rounded-2xl">
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
