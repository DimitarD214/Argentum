/* ASTERA DESIGN SYSTEM REMINDER: ALWAYS use card-luxury for product cards. Rounded-3xl, soft shadows. */
"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '@/components/shop/ProductCard';
import FilterDrawer from '@/components/shop/FilterDrawer';

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

  const resetAllFilters = () => {
    setFilterTheme('All');
    setFilterColor('All');
    setFilterMaterial('All');
    setFilterPrice('All');
  };

  return (
    <div>
      {/* Top Banner (Luxury Grid Header) */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
        <div className="max-w-xl">
           <p className="subheading-luxury mb-4 text-astera-600 tracking-widest uppercase">Faza Otkrivanja</p>
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
                  className="absolute top-full mt-3 right-0 w-72 bg-white/98 backdrop-blur-2xl border border-black/5 shadow-2xl z-[200] py-6 rounded-[2px] overflow-hidden"
                >
                  {['Featured', 'Price: Low-High', 'Price: High-Low'].map(opt => (
                    <button 
                      key={opt}
                      onClick={() => {
                          setSortOption(opt);
                          setIsSortOpen(false);
                      }}
                      className={`w-full text-left px-10 py-5 text-[11px] font-sans uppercase tracking-[0.25em] transition-all duration-500 border-l-4 ${sortOption === opt ? 'bg-astera-50 text-astera-900 border-astera-600 font-bold' : 'text-gray-400 border-transparent hover:text-astera-900 hover:bg-astera-50'}`}
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 py-16">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} t={t} />
          ))}
        </AnimatePresence>
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="py-48 text-center bg-luxury-beige/30 rounded-[2px] border border-slate-100 shadow-inner">
           <div className="text-4xl mb-8 opacity-40 grayscale">✨</div>
           <p className="heading-luxury opacity-40 text-xl font-light mb-10 tracking-widest uppercase">Nema podudaranja u našem umjetničkom spektru.</p>
           <button onClick={resetAllFilters} className="btn-bespoke-elegant mt-8">Poništi Umjetnički Objektiv</button>
        </div>
      )}

      {/* Filter Drawer Component */}
      <FilterDrawer 
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filterTheme={filterTheme} setFilterTheme={setFilterTheme}
        filterColor={filterColor} setFilterColor={setFilterColor}
        filterMaterial={filterMaterial} setFilterMaterial={setFilterMaterial}
        filterPrice={filterPrice} setFilterPrice={setFilterPrice}
        resetAllFilters={resetAllFilters}
        t={t}
        themes={themes} colors={colors} materials={materials} prices={prices}
      />
    </div>
  );
}
