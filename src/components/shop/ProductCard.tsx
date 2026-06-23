"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useFavouritesStore } from "@/store/favouritesStore";
import { useCartStore } from "@/store/cartStore";

interface Product {
  id: string;
  stripe_id: string;
  name: string;
  theme: string;
  stoneColor: string;
  price: {
    sterling_silver?: number;
    gold_14k?: number;
    rose_gold?: number;
    platinum?: number;
  };
  badges: string[];
  description: string | null;
  images: string[];
  material: string[];
  category: string;
}

interface ProductCardProps {
  product: Product;
  index: number;
  t: (val: string) => string;
  isLarge?: boolean;
}

export default function ProductCard({ product, index, t, isLarge = false }: ProductCardProps) {
  const { items: favItems, toggleFavourite } = useFavouritesStore();
  const updateCartOpen = useCartStore((state) => state.updateCartOpen);
  const addItem = useCartStore((state) => state.addItem);

  const isFav = favItems.includes(product.id);
  const badge = product.badges && product.badges.length > 0 ? product.badges[0] : null;

  const getBasePrice = (p: Product) =>
    p.price.sterling_silver || p.price.gold_14k || p.price.rose_gold || p.price.platinum || 0;

  const handleToggleFav = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavourite(id);
  };

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultMaterial = product.material[0] || "Sterling Silver";
    const materialKey = defaultMaterial.toLowerCase().replace(" ", "_");
    const price = product.price[materialKey as keyof typeof product.price] || getBasePrice(product);

    addItem({
      id: product.id,
      name: product.name,
      price: price,
      quantity: 1,
      image: product.images && product.images[0] ? product.images[0] : "/forest-greens-necklace.png",
      metal: t(defaultMaterial),
    });

    updateCartOpen(true);
  };

  const colSpanClass = isLarge ? "lg:col-span-2 lg:row-span-2" : "col-span-1 row-span-1";

  return (
    <motion.div
      layout
      key={product.id}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
      className={`group relative overflow-hidden rounded-2xl bg-[#f8f9fa] shadow-sm transition-all duration-700 hover:shadow-xl ${colSpanClass} flex flex-col`}
    >
      <Link href={`/shop/${product.id}`} className="block w-full h-full relative overflow-hidden flex-1">
        
        {badge && (
          <div className="absolute top-6 left-6 z-20 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] font-bold tracking-widest uppercase text-charcoal border border-white">
            {badge}
          </div>
        )}

        <button
          onClick={(e) => handleToggleFav(e, product.id)}
          className="absolute top-6 right-6 z-20 p-2.5 bg-white/50 backdrop-blur-xl rounded-full text-charcoal hover:bg-white transition-all duration-500 shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill={isFav ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
        </button>

        <div className="absolute inset-0 bg-[#f8f9fa] mix-blend-multiply transition-colors duration-700 group-hover:bg-[#f1f3f5] z-0" />

        <Image
          src={product.images && product.images[0] ? product.images[0] : "/forest-greens-necklace.png"}
          alt={product.name}
          fill
          className={`object-cover z-10 transition-transform duration-[1500ms] group-hover:scale-110 ${product.images && product.images.length > 1 ? 'group-hover:opacity-0 opacity-100' : 'opacity-100'}`}
        />
        {product.images && product.images.length > 1 && product.images[1] && (
          <Image
            src={product.images[1]}
            alt={`${product.name} alternate view`}
            fill
            className="object-cover z-10 opacity-0 group-hover:opacity-100 transition-all duration-[1500ms] group-hover:scale-105 absolute inset-0"
          />
        )}

        {/* Liquid Glass Info Overlay */}
        <div className="absolute inset-x-4 bottom-4 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
           <div className="bg-white/95 backdrop-blur-3xl p-4 md:p-6 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-2xl border border-white/50">
             <div>
               <h2 className="font-serif text-lg md:text-xl text-charcoal mb-1 line-clamp-1">{product.name}</h2>
               <p className="font-sans text-[9px] uppercase tracking-widest text-gray-500 font-bold">
                 {t(product.stoneColor)}
               </p>
             </div>
             <div className="flex flex-col items-end">
                <p className="font-serif text-base md:text-lg text-charcoal">€{getBasePrice(product).toFixed(2)}</p>
                <button
                  onClick={(e) => handleQuickAdd(e, product)}
                  className="mt-2 text-[9px] font-bold uppercase tracking-widest text-astera-600 hover:text-charcoal transition-colors underline underline-offset-4"
                >
                  Dodaj
                </button>
             </div>
           </div>
        </div>
      </Link>
    </motion.div>
  );
}
