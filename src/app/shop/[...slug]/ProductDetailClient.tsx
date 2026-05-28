/* ASTERA DESIGN SYSTEM REMINDER: ALWAYS use container-luxury and section-luxury. Minimum padding: px-24 (mobile) / px-64+ (desktop) */
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
      <div className="min-h-screen flex items-center justify-center bg-astera-cream">
        <div className="text-center">
          <h1 className="font-serif tracking-widest uppercase text-4xl mb-6 text-astera-dark">Komad Nije Pronađen</h1>
          <p className="font-sans text-astera-dark/70 mb-12 italic leading-relaxed">Umjetnička kreacija koju tražite vratila se među zvijezde.</p>
          <a href="/shop" className="bg-astera-dark text-astera-cream px-12 py-5 rounded-full font-sans text-xs font-bold uppercase tracking-widest transition-all duration-500 ease-in-out hover:scale-[1.01] hover:opacity-80 hover:bg-astera-gold shadow-sm inline-block">Povratak na Kolekciju</a>
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
    <div className="bg-astera-white">
      <Navbar />

      <main className="min-h-screen pt-40 lg:pt-56 pb-24">
        <section className="py-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-32 items-start">

              {/* Left — Product Visuals (7 Cols) */}
              <div className="lg:col-span-7">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
                  <div className="aspect-[4/5] bg-astera-cream rounded-[3rem] overflow-hidden flex items-center justify-center border border-astera-border shadow-[0_8px_30px_rgba(0,0,0,0.04)] group">
                    {product.images && product.images.length > 0 ? (
                      <Image src={product.images[0]} alt={product.name} fill className="object-cover opacity-90 mix-blend-multiply transition-transform duration-1000 ease-in-out group-hover:scale-[1.05]" />
                    ) : (
                      <div className="text-astera-gold font-serif tracking-widest text-xl uppercase italic">
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
                   <nav className="font-sans text-xs tracking-widest uppercase flex items-center gap-3 mb-10 text-astera-gold font-bold">
                     <Link href="/shop" className="hover:text-astera-dark transition-colors duration-500 ease-in-out">Kolekcija</Link>
                     <span className="opacity-30">/</span>
                     <span className="opacity-60 text-astera-dark">{t(product.category)}</span>
                   </nav>

                   {/* Pills / Badges */}
                   {product.badges.length > 0 && (
                     <div className="flex flex-wrap gap-4 mb-10">
                       {product.badges.map((b) => (
                         <span key={b} className="px-5 py-2 backdrop-blur-md bg-white/70 rounded-full border border-astera-border/50 text-[10px] font-sans font-bold uppercase tracking-widest text-astera-dark shadow-sm">{b === 'New In' ? 'Novo' : b}</span>
                       ))}
                     </div>
                   )}

                   {/* Identity */}
                   <h1 className="font-serif tracking-widest uppercase text-4xl md:text-5xl lg:text-6xl mb-6 leading-[1.1] text-astera-dark">
                     {product.name}
                   </h1>
                   
                   <p className="font-serif text-3xl text-astera-dark font-light italic mb-12">
                     €{getPrice()}
                   </p>

                   {/* Refined Description */}
                   <p className="font-sans text-[15px] text-astera-dark/70 leading-relaxed mb-16 italic border-l-2 border-astera-gold pl-8">
                     "{product.description}"
                   </p>

                   {/* Form Elements */}
                   <div className="space-y-16">
                      {/* Material */}
                      {product.material.length > 1 && (
                        <div>
                          <label className="font-serif text-sm uppercase tracking-widest mb-6 block text-astera-dark">Odaberite Materijal</label>
                          <div className="flex flex-wrap gap-4">
                            {product.material.map((m) => (
                              <button
                                key={m}
                                onClick={() => setSelectedMetal(m)}
                                className={`px-8 py-4 rounded-full text-[11px] font-sans font-bold uppercase tracking-widest transition-all duration-500 ease-in-out hover:scale-[1.01] hover:opacity-80 ${
                                  selectedMetal === m
                                    ? "bg-astera-dark text-astera-cream shadow-sm"
                                    : "bg-transparent border border-astera-border text-astera-dark/70 hover:border-astera-gold hover:text-astera-dark"
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
                        <label className="font-serif text-sm uppercase tracking-widest block text-center lg:text-left text-astera-dark">Količina</label>
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                           <div className="flex items-center bg-astera-cream rounded-full border border-astera-border p-1.5 shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-500 ease-in-out">
                              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-12 flex items-center justify-center rounded-full text-astera-dark/70 hover:text-astera-gold hover:bg-astera-white transition-all duration-500 ease-in-out">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                                </svg>
                              </button>
                              <span className="px-6 font-serif text-lg min-w-[60px] text-center text-astera-dark">{quantity}</span>
                              <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-12 flex items-center justify-center rounded-full text-astera-dark/70 hover:text-astera-gold hover:bg-astera-white transition-all duration-500 ease-in-out">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                              </button>
                           </div>

                           <button
                             onClick={handleAddToBag}
                             className={`flex-1 w-full py-6 rounded-full font-sans text-[11px] font-bold uppercase tracking-widest transition-all duration-500 ease-in-out ${
                               added 
                               ? "bg-astera-cream text-astera-gold border border-astera-gold" 
                               : "bg-astera-dark text-astera-cream hover:bg-astera-gold hover:scale-[1.01] hover:opacity-80 shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
                             }`}
                           >
                             {added ? "✦ U Košarici" : `Dodaj u Košaricu — €${getPrice() * quantity}`}
                           </button>
                        </div>
                      </div>
                   </div>

                   {/* Composition / Origin */}
                   <div className="mt-20 pt-12 border-t border-astera-border">
                     <h4 className="font-serif text-sm uppercase tracking-widest mb-10 text-astera-dark">Umjetnički Detalji</h4>
                     <ul className="grid grid-cols-2 gap-y-8">
                        <li className="flex flex-col gap-2">
                           <span className="text-[10px] text-astera-dark/70 font-sans uppercase tracking-widest font-bold">Kategorija</span>
                           <span className="text-[13px] font-serif text-astera-dark tracking-wide">{t(product.category)}</span>
                        </li>
                        <li className="flex flex-col gap-2">
                           <span className="text-[10px] text-astera-dark/70 font-sans uppercase tracking-widest font-bold">Tema</span>
                           <span className="text-[13px] font-serif text-astera-dark tracking-wide">{t(product.theme)}</span>
                        </li>
                        <li className="flex flex-col gap-2">
                           <span className="text-[10px] text-astera-dark/70 font-sans uppercase tracking-widest font-bold">Esencija</span>
                           <span className="text-[13px] font-serif text-astera-dark tracking-wide">{t(product.stoneColor)}</span>
                        </li>
                        <li className="flex flex-col gap-2">
                           <span className="text-[10px] text-astera-dark/70 font-sans uppercase tracking-widest font-bold">Materijal</span>
                           <span className="text-[13px] font-serif text-astera-dark tracking-wide">{product.material.map(m => t(m)).join(" & ")}</span>
                        </li>
                     </ul>
                   </div>
                </motion.div>
              </div>

            </div>
          </div>
        </section>

        {/* ========== COMPLIMENTARY SERVICES ========== */}
        <section className="py-32 bg-astera-cream border-t border-b border-astera-border">
           <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-20 text-center">
              {[
                { label: "Luksuzno Pakiranje", icon: "🎁" },
                { label: "Certifikat o Autentičnosti", icon: "✨" },
                { label: "Brza Dostava", icon: "🕊️" }
              ].map(s => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="flex flex-col items-center group">
                   <div className="text-4xl mb-8 grayscale opacity-80 group-hover:scale-110 transition-transform duration-500 ease-in-out group-hover:grayscale-0">{s.icon}</div>
                   <p className="font-serif tracking-widest uppercase text-sm text-astera-dark">{s.label}</p>
                </motion.div>
              ))}
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
