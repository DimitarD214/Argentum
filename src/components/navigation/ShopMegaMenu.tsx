"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface ShopMegaMenuProps {
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClose: () => void;
}

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

export default function ShopMegaMenu({
  isOpen,
  onMouseEnter,
  onMouseLeave,
  onClose,
}: ShopMegaMenuProps) {
  const [activeSide, setActiveSide] = useState<"astera" | "tradicijski" | null>(null);

  // Reset to initial Pictures-Only 50/50 state when menu closes
  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => setActiveSide(null), 250);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={() => {
            setActiveSide(null);
            onMouseLeave();
          }}
          className="absolute left-0 top-full w-full bg-cream border-t border-astera-200/70 shadow-[0_40px_120px_rgba(49,18,14,0.22)] z-[110] overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-8 py-8 lg:py-10">
            {/* Main 50/50 Split Container — Initially ONLY the two pictures; hovering/clicking one reveals its subcategories in the place of the other */}
            <div
              onMouseLeave={() => setActiveSide(null)}
              className="grid grid-cols-12 gap-6 lg:gap-8 w-full min-h-[420px] items-stretch"
            >
              {/* ================= LEFT HALF (6 COLUMNS) ================= */}
              <div className="col-span-12 lg:col-span-6 relative min-h-[380px] lg:min-h-[420px]">
                <AnimatePresence mode="wait">
                  {activeSide !== "tradicijski" ? (
                    /* ASTERA NAKIT — PICTURE ONLY (Default Left OR Active Left while subcategories show on Right) */
                    <motion.div
                      key="astera-picture-card"
                      initial={{ opacity: 0, scale: 0.99 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      onMouseEnter={() => {
                        if (activeSide === null) setActiveSide("astera");
                      }}
                      onClick={() =>
                        setActiveSide(activeSide === "astera" ? null : "astera")
                      }
                      className={`relative w-full h-full min-h-[380px] lg:min-h-[420px] rounded-2xl overflow-hidden cursor-pointer group border transition-all duration-500 ${
                        activeSide === "astera"
                          ? "border-astera-600 shadow-2xl ring-2 ring-astera-400/40"
                          : "border-astera-200/80 shadow-lg hover:shadow-2xl"
                      }`}
                    >
                      <Image
                        src="/images/astera-showcase.jpg"
                        alt="Astera Nakit"
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-astera-900/90 via-astera-900/20 to-transparent" />

                      <div className="absolute inset-x-0 bottom-0 p-7 lg:p-8 flex items-end justify-between">
                        <div>
                          <span className="inline-block text-[10px] font-sans font-bold uppercase tracking-[0.35em] text-astera-200 mb-2">
                            Rođena da sjaji
                          </span>
                          <h3 className="font-serif text-3xl lg:text-4xl text-white uppercase tracking-wider">
                            Astera Nakit
                          </h3>
                        </div>
                        <span
                          className={`px-4 py-2 rounded-full text-[10px] font-sans font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                            activeSide === "astera"
                              ? "bg-white text-astera-900"
                              : "bg-white/20 backdrop-blur-md text-white border border-white/30 group-hover:bg-white group-hover:text-astera-900"
                          }`}
                        >
                          {activeSide === "astera" ? "Odabrano →" : "Odaberi"}
                        </span>
                      </div>
                    </motion.div>
                  ) : (
                    /* TRADICIJSKI NAKIT SUBCATEGORIES — Appears IN THE PLACE OF ASTERA when Tradicijski is hovered/clicked */
                    <motion.div
                      key="tradicijski-subcategories-panel"
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full min-h-[380px] lg:min-h-[420px] rounded-2xl bg-warm-beige border border-astera-300/70 p-7 lg:p-8 flex flex-col justify-between shadow-inner"
                    >
                      <div>
                        <div className="flex items-center justify-between border-b border-astera-200 pb-4 mb-5">
                          <div>
                            <p className="text-[9px] font-sans font-bold uppercase tracking-[0.35em] text-astera-600 mb-1">
                              Zlatno Nasljeđe Hrvatske
                            </p>
                            <h4 className="font-serif text-2xl lg:text-3xl text-astera-900 uppercase tracking-wider">
                              Tradicijski Nakit
                            </h4>
                          </div>
                          <button
                            type="button"
                            onClick={() => setActiveSide(null)}
                            className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-astera-600 hover:text-astera-900 px-3 py-1.5 rounded-full border border-astera-300/80 hover:bg-cream transition-colors cursor-pointer"
                          >
                            ← Obje slike
                          </button>
                        </div>

                        <div className="grid grid-cols-1 gap-2.5">
                          {tradicijskiSubcategories.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={onClose}
                              className={`group flex items-center justify-between px-5 py-3.5 rounded-xl transition-all duration-300 ${
                                sub.featured
                                  ? "bg-astera-900 text-white hover:bg-astera-800 shadow-sm"
                                  : "bg-cream hover:bg-white text-astera-900 border border-astera-200/80 hover:border-astera-400"
                              }`}
                            >
                              <div>
                                <span className="block text-xs font-sans font-bold uppercase tracking-[0.22em]">
                                  {sub.label}
                                </span>
                                <span
                                  className={`block text-[11px] font-serif italic mt-0.5 ${
                                    sub.featured ? "text-astera-200" : "text-charcoal/65"
                                  }`}
                                >
                                  {sub.subtitle}
                                </span>
                              </div>
                              <span className="text-sm font-bold group-hover:translate-x-1 transition-transform">
                                →
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 mt-4 border-t border-astera-200/60 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setActiveSide("astera")}
                          className="text-[10px] font-sans font-bold uppercase tracking-[0.22em] text-astera-700 hover:text-astera-900 transition-colors cursor-pointer"
                        >
                          Prebaci na Astera Nakit →
                        </button>
                        <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-astera-500">
                          14k Zlato &amp; Srebro
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ================= RIGHT HALF (6 COLUMNS) ================= */}
              <div className="col-span-12 lg:col-span-6 relative min-h-[380px] lg:min-h-[420px]">
                <AnimatePresence mode="wait">
                  {activeSide !== "astera" ? (
                    /* TRADICIJSKI NAKIT — PICTURE ONLY (Default Right OR Active Right while subcategories show on Left) */
                    <motion.div
                      key="tradicijski-picture-card"
                      initial={{ opacity: 0, scale: 0.99 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      onMouseEnter={() => {
                        if (activeSide === null) setActiveSide("tradicijski");
                      }}
                      onClick={() =>
                        setActiveSide(
                          activeSide === "tradicijski" ? null : "tradicijski"
                        )
                      }
                      className={`relative w-full h-full min-h-[380px] lg:min-h-[420px] rounded-2xl overflow-hidden cursor-pointer group border transition-all duration-500 ${
                        activeSide === "tradicijski"
                          ? "border-astera-600 shadow-2xl ring-2 ring-astera-400/40"
                          : "border-astera-200/80 shadow-lg hover:shadow-2xl"
                      }`}
                    >
                      <Image
                        src="/images/tradicijski-showcase.jpg"
                        alt="Tradicijski Nakit"
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-astera-900/90 via-astera-900/20 to-transparent" />

                      <div className="absolute inset-x-0 bottom-0 p-7 lg:p-8 flex items-end justify-between">
                        <div>
                          <span className="inline-block text-[10px] font-sans font-bold uppercase tracking-[0.35em] text-astera-200 mb-2">
                            Zlatno nasljeđe
                          </span>
                          <h3 className="font-serif text-3xl lg:text-4xl text-white uppercase tracking-wider">
                            Tradicijski Nakit
                          </h3>
                        </div>
                        <span
                          className={`px-4 py-2 rounded-full text-[10px] font-sans font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                            activeSide === "tradicijski"
                              ? "bg-white text-astera-900"
                              : "bg-white/20 backdrop-blur-md text-white border border-white/30 group-hover:bg-white group-hover:text-astera-900"
                          }`}
                        >
                          {activeSide === "tradicijski" ? "← Odabrano" : "Odaberi"}
                        </span>
                      </div>
                    </motion.div>
                  ) : (
                    /* ASTERA NAKIT SUBCATEGORIES — Appears IN THE PLACE OF TRADICIJSKI when Astera is hovered/clicked */
                    <motion.div
                      key="astera-subcategories-panel"
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 16 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full min-h-[380px] lg:min-h-[420px] rounded-2xl bg-warm-beige border border-astera-300/70 p-7 lg:p-8 flex flex-col justify-between shadow-inner"
                    >
                      <div>
                        <div className="flex items-center justify-between border-b border-astera-200 pb-4 mb-5">
                          <div>
                            <p className="text-[9px] font-sans font-bold uppercase tracking-[0.35em] text-astera-600 mb-1">
                              Rođena da sjaji • Suvremena Linija
                            </p>
                            <h4 className="font-serif text-2xl lg:text-3xl text-astera-900 uppercase tracking-wider">
                              Astera Nakit
                            </h4>
                          </div>
                          <button
                            type="button"
                            onClick={() => setActiveSide(null)}
                            className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-astera-600 hover:text-astera-900 px-3 py-1.5 rounded-full border border-astera-300/80 hover:bg-cream transition-colors cursor-pointer"
                          >
                            Obje slike →
                          </button>
                        </div>

                        <div className="grid grid-cols-1 gap-2.5">
                          {asteraSubcategories.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={onClose}
                              className={`group flex items-center justify-between px-5 py-3.5 rounded-xl transition-all duration-300 ${
                                sub.featured
                                  ? "bg-astera-900 text-white hover:bg-astera-800 shadow-sm"
                                  : "bg-cream hover:bg-white text-astera-900 border border-astera-200/80 hover:border-astera-400"
                              }`}
                            >
                              <div>
                                <span className="block text-xs font-sans font-bold uppercase tracking-[0.22em]">
                                  {sub.label}
                                </span>
                                <span
                                  className={`block text-[11px] font-serif italic mt-0.5 ${
                                    sub.featured ? "text-astera-200" : "text-charcoal/65"
                                  }`}
                                >
                                  {sub.subtitle}
                                </span>
                              </div>
                              <span className="text-sm font-bold group-hover:translate-x-1 transition-transform">
                                →
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 mt-4 border-t border-astera-200/60 flex items-center justify-between">
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
