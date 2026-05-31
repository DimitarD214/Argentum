'use client';

import React from 'react';
import { useCheckoutStore } from '@/store/checkoutStore';
import { motion, AnimatePresence } from 'framer-motion';

interface InformationStepProps {
  validationErrors?: Record<string, string>;
}

export const InformationStep = ({ validationErrors = {} }: InformationStepProps) => {
  const { customerInfo, updateCustomerInfo, isR1, setR1, r1Info, updateR1Info } = useCheckoutStore();

  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateCustomerInfo({ [e.target.name]: e.target.value });
  };

  const handleR1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateR1Info({ [e.target.name]: e.target.value });
  };

  const getInputClasses = (fieldName: string) => {
    const baseClasses = "w-full bg-transparent border-b px-0 py-3 font-sans text-[13px] text-astera-900 transition-colors placeholder:text-slate-300 outline-none";
    const errorClasses = "border-red-400 focus:border-red-500";
    const normalClasses = "border-slate-200 focus:border-astera-900";
    
    return `${baseClasses} ${validationErrors[fieldName] ? errorClasses : normalClasses}`;
  };

  const labelClasses = "block text-[9px] uppercase font-bold tracking-[0.2em] text-slate-400 mb-1";
  const errorTextClasses = "text-red-500 text-[10px] mt-1 font-sans absolute left-0 -bottom-5";

  return (
    <div className="space-y-10">
      <div className="border-b border-black/5 pb-6">
        <h2 className="heading-luxury text-xl tracking-widest uppercase text-astera-900">VAŠI PODACI</h2>
        <p className="text-slate-400 font-sans text-xs mt-1">Unesite podatke naručitelja.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
        <div className="relative mb-2">
          <label className={labelClasses}>Ime *</label>
          <input 
            type="text" name="firstName" value={customerInfo.firstName} 
            onChange={handleInfoChange} placeholder="Vaše ime" 
            className={getInputClasses("firstName")} id="input-firstName"
          />
          {validationErrors["firstName"] && <span className={errorTextClasses}>{validationErrors["firstName"]}</span>}
        </div>
        
        <div className="relative mb-2">
          <label className={labelClasses}>Prezime *</label>
          <input 
            type="text" name="lastName" value={customerInfo.lastName} 
            onChange={handleInfoChange} placeholder="Vaše prezime" 
            className={getInputClasses("lastName")} id="input-lastName"
          />
          {validationErrors["lastName"] && <span className={errorTextClasses}>{validationErrors["lastName"]}</span>}
        </div>
        
        <div className="relative mb-2">
          <label className={labelClasses}>E-mail adresa *</label>
          <input 
            type="email" name="email" value={customerInfo.email} 
            onChange={handleInfoChange} placeholder="vas.email@primjer.com" 
            className={getInputClasses("email")} id="input-email"
          />
          {validationErrors["email"] && <span className={errorTextClasses}>{validationErrors["email"]}</span>}
        </div>
        
        <div className="relative mb-2">
          <label className={labelClasses}>Broj telefona *</label>
          <input 
            type="tel" name="phone" value={customerInfo.phone} 
            onChange={handleInfoChange} placeholder="+385 91 123 4567" 
            className={getInputClasses("phone")} id="input-phone"
          />
          {validationErrors["phone"] && <span className={errorTextClasses}>{validationErrors["phone"]}</span>}
        </div>
      </div>

      <div className="pt-8 border-t border-slate-100">
        <div 
          onClick={() => setR1(!isR1)}
          className="flex items-center gap-4 cursor-pointer group"
        >
          <div className={`w-5 h-5 rounded-sm border transition-all duration-300 flex items-center justify-center ${
            isR1 ? 'bg-astera-900 border-astera-900 text-white' : 'bg-white border-slate-300 group-hover:border-astera-400 text-transparent'
          }`}>
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" /></svg>
          </div>
          <span className="font-sans font-bold text-[11px] tracking-[0.1em] uppercase text-astera-900">Trebam R1 račun za tvrtku</span>
        </div>

        <AnimatePresence>
          {isR1 && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8 mt-8">
                <div className="relative mb-2">
                  <label className={labelClasses}>Naziv tvrtke</label>
                  <input 
                    type="text" name="companyName" value={r1Info.companyName} 
                    onChange={handleR1Change} placeholder="Naziv d.o.o." 
                    className={getInputClasses("companyName")} id="input-companyName"
                  />
                </div>
                <div className="relative mb-2">
                  <label className={labelClasses}>OIB</label>
                  <input 
                    type="text" name="oib" value={r1Info.oib} 
                    onChange={handleR1Change} placeholder="Unesite OIB" 
                    className={getInputClasses("oib")} id="input-oib"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
