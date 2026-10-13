import React from "react";
import Link from "next/link";
import { Button } from "../ui/Button";
import ScrollReveal from "../ScrollReveal";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-end items-center overflow-hidden bg-obsidian pb-6 md:pb-10 lg:pb-12">
      {/* Full-Bleed Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover scale-[1.08] origin-center"
        >
          <source src="/hero-campaign.mp4" type="video/mp4" />
          Vaš preglednik ne podržava video element.
        </video>
        {/* Cinematic gradients & overlay for high-contrast luxury readability */}
        <div className="absolute inset-0 bg-black/30 z-0" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/60 to-transparent z-0" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-obsidian via-obsidian/45 to-transparent z-0" />
      </div>

      {/* Immersive Lowered Content */}
      <div className="relative z-10 w-full max-w-4xl px-6 text-center flex flex-col items-center">
        <ScrollReveal delay={100} duration={1200} direction="up">
          <h2 className="text-white font-serif text-4xl sm:text-5xl md:text-7xl lg:text-[5rem] xl:text-[5.5rem] leading-[1.15] tracking-[0.25em] uppercase mb-6 drop-shadow-[0_4px_20px_rgba(0,0,0,0.65)]">
            Majstori <br className="sm:hidden" /> Vječnosti
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={300} duration={1200} direction="up">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto">
            <Link href="/shop" className="w-full sm:w-auto">
              <Button 
                variant="white" 
                size="xl" 
                className="w-full text-[10px] md:text-[11px] tracking-[0.3em] uppercase font-bold py-5 px-12 rounded-none transition-all duration-300 hover:bg-transparent hover:text-white hover:ring-1 hover:ring-white"
              >
                Istražite Trgovinu
              </Button>
            </Link>
            <Link href="#discover" className="w-full sm:w-auto">
              <Button 
                variant="glass" 
                size="xl" 
                className="w-full text-[10px] md:text-[11px] tracking-[0.3em] uppercase font-bold py-5 px-12 rounded-none text-white border-white/20 hover:bg-white hover:text-astera-900 transition-all duration-300"
              >
                Naša Baština
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
