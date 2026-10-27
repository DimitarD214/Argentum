import React from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "../ScrollReveal";
import BotanicalDivider from "../BotanicalDivider";

export default function BrandStory() {
  return (
    <section id="story" className="bg-warm-beige py-24 md:py-32 lg:py-36 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">
        <div className="w-full lg:w-1/2">
          <ScrollReveal className="flex flex-col items-start">
            <BotanicalDivider className="mb-8 opacity-60 origin-left scale-75" />
            <p className="font-sans text-xs uppercase tracking-[0.28em] font-bold mb-5 text-astera-600">
              Zlatarsko Umijeće • Astera
            </p>
            <h3 className="font-serif uppercase tracking-wider leading-tight text-2xl md:text-3xl lg:text-4xl mb-8 text-astera-900">
              Tkanje Zlata <br /> u Bezvremensku <br /> Eleganciju
            </h3>
            <p className="font-sans text-xs md:text-sm text-charcoal/75 leading-relaxed max-w-lg mb-10">
              Svaki komad Astera nakita svjedočanstvo je majstorstvu ručne izrade. Spajamo hrvatsku tradicijsku baštinu — od šibenskih botuna i splitskih košarica do paških peružina — sa suvremenim luksuzom plemenitog zlata, prirodnih bisera i jadranskog koralja.
            </p>
            <Link href="/shop/tradicijski-nakit" className="group flex items-center gap-6">
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-astera-900 group-hover:text-astera-600 transition-colors">
                Istražite Baštinu
              </span>
              <div className="w-16 h-[1px] bg-astera-900 group-hover:bg-astera-600 group-hover:w-24 transition-all duration-700" />
            </Link>
          </ScrollReveal>
        </div>

        <div className="w-full lg:w-1/2 aspect-[4/5] sm:aspect-square lg:aspect-[4/5] max-w-lg mx-auto relative">
          <ScrollReveal delay={200} className="w-full h-full relative flex items-center justify-center">
            <div className="absolute inset-0 bg-astera-900 rounded-t-[10rem] rounded-b-2xl shadow-2xl transform rotate-2" />
            <div className="absolute inset-3 bg-astera-100 rounded-t-[9.5rem] rounded-b-xl overflow-hidden shadow-inner">
              <Image
                src="/jewelry/filigranske-recine-masna.jpg"
                alt="Astera Ručna Izrada"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-astera-900/60 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 sm:bottom-8 -right-4 sm:right-4 bg-cream border border-astera-200 p-6 md:p-8 rounded-2xl shadow-xl w-[85%] sm:w-[75%] max-w-sm z-10">
              <p className="font-sans text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-astera-600 font-bold mb-2">
                Definiran posebnošću
              </p>
              <p className="font-serif text-base md:text-lg leading-snug italic text-astera-900">
                &ldquo;Ljepota ručnog rada koja nadilazi prolaznost vremena.&rdquo;
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
