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
      className="flex items-center gap-3 text-astera-text hover:text-astera-gold transition-colors duration-500 text-xs font-sans font-bold uppercase tracking-[0.2em] px-6 py-3 border border-astera-border rounded-full hover:shadow-sm hover:scale-[1.01]"
    >
      <LogOut size={16} />
      Odjava
    </button>
  );
}
