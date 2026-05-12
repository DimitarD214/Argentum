'use client';

import React from 'react';
import { useCheckoutStore, DeliveryMethod } from '@/store/checkoutStore';
import { useCartStore } from '@/store/cartStore';
import { Store, Truck, Box } from 'lucide-react';

const BoxNowLocations = [
  'Paketomat - Arena Centar, Zagreb',
  'Paketomat - City Center One West, Zagreb',
  'Paketomat - Mall of Split, Split',
  'Paketomat - Tower Center, Rijeka',
  'Paketomat - Portanova, Osijek',
  'Paketomat - Supernova, Zadar',
];

export const DeliveryStep = () => {
  const { deliveryMethod, setDeliveryMethod, boxNowLocation, setBoxNowLocation } = useCheckoutStore();
  const { getCartTotal } = useCartStore();

  const methods: { id: DeliveryMethod; name: string; desc: string; icon: any; price: string; priceVal: number }[] = [
    { 
      id: 'manual', 
      name: 'Preuzimanje u poslovnici', 
      desc: 'Besplatno preuzimanje u našoj glavnoj poslovnici (Zagreb).', 
      icon: Store,
      price: 'Besplatno',
      priceVal: 0
    },
    { 
      id: 'post', 
      name: 'Dostava na adresu', 
      desc: 'Dostava GLS ili HP Express službom na vaš kućni prag.', 
      icon: Truck,
      price: '4.90 EUR',
      priceVal: 4.90
    },
    { 
      id: 'boxnow', 
      name: 'Box Now Paketomat', 
      desc: 'Dostava na odabrani paketomat dostupan 24/7.', 
      icon: Box,
      price: '2.50 EUR',
      priceVal: 2.50
    },
  ];

  const currentMethod = methods.find(m => m.id === deliveryMethod);
  const total = getCartTotal() + (currentMethod?.priceVal || 0);

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="heading-luxury text-lg tracking-widest uppercase">NAČIN DOSTAVE</h2>
        <p className="text-slate-400 font-sans text-xs mt-1">Odaberite kako želite primiti vašu pošiljku.</p>
      </div>

      <div className="grid gap-4">
        {methods.map((method) => {
          const Icon = method.icon;
          const isSelected = deliveryMethod === method.id;
          
          return (
            <div 
              key={method.id}
              onClick={() => setDeliveryMethod(method.id)}
              className={`flex items-start gap-6 p-6 rounded-2xl border transition-all duration-500 cursor-pointer ${
                isSelected 
                  ? 'border-foreground bg-pure-white shadow-xl shadow-black/5 ring-1 ring-foreground' 
                  : 'border-slate-100 bg-pure-white hover:border-slate-300'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-500 ${
                isSelected ? 'bg-foreground text-pure-white' : 'bg-slate-50 text-slate-400'
              }`}>
                <Icon size={20} />
              </div>
              
              <div className="flex-grow">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-sans font-bold text-sm tracking-tight">{method.name}</h3>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${isSelected ? 'text-astera-600' : 'text-slate-400'}`}>
                    {method.price}
                  </span>
                </div>
                <p className="text-slate-400 text-xs font-sans leading-relaxed">{method.desc}</p>
                
                {isSelected && method.id === 'boxnow' && (
                  <div className="mt-6 space-y-3">
                    <label className="block text-[9px] uppercase font-bold tracking-[0.2em] text-slate-400">Odaberite Lokaciju</label>
                    <select 
                      value={boxNowLocation}
                      onChange={(e) => setBoxNowLocation(e.target.value)}
                      className="w-full bg-slate-50 border-none rounded-xl p-4 font-sans text-xs focus:ring-2 focus:ring-foreground transition-all"
                    >
                      <option value="">Odaberite paketomat...</option>
                      {BoxNowLocations.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-slate-50 rounded-2xl p-6 flex justify-between items-center">
        <span className="text-xs font-sans text-slate-500">Ukupno sa dostavom:</span>
        <span className="font-sans font-bold text-lg">{total.toFixed(2)} EUR</span>
      </div>
    </div>
  );
};
