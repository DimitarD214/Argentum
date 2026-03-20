"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export function ProductCard({ product }: { product: any }) {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    // Quick add default variants
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
    <Link 
      href={`/product/${product.handle}`} 
      className="group flex flex-col relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-white mb-4">
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          className={`object-cover transition-opacity duration-700 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
        />
        <Image
          src={product.images[1] || product.images[0]}
          alt={`${product.title} alternative view`}
          fill
          className={`object-cover transition-opacity duration-700 absolute inset-0 ${isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`}
        />
        
        {/* Quick Add Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-10">
          <button 
            onClick={handleQuickAdd}
            className="w-full py-3 bg-white/90 backdrop-blur-sm text-charcoal text-xs uppercase tracking-widest font-medium hover:bg-charcoal hover:text-white transition-colors border border-charcoal/10 shadow-sm"
          >
            Quick Add
          </button>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="flex flex-col items-center text-center px-2">
        <h3 className="font-serif text-lg lg:text-xl text-charcoal mb-1">{product.title}</h3>
        <p className="text-sm font-medium text-charcoal/70">${product.price.toLocaleString()}</p>
      </div>
    </Link>
  );
}
