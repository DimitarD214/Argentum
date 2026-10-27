import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import Stripe from 'stripe';
import { Package } from 'lucide-react';
import OrderCard, { type OrderRecord } from './OrderCard';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy', {
  apiVersion: '2026-02-25.clover',
});

export default async function OrdersList({ email }: { email: string }) {
  const supabase = await createClient();
  const { data: orders, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_email', email);

  if (error || !orders || orders.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-black/5 shadow-md overflow-hidden p-12 text-center flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-astera-50 flex items-center justify-center text-astera-300 mb-2">
          <Package size={24} />
        </div>
        <h3 className="font-serif text-xl text-astera-900">Nema pronađenih narudžbi</h3>
        <p className="text-soft-taupe text-sm max-w-sm">
          Još niste napravili nijednu narudžbu. Istražite naše ekskluzivne kolekcije kako biste započeli svoje putovanje.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center justify-center px-10 py-4 font-sans text-[11px] font-bold tracking-[0.2em] uppercase rounded-sm bg-astera-900 text-white hover:bg-astera-800 transition-all mt-4"
        >
          Istražite kolekcije
        </Link>
      </div>
    );
  }

  // Fetch line items from Stripe.
  const ordersWithItems: OrderRecord[] = await Promise.all(
    orders.map(async (order) => {
      try {
        const lineItems = await stripe.checkout.sessions.listLineItems(order.id, { limit: 10 });
        const session = await stripe.checkout.sessions.retrieve(order.id);
        return { ...order, lineItems: lineItems.data, sessionCreated: session.created };
      } catch {
        console.error('Failed to fetch from Stripe for order', order.id);
        return { ...order, lineItems: [], sessionCreated: null };
      }
    })
  );

  // Sort by session created desc
  ordersWithItems.sort((a, b) => (b.sessionCreated || 0) - (a.sessionCreated || 0));

  const isDev = process.env.NODE_ENV === 'development';

  return (
    <div className="space-y-8">
      <h2 className="font-serif text-2xl text-astera-900 mb-6">Moje narudžbe</h2>
      {ordersWithItems.map((order) => (
        <OrderCard key={order.id} order={order} isDev={isDev} />
      ))}
    </div>
  );
}
