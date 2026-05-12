"use client";
import { useCartStore } from "@/store/cartStore";
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, removeItem, updateQuantity, getCartTotal, getCartCount } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[200] backdrop-blur-xl"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 right-0 h-full w-full md:w-[600px] bg-white z-[210] shadow-[0_0_100px_rgba(0,0,0,0.25)] flex flex-col"
      >
        {/* Header - SPACIOUS MASTERPIECE */}
        <div className="flex items-center justify-between p-12 md:p-16 border-b border-black/5 bg-luxury-beige/50">
          <div className="flex items-center gap-8">
             <div className="w-14 h-14 bg-astera-50 rounded-[2rem] flex items-center justify-center text-astera-700 shadow-inner">
                <ShoppingBag size={24} strokeWidth={1} />
             </div>
             <div className="space-y-1">
                <h2 className="font-serif text-3xl tracking-[0.2em] uppercase text-astera-900">Vaša košarica</h2>
                <div className="flex items-center gap-4">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                   <span className="font-sans font-bold text-[11px] uppercase tracking-[0.3em] text-gray-400">{getCartCount()} RUČNO RAĐENIH ARTIKALA</span>
                </div>
             </div>
          </div>
          <button onClick={onClose} className="w-14 h-14 flex items-center justify-center rounded-full border border-black/5 text-gray-400 hover:text-black hover:bg-white hover:shadow-2xl transition-all duration-700 hover:rotate-90">
            <X size={24} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-12 md:p-16">
          <AnimatePresence mode="popLayout">
            {items.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="h-full flex flex-col items-center justify-center text-center space-y-14"
              >
                <div className="relative">
                  <div className="w-32 h-32 bg-astera-50 rounded-full flex items-center justify-center animate-pulse">
                    <ShoppingBag size={48} strokeWidth={0.5} className="text-astera-200" />
                  </div>
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center text-2xl border border-black/5">🏺</div>
                </div>
                <div className="space-y-6">
                  <p className="font-serif text-[28px] tracking-[0.25em] uppercase text-astera-900">Vaša košarica je prazna</p>
                  <p className="font-sans text-[15px] text-gray-400 max-w-[320px] mx-auto leading-relaxed italic opacity-80">
                    Umjetničko majstorstvo je na korak od vas. Istražite naše najfinije kolekcije.
                  </p>
                </div>
                <Link 
                  href="/shop" 
                  onClick={onClose}
                  className="group flex items-center gap-6 text-[13px] font-bold uppercase tracking-[0.45em] text-astera-900 hover:text-black transition-all duration-700 bg-luxury-beige px-10 py-5 rounded-full hover:shadow-2xl shadow-luxury-beige/50"
                >
                  <span>ISTRAŽITE PROLJEĆE 2026</span>
                  <ArrowRight size={20} className="group-hover:translate-x-3 transition-transform duration-700" />
                </Link>
              </motion.div>
            ) : (
              <div className="space-y-16">
                {items.map((item, idx) => (
                  <motion.div 
                    layout
                    key={`${item.id}-${item.metal}`} 
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="flex gap-10 group"
                  >
                    <div className="w-36 h-48 bg-luxury-beige/40 rounded-[2.5rem] flex-shrink-0 flex items-center justify-center overflow-hidden relative shadow-inner border border-black/5 group-hover:border-astera-100 transition-all duration-1000">
                      {item.image ? (
                        <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-125" />
                      ) : (
                        <span className="text-[10px] uppercase text-astera-200 tracking-[0.4em] font-bold">Aster Art</span>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col py-4">
                      <div className="flex justify-between items-start mb-4">
                        <div className="space-y-2">
                          <h3 className="heading-luxury text-base tracking-[0.2em]">{item.name}</h3>
                          {item.metal && <p className="font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-astera-300 group-hover:text-astera-600 transition-colors">{item.metal.replace('_', ' ')}</p>}
                        </div>
                        <button onClick={() => removeItem(item.id, item.metal)} className="w-10 h-10 flex items-center justify-center rounded-full text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all duration-500">
                          <Trash2 size={18} strokeWidth={1.5} />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center bg-slate-50 rounded-[1.5rem] p-1.5 border border-black/5 shadow-sm transition-all duration-700 hover:shadow-md">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1, item.metal)} className="w-10 h-10 flex items-center justify-center hover:bg-white hover:shadow-2xl rounded-[1.25rem] text-astera-300 hover:text-black transition-all duration-500"><Minus size={16} /></button>
                          <span className="px-6 font-sans font-bold text-base w-14 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1, item.metal)} className="w-10 h-10 flex items-center justify-center hover:bg-white hover:shadow-2xl rounded-[1.25rem] text-astera-300 hover:text-black transition-all duration-500"><Plus size={16} /></button>
                        </div>
                        <p className="font-sans font-bold text-[22px] tracking-tighter text-astera-900 drop-shadow-sm">€{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Actions - STICKY MASTERPIECE */}
        {items.length > 0 && (
          <div className="p-12 md:p-16 bg-white border-t border-black/5 shadow-[0_-30px_100px_rgba(0,0,0,0.05)] relative z-10">
            <div className="space-y-6 mb-12">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold uppercase tracking-[0.4em] text-gray-400">UKUPNO ZA PLAĆANJE</span>
                <span className="font-sans font-bold text-[36px] tracking-tighter text-astera-900 border-b border-astera-50">€{getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-astera-300 bg-astera-50/30 p-4 rounded-2xl border border-astera-50">
                <div className="flex items-center gap-4">
                   <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">🚀</div>
                   <span className="text-[11px] uppercase tracking-[0.3em] font-bold">Besplatna Brza Dostava</span>
                </div>
                <span className="text-[11px] uppercase tracking-[0.3em] font-medium italic opacity-70">U RH</span>
              </div>
            </div>
            
            <Link
              href="/checkout"
              onClick={onClose}
              className="w-full bg-astera-900 text-white rounded-[2.5rem] flex items-center justify-center gap-10 py-7 px-10 transition-all duration-1000 hover:bg-black hover:shadow-[0_25px_60px_rgba(0,0,0,0.3)] hover:-translate-y-2 group"
            >
              <span className="text-[13px] font-bold uppercase tracking-[0.5em]">ZAVRŠI KUPOVINU</span>
              <ArrowRight size={20} className="group-hover:translate-x-4 transition-transform duration-700" />
            </Link>
            
            <div className="mt-12 flex items-center justify-center gap-10 opacity-30 grayscale hover:grayscale-0 transition-all duration-1000">
               <img src="/stripe-badge.png" alt="Stripe" className="h-6" />
               <div className="w-[1.5px] h-4 bg-astera-900" />
               <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-astera-900">ZAŠTIĆENA TRANSAKCIJA</span>
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
}
