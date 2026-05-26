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
      className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs font-sans uppercase tracking-[0.2em]"
    >
      <LogOut size={14} />
      Sign Out
    </button>
  );
}
