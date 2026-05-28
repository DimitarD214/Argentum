'use client';

import React from 'react';
import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';
import { Plus, Minus, X } from 'lucide-react';

export const BasketStep = () => {
  const { items, updateQuantity, removeItem, getCartTotal } = useCartStore();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-astera-border pb-4">
        <h2 className="heading-luxury text-lg tracking-widest uppercase">VAŠA KOŠARICA</h2>
        <span className="text-astera-text/70 font-sans text-xs">{items.length} STAVKI</span>
      </div>

      <div className="space-y-6">
        {items.map((item) => (
          <div key={`${item.id}-${item.metal}`} className="flex items-center gap-6 group">
            <div className="relative w-24 h-24 bg-astera-cream rounded-2xl overflow-hidden flex-shrink-0">
              {item.image ? (
                <Image 
                  src={item.image} 
                  alt={item.name} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="96px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-astera-text/30 uppercase text-[10px] tracking-widest">Nema Slike</div>
              )}
            </div>

            <div className="flex-grow flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-sans font-bold text-sm tracking-tight text-astera-dark">{item.name}</h3>
                <p className="text-astera-text/70 text-[10px] uppercase tracking-widest mt-1">{item.metal ? item.metal.replace('_', ' ') : 'Srebro 925'}</p>
              </div>

              <div className="flex items-center gap-8">
                <div className="flex items-center border border-astera-border rounded-lg overflow-hidden h-10">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1, item.metal)}
                    className="px-3 hover:bg-astera-white transition-colors text-astera-text/70"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="w-10 text-center font-sans font-bold text-xs">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1, item.metal)}
                    className="px-3 hover:bg-astera-white transition-colors text-astera-text/70"
                  >
                    <Plus size={12} />
                  </button>
                </div>

                <div className="text-right min-w-[80px]">
                  <p className="font-sans font-bold text-sm">{(item.price * item.quantity).toFixed(2)} EUR</p>
                  <p className="text-[10px] text-astera-text/50 mt-0.5">{item.price.toFixed(2)} EUR / kom</p>
                </div>

                <button 
                  onClick={() => removeItem(item.id, item.metal)}
                  className="text-astera-text/30 hover:text-red-400 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-astera-cream rounded-3xl p-8 mt-12">
        <div className="flex items-center justify-between">
          <span className="heading-luxury text-sm tracking-widest uppercase">Ukupno za plaćanje</span>
          <span className="font-sans font-bold text-2xl">{getCartTotal().toFixed(2)} EUR</span>
        </div>
        <p className="text-astera-text/70 text-[10px] mt-4 uppercase tracking-[0.2em] italic">Porez (PDV) je uključen u cijenu.</p>
      </div>
    </div>
  );
};
