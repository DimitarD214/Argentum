'use client';

import React, { useEffect, useState } from 'react';
import { useCheckoutStore } from '@/store/checkoutStore';
import { useCartStore } from '@/store/cartStore';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBasket, Truck, ClipboardList, CreditCard, ChevronRight, ChevronLeft, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'sonner';

import { BasketStep } from '@/components/checkout/BasketStep';
import { DeliveryStep } from '@/components/checkout/DeliveryStep';
import { InformationStep } from '@/components/checkout/InformationStep';
import { ReviewStep } from '@/components/checkout/ReviewStep';

const steps = [
  { id: 1, name: 'KOŠARICA', icon: ShoppingBasket },
  { id: 2, name: 'DOSTAVA', icon: Truck },
  { id: 3, name: 'PODACI', icon: ClipboardList },
  { id: 4, name: 'PREGLED', icon: CreditCard },
];

export default function CheckoutPage() {
  const { currentStep, nextStep, prevStep, customerInfo, deliveryMethod, boxNowLocation, isR1, r1Info } = useCheckoutStore();
  const { items, getCartTotal } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isStep3Valid = Boolean(
    customerInfo.firstName?.trim() &&
    customerInfo.lastName?.trim() &&
    customerInfo.email?.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email) &&
    customerInfo.phone?.trim() && /^\+?[0-9\s\-()]{8,20}$/.test(customerInfo.phone) &&
    customerInfo.street?.trim() &&
    customerInfo.houseNumber?.trim() &&
    customerInfo.postalCode?.trim() &&
    customerInfo.city?.trim()
  );

  const isNextDisabled = currentStep === 3 ? !isStep3Valid : false;

  const handleNext = () => {
    if (currentStep === 3 && !isStep3Valid) {
      const errors: Record<string, string> = {};
      if (!customerInfo.firstName?.trim()) errors.firstName = "Polje je obavezno";
      if (!customerInfo.lastName?.trim()) errors.lastName = "Polje je obavezno";
      if (!customerInfo.email?.trim()) {
        errors.email = "Polje je obavezno";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
        errors.email = "Neispravna e-mail adresa";
      }
      if (!customerInfo.phone?.trim()) {
        errors.phone = "Polje je obavezno";
      } else if (!/^\+?[0-9\s\-()]{8,20}$/.test(customerInfo.phone)) {
         errors.phone = "Provjerite unesene podatke";
      }
      if (!customerInfo.street?.trim()) errors.street = "Polje je obavezno";
      if (!customerInfo.houseNumber?.trim()) errors.houseNumber = "Polje je obavezno";
      if (!customerInfo.postalCode?.trim()) errors.postalCode = "Polje je obavezno";
      if (!customerInfo.city?.trim()) errors.city = "Polje je obavezno";
      
      setValidationErrors(errors);
      return;
    }
    
    setValidationErrors({});
    if (isNextDisabled) return;
    nextStep();
  };

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
            delivery_method: deliveryMethod,
            boxNowLocation: deliveryMethod === 'boxnow' ? boxNowLocation : '',
            r1_requested: isR1 ? 'true' : 'false',
            company_name: r1Info.companyName || '',
            oib: r1Info.oib || '',
            phone: customerInfo.phone,
            shipping_address: JSON.stringify({
              street: customerInfo.street,
              houseNumber: customerInfo.houseNumber,
              city: customerInfo.city,
              postalCode: customerInfo.postalCode,
              phone: customerInfo.phone
            })
          },
          saveAsDefault: useCheckoutStore.getState().saveAsDefault,
          currency: 'eur'
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error('Greška prilikom kreiranja naplate');
      }
    } catch (error) {
      toast.error('Došlo je do pogreške. Molimo pokušajte ponovno.');
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <BasketStep />;
      case 2: return <DeliveryStep />;
      case 3: return <InformationStep validationErrors={validationErrors} />;
      case 4: return <ReviewStep />;
      default: return <BasketStep />;
    }
  };

  if (items.length === 0) {
    return (
      <div className='min-h-[70vh] flex flex-col items-center justify-center bg-pure-white px-10'>
        <div className="w-20 h-20 bg-warm-beige rounded-sm flex items-center justify-center mb-8 border border-black/5">
           <ShoppingBasket size={28} strokeWidth={1} className="text-astera-400" />
        </div>
        <h2 className='font-serif tracking-widest uppercase leading-tight text-astera-900 text-2xl mb-4 tracking-[0.2em] text-astera-900'>Vaša košarica je prazna</h2>
        <p className="text-slate-400 font-sans text-xs mb-10 max-w-sm text-center leading-relaxed">
          Zaronite u svijet umjetničke izrade i pronađite komad koji govori vašoj prepoznatljivoj eleganciji.
        </p>
        <Link href='/shop' className='btn-bespoke-elegant py-4 px-10 text-[10px] rounded-sm'>
          ISTRAŽITE KOLEKCIJU
        </Link>
      </div>
    );
  }

  const deliveryPrice = deliveryMethod === 'manual' ? 0 : deliveryMethod === 'post' ? 4.90 : 2.50;
  const total = getCartTotal() + deliveryPrice;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="w-full max-w-[1600px] mx-auto flex-1 flex flex-col pt-12 pb-16 px-6 lg:px-12 xl:px-24">
        
        {/* Header with Navigation */}
        <div className="flex items-center justify-between mb-16 pb-6 border-b border-black/5 relative shrink-0">
          <Link href="/" className="group flex items-center gap-4">
             <div className="w-10 h-10 rounded-sm border border-black/10 flex items-center justify-center group-hover:bg-astera-900 group-hover:border-astera-900 transition-all duration-300">
                <ArrowLeft size={16} className="text-gray-400 group-hover:text-white transition-colors" />
             </div>
             <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-gray-400 group-hover:text-black transition-colors hidden sm:block">POČETNA</span>
          </Link>

          <Link href="/" className="absolute left-1/2 -translate-x-1/2 group">
             <h1 className="text-[26px] md:text-[32px] font-serif font-light tracking-[0.4em] uppercase text-astera-900 transition-all duration-500 group-hover:tracking-[0.45em]">ASTERA</h1>
          </Link>

          <Link href="/shop" className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-gray-400 hover:text-black transition-colors flex items-center gap-4 hidden sm:flex">
            <span>NASTAVI KUPOVINU</span>
            <div className="w-8 h-[1px] bg-slate-200" />
          </Link>
        </div>

        {/* Progress Tracker */}
        <div className="mb-16 w-full shrink-0">
          <div className="flex items-center justify-between relative px-2 sm:px-16">
            <div className="absolute top-5 left-8 right-8 h-[1px] bg-slate-100 -z-10" />
            
            {steps.map((step) => {
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex flex-col items-center group bg-white px-2">
                  <div className={`w-10 h-10 rounded-sm flex items-center justify-center transition-all duration-500 border ${
                    isActive 
                      ? 'bg-astera-900 text-white shadow-md border-astera-900' 
                      : isCompleted
                      ? 'bg-astera-50 text-astera-900 border-astera-200'
                      : 'bg-white border-slate-200 text-slate-300 font-light'
                  }`}>
                    {isCompleted ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" /></svg> : <span className={`font-serif text-[13px] italic ${isActive ? 'text-white' : 'text-slate-400'}`}>{step.id}</span>}
                  </div>
                  <span className={`mt-3 text-[9px] uppercase tracking-[0.2em] font-bold font-sans transition-all duration-500 ${
                    isActive ? 'text-astera-900' : 'text-slate-400'
                  }`}>
                    {step.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Content Area - Split-Screen Layout */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start min-h-[50vh]">
          {/* Left Column: Form Content */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col w-full">
            <div className="bg-white p-6 md:p-10 border border-black/5 rounded-sm shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex-1 min-h-[40vh] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="h-full w-full flex flex-col"
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>

              {/* Navigation buttons inside the left block */}
              <div className="mt-12 flex items-center justify-between pt-8 border-t border-black/5">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`btn-bespoke-elegant !bg-transparent !text-gray-400 hover:!text-black !py-4 !px-6 text-[10px] ${
                    currentStep === 1 ? 'opacity-0 pointer-events-none' : ''
                  }`}
                >
                  <ChevronLeft size={16} strokeWidth={2} className="mr-3 icon-left" />
                  <span>NAZAD</span>
                </button>
                
                {currentStep < 4 ? (
                  <button
                    onClick={handleNext}
                    disabled={isNextDisabled}
                    className="btn-bespoke-elegant py-4 px-12 text-[10px] tracking-[0.2em] rounded-sm"
                  >
                    <span>DALJE</span>
                    <ChevronRight size={16} strokeWidth={2} className="ml-4 icon-right" />
                  </button>
                ) : (
                  <button
                    onClick={handleConfirm}
                    disabled={loading}
                    className="btn-bespoke-elegant !bg-astera-900 !text-white hover:!bg-black py-4 px-12 text-[10px] tracking-[0.2em] rounded-sm border-none shadow-md"
                  >
                    {loading ? 'OBRAĐUJEMO...' : 'SIGURNO PLAĆANJE'}
                    <ChevronRight size={16} strokeWidth={2} className="ml-4 icon-right" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Order Summary */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-36 bg-warm-beige/30 p-8 border border-black/5 rounded-sm w-full">
            <div className="space-y-6">
              <h3 className="font-serif tracking-widest uppercase text-astera-900 text-sm border-b border-black/5 pb-4">
                Sažetak Narudžbe
              </h3>
              
              <div className="space-y-4 max-h-[260px] overflow-y-auto custom-scrollbar pr-2">
                {items.map((item) => (
                  <div key={`${item.id}-${item.metal}`} className="flex items-center gap-4 py-2 border-b border-black/[0.02] relative">
                    <div className="relative w-12 h-16 bg-warm-beige rounded-sm overflow-hidden flex-shrink-0 border border-black/5">
                      {item.image ? (
                        <Image src={item.image} alt={item.name} fill className="object-cover mix-blend-multiply" sizes="48px" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[8px] text-gray-300 uppercase">Nakit</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-xs uppercase tracking-wider text-astera-900 truncate">{item.name}</h4>
                      <p className="text-[9px] font-sans font-bold text-slate-400 uppercase tracking-widest">{item.metal ? item.metal.replace('_', ' ') : 'Srebro 925'}</p>
                      <p className="text-[9px] font-sans text-slate-500 mt-0.5">Količina: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-serif text-xs text-astera-900">€{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t border-black/5">
                <div className="flex justify-between text-[11px] font-sans">
                  <span className="text-slate-400 font-bold uppercase tracking-widest">Stavke ({items.length})</span>
                  <span className="font-bold text-astera-900">€{getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[11px] font-sans">
                  <span className="text-slate-400 font-bold uppercase tracking-widest">Dostava</span>
                  <span className="font-bold text-astera-900">
                    {deliveryMethod === 'manual' ? 'Preuzimanje (€0.00)' : deliveryMethod === 'post' ? 'GLS Dostava (€4.90)' : 'Box Now Paketomat (€2.50)'}
                  </span>
                </div>
                <div className="h-[1px] bg-black/5" />
                <div className="flex justify-between items-end pt-1">
                  <span className="font-serif tracking-widest uppercase text-astera-900 text-xs font-bold">UKUPNO</span>
                  <span className="font-serif font-light text-2xl text-astera-900">€{total.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-6 border-t border-black/5 text-center space-y-4">
                <p className="text-[8px] text-slate-400 uppercase tracking-[0.25em] font-bold">
                  SIGURNA TRANSAKCIJA UZ STRIPE
                </p>
                <div className="flex justify-center items-center opacity-40 grayscale hover:opacity-60 transition-opacity">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-4 w-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
