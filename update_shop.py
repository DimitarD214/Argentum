import os

page_content = """import ProductGrid from './ProductGrid';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getStripeProducts } from '@/lib/stripe-products';

export default async function ShopPage() {
  const stripeProducts = await getStripeProducts();

  const products = stripeProducts.map(p => ({
    id: p.metadata.original_id || p.id,
    stripe_id: p.id,
    name: p.name,
    description: p.description,
    images: p.images,
    category: p.metadata.category || 'Jewelry',
    theme: p.metadata.theme || 'Classic',
    stoneColor: p.metadata.stoneColor || 'Clear',
    material: p.metadata.materials ? p.metadata.materials.split(',') : [],
    price: p.prices.reduce((acc, price) => {
      const material = price.metadata.material || 'sterling_silver';
      acc[material] = (price.unit_amount || 0) / 100;
      return acc;
    }, {} as Record<string, number>),
    badges: p.metadata.materials ? [] : ['Novo']
  }));

  return (
    <div className="bg-white">
      <Navbar />
      
      <main className="min-h-screen pt-32 lg:pt-48 pb-24">
        <header className="px-6 md:px-12 lg:px-24 mb-20 lg:mb-32">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between gap-10">
            <div className="max-w-2xl">
              <p className="font-sans text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-astera-400 mb-6 md:mb-10">Katalog • Proljeće/Ljeto '26</p>
              <h1 className="font-serif text-6xl md:text-8xl lg:text-[10rem] leading-[0.9] tracking-tighter text-charcoal">
                Arhiv.
              </h1>
            </div>
            <div className="max-w-xs md:pb-4">
              <p className="font-sans text-xs md:text-sm leading-relaxed text-gray-500 text-right md:text-left">
                Pažljivo kurirana selekcija naših najistaknutijih kreacija. Dizajnirano za vječnost.
              </p>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-16 md:mt-24 h-[1px] w-full bg-gradient-to-r from-charcoal via-gray-200 to-transparent opacity-20" />
        </header>

        <section className="px-4 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <ProductGrid initialProducts={products as any} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
"""

grid_content = """"use client";
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
"""

