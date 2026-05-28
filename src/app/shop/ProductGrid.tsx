/* ASTERA DESIGN SYSTEM REMINDER: ALWAYS use card-luxury for product cards. Rounded-3xl, soft shadows. */
"use client";
import Image from "next/image";
import { useState } from 'react';
import { useFavouritesStore } from '@/store/favouritesStore';
import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface Product {
  id: string;
  stripe_id: string;
  name: string;
  theme: string;
  stoneColor: string;
  price: {
    sterling_silver?: number;
    gold_14k?: number;
    rose_gold?: number;
    platinum?: number;
  };
  badges: string[];
  description: string | null;
  images: string[];
  material: string[];
  category: string;
}

const translateMap: Record<string, string> = {
  'All': 'Sve',
  'Butterflies': 'Leptiri',
  'Flowers': 'Cvijeće',
  'Classic': 'Klasično',
  'Green': 'Zelena',
  'Clear': 'Prozirna',
  'Rose': 'Roza',
  'Sterling Silver': 'Srebro 925',
  '14k Gold': '14k Zlato',
  'Rose Gold': 'Rozo Zlato',
  'Platinum': 'Platina',
  'Under €150': 'Ispod €150',
  '€150 - €300': '€150 - €300',
  'Over €300': 'Iznad €300',
  'Featured': 'Izdvojeno',
  'Price: Low-High': 'Cijena: Niska-Visoka',
  'Price: High-Low': 'Cijena: Visoka-Niska'
};

const t = (val: string) => translateMap[val] || val;

