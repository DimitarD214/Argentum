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
            className="fixed inset-0 bg-astera-dark/60 z-[200] backdrop-blur-xl"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 right-0 h-full w-full md:w-[600px] bg-astera-white z-[210] shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col"
      >
        {/* Header - SPACIOUS MASTERPIECE */}
        <div className="flex items-center justify-between p-10 md:p-14 border-b border-astera-border bg-astera-cream">
          <div className="flex items-center gap-8">
             <div className="w-14 h-14 bg-astera-white rounded-full flex items-center justify-center text-astera-gold shadow-sm">
                <ShoppingBag size={24} strokeWidth={1} />
             </div>
             <div className="space-y-1">
                <h2 className="font-serif text-3xl tracking-widest uppercase text-astera-dark">Vaša košarica</h2>
                <div className="flex items-center gap-4">
                   <div className="w-2 h-2 rounded-full bg-astera-gold animate-pulse" />
                   <span className="font-sans font-bold text-[11px] uppercase tracking-widest text-astera-dark/70">{getCartCount()} RUČNO RAĐENIH ARTIKALA</span>
                </div>
             </div>
          </div>
          <button onClick={onClose} className="w-14 h-14 flex items-center justify-center rounded-full border border-astera-border text-astera-dark/70 transition-all duration-500 ease-in-out hover:text-astera-gold hover:bg-astera-white hover:scale-[1.01] hover:shadow-sm">
            <X size={24} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-10 md:p-14">
          <AnimatePresence mode="popLayout">
            {items.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="h-full flex flex-col items-center justify-center text-center space-y-8"
              >
                <div className="relative">
                  <div className="w-32 h-32 bg-astera-50 rounded-full flex items-center justify-center animate-pulse">
                    <ShoppingBag size={48} strokeWidth={0.5} className="text-astera-200" />
                  </div>
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-astera-white rounded-full shadow-sm flex items-center justify-center text-2xl border border-astera-border">🏺</div>
                </div>
                <div className="space-y-6">
                  <p className="font-serif text-[28px] tracking-widest uppercase text-astera-dark">Vaša košarica je prazna</p>
                  <p className="font-sans text-[15px] text-astera-dark/70 max-w-[320px] mx-auto leading-relaxed italic opacity-80">
                    Umjetničko majstorstvo je na korak od vas. Istražite naše najfinije kolekcije.
                  </p>
                </div>
                <Link 
                  href="/shop" 
                  onClick={onClose}
                  className="group flex items-center gap-6 text-[13px] font-sans font-bold uppercase tracking-widest text-astera-dark transition-all duration-500 ease-in-out bg-astera-cream px-10 py-5 rounded-full hover:scale-[1.01] hover:opacity-80 hover:shadow-sm"
                >
                  <span>ISTRAŽITE PROLJEĆE 2026</span>
                  <ArrowRight size={20} className="group-hover:translate-x-3 transition-transform duration-500" />
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
                    className="flex gap-8 group"
                  >
                    <div className="w-36 h-48 bg-astera-cream rounded-3xl flex-shrink-0 flex items-center justify-center overflow-hidden relative shadow-sm border border-astera-border transition-all duration-500 ease-in-out group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                      {item.image ? (
                        <Image src={item.image} alt={item.name} fill className="object-cover transition-all duration-500 ease-in-out group-hover:scale-[1.05]" />
                      ) : (
                        <span className="text-[10px] font-sans uppercase text-astera-gold tracking-widest font-bold">Aster Art</span>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col py-4">
                      <div className="flex justify-between items-start mb-4">
                        <div className="space-y-2">
                          <h3 className="font-serif text-base tracking-widest uppercase text-astera-dark">{item.name}</h3>
                          {item.metal && <p className="font-sans text-[11px] font-bold uppercase tracking-widest text-astera-gold">{item.metal.replace('_', ' ')}</p>}
                        </div>
                        <button onClick={() => removeItem(item.id, item.metal)} className="w-10 h-10 flex items-center justify-center rounded-full text-astera-dark/50 transition-all duration-500 ease-in-out hover:text-astera-dark hover:bg-astera-cream hover:scale-[1.01] hover:opacity-80">
                          <Trash2 size={18} strokeWidth={1.5} />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center bg-astera-cream rounded-full p-1.5 border border-astera-border shadow-sm transition-all duration-500 ease-in-out hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1, item.metal)} className="w-10 h-10 flex items-center justify-center rounded-full text-astera-gold transition-all duration-500 ease-in-out hover:bg-astera-white hover:scale-[1.01] hover:opacity-80 hover:shadow-sm"><Minus size={16} /></button>
                          <span className="px-6 font-sans font-bold text-base w-14 text-center text-astera-dark">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1, item.metal)} className="w-10 h-10 flex items-center justify-center rounded-full text-astera-gold transition-all duration-500 ease-in-out hover:bg-astera-white hover:scale-[1.01] hover:opacity-80 hover:shadow-sm"><Plus size={16} /></button>
                        </div>
                        <p className="font-serif text-[22px] tracking-widest text-astera-dark">€{(item.price * item.quantity).toFixed(2)}</p>
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
          <div className="py-10 px-8 md:p-14 bg-astera-white border-t border-astera-border shadow-[0_-8px_30px_rgba(0,0,0,0.04)] relative z-10">
            <div className="space-y-8 mb-12">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-sans font-bold uppercase tracking-widest text-astera-dark/70">UKUPNO ZA PLAĆANJE</span>
                <span className="font-serif text-[36px] tracking-widest text-astera-dark">€{getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-astera-gold bg-astera-cream p-6 rounded-2xl border border-astera-border">
                <div className="flex items-center gap-4">
                   <div className="w-8 h-8 rounded-full bg-astera-white flex items-center justify-center shadow-sm">🚀</div>
                   <span className="text-[11px] font-sans uppercase tracking-widest font-bold">Besplatna Brza Dostava</span>
                </div>
                <span className="text-[11px] font-sans uppercase tracking-widest font-medium italic opacity-70">U RH</span>
              </div>
            </div>
            
            <Link
              href="/checkout"
              onClick={onClose}
              className="w-full bg-astera-dark text-astera-cream rounded-full flex items-center justify-center gap-4 py-6 px-8 transition-all duration-500 ease-in-out hover:text-astera-gold hover:scale-[1.01] hover:opacity-80 hover:shadow-sm group"
            >
              <span className="text-[13px] font-sans font-bold uppercase tracking-widest">ZAVRŠI KUPOVINU</span>
              <ArrowRight size={20} className="group-hover:translate-x-4 transition-transform duration-500" />
            </Link>
            
            <div className="mt-12 flex items-center justify-center gap-16 transition-all duration-500 ease-in-out hover:opacity-80">
               <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-6 w-auto object-contain opacity-75 grayscale hover:grayscale-0 transition-all duration-500 ease-in-out" />
               <div className="w-[1px] h-6 bg-astera-border" />
               <span className="text-[10px] font-sans uppercase tracking-widest font-bold text-astera-dark/70">ZAŠTIĆENA TRANSAKCIJA</span>
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
}
