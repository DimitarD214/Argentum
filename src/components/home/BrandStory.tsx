import React from "react";
import Link from "next/link";
import ScrollReveal from "../ScrollReveal";
import BotanicalDivider from "../BotanicalDivider";

export default function BrandStory() {
  return (
    <section id="story" className="section-luxury bg-luxury-beige py-24 md:py-32 lg:py-48 px-4">
      <div className="container-luxury text-center max-w-5xl mx-auto">
        <ScrollReveal className="flex flex-col items-center">
          <BotanicalDivider className="mb-12 md:mb-20 opacity-30" />
          <p className="subheading-luxury mb-8 md:mb-12 text-astera-300 font-bold tracking-[0.2em]">Osnovano 2024.</p>
          <h3 className="heading-luxury text-3xl md:text-5xl lg:text-7xl mb-10 md:mb-16 leading-[1.2] md:leading-[1.1] tracking-[0.1em] md:tracking-[0.2em]">
            Tkanje Svjetlosti u <br className="hidden md:block" /> Bezvremensku Eleganciju
          </h3>
          <p className="font-sans text-[16px] md:text-[20px] lg:text-[22px] text-gray-500 leading-relaxed max-w-3xl mx-auto mb-12 md:mb-16 italic font-medium opacity-80 px-4">
            Svaki komad Astera nakita svjedočanstvo je majstorstvu svjetlosti. Iz našeg studija u Europi, 
            redefiniramo luksuz kroz simbiozu plemenitih metala i smaragda, stvoreno za one koji žive u izvanrednom.
          </p>
          <Link href="/shop" className="group flex flex-col items-center gap-4">
             <span className="text-[10px] md:text-[12px] font-bold uppercase tracking-[0.3em] md:tracking-[0.5em] text-black">
               Doživite Umjetnost Izrade
             </span>
             <div className="w-[1px] h-16 md:h-20 bg-astera-100 group-hover:h-24 md:group-hover:h-32 group-hover:bg-astera-600 transition-all duration-1000" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
