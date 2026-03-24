'use client';
import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  theme: string;
  stoneColor: string;
  price: {
    sterling_silver: number;
    gold_14k: number;
  };
  badges: string[];
  description: string;
  images: string[];
}

export default function ProductGrid({ initialProducts }: { initialProducts: Product[] }) {
  const [filterTheme, setFilterTheme] = useState('All');
  const [filterColor, setFilterColor] = useState('All');

  const themes = ['All', 'Butterflies', 'Flowers', 'Classic'];
  const colors = ['All', 'Green', 'Clear', 'Rose'];

  const filteredProducts = initialProducts.filter(p => {
    const matchTheme = filterTheme === 'All' || p.theme === filterTheme;
    const matchColor = filterColor === 'All' || p.stoneColor === filterColor;
    return matchTheme && matchColor;
  });

  return (
    <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
      {/* Sidebar Filters - Swarovski Style */}
      <aside className="w-full md:w-56 flex-shrink-0">
        <div className="sticky top-32 space-y-12">
          <div>
            <h3 className="font-sans font-semibold text-xs tracking-[0.2em] text-black uppercase mb-5">Theme</h3>
            <ul className="space-y-4 font-sans text-sm text-gray-500">
              {themes.map(t => (
                <li key={t}>
                  <button 
                    onClick={() => setFilterTheme(t)}
                    className={`transition-colors hover:text-black flex items-center justify-between w-full ${filterTheme === t ? 'text-black font-semibold' : ''}`}
                  >
                    <span>{t}</span>
                    {filterTheme === t && <span className="text-[var(--color-emerald)] text-[10px]">●</span>}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-sans font-semibold text-xs tracking-[0.2em] text-black uppercase mb-5">Stone Color</h3>
            <ul className="space-y-4 font-sans text-sm text-gray-500">
              {colors.map(c => (
                <li key={c}>
                  <button 
                    onClick={() => setFilterColor(c)}
                    className={`transition-colors hover:text-black flex items-center gap-3 w-full ${filterColor === c ? 'text-black font-semibold' : ''}`}
                  >
                    {c !== 'All' && (
                      <span 
                        className="inline-block w-4 h-4 rounded-full border border-gray-200 shadow-sm"
                        style={{ 
                          backgroundColor: c === 'Green' ? '#50C878' : c === 'Rose' ? '#F4C2C2' : '#ffffff' 
                        }}
                      />
                    )}
                    <span>{c}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>

      {/* Product Grid */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4 font-sans text-xs tracking-widest text-gray-400 uppercase">
          <span>{filteredProducts.length} Results</span>
          <span className="hidden sm:inline">Sort By: Recommended</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-16">
          {filteredProducts.map(product => (
            <a href={`/shop/${product.id}`} key={product.id} className="group block cursor-pointer">
              {/* Image Container */}
              <div className="relative aspect-[4/5] mb-6 bg-[#f8f8f8] overflow-hidden flex items-center justify-center p-6">
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
                  {product.badges.map(badge => (
                    <span key={badge} className="bg-white/95 backdrop-blur-md text-black text-[9px] font-semibold uppercase tracking-widest px-3 py-1.5 border border-gray-100 shadow-sm">
                      {badge}
                    </span>
                  ))}
                </div>
                
                {/* Image Placeholders with Hover Reveal */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-300 font-sans tracking-[0.2em] text-xs uppercase z-10 transition-opacity duration-700 ease-in-out group-hover:opacity-0 bg-white">
                  {product.name} (Front)
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-sans tracking-[0.2em] text-xs uppercase z-0 opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100 bg-[#f4f4f5]">
                  {product.name} (Worn)
                </div>
              </div>

              {/* Product Info */}
              <div className="text-center px-4">
                <h2 className="font-serif text-xl tracking-wide text-black mb-2">{product.name}</h2>
                <p className="font-sans text-xs uppercase tracking-widest text-gray-400 mb-3">{product.stoneColor} / {product.theme}</p>
                <p className="font-sans text-sm tracking-widest text-black">From ${product.price.sterling_silver}</p>
              </div>
            </a>
          ))}
          
          {filteredProducts.length === 0 && (
            <div className="col-span-full py-32 text-center text-gray-400 font-sans tracking-widest uppercase text-sm border-t border-b border-gray-100">
              No Pieces Match Your Selection
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
