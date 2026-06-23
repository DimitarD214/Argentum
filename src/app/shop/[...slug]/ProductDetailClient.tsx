/* ASTERA DESIGN SYSTEM REMINDER: ALWAYS use max-w-7xl mx-auto px-6 md:px-8 and py-20 md:py-24 lg:py-32. Minimum padding: px-24 (mobile) / px-64+ (desktop) */
"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import products from "@/data/products.json";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  theme: string;
  stoneColor: string;
  price: { sterling_silver?: number; gold_14k?: number };
  badges: string[];
  description: string;
  images: string[];
  category: string;
  material: string[];
}

const translateMap: Record<string, string> = {
  'All': 'Sve',
  'Butterflies': 'Leptiri',
  'Flowers': 'Cvijeće',
  'Classic': 'Klasično',
  'Green': 'Zelena',
  'Clear': 'Prozirna',
  'Rose': 'Roza',
  'Sterling Silver': 'Srebro 925',
  '14k Gold': '14k Zlato',
  'Rose Gold': 'Rozo Zlato',
  'Platinum': 'Platina',
  'Jewelry': 'Nakit'
};

const t = (val: string) => translateMap[val] || val;

export default function ProductDetailClient({ productId }: { productId: string }) {
  
  const product = (products as Product[]).find((p) => p.id === productId);
  const { addItem, updateCartOpen } = useCartStore();

  const [selectedMetal, setSelectedMetal] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (product && product.material.length > 0) {
      setSelectedMetal(product.material[0]);
    }
  }, [product]);

  useEffect(() => {
    if (product) {
      document.title = `${product.name} | Kolekcija — Astera`;
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warm-beige">
        <div className="text-center">
          <h1 className="font-serif tracking-widest uppercase leading-tight text-astera-900 text-4xl mb-6">Komad Nije Pronađen</h1>
          <p className="font-sans text-gray-500 mb-12 italic">Umjetnička kreacija koju tražite vratila se među zvijezde.</p>
          <a href="/shop" className="inline-flex items-center justify-center px-12 py-4 font-sans text-[11px] font-bold tracking-[0.2em] uppercase rounded-sm bg-charcoal text-white hover:bg-black transition-all">Povratak na Kolekciju</a>
        </div>
      </div>
    );
  }

  const getPrice = () => {
    if (selectedMetal === "Sterling Silver" && product.price.sterling_silver) return product.price.sterling_silver;
    if (selectedMetal === "14k Gold" && product.price.gold_14k) return product.price.gold_14k;
    return product.price.sterling_silver || product.price.gold_14k || 0;
  };

  const handleAddToBag = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: getPrice(),
      quantity,
      image: product.images[0] || undefined,
      metal: t(selectedMetal),
    });
    setAdded(true);
    updateCartOpen(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-white">
      <Navbar />

      <main className="min-h-screen pt-40 lg:pt-56 pb-24">
        <section className="py-20 md:py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 items-start">

              {/* Left — Product Visuals (7 Cols) */}
              <div className="lg:col-span-7">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
                  <div className="aspect-[4/5] bg-warm-beige rounded-[3rem] overflow-hidden flex items-center justify-center border border-black/5 shadow-sm group">
                    {product.images && product.images.length > 0 ? (
                      <Image src={product.images[0]} alt={product.name} fill className="object-cover opacity-90 mix-blend-multiply transition-transform duration-1000 group-hover:scale-105" />
                    ) : (
                      <div className="text-astera-300 font-serif tracking-[0.3em] text-xl uppercase italic">
                        {product.name}
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Right — Product Details (5 Cols) */}
              <div className="lg:col-span-5 lg:sticky lg:top-48">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}>
                   {/* Breadcrumb / Category */}
                   <nav className="subfont-serif tracking-widest uppercase leading-tight text-astera-900 flex items-center gap-3 mb-8 text-astera-600">
                     <Link href="/shop" className="hover:text-black transition-colors">Kolekcija</Link>
                     <span className="opacity-30">/</span>
                     <span className="opacity-60">{t(product.category)}</span>
                   </nav>

                   {/* Pills / Badges */}
                   {product.badges.length > 0 && (
                     <div className="flex flex-wrap gap-3 mb-8">
                       {product.badges.map((b) => (
                         <span key={b} className="inline-flex items-center px-4 py-1.5 rounded-full font-sans text-[10px] font-bold tracking-[0.15em] uppercase shadow-sm bg-white/90 backdrop-blur-md border border-black/5">{b === 'New In' ? 'Novo' : b}</span>
                       ))}
                     </div>
                   )}

                   {/* Identity */}
                   <h1 className="font-serif tracking-widest uppercase leading-tight text-astera-900 text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
                     {product.name}
                   </h1>
                   
                   <p className="font-serif text-3xl text-astera-900 font-light italic mb-10">
                     €{getPrice()}
                   </p>

                   {/* Refined Description */}
                   <p className="font-sans text-[15px] text-gray-500 leading-relaxed mb-12 italic border-l-2 border-astera-100 pl-8">
                     "{product.description}"
                   </p>

                   {/* Form Elements */}
                   <div className="space-y-12">
                      {/* Material */}
                      {product.material.length > 1 && (
                        <div>
                          <label className="subfont-serif tracking-widest uppercase leading-tight text-astera-900 uppercase tracking-widest mb-4 block">Odaberite Materijal</label>
                          <div className="flex flex-wrap gap-4">
                            {product.material.map((m) => (
                              <button
                                key={m}
                                onClick={() => setSelectedMetal(m)}
                                className={`px-8 py-4 rounded-2xl text-[11px] font-bold uppercase tracking-widest transition-all duration-500 ${
                                  selectedMetal === m
                                    ? "bg-black text-white shadow-xl scale-105"
                                    : "bg-transparent border border-black/10 text-gray-400 hover:border-black hover:text-black"
                                }`}
                              >
                                {t(m)}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Quantity & Action */}
                      <div className="flex flex-col gap-6">
                        <label className="subfont-serif tracking-widest uppercase leading-tight text-astera-900 uppercase tracking-widest block text-center lg:text-left">Količina</label>
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                           <div className="flex items-center bg-warm-beige rounded-2xl border border-black/5 p-1 px-4">
                              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-4 text-gray-400 hover:text-black transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                                </svg>
                              </button>
                              <span className="px-6 font-serif text-lg font-bold min-w-[60px] text-center">{quantity}</span>
                              <button onClick={() => setQuantity(quantity + 1)} className="p-4 text-gray-400 hover:text-black transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                              </button>
                           </div>

                           <button
                             onClick={handleAddToBag}
                             className={`flex-1 w-full py-6 rounded-3xl font-sans text-[11px] font-bold uppercase tracking-[0.25em] transition-all duration-700 ${
                               added 
                               ? "bg-emerald-50 text-emerald-600 border border-emerald-200" 
                               : "bg-black text-white hover:bg-astera-900 hover:scale-[1.02] shadow-xl"
                             }`}
                           >
                             {added ? "✦ U Košarici" : `Dodaj u Košaricu — €${getPrice() * quantity}`}
                           </button>
                        </div>
                      </div>
                   </div>

                   {/* Composition / Origin */}
                   <div className="mt-20 pt-12 border-t border-black/5">
                     <h4 className="subfont-serif tracking-widest uppercase leading-tight text-astera-900 uppercase tracking-widest mb-8">Umjetnički Detalji</h4>
                     <ul className="grid grid-cols-2 gap-y-6">
                        <li className="flex flex-col gap-1">
                           <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Kategorija</span>
                           <span className="text-[13px] font-sans text-black font-semibold">{t(product.category)}</span>
                        </li>
                        <li className="flex flex-col gap-1">
                           <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Tema</span>
                           <span className="text-[13px] font-sans text-black font-semibold">{t(product.theme)}</span>
                        </li>
                        <li className="flex flex-col gap-1">
                           <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Esencija</span>
                           <span className="text-[13px] font-sans text-black font-semibold">{t(product.stoneColor)}</span>
                        </li>
                        <li className="flex flex-col gap-1">
                           <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Materijal</span>
                           <span className="text-[13px] font-sans text-black font-semibold">{product.material.map(m => t(m)).join(" & ")}</span>
                        </li>
                     </ul>
                   </div>
                </motion.div>
              </div>

            </div>
          </div>
        </section>

        {/* ========== COMPLIMENTARY SERVICES ========== */}
        <section className="py-20 md:py-24 lg:py-32 bg-warm-beige">
           <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
              {[
                { label: "Luksuzno Pakiranje", icon: "🎁" },
                { label: "Certifikat o Autentičnosti", icon: "✨" },
                { label: "Brza Dostava", icon: "🕊️" }
              ].map(s => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="flex flex-col items-center">
                   <div className="text-3xl mb-6 grayscale opacity-80">{s.icon}</div>
                   <p className="subfont-serif tracking-widest uppercase leading-tight text-astera-900 !text-astera-700">{s.label}</p>
                </motion.div>
              ))}
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
