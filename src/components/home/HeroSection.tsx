import React from "react";
import Link from "next/link";
import { Button } from "../ui/Button";
import ScrollReveal from "../ScrollReveal";
import SparkleOverlay from "../SparkleOverlay";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[100dvh] overflow-hidden flex items-end justify-start">
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover z-0 scale-[1.05]" 
        src="/hero-campaign.mp4" 
      />
      <div className="absolute inset-0 bg-black/35 z-[1]" />
      <SparkleOverlay />
      <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/20 to-transparent z-[2]" />

      <div className="container-luxury !mx-0 !ml-0 relative z-10 pb-24 md:pb-32 lg:pb-40 px-6 md:px-20 lg:pl-32 xl:pl-48 text-left w-full max-w-none">
        <div className="max-w-4xl transform transition-all duration-1000 animate-in fade-in slide-in-from-bottom-10">
           <ScrollReveal duration={1200} direction="up">
              <p className="subheading-luxury text-astera-300 mb-6 md:mb-10 opacity-90 drop-shadow-lg tracking-[0.3em] md:tracking-[0.5em] text-xs md:text-sm font-bold uppercase">
                Kolekcija Proljeće 2026
              </p>
           </ScrollReveal>
           <ScrollReveal delay={200} duration={1200} direction="up">
              <h2 className="text-white font-serif text-5xl md:text-7xl lg:text-[8.5rem] leading-[1] md:leading-[0.9] tracking-[0.02em] md:tracking-[0.05em] uppercase mb-10 md:mb-16 drop-shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                Majstori <br/> Vječnosti
              </h2>
           </ScrollReveal>
           <ScrollReveal delay={400} duration={1200} direction="up">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-start justify-start gap-4 sm:gap-6 md:gap-10 mt-8 md:mt-16">
                <Link href="/shop">
                  <Button variant="white" size="xl" className="w-full sm:w-auto text-xs md:text-sm tracking-[0.2em] md:tracking-[0.4em]">
                    Istražite Trgovinu
                  </Button>
                </Link>
                <Link href="#discover">
                  <Button variant="glass" size="xl" className="w-full sm:w-auto text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em]">
                    Naša Baština
                  </Button>
                </Link>
              </div>
           </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
