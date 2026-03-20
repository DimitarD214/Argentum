"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { clsx } from "clsx";

export function Header() {
  const { toggleCart, cartItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-500 border-b border-transparent",
        isScrolled
          ? "bg-background/80 backdrop-blur-md py-4 border-charcoal/10 shadow-sm"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Mobile menu button */}
        <button
          className="lg:hidden text-charcoal"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation Left */}
        <nav className="hidden lg:flex items-center space-x-8 w-1/3">
          <Link href="/shop" className="text-sm font-medium tracking-wide uppercase hover:text-gold transition-colors">
            Shop
          </Link>
          <Link href="/our-story" className="text-sm font-medium tracking-wide uppercase hover:text-gold transition-colors">
            Our Story
          </Link>
        </nav>

        {/* Logo Center */}
        <div className="flex-1 w-1/3 flex justify-center">
          <Link href="/" className="font-serif text-3xl font-semibold tracking-[0.15em] uppercase text-anthracite">
            ARGENTUM STIL
          </Link>
        </div>

        {/* Desktop Navigation Right */}
        <div className="hidden lg:flex items-center justify-end space-x-6 w-1/3">
          <button className="text-anthracite hover:text-silver-dark transition-colors">
            <Search size={20} />
          </button>
          <button
            className="text-anthracite hover:text-silver-dark transition-colors relative"
            onClick={toggleCart}
            aria-label="Open Cart"
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-silver-dark text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Cart Icon */}
        <div className="lg:hidden flex justify-end w-1/3">
          <button
            className="text-charcoal hover:text-gold transition-colors relative"
            onClick={toggleCart}
            aria-label="Open Cart"
          >
            <ShoppingBag size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-gold text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-b border-charcoal/10 flex flex-col items-center py-6 space-y-4 shadow-lg lg:hidden">
          <Link href="/shop" className="text-lg font-medium tracking-wide uppercase hover:text-gold" onClick={() => setIsMobileMenuOpen(false)}>
            Shop
          </Link>
          <Link href="/our-story" className="text-lg font-medium tracking-wide uppercase hover:text-gold" onClick={() => setIsMobileMenuOpen(false)}>
            Our Story
          </Link>
        </div>
      )}
    </header>
  );
}
