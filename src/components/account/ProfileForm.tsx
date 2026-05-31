"use client";

import { useState } from 'react';
import { User, Mail } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { toast } from 'sonner';

export default function ProfileForm({ profile, email, userId }: { profile: any, email: string, userId: string }) {
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [isSaving, setIsSaving] = useState(false);
  const supabase = createClient();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ full_name: fullName })
        .eq('id', userId);
        
      if (error) throw error;
      
      toast.success('Profile updated successfully', {
        className: 'font-sans text-sm',
        style: {
          background: '#fdfcf8',
          color: '#1a1a1a',
          border: '1px solid rgba(0,0,0,0.05)',
        }
      });
    } catch (err: any) {
      toast.error(err.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="font-serif text-2xl text-astera-900 mb-6">Profile Information</h2>
      
      <div className="card-luxury p-8">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-soft-taupe flex items-center gap-2">
              <Mail size={12} /> Email Address (Read Only)
            </label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 outline-none font-sans text-sm text-gray-500 cursor-not-allowed"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-soft-taupe flex items-center gap-2">
              <User size={12} /> Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 bg-transparent border-b border-gray-200 focus:border-astera-900 outline-none transition-colors duration-300 font-sans text-sm text-gray-900 placeholder:text-gray-300"
              placeholder="Enter your full name"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isSaving || fullName === profile?.full_name}
            className="btn-luxury px-8 py-3 rounded-none uppercase tracking-[0.1em] text-xs font-bold disabled:opacity-50 mt-4"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}
