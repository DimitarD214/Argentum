import React from "react";
import ScrollReveal from "../ScrollReveal";

const testimonials = [
  { quote: "Najljepši komad nakita koji posjedujem. Izrada je besprijekorna, a smaragd hvata svjetlost kao ništa drugo.", author: "Elena V.", role: "Kolekcionar" },
  { quote: "Astera je redefinirala moje shvaćanje modernog luksuza. Njihova posvećenost detaljima je jednostavno nevjerojatna.", author: "Sofija M.", role: "Modni Urednik" },
  { quote: "Iskustvo kupovine po mjeri bilo je nevjerojatno. Pretvorili su moju viziju u vječnost.", author: "Luka K.", role: "Privatni Klijent" }
];

export default function Testimonials() {
  return (
    <section className="bg-warm-beige border-t border-black/5 py-32 lg:py-40 px-4">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <ScrollReveal className="text-center mb-16 md:mb-24">
           <h3 className="font-serif tracking-widest uppercase leading-tight text-astera-900 text-3xl md:text-5xl lg:text-6xl mb-4 md:mb-6 tracking-[0.1em] md:tracking-[0.2em]">
             Glasovi Izvanrednih
           </h3>
           <p className="subfont-serif tracking-widest uppercase leading-tight text-astera-900 tracking-[0.2em] md:tracking-[0.4em] font-bold text-xs md:text-sm">
             Riječi Naših Klijenata
           </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">
          {testimonials.map((item, i) => (
            <ScrollReveal key={i} delay={i * 200} direction="up" className="flex flex-col items-center text-center p-10 md:p-12 rounded-3xl bg-white shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-black/5">
              <div className="text-astera-300 text-4xl mb-6 font-serif">"</div>
              <p className="font-sans text-[15px] md:text-[16px] lg:text-[18px] text-gray-600 leading-relaxed italic mb-8 flex-grow">
                {item.quote}
              </p>
              <div>
                <h4 className="font-bold text-[12px] md:text-[13px] tracking-[0.2em] uppercase text-black mb-1">{item.author}</h4>
                <p className="text-astera-600 text-[11px] md:text-[12px] uppercase tracking-[0.1em]">{item.role}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
