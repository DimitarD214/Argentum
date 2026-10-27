import React from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "../ScrollReveal";

const goldHighlights = [
  {
    id: "splitske-kosarice",
    name: "Splitske Zlatne Košarice",
    subtitle: "14k Zlato • Filigran",
    price: "520,00 €",
    image: "/jewelry/splitske-kosarice-1.jpg",
  },
  {
    id: "zlatni-prsten-kameja",
    name: "Zlatni Prsten Kameja",
    subtitle: "14k Zlato • Ručna Rezba",
    price: "440,00 €",
    image: "/jewelry/zlatni-prsten-kameja.jpg",
  },
  {
    id: "zlatna-narukvica-botuni",
    name: "Zlatna Narukvica Šibenski Botun",
    subtitle: "14k Zlato • Baština",
    price: "590,00 €",
    image: "/jewelry/zlatna-narukvica-botuni.jpg",
  },
];

export default function GoldJewelrySection() {
  return (
    <section className="bg-astera-900 text-white py-24 md:py-32 lg:py-36 relative overflow-hidden">
      {/* Warm Golden Ambient Glow */}
      <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-astera-500/20 blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[480px] h-[480px] rounded-full bg-astera-600/20 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Editorial Feature */}
          <div className="lg:col-span-5">
            <ScrollReveal>
              <span className="inline-block px-4 py-1.5 rounded-full border border-astera-300/40 bg-astera-800/80 text-astera-200 text-[10px] font-sans font-bold uppercase tracking-[0.35em] mb-6">
                14-Karatno Zlato • Zlatno Nasljeđe
              </span>
              <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl uppercase tracking-wider leading-tight text-white mb-6">
                Zlatni nakit
              </h2>
              <p className="font-serif italic text-sm md:text-base text-astera-200 mb-6">
                &ldquo;Toplina čistog zlata utkana u motive koji traju generacijama.&rdquo;
              </p>
              <p className="font-sans text-xs md:text-sm text-astera-100/75 leading-relaxed mb-10">
                Od raskošnih splitskih košarica i paških peružina do suvremenog Astera nakita, svaki komad našeg zlatnog nakita ručno je oblikovan u 14-karatnom zlatu vrhunske čistoće.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/shop/zlatni-nakit"
                  className="inline-flex items-center justify-center gap-4 px-9 py-4 bg-astera-200 text-astera-900 hover:bg-white font-sans text-[11px] font-bold uppercase tracking-[0.28em] transition-all duration-300 shadow-lg"
                >
                  <span>Istražite Zlatni Nakit</span>
                  <span>&rarr;</span>
                </Link>
                <Link
                  href="/shop/tradicijski-nakit"
                  className="inline-flex items-center justify-center px-8 py-4 border border-astera-300/40 text-astera-100 hover:bg-astera-800 font-sans text-[11px] font-bold uppercase tracking-[0.25em] transition-all duration-300"
                >
                  Tradicijsko Zlato
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Curated Gold Showcase Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {goldHighlights.map((item, idx) => (
                <ScrollReveal key={item.id} delay={idx * 120} direction="up">
                  <Link
                    href={`/shop/${item.id}`}
                    className="group block bg-astera-800/60 border border-astera-300/25 rounded-2xl overflow-hidden hover:border-astera-300/70 transition-all duration-500 shadow-xl"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-astera-900">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover transition-transform duration-1000 group-hover:scale-108"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-astera-900/80 via-transparent to-transparent" />
                    </div>
                    <div className="p-5">
                      <p className="text-[9px] font-sans uppercase tracking-[0.25em] text-astera-300 mb-1">
                        {item.subtitle}
                      </p>
                      <h3 className="font-serif text-base text-white group-hover:text-astera-200 transition-colors line-clamp-1 mb-2">
                        {item.name}
                      </h3>
                      <div className="flex items-center justify-between pt-2 border-t border-white/10">
                        <span className="font-serif italic text-astera-200 text-base">
                          {item.price}
                        </span>
                        <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-astera-300 group-hover:translate-x-1 transition-transform">
                          Pogledaj &rarr;
                        </span>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}