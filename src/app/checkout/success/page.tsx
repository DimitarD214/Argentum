'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useCheckoutStore } from '@/store/checkoutStore';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCartStore();
  const { resetCheckout } = useCheckoutStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    clearCart();
    resetCheckout();
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-[80vh] bg-pure-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-astera-50 rounded-full flex items-center justify-center text-astera-500 animate-pulse">
            <CheckCircle size={48} strokeWidth={1.5} />
          </div>
        </div>
        
        <div className="space-y-4">
          <h1 className="heading-luxury text-3xl uppercase tracking-widest">Hvala vam na kupnji!</h1>
          <p className="text-slate-500 font-sans text-sm leading-relaxed">
            Vaša narudžba je uspješno zaprimljena. Potvrdu smo poslali na vašu email adresu.
          </p>
          {sessionId && (
            <p className="text-[10px] text-slate-300 font-sans uppercase tracking-widest">
              ID Transakcije: {sessionId.substring(0, 12)}...
            </p>
          )}
        </div>

        <div className="pt-8">
          <a 
            href="/shop" 
            className="inline-flex items-center gap-3 bg-foreground text-pure-white px-10 py-4 rounded-xl font-sans font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-astera-700 transition-all duration-500 shadow-xl shadow-black/10 hover:shadow-black/20 hover:-translate-y-1"
          >
            <span>Natrag u trgovinu</span>
            <ArrowRight size={16} strokeWidth={3} />
          </a>
        </div>
      </div>
    </div>
  );
}
