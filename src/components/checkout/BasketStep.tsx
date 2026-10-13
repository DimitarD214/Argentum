'use client';

import React from 'react';
import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';
import { Plus, Minus, X } from 'lucide-react';

export const BasketStep = () => {
  const { items, updateQuantity, removeItem } = useCartStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-black/5 pb-4">
        <div>
          <h2 className="font-serif tracking-widest uppercase leading-tight text-astera-900 text-lg">VAŠA KOŠARICA</h2>
          <p className="text-slate-400 font-sans text-xs mt-1">Pregledajte odabrane komade.</p>
        </div>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={`${item.id}-${item.metal}`} className="flex items-center gap-6 group py-4 border-b border-slate-50 last:border-0 relative">
            <div className="relative w-20 h-24 bg-warm-beige rounded-sm overflow-hidden flex-shrink-0 border border-black/5">
              {item.image ? (
                <Image 
                  src={item.image} 
                  alt={item.name} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105 mix-blend-multiply"
                  sizes="80px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-200 uppercase text-[9px] tracking-widest">Nema Slike</div>
              )}
            </div>

            <div className="flex-grow flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif tracking-widest uppercase leading-tight text-astera-900 text-xs tracking-wide text-foreground mb-0.5">{item.name}</h3>
                <p className="text-slate-400 text-[9px] uppercase tracking-widest font-sans font-bold">{item.metal ? item.metal.replace('_', ' ') : 'Srebro 925'}</p>
                <p className="text-slate-400 text-[9px] mt-1.5 italic font-serif">€{item.price.toFixed(2)}</p>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center border border-slate-200 rounded-sm overflow-hidden h-8 bg-slate-50">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1, item.metal)}
                    className="px-2.5 hover:bg-slate-200 transition-colors text-slate-500 h-full flex items-center justify-center"
                  >
                    <Minus size={10} />
                  </button>
                  <span className="w-6 text-center font-sans font-bold text-[10px] text-astera-900">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1, item.metal)}
                    className="px-2.5 hover:bg-slate-200 transition-colors text-slate-500 h-full flex items-center justify-center"
                  >
                    <Plus size={10} />
                  </button>
                </div>

                <div className="text-right min-w-[70px]">
                  <p className="font-serif text-sm text-astera-900">€{(item.price * item.quantity).toFixed(2)}</p>
                </div>

                <button 
                  onClick={() => removeItem(item.id, item.metal)}
                  className="text-slate-300 hover:text-red-500 transition-colors p-2"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