card_content = """"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useFavouritesStore } from "@/store/favouritesStore";
import { useCartStore } from "@/store/cartStore";

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

interface ProductCardProps {
  product: Product;
  index: number;
  t: (val: string) => string;
  isLarge?: boolean;
}

export default function ProductCard({ product, index, t, isLarge = false }: ProductCardProps) {
  const { items: favItems, toggleFavourite } = useFavouritesStore();
  const updateCartOpen = useCartStore((state) => state.updateCartOpen);
  const addItem = useCartStore((state) => state.addItem);

  const isFav = favItems.includes(product.id);
  const badge = product.badges && product.badges.length > 0 ? product.badges[0] : null;

  const getBasePrice = (p: Product) =>
    p.price.sterling_silver || p.price.gold_14k || p.price.rose_gold || p.price.platinum || 0;

  const handleToggleFav = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavourite(id);
  };

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultMaterial = product.material[0] || "Sterling Silver";
    const materialKey = defaultMaterial.toLowerCase().replace(" ", "_");
    const price = product.price[materialKey as keyof typeof product.price] || getBasePrice(product);

    addItem({
      id: product.id,
      name: product.name,
      price: price,
      quantity: 1,
      image: product.images && product.images[0] ? product.images[0] : "/forest-greens-necklace.png",
      metal: t(defaultMaterial),
    });

    updateCartOpen(true);
  };

  const colSpanClass = isLarge ? "lg:col-span-2 lg:row-span-2" : "col-span-1 row-span-1";

  return (
    <motion.div
      layout
      key={product.id}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
      className={`group relative overflow-hidden rounded-2xl bg-[#f8f9fa] shadow-sm transition-all duration-700 hover:shadow-xl ${colSpanClass} flex flex-col`}
    >
      <Link href={`/shop/${product.id}`} className="block w-full h-full relative overflow-hidden flex-1">
        
        {badge && (
          <div className="absolute top-6 left-6 z-20 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] font-bold tracking-widest uppercase text-charcoal border border-white">
            {badge}
          </div>
        )}

        <button
          onClick={(e) => handleToggleFav(e, product.id)}
          className="absolute top-6 right-6 z-20 p-2.5 bg-white/50 backdrop-blur-xl rounded-full text-charcoal hover:bg-white transition-all duration-500 shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill={isFav ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
        </button>

        <div className="absolute inset-0 bg-[#f8f9fa] mix-blend-multiply transition-colors duration-700 group-hover:bg-[#f1f3f5] z-0" />

        <Image
          src={product.images && product.images[0] ? product.images[0] : "/forest-greens-necklace.png"}
          alt={product.name}
          fill
          className={`object-cover z-10 transition-transform duration-[1500ms] group-hover:scale-110 ${product.images && product.images.length > 1 ? 'group-hover:opacity-0 opacity-100' : 'opacity-100'}`}
        />
        {product.images && product.images.length > 1 && product.images[1] && (
          <Image
            src={product.images[1]}
            alt={`${product.name} alternate view`}
            fill
            className="object-cover z-10 opacity-0 group-hover:opacity-100 transition-all duration-[1500ms] group-hover:scale-105 absolute inset-0"
          />
        )}

        {/* Liquid Glass Info Overlay */}
        <div className="absolute inset-x-4 bottom-4 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
           <div className="bg-white/95 backdrop-blur-3xl p-4 md:p-6 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-2xl border border-white/50">
             <div>
               <h2 className="font-serif text-lg md:text-xl text-charcoal mb-1 line-clamp-1">{product.name}</h2>
               <p className="font-sans text-[9px] uppercase tracking-widest text-gray-500 font-bold">
                 {t(product.stoneColor)}
               </p>
             </div>
             <div className="flex flex-col items-end">
                <p className="font-serif text-base md:text-lg text-charcoal">€{getBasePrice(product).toFixed(2)}</p>
                <button
                  onClick={(e) => handleQuickAdd(e, product)}
                  className="mt-2 text-[9px] font-bold uppercase tracking-widest text-astera-600 hover:text-charcoal transition-colors underline underline-offset-4"
                >
                  Dodaj
                </button>
             </div>
           </div>
        </div>
      </Link>
    </motion.div>
  );
}
"""

filter_content = """"use client";
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
            <div className="flex justify-between items-center px-10 py-10 border-b border-gray-50">
              <h2 className="font-serif text-3xl text-charcoal">Filteri</h2>
              <button onClick={onClose} className="p-2 text-gray-400 hover:text-charcoal transition-colors hover:rotate-90 duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
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
                  <h3 className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-gray-400 mb-6">{section.title}</h3>
                  <div className="flex flex-wrap gap-3">
                    {section.opts.map(opt => (
                      <button
                        key={opt}
                        onClick={() => section.set(opt)}
                        className={`px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 rounded-full border ${section.val === opt ? 'bg-charcoal text-white border-charcoal' : 'bg-transparent text-gray-500 border-gray-200 hover:border-charcoal hover:text-charcoal'}`}
                      >
                        {t(opt)}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-10 border-t border-gray-50 flex gap-4 bg-gray-50/50">
              <button onClick={resetAllFilters} className="w-1/3 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-charcoal transition-colors underline underline-offset-4">
                Poništi
              </button>
              <button onClick={onClose} className="w-2/3 py-4 bg-charcoal text-white text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-colors rounded-sm">
                Prikaži Rezultate
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
"""

base = r'c:\Users\HomePC\.gemini\antigravity\brain\792a8f1a-0fce-41a3-95c6-d1341073d446'
with open(os.path.join(base, 'src/app/shop/page.tsx'), 'w', encoding='utf-8') as f:
    f.write(page_content)
with open(os.path.join(base, 'src/app/shop/ProductGrid.tsx'), 'w', encoding='utf-8') as f:
    f.write(grid_content)
with open(os.path.join(base, 'src/components/shop/ProductCard.tsx'), 'w', encoding='utf-8') as f:
    f.write(card_content)
with open(os.path.join(base, 'src/components/shop/FilterDrawer.tsx'), 'w', encoding='utf-8') as f:
    f.write(filter_content)

print('Updated shop components successfully')
