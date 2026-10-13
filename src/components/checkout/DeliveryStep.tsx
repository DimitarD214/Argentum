'use client';

import React, { useEffect, useState } from 'react';
import { useCheckoutStore } from '@/store/checkoutStore';
import { Truck, Box, Check, Loader2 } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export const DeliveryStep = () => {
  const { 
    deliveryMethod, 
    setDeliveryMethod, 
    boxNowLocation, 
    setBoxNowLocation,
    customerInfo,
    updateCustomerInfo,
    saveAsDefault,
    setSaveAsDefault
  } = useCheckoutStore();
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [isBoxNowLoaded, setIsBoxNowLoaded] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: profile } = await supabase
              .from('profiles')
              .select('default_delivery_method, default_boxnow_locker_id, default_shipping_address')
              .eq('id', user.id)
              .single();

          if (profile) {
            if (profile.default_delivery_method === 'post' || profile.default_delivery_method === 'home_delivery') {
              setDeliveryMethod('post');
            } else if (profile.default_delivery_method === 'boxnow') {
              setDeliveryMethod('boxnow');
              if (profile.default_boxnow_locker_id) {
                setBoxNowLocation(profile.default_boxnow_locker_id);
              }
            }
            
            if (profile.default_shipping_address) {
              updateCustomerInfo(profile.default_shipping_address);
            }
          }
        }
      } catch (err) {
        console.error('Failed to fetch profile', err);
      } finally {
        setLoadingProfile(false);
      }
    };
    fetchProfile();
  }, [setDeliveryMethod, setBoxNowLocation, updateCustomerInfo]);

  useEffect(() => {
    if (deliveryMethod !== 'boxnow') return;

    if (!document.getElementById('boxnow-script')) {
      const script = document.createElement('script');
      script.id = 'boxnow-script';
      script.src = 'https://widget-cdn.boxnow.hr/map-widget/client/v5.js';
      script.async = true;
      script.onload = () => setIsBoxNowLoaded(true);
      document.body.appendChild(script);
    } else {
      setIsBoxNowLoaded(true);
    }

    const handleBoxNowMessage = (event: MessageEvent) => {
      if (typeof event.data === 'object' && event.data !== null && event.data.boxnow) {
        const lockerId = event.data.boxnow.lockerId || event.data.boxnow.id;
        if (lockerId) setBoxNowLocation(String(lockerId));
      }
    };
    window.addEventListener('message', handleBoxNowMessage);
    
    return () => {
      window.removeEventListener('message', handleBoxNowMessage);
    };
  }, [deliveryMethod, setBoxNowLocation]);

  if (loadingProfile) {
    return <div className="py-24 flex justify-center"><Loader2 className="animate-spin text-astera-300 w-8 h-8" /></div>;
  }

  const inputClasses = "w-full bg-transparent border-b border-slate-200 px-0 py-3 font-sans text-[13px] text-astera-900 focus:border-astera-900 transition-colors placeholder:text-slate-300 outline-none";
  const labelClasses = "block text-[9px] font-sans font-bold uppercase tracking-[0.2em] mb-1 text-slate-400";

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="border-b border-black/5 pb-4">
        <h2 className="font-serif tracking-widest uppercase leading-tight text-astera-900 text-lg">NAČIN DOSTAVE</h2>
        <p className="text-slate-400 font-sans text-xs mt-1">Odaberite kako želite primiti vašu pošiljku.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => setDeliveryMethod('post')}
          className={`flex items-center gap-4 p-5 border rounded-sm transition-all duration-300 text-left ${
            deliveryMethod === 'post' ? 'border-astera-900 bg-astera-50/50 shadow-[0_0_20px_rgba(0,0,0,0.01)]' : 'border-slate-200 hover:border-astera-300 bg-white'
          }`}
        >
          <div className={`w-9 h-9 rounded-sm flex items-center justify-center ${deliveryMethod === 'post' ? 'bg-astera-900 text-white' : 'bg-slate-100 text-slate-400'}`}>
            <Truck size={16} />
          </div>
          <div>
            <p className="font-sans font-bold text-xs uppercase tracking-widest text-astera-900">Dostava na adresu</p>
            <p className="text-[9px] text-slate-500 mt-0.5 uppercase tracking-wider font-sans">GLS Hrvatska • €4.90</p>
          </div>
        </button>

        <button
          onClick={() => setDeliveryMethod('boxnow')}
          className={`flex items-center gap-4 p-5 border rounded-sm transition-all duration-300 text-left ${
            deliveryMethod === 'boxnow' ? 'border-astera-900 bg-astera-50/50 shadow-[0_0_20px_rgba(0,0,0,0.01)]' : 'border-slate-200 hover:border-astera-300 bg-white'
          }`}
        >
          <div className={`w-9 h-9 rounded-sm flex items-center justify-center ${deliveryMethod === 'boxnow' ? 'bg-astera-900 text-white' : 'bg-slate-100 text-slate-400'}`}>
            <Box size={16} />
          </div>
          <div>
            <p className="font-sans font-bold text-xs uppercase tracking-widest text-astera-900">Box Now Paketomat</p>
            <p className="text-[9px] text-slate-500 mt-0.5 uppercase tracking-wider font-sans">Brzo preuzimanje • €2.50</p>
          </div>
        </button>
      </div>

      <div className="min-h-[280px] mt-6">
        {deliveryMethod === 'post' ? (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h3 className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-astera-900">Podaci za dostavu</h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              <div className="col-span-2 sm:col-span-1">
                <label className={labelClasses}>Ulica</label>
                <input 
                  type="text" 
                  value={customerInfo.street || ''}
                  onChange={(e) => updateCustomerInfo({ street: e.target.value })}
                  className={inputClasses}
                  placeholder="Unesite naziv ulice"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className={labelClasses}>Kućni broj</label>
                <input 
                  type="text" 
                  value={customerInfo.houseNumber || ''}
                  onChange={(e) => updateCustomerInfo({ houseNumber: e.target.value })}
                  className={inputClasses}
                  placeholder="npr. 12A"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className={labelClasses}>Grad</label>
                <input 
                  type="text" 
                  value={customerInfo.city || ''}
                  onChange={(e) => updateCustomerInfo({ city: e.target.value })}
                  className={inputClasses}
                  placeholder="Unesite grad"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className={labelClasses}>Poštanski broj</label>
                <input 
                  type="text" 
                  value={customerInfo.postalCode || ''}
                  onChange={(e) => updateCustomerInfo({ postalCode: e.target.value })}
                  className={inputClasses}
                  placeholder="npr. 10000"
                />
              </div>
              <div className="col-span-2">
                <label className={labelClasses}>Broj telefona</label>
                <input 
                  type="tel" 
                  value={customerInfo.phone || ''}
                  onChange={(e) => updateCustomerInfo({ phone: e.target.value })}
                  className={inputClasses}
                  placeholder="+385 91 123 4567"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in duration-300">
            {boxNowLocation && (
              <div className="p-4 bg-astera-50 text-astera-900 rounded-sm border border-astera-200 flex items-center justify-between">
                <div>
                  <p className="text-[8px] uppercase tracking-[0.2em] font-bold text-astera-600 mb-0.5">Odabrani Paketomat</p>
                  <p className="text-xs font-sans font-bold">ID: {boxNowLocation}</p>
                </div>
                <div className="w-6 h-6 rounded-sm bg-white flex items-center justify-center shadow-sm">
                   <Check size={14} className="text-astera-600" />
                </div>
              </div>
            )}
            <div className="w-full h-[400px] bg-slate-50 rounded-sm overflow-hidden border border-slate-200 relative">
              {!isBoxNowLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 gap-3">
                  <Loader2 className="animate-spin w-6 h-6" />
                  <span className="text-[10px] font-sans uppercase tracking-widest">Učitavanje karte...</span>
                </div>
              )}
              <div id="boxnowmap" className="w-full h-full"></div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 pt-6 mt-6">
        <div className="flex items-center gap-3">
          <div 
            onClick={() => setSaveAsDefault(!saveAsDefault)}
            className={`w-5 h-5 rounded-sm border flex items-center justify-center cursor-pointer transition-colors ${
              saveAsDefault ? 'bg-astera-900 border-astera-900 text-white' : 'bg-white border-slate-300 text-transparent'
            }`}
          >
            <Check size={14} />
          </div>
          <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-slate-500 cursor-pointer select-none" onClick={() => setSaveAsDefault(!saveAsDefault)}>
            Spremi kao moju zadanu adresu
          </span>
        </div>
      </div>
    </div>
  );
};
