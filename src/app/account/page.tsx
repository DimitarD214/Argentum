import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { User, CreditCard, Settings, Sparkles } from 'lucide-react';
import SignOutButton from '@/components/account/SignOutButton';
import StripeListener from '@/components/account/StripeListener';
import Navbar from '@/components/Navbar';

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
    <>
      <Navbar />
      <div className="min-h-screen bg-luxury-beige text-gray-900 px-6 md:px-24 lg:px-64 pt-[180px] pb-24 font-sans">
        <div className="max-w-4xl mx-auto">
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 border-b border-gray-200 pb-8">
            <div>
              <h1 className="text-4xl font-serif text-astera-900 mb-2">My Account</h1>
              <p className="text-soft-taupe text-[11px] uppercase tracking-[0.3em] font-sans italic">Member since 2026</p>
            </div>
            <SignOutButton />
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Profile Sidebar */}
            <div className="md:col-span-1 space-y-4">
              <div className="card-luxury p-6 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-astera-50 rounded-full flex items-center justify-center text-astera-900 border border-astera-100">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-sans font-bold text-gray-900">{profile?.full_name || 'Valued Client'}</p>
                    <p className="text-[10px] font-sans text-soft-taupe truncate max-w-[140px]">{user.email}</p>
                  </div>
                </div>
                
                <nav className="space-y-1">
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-astera-900 text-xs font-sans font-semibold border-l-2 border-astera-900 bg-astera-50 transition-all duration-500">
                    <User size={14} /> Profile Information
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-astera-50 text-soft-taupe hover:text-astera-900 border-l-2 border-transparent hover:border-astera-200 transition-all duration-500 text-xs font-sans">
                    <CreditCard size={14} /> Payment Methods
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-astera-50 text-soft-taupe hover:text-astera-900 border-l-2 border-transparent hover:border-astera-200 transition-all duration-500 text-xs font-sans">
                    <Settings size={14} /> Security Settings
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="md:col-span-2 space-y-8">
              <div className="card-luxury p-8 relative overflow-hidden group">
                <div className="absolute top-[-20%] right-[-20%] w-[50%] h-[50%] bg-astera-100/50 blur-[80px] rounded-full pointer-events-none transition-all duration-1000 group-hover:bg-astera-200/50" />
                
                <h3 className="text-lg font-serif mb-6 flex items-center gap-3 text-astera-900">
                  <Sparkles size={18} className="text-astera-500" />
                  Elite Status
                </h3>
                
                <StripeListener initialStripeId={profile?.stripe_customer_id || null} userId={user.id} />
              </div>
              
              <footer className="pt-8 border-t border-gray-200 text-center">
                <p className="text-soft-taupe text-[10px] font-sans tracking-[0.1em]">
                  Need assistance? Contact your private concierge at <span className="text-astera-900 italic underline underline-offset-4 decoration-astera-200">concierge@astera.com</span>
                </p>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
