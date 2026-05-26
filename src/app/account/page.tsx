import { redirect } from 'next/navigation';
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
