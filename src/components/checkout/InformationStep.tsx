'use client';

import React from 'react';
import { useCheckoutStore } from '@/store/checkoutStore';
import { motion } from 'framer-motion';

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
    const baseClasses = "w-full bg-slate-50 border rounded-sm px-6 py-5 font-sans text-sm focus:ring-1 focus:ring-astera-900 transition-all placeholder:text-slate-300 h-16 outline-none";
    const errorClasses = "border-red-500 focus:ring-red-500 bg-red-50/30";
    const normalClasses = "border-transparent";
    
    return `${baseClasses} ${validationErrors[fieldName] ? errorClasses : normalClasses}`;
  };

  const labelClasses = "block text-[11px] uppercase font-bold tracking-[0.2em] text-slate-400 mb-3";
  const errorTextClasses = "text-red-500 text-[11px] mt-2 font-sans absolute left-2 bottom-0";

  return (
    <div className="flex flex-col h-full bg-pure-white w-full">
      {/* FORM SECTION - MASSIVE WIDTH & HEIGHT */}
      <div className="space-y-12">
        <div className="border-b border-black/5 pb-6">
          <h2 className="heading-luxury text-xl tracking-widest uppercase text-astera-900">VAŠI PODACI</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
          <div className="relative pb-8 pt-2">
            <label className={labelClasses}>Ime *</label>
            <input 
              type="text" name="firstName" value={customerInfo.firstName} 
              onChange={handleInfoChange} placeholder="Ime" 
              className={getInputClasses("firstName")} id="input-firstName"
            />
            {validationErrors["firstName"] && <span className={errorTextClasses}>{validationErrors["firstName"]}</span>}
          </div>
          
          <div className="relative pb-8 pt-2">
            <label className={labelClasses}>Prezime *</label>
            <input 
              type="text" name="lastName" value={customerInfo.lastName} 
              onChange={handleInfoChange} placeholder="Prezime" 
              className={getInputClasses("lastName")} id="input-lastName"
            />
            {validationErrors["lastName"] && <span className={errorTextClasses}>{validationErrors["lastName"]}</span>}
          </div>
          
          <div className="relative pb-8 pt-2">
            <label className={labelClasses}>E-mail adresa *</label>
            <input 
              type="email" name="email" value={customerInfo.email} 
              onChange={handleInfoChange} placeholder="E-mail" 
              className={getInputClasses("email")} id="input-email"
            />
            {validationErrors["email"] && <span className={errorTextClasses}>{validationErrors["email"]}</span>}
          </div>
          
          <div className="relative pb-8 pt-2">
            <label className={labelClasses}>Broj telefona *</label>
            <input 
              type="tel" name="phone" value={customerInfo.phone} 
              onChange={handleInfoChange} placeholder="+385..." 
              className={getInputClasses("phone")} id="input-phone"
            />
            {validationErrors["phone"] && <span className={errorTextClasses}>{validationErrors["phone"]}</span>}
          </div>
        </div>

        <div className="pt-8 border-t border-black/5">
          <label className={labelClasses}>Adresa stanovanja *</label>
          
          {/* STRICT SINGLE LINE GRID, BUT STRETCHED */}
          <div className="grid grid-cols-12 gap-x-8 gap-y-6 mt-4">
            <div className="col-span-12 sm:col-span-5 relative pb-8 pt-2">
              <input 
                type="text" name="street" value={customerInfo.street} 
                onChange={handleInfoChange} placeholder="Ulica" 
                className={getInputClasses("street")} id="input-street"
              />
              {validationErrors["street"] && <span className={errorTextClasses}>{validationErrors["street"]}</span>}
            </div>
            
            <div className="col-span-6 sm:col-span-2 relative pb-8 pt-2">
              <input 
                type="text" name="houseNumber" value={customerInfo.houseNumber} 
                onChange={handleInfoChange} placeholder="Kućni broj" 
                className={getInputClasses("houseNumber")} id="input-houseNumber"
              />
              {validationErrors["houseNumber"] && <span className={errorTextClasses}>{validationErrors["houseNumber"]}</span>}
            </div>
            
            <div className="col-span-6 sm:col-span-2 relative pb-8 pt-2">
              <input 
                type="text" name="postalCode" value={customerInfo.postalCode} 
                onChange={handleInfoChange} placeholder="Poštanski broj" 
                className={getInputClasses("postalCode")} id="input-postalCode"
              />
              {validationErrors["postalCode"] && <span className={errorTextClasses}>{validationErrors["postalCode"]}</span>}
            </div>
            
            <div className="col-span-12 sm:col-span-3 relative pb-8 pt-2">
              <input 
                type="text" name="city" value={customerInfo.city} 
                onChange={handleInfoChange} placeholder="Grad / Mjesto" 
                className={getInputClasses("city")} id="input-city"
              />
              {validationErrors["city"] && <span className={errorTextClasses}>{validationErrors["city"]}</span>}
            </div>
          </div>
        </div>

        <div className="pt-4">
          <div 
            onClick={() => setR1(!isR1)}
            className="flex items-center gap-4 cursor-pointer group"
          >
            <div className={`w-5 h-5 rounded-sm border transition-all duration-300 flex items-center justify-center ${
              isR1 ? 'bg-astera-900 border-astera-900' : 'bg-pure-white border-slate-300 group-hover:border-astera-400'
            }`}>
              {isR1 && <div className="w-2 h-2 bg-pure-white" />}
            </div>
            <span className="font-sans font-bold text-xs tracking-widest uppercase text-slate-500">Trebam R1 račun za tvrtku</span>
          </div>

          {isR1 && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10 mt-8 overflow-visible"
            >
              <div className="relative pb-8 pt-2">
                <input 
                  type="text" name="companyName" value={r1Info.companyName} 
                  onChange={handleR1Change} placeholder="Naziv tvrtke" 
                  className={getInputClasses("companyName")} id="input-companyName"
                />
              </div>
              <div className="relative pb-8 pt-2">
                <input 
                  type="text" name="oib" value={r1Info.oib} 
                  onChange={handleR1Change} placeholder="OIB" 
                  className={getInputClasses("oib")} id="input-oib"
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* NEW: CUSTOMER REVIEWS SECTION (Fills remaining white space on massive screens) */}
      <div className="mt-auto pt-16 border-t border-black/5 flex-none relative hidden md:block">
        <h3 className="heading-luxury text-sm text-center tracking-[0.4em] uppercase opacity-50 mb-10">Recenzije Kupaca</h3>
        <div className="grid grid-cols-2 gap-20 px-12">
          
          <div className="text-center space-y-6">
            <div className="flex justify-center gap-1 text-astera-600">
               {'★'.repeat(5).split('').map((star, i) => <span key={i} className="text-lg">{star}</span>)}
            </div>
            <p className="font-serif italic text-base text-slate-500 leading-relaxed px-8">
              "Predivno iskustvo. Nakit je uživo još ljepši, prepun detalja, a dostava je bila brza i elegantno zapakirana. Apsolutna preporuka za sve koji traže luksuz."
            </p>
            <span className="block text-xs font-bold uppercase tracking-[0.3em] text-astera-900">— Mia H., Zagreb</span>
          </div>

          <div className="text-center space-y-6">
            <div className="flex justify-center gap-1 text-astera-600">
               {'★'.repeat(5).split('').map((star, i) => <span key={i} className="text-lg">{star}</span>)}
            </div>
            <p className="font-serif italic text-base text-slate-500 leading-relaxed px-8">
              "Kupovao sam zaručnički prsten i usluga je bila besprijekorna od početka do kraja. Izuzetno profesionalno osoblje i istinska kvaliteta izrade."
            </p>
            <span className="block text-xs font-bold uppercase tracking-[0.3em] text-astera-900">— Luka P., Split</span>
          </div>

        </div>
      </div>
    </div>
  );
};
