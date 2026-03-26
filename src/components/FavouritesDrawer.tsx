"use client";
import { useEffect, useState } from "react";
import { useFavouritesStore } from "@/store/favouritesStore";
import productsData from "@/data/products.json";
import { useCartStore } from "@/store/cartStore";

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
    // Remove from favourites after adding to bag? Optional, but let's keep it in favourites for now.
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/40 z-[100] transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />
      
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[500px] bg-white z-[110] transform transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-8 border-b border-gray-100">
          <h2 className="font-serif text-3xl">Wishlist ({favProducts.length})</h2>
          <button onClick={onClose} className="p-2 hover:bg-astera-50 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {favProducts.length === 0 ? (
            <div className="text-center text-gray-400 font-sans tracking-widest text-xs uppercase mt-20">
              Your wishlist is empty
            </div>
          ) : (
            favProducts.map(item => (
              <div key={item.id} className="flex gap-6 group">
                <div className="w-24 h-32 bg-astera-50 rounded-lg overflow-hidden flex-shrink-0">
                  {item.images && item.images[0] ? (
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-300 uppercase tracking-widest">Image</div>
                  )}
                </div>
                
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif text-lg leading-tight">{item.name}</h3>
                    <button onClick={() => removeFavourite(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-sm font-sans text-gray-500 tracking-widest uppercase mb-4">${item.price.sterling_silver || 150}</p>
                  
                  <button 
                    onClick={() => handleAddToCart(item)}
                    className="w-full py-3 bg-black text-white text-[10px] font-sans font-semibold uppercase tracking-[0.2em] hover:bg-astera-600 transition-colors"
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        
        {favProducts.length > 0 && (
          <div className="p-8 border-t border-gray-100 bg-gray-50">
             <button onClick={onClose} className="w-full py-4 bg-transparent border border-black text-black text-[11px] font-sans font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all">
                Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
