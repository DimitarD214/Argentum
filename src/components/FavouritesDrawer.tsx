"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFavouritesStore } from "@/store/favouritesStore";
import productsData from "@/data/products.json";
import { useCartStore } from "@/store/cartStore";
import { motion, AnimatePresence } from "framer-motion";

export default function FavouritesDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  const favourites = useFavouritesStore((state) => state.items);
  const removeFavourite = useFavouritesStore((state) => state.removeFavourite);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => setMounted(true), []);
  
  if (!mounted) return null;

  const favProducts = productsData.filter(p => favourites.includes(p.id));

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price.sterling_silver || 150, // default fallback
      quantity: 1,
      image: product.images?.[0] || '',
      metal: product.material?.[0] || 'Sterling Silver'
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[200] backdrop-blur-md"
            onClick={onClose}
          />
          
          {/* Drawer Panel */}
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 h-full w-full sm:w-[500px] bg-white z-[210] shadow-[0_0_100px_rgba(0,0,0,0.25)] flex flex-col"
          >
            <div className="flex items-center justify-between p-8 border-b border-gray-100">
              <h2 className="font-serif text-3xl text-astera-900 tracking-[0.1em] uppercase">Lista želja ({favProducts.length})</h2>
              <button onClick={onClose} className="p-2 hover:bg-astera-50 rounded-sm transition-colors text-gray-400 hover:text-black">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
              <AnimatePresence mode="popLayout">
                {favProducts.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-center text-gray-400 font-sans tracking-widest text-xs uppercase mt-20 italic"
                  >
                    Vaša lista želja je prazna
                  </motion.div>
                ) : (
                  favProducts.map(item => (
                    <motion.div 
                      layout
                      key={item.id} 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      className="flex gap-6 group"
                    >
                      <div className="w-24 h-32 bg-astera-50 rounded-sm overflow-hidden flex-shrink-0 border border-black/5 relative">
                        {item.images && item.images[0] ? (
                          <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-300 uppercase tracking-widest">Image</div>
                        )}
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-center">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-serif text-lg leading-tight text-astera-900">{item.name}</h3>
                          <button onClick={() => removeFavourite(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        <p className="text-xs font-sans text-gray-500 tracking-widest uppercase mb-4">€{item.price.sterling_silver || 150}</p>
                        
                        <button 
                          onClick={() => handleAddToCart(item)}
                          className="w-full py-3 bg-black text-white text-[10px] font-sans font-semibold uppercase tracking-[0.2em] hover:bg-astera-900 transition-colors rounded-sm"
                        >
                          Dodaj u košaricu
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
            
            {favProducts.length > 0 && (
              <div className="p-8 border-t border-gray-100 bg-gray-50">
                 <button onClick={onClose} className="w-full py-4 bg-transparent border border-black text-black text-[11px] font-sans font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all rounded-sm">
                    Nastavi s kupovinom
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
