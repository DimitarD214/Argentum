'use client';

import React from 'react';
import Link from 'next/link';
import { useCheckoutStore } from '@/store/checkoutStore';
import { useCartStore } from '@/store/cartStore';
import { formatEUR } from '@/lib/pricing';
import { VAT_NOTICE } from '@/lib/company';
import { MapPin, Truck } from 'lucide-react';

interface ReviewStepProps {
  /** Terms & Conditions consent – lives in the checkout page, unchecked by default, never persisted. */
  termsAccepted: boolean;
  onTermsChange: (accepted: boolean) => void;
  termsError?: boolean;
}

export const ReviewStep = ({ termsAccepted, onTermsChange, termsError = false }: ReviewStepProps) => {
  const { customerInfo, isR1, r1Info } = useCheckoutStore();
  const getCartTotal = useCartStore((s) => s.getCartTotal);
  const total = getCartTotal();

  const labelClasses = "block text-xs uppercase font-bold tracking-[0.18em] text-slate-500 mb-2.5";
  const valClasses = "font-sans text-base font-bold text-astera-900";

  return (
    <div className="space-y-8">
      <div className="border-b border-black/10 pb-5">
        <h2 className="font-serif tracking-widest uppercase leading-tight text-astera-900 text-2xl">
          PREGLED NARUDŽBE
        </h2>
        <p className="text-slate-600 font-sans text-sm mt-1">
          Spremni ste. Provjerite podatke prije sigurnog plaćanja.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <span className={labelClasses}>Dostava Na Adresu</span>
          <div className="bg-slate-50 rounded-sm p-6 border border-slate-200 space-y-2">
            <p className={valClasses}>
              {customerInfo.firstName} {customerInfo.lastName}
            </p>
            <p className="text-slate-700 font-sans text-sm uppercase tracking-wider flex items-center gap-2 pt-1">
              <MapPin size={15} className="text-astera-700 shrink-0" />
              <span>
                {customerInfo.street} {customerInfo.houseNumber}
              </span>
            </p>
            <p className="text-slate-600 font-sans text-sm uppercase tracking-wider pl-6">
              {customerInfo.postalCode} {customerInfo.city}
            </p>
            <p className="text-slate-600 font-sans text-sm tracking-wider mt-1.5 pl-6">
              {customerInfo.phone}
            </p>
          </div>
        </div>

        <div>
          <span className={labelClasses}>Način Dostave</span>
          <div className="bg-slate-50 rounded-sm p-6 border border-slate-200 space-y-2.5">
            <div className="flex items-center gap-2.5">
              <Truck size={18} className="text-astera-800" />
              <p className={valClasses}>Besplatna Dostava na Adresu</p>
            </div>
            <p className="text-emerald-700 font-sans text-xs md:text-sm uppercase tracking-wider font-bold">
              Trošak dostave: 0,00 € (Besplatno)
            </p>
          </div>
        </div>

        {isR1 && (
          <div className="sm:col-span-2">
            <span className={labelClasses}>R1 Podaci</span>
            <div className="bg-slate-50 rounded-sm p-6 border border-slate-200">
              <p className={valClasses}>{r1Info.companyName}</p>
              <p className="text-slate-600 font-sans text-sm tracking-wider mt-1.5">
                OIB: {r1Info.oib}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Total price right above the order button (mandatory pre-contractual information) */}
      <div className="bg-warm-beige/60 border border-astera-200 rounded-sm p-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className={labelClasses}>Ukupno za platiti</p>
          <p className="font-sans text-xs text-slate-600">
            Uključuje dostavu (0,00 €) • {VAT_NOTICE}
          </p>
        </div>
        <p data-testid="review-total" className="font-serif text-3xl font-semibold text-astera-900">
          {formatEUR(total)}
        </p>
      </div>

      {/* Terms & Conditions consent: unchecked by default, required before ordering */}
      <div
        className={`rounded-sm border p-5 ${
          termsError && !termsAccepted ? 'border-red-400 bg-red-50/50' : 'border-slate-200 bg-slate-50'
        }`}
      >
        <label htmlFor="accept-terms" className="flex items-start gap-4 cursor-pointer">
          <input
            id="accept-terms"
            name="accept-terms"
            type="checkbox"
            required
            checked={termsAccepted}
            onChange={(e) => onTermsChange(e.target.checked)}
            aria-required="true"
            aria-invalid={termsError && !termsAccepted}
            className="mt-1 h-5 w-5 shrink-0 accent-astera-900 cursor-pointer"
          />
          <span className="font-sans text-sm text-slate-700 leading-relaxed">
            Pročitao/la sam i prihvaćam{' '}
            <Link href="/uvjeti-poslovanja" target="_blank" className="underline underline-offset-2 font-bold text-astera-900">
              Opće uvjete poslovanja
            </Link>{' '}
            te sam upoznat/a s{' '}
            <Link href="/pravila-privatnosti" target="_blank" className="underline underline-offset-2 font-bold text-astera-900">
              Pravilima privatnosti
            </Link>
            . Upoznat/a sam s pravom na jednostrani raskid ugovora u roku od 14 dana. *
          </span>
        </label>
        {termsError && !termsAccepted && (
          <p role="alert" className="mt-3 pl-9 font-sans text-xs text-red-600">
            Za nastavak morate prihvatiti Opće uvjete poslovanja.
          </p>
        )}
      </div>

      <p className="font-sans text-xs text-slate-600 leading-relaxed">
        Klikom na gumb &bdquo;Naruči s obvezom plaćanja&ldquo; sklapate obvezujući ugovor o kupnji i
        obvezujete se platiti naznačeni iznos.
      </p>
    </div>
  );
};
