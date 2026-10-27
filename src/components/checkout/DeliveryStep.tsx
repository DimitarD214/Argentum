'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useCheckoutStore } from '@/store/checkoutStore';
import { Truck, MapPin, Search, Navigation, Check, Loader2, Sparkles } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { toast } from 'sonner';

interface AddressSuggestion {
  display_name: string;
  lat: string;
  lon: string;
  address?: {
    road?: string;
    pedestrian?: string;
    suburb?: string;
    house_number?: string;
    city?: string;
    town?: string;
    village?: string;
    municipality?: string;
    postcode?: string;
    country?: string;
  };
}

export const DeliveryStep = () => {
  const {
    customerInfo,
    updateCustomerInfo,
    saveAsDefault,
    setSaveAsDefault,
    setDeliveryMethod,
  } = useCheckoutStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchDebounceRef = useRef<NodeJS.Timeout | null>(null);

  // Non-blocking background profile prefill — never blocks UI rendering
  useEffect(() => {
    setDeliveryMethod('free_delivery');
    let isActive = true;

    const fetchProfileInBackground = async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase.auth.getSession();
        const user = data?.session?.user;
        if (!user || !isActive) return;

        const { data: profile } = await supabase
          .from('profiles')
          .select('default_shipping_address, full_name')
          .eq('id', user.id)
          .single();

        if (!isActive) return;
        const current = useCheckoutStore.getState().customerInfo;

        if (profile?.default_shipping_address && !current.street) {
          updateCustomerInfo({
            ...profile.default_shipping_address,
            email: current.email || user.email || '',
          });
        } else if (user.email && !current.email) {
          updateCustomerInfo({ email: user.email });
        }
      } catch {
        // Ignore background profile errors so checkout is never interrupted
      }
    };

    fetchProfileInBackground();
    return () => {
      isActive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);

    if (value.trim().length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    searchDebounceRef.current = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&countrycodes=hr,si,at,de,ba,rs&q=${encodeURIComponent(value)}`,
          { headers: { 'Accept-Language': 'hr' } }
        );
        const data: AddressSuggestion[] = await res.json();
        setSuggestions(data || []);
        setShowSuggestions(true);
      } catch (e) {
        console.error('Address search error:', e);
      } finally {
        setIsSearching(false);
      }
    }, 350);
  };

  const applyAddressSuggestion = (item: AddressSuggestion) => {
    const addr = item.address || {};
    const street =
      addr.road ||
      addr.pedestrian ||
      addr.suburb ||
      item.display_name.split(',')[0] ||
      '';
    const houseNumber = addr.house_number || customerInfo.houseNumber || '1';
    const city =
      addr.city || addr.town || addr.village || addr.municipality || '';
    const postalCode = addr.postcode || '';

    updateCustomerInfo({
      street,
      houseNumber,
      city,
      postalCode,
      lat: parseFloat(item.lat),
      lng: parseFloat(item.lon),
      formattedAddress: item.display_name,
    });
    setSearchQuery(item.display_name);
    setShowSuggestions(false);
    toast.success('Adresa odabrana na Google Karti');
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolokacija nije podržana u vašem pregledniku.');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&addressdetails=1&lat=${latitude}&lon=${longitude}`,
            { headers: { 'Accept-Language': 'hr' } }
          );
          const data = await res.json();
          const addr = data?.address || {};
          const street = addr.road || addr.pedestrian || addr.suburb || '';
          const houseNumber = addr.house_number || '1';
          const city =
            addr.city || addr.town || addr.village || addr.municipality || '';
          const postalCode = addr.postcode || '';

          updateCustomerInfo({
            street,
            houseNumber,
            city,
            postalCode,
            lat: latitude,
            lng: longitude,
            formattedAddress: data?.display_name || `${latitude}, ${longitude}`,
          });
          setSearchQuery(data?.display_name || '');
          toast.success('Vaša trenutna lokacija je uspješno učitana!');
        } catch {
          updateCustomerInfo({
            lat: latitude,
            lng: longitude,
          });
          toast.success('Koordinate lokacije postavljene na karti.');
        } finally {
          setIsLocating(false);
        }
      },
      () => {
        setIsLocating(false);
        toast.error(
          'Nije moguće dohvatiti lokaciju. Upišite adresu ručno ili pretražite kartu.'
        );
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const composedAddress = [
    customerInfo.street,
    customerInfo.houseNumber,
    customerInfo.postalCode,
    customerInfo.city,
  ]
    .filter(Boolean)
    .join(' ');

  const mapQuery =
    composedAddress.trim().length > 2
      ? `${composedAddress}, Croatia`
      : customerInfo.lat && customerInfo.lng
      ? `${customerInfo.lat},${customerInfo.lng}`
      : 'Zagreb, Croatia';

  const googleMapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    mapQuery
  )}&t=&z=${composedAddress.trim().length > 2 ? 16 : 12}&ie=UTF8&iwloc=&output=embed`;

  const inputClasses =
    'w-full bg-transparent border-b border-slate-300 px-0 py-3.5 font-sans text-base text-astera-900 focus:border-astera-900 transition-colors placeholder:text-slate-400 outline-none';
  const labelClasses =
    'block text-xs font-sans font-bold uppercase tracking-[0.18em] mb-1.5 text-slate-500';

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header & Free Delivery Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/10 pb-5">
        <div>
          <h2 className="font-serif tracking-widest uppercase leading-tight text-astera-900 text-2xl">
            BESPLATNA DOSTAVA NA ADRESU
          </h2>
          <p className="text-slate-600 font-sans text-sm mt-1.5">
            Odaberite lokaciju na Google Karti ili upišite adresu za besplatnu dostavu.
          </p>
        </div>
        <div className="inline-flex items-center gap-2.5 px-5 py-3 rounded-sm bg-astera-900 text-white shrink-0 self-start sm:self-auto">
          <Truck size={18} className="text-astera-200" />
          <span className="text-xs font-sans font-bold uppercase tracking-[0.2em]">
            Besplatna dostava • 0,00 €
          </span>
        </div>
      </div>

      {/* Google Maps Address Search Bar + Geolocation Button */}
      <div className="space-y-3">
        <label className={labelClasses}>
          Pretražite adresu na Google Karti
        </label>
        <div className="relative flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-astera-700 pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              onFocus={() => {
                if (suggestions.length > 0) setShowSuggestions(true);
              }}
              placeholder="Upišite ulicu, broj i grad (npr. Ilica 15, Zagreb)..."
              className="w-full pl-12 pr-10 py-4 bg-warm-beige/60 border border-astera-300 rounded-sm font-sans text-sm md:text-base text-astera-900 placeholder:text-slate-500 focus:border-astera-900 focus:bg-white outline-none transition-all"
            />
            {isSearching && (
              <Loader2
                size={18}
                className="animate-spin absolute right-4 top-1/2 -translate-y-1/2 text-astera-700"
              />
            )}

            {/* Live Autocomplete Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-astera-300 rounded-sm shadow-2xl z-50 overflow-hidden">
                {suggestions.map((item, idx) => (
                  <button
                    key={`${item.lat}-${item.lon}-${idx}`}
                    type="button"
                    onClick={() => applyAddressSuggestion(item)}
                    className="w-full text-left px-4 py-3.5 hover:bg-warm-beige/80 transition-colors border-b border-slate-100 last:border-none flex items-start gap-3 cursor-pointer"
                  >
                    <MapPin size={16} className="text-astera-700 shrink-0 mt-0.5" />
                    <span className="font-sans text-sm text-astera-900 leading-snug">
                      {item.display_name}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleUseMyLocation}
            disabled={isLocating}
            className="px-6 py-4 bg-warm-beige hover:bg-astera-100 border border-astera-300 rounded-sm text-xs font-sans font-bold uppercase tracking-[0.18em] text-astera-900 flex items-center justify-center gap-2.5 transition-colors cursor-pointer shrink-0"
          >
            {isLocating ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Navigation size={16} className="text-astera-700" />
            )}
            <span>Moja lokacija</span>
          </button>
        </div>
      </div>

      {/* Embedded Interactive Google Maps Plugin */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-sans font-bold uppercase tracking-[0.18em] text-astera-800 flex items-center gap-2">
            <MapPin size={15} />
            Google Maps prikaz lokacije dostave
          </span>
          {composedAddress && (
            <span className="text-xs font-sans font-semibold text-astera-900 bg-warm-beige px-3.5 py-1.5 rounded-full border border-astera-300">
              📍 {composedAddress}
            </span>
          )}
        </div>

        <div className="w-full h-[320px] sm:h-[360px] rounded-sm overflow-hidden border border-astera-300 shadow-inner bg-slate-100 relative">
          <iframe
            key={googleMapsEmbedUrl}
            title="Google Maps Dostava"
            src={googleMapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Manual / Editable Address Fields */}
      <div className="space-y-5 pt-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-xs md:text-sm font-sans font-bold uppercase tracking-[0.18em] text-astera-900">
            Adresa za dostavu (Upišite ili potvrdite podatke s karte)
          </h3>
          <span className="text-xs font-sans uppercase tracking-wider text-emerald-700 font-bold flex items-center gap-1.5">
            <Sparkles size={14} /> Dostava 0,00 €
          </span>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
          <div className="col-span-2 sm:col-span-1">
            <label className={labelClasses}>Ulica *</label>
            <input
              type="text"
              value={customerInfo.street || ''}
              onChange={(e) => updateCustomerInfo({ street: e.target.value })}
              className={inputClasses}
              placeholder="npr. Ilica"
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label className={labelClasses}>Kućni broj *</label>
            <input
              type="text"
              value={customerInfo.houseNumber || ''}
              onChange={(e) => updateCustomerInfo({ houseNumber: e.target.value })}
              className={inputClasses}
              placeholder="npr. 15A"
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label className={labelClasses}>Grad *</label>
            <input
              type="text"
              value={customerInfo.city || ''}
              onChange={(e) => updateCustomerInfo({ city: e.target.value })}
              className={inputClasses}
              placeholder="npr. Zagreb"
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label className={labelClasses}>Poštanski broj *</label>
            <input
              type="text"
              value={customerInfo.postalCode || ''}
              onChange={(e) => updateCustomerInfo({ postalCode: e.target.value })}
              className={inputClasses}
              placeholder="npr. 10000"
            />
          </div>
          <div className="col-span-2">
            <label className={labelClasses}>Kontakt telefon za dostavljača</label>
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

      <div className="flex items-center justify-between border-t border-slate-200 pt-6 mt-6">
        <div className="flex items-center gap-3">
          <div
            onClick={() => setSaveAsDefault(!saveAsDefault)}
            className={`w-5 h-5 rounded-sm border flex items-center justify-center cursor-pointer transition-colors ${
              saveAsDefault
                ? 'bg-astera-900 border-astera-900 text-white'
                : 'bg-white border-slate-300 text-transparent'
            }`}
          >
            <Check size={14} />
          </div>
          <span
            className="text-xs font-sans font-bold uppercase tracking-wider text-slate-600 cursor-pointer select-none"
            onClick={() => setSaveAsDefault(!saveAsDefault)}
          >
            Zapamti moju adresu za bržu buduću kupovinu
          </span>
        </div>
      </div>
    </div>
  );
};
