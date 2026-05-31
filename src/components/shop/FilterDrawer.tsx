"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filterTheme: string;
  setFilterTheme: (val: string) => void;
  filterColor: string;
  setFilterColor: (val: string) => void;
  filterMaterial: string;
  setFilterMaterial: (val: string) => void;
  filterPrice: string;
  setFilterPrice: (val: string) => void;
  resetAllFilters: () => void;
  t: (val: string) => string;
  themes: string[];
  colors: string[];
  materials: string[];
  prices: string[];
}

export default function FilterDrawer({
  isOpen,
  onClose,
  filterTheme,
  setFilterTheme,
  filterColor,
  setFilterColor,
  filterMaterial,
  setFilterMaterial,
  filterPrice,
  setFilterPrice,
  resetAllFilters,
  t,
  themes,
  colors,
  materials,
  prices,
}: FilterDrawerProps) {
  const [expandedSections, setExpandedSections] = useState({
    Theme: true,
    Color: true,
    Material: true,
    Price: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const sections = [
    { id: "Theme", label: "Tema Kolekcije", options: themes, current: filterTheme, setter: setFilterTheme },
    { id: "Color", label: "Mineralna Esencija", options: colors, current: filterColor, setter: setFilterColor },
    { id: "Material", label: "Visoka Alkemija", options: materials, current: filterMaterial, setter: setFilterMaterial },
    { id: "Price", label: "Investicija", options: prices, current: filterPrice, setter: setFilterPrice },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200]"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 h-full w-full sm:w-[580px] bg-white/95 backdrop-blur-2xl z-[210] shadow-[-20px_0_100px_rgba(0,0,0,0.1)] flex flex-col border-l border-white/20"
          >
            <div className="flex items-center justify-between p-12 lg:p-16 border-b border-black/5 bg-luxury-beige/30">
              <div className="space-y-1">
                <h2 className="heading-luxury text-2xl tracking-[0.1em] uppercase">Pročistite Odabir</h2>
                <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-slate-400">
                  Prilagodite svoj umjetnički horizont
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-12 h-12 flex items-center justify-center rounded-full border border-black/10 text-astera-900 hover:bg-astera-900 hover:text-white transition-all duration-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-12 lg:p-16 space-y-16 custom-scrollbar">
              {sections.map((section) => (
                <div key={section.id} className="border-b border-slate-100 pb-12 last:border-0">
                  <button
                    className="flex w-full justify-between items-center mb-10 group"
                    onClick={() => toggleSection(section.id as any)}
                  >
                    <span className="subheading-luxury !text-astera-900 !text-[15px] group-hover:tracking-[0.4em] transition-all duration-700 uppercase tracking-[0.2em]">
                      {section.label}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1}
                      stroke="currentColor"
                      className={`w-5 h-5 text-slate-400 transition-transform duration-700 ${
                        expandedSections[section.id as keyof typeof expandedSections] ? "rotate-180" : ""
                      }`}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>
                  <AnimatePresence>
                    {expandedSections[section.id as keyof typeof expandedSections] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-2 gap-4 pb-4">
                          {section.options.map((opt) => (
                            <button
                              key={opt}
                              onClick={() => section.setter(opt)}
                              className={`py-4 px-6 rounded-sm text-[10px] font-sans font-bold tracking-[0.2em] uppercase transition-all duration-500 ${
                                section.current === opt
                                  ? "bg-astera-900 text-white shadow-xl scale-[1.02]"
                                  : "bg-transparent border border-black/5 text-slate-400 hover:border-astera-300 hover:text-astera-900"
                              }`}
                            >
                              {t(opt)}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <div className="p-12 lg:p-16 border-t border-black/5 bg-white/80 backdrop-blur-xl grid flex-col gap-4 shadow-[0_-10px_40px_rgba(0,0,0,0.03)] relative z-10 w-full flex">
              <button
                onClick={resetAllFilters}
                className="w-full py-4 text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-slate-400 hover:text-astera-900 transition-colors"
              >
                Poništi Filter
              </button>
              <button
                onClick={onClose}
                className="btn-bespoke-elegant w-full !bg-astera-900 !text-white hover:!bg-black py-5 border-none"
              >
                Primijeni Prikaz
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
