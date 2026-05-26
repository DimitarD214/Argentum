import os
import base64

os.makedirs('src/components/account', exist_ok=True)

# 1. SignOutButton.tsx
signout_code = """'use client';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function SignOutButton() {
  const router = useRouter();
  
  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <button 
      onClick={handleSignOut}
      className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs font-sans uppercase tracking-[0.2em]"
    >
      <LogOut size={14} />
      Sign Out
    </button>
  );
}
"""
with open('src/components/account/SignOutButton.tsx', 'w', encoding='utf-8') as f:
    f.write(signout_code)

# 2. StripeListener.tsx
listener_code = """'use client';
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
"""
with open('src/components/account/StripeListener.tsx', 'w', encoding='utf-8') as f:
    f.write(listener_code)

# 3. Server Component account/page.tsx
page_code = """import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { User, CreditCard, Settings, Sparkles } from 'lucide-react';
import SignOutButton from '@/components/account/SignOutButton';
import StripeListener from '@/components/account/StripeListener';

export default async function AccountPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return (
    <div className="min-h-screen bg-[#030303] text-white px-24 md:px-64 py-24">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
          <div>
            <h1 className="text-4xl font-serif font-bold text-white mb-2">My Account</h1>
            <p className="text-white/40 text-[11px] uppercase tracking-[0.3em] font-sans italic">Member since 2026</p>
          </div>
          <SignOutButton />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Profile Sidebar */}
          <div className="md:col-span-1 space-y-4">
            <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white/40 border border-white/10">
                  <User size={20} />
                </div>
                <div>
                  <p className="text-xs font-sans font-bold text-white/90">{profile?.full_name || 'Valued Client'}</p>
                  <p className="text-[10px] font-sans text-white/40 truncate max-w-[140px]">{user.email}</p>
                </div>
              </div>
              
              <nav className="space-y-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 text-white text-xs font-sans transition-all">
                  <User size={14} /> Profile Information
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-white/40 hover:text-white transition-all text-xs font-sans">
                  <CreditCard size={14} /> Payment Methods
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-white/40 hover:text-white transition-all text-xs font-sans">
                  <Settings size={14} /> Security Settings
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-2 space-y-8">
            <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-8 relative overflow-hidden group">
              <div className="absolute top-[-20%] right-[-20%] w-[50%] h-[50%] bg-astera-500/5 blur-[80px] rounded-full pointer-events-none" />
              
              <h3 className="text-lg font-serif mb-6 flex items-center gap-3">
                <Sparkles size={18} className="text-astera-400" />
                Elite Status
              </h3>
              
              <StripeListener initialStripeId={profile?.stripe_customer_id || null} userId={user.id} />
            </div>
            
            <footer className="pt-8 border-t border-white/5 text-center">
              <p className="text-white/20 text-[10px] font-sans tracking-[0.1em]">
                Need assistance? Contact your private concierge at <span className="text-white/40 italic underline underline-offset-4 decoration-white/10">concierge@astera.com</span>
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
"""
with open('src/app/account/page.tsx', 'w', encoding='utf-8') as f:
    f.write(page_code)

print('Phase 4 rewrite complete')
