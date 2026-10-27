import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { User, Sparkles } from 'lucide-react';
import SignOutButton from '@/components/account/SignOutButton';
import StripeListener from '@/components/account/StripeListener';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AccountTabs from '@/components/account/AccountTabs';
import OrdersList from '@/components/account/OrdersList';
import ProfileForm from '@/components/account/ProfileForm';
import { company } from '@/lib/company';

export default async function AccountPage(props: { searchParams?: Promise<{ tab?: string }> }) {
  const searchParams = props.searchParams ? await props.searchParams : { tab: 'profile' };
  const tab = searchParams?.tab || 'profile';

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return (
    <div className="bg-warm-beige min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 text-gray-900 px-6 md:px-12 lg:px-24 pt-36 lg:pt-44 pb-24 font-sans">
        <div className="max-w-5xl mx-auto">
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12 border-b border-astera-200 pb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif text-astera-900 mb-2">Moj račun</h1>
              <p className="text-soft-taupe text-[11px] uppercase tracking-[0.3em] font-sans italic">
                Član od {new Date(user.created_at).getFullYear()}.
              </p>
            </div>
            <SignOutButton />
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Profile Sidebar */}
            <div className="md:col-span-1 space-y-4">
              <div className="bg-white rounded-3xl border border-black/5 shadow-md overflow-hidden transition-all duration-500 p-6 space-y-6 mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-astera-50 rounded-full flex items-center justify-center text-astera-900 border border-astera-100 shrink-0">
                    <User size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-sans font-bold text-gray-900 truncate">
                      {profile?.full_name || 'Cijenjeni klijent'}
                    </p>
                    <p className="text-[11px] font-sans text-soft-taupe truncate" title={user.email}>
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>

              <AccountTabs />

              <div className="bg-white rounded-3xl border border-black/5 shadow-md overflow-hidden p-8 relative group mt-4">
                <div className="absolute top-[-20%] right-[-20%] w-[50%] h-[50%] bg-astera-100/50 blur-[80px] rounded-full pointer-events-none transition-all duration-1000 group-hover:bg-astera-200/50" />

                <h3 className="text-lg font-serif mb-6 flex items-center gap-3 text-astera-900">
                  <Sparkles size={18} className="text-astera-500" />
                  Astera Status
                </h3>

                <StripeListener initialStripeId={profile?.stripe_customer_id || null} userId={user.id} />
              </div>
            </div>

            {/* Main Content Area */}
            <div className="md:col-span-2 space-y-8">
              {tab === 'profile' && (
                <ProfileForm profile={profile} email={user.email!} userId={user.id} />
              )}
              {tab === 'orders' && <OrdersList email={user.email!} />}
              {tab === 'payment' && (
                <div className="bg-white rounded-3xl border border-black/5 shadow-md overflow-hidden p-8 flex flex-col items-center justify-center text-center space-y-3 min-h-[260px]">
                  <h3 className="font-serif text-xl text-astera-900">Načini plaćanja</h3>
                  <p className="text-soft-taupe text-sm max-w-md">
                    Sva plaćanja odvijaju se sigurno putem certificiranog Stripe sustava prilikom naplate.
                  </p>
                </div>
              )}
              {tab === 'security' && (
                <div className="bg-white rounded-3xl border border-black/5 shadow-md overflow-hidden p-8 flex flex-col items-center justify-center text-center space-y-3 min-h-[260px]">
                  <h3 className="font-serif text-xl text-astera-900">Sigurnosne postavke</h3>
                  <p className="text-soft-taupe text-sm max-w-md">
                    Vaš korisnički račun zaštićen je enkripcijom i sigurnosnim protokolima.
                  </p>
                </div>
              )}

              <div className="pt-8 border-t border-astera-200 text-center mt-12">
                <p className="text-soft-taupe text-xs font-sans tracking-[0.06em]">
                  Trebate pomoć? Kontaktirajte našu podršku na{' '}
                  <a
                    href={`mailto:${company.email}`}
                    className="text-astera-900 font-semibold italic underline underline-offset-4 decoration-astera-300"
                  >
                    {company.email}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
