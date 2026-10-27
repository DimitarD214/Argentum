"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "../ScrollReveal";

const asteraSubcategories = [
  {
    label: "Ogrlice",
    subtitle: "Filigranske i suvremene ogrlice",
    href: "/shop/astera-nakit/ogrlice",
    featured: true,
  },
  {
    label: "Naušnice",
    subtitle: "Biseri, safiri i plemenito zlato",
    href: "/shop/astera-nakit/nausnice",
  },
  {
    label: "Prstenje",
    subtitle: "Unikatno prstenje vrhunske izrade",
    href: "/shop/astera-nakit/prstenje",
  },
  {
    label: "Narukvice",
    subtitle: "Suvremeni sjaj i elegancija",
    href: "/shop/astera-nakit/narukvice",
  },
  {
    label: "Cijeli Astera katalog",
    subtitle: "Istražite sve komade iz Astera linije",
    href: "/shop/astera-nakit",
  },
];

const tradicijskiSubcategories = [
  {
    label: "Prstenje",
    subtitle: "Ručno rezbarene kameje i 14k zlato",
    href: "/shop/tradicijski-nakit/prstenje",
    featured: true,
  },
  {
    label: "Naušnice",
    subtitle: "Splitske košarice, peružine i konavoske verižice",
    href: "/shop/tradicijski-nakit/nausnice",
  },
  {
    label: "Narukvice",
    subtitle: "Šibenski botuni u zlatu i srebru",
    href: "/shop/tradicijski-nakit/narukvice",
  },
  {
    label: "Ogrlice",
    subtitle: "Tradicijske filigranske ogrlice",
    href: "/shop/tradicijski-nakit/ogrlice",
  },
  {
    label: "Sav tradicijski nakit",
    subtitle: "Cjelokupna riznica hrvatske baštine",
    href: "/shop/tradicijski-nakit",
  },
];

