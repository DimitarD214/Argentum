'use client';

import React from 'react';
import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';
import { Plus, Minus, X } from 'lucide-react';

export const BasketStep = () => {
  const { items, updateQuantity, removeItem, getCartTotal } = useCartStore();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-black/5 pb-6">
        <div>
          <h2 className="font-serif tracking-widest uppercase leading-tight text-astera-900 text-xl tracking-widest uppercase text-astera-900">VAŠA KOŠARICA</h2>
          <p className="text-slate-400 font-sans text-xs mt-1">Pregledajte odabrane komade.</p>
        </div>
        <span className="text-astera-600 font-sans text-[10px] font-bold tracking-widest uppercase bg-astera-50 px-4 py-2 rounded-full">{items.length} STAVKI</span>
      </div>

      <div className="space-y-6">
        {items.map((item) => (
          <div key={`${item.id}-${item.metal}`} className="flex items-center gap-6 group py-4 border-b border-slate-50 last:border-0">
            <div className="relative w-24 h-28 bg-warm-beige rounded-sm overflow-hidden flex-shrink-0">
              {item.image ? (
                <Image 
                  src={item.image} 
                  alt={item.name} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-105 mix-blend-multiply"
                  sizes="96px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-200 uppercase text-[10px] tracking-widest">Nema Slike</div>
              )}
            </div>

            <div className="flex-grow flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <h3 className="font-serif tracking-widest uppercase leading-tight text-astera-900 text-sm tracking-wide text-foreground mb-1">{item.name}</h3>
                <p className="text-slate-400 text-[10px] uppercase tracking-widest font-sans font-bold">{item.metal ? item.metal.replace('_', ' ') : 'Srebro 925'}</p>
                <p className="text-slate-400 text-[10px] mt-2 italic font-serif">€{item.price.toFixed(2)}</p>
              </div>

              <div className="flex items-center gap-8">
                <div className="flex items-center border border-slate-200 rounded-full overflow-hidden h-9 bg-slate-50">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1, item.metal)}
                    className="px-3 hover:bg-slate-200 transition-colors text-slate-500 h-full flex items-center justify-center"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="w-8 text-center font-sans font-bold text-[11px] text-astera-900">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1, item.metal)}
                    className="px-3 hover:bg-slate-200 transition-colors text-slate-500 h-full flex items-center justify-center"
                  >
                    <Plus size={12} />
                  </button>
                </div>

                <div className="text-right min-w-[80px]">
                  <p className="font-serif text-lg text-astera-900">€{(item.price * item.quantity).toFixed(2)}</p>
                </div>

                <button 
                  onClick={() => removeItem(item.id, item.metal)}
                  className="text-slate-300 hover:text-red-500 transition-colors p-2"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-50 border border-slate-100 rounded-lg p-8 mt-12 flex items-center justify-between">
        <div>
           <span className="font-serif tracking-widest uppercase leading-tight text-astera-900 text-sm tracking-widest uppercase block text-astera-900">Ukupno</span>
           <p className="text-slate-400 text-[10px] mt-1 uppercase tracking-[0.1em] font-sans font-bold">PDV UKLJUČEN</p>
        </div>
        <span className="font-serif text-3xl text-astera-900">€{getCartTotal().toFixed(2)}</span>
      </div>
    </div>
  );
};
