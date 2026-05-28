declare global { interface Window { _bn_map_widget_config: any; } }
import React, { useState, useEffect } from 'react';

const DeliverySelector = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [deliveryMethod, setDeliveryMethod] = useState('home_delivery');
  const [boxnowLockerId, setBoxnowLockerId] = useState('');
  const [address, setAddress] = useState({ street: '', city: '', zip: '' });

  useEffect(() => {
    if (deliveryMethod === 'box_now') {
      window._bn_map_widget_config = {
        partnerId: process.env.NEXT_PUBLIC_BOXNOW_PARTNER_ID || "REPLACE_WITH_ID",
        parentElement: "#boxnowmap",
        afterSelect: function(selected: any) {
          setBoxnowLockerId(selected.boxnowLockerId);
        }
      };

      const scriptId = 'boxnow-map-script';
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://widget-cdn.boxnow.hr/map-widget/client/v5.js';
        script.async = true;
        document.body.appendChild(script);
      }
    }
  }, [deliveryMethod]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      deliveryMethod,
      boxnowLockerId: deliveryMethod === 'box_now' ? boxnowLockerId : null,
      shippingAddress: deliveryMethod === 'home_delivery' ? address : null
    });
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-astera-white rounded-xl shadow-lg border border-astera-border">
      <h2 className="text-2xl font-semibold mb-6 text-astera-dark tracking-tight">Delivery Method</h2>
      
      <div className="flex space-x-4 mb-8">
        <label className={`flex-1 cursor-pointer p-5 border rounded-xl flex flex-col items-center transition-all duration-200 ${deliveryMethod === 'home_delivery' ? 'border-gray-900 bg-gray-50 ring-1 ring-gray-900 shadow-sm' : 'border-astera-border hover:border-gray-300'}`}>
          <input 
            type="radio" 
            name="delivery_method" 
            value="home_delivery" 
            checked={deliveryMethod === 'home_delivery'}
            onChange={() => setDeliveryMethod('home_delivery')}
            className="sr-only"
          />
          <span className="font-medium text-astera-dark">Dostava na adresu</span>
          <span className="text-sm text-astera-text/70 mt-1">Home Delivery</span>
        </label>
        
        <label className={`flex-1 cursor-pointer p-5 border rounded-xl flex flex-col items-center transition-all duration-200 ${deliveryMethod === 'box_now' ? 'border-gray-900 bg-gray-50 ring-1 ring-gray-900 shadow-sm' : 'border-astera-border hover:border-gray-300'}`}>
          <input 
            type="radio" 
            name="delivery_method" 
            value="box_now" 
            checked={deliveryMethod === 'box_now'}
            onChange={() => setDeliveryMethod('box_now')}
            className="sr-only"
          />
          <span className="font-medium text-astera-dark">Box Now paketomat</span>
          <span className="text-sm text-astera-text/70 mt-1">Locker Pick-up</span>
        </label>
      </div>

      <form onSubmit={handleSubmit}>
        {deliveryMethod === 'home_delivery' && (
          <div className="space-y-5 animate-in fade-in duration-300">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
              <input 
                type="text" 
                required 
                value={address.street} 
                onChange={e => setAddress({...address, street: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 outline-none"
              />
            </div>
            <div className="flex space-x-4">
               <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input 
                  type="text" 
                  required 
                  value={address.city} 
                  onChange={e => setAddress({...address, city: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 outline-none"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                <input 
                  type="text" 
                  required 
                  value={address.zip} 
                  onChange={e => setAddress({...address, zip: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {deliveryMethod === 'box_now' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="p-1 bg-gray-50 rounded-xl border border-astera-border">
               <div id="boxnowmap" className="w-full h-[400px] rounded-lg overflow-hidden bg-astera-white"></div>
            </div>
            {boxnowLockerId && (
              <div className="flex items-center text-sm font-medium text-green-700 bg-green-50 p-3 rounded-lg border border-green-200">
                Locker Selected: {boxnowLockerId}
              </div>
            )}
          </div>
        )}

        <button 
          type="submit" 
          disabled={deliveryMethod === 'box_now' && !boxnowLockerId}
          className="w-full mt-8 bg-gray-900 text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed shadow-sm"
        >
          Continue to Payment
        </button>
      </form>
    </div>
  );
};

export default DeliverySelector;
