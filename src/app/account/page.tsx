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
    <div className="min-h-screen bg-astera-cream text-astera-text pt-40 pb-32 font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 border-b border-astera-border pb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif text-astera-dark mb-4 tracking-widest uppercase">Moj Račun</h1>
            <p className="text-astera-text/60 text-xs uppercase tracking-[0.3em] font-sans italic">Član od 2026.</p>
          </div>
          <SignOutButton />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20">
          {/* Profile Sidebar */}
          <div className="md:col-span-4 space-y-6">
            <div className="bg-astera-white p-8 rounded-3xl border border-astera-border shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-500 hover:scale-[1.01]">
              <div className="flex items-center gap-6 mb-10">
                <div className="w-16 h-16 bg-astera-cream rounded-full flex items-center justify-center text-astera-dark border border-astera-border shadow-sm">
                  <User size={24} />
                </div>
                <div>
                  <p className="text-sm font-sans font-bold text-astera-dark tracking-wide">{profile?.full_name || 'Cijenjeni Klijent'}</p>
                  <p className="text-xs font-sans text-astera-text/70 truncate max-w-[140px] tracking-wide">{user.email}</p>
                </div>
              </div>
              
              <nav className="space-y-2">
                <button className="w-full flex items-center gap-4 px-6 py-4 text-astera-dark text-xs font-sans font-bold tracking-widest uppercase border-l-2 border-astera-dark bg-astera-cream rounded-r-2xl transition-all duration-500">
                  <User size={16} /> Podaci Profila
                </button>
                <button className="w-full flex items-center gap-4 px-6 py-4 text-astera-text/70 hover:text-astera-dark border-l-2 border-transparent hover:border-astera-gold hover:bg-astera-cream rounded-r-2xl transition-all duration-500 text-xs font-sans font-bold tracking-widest uppercase">
                  <CreditCard size={16} /> Načini Plaćanja
                </button>
                <button className="w-full flex items-center gap-4 px-6 py-4 text-astera-text/70 hover:text-astera-dark border-l-2 border-transparent hover:border-astera-gold hover:bg-astera-cream rounded-r-2xl transition-all duration-500 text-xs font-sans font-bold tracking-widest uppercase">
                  <Settings size={16} /> Sigurnosne Postavke
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-8 space-y-12">
            <div className="bg-astera-white p-10 lg:p-14 rounded-3xl border border-astera-border shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative overflow-hidden group transition-all duration-500 hover:scale-[1.01]">
              <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] bg-astera-gold/10 blur-[100px] rounded-full pointer-events-none transition-all duration-1000 group-hover:bg-astera-gold/20" />
              
              <h3 className="text-2xl font-serif mb-10 flex items-center gap-4 text-astera-dark tracking-widest uppercase">
                <Sparkles size={24} className="text-astera-gold" />
                Elitni Status
              </h3>
              
              <div className="relative z-10">
                <StripeListener initialStripeId={profile?.stripe_customer_id || null} userId={user.id} />
              </div>
            </div>
            
            <footer className="pt-12 border-t border-astera-border text-center">
              <p className="text-astera-text/70 text-xs font-sans tracking-[0.1em]">
                Trebate pomoć? Kontaktirajte svog osobnog asistenta na <span className="text-astera-dark font-bold italic underline underline-offset-4 decoration-astera-gold hover:text-astera-gold transition-colors duration-300">concierge@astera.com</span>
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
