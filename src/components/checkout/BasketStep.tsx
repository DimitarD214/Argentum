'use client';

import React from 'react';
import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';
import { Plus, Minus, X } from 'lucide-react';
import { formatEUR } from '@/lib/pricing';
import { VAT_NOTICE } from '@/lib/company';

export const BasketStep = () => {
  const { items, updateQuantity, removeItem } = useCartStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-black/10 pb-5">
        <div>
          <h2 className="font-serif tracking-widest uppercase leading-tight text-astera-900 text-2xl">
            VAŠA KOŠARICA
          </h2>
          <p className="text-slate-600 font-sans text-sm mt-1">
            Pregledajte odabrane komade prije odabira besplatne dostave.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={`${item.id}-${item.metal}-${item.size ?? ''}`}
            className="flex items-center gap-6 group py-5 border-b border-slate-100 last:border-0 relative"
          >
            <div className="relative w-24 h-28 bg-warm-beige rounded-sm overflow-hidden flex-shrink-0 border border-black/10">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="96px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400 uppercase text-xs tracking-widest">
                  Nakit
                </div>
              )}
            </div>

            <div className="flex-grow flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif uppercase leading-tight text-astera-900 text-base md:text-lg tracking-wide mb-1">
                  {item.name}
                </h3>
                <p className="text-slate-600 text-xs uppercase tracking-widest font-sans font-bold">
                  {item.metal ? item.metal.replace('_', ' ') : '14k Zlato'}
                  {item.size ? ` • Veličina ${item.size}` : ''}
                </p>
                <p className="text-astera-800 text-sm mt-1.5 italic font-serif">
                  {formatEUR(item.price)} po komadu • {VAT_NOTICE}
                </p>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center border border-slate-300 rounded-sm overflow-hidden h-10 bg-slate-50">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.quantity - 1, item.metal, item.size)
                    }
                    className="px-3.5 hover:bg-slate-200 transition-colors text-slate-700 h-full flex items-center justify-center cursor-pointer"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-9 text-center font-sans font-bold text-sm text-astera-900">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.quantity + 1, item.metal, item.size)
                    }
                    className="px-3.5 hover:bg-slate-200 transition-colors text-slate-700 h-full flex items-center justify-center cursor-pointer"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <div className="text-right min-w-[90px]">
                  <p className="font-serif text-lg font-semibold text-astera-900">
                    {formatEUR(item.price * item.quantity)}
                  </p>
                </div>

                <button
                  onClick={() => removeItem(item.id, item.metal, item.size)}
                  className="text-slate-400 hover:text-red-600 transition-colors p-2 cursor-pointer"
                  aria-label="Ukloni proizvod"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
