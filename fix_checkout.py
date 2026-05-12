import os

def write_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

# 1. Checkout Page
checkout_page = r"""'use client';

import React, { useEffect, useState } from 'react';
import { useCheckoutStore } from '@/store/checkoutStore';
import { useCartStore } from '@/store/cartStore';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBasket, Truck, ClipboardList, CreditCard, ChevronRight, ChevronLeft } from 'lucide-react';

// Components
import { BasketStep } from '@/components/checkout/BasketStep';
import { DeliveryStep } from '@/components/checkout/DeliveryStep';
import { InformationStep } from '@/components/checkout/InformationStep';
import { ReviewStep } from '@/components/checkout/ReviewStep';

const steps = [
  { id: 1, name: 'Kosarica', icon: ShoppingBasket },
  { id: 2, name: 'Dostava', icon: Truck },
  { id: 3, name: 'Podaci', icon: ClipboardList },
  { id: 4, name: 'Pregled', icon: CreditCard },
];

export default function CheckoutPage() {
  const { currentStep, nextStep, prevStep } = useCheckoutStore();
  const { items } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <BasketStep />;
      case 2: return <DeliveryStep />;
      case 3: return <InformationStep />;
      case 4: return <ReviewStep />;
      default: return <BasketStep />;
    }
  };

  if (items.length === 0) {
    return (
      <div className='min-h-[60vh] flex flex-col items-center justify-center bg-pure-white'>
        <h2 className='heading-luxury text-2xl mb-8'>Vaša košarica je prazna</h2>
        <a href='/shop' className='btn-luxury'>Natrag u trgovinu</a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pure-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Tracker */}
        <div className="mb-16">
          <div className="flex items-center justify-between relative px-2 sm:px-6">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-100 -z-10" />
            
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 transform ${
                    isActive 
                      ? 'bg-foreground text-pure-white shadow-2xl shadow-black/20 scale-110 z-10' 
                      : isCompleted
                      ? 'bg-astera-500 text-pure-white shadow-lg shadow-astera-500/20'
                      : 'bg-pure-white border border-slate-100 text-slate-300'
                  }`}>
                    {isCompleted ? <Icon size={20} className="text-pure-white" /> : <span className={`font-sans font-bold text-sm ${isActive ? 'text-pure-white' : 'text-slate-300'}`}>{step.id}</span>}
                  </div>
                  <span className={`mt-4 text-[10px] uppercase tracking-[0.2em] font-bold font-sans transition-colors duration-500 ${
                    isActive ? 'text-foreground' : 'text-slate-300'
                  }`}>
                    {step.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-pure-white min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="mt-16 flex items-center justify-between border-t border-slate-100 pt-10">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`flex items-center gap-3 px-8 py-4 rounded-xl font-sans font-bold text-[10px] uppercase tracking-[0.15em] transition-all duration-300 ${
              currentStep === 1 
                ? 'opacity-0 pointer-events-none' 
                : 'bg-pure-white text-slate-400 border border-slate-100 hover:border-slate-300 hover:text-foreground'
            }`}
          >
            <ChevronLeft size={16} strokeWidth={3} />
            <span>Prethodni korak</span>
          </button>
          
          {currentStep < 4 && (
            <button
              onClick={nextStep}
              className="flex items-center gap-3 bg-foreground text-pure-white px-12 py-4 rounded-xl font-sans font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-astera-700 transition-all duration-500 shadow-xl shadow-black/10 hover:shadow-black/20 hover:-translate-y-1"
            >
              <span>Slijedeći korak</span>
              <ChevronRight size={16} strokeWidth={3} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
"""

