import React from "react";
import ScrollReveal from "../ScrollReveal";

const services = [
  { title: "Autentična Remek-djela", text: "Svaka kreacija je pojedinačno certificirana i ručno rađena od strane naših majstora.", action: "Razgovor sa Savjetnikom", icon: "💎" },
  { title: "Usluga po Mjeri", text: "Od određivanja veličine do prilagođenih gravura, naši kustosi osiguravaju da je vaš komad jedinstveno vaš.", action: "Saznajte Više", icon: "✨" },
  { title: "Stručnost u Darivanju", text: "Ekskluzivno pakiranje i personalizirane kartice za najdragocjenije životne prekretnice.", action: "Vodič za Poklone", icon: "🎁" }
];

export default function Services() {
  return (
    <section className="section-luxury bg-white border-t border-black/5 py-24 md:py-32 lg:py-48 px-4">
      <div className="container-luxury">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24 lg:gap-40 text-center">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 150} direction="up" className="flex flex-col items-center group">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-[2rem] md:rounded-[2.5rem] bg-luxury-beige flex items-center justify-center text-3xl md:text-4xl mb-8 md:mb-12 transition-all duration-1000 group-hover:scale-110 group-hover:rotate-6 shadow-sm border border-black/5">
                {service.icon}
              </div>
              <h4 className="heading-luxury text-xl md:text-2xl mb-6 md:mb-8 tracking-[0.1em] md:tracking-[0.15em]">
                {service.title}
              </h4>
              <p className="text-gray-500 font-sans text-[14px] md:text-[16px] leading-relaxed mb-8 md:mb-12 italic font-medium opacity-80 px-2 md:px-0">
                {service.text}
              </p>
              <button className="text-[10px] md:text-[12px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] text-black border-b border-black/20 pb-2 hover:border-black hover:tracking-[0.4em] md:hover:tracking-[0.5em] transition-all duration-700">
                 {service.action}
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
