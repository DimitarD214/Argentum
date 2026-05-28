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

  const labelClasses = "block text-[9px] uppercase font-bold tracking-[0.2em] text-slate-300 mb-1";
  const valClasses = "font-sans text-xs font-bold";

  return (
    <div className="space-y-12">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="heading-luxury text-lg tracking-widest uppercase">PREGLED NARUDŽBE</h2>
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
                {deliveryMethod === 'manual' ? 'Preuzimanje u poslovnici' : deliveryMethod === 'post' ? 'Dostava na adresu' : 'Box Now Paketomat'}
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
            className="w-full btn-bespoke-elegant !bg-astera-900 !text-white hover:!bg-black py-7 rounded-2xl font-sans font-bold text-[13px] uppercase tracking-[0.4em] transition-all duration-500 shadow-2xl shadow-black/10 hover:shadow-black/20 hover:-translate-y-1 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed border-none"
          >
            {loading ? 'OBRAĐUJEMO...' : 'ZAVRŠI KUPOVINU'}
          </button>
        </div>
      </div>
    </div>
  );
};