# 2. Basket Step
basket_step = r"""'use client';

import React from 'react';
import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';
import { Plus, Minus, X } from 'lucide-react';

export const BasketStep = () => {
  const { items, updateQuantity, removeItem, getCartTotal } = useCartStore();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <h2 className="heading-luxury text-lg tracking-widest uppercase">Vaša Košarica</h2>
        <span className="text-slate-400 font-sans text-xs">{items.length} stavki</span>
      </div>

      <div className="space-y-6">
        {items.map((item) => (
          <div key={`${item.id}-${item.metal}`} className="flex items-center gap-6 group">
            <div className="relative w-24 h-24 bg-luxury-beige rounded-2xl overflow-hidden flex-shrink-0">
              {item.image ? (
                <Image 
                  src={item.image} 
                  alt={item.name} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="96px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-200 uppercase text-[10px] tracking-widest">No Image</div>
              )}
            </div>

            <div className="flex-grow flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-sans font-bold text-sm tracking-tight text-foreground">{item.name}</h3>
                <p className="text-slate-400 text-[10px] uppercase tracking-widest mt-1">{item.metal || 'Srebro 925'}</p>
              </div>

              <div className="flex items-center gap-8">
                <div className="flex items-center border border-slate-100 rounded-lg overflow-hidden h-10">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1, item.metal)}
                    className="px-3 hover:bg-slate-50 transition-colors text-slate-400"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="w-10 text-center font-sans font-bold text-xs">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1, item.metal)}
                    className="px-3 hover:bg-slate-50 transition-colors text-slate-400"
                  >
                    <Plus size={12} />
                  </button>
                </div>

                <div className="text-right min-w-[80px]">
                  <p className="font-sans font-bold text-sm">{(item.price * item.quantity).toFixed(2)} EUR</p>
                  <p className="text-[10px] text-slate-300 mt-0.5">{item.price.toFixed(2)} EUR / kom</p>
                </div>

                <button 
                  onClick={() => removeItem(item.id, item.metal)}
                  className="text-slate-200 hover:text-red-400 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-luxury-beige rounded-3xl p-8 mt-12">
        <div className="flex items-center justify-between">
          <span className="heading-luxury text-sm tracking-widest uppercase">Ukupno za plaćanje</span>
          <span className="font-sans font-bold text-2xl">{getCartTotal().toFixed(2)} EUR</span>
        </div>
        <p className="text-slate-400 text-[10px] mt-4 uppercase tracking-[0.2em] italic">Porez (PDV) je uključen u cijenu.</p>
      </div>
    </div>
  );
};
"""

# 3. Delivery Step
delivery_step = r"""'use client';

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
        <h2 className="heading-luxury text-lg tracking-widest uppercase">Način Dostave</h2>
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
        <span className="text-xs font-sans text-slate-500">Ukupno sa dostavom :</span>
        <span className="font-sans font-bold text-lg">{total.toFixed(2)} EUR</span>
      </div>
    </div>
  );
};
"""