export default function ProductGrid({ initialProducts }: { initialProducts: Product[] }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterTheme, setFilterTheme] = useState('All');
  const [filterColor, setFilterColor] = useState('All');
  const [filterMaterial, setFilterMaterial] = useState('All');
  const [filterPrice, setFilterPrice] = useState('All');
  const [sortOption, setSortOption] = useState('Featured');
  const [isSortOpen, setIsSortOpen] = useState(false);

  const [expandedSections, setExpandedSections] = useState({
    Theme: true,
    Color: true,
    Material: true,
    Price: true
  });

  const { items: favItems, toggleFavourite } = useFavouritesStore();
  const updateCartOpen = useCartStore((state) => state.updateCartOpen);
  const addItem = useCartStore((state) => state.addItem);

  const themes = ['All', 'Butterflies', 'Flowers', 'Classic'];
  const colors = ['All', 'Green', 'Clear', 'Rose'];
  const materials = ['All', 'Sterling Silver', '14k Gold', 'Rose Gold', 'Platinum'];
  const prices = ['All', 'Under €150', '€150 - €300', 'Over €300'];

  const getBasePrice = (p: Product) => p.price.sterling_silver || p.price.gold_14k || p.price.rose_gold || p.price.platinum || 0;

  const filteredProducts = initialProducts.filter(p => {
    const matchTheme = filterTheme === 'All' || p.theme === filterTheme;
    const matchColor = filterColor === 'All' || p.stoneColor === filterColor;
    const matchMaterial = filterMaterial === 'All' || p.material.includes(filterMaterial);
    
    let matchPrice = true;
    const price = getBasePrice(p);
    if (filterPrice === 'Under €150') matchPrice = price < 150;
    if (filterPrice === '€150 - €300') matchPrice = price >= 150 && price <= 300;
    if (filterPrice === 'Over €300') matchPrice = price > 300;

    return matchTheme && matchColor && matchMaterial && matchPrice;
  }).sort((a, b) => {
    if (sortOption === 'Price: Low-High') return getBasePrice(a) - getBasePrice(b);
    if (sortOption === 'Price: High-Low') return getBasePrice(b) - getBasePrice(a);
    return 0;
  });

  const handleToggleFav = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavourite(id);
  };

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    
    // We assume the first material, translating default behavior if necessary
    const defaultMaterial = product.material[0] || 'Sterling Silver';
    const materialKey = defaultMaterial.toLowerCase().replace(' ', '_');
    const price = product.price[materialKey as keyof typeof product.price] || getBasePrice(product);

    addItem({
      id: product.id,
      name: product.name,
      price: price,
      quantity: 1,
      image: product.images[0],
      metal: t(defaultMaterial) // Save the translated metal to the cart
    });
    
    updateCartOpen(true);
  };

  const resetAllFilters = () => {
    setFilterTheme('All');
    setFilterColor('All');
    setFilterMaterial('All');
    setFilterPrice('All');
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div>
      {/* Top Banner (Luxury Grid Header) */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
        <div className="max-w-xl">
           <p className="subheading-luxury mb-4 text-astera-gold tracking-widest uppercase">Faza Otkrivanja</p>
           <h2 className="heading-luxury text-5xl leading-tight font-serif">
              {filteredProducts.length} <span className="opacity-40 lowercase italic font-light tracking-wide">remek-djela pronađeno u našem europskom studiju</span>
           </h2>
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="btn-bespoke-elegant gap-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
            </svg>
            <span>Filteri</span>
          </button>
          <div className="relative">
            <button 
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="btn-bespoke-elegant min-w-[180px]"
            >
              <span>{t(sortOption)}</span>
            </button>
            <AnimatePresence>
              {isSortOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full mt-3 right-0 w-72 bg-astera-white/98 backdrop-blur-2xl border border-black/5 shadow-2xl z-[200] py-6 rounded-[2px] overflow-hidden"
                >
                  {['Featured', 'Price: Low-High', 'Price: High-Low'].map(opt => (
                    <button 
                      key={opt}
                      onClick={() => {
                          setSortOption(opt);
                          setIsSortOpen(false);
                      }}
                      className={`w-full text-left px-10 py-5 text-[11px] font-sans uppercase tracking-[0.25em] transition-all duration-500 border-l-4 ${sortOption === opt ? 'bg-astera-cream text-astera-dark border-astera-600 font-bold' : 'text-astera-text/70 border-transparent hover:text-astera-dark hover:bg-astera-cream'}`}
                    >
                      {t(opt)}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Luxury Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-24 py-24">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product, i) => {
            const isFav = favItems.includes(product.id);
            const badge = product.badges && product.badges.length > 0 ? product.badges[0] : null;

            return (
              <motion.div 
                layout
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.1 }}
                className="card-luxury group bg-astera-white border border-astera-border transition-all duration-700 hover:shadow-2xl hover:shadow-black/5"
              >
                {/* Image Section */}
                <div className="relative aspect-[4/5] bg-astera-cream flex items-center justify-center overflow-hidden">
                  {badge && (
                    <div className="absolute top-6 left-6 z-20 pill-luxury shadow-lg">
                      {badge}
                    </div>
                  )}

                  <button 
                    onClick={(e) => handleToggleFav(e, product.id)}
                    className="absolute top-6 right-6 z-20 p-3 bg-astera-white/70 backdrop-blur-xl rounded-full text-astera-dark border border-black/5 hover:scale-110 active:scale-90 transition-all duration-700 shadow-md"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill={isFav ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                  </button>
                  
                  <Link href={`/shop/${product.id}`} className="absolute inset-0 block group-hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <Image src={product.images[0]} alt={product.name} fill className="object-cover opacity-90 mix-blend-multiply" />
                  </Link>

                  <div className="absolute inset-x-0 bottom-0 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] px-6 pb-8">
                    <button
                      onClick={(e) => handleQuickAdd(e, product)}
                      className="w-full bg-astera-white/95 backdrop-blur-xl text-astera-dark font-sans font-bold text-[10px] uppercase tracking-[0.25em] py-5 rounded-sm shadow-2xl hover:bg-astera-dark hover:text-white transition-all duration-500"
                    >
                      Brzo Dodavanje
                    </button>
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-10 pb-12 flex flex-col items-center text-center">
                  <Link href={`/shop/${product.id}`} className="block mb-4 overflow-hidden w-full">
                    <h2 className="heading-luxury text-[14px] line-clamp-1 group-hover:text-astera-gold transition-colors duration-500">{product.name}</h2>
                  </Link>
                  <div className="h-[1px] w-8 bg-astera-cream mb-6 group-hover:w-20 transition-all duration-700" />
                  <p className="font-sans text-[11px] text-astera-text/70 font-medium uppercase tracking-[0.1em] mb-8">
                    {product.category === 'Jewelry' ? 'Nakit' : product.category} • {t(product.stoneColor)}
                  </p>
                  <div className="pt-6 border-t border-astera-border w-full flex flex-col items-center">
                    <p className="font-serif text-[22px] text-astera-dark font-light mb-1">
                      €{getBasePrice(product).toFixed(2)}
                    </p>
                    <span className="text-[9px] uppercase tracking-[0.3em] text-astera-gold font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-700">Detaljan Prikaz</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="py-48 text-center bg-astera-cream/30 rounded-[2px] border border-astera-border shadow-inner">
           <div className="text-4xl mb-8 opacity-40 grayscale">✨</div>
           <p className="heading-luxury opacity-40 text-xl font-light mb-10 tracking-widest uppercase">Nema podudaranja u našem umjetničkom spektru.</p>
           <button onClick={resetAllFilters} className="btn-bespoke-elegant mt-8">Poništi Umjetnički Objektiv</button>
        </div>
      )}

      {/* FILTER DRAWER REFINED */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[200]"
              onClick={() => setIsFilterOpen(false)}
            />
            
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 h-full w-full sm:w-[580px] bg-astera-white z-[210] shadow-[0_0_100px_rgba(0,0,0,0.1)] flex flex-col"
            >
              <div className="flex items-center justify-between p-12 lg:p-16 border-b border-black/5 bg-astera-cream/50">
                <div className="space-y-1">
                  <h2 className="heading-luxury text-2xl tracking-[0.1em] uppercase">Pročistite Odabir</h2>
                  <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-astera-text/70">Prilagodite svoj umjetnički horizont</p>
                </div>
                <button onClick={() => setIsFilterOpen(false)} className="w-12 h-12 flex items-center justify-center rounded-sm border border-astera-border text-astera-dark hover:bg-astera-white transition-all duration-700">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-12 lg:p-16 space-y-16 custom-scrollbar">
                {[
                   { id: 'Theme', label: 'Tema Kolekcije', options: themes, current: filterTheme, setter: setFilterTheme },
                   { id: 'Color', label: 'Mineralna Esencija', options: colors, current: filterColor, setter: setFilterColor },
                   { id: 'Material', label: 'Visoka Alkemija', options: materials, current: filterMaterial, setter: setFilterMaterial },
                   { id: 'Price', label: 'Investicija', options: prices, current: filterPrice, setter: setFilterPrice }
                ].map(section => (
                  <div key={section.id} className="border-b border-astera-border pb-12 last:border-0">
                    <button 
                      className="flex w-full justify-between items-center mb-10 group" 
                      onClick={() => toggleSection(section.id as any)}
                    >
                      <span className="subheading-luxury !text-astera-dark !text-[15px] group-hover:tracking-[0.4em] transition-all duration-700 uppercase tracking-[0.2em]">{section.label}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className={`w-5 h-5 transition-transform duration-700 ${expandedSections[section.id as keyof typeof expandedSections] ? 'rotate-180' : ''}`}>
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
                            {section.options.map(opt => (
                              <button 
                                 key={opt}
                                 onClick={() => section.setter(opt)}
                                 className={`py-5 px-8 rounded-sm text-[10px] font-sans font-bold tracking-[0.25em] uppercase transition-all duration-700 ${section.current === opt ? 'bg-astera-dark text-white shadow-2xl scale-105' : 'bg-transparent border border-astera-border text-astera-text/70 hover:border-foreground hover:text-astera-dark'}`}
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
              
              <div className="p-12 lg:p-16 border-t border-astera-border bg-astera-white grid flex-col gap-4 shadow-2xl relative z-10 w-full flex">
                 <button 
                    onClick={resetAllFilters} 
                    className="btn-bespoke-elegant w-full"
                 >
                    Poništi Filter
                </button>
                <button 
                    onClick={() => setIsFilterOpen(false)} 
                    className="btn-bespoke-elegant w-full bg-astera-dark text-white"
                >
                    Primijeni Prikaz
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
