'use client';

import React from 'react';
import { useCheckoutStore } from '@/store/checkoutStore';

export const ReviewStep = () => {
  const { customerInfo, deliveryMethod, boxNowLocation, isR1, r1Info } = useCheckoutStore();

  const labelClasses = "block text-[9px] uppercase font-bold tracking-[0.2em] text-slate-400 mb-2";
  const valClasses = "font-sans text-[13px] font-bold text-astera-900";

  return (
    <div className="space-y-8">
      <div className="border-b border-black/5 pb-4">
        <h2 className="font-serif tracking-widest uppercase leading-tight text-astera-900 text-lg">PREGLED NARUDŽBE</h2>
        <p className="text-slate-400 font-sans text-xs mt-1">Spremni ste. Provjerite podatke prije sigurnog plaćanja.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <span className={labelClasses}>Dostava Na</span>
          <div className="bg-slate-50/50 rounded-sm p-5 border border-slate-100 space-y-1">
            <p className={valClasses}>{customerInfo.firstName} {customerInfo.lastName}</p>
            <p className="text-slate-500 font-sans text-[10px] uppercase tracking-widest">{customerInfo.street} {customerInfo.houseNumber}</p>
            <p className="text-slate-500 font-sans text-[10px] uppercase tracking-widest">{customerInfo.postalCode} {customerInfo.city}</p>
            <p className="text-slate-500 font-sans text-[10px] tracking-widest mt-1.5">{customerInfo.phone}</p>
          </div>
        </div>

        <div>
          <span className={labelClasses}>Način Dostave</span>
          <div className="bg-slate-50/50 rounded-sm p-5 border border-slate-100">
            <p className={valClasses}>
              {deliveryMethod === 'manual' ? 'Preuzimanje u poslovnici' : deliveryMethod === 'post' ? 'Dostava na adresu' : 'Box Now Paketomat'}
            </p>
            {deliveryMethod === 'boxnow' && <p className="text-slate-500 font-sans text-[10px] tracking-widest mt-1.5 font-bold">Locker ID: {boxNowLocation}</p>}
          </div>
        </div>

        {isR1 && (
          <div className="sm:col-span-2">
            <span className={labelClasses}>R1 Podaci</span>
            <div className="bg-slate-50/50 rounded-sm p-5 border border-slate-100">
              <p className={valClasses}>{r1Info.companyName}</p>
              <p className="text-slate-500 font-sans text-[10px] tracking-widest mt-1.5">OIB: {r1Info.oib}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
