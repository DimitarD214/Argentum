'use client';

import React, { useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useCheckoutStore } from '@/store/checkoutStore';
import { useIsMounted } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCartStore();
  const { resetCheckout } = useCheckoutStore();
  const mounted = useIsMounted();

  useEffect(() => {
    clearCart();
    resetCheckout();
  }, [clearCart, resetCheckout]);

  if (!mounted) return null;

  return (
    <div className="min-h-[80vh] bg-cream flex items-center justify-center px-4 pt-36 pb-24">
      <div className="max-w-md w-full bg-white p-10 md:p-12 rounded-3xl border border-astera-200/80 shadow-xl text-center space-y-8">
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-astera-50 rounded-full flex items-center justify-center text-astera-600 animate-pulse">
            <CheckCircle size={48} strokeWidth={1.5} />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="font-serif tracking-widest uppercase leading-tight text-astera-900 text-3xl">
            Hvala vam na kupnji!
          </h1>
          <p className="text-charcoal/70 font-sans text-sm leading-relaxed">
            Vaša narudžba je uspješno zaprimljena. Potvrdu smo poslali na vašu e-mail adresu.
          </p>
          {sessionId && (
            <p className="text-[10px] text-charcoal/45 font-sans uppercase tracking-widest">
              ID Transakcije: {sessionId.substring(0, 14)}...
            </p>
          )}
        </div>

        <div className="pt-4">
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 bg-astera-900 text-white px-10 py-4 rounded-xl font-sans font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-astera-700 transition-all duration-500 shadow-lg hover:-translate-y-0.5"
          >
            <span>Natrag u trgovinu</span>
            <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="bg-cream min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="min-h-[80vh] bg-cream flex items-center justify-center font-serif text-astera-900">
              Učitavanje...
            </div>
          }
        >
          <SuccessContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
