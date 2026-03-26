/* ASTERA DESIGN SYSTEM REMINDER: NEVER align text 100% to screen edges. Minimum padding: px-24 (mobile) / px-64+ (desktop) */
"use client";
import { useState } from 'react';
import { useFavouritesStore } from '@/store/favouritesStore';
import { useCartStore } from '@/store/cartStore';

interface Product {
  id: string;
  name: string;
  theme: string;
  stoneColor: string;
  price: {
    sterling_silver?: number;
    gold_14k?: number;
  };
  badges: string[];
  description: string;
  images: string[];
  material: string[];
}

export default function ProductGrid({ initialProducts }: { initialProducts: Product[] }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterTheme, setFilterTheme] = useState('All');
  const [filterColor, setFilterColor] = useState('All');
  const [filterMaterial, setFilterMaterial] = useState('All');
  const [filterPrice, setFilterPrice] = useState('All');

  const [expandedSections, setExpandedSections] = useState({
    Theme: true,
    Color: true,
    Material: true,
    Price: true
  });

  const { items: favItems, toggleFavourite } = useFavouritesStore();
  const { addItem, updateCartOpen } = useCartStore();

  const themes = ['All', 'Butterflies', 'Flowers', 'Classic'];
  const colors = ['All', 'Green', 'Clear', 'Rose'];
  const materials = ['All', 'Sterling Silver', '14k Gold', 'Rose Gold', 'Platinum'];
  const prices = ['All', 'Under $150', '$150 - $300', 'Over $300'];

  const getBasePrice = (p: Product) => p.price.sterling_silver || p.price.gold_14k || 0;

  const filteredProducts = initialProducts.filter(p => {
    const matchTheme = filterTheme === 'All' || p.theme === filterTheme;
    const matchColor = filterColor === 'All' || p.stoneColor === filterColor;
    const matchMaterial = filterMaterial === 'All' || p.material.includes(filterMaterial);
    
    let matchPrice = true;
    const price = getBasePrice(p);
    if (filterPrice === 'Under $150') matchPrice = price < 150;
    if (filterPrice === '$150 - $300') matchPrice = price >= 150 && price <= 300;
    if (filterPrice === 'Over $300') matchPrice = price > 300;

    return matchTheme && matchColor && matchMaterial && matchPrice;
  });

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: getBasePrice(product),
      quantity: 1,
      image: product.images?.[0] || '',
      metal: product.material?.[0] || 'Sterling Silver'
    });
    updateCartOpen(true);
  };

  const handleToggleFav = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavourite(id);
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
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-4">
        <p className="font-sans text-sm font-medium text-black">
          {filteredProducts.length} Results
        </p>
        
        <div className="flex gap-4">
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-300 hover:border-black transition-colors font-sans text-sm font-medium bg-[#FAF9F5]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
            </svg>
            Filters
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-300 hover:border-black transition-colors font-sans text-sm font-medium bg-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
            </svg>
            Sort by
          </button>
        </div>
      </div>

      {/* Product Grid - 4 Columns on XL screens, huge vertical gaps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-32">
        {filteredProducts.map(product => {
          const isFav = favItems.includes(product.id);
          return (
            <a href={`/shop/${product.id}`} key={product.id} className="group block cursor-pointer flex flex-col items-center">
              {/* Image Container */}
              <div className="relative w-full aspect-square mb-6 flex items-center justify-center p-6 bg-transparent">
               
                {/* Favourites Heart Toggle - Top Right */}
                <button 
                  onClick={(e) => handleToggleFav(e, product.id)}
                  className="absolute top-0 right-0 z-20 p-2 text-gray-400 hover:text-black transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill={isFav ? "black" : "none"} viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className={`w-6 h-6 ${isFav ? "text-black" : "text-gray-400"}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                  </svg>
                </button>
                
                {/* Image */}
                {product.images && product.images.length > 0 ? (
                  <img src={product.images[0]} alt={product.name} className="absolute inset-0 w-full h-full object-contain transition-transform duration-1000 group-hover:scale-105" />
                ) : (
                  <div className="w-full text-center text-gray-300 font-sans tracking-[0.2em] text-[10px] uppercase">
                    {product.name} Image
                  </div>
                )}

                {/* Quick Add To Bag Hover */}
                <div className="absolute bottom-0 w-full z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    onClick={(e) => handleQuickAdd(e, product)}
                    className="w-full bg-black text-white text-[11px] font-sans font-bold uppercase tracking-widest py-4 hover:bg-gray-800 transition-colors"
                  >
                    Quick Add
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="text-center w-full px-2">
                 <p className="font-sans text-[11px] text-gray-500 mb-2">{product.badges[0] || "Featured"}</p>
                <h2 className="font-sans text-sm font-medium text-black mb-2 line-clamp-1">{product.name}</h2>
                <p className="font-sans text-[11px] text-gray-500 mb-3 truncate">{product.description}</p>
                <p className="font-serif text-lg text-black">${getBasePrice(product)}</p>
              </div>
            </a>
          );
        })}
        
        {filteredProducts.length === 0 && (
          <div className="col-span-full py-32 text-center text-gray-400 font-sans text-sm">
            No products found matching these filters.
          </div>
        )}
      </div>

      {/* FILTER DRAWER / OFF-CANVAS */}
      <>
        <div 
          className={`fixed inset-0 bg-black/30 z-[100] transition-opacity duration-300 ${isFilterOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          onClick={() => setIsFilterOpen(false)}
        />
        
        <div 
          className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[110] transform transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col ${
            isFilterOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="font-sans text-lg font-medium">Filters</h2>
            <button onClick={() => setIsFilterOpen(false)} className="p-2 text-gray-400 hover:text-black">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Drawer Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {/* Category Toggle */}
            <div className="border-b border-gray-100 py-4">
              <button className="flex w-full justify-between items-center" onClick={() => toggleSection('Theme')}>
                <span className="font-sans text-sm text-gray-700">Categories</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-4 h-4 transition-transform ${expandedSections.Theme ? 'rotate-180' : ''}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              {expandedSections.Theme && (
                <div className="mt-4 space-y-3">
                  {themes.map(t => (
                    <label key={t} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${filterTheme === t ? 'border-black bg-black' : 'border-gray-300 group-hover:border-black'}`}>
                        {filterTheme === t && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                      </div>
                      <span className="font-sans text-sm text-gray-600 group-hover:text-black transition-colors">{t}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Color Toggle */}
            <div className="border-b border-gray-100 py-4">
              <button className="flex w-full justify-between items-center" onClick={() => toggleSection('Color')}>
                <span className="font-sans text-sm text-gray-700">Color</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-4 h-4 transition-transform ${expandedSections.Color ? 'rotate-180' : ''}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              {expandedSections.Color && (
                <div className="mt-4 space-y-3">
                  {colors.map(c => (
                     <label key={c} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${filterColor === c ? 'border-black bg-black' : 'border-gray-300 group-hover:border-black'}`}>
                        {filterColor === c && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                      </div>
                      <span className="font-sans text-sm text-gray-600 group-hover:text-black transition-colors flex items-center gap-2">
                         {c !== 'All' && <span className="w-3 h-3 rounded-full shadow-sm block" style={{ backgroundColor: c === 'Green' ? '#50C878' : c === 'Rose' ? '#F4C2C2' : '#ffffff' }}></span>}
                         {c}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

             {/* Material Toggle */}
             <div className="border-b border-gray-100 py-4">
              <button className="flex w-full justify-between items-center" onClick={() => toggleSection('Material')}>
                <span className="font-sans text-sm text-gray-700">Material</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-4 h-4 transition-transform ${expandedSections.Material ? 'rotate-180' : ''}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              {expandedSections.Material && (
                <div className="mt-4 space-y-3">
                  {materials.map(m => (
                    <label key={m} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${filterMaterial === m ? 'border-black bg-black' : 'border-gray-300 group-hover:border-black'}`}>
                        {filterMaterial === m && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                      </div>
                      <span className="font-sans text-sm text-gray-600 group-hover:text-black transition-colors">{m}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Price Toggle */}
            <div className="border-b border-gray-100 py-4">
              <button className="flex w-full justify-between items-center" onClick={() => toggleSection('Price')}>
                <span className="font-sans text-sm text-gray-700">Price Range</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-4 h-4 transition-transform ${expandedSections.Price ? 'rotate-180' : ''}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              {expandedSections.Price && (
                <div className="mt-4 space-y-3">
                  {prices.map(p => (
                    <label key={p} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${filterPrice === p ? 'border-black bg-black' : 'border-gray-300 group-hover:border-black'}`}>
                        {filterPrice === p && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                      </div>
                      <span className="font-sans text-sm text-gray-600 group-hover:text-black transition-colors">{p}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Drawer Sticky Footer */}
          <div className="p-6 border-t border-gray-100 bg-white grid grid-cols-2 gap-4">
             <button 
                onClick={resetAllFilters} 
                className="w-full py-4 bg-white border border-black text-black text-sm font-sans font-medium hover:bg-gray-50 transition-all"
             >
                Reset all
            </button>
            <button 
                onClick={() => setIsFilterOpen(false)} 
                className="w-full py-4 bg-black border border-black text-white text-sm font-sans font-medium hover:bg-astera-600 transition-all"
            >
                Show {filteredProducts.length} products
            </button>
          </div>
        </div>
      </>
    </div>
  );
}
