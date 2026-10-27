import React from "react";
import Link from "next/link";
import ScrollReveal from "../ScrollReveal";

const WHATSAPP_URL =
  "https://wa.me/385955791294?text=Pozdrav,%20imam%20upit%20vezan%20za%20nakit%20Astera";

const services = [
  {
    title: "Ručna Izrada",
    text: "Svaka kreacija je pojedinačno certificirana i ručno kovana u našem zlatarskom ateljeu.",
    action: "Istražite Tradiciju",
    href: "/shop/tradicijski-nakit",
    external: false,
  },
  {
    title: "Osobno Savjetovanje",
    text: "Od odabira savršenog nakita do prilagođenih dimenzija, obratite nam se izravno putem WhatsAppa.",
    action: "Pošaljite Upit",
    href: WHATSAPP_URL,
    external: true,
  },
  {
    title: "Besplatna Dostava",
    text: "Luksuzno poklon pakiranje i besplatna osigurana dostava za svaku narudžbu.",
    action: "Pogledaj Ponudu",
    href: "/shop",
    external: false,
  },
];

export default function Services() {
  return (
    <section className="bg-cream border-t border-astera-200/60 py-24 lg:py-32 px-4">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-16 lg:gap-24 text-center">
          {services.map((service, i) => (
            <ScrollReveal
              key={service.title}
              delay={i * 150}
              direction="up"
              className="flex flex-col items-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-warm-beige flex items-center justify-center text-astera-700 mb-8 transition-all duration-700 group-hover:scale-105 shadow-xs border border-astera-200">
                <span className="font-serif text-xl">✦</span>
              </div>
              <h4 className="font-serif uppercase text-astera-900 text-xl md:text-2xl mb-4 tracking-[0.15em]">
                {service.title}
              </h4>
              <p className="text-charcoal/70 font-sans text-sm md:text-[15px] leading-relaxed mb-8 italic max-w-xs">
                {service.text}
              </p>
              {service.external ? (
                <a
                  href={service.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-bold uppercase tracking-[0.2em] text-astera-900 border-b border-astera-400 pb-1.5 hover:border-astera-900 transition-all"
                >
                  {service.action}
                </a>
              ) : (
                <Link
                  href={service.href}
                  className="text-[11px] font-bold uppercase tracking-[0.2em] text-astera-900 border-b border-astera-400 pb-1.5 hover:border-astera-900 transition-all"
                >
                  {service.action}
                </Link>
              )}
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}