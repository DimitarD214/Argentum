/* ASTERA DESIGN SYSTEM REMINDER: NEVER align text 100% to screen edges. Minimum padding: px-24 (mobile) / px-64+ (desktop) */
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import CartDrawer from "./CartDrawer"; import SearchOverlay from "./SearchOverlay";
import FavouritesDrawer from "./FavouritesDrawer";
import { useFavouritesStore } from "@/store/favouritesStore";

const menuData: Record<string, { columns: { title: string; links: string[] }[]; featured?: string }> = {
  "New In": {
    columns: [
      { title: "Trending Now", links: ["Best Sellers", "New Arrivals", "Back in Stock", "Online Exclusives"] },
      { title: "Collections", links: ["Spring Bloom", "Butterfly Series", "Forest Greens", "Bridal"] },
      { title: "Price Range", links: ["Under $100", "$100 – $200", "$200 – $500", "Luxury Pieces"] },
    ],
    featured: "Spring 2026 Lookbook",
  },
  Jewelry: {
    columns: [
      { title: "By Category", links: ["Necklaces", "Rings", "Earrings", "Bracelets", "Pendants"] },
      { title: "By Material", links: ["Sterling Silver", "14k Gold", "Rose Gold", "Crystal"] },
      { title: "By Occasion", links: ["Everyday Elegance", "Wedding & Bridal", "Anniversary", "Gift Sets"] },
    ],
    featured: "New: Emerald Collection",
  },
  Watches: {
    columns: [
      { title: "Women\'s Watches", links: ["Classic", "Dress", "Fashion", "Crystal-set"] },
      { title: "Men\'s Watches", links: ["Classic", "Sport", "Dress", "Limited Edition"] },
      { title: "By Feature", links: ["Swiss Made", "Automatic", "Water Resistant", "Ceramic"] },
    ],
    featured: "Signature Timepieces",
  },
  Accessories: {
    columns: [
      { title: "Categories", links: ["Sunglasses", "Hair Accessories", "Keychains", "Phone Cases"] },
      { title: "By Style", links: ["Minimalist", "Statement", "Everyday", "Evening"] },
    ],
    featured: "2026 Lookbook",
  },
  Gifts: {
    columns: [
      { title: "Gift Ideas", links: ["For Her", "For Him", "For Couples", "Under $75"] },
      { title: "Special", links: ["Gift Cards", "Gift Wrapping", "Personalization", "Bestsellers"] },
    ],
    featured: "Perfect Spring Gift",
  },
};

export default function Navbar({ variant = "transparent" }: { variant?: "transparent" | "solid" }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [menuTimeout, setMenuTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false); const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFavOpen, setIsFavOpen] = useState(false);
  const favCount = useFavouritesStore((state) => state.items.length);
  const [mounted, setMounted] = useState(false);
  const cartCount = useCartStore((state) => state.getCartCount());

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (item: string) => {
    if (menuTimeout) clearTimeout(menuTimeout);
    setActiveMenu(item);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => setActiveMenu(null), 200);
    setMenuTimeout(timeout);
  };

  const navItems = ["New In", "Jewelry", "Watches", "Accessories", "Gifts"];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${
          scrolled || activeMenu
            ? "bg-white/98 backdrop-blur-md shadow-[0_1px_0_0_#e5e5e5]"
            : "bg-transparent"
        }`}
      >
        {/* Top utility bar */}
        <div className="flex items-center justify-center py-2 text-[10px] tracking-[0.16em] uppercase bg-astera-700 text-white font-sans">
          Free standard shipping over €75
        </div>

        {/* Logo — big and centered like Swarovski */}
        <div className="flex items-center justify-center py-5 relative">
          {/* Left utility */}
          <div className="absolute left-16 md:left-24 lg:left-32 hidden md:flex items-center gap-4">
            <button
              className={`text-[11px] font-sans tracking-[0.06em] transition-colors duration-300 ${
                scrolled || activeMenu ? "text-gray-500 hover:text-black" : "text-white/70 hover:text-white"
              }`}
            >
              Stores
            </button>
          </div>

          <Link href="/" className="group">
            <h1
              className={`text-[32px] md:text-[40px] lg:text-[48px] font-serif font-semibold tracking-[0.22em] uppercase transition-all duration-500 group-hover:tracking-[0.28em] ${
                scrolled || activeMenu ? "text-black" : "text-white"
              }`}
            >
              ASTERA
            </h1>
          </Link>

          {/* Right utility */}
          <div className="absolute right-8 md:right-16 lg:right-20 flex items-center gap-5">
            {/* Heart Icon */}
            <button
              onClick={() => setIsFavOpen(true)}
              className={`transition-all duration-300 hover:scale-110 relative ${
                scrolled || activeMenu ? "text-black hover:text-astera-600" : "text-white hover:text-astera-300"
              }`}
              aria-label="Wishlist"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
              {mounted && favCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-astera-600 rounded-full border-2 border-white flex items-center justify-center text-[8px] text-white"></span>
              )}
            </button>
            <button
              className={`transition-all duration-300 hover:scale-110 ${
                scrolled || activeMenu ? "text-black hover:text-astera-600" : "text-white hover:text-astera-300"
              }`}
              onClick={() => setIsSearchOpen(true)} aria-label="Search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>
            <Link
              href="/account"
              className={`transition-all duration-300 hover:scale-110 ${
                scrolled || activeMenu ? "text-black hover:text-astera-600" : "text-white hover:text-astera-300"
              }`}
              aria-label="Account"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </Link>
            <button
              onClick={() => setIsCartOpen(true)}
              className={`relative transition-all duration-300 hover:scale-110 ${
                scrolled || activeMenu ? "text-black hover:text-astera-600" : "text-white hover:text-astera-300"
              }`}
              aria-label="Shopping bag"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              {mounted && cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-astera-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Navigation links — centered below logo */}
        <nav
          className="hidden lg:flex items-center justify-center gap-10 pb-4 border-b border-transparent"
          onMouseLeave={handleMouseLeave}
        >
          {navItems.map((item) => (
            <div
              key={item}
              onMouseEnter={() => handleMouseEnter(item)}
              className="relative"
            >
              <Link
                href="/shop"
                className={`nav-link text-[12px] font-sans font-medium tracking-[0.08em] transition-colors duration-300 pb-1 ${
                  activeMenu === item
                    ? "text-black"
                    : scrolled || activeMenu
                    ? "text-gray-600 hover:text-black"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {item}
              </Link>
              {activeMenu === item && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-astera-600" />
              )}
            </div>
          ))}
        </nav>

        {/* Mega Menu Dropdown - Swarovski Style (Full Screen) */}
        <div
          className={`fixed left-0 w-screen bg-white border-t border-gray-100 transition-all duration-500 origin-top z-[90] ${
            activeMenu
              ? "opacity-100 scale-y-100 pointer-events-auto"
              : "opacity-0 scale-y-95 pointer-events-none"
          }`}
          style={{ top: "100%", boxShadow: "0 40px 80px rgba(0,0,0,0.06)" }}
          onMouseEnter={() => { if (menuTimeout) clearTimeout(menuTimeout); }}
          onMouseLeave={handleMouseLeave}
        >
          {activeMenu && menuData[activeMenu] && (
            <div className="w-full max-w-[1920px] mx-auto px-32 md:px-80 py-24">
              <div className="flex justify-between gap-20">
                {/* Columns */}
                <div className="flex-1 grid grid-cols-3 gap-32 pl-12 md:pl-20">
                  {menuData[activeMenu].columns.map((col) => (
                    <div key={col.title}>
                      <h4 className="text-[14px] font-sans font-bold tracking-[0.16em] uppercase text-black mb-7">
                        {col.title}
                      </h4>
                      <ul className="space-y-3">
                        {col.links.map((link) => (
                          <li key={link}>
                            <Link
                              href="/shop"
                              className="text-[16px] font-sans text-gray-500 hover:text-black transition-colors duration-200"
                            >
                              {link}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Featured image placeholder */}
                {menuData[activeMenu].featured && (
                  <div className="w-[480px] flex-shrink-0">
                    <div className="aspect-[16/9] bg-astera-50 rounded-lg overflow-hidden flex items-center justify-center mb-6">
                      <span className="text-[13px] font-sans tracking-[0.18em] uppercase text-astera-500">
                        Featured
                      </span>
                    </div>
                    <p className="text-[15px] font-sans font-medium text-black tracking-[0.03em]">
                      {menuData[activeMenu].featured}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/20 z-[99] transition-opacity duration-300 ${
          activeMenu ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setActiveMenu(null)}
      />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} /> <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <FavouritesDrawer isOpen={isFavOpen} onClose={() => setIsFavOpen(false)} />
    </>
  );
}
