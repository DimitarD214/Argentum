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
}

export default function ProductCard({ product, index, t }: ProductCardProps) {
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
      image: product.images[0],
      metal: t(defaultMaterial),
    });

    updateCartOpen(true);
  };

  return (
    <motion.div
      layout
      key={product.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
      className="card-luxury group bg-white border border-slate-50 transition-all duration-700 hover:shadow-2xl hover:shadow-black/5"
    >
      <div className="relative aspect-[4/5] bg-luxury-beige flex items-center justify-center overflow-hidden">
        {badge && (
          <div className="absolute top-6 left-6 z-20 pill-luxury shadow-lg">
            {badge}
          </div>
        )}

        <button
          onClick={(e) => handleToggleFav(e, product.id)}
          className="absolute top-6 right-6 z-20 p-3 bg-white/70 backdrop-blur-xl rounded-full text-astera-900 border border-black/5 hover:scale-110 active:scale-90 transition-all duration-700 shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={isFav ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </button>

        <Link
          href={`/shop/${product.id}`}
          className="absolute inset-0 block group-hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className={`object-cover mix-blend-multiply transition-opacity duration-700 ${product.images.length > 1 ? 'group-hover:opacity-0 opacity-90' : 'opacity-90'}`}
          />
          {product.images.length > 1 && (
            <Image
              src={product.images[1]}
              alt={`${product.name} alternate view`}
              fill
              className="object-cover mix-blend-multiply opacity-0 group-hover:opacity-90 transition-opacity duration-700 absolute inset-0"
            />
          )}
        </Link>

        <div className="absolute inset-x-0 bottom-0 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] px-6 pb-6">
          <button
            onClick={(e) => handleQuickAdd(e, product)}
            className="w-full bg-white/95 backdrop-blur-xl text-astera-900 font-sans font-bold text-[11px] uppercase tracking-[0.25em] py-4 rounded-sm shadow-2xl hover:bg-astera-900 hover:text-white transition-all duration-500 border border-black/5"
          >
            Dodaj u košaricu
          </button>
        </div>
      </div>

      <div className="p-10 pb-12 flex flex-col items-center text-center">
        <Link href={`/shop/${product.id}`} className="block mb-4 overflow-hidden w-full">
          <h2 className="heading-luxury text-[14px] line-clamp-1 group-hover:text-astera-600 transition-colors duration-500">
            {product.name}
          </h2>
        </Link>
        <div className="h-[1px] w-8 bg-astera-100 mb-6 group-hover:w-20 transition-all duration-700" />
        <p className="font-sans text-[11px] text-slate-400 font-medium uppercase tracking-[0.1em] mb-8">
          {product.category === "Jewelry" ? "Nakit" : product.category} • {t(product.stoneColor)}
        </p>
        <div className="pt-6 border-t border-slate-50 w-full flex flex-col items-center">
          <p className="font-serif text-[22px] text-astera-900 font-light mb-1">
            €{getBasePrice(product).toFixed(2)}
          </p>
          <span className="text-[9px] uppercase tracking-[0.3em] text-astera-300 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            Detaljan Prikaz
          </span>
        </div>
      </div>
    </motion.div>
  );
}
