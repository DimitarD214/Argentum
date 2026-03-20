"use client";

import React from "react";
import Image from "next/image";
import { X, Minus, Plus, CreditCard, ShieldCheck } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { clsx } from "clsx";

const FREE_SHIPPING_THRESHOLD = 5000; // $5000

export function CartDrawer() {
  const { isCartOpen, toggleCart, cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

  const progress = Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - cartTotal;

  return (
    <>
      {/* Overlay */}
      <div
        className={clsx(
          "fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-50 transition-opacity duration-300",
          isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={toggleCart}
      />

      {/* Drawer */}
      <div
        className={clsx(
          "fixed top-0 right-0 h-full w-full max-w-md bg-background z-50 flex flex-col shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
          isCartOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-charcoal/10 flex items-center justify-between bg-white text-charcoal">
          <h2 className="font-serif text-2xl">Your Bag</h2>
          <button onClick={toggleCart} className="p-2 hover:bg-black/5 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Tracker */}
        <div className="bg-charcoal text-white px-6 py-4 text-center">
          {remainingForFreeShipping > 0 ? (
            <p className="text-sm font-medium mb-2">
              You are <span className="text-gold">${remainingForFreeShipping.toLocaleString()}</span> away from Free Expedited Shipping.
            </p>
          ) : (
            <p className="text-sm font-medium mb-2 text-gold">You have unlocked Free Expedited Shipping!</p>
          )}
          <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gold transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-70">
              <ShoppingBagIcon />
              <p className="text-lg">Your bag is currently empty.</p>
              <button
                onClick={toggleCart}
                className="mt-4 px-8 py-3 bg-charcoal text-white font-medium uppercase text-sm tracking-widest hover:bg-gold transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="relative w-24 h-24 flex-shrink-0 bg-white border border-charcoal/10 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-serif text-lg leading-tight">{item.title}</h3>
                      <button onClick={() => removeFromCart(item.id)} className="text-xs uppercase tracking-widest text-charcoal/60 hover:text-black">
                        Remove
                      </button>
                    </div>
                    <p className="text-sm text-charcoal/60 mt-1">{item.variant}</p>
                    <p className="text-sm font-medium mt-1">${item.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center mt-2 border border-charcoal/20 w-fit">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 hover:bg-black/5 transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-4 text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 hover:bg-black/5 transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-charcoal/10 bg-white p-6 space-y-4">
            <div className="flex justify-between items-center text-lg">
              <span className="font-serif">Subtotal</span>
              <span className="font-medium">${cartTotal.toLocaleString()}</span>
            </div>
            <p className="text-xs text-charcoal/60 text-center">Taxes and shipping calculated at checkout</p>
            <button className="w-full py-4 bg-charcoal text-white font-medium uppercase tracking-widest hover:bg-gold transition-colors relative overflow-hidden group">
              <span className="relative z-10 flex items-center justify-center gap-2">
                <ShieldCheck size={18} />
                Secure Checkout
              </span>
              <div className="absolute inset-0 bg-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out z-0" />
            </button>
            <div className="flex justify-center items-center gap-3 text-charcoal/50 pt-2">
              <CreditCard size={24} />
              {/* Using generic representation for cards/apple pay as requested */}
              <div className="w-8 h-5 border border-charcoal/20 rounded flex items-center justify-center text-[10px] font-bold bg-[#1A1F71] text-white">VISA</div>
              <div className="w-8 h-5 border border-charcoal/20 rounded flex items-center justify-center bg-[#EB001B] relative overflow-hidden">
                <div className="absolute w-4 h-4 rounded-full bg-[#F79E1B] mix-blend-screen right-[2px]"></div>
                <div className="absolute w-4 h-4 rounded-full bg-[#EB001B] left-[2px] z-10"></div>
              </div>
              <div className="w-auto px-1 h-5 border border-charcoal/20 rounded flex items-center justify-center text-[10px] font-bold bg-black text-white">Pay</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function ShoppingBagIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-charcoal/30">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  );
}
