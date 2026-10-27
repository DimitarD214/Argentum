import React from "react";
import Link from "next/link";
import { Button } from "../ui/Button";
import ScrollReveal from "../ScrollReveal";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-end items-center overflow-hidden bg-obsidian pb-12 md:pb-16 lg:pb-20">
      {/* Full-Bleed Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover scale-[1.06] origin-center"
        >
          <source src="/hero-campaign.mp4" type="video/mp4" />
          Vaš preglednik ne podržava video element.
        </video>
        {/* Warm Autumn Luxury Overlays */}
        <div className="absolute inset-0 bg-astera-900/35 mix-blend-multiply z-0" />
        <div className="absolute inset-0 bg-black/25 z-0" />
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-obsidian/70 to-transparent z-0" />
        <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-obsidian via-astera-900/60 to-transparent z-0" />
      </div>

      {/* Immersive Editorial Copy */}
      <div className="relative z-10 w-full max-w-5xl px-6 text-center flex flex-col items-center">
        <ScrollReveal delay={50} duration={1000} direction="up">
          <p className="text-astera-200 font-serif italic text-sm sm:text-base md:text-lg tracking-[0.2em] mb-4 drop-shadow-md">
            Definiran posebnošću
          </p>
        </ScrollReveal>

        <ScrollReveal delay={150} duration={1200} direction="up">
          <h2 className="text-white font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.12] tracking-[0.2em] uppercase mb-8 drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)]">
            Definiran <br className="sm:hidden" /> Posebnošću
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={250} duration={1200} direction="up">
          <p className="text-astera-100/85 font-sans text-xs sm:text-sm max-w-xl mx-auto leading-relaxed tracking-wider mb-10">
            Spoj suvremene elegancije i stoljetnog hrvatskog zlatarskog nasljeđa u toplim tonovima plemenitog zlata, bisera i koralja.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={350} duration={1200} direction="up">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto">
            <Link href="/shop" className="w-full sm:w-auto">
              <Button
                variant="white"
                size="xl"
                className="w-full text-[10px] md:text-[11px] tracking-[0.3em] uppercase font-bold py-5 px-12 rounded-none transition-all duration-300 hover:bg-astera-900 hover:text-white"
              >
                Istražite Ponudu
              </Button>
            </Link>
            <Link href="/shop/zlatni-nakit" className="w-full sm:w-auto">
              <Button
                variant="glass"
                size="xl"
                className="w-full text-[10px] md:text-[11px] tracking-[0.3em] uppercase font-bold py-5 px-12 rounded-none text-white border-astera-300/40 hover:bg-astera-200 hover:text-astera-900 transition-all duration-300"
              >
                Zlatni Nakit
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}