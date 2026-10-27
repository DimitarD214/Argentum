'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function StripeListener({
  initialStripeId,
  userId,
}: {
  initialStripeId: string | null;
  userId: string;
}) {
  const [stripeId, setStripeId] = useState<string | null>(initialStripeId);

  useEffect(() => {
    if (stripeId) return;

    const supabase = createClient();
    const channel = supabase
      .channel('stripe-sync')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'profiles', filter: `id=eq.${userId}` },
        (payload: { new: { stripe_customer_id?: string | null } }) => {
          if (payload.new.stripe_customer_id) {
            setStripeId(payload.new.stripe_customer_id);
            channel.unsubscribe();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [stripeId, userId]);

  if (!stripeId) {
    return (
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1 p-5 bg-warm-beige/60 border border-astera-200/70 rounded-2xl">
            <p className="text-[10px] uppercase font-sans tracking-[0.2em] text-soft-taupe mb-1">Status</p>
            <p className="text-xs font-sans font-bold text-astera-900">Astera Klijent</p>
          </div>
          <div className="flex-1 p-5 bg-warm-beige/60 border border-astera-200/70 rounded-2xl">
            <p className="text-[10px] uppercase font-sans tracking-[0.2em] text-soft-taupe mb-1">Sigurnost</p>
            <p className="text-xs font-sans font-bold text-emerald-700">Verificirano</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-in fade-in duration-700">
      <div className="p-5 bg-warm-beige/60 border border-astera-200/70 rounded-2xl">
        <p className="text-[10px] uppercase font-sans tracking-[0.2em] text-soft-taupe mb-1">
          Referenca klijenta
        </p>
        <p className="text-xs font-mono text-astera-900 select-all truncate">{stripeId}</p>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 p-5 bg-warm-beige/60 border border-astera-200/70 rounded-2xl">
          <p className="text-[10px] uppercase font-sans tracking-[0.2em] text-soft-taupe mb-1">Status</p>
          <p className="text-xs font-sans font-bold text-astera-900">Astera Krug</p>
        </div>
        <div className="flex-1 p-5 bg-warm-beige/60 border border-astera-200/70 rounded-2xl">
          <p className="text-[10px] uppercase font-sans tracking-[0.2em] text-soft-taupe mb-1">Sigurnost</p>
          <p className="text-xs font-sans font-bold text-emerald-700">Verificirano</p>
        </div>
      </div>
    </div>
  );
}
