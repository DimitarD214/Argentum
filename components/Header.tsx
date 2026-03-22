"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingBag, Menu, X, MapPin, User, Heart } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { clsx } from "clsx";
import { motion, AnimatePresence } from "framer-motion";

const NAV_TABS = [
  { name: "New In", href: "/shop?category=new" },
  { name: "Jewelry", href: "/shop" },
  { name: "Watches", href: "/shop?category=watches" },
  { name: "Decorations", href: "/shop?category=decor" },
  { name: "Gifts", href: "/shop?category=gifts" },
  { name: "Brand", href: "/our-story" },
];

export function Header() {
  const { toggleCart, cartItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const isMenuOpen = activeTab !== null;

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
          isScrolled || isMenuOpen
            ? "bg-white border-gray-200 text-foreground"
            : "bg-transparent border-transparent text-white"
        )}
        onMouseLeave={() => setActiveTab(null)}
      >
        {/* Top Utility Bar */}
        <div className={clsx(
          "hidden lg:flex justify-end items-center px-8 py-2 text-[11px] font-semibold tracking-widest uppercase transition-colors duration-300",
          isScrolled || isMenuOpen ? "bg-gray-50 border-b border-gray-100 text-gray-500" : "bg-black/20 text-white/90"
        )}>
          <div className="flex items-center space-x-6">
            <button className="flex items-center hover:text-foreground transition-colors"><MapPin size={12} className="mr-1" /> Store Locator</button>
            <button className="flex items-center hover:text-foreground transition-colors"><User size={12} className="mr-1" /> Sign In</button>
          </div>
        </div>

        {/* Main Header Area */}
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile Menu Icon */}
            <div className="flex-1 lg:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Logo */}
            <div className="flex-1 flex justify-center lg:justify-start">
              <Link href="/" className="font-serif text-3xl font-semibold tracking-[0.1em] uppercase">
                Argentum Stil
              </Link>
            </div>

            {/* Desktop Navigation Tabs */}
            <nav className="hidden lg:flex flex-[2] justify-center items-center h-full">
              <ul className="flex space-x-8 h-full">
                {NAV_TABS.map((tab) => (
                  <li key={tab.name} className="h-full flex items-center">
                    <Link
                      href={tab.href}
                      className={clsx(
                        "text-xs font-semibold uppercase tracking-[0.15em] transition-colors relative h-full flex items-center",
                        activeTab === tab.name ? "text-silver-dark" : "hover:text-silver-dark"
                      )}
                      onMouseEnter={() => setActiveTab(tab.name)}
                    >
                      {tab.name}
                      {/* Animated bottom border on hover */}
                      {activeTab === tab.name && (
                        <motion.div
                          layoutId="nav-underline"
                          className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Right Icons */}
            <div className="flex-1 flex justify-end items-center space-x-6">
              <button className="hover:text-silver-dark transition-colors hidden sm:block">
                <Search size={20} strokeWidth={1.5} />
              </button>
              <button className="hover:text-silver-dark transition-colors hidden sm:block">
                <Heart size={20} strokeWidth={1.5} />
              </button>
              <button
                className="hover:text-silver-dark transition-colors relative"
                onClick={toggleCart}
                aria-label="Open Cart"
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-foreground text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mega Menu Dropdown */}
        <AnimatePresence>
          {activeTab && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-sm overflow-hidden"
            >
              <div className="w-full px-8 py-16 flex">
                <div className="w-1/4 pr-16 border-r border-gray-100">
                  <h3 className="font-serif text-2xl mb-8 text-foreground">Explore {activeTab}</h3>
                  <ul className="space-y-4 text-base text-gray-600 font-medium">
                    <li><Link href={`/shop`} className="hover:text-foreground transition-colors">View All</Link></li>
                    <li><Link href={`/shop`} className="hover:text-foreground transition-colors">Best Sellers</Link></li>
                    <li><Link href={`/shop`} className="hover:text-foreground transition-colors">New Arrivals</Link></li>
                  </ul>
                </div>
                <div className="w-3/4 pl-16 grid grid-cols-3 gap-12">
                  {/* Decorative images for the mega menu */}
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="group cursor-pointer">
                      <div className="relative aspect-[4/3] bg-ice overflow-hidden mb-4">
                        <img
                          src={`https://images.unsplash.com/photo-1599643478514-4a4e09f52f5e?q=80&w=800&auto=format&fit=crop`}
                          alt="Jewelry"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-foreground">Featured Collection {i}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu Dropdown Wrapper */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 lg:hidden overflow-y-auto"
          >
            <ul className="flex flex-col space-y-6">
              {NAV_TABS.map((tab) => (
                <li key={tab.name} className="border-b border-gray-100 pb-4">
                  <Link 
                    href={tab.href} 
                    className="font-serif text-2xl text-foreground"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {tab.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-12 space-y-4">
              <button className="flex items-center text-sm font-semibold uppercase tracking-widest text-gray-500"><User size={16} className="mr-3" /> Sign In / Register</button>
              <button className="flex items-center text-sm font-semibold uppercase tracking-widest text-gray-500"><MapPin size={16} className="mr-3" /> Find a Boutique</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
