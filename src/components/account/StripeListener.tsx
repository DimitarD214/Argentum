'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Loader2 } from 'lucide-react';

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
        <div className="relative">
          <div className="w-16 h-16 bg-white/5 rounded-full border border-white/10 flex items-center justify-center animate-pulse">
            <Loader2 className="w-6 h-6 text-white/20 animate-spin" />
          </div>
        </div>
        <div>
          <h4 className="text-sm font-sans font-bold text-white/90 mb-2">Setting up your premium account...</h4>
          <p className="text-xs font-sans text-white/30 max-w-xs mx-auto leading-relaxed">
            We are currently synchronizing your profile with our global payment network. This will only take a moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
        <p className="text-[10px] uppercase font-sans tracking-[0.2em] text-white/40 mb-2">Stripe Customer Reference</p>
        <p className="text-sm font-mono text-astera-400 select-all">{stripeId}</p>
      </div>
      
      <div className="flex gap-4">
        <div className="flex-1 p-6 bg-white/5 border border-white/10 rounded-2xl">
          <p className="text-[10px] uppercase font-sans tracking-[0.2em] text-white/40 mb-1">Tier</p>
          <p className="text-xs font-sans font-bold">Inner Circle</p>
        </div>
        <div className="flex-1 p-6 bg-white/5 border border-white/10 rounded-2xl">
          <p className="text-[10px] uppercase font-sans tracking-[0.2em] text-white/40 mb-1">Account Safety</p>
          <p className="text-xs font-sans font-bold text-green-500/80">Verified</p>
        </div>
      </div>
    </div>
  );
}
