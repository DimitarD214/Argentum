"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { motion } from "framer-motion";

export function ProductCard({ product }: { product: any }) {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    const defaultVariant = product.options.map((opt: any) => opt.values[0]).join(" / ");
    addToCart({
      id: `${product.id}-${defaultVariant}`,
      productId: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      variant: defaultVariant,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Link 
        href={`/product/${product.handle}`} 
        className="group flex flex-col relative h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-ice mb-6">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className={`object-cover transition-all duration-[1500ms] ${isHovered ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}
          />
          <Image
            src={product.images[1] || product.images[0]}
            alt={`${product.title} alternative view`}
            fill
            className={`object-cover transition-all duration-[1500ms] absolute inset-0 ${isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`}
          />
          
          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-10">
            <button 
              onClick={handleQuickAdd}
              className="w-full py-4 bg-white/95 backdrop-blur-md text-foreground text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-foreground hover:text-white transition-colors border border-gray-100 shadow-sm"
            >
              Add to Bag
            </button>
          </div>
        </div>
        
        <div className="flex flex-col items-center text-center px-4 mt-auto">
          <h3 className="font-serif text-lg text-foreground mb-2 leading-tight">{product.title}</h3>
          <p className="text-sm font-medium text-gray-500">${product.price.toLocaleString()}</p>
        </div>
      </Link>
    </motion.div>
  );
}
