import React from "react";
import Link from "next/link";
import ScrollReveal from "../ScrollReveal";
import SparkleOverlay from "../SparkleOverlay";
import { Button } from "../ui/Button";

export default function CampaignBanner() {
  return (
    <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center bg-astera-900 overflow-hidden px-4">
       <div className="absolute inset-x-0 bottom-0 h-48 md:h-96 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
       <SparkleOverlay />
       <div className="container-luxury text-center relative z-10 py-12 md:py-24 max-w-4xl mx-auto">
          <ScrollReveal duration={1200}>
             <p className="subheading-luxury text-astera-400 mb-6 md:mb-10 opacity-90 tracking-[0.3em] md:tracking-[0.6em] font-bold">
               Serija Leptir
             </p>
             <h2 className="text-white font-serif text-4xl md:text-6xl lg:text-[7.5rem] leading-[1.1] md:leading-none tracking-[0.02em] md:tracking-[0.05em] uppercase mb-10 md:mb-16 drop-shadow-2xl">
                Rođeni da Sjaje
             </h2>
             <p className="text-astera-100/70 font-sans text-base md:text-xl max-w-2xl mx-auto leading-relaxed mb-12 md:mb-20 italic">
               "Slavlje transformacije, gdje se osjetljivi rad u metalu spaja s eteričnim sjajem smaragdnih krila."
             </p>
             <Link href="/shop">
               <Button variant="white" size="pillLg" className="hover:scale-105 shadow-3xl">
                 Kupi Seriju
               </Button>
             </Link>
          </ScrollReveal>
       </div>
    </section>
  );
}
