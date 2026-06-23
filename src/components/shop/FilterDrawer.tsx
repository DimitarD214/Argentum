"use client";
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
  isOpen, onClose, filterTheme, setFilterTheme, filterColor, setFilterColor,
  filterMaterial, setFilterMaterial, filterPrice, setFilterPrice, resetAllFilters, t,
  themes, colors, materials, prices
}: FilterDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[200]"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white border-l border-gray-100 shadow-2xl z-[210] flex flex-col"
          >
            <div className="flex justify-between items-center px-10 py-10 border-b border-gray-100">
              <h2 className="font-serif text-3xl text-charcoal">Filteri</h2>
              <button onClick={onClose} className="p-3 text-gray-400 hover:text-charcoal transition-colors hover:rotate-90 duration-500 rounded-full hover:bg-gray-50">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-10 py-12 space-y-16">
              {[
                { title: 'Kolekcija', val: filterTheme, set: setFilterTheme, opts: themes },
                { title: 'Boja', val: filterColor, set: setFilterColor, opts: colors },
                { title: 'Materijal', val: filterMaterial, set: setFilterMaterial, opts: materials },
                { title: 'Cijena', val: filterPrice, set: setFilterPrice, opts: prices },
              ].map(section => (
                <div key={section.title}>
                  <h3 className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-gray-400 mb-6">{section.title}</h3>
                  <div className="flex flex-wrap gap-4">
                    {section.opts.map(opt => (
                      <button
                        key={opt}
                        onClick={() => section.set(opt)}
                        className={`px-6 py-3 font-sans text-[11px] font-semibold uppercase tracking-widest transition-all duration-300 rounded-full border ${section.val === opt ? 'bg-charcoal text-white border-charcoal shadow-md' : 'bg-transparent text-gray-500 border-gray-200 hover:border-gray-400 hover:text-charcoal hover:bg-gray-50'}`}
                      >
                        {t(opt)}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-8 border-t border-gray-100 flex gap-6 bg-white">
              <button onClick={resetAllFilters} className="w-1/3 py-5 font-sans text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-charcoal transition-colors underline underline-offset-4 decoration-gray-300 hover:decoration-charcoal">
                Poništi
              </button>
              <button onClick={onClose} className="w-2/3 py-5 bg-charcoal text-white font-sans text-xs font-bold uppercase tracking-widest hover:bg-black transition-colors rounded-sm shadow-xl shadow-black/10 hover:shadow-black/20">
                Prikaži Rezultate
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