# 4. Information Step
information_step = r"""'use client';

import React from 'react';
import { useCheckoutStore } from '@/store/checkoutStore';
import { motion } from 'framer-motion';

export const InformationStep = () => {
  const { customerInfo, updateCustomerInfo, isR1, setR1, r1Info, updateR1Info } = useCheckoutStore();

  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateCustomerInfo({ [e.target.name]: e.target.value });
  };

  const handleR1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateR1Info({ [e.target.name]: e.target.value });
  };

  const inputClasses = "w-full bg-slate-50 border-none rounded-xl p-4 font-sans text-xs focus:ring-2 focus:ring-foreground transition-all placeholder:text-slate-300";
  const labelClasses = "block text-[9px] uppercase font-bold tracking-[0.2em] text-slate-400 mb-2";

  return (
    <div className="space-y-12">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="heading-luxury text-lg tracking-widest uppercase">Vaši Podaci</h2>
        <p className="text-slate-400 font-sans text-xs mt-1">Unesite detalje za dostavu i kontakt.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <label className={labelClasses}>Ime</label>
          <input 
            type="text" name="firstName" value={customerInfo.firstName} 
            onChange={handleInfoChange} placeholder="Unesite ime" className={inputClasses} 
          />
        </div>
        <div>
          <label className={labelClasses}>Prezime</label>
          <input 
            type="text" name="lastName" value={customerInfo.lastName} 
            onChange={handleInfoChange} placeholder="Unesite prezime" className={inputClasses} 
          />
        </div>
        <div>
          <label className={labelClasses}>Email Adresa</label>
          <input 
            type="email" name="email" value={customerInfo.email} 
            onChange={handleInfoChange} placeholder="Email za potvrdu narudžbe" className={inputClasses} 
          />
        </div>
        <div>
          <label className={labelClasses}>Broj Telefona</label>
          <input 
            type="tel" name="phone" value={customerInfo.phone} 
            onChange={handleInfoChange} placeholder="+385" className={inputClasses} 
          />
        </div>
      </div>

      <div className="pt-8 border-t border-slate-100">
        <label className={labelClasses}>Adresa Stanovanja</label>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mt-4">
          <div className="sm:col-span-2">
            <input 
              type="text" name="street" value={customerInfo.street} 
              onChange={handleInfoChange} placeholder="Ulica" className={inputClasses} 
            />
          </div>
          <div>
            <input 
              type="text" name="houseNumber" value={customerInfo.houseNumber} 
              onChange={handleInfoChange} placeholder="Broj" className={inputClasses} 
            />
          </div>
          <div>
            <input 
              type="text" name="postalCode" value={customerInfo.postalCode} 
              onChange={handleInfoChange} placeholder="P. Broj" className={inputClasses} 
            />
          </div>
          <div className="sm:col-span-4">
            <input 
              type="text" name="city" value={customerInfo.city} 
              onChange={handleInfoChange} placeholder="Grad / Mjesto" className={inputClasses} 
            />
          </div>
        </div>
      </div>

      <div className="pt-12 border-t border-slate-100">
        <div 
          onClick={() => setR1(!isR1)}
          className="flex items-center gap-4 cursor-pointer group"
        >
          <div className={`w-5 h-5 rounded border transition-all duration-300 flex items-center justify-center ${
            isR1 ? 'bg-foreground border-foreground' : 'bg-pure-white border-slate-200 group-hover:border-slate-400'
          }`}>
            {isR1 && <div className="w-2 h-2 bg-pure-white rounded-full" />}
          </div>
          <span className="font-sans font-bold text-xs tracking-tight">Trebam R1 račun za tvrtku</span>
        </div>

        {isR1 && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8"
          >
            <div>
              <label className={labelClasses}>Naziv Tvrtke</label>
              <input 
                type="text" name="companyName" value={r1Info.companyName} 
                onChange={handleR1Change} placeholder="Pun naziv tvrtke" className={inputClasses} 
              />
            </div>
            <div>
              <label className={labelClasses}>OIB</label>
              <input 
                type="text" name="oib" value={r1Info.oib} 
                onChange={handleR1Change} placeholder="OIB tvrtke" className={inputClasses} 
              />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
"""

