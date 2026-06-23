import React from "react";
import Link from "next/link";
import ScrollReveal from "../ScrollReveal";
import BotanicalDivider from "../BotanicalDivider";

export default function BrandStory() {
  return (
    <section id="story" className="bg-warm-beige py-24 md:py-32 lg:py-40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">
        <div className="w-full lg:w-1/2">
          <ScrollReveal className="flex flex-col items-start">
            <BotanicalDivider className="mb-10 opacity-40 origin-left scale-75" />
            <p className="font-sans text-xs uppercase tracking-[0.2em] font-semibold mb-6 text-astera-600">Osnovano 2024.</p>
            <h3 className="font-serif uppercase tracking-wider leading-tight text-4xl md:text-5xl lg:text-6xl mb-10 text-charcoal">
              Tkanje Svjetlosti <br /> u Bezvremensku <br /> Eleganciju
            </h3>
            <p className="font-sans text-[15px] md:text-[17px] text-gray-600 leading-relaxed max-w-md mb-12">
              Svaki komad Astera nakita svjedočanstvo je majstorstvu svjetlosti. Iz našeg studija u Europi, 
              redefiniramo luksuz kroz simbiozu plemenitih metala i smaragda, stvoreno za one koji žive u izvanrednom. 
              Koristimo isključivo etički dobivene materijale.
            </p>
            <Link href="/shop" className="group flex items-center gap-6">
               <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-charcoal group-hover:text-astera-600 transition-colors">
                 Naša Priča
               </span>
               <div className="w-16 h-[1px] bg-charcoal group-hover:bg-astera-600 group-hover:w-24 transition-all duration-700" />
            </Link>
          </ScrollReveal>
        </div>
        <div className="w-full lg:w-1/2 aspect-[4/5] sm:aspect-square lg:aspect-[4/5] max-w-lg mx-auto relative">
           <ScrollReveal delay={200} className="w-full h-full relative flex items-center justify-center">
             <div className="absolute inset-0 bg-charcoal rounded-t-[10rem] rounded-b-xl shadow-2xl transform rotate-2 transition-transform duration-1000 group-hover:rotate-1" />
             <div className="absolute inset-4 bg-astera-100 rounded-t-[10rem] rounded-b-xl overflow-hidden shadow-inner flex items-center justify-center text-astera-900 font-serif text-[12rem] lg:text-[16rem] opacity-20">
               A
             </div>
             <div className="absolute -bottom-6 sm:bottom-8 -right-4 sm:right-4 bg-white p-6 md:p-8 rounded-2xl shadow-xl w-[85%] sm:w-[75%] max-w-sm transform hover:-translate-y-2 transition-transform duration-500">
               <p className="font-sans text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-gray-400 mb-2">Vizija</p>
               <p className="font-serif text-base md:text-lg leading-snug italic text-charcoal">&quot;Ljepota koja nadilazi prolaznost vremena.&quot;</p>
             </div>
           </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
