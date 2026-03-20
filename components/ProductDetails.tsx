"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Accordion } from "./Accordion";
import { useCart } from "@/lib/cart-context";
import { CreditCard, ShieldCheck } from "lucide-react";
import { clsx } from "clsx";

export function ProductDetails({ product }: { product: any }) {
  const { addToCart } = useCart();
  
  // Default selections
  const initialMetal = product.options.find((o: any) => o.name === "Metal")?.values[0] || "";
  const initialSize = product.options.find((o: any) => o.name === "Size")?.values[0] || "";

  const [selectedMetal, setSelectedMetal] = useState(initialMetal);
  const [selectedSize, setSelectedSize] = useState(initialSize);
  const [activeImage, setActiveImage] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

  // Dynamic pricing mock logic (e.g. Gold is base price, Silver is cheaper, Rose Gold is slightly more)
  const displayPrice = useMemo(() => {
    let base = product.price;
    if (selectedMetal === "Silver") base -= 300;
    if (selectedMetal === "Rose Gold") base += 150;
    // Size changes price
    if (selectedSize && parseInt(selectedSize) > 7) base += 50 * (parseInt(selectedSize) - 7);
    return base;
  }, [product.price, selectedMetal, selectedSize]);

  const handleAddToCart = () => {
    setIsAdding(true);
    const variantStr = [selectedMetal, selectedSize].filter(Boolean).join(" / ");
    
    setTimeout(() => {
      addToCart({
        id: `${product.id}-${variantStr}`,
        productId: product.id,
        title: product.title,
        price: displayPrice,
        image: product.images[0],
        variant: variantStr,
      });
      setIsAdding(false);
    }, 400); // Simulate network latency
  };

  const getMetalColor = (metal: string) => {
    switch (metal) {
      case "Gold": return "bg-yellow-500";
      case "Silver": return "bg-gray-300";
      case "Rose Gold": return "bg-rose-300";
      default: return "bg-charcoal";
    }
  };

  const accordionItems = [
    {
      title: "Materials & Details",
      content: (
        <ul className="list-disc pl-4 space-y-1">
          <li>18k Solid {selectedMetal || "Gold"}</li>
          <li>Conflict-free natural diamonds (VS1 clarity, G color)</li>
          <li>Hand-polished finish</li>
          <li>Custom engraving available upon request</li>
        </ul>
      ),
    },
    {
      title: "Shipping & Returns",
      content: "Complimentary fully insured global shipping on all orders. Returns and exchanges are accepted within 30 days of delivery, provided the piece remains unworn and in original condition.",
    },
    {
      title: "Care Instructions",
      content: "To maintain the pristine condition of your jewelry, gently clean with a soft, lint-free cloth. Avoid exposure to harsh chemicals, perfumes, and excessive moisture. Store in the provided Bespoke velvet pouch when not in use.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 py-12 px-6 lg:px-12">
      {/* Left Column: Images */}
      <div className="space-y-4">
        <div className="relative aspect-[4/5] bg-white border border-charcoal/10 overflow-hidden">
          {product.images.map((img: string, idx: number) => (
            <Image
              key={idx}
              src={img}
              alt={`${product.title} view ${idx + 1}`}
              fill
              className={clsx(
                "object-cover transition-opacity duration-500",
                activeImage === idx ? "opacity-100 z-10" : "opacity-0 z-0"
              )}
              priority={idx === 0}
            />
          ))}
        </div>
        {/* Thumbnails */}
        {product.images.length > 1 && (
          <div className="flex gap-4">
            {product.images.map((img: string, idx: number) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={clsx(
                  "relative w-20 h-24 border transition-colors",
                  activeImage === idx ? "border-charcoal" : "border-transparent opacity-60 hover:opacity-100"
                )}
              >
                <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right Column: Details */}
      <div className="md:py-10 sticky top-24 h-fit">
        <h1 className="font-serif text-4xl lg:text-5xl text-charcoal mb-4">{product.title}</h1>
        <p className="text-xl font-medium text-charcoal/80 mb-6">${displayPrice.toLocaleString()}</p>
        
        <p className="text-charcoal/70 leading-relaxed mb-8">{product.description}</p>

        {/* Variants */}
        <div className="space-y-6 mb-10">
          {product.options.map((option: any) => (
            <div key={option.name}>
              <div className="flex justify-between mb-3">
                <span className="text-sm font-medium uppercase tracking-wider">{option.name}</span>
                <span className="text-sm text-charcoal/50">
                  {option.name === "Metal" ? selectedMetal : selectedSize}
                </span>
              </div>

              {option.name === "Metal" ? (
                <div className="flex gap-4">
                  {option.values.map((val: string) => (
                    <button
                      key={val}
                      onClick={() => setSelectedMetal(val)}
                      className={clsx(
                        "w-8 h-8 rounded-full border-2 transition-all shadow-sm relative",
                        getMetalColor(val),
                        selectedMetal === val ? "border-charcoal scale-110" : "border-transparent hover:scale-105"
                      )}
                      aria-label={`Select ${val}`}
                    >
                      {selectedMetal === val && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-white rounded-full opacity-80 mix-blend-difference"></div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="relative">
                  <select
                    className="w-full appearance-none border border-charcoal/20 bg-transparent py-3 px-4 text-charcoal focus:outline-none focus:border-charcoal transition-colors rounded-none"
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                  >
                    {option.values.map((val: string) => (
                      <option key={val} value={val}>Size {val}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <ChevronDown size={16} className="text-charcoal/50" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className="w-full py-4 bg-charcoal text-white uppercase tracking-widest text-sm font-medium hover:bg-gold transition-colors duration-300 mb-8 relative"
        >
          {isAdding ? "Adding..." : "Add to Bag"}
        </button>

        {/* Accordions */}
        <Accordion items={accordionItems} />

        {/* Secure Checkout Badges */}
        <div className="mt-12 pt-8 border-t border-charcoal/10">
          <div className="flex items-center gap-2 text-charcoal/80 mb-4 justify-center">
            <ShieldCheck size={18} />
            <span className="uppercase tracking-widest text-xs font-medium">Secure Checkout</span>
          </div>
          <div className="flex justify-center items-center gap-4 text-charcoal/40 grayscale opacity-70">
            {/* Minimalist representation of cards */}
            <div className="w-10 h-6 border border-current rounded flex items-center justify-center text-[10px] font-bold">VISA</div>
            <div className="w-10 h-6 border border-current rounded flex items-center justify-center relative overflow-hidden">
               <div className="absolute w-5 h-5 rounded-full bg-current left-[2px] opacity-80" />
               <div className="absolute w-5 h-5 rounded-full bg-current right-[2px] mix-blend-screen opacity-50" />
            </div>
            <div className="w-auto px-2 h-6 border border-current rounded flex items-center justify-center text-[10px] font-bold">Pay</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChevronDown({ className, size = 24 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m6 9 6 6 6-6"/>
    </svg>
  );
}
