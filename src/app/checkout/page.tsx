'use client';

import React, { useEffect, useState } from 'react';
import { useCheckoutStore } from '@/store/checkoutStore';
import { useCartStore } from '@/store/cartStore';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBasket, Truck, ClipboardList, CreditCard, ChevronRight, ChevronLeft, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'sonner';
import { formatEUR } from '@/lib/pricing';
import { VAT_NOTICE } from '@/lib/company';

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
  const { currentStep, nextStep, prevStep, customerInfo, isR1, r1Info } = useCheckoutStore();
  const { items, getCartTotal } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  // Consent is intentionally NOT in the persisted store: it must be unchecked on every new order.
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsError, setTermsError] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isStep2Valid = Boolean(
    customerInfo.street?.trim() &&
    customerInfo.city?.trim()
  );

  const isStep3Valid = Boolean(
    customerInfo.firstName?.trim() &&
    customerInfo.lastName?.trim() &&
    customerInfo.email?.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email) &&
    customerInfo.phone?.trim() && /^\+?[0-9\s\-()]{6,20}$/.test(customerInfo.phone)
  );

  const handleNext = () => {
    if (currentStep === 2 && !isStep2Valid) {
      toast.error('Molimo odaberite lokaciju na Google Karti ili upišite ulicu i grad za dostavu.');
      return;
    }

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
      } else if (!/^\+?[0-9\s\-()]{6,20}$/.test(customerInfo.phone)) {
        errors.phone = "Provjerite unesene podatke";
      }

      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    nextStep();
  };

  const handleConfirm = async () => {
    if (!termsAccepted) {
      setTermsError(true);
      toast.error('Za naručivanje morate prihvatiti Opće uvjete poslovanja.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({
            id: i.id,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
            metal: i.metal,
            size: i.size,
          })),
          metadata: {
            email: customerInfo.email,
            customerName: `${customerInfo.firstName} ${customerInfo.lastName}`,
            delivery_method: 'free_delivery',
            terms_accepted: 'true',
            terms_accepted_at: new Date().toISOString(),
            r1_requested: isR1 ? 'true' : 'false',
            company_name: r1Info.companyName || '',
            oib: r1Info.oib || '',
            phone: customerInfo.phone,
            shipping_address: JSON.stringify({
              street: customerInfo.street,
              houseNumber: customerInfo.houseNumber || 'bb',
              city: customerInfo.city,
              postalCode: customerInfo.postalCode || '',
              phone: customerInfo.phone,
              lat: customerInfo.lat,
              lng: customerInfo.lng,
            }),
          },
          saveAsDefault: useCheckoutStore.getState().saveAsDefault,
          currency: 'eur',
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error(data.error || 'Greška prilikom kreiranja naplate');
      }
    } catch {
      toast.error('Došlo je je do pogreške. Molimo pokušajte ponovno.');
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <BasketStep />;
      case 2: return <DeliveryStep />;
      case 3: return <InformationStep validationErrors={validationErrors} />;
      case 4:
        return (
          <ReviewStep
            termsAccepted={termsAccepted}
            onTermsChange={(v) => {
              setTermsAccepted(v);
              if (v) setTermsError(false);
            }}
            termsError={termsError}
          />
        );
      default: return <BasketStep />;
    }
  };

  if (items.length === 0) {
    return (
      <div className='min-h-[70vh] flex flex-col items-center justify-center bg-pure-white px-10'>
        <div className="w-20 h-20 bg-warm-beige rounded-sm flex items-center justify-center mb-8 border border-black/10">
           <ShoppingBasket size={32} strokeWidth={1.2} className="text-astera-600" />
        </div>
        <h2 className='font-serif tracking-widest uppercase leading-tight text-astera-900 text-3xl mb-4'>Vaša košarica je prazna</h2>
        <p className="text-slate-600 font-sans text-sm md:text-base mb-10 max-w-md text-center leading-relaxed">
          Zaronite u svijet umjetničke izrade i pronađite komad koji govori vašoj prepoznatljivoj eleganciji.
        </p>
        <Link href='/shop' className='bg-astera-900 text-white hover:bg-astera-800 transition-colors py-4 px-10 text-xs font-sans font-bold uppercase tracking-[0.2em] rounded-sm'>
          ISTRAŽITE KOLEKCIJU
        </Link>
      </div>
    );
  }

  const deliveryPrice = 0;
  const total = getCartTotal() + deliveryPrice;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="w-full max-w-[1600px] mx-auto flex-1 flex flex-col pt-12 pb-16 px-6 lg:px-12 xl:px-24">
        
        {/* Header with Navigation */}
        <div className="flex items-center justify-between mb-14 pb-6 border-b border-black/10 relative shrink-0">
          <Link href="/" className="group flex items-center gap-4">
             <div className="w-11 h-11 rounded-sm border border-black/15 flex items-center justify-center group-hover:bg-astera-900 group-hover:border-astera-900 transition-all duration-300">
                <ArrowLeft size={18} className="text-gray-600 group-hover:text-white transition-colors" />
             </div>
             <span className="text-xs font-sans font-bold uppercase tracking-[0.22em] text-gray-600 group-hover:text-black transition-colors hidden sm:block">POČETNA</span>
          </Link>

          <Link href="/" className="absolute left-1/2 -translate-x-1/2 group">
             <h1 className="text-[28px] md:text-[36px] font-serif font-light tracking-[0.4em] uppercase text-astera-900 transition-all duration-500 group-hover:tracking-[0.45em]">ASTERA</h1>
          </Link>

          <Link href="/shop" className="text-xs font-sans font-bold uppercase tracking-[0.22em] text-gray-600 hover:text-black transition-colors items-center gap-4 hidden sm:flex">
            <span>NASTAVI KUPOVINU</span>
            <div className="w-8 h-[1px] bg-slate-300" />
          </Link>
        </div>

        {/* Progress Tracker */}
        <div className="mb-14 w-full shrink-0">
          <div className="flex items-center justify-between relative px-2 sm:px-16">
            <div className="absolute top-6 left-8 right-8 h-[1px] bg-slate-200 -z-10" />
            
            {steps.map((step) => {
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex flex-col items-center group bg-white px-3">
                  <div className={`w-12 h-12 rounded-sm flex items-center justify-center transition-all duration-500 border ${
                    isActive 
                      ? 'bg-astera-900 text-white shadow-md border-astera-900' 
                      : isCompleted
                      ? 'bg-astera-50 text-astera-900 border-astera-300'
                      : 'bg-white border-slate-300 text-slate-500 font-light'
                  }`}>
                    {isCompleted ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" /></svg> : <span className={`font-serif text-base italic ${isActive ? 'text-white' : 'text-slate-600'}`}>{step.id}</span>}
                  </div>
                  <span className={`mt-3 text-xs uppercase tracking-[0.2em] font-bold font-sans transition-all duration-500 ${
                    isActive ? 'text-astera-900' : 'text-slate-500'
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
            <div className="bg-white p-6 md:p-10 border border-black/10 rounded-sm shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex-1 min-h-[40vh] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="h-full w-full flex flex-col"
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>

              {/* Navigation buttons inside the left block */}
              <div className="mt-12 flex items-center justify-between pt-8 border-t border-black/10">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`flex items-center gap-2 font-sans font-bold uppercase tracking-[0.2em] text-gray-600 hover:text-black py-4 px-6 text-xs cursor-pointer transition-colors ${
                    currentStep === 1 ? 'opacity-0 pointer-events-none' : ''
                  }`}
                >
                  <ChevronLeft size={18} strokeWidth={2} />
                  <span>NAZAD</span>
                </button>
                
                {currentStep < 4 ? (
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-3 bg-astera-900 text-white hover:bg-astera-800 transition-colors py-4 px-10 text-xs font-sans font-bold uppercase tracking-[0.2em] rounded-sm cursor-pointer shadow-sm"
                  >
                    <span>DALJE</span>
                    <ChevronRight size={18} strokeWidth={2} />
                  </button>
                ) : (
                  <button
                    onClick={handleConfirm}
                    disabled={loading || !termsAccepted}
                    aria-disabled={loading || !termsAccepted}
                    className="flex items-center gap-3 bg-astera-900 text-white hover:bg-black transition-colors py-4 px-8 sm:px-12 text-xs font-sans font-bold uppercase tracking-[0.2em] rounded-sm shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>{loading ? 'OBRAĐUJEMO...' : 'Naruči s obvezom plaćanja'}</span>
                    <ChevronRight size={18} strokeWidth={2} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Order Summary */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-36 bg-warm-beige/40 p-8 border border-black/10 rounded-sm w-full">
            <div className="space-y-6">
              <h3 className="font-serif tracking-widest uppercase text-astera-900 text-lg border-b border-black/10 pb-4">
                Sažetak Narudžbe
              </h3>
              
              <div className="space-y-4 max-h-[280px] overflow-y-auto custom-scrollbar pr-2">
                {items.map((item) => (
                  <div key={`${item.id}-${item.metal}-${item.size ?? ''}`} className="flex items-center gap-4 py-3 border-b border-black/5 relative">
                    <div className="relative w-16 h-20 bg-warm-beige rounded-sm overflow-hidden flex-shrink-0 border border-black/10">
                      {item.image ? (
                        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-400 uppercase">Nakit</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-sm md:text-base uppercase tracking-wider text-astera-900 truncate">{item.name}</h4>
                      <p className="text-xs font-sans font-bold text-slate-600 uppercase tracking-widest mt-0.5">{item.metal ? item.metal.replace('_', ' ') : '14k Zlato'}{item.size ? ` • Veličina ${item.size}` : ''}</p>
                      <p className="text-xs font-sans text-slate-600 mt-1">Količina: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-serif text-base font-semibold text-astera-900">{formatEUR(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3.5 pt-4 border-t border-black/10">
                <div className="flex justify-between text-xs md:text-sm font-sans">
                  <span className="text-slate-600 font-bold uppercase tracking-widest">Stavke ({items.length})</span>
                  <span className="font-bold text-astera-900">{formatEUR(getCartTotal())}</span>
                </div>
                <div className="flex justify-between text-xs md:text-sm font-sans">
                  <span className="text-slate-600 font-bold uppercase tracking-widest">Dostava</span>
                  <span className="font-bold text-emerald-700 uppercase tracking-wider">
                    Besplatna dostava ({formatEUR(0)})
                  </span>
                </div>
                <div className="h-[1px] bg-black/10" />
                <div className="flex justify-between items-end pt-2">
                  <span className="font-serif tracking-widest uppercase text-astera-900 text-sm font-bold">UKUPNO</span>
                  <span className="font-serif font-semibold text-3xl text-astera-900">{formatEUR(total)}</span>
                </div>
                <p className="text-[11px] font-sans text-slate-500 text-right">{VAT_NOTICE}</p>
              </div>

              <div className="pt-6 border-t border-black/10 text-center space-y-4">
                <p className="text-xs text-slate-600 uppercase tracking-[0.2em] font-bold">
                  SIGURNA TRANSAKCIJA • ASTERA
                </p>
                <div className="flex justify-center items-center opacity-50 grayscale hover:opacity-80 transition-opacity">
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-astera-900">Plaćanje putem Stripe</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
