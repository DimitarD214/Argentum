'use client';
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
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-astera-200 text-astera-900 hover:text-red-700 hover:border-red-300 transition-colors text-xs font-sans font-bold uppercase tracking-[0.2em] shadow-xs cursor-pointer"
    >
      <LogOut size={14} />
      Odjava
    </button>
  );
}
