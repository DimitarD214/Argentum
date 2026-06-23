'use client';

import React, { useEffect, useState } from 'react';
import { useCheckoutStore } from '@/store/checkoutStore';
import { useCartStore } from '@/store/cartStore';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBasket, Truck, ClipboardList, CreditCard, ChevronRight, ChevronLeft, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

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
  const { currentStep, nextStep, prevStep, customerInfo } = useCheckoutStore();
  const { items } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

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
        <div className="w-24 h-24 bg-warm-beige rounded-full flex items-center justify-center mb-10 shadow-inner">
           <ShoppingBasket size={32} strokeWidth={1} className="text-astera-400" />
        </div>
        <h2 className='font-serif tracking-widest uppercase leading-tight text-astera-900 text-3xl md:text-4xl mb-6 tracking-[0.2em] uppercase text-astera-900'>Vaša košarica je prazna</h2>
        <p className="text-slate-400 font-sans text-sm mb-12 max-w-md text-center leading-relaxed">
          Zaronite u svijet umjetničke izrade i pronađite komad koji govori vašoj prepoznatljivoj eleganciji.
        </p>
        <Link href='/shop' className='btn-bespoke-elegant py-4 px-10 text-[10px]'>
          ISTRAŽITE KOLEKCIJU
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="w-full max-w-[1600px] mx-auto flex-1 flex flex-col pt-12 pb-16 px-6 lg:px-12 xl:px-24">
        
        {/* Header with Navigation */}
        <div className="flex items-center justify-between mb-16 pb-6 border-b border-black/5 relative shrink-0">
          <Link href="/" className="group flex items-center gap-4">
             <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-astera-900 group-hover:border-astera-900 transition-all duration-500">
                <ArrowLeft size={16} className="text-gray-400 group-hover:text-white transition-colors" />
             </div>
             <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-gray-400 group-hover:text-black transition-colors hidden sm:block">POČETNA</span>
          </Link>

          <Link href="/" className="absolute left-1/2 -translate-x-1/2 group">
             <h1 className="text-[28px] md:text-[36px] font-serif font-light tracking-[0.4em] uppercase text-astera-900 transition-all duration-700 group-hover:tracking-[0.5em]">ASTERA</h1>
          </Link>

          <Link href="/shop" className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-gray-400 hover:text-black transition-colors flex items-center gap-4 hidden sm:flex">
            <span>NASTAVI KUPOVINU</span>
            <div className="w-8 h-[1px] bg-slate-200" />
          </Link>
        </div>

        {/* Progress Tracker */}
        <div className="mb-16 w-full shrink-0">
          <div className="flex items-center justify-between relative px-2 sm:px-16">
            <div className="absolute top-5 left-8 right-8 h-[1px] bg-slate-200 -z-10" />
            
            {steps.map((step) => {
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex flex-col items-center group bg-slate-50 px-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-700 border ${
                    isActive 
                      ? 'bg-astera-900 text-white shadow-lg border-astera-900' 
                      : isCompleted
                      ? 'bg-astera-50 text-astera-900 border-astera-200'
                      : 'bg-white border-slate-200 text-slate-300 font-light'
                  }`}>
                    {isCompleted ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" /></svg> : <span className={`font-serif text-[14px] italic ${isActive ? 'text-white' : 'text-slate-400'}`}>{step.id}</span>}
                  </div>
                  <span className={`mt-4 text-[9px] uppercase tracking-[0.2em] font-bold font-sans transition-all duration-700 ${
                    isActive ? 'text-astera-900' : 'text-slate-400'
                  }`}>
                    {step.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white p-8 md:p-12 lg:p-16 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/5 min-h-[50vh]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="h-full w-full flex flex-col"
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between py-6 shrink-0">
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
          
          {currentStep < 4 && (
            <button
              onClick={handleNext}
              disabled={isNextDisabled}
              className="btn-bespoke-elegant py-4 px-12 text-[10px] tracking-[0.2em]"
            >
              <span>DALJE</span>
              <ChevronRight size={16} strokeWidth={2} className="ml-4 icon-right" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
