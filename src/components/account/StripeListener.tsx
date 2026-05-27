'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function StripeListener({ initialStripeId, userId }: { initialStripeId: string | null, userId: string }) {
  const [stripeId, setStripeId] = useState<string | null>(initialStripeId);

  useEffect(() => {
    if (stripeId) return;

    const supabase = createClient();
    const channel = supabase.channel('stripe-sync')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'profiles', filter: `id=eq.${userId}` },
        (payload: any) => {
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
      <div className="flex flex-col items-center justify-center py-12 text-center space-y-6">
        <div className="relative w-full max-w-xs mx-auto">
          {/* Premium Skeleton Loading Bar */}
          <div className="h-1.5 w-full bg-astera-100 rounded-full overflow-hidden relative">
            <div className="absolute top-0 left-0 h-full w-1/3 bg-astera-500 rounded-full animate-[shimmer_1.5s_infinite_linear] before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent" />
          </div>
        </div>
        <div>
          <h4 className="text-sm font-sans font-bold text-gray-900 mb-2">Setting up your premium account...</h4>
          <p className="text-xs font-sans text-soft-taupe max-w-xs mx-auto leading-relaxed">
            We are currently synchronizing your profile with our global payment network. This will only take a moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="p-6 bg-pure-white border border-gray-100 rounded-2xl shadow-sm">
        <p className="text-[10px] uppercase font-sans tracking-[0.2em] text-soft-taupe mb-2">Stripe Customer Reference</p>
        <p className="text-sm font-mono text-astera-900 select-all">{stripeId}</p>
      </div>
      
      <div className="flex gap-4">
        <div className="flex-1 p-6 bg-pure-white border border-gray-100 rounded-2xl shadow-sm">
          <p className="text-[10px] uppercase font-sans tracking-[0.2em] text-soft-taupe mb-1">Tier</p>
          <p className="text-xs font-sans font-bold text-gray-900">Inner Circle</p>
        </div>
        <div className="flex-1 p-6 bg-pure-white border border-gray-100 rounded-2xl shadow-sm">
          <p className="text-[10px] uppercase font-sans tracking-[0.2em] text-soft-taupe mb-1">Account Safety</p>
          <p className="text-xs font-sans font-bold text-emerald-600">Verified</p>
        </div>
      </div>
    </div>
  );
}
