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
      <div className="flex flex-col sm:flex-row justify-between items-center mb-16 gap-6 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
        <div className="text-[10px] md:text-xs font-sans font-bold tracking-[0.2em] uppercase text-gray-500 ml-2">
           {filteredProducts.length} REZULTATA
        </div>
        
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-3 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-charcoal hover:text-astera-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
            </svg>
            Filteri
          </button>
          <div className="w-[1px] h-4 bg-gray-300" />
          <div className="relative">
            <button 
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-3 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-charcoal hover:text-astera-600 transition-colors mr-2"
            >
              Poredak: {t(sortOption)}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-3 h-3 transition-transform ${isSortOpen ? 'rotate-180' : ''}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            <AnimatePresence>
              {isSortOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full mt-4 right-0 w-64 bg-white/95 backdrop-blur-3xl shadow-2xl z-[200] py-4 border border-black/5 rounded-xl overflow-hidden"
                >
                  {['Featured', 'Price: Low-High', 'Price: High-Low'].map(opt => (
                    <button 
                      key={opt}
                      onClick={() => {
                          setSortOption(opt);
                          setIsSortOpen(false);
                      }}
                      className={`w-full text-left px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${sortOption === opt ? 'bg-gray-50 text-astera-900' : 'text-gray-400 hover:text-charcoal hover:bg-gray-50'}`}
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 auto-rows-[400px] md:auto-rows-[500px]">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product, i) => {
            const isLarge = i % 5 === 0 && filteredProducts.length > 2;
            return (
              <ProductCard key={product.id} product={product} index={i} t={t} isLarge={isLarge} />
            );
          })}
        </AnimatePresence>
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="py-32 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200 mt-10">
           <div className="text-3xl mb-6 opacity-20 grayscale">✨</div>
           <p className="font-sans text-xs tracking-widest uppercase font-bold text-gray-400 mb-8">Nema rezultata za odabrane filtere</p>
           <button onClick={resetAllFilters} className="text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal underline underline-offset-8 hover:text-astera-600 transition-colors">
             Poništi filtere
           </button>
        </div>
      )}

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
