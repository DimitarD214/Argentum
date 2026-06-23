"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { User, Package, CreditCard, Settings } from 'lucide-react';

export default function AccountTabs() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'profile';

  const tabs = [
    { id: 'profile', label: 'Profile Information', icon: User },
    { id: 'orders', label: 'Order History', icon: Package },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard },
    { id: 'security', label: 'Security Settings', icon: Settings },
  ];

  return (
    <div className="bg-white rounded-3xl border border-black/5 shadow-md overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-xl p-6 space-y-2">
      <nav className="space-y-1">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          const Icon = tab.icon;
          
          return (
            <Link 
              key={tab.id}
              href={`?tab=${tab.id}`}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-sans transition-all duration-500 border-l-2 ${
                isActive 
                  ? 'border-astera-900 bg-astera-50 text-astera-900 font-semibold' 
                  : 'border-transparent text-soft-taupe hover:text-astera-900 hover:bg-astera-50/50 hover:border-astera-200 font-medium'
              }`}
            >
              <Icon size={16} className={isActive ? 'text-astera-900' : 'text-gray-400'} /> 
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
