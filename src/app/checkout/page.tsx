'use client';

import React, { useEffect, useState } from 'react';
import { useCheckoutStore } from '@/store/checkoutStore';
import { useCartStore } from '@/store/cartStore';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBasket, Truck, ClipboardList, CreditCard, ChevronRight, ChevronLeft, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Components
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
      // Show Croatian validation errors if trying to force next
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
    if (isNextDisabled) return; // Guard clause
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
        <div className="w-28 h-28 bg-luxury-beige rounded-full flex items-center justify-center mb-10 shadow-inner">
           <ShoppingBasket size={42} strokeWidth={1} className="text-astera-300" />
        </div>
        <h2 className='heading-luxury text-3xl md:text-5xl mb-6 tracking-[0.3em] uppercase opacity-80'>Vaša košarica je prazna</h2>
        <p className="text-slate-400 font-sans text-sm md:text-base mb-16 max-w-lg text-center leading-relaxed">
          Zaronite u svijet umjetničke izrade i pronađite komad koji govori vašoj prepoznatljivoj eleganciji.
        </p>
        <Link href='/shop' className='btn-bespoke-elegant py-5 px-10'>
          ISTRAŽITE KOLEKCIJU
        </Link>
      </div>
    );
  }

  // Widescreen No-Restriction Layout
  return (
    <div className="h-screen overflow-hidden bg-pure-white flex flex-col px-8 md:px-16 lg:px-32">
      <div className="w-full h-full flex flex-col pt-12 pb-8">
        
        {/* Header with Navigation - MASSIVE SPACING */}
        <div className="flex items-center justify-between mb-16 border-b border-black/5 pb-10 relative shrink-0">
          <Link href="/" className="group flex items-center gap-6">
             <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-astera-900 group-hover:border-astera-900 transition-all duration-700">
                <ArrowLeft size={18} className="text-gray-400 group-hover:text-pure-white transition-colors" />
             </div>
             <span className="text-[12px] font-sans font-bold uppercase tracking-[0.3em] text-gray-400 group-hover:text-black transition-colors hidden sm:block">POČETNA</span>
          </Link>

          <Link href="/" className="absolute left-1/2 -translate-x-1/2 group">
             <h1 className="text-[32px] md:text-[42px] font-serif font-light tracking-[0.6em] uppercase text-astera-900 transition-all duration-700 group-hover:tracking-[0.7em]">ASTERA</h1>
          </Link>

          <Link href="/shop" className="text-[12px] font-sans font-bold uppercase tracking-[0.3em] text-gray-400 hover:text-black transition-colors flex items-center gap-4 hidden sm:flex">
            <span>NASTAVI KUPOVINU</span>
            <div className="w-10 h-[1px] bg-slate-200" />
          </Link>
        </div>

        {/* Progress Tracker - FULL WIDTH UNRESTRICTED */}
        <div className="mb-16 w-full shrink-0">
          <div className="flex items-center justify-between relative px-2 sm:px-12">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-100 -z-10" />
            
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex flex-col items-center group">
                  <div className={`w-16 h-16 rounded-[2rem] flex items-center justify-center transition-all duration-1000 transform border ${
                    isActive 
                      ? 'bg-astera-900 text-pure-white shadow-2xl shadow-astera-900/30 scale-110 z-10 border-astera-900' 
                      : isCompleted
                      ? 'bg-astera-50 text-astera-900 border-astera-100'
                      : 'bg-pure-white border-black/5 text-slate-200 font-light'
                  }`}>
                    {isCompleted ? <Icon size={22} strokeWidth={1.5} className="text-astera-900" /> : <span className={`font-serif text-[18px] italic ${isActive ? 'text-pure-white' : 'text-slate-300'}`}>{step.id}</span>}
                  </div>
                  <span className={`mt-8 text-[11px] uppercase tracking-[0.25em] font-bold font-sans transition-all duration-700 ${
                    isActive ? 'text-astera-900' : 'text-slate-300'
                  }`}>
                    {step.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Content Area - EXPANDS TO FILL ENTIRE WIDTH & HEIGHT */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-4 pb-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, scale: 0.99, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.01, y: -10 }}
              transition={{ duration: 0.5 }}
              className="h-full w-full flex flex-col"
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation - MASSIVE BUTTONS TO FILL SPACE */}
        <div className="mt-8 flex items-center justify-between border-t border-black/5 pt-10 shrink-0">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`btn-bespoke-elegant !bg-transparent !text-gray-400 hover:!text-black !py-6 !px-10 text-sm ${
              currentStep === 1 ? 'opacity-0 pointer-events-none' : ''
            }`}
          >
            <ChevronLeft size={20} strokeWidth={2} className="mr-4 icon-left" />
            <span>PRETHODNI KORAK</span>
          </button>
          
          {currentStep < 4 && (
            <button
              onClick={handleNext}
              disabled={isNextDisabled}
              className="btn-bespoke-elegant py-7 px-20 lg:px-32 text-md tracking-widest"
            >
              <span>SLIJEDEĆI KORAK</span>
              <ChevronRight size={20} strokeWidth={2} className="ml-6 icon-right" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
