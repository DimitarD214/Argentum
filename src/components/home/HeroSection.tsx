import React from "react";
import Link from "next/link";
import { Button } from "../ui/Button";
import ScrollReveal from "../ScrollReveal";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex flex-col lg:flex-row overflow-hidden bg-obsidian pt-24 lg:pt-0">
      <div className="w-full lg:w-[30%] flex flex-col justify-center items-start px-6 md:px-16 lg:pl-12 lg:pr-6 xl:pl-20 xl:pr-10 py-24 lg:py-0 z-10 lg:min-h-screen">
        <div className="max-w-2xl transform transition-all duration-1000 animate-in fade-in slide-in-from-bottom-10 w-full">
           <ScrollReveal delay={100} duration={1200} direction="up">
              <h2 className="text-white font-serif text-5xl md:text-7xl lg:text-5xl xl:text-6xl 2xl:text-[5.5rem] leading-[1.1] tracking-wider uppercase mb-10 md:mb-12 drop-shadow-lg">
                Majstori <br/> Vječnosti
              </h2>
           </ScrollReveal>
           <ScrollReveal delay={300} duration={1200} direction="up">
              <p className="text-gray-300 font-sans text-base md:text-lg leading-relaxed mb-12 max-w-lg">
                Otkrijte dizajn gdje se besprijekorna preciznost susreće sa sirovom ljepotom prirode. Svaki komad je ručno izrađen bezvremenski klasik.
              </p>
              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center lg:items-stretch xl:items-center justify-start gap-4 sm:gap-6 mt-8">
                <Link href="/shop" className="w-full sm:w-auto">
                  <Button variant="white" size="xl" className="w-full text-[11px] md:text-[12px] tracking-[0.25em] uppercase font-bold py-5 px-10 rounded-sm">
                    Istražite Trgovinu
                  </Button>
                </Link>
                <Link href="#discover" className="w-full sm:w-auto">
                  <Button variant="outline" size="xl" className="w-full text-[11px] md:text-[12px] tracking-[0.25em] uppercase font-bold py-5 px-10 rounded-sm border-white/20 text-white hover:bg-white hover:text-black transition-all">
                    Naša Baština
                  </Button>
                </Link>
              </div>
           </ScrollReveal>
        </div>
      </div>
      <div className="w-full lg:w-[70%] relative min-h-[60vh] lg:min-h-screen">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover" 
          src="/hero-campaign.mp4" 
        />
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-obsidian to-transparent hidden lg:block" />
        <div className="absolute inset-x-0 top-0 h-16 md:h-32 bg-gradient-to-b from-obsidian to-transparent block lg:hidden" />
      </div>
    </section>
  );
}