export default function CategoryGrid() {
  const [activeSide, setActiveSide] = useState<"astera" | "tradicijski" | null>(null);

  return (
    <section id="discover" className="bg-cream py-24 lg:py-32 px-4">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <ScrollReveal className="text-left mb-14 md:mb-18 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <p className="font-sans tracking-[0.35em] uppercase font-bold text-xs text-astera-600 mb-4">
              Astera Svijet Nakita
            </p>
            <h3 className="font-serif uppercase text-astera-900 text-2xl md:text-3xl lg:text-4xl tracking-[0.06em] leading-tight">
              Odaberite <br className="hidden md:block" /> Kolekciju
            </h3>
          </div>
          <Link
            href="/shop"
            className="group flex items-center gap-4 text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase text-astera-900 hover:text-astera-600 transition-colors"
          >
            Cijela Ponuda
            <div className="w-8 md:w-12 h-[1px] bg-astera-900 group-hover:w-20 group-hover:bg-astera-600 transition-all duration-700" />
          </Link>
        </ScrollReveal>

        {/* Interactive 2-Picture Selection Grid: ONLY pictures initially; hovering/clicking one reveals its subcategories in the place of the other */}
        <div
          onMouseLeave={() => setActiveSide(null)}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 min-h-[480px] md:min-h-[540px] items-stretch"
        >
          {/* ================= LEFT HALF: ASTERA NAKIT (OR TRADICIJSKI SUBCATEGORIES) ================= */}
          <div className="lg:col-span-6 relative min-h-[440px] md:min-h-[540px]">
            <AnimatePresence mode="wait">
              {activeSide !== "tradicijski" ? (
                <motion.div
                  key="home-astera-picture"
                  initial={{ opacity: 0, scale: 0.99 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  onMouseEnter={() => {
                    if (activeSide === null) setActiveSide("astera");
                  }}
                  onClick={() =>
                    setActiveSide(activeSide === "astera" ? null : "astera")
                  }
                  className={`relative w-full h-full min-h-[440px] md:min-h-[540px] rounded-3xl overflow-hidden cursor-pointer group border transition-all duration-500 ${
                    activeSide === "astera"
                      ? "border-astera-600 shadow-2xl ring-2 ring-astera-400/40"
                      : "border-astera-200/80 shadow-md hover:shadow-2xl"
                  }`}
                >
                  <Image
                    src="/images/astera-showcase.jpg"
                    alt="Astera Nakit"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[1500ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-astera-900/90 via-astera-900/20 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-8 md:p-10 flex items-end justify-between">
                    <div>
                      <p className="text-[10px] font-sans uppercase tracking-[0.35em] text-astera-200 font-bold mb-2">
                        Rođena da sjaji
                      </p>
                      <h4 className="font-serif text-2xl md:text-3xl tracking-wider uppercase text-white">
                        Astera Nakit
                      </h4>
                    </div>
                    <span
                      className={`px-5 py-2.5 rounded-full text-[10px] font-sans font-bold uppercase tracking-[0.2em] transition-all duration-300 shrink-0 ${
                        activeSide === "astera"
                          ? "bg-white text-astera-900"
                          : "bg-white/20 backdrop-blur-md text-white border border-white/30 group-hover:bg-white group-hover:text-astera-900"
                      }`}
                    >
                      {activeSide === "astera" ? "Kategorije →" : "Odaberi"}
                    </span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="home-tradicijski-subcategories"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full min-h-[440px] md:min-h-[540px] rounded-3xl bg-warm-beige border border-astera-300/80 p-8 md:p-10 flex flex-col justify-between shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-astera-200 pb-5 mb-6">
                      <div>
                        <p className="text-[10px] font-sans font-bold uppercase tracking-[0.35em] text-astera-600 mb-1">
                          Zlatno Nasljeđe Hrvatske
                        </p>
                        <h4 className="font-serif text-xl md:text-2xl text-astera-900 uppercase tracking-wider">
                          Tradicijski Nakit
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveSide(null)}
                        className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-astera-700 hover:text-astera-900 px-4 py-2 rounded-full border border-astera-300 hover:bg-cream transition-colors cursor-pointer"
                      >
                        ← Obje slike
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      {tradicijskiSubcategories.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className={`group flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-300 ${
                            sub.featured
                              ? "bg-astera-900 text-white hover:bg-astera-800 shadow-md"
                              : "bg-cream hover:bg-white text-astera-900 border border-astera-200/80 hover:border-astera-400"
                          }`}
                        >
                          <div>
                            <span className="block text-xs md:text-sm font-sans font-bold uppercase tracking-[0.22em]">
                              {sub.label}
                            </span>
                            <span
                              className={`block text-xs font-serif italic mt-0.5 ${
                                sub.featured ? "text-astera-200" : "text-charcoal/70"
                              }`}
                            >
                              {sub.subtitle}
                            </span>
                          </div>
                          <span className="text-base font-bold group-hover:translate-x-1 transition-transform">
                            →
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="pt-5 mt-5 border-t border-astera-200/60 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveSide("astera")}
                      className="text-[10px] font-sans font-bold uppercase tracking-[0.22em] text-astera-700 hover:text-astera-900 transition-colors cursor-pointer"
                    >
                      Prebaci na Astera Nakit →
                    </button>
                    <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-astera-500">
                      Ručni rad • 14k Zlato
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ================= RIGHT HALF: TRADICIJSKI NAKIT (OR ASTERA SUBCATEGORIES) ================= */}
          <div className="lg:col-span-6 relative min-h-[440px] md:min-h-[540px]">
            <AnimatePresence mode="wait">
              {activeSide !== "astera" ? (
                <motion.div
                  key="home-tradicijski-picture"
                  initial={{ opacity: 0, scale: 0.99 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  onMouseEnter={() => {
                    if (activeSide === null) setActiveSide("tradicijski");
                  }}
                  onClick={() =>
                    setActiveSide(
                      activeSide === "tradicijski" ? null : "tradicijski"
                    )
                  }
                  className={`relative w-full h-full min-h-[440px] md:min-h-[540px] rounded-3xl overflow-hidden cursor-pointer group border transition-all duration-500 ${
                    activeSide === "tradicijski"
                      ? "border-astera-600 shadow-2xl ring-2 ring-astera-400/40"
                      : "border-astera-200/80 shadow-md hover:shadow-2xl"
                  }`}
                >
                  <Image
                    src="/images/tradicijski-showcase.jpg"
                    alt="Tradicijski Nakit"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[1500ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-astera-900/90 via-astera-900/20 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-8 md:p-10 flex items-end justify-between">
                    <div>
                      <p className="text-[10px] font-sans uppercase tracking-[0.35em] text-astera-200 font-bold mb-2">
                        Zlatno nasljeđe
                      </p>
                      <h4 className="font-serif text-2xl md:text-3xl tracking-wider uppercase text-white">
                        Tradicijski Nakit
                      </h4>
                    </div>
                    <span
                      className={`px-5 py-2.5 rounded-full text-[10px] font-sans font-bold uppercase tracking-[0.2em] transition-all duration-300 shrink-0 ${
                        activeSide === "tradicijski"
                          ? "bg-white text-astera-900"
                          : "bg-white/20 backdrop-blur-md text-white border border-white/30 group-hover:bg-white group-hover:text-astera-900"
                      }`}
                    >
                      {activeSide === "tradicijski" ? "← Kategorije" : "Odaberi"}
                    </span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="home-astera-subcategories"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full min-h-[440px] md:min-h-[540px] rounded-3xl bg-warm-beige border border-astera-300/80 p-8 md:p-10 flex flex-col justify-between shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-astera-200 pb-5 mb-6">
                      <div>
                        <p className="text-[10px] font-sans font-bold uppercase tracking-[0.35em] text-astera-600 mb-1">
                          Rođena da sjaji • Suvremena Linija
                        </p>
                        <h4 className="font-serif text-xl md:text-2xl text-astera-900 uppercase tracking-wider">
                          Astera Nakit
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveSide(null)}
                        className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-astera-700 hover:text-astera-900 px-4 py-2 rounded-full border border-astera-300 hover:bg-cream transition-colors cursor-pointer"
                      >
                        Obje slike →
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      {asteraSubcategories.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className={`group flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-300 ${
                            sub.featured
                              ? "bg-astera-900 text-white hover:bg-astera-800 shadow-md"
                              : "bg-cream hover:bg-white text-astera-900 border border-astera-200/80 hover:border-astera-400"
                          }`}
                        >
                          <div>
                            <span className="block text-xs md:text-sm font-sans font-bold uppercase tracking-[0.22em]">
                              {sub.label}
                            </span>
                            <span
                              className={`block text-xs font-serif italic mt-0.5 ${
                                sub.featured ? "text-astera-200" : "text-charcoal/70"
                              }`}
                            >
                              {sub.subtitle}
                            </span>
                          </div>
                          <span className="text-base font-bold group-hover:translate-x-1 transition-transform">
                            →
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="pt-5 mt-5 border-t border-astera-200/60 flex items-center justify-between">
                    <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-astera-500">
                      Definiran posebnošću
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveSide("tradicijski")}
                      className="text-[10px] font-sans font-bold uppercase tracking-[0.22em] text-astera-700 hover:text-astera-900 transition-colors cursor-pointer"
                    >
                      ← Prebaci na Tradicijski Nakit
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
