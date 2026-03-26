import { useCartStore } from "@/store/cartStore";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, removeItem, updateQuantity, getCartTotal, getCartCount } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/50 z-[200] transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      <div 
        className={`fixed top-0 right-0 h-full w-full md:w-[450px] bg-white z-[210] shadow-2xl transform transition-transform duration-500 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"} flex flex-col`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="font-serif text-2xl tracking-wide text-astera-900">Your Basket ({getCartCount()})</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-20 h-20 bg-astera-50 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10 text-astera-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              </div>
              <div>
                <p className="font-sans text-[15px] font-medium text-black">Your basket is empty</p>
                <p className="font-sans text-[13px] text-gray-500 mt-2">Discover our newest arrivals to find your perfect piece.</p>
              </div>
              <button onClick={onClose} className="btn-astera w-full">Continue Shopping</button>
            </div>
          ) : (
            <div className="space-y-8">
              {items.map((item) => (
                <div key={`${item.id}-${item.metal}`} className="flex gap-4">
                  <div className="w-24 h-24 bg-astera-50 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden relative">
                    {item.image ? (
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    ) : (
                      <span className="text-[10px] uppercase text-astera-300 tracking-wider">Image</span>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-sans text-[14px] font-medium text-black">{item.name}</h3>
                        <button onClick={() => removeItem(item.id, item.metal)} className="text-gray-400 hover:text-red-500">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      {item.metal && <p className="font-sans text-[12px] text-gray-500 mt-1">{item.metal}</p>}
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-gray-200 rounded">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1, item.metal)} className="px-3 py-1 hover:bg-gray-50 text-gray-600 transition-colors"><Minus size={14} /></button>
                        <span className="px-2 font-sans text-[13px] w-8 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1, item.metal)} className="px-3 py-1 hover:bg-gray-50 text-gray-600 transition-colors"><Plus size={14} /></button>
                      </div>
                      <p className="font-sans text-[14px] font-medium text-black">${item.price * item.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-gray-50/50">
            <div className="flex items-center justify-between mb-6">
              <span className="font-sans text-[14px] font-medium text-black">Subtotal</span>
              <span className="font-sans text-[18px] font-medium text-black">${getCartTotal()}</span>
            </div>
            <p className="font-sans text-[12px] text-gray-500 mb-6 tracking-wide">Shipping and taxes calculated at checkout.</p>
            <Link href="/checkout" onClick={onClose} className="btn-primary w-full text-center block text-[13px] py-[18px]">
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
