/* ASTERA DESIGN SYSTEM REMINDER: NEVER align text 100% to screen edges. Minimum padding: px-24 (mobile) / px-64+ (desktop) */
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function SearchOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted || !isOpen) return null;

  const popularSearches = ["Butterfly Rings", "Emerald Necklaces", "Signature Watches", "Spring Gifts"];
  const recommendations = [
    { name: "Emerald Butterfly Ring", price: "$120", image: "/emerald-butterfly-ring.png" },
    { name: "Forest Greens Necklace", price: "$210", image: "/forest-greens-necklace.png" },
  ];

  return (
    <div className="fixed inset-0 z-[200] bg-white animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto px-24 md:px-64 py-12">
        <div className="flex justify-between items-center mb-16">
          <div className="flex-1 max-w-2xl">
            <input 
              autoFocus
              className="w-full bg-transparent border-b-2 border-black text-4xl md:text-5xl font-serif py-4 outline-none placeholder:text-gray-200"
              placeholder="What are you looking for?"
            />
          </div>
          <button onClick={onClose} className="p-4 hover:rotate-90 transition-transform duration-500">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
               <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
             </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          <div>
            <h3 className="font-sans font-bold text-xs uppercase tracking-[0.2em] text-gray-400 mb-8 italic">Popular Searches</h3>
            <div className="flex flex-wrap gap-4">
              {popularSearches.map(s => (
                <Link key={s} href="/shop" onClick={onClose} className="px-24 md:px-64 py-3 bg-gray-50 text-xs font-sans font-medium hover:bg-black hover:text-white transition-all duration-300 rounded-full">
                  {s}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-sans font-bold text-xs uppercase tracking-[0.2em] text-gray-400 mb-8 italic">Recommended for You</h3>
            <div className="grid grid-cols-2 gap-8">
              {recommendations.map(item => (
                <Link href="/shop" key={item.name} onClick={onClose} className="group block">
                  <div className="aspect-square bg-gray-50 rounded-xl mb-4 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  </div>
                  <p className="text-[12px] font-sans font-bold tracking-[0.05em] uppercase text-black">{item.name}</p>
                  <p className="text-[12px] font-sans text-gray-500 mt-1">{item.price}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
