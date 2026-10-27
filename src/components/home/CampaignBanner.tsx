import React from "react";
import Link from "next/link";
import ScrollReveal from "../ScrollReveal";
import SparkleOverlay from "../SparkleOverlay";
import { Button } from "../ui/Button";

export default function CampaignBanner() {
  return (
    <section className="relative h-[55vh] md:h-[70vh] flex items-center justify-center bg-astera-900 overflow-hidden px-4 border-y border-astera-800">
      <div className="absolute inset-x-0 bottom-0 h-48 md:h-80 bg-gradient-to-t from-obsidian/60 to-transparent pointer-events-none" />
      <SparkleOverlay />
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10 py-16 lg:py-20">
        <ScrollReveal duration={1200}>
          <p className="font-sans uppercase text-astera-300 mb-6 tracking-[0.3em] text-xs font-bold">
            Astera • Definiran posebnošću
          </p>
          <h2 className="text-white font-serif text-2xl md:text-4xl lg:text-5xl leading-tight tracking-[0.06em] uppercase mb-8 drop-shadow-2xl">
            Rođena da Sjaji
          </h2>
          <p className="text-astera-100/80 font-sans text-xs md:text-sm max-w-xl mx-auto leading-relaxed mb-12 italic">
            &ldquo;Spoj plemenitog 14-karatnog zlata, filigranske preciznosti i bezvremenskog hrvatskog nasljeđa.&rdquo;
          </p>
          <Link href="/shop/astera-nakit">
            <Button variant="white" size="pillLg" className="hover:scale-105 shadow-2xl">
              Istražite Ponudu
            </Button>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}