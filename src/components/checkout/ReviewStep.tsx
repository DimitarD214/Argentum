'use client';

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

  const labelClasses = "block text-[9px] uppercase font-bold tracking-[0.2em] text-slate-400 mb-2";
  const valClasses = "font-sans text-[13px] font-bold text-astera-900";

  return (
    <div className="space-y-10">
      <div className="border-b border-black/5 pb-6">
        <h2 className="font-serif tracking-widest uppercase leading-tight text-astera-900 text-xl tracking-widest uppercase text-astera-900">PREGLED NARUDŽBE</h2>
        <p className="text-slate-400 font-sans text-xs mt-1">Spremni ste. Provjerite podatke prije sigurnog plaćanja.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-10">
          <div>
            <span className={labelClasses}>Dostava Na</span>
            <div className="bg-slate-50/50 rounded-xl p-6 border border-slate-100 shadow-sm space-y-1">
              <p className={valClasses}>{customerInfo.firstName} {customerInfo.lastName}</p>
              <p className="text-slate-500 font-sans text-[11px] uppercase tracking-widest">{customerInfo.street} {customerInfo.houseNumber}</p>
              <p className="text-slate-500 font-sans text-[11px] uppercase tracking-widest">{customerInfo.postalCode} {customerInfo.city}</p>
              <p className="text-slate-500 font-sans text-[11px] tracking-widest mt-2">{customerInfo.phone}</p>
            </div>
          </div>

          <div>
            <span className={labelClasses}>Način Dostave</span>
            <div className="bg-slate-50/50 rounded-xl p-6 border border-slate-100 shadow-sm">
              <p className={valClasses}>
                {deliveryMethod === 'manual' ? 'Preuzimanje u poslovnici' : deliveryMethod === 'post' ? 'Dostava na adresu' : 'Box Now Paketomat'}
              </p>
              {deliveryMethod === 'boxnow' && <p className="text-slate-500 font-sans text-[11px] tracking-widest mt-2 font-bold">{boxNowLocation}</p>}
            </div>
          </div>

          {isR1 && (
            <div>
              <span className={labelClasses}>R1 Podaci</span>
              <div className="bg-slate-50/50 rounded-xl p-6 border border-slate-100 shadow-sm">
                <p className={valClasses}>{r1Info.companyName}</p>
                <p className="text-slate-500 font-sans text-[11px] tracking-widest mt-2">OIB: {r1Info.oib}</p>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-8 flex flex-col">
          <div className="flex-1">
            <span className={labelClasses}>Sažetak Košarice</span>
            <div className="bg-astera-50/50 rounded-xl p-8 border border-astera-100 shadow-sm space-y-5">
              <div className="flex justify-between text-xs font-sans">
                <span className="text-slate-500 font-bold uppercase tracking-widest">Stavke ({items.length})</span>
                <span className="font-bold text-astera-900">€{getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs font-sans">
                <span className="text-slate-500 font-bold uppercase tracking-widest">Dostava</span>
                <span className="font-bold text-astera-900">€{deliveryPrice.toFixed(2)}</span>
              </div>
              <div className="h-[1px] bg-astera-200/50 my-2" />
              <div className="flex justify-between items-end">
                <span className="font-serif tracking-widest uppercase leading-tight text-astera-900 text-sm uppercase text-astera-900">Ukupno</span>
                <span className="font-serif font-light text-4xl text-astera-900">€{total.toFixed(2)}</span>
              </div>
              <p className="text-[9px] text-slate-400 mt-6 uppercase tracking-[0.2em] text-center font-bold">
                Porez (PDV) je uključen
              </p>
            </div>
          </div>

          <button
            onClick={handleConfirm}
            disabled={loading}
            className="w-full btn-bespoke-elegant !bg-astera-900 !text-white hover:!bg-black py-6 rounded-lg font-sans font-bold text-[11px] uppercase tracking-[0.3em] transition-all duration-500 shadow-xl shadow-astera-900/20 hover:shadow-astera-900/40 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed border-none"
          >
            {loading ? 'OBRAĐUJEMO...' : 'SIGURNO PLAĆANJE'}
          </button>
        </div>
      </div>
    </div>
  );
};
