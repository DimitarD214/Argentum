'use client';

import React, { useEffect, useState } from 'react';
import { useCheckoutStore } from '@/store/checkoutStore';
import { useCartStore } from '@/store/cartStore';
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
  const { getCartTotal } = useCartStore();
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

  // Initialize BoxNow Widget
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

  const total = getCartTotal() + (deliveryMethod === 'boxnow' ? 2.50 : 4.90);

  if (loadingProfile) {
    return <div className="py-12 flex justify-center"><Loader2 className="animate-spin text-astera-text/50 w-8 h-8" /></div>;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="border-b border-astera-border pb-4">
        <h2 className="heading-luxury text-lg tracking-widest uppercase">Način dostave</h2>
        <p className="text-astera-text/70 font-sans text-xs mt-1">Odaberite kako želite primiti vašu pošiljku.</p>
      </div>

      <div className="flex bg-astera-white p-1 rounded-2xl">
        <button
          onClick={() => setDeliveryMethod('post')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-sans text-xs font-bold transition-all ${
            deliveryMethod === 'post' ? 'bg-astera-white shadow-sm text-astera-dark' : 'text-astera-text/70 hover:text-slate-600'
          }`}
        >
          <Truck size={16} />
          Dostava na adresu
        </button>
        <button
          onClick={() => setDeliveryMethod('boxnow')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-sans text-xs font-bold transition-all ${
            deliveryMethod === 'boxnow' ? 'bg-astera-white shadow-sm text-astera-dark' : 'text-astera-text/70 hover:text-slate-600'
          }`}
        >
          <Box size={16} />
          Box Now Paketomat
        </button>
      </div>

      <div className="min-h-[300px]">
        {deliveryMethod === 'post' ? (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-sans font-bold uppercase tracking-widest mb-2 text-slate-500">Ulica</label>
                <input 
                  type="text" 
                  value={customerInfo.street}
                  onChange={(e) => updateCustomerInfo({ street: e.target.value })}
                  className="w-full bg-astera-white border-none rounded-xl p-4 font-sans text-xs focus:ring-2 focus:ring-foreground transition-all"
                  placeholder="Ime ulice"
                />
              </div>
              <div>
                <label className="block text-[10px] font-sans font-bold uppercase tracking-widest mb-2 text-slate-500">Kućni broj</label>
                <input 
                  type="text" 
                  value={customerInfo.houseNumber}
                  onChange={(e) => updateCustomerInfo({ houseNumber: e.target.value })}
                  className="w-full bg-astera-white border-none rounded-xl p-4 font-sans text-xs focus:ring-2 focus:ring-foreground transition-all"
                  placeholder="Broj"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-sans font-bold uppercase tracking-widest mb-2 text-slate-500">Grad</label>
                <input 
                  type="text" 
                  value={customerInfo.city}
                  onChange={(e) => updateCustomerInfo({ city: e.target.value })}
                  className="w-full bg-astera-white border-none rounded-xl p-4 font-sans text-xs focus:ring-2 focus:ring-foreground transition-all"
                  placeholder="Vaš grad"
                />
              </div>
              <div>
                <label className="block text-[10px] font-sans font-bold uppercase tracking-widest mb-2 text-slate-500">Poštanski broj</label>
                <input 
                  type="text" 
                  value={customerInfo.postalCode}
                  onChange={(e) => updateCustomerInfo({ postalCode: e.target.value })}
                  className="w-full bg-astera-white border-none rounded-xl p-4 font-sans text-xs focus:ring-2 focus:ring-foreground transition-all"
                  placeholder="10000"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-sans font-bold uppercase tracking-widest mb-2 text-slate-500">Broj telefona</label>
              <input 
                type="tel" 
                value={customerInfo.phone}
                onChange={(e) => updateCustomerInfo({ phone: e.target.value })}
                className="w-full bg-astera-white border-none rounded-xl p-4 font-sans text-xs focus:ring-2 focus:ring-foreground transition-all"
                placeholder="+385 91 123 4567"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
            {boxNowLocation && (
              <div className="p-4 bg-astera-cream text-astera-dark rounded-xl border border-astera-200 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-astera-gold mb-1">Odabrani Paketomat</p>
                  <p className="text-sm font-sans font-bold">ID: {boxNowLocation}</p>
                </div>
                <Check className="text-astera-gold" />
              </div>
            )}
            <div className="w-full h-[400px] bg-astera-border rounded-2xl overflow-hidden border border-astera-border relative">
              {!isBoxNowLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-astera-text/70 gap-3">
                  <Loader2 className="animate-spin w-6 h-6" />
                  <span className="text-xs font-sans uppercase tracking-widest">Učitavanje karte...</span>
                </div>
              )}
              <div id="boxnowmap" className="w-full h-full"></div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 pt-4">
        <div 
          onClick={() => setSaveAsDefault(!saveAsDefault)}
          className={`w-5 h-5 rounded border flex items-center justify-center cursor-pointer transition-colors ${
            saveAsDefault ? 'bg-astera-dark border-foreground text-pure-white' : 'bg-astera-white border-astera-border text-transparent'
          }`}
        >
          <Check size={14} />
        </div>
        <span className="text-xs font-sans text-slate-500 cursor-pointer select-none" onClick={() => setSaveAsDefault(!saveAsDefault)}>
          Spremi kao moju zadanu adresu/paketomat
        </span>
      </div>

      <div className="bg-astera-white rounded-2xl p-6 flex justify-between items-center">
        <span className="text-xs font-sans text-slate-500">Ukupno sa dostavom:</span>
        <span className="font-sans font-bold text-lg">{total.toFixed(2)} EUR</span>
      </div>
    </div>
  );
};
