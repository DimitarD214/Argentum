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
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[200] backdrop-blur-md"
            onClick={onClose}
          />

          {/* Drawer Panel */}
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 h-full w-full md:w-[600px] bg-white z-[210] shadow-[0_0_100px_rgba(0,0,0,0.25)] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-8 md:p-10 border-b border-black/5 bg-warm-beige/50">
              <div className="flex items-center gap-8">
                 <div className="w-14 h-14 bg-astera-50 rounded-sm flex items-center justify-center text-astera-700 shadow-inner">
                    <ShoppingBag size={24} strokeWidth={1} />
                 </div>
                 <div className="space-y-1">
                    <h2 className="font-serif text-3xl tracking-[0.2em] uppercase text-astera-900">Vaša košarica</h2>
                    <div className="flex items-center gap-4">
                       <div className="w-2 h-2 rounded-full bg-astera-500 animate-pulse" />
                       <span className="font-sans font-bold text-[11px] uppercase tracking-[0.3em] text-gray-400">{getCartCount()} RUČNO RAĐENIH ARTIKALA</span>
                    </div>
                 </div>
              </div>
              <button onClick={onClose} className="w-14 h-14 flex items-center justify-center rounded-sm border border-black/5 text-gray-400 hover:text-black hover:bg-white hover:shadow-lg transition-all duration-500 hover:rotate-90">
                <X size={24} />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-10">
              <AnimatePresence mode="popLayout">
                {items.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full flex flex-col items-center justify-center text-center space-y-8"
                  >
                    <div className="relative">
                      <div className="w-32 h-32 bg-astera-50 rounded-sm flex items-center justify-center">
                        <ShoppingBag size={48} strokeWidth={0.5} className="text-astera-200" />
                      </div>
                      <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-sm shadow-xl flex items-center justify-center text-2xl border border-black/5">🏺</div>
                    </div>
                    <div className="space-y-4">
                      <p className="font-serif text-[24px] tracking-[0.2em] uppercase text-astera-900">Vaša košarica je prazna</p>
                      <p className="font-sans text-[14px] text-gray-400 max-w-[320px] mx-auto leading-relaxed italic opacity-85">
                        Umjetničko majstorstvo je na korak od vas. Istražite naše najfinije kolekcije.
                      </p>
                    </div>
                    <Link 
                      href="/shop" 
                      onClick={onClose}
                      className="group flex items-center gap-6 text-[12px] font-bold uppercase tracking-[0.3em] text-astera-900 hover:text-black transition-colors bg-warm-beige px-8 py-4 rounded-sm border border-black/5"
                    >
                      <span>ISTRAŽITE PROLJEĆE 2026</span>
                      <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
                    </Link>
                  </motion.div>
                ) : (
                  <div className="space-y-12">
                    {items.map((item, idx) => (
                      <motion.div 
                        layout
                        key={`${item.id}-${item.metal}`} 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.5, delay: idx * 0.05 }}
                        className="flex gap-8 group"
                      >
                        <div className="w-32 h-40 bg-warm-beige/40 rounded-sm flex-shrink-0 flex items-center justify-center overflow-hidden relative border border-black/5 group-hover:border-astera-100 transition-colors duration-500">
                          {item.image ? (
                            <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                          ) : (
                            <span className="text-[10px] uppercase text-astera-200 tracking-[0.4em] font-bold">Aster Art</span>
                          )}
                        </div>
                        <div className="flex-1 flex flex-col py-2">
                          <div className="flex justify-between items-start mb-2">
                            <div className="space-y-1">
                              <h3 className="font-serif tracking-widest uppercase leading-tight text-astera-900 text-sm tracking-[0.15em]">{item.name}</h3>
                              {item.metal && <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-astera-300 group-hover:text-astera-600 transition-colors">{item.metal.replace('_', ' ')}</p>}
                            </div>
                            <button onClick={() => removeItem(item.id, item.metal)} className="w-8 h-8 flex items-center justify-center rounded-sm text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors duration-300">
                              <Trash2 size={16} strokeWidth={1.5} />
                            </button>
                          </div>
                          
                          <div className="flex items-center justify-between mt-auto">
                            <div className="flex items-center bg-slate-50 rounded-sm p-1 border border-black/5 shadow-sm">
                              <button onClick={() => updateQuantity(item.id, item.quantity - 1, item.metal)} className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-sm text-astera-300 hover:text-black transition-colors duration-300"><Minus size={14} /></button>
                              <span className="px-4 font-sans font-bold text-sm w-10 text-center">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, item.quantity + 1, item.metal)} className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-sm text-astera-300 hover:text-black transition-colors duration-300"><Plus size={14} /></button>
                            </div>
                            <p className="font-sans font-bold text-lg text-astera-900">€{(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer Actions */}
            {items.length > 0 && (
              <div className="py-8 px-6 md:p-10 bg-white border-t border-black/5 shadow-[0_-15px_50px_rgba(0,0,0,0.03)] relative z-10">
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">UKUPNO ZA PLAĆANJE</span>
                    <span className="font-sans font-bold text-2xl text-astera-900 border-b border-astera-50">€{getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-astera-600 bg-astera-50/50 p-4 rounded-sm border border-astera-50">
                    <div className="flex items-center gap-4">
                       <div className="w-8 h-8 rounded-sm bg-white flex items-center justify-center shadow-sm">🚀</div>
                       <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Besplatna Brza Dostava</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-medium italic opacity-75">U RH</span>
                  </div>
                </div>
                
                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="w-full bg-astera-900 text-white rounded-sm flex items-center justify-center gap-4 py-4 px-8 transition-colors duration-300 hover:bg-black group"
                >
                  <span className="text-[12px] font-bold uppercase tracking-widest">ZAVRŠI KUPOVINU</span>
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
                
                <div className="mt-8 flex items-center justify-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
                   <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-5 w-auto object-contain opacity-75" />
                   <div className="w-[1px] h-3 bg-astera-900" />
                   <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-astera-900">ZAŠTIĆENA TRANSAKCIJA</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