# 5. Review Step
review_step = r"""'use client';

import React, { useState } from 'react';
import { useCheckoutStore } from '@/store/checkoutStore';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'sonner';

export const ReviewStep = () => {
  const { customerInfo, deliveryMethod, boxNowLocation, isR1, r1Info } = useCheckoutStore();
  const { items, getCartTotal } = useCartStore();
  const [loading, setLoading] = useState(false);

  const deliveryPrice = deliveryMethod === 'manual' ? 0 : deliveryMethod === 'post' ? 4.90 : 2.50;
  const total = getCartTotal() + deliveryPrice;

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({
            id: i.id,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
            metal: i.metal
          })),
          metadata: {
            email: customerInfo.email,
            customerName: `${customerInfo.firstName} ${customerInfo.lastName}`,
            deliveryMethod,
            boxNowLocation: boxNowLocation || 'N/A',
            isR1: isR1 ? 'YES' : 'NO',
            company: r1Info.companyName,
            oib: r1Info.oib
          },
          currency: 'eur'
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error('Greska prilikom kreiranja naplate');
      }
    } catch (error) {
      toast.error('Došlo je do pogreške. Pokušajte ponovno.');
    } finally {
      setLoading(false);
    }
  };

  const labelClasses = "block text-[9px] uppercase font-bold tracking-[0.2em] text-slate-300 mb-1";
  const valClasses = "font-sans text-xs font-bold";

  return (
    <div className="space-y-12">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="heading-luxury text-lg tracking-widest uppercase">Pregled Narudžbe</h2>
        <p className="text-slate-400 font-sans text-xs mt-1">Provjerite sve podatke prije konačne potvrde i plaćanja.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <span className={labelClasses}>Dostava Na</span>
            <div className="bg-slate-50 rounded-2xl p-6 mt-3 space-y-1">
              <p className={valClasses}>{customerInfo.firstName} {customerInfo.lastName}</p>
              <p className="text-slate-500 font-sans text-xs">{customerInfo.street} {customerInfo.houseNumber}</p>
              <p className="text-slate-500 font-sans text-xs">{customerInfo.postalCode} {customerInfo.city}</p>
              <p className="text-slate-500 font-sans text-xs">{customerInfo.phone}</p>
            </div>
          </div>

          <div>
            <span className={labelClasses}>Način Dostave</span>
            <div className="bg-slate-50 rounded-2xl p-6 mt-3">
              <p className={valClasses}>
                {deliveryMethod === 'manual' ? 'Osobno preuzimanje' : deliveryMethod === 'post' ? 'Dostava poštom' : 'Box Now Paketomat'}
              </p>
              {deliveryMethod === 'boxnow' && <p className="text-slate-500 font-sans text-xs mt-1 italic">{boxNowLocation}</p>}
            </div>
          </div>

          {isR1 && (
            <div>
              <span className={labelClasses}>R1 Podaci</span>
              <div className="bg-slate-50 rounded-2xl p-6 mt-3">
                <p className={valClasses}>{r1Info.companyName}</p>
                <p className="text-slate-500 font-sans text-xs mt-1">OIB: {r1Info.oib}</p>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-8">
          <div>
            <span className={labelClasses}>Sažetak Košarice</span>
            <div className="bg-luxury-beige rounded-3xl p-8 mt-3 space-y-4">
              <div className="flex justify-between text-xs font-sans">
                <span className="text-slate-500">Stavke ({items.length})</span>
                <span className="font-bold font-sans">{getCartTotal().toFixed(2)} EUR</span>
              </div>
              <div className="flex justify-between text-xs font-sans">
                <span className="text-slate-500">Dostava</span>
                <span className="font-bold font-sans">{deliveryPrice.toFixed(2)} EUR</span>
              </div>
              <div className="h-[1px] bg-slate-200/50 my-4" />
              <div className="flex justify-between items-end">
                <span className="heading-luxury text-sm uppercase">Ukupno</span>
                <span className="font-sans font-bold text-3xl tracking-tighter">{total.toFixed(2)} EUR</span>
              </div>
              <p className="text-[9px] text-slate-400 mt-6 uppercase tracking-widest text-center italic">
                Porez (PDV) je uključen u ukupnu cijenu.
              </p>
            </div>
          </div>

          <button
            onClick={handleConfirm}
            disabled={loading}
            className="w-full bg-foreground text-pure-white py-6 rounded-2xl font-sans font-bold text-xs uppercase tracking-[0.3em] hover:bg-astera-700 transition-all duration-500 shadow-2xl shadow-black/10 hover:shadow-black/20 hover:-translate-y-1 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Obrađujemo...' : 'Potvrdi i plati'}
          </button>
        </div>
      </div>
    </div>
  );
};
"""

write_file('src/app/checkout/page.tsx', checkout_page)
write_file('src/components/checkout/BasketStep.tsx', basket_step)
write_file('src/components/checkout/DeliveryStep.tsx', delivery_step)
write_file('src/components/checkout/InformationStep.tsx', information_step)
write_file('src/components/checkout/ReviewStep.tsx', review_step)

print('All checkout components rewritten with UTF-8 encoding.')
