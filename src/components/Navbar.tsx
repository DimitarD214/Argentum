"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [menuTimeout, setMenuTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
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
        <div className="flex items-center justify-center py-2 text-[10px] tracking-[0.16em] uppercase bg-spring-700 text-white font-sans">
          Free standard shipping over €75
        </div>

        {/* Logo — big and centered like Swarovski */}
        <div className="flex items-center justify-center py-5 relative">
          {/* Left utility */}
          <div className="absolute left-8 md:left-16 lg:left-20 hidden md:flex items-center gap-4">
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
              ARGENTUM
            </h1>
          </Link>

          {/* Right utility */}
          <div className="absolute right-8 md:right-16 lg:right-20 flex items-center gap-5">
            <button
              className={`transition-all duration-300 hover:scale-110 ${
                scrolled || activeMenu ? "text-black hover:text-spring-600" : "text-white hover:text-spring-300"
              }`}
              aria-label="Search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>
            <Link
              href="#"
              className={`relative transition-all duration-300 hover:scale-110 ${
                scrolled || activeMenu ? "text-black hover:text-spring-600" : "text-white hover:text-spring-300"
              }`}
              aria-label="Shopping bag"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              <span className="absolute -top-1.5 -right-2 bg-spring-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                0
              </span>
            </Link>
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
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-spring-600" />
              )}
            </div>
          ))}
        </nav>

        {/* Mega Menu Dropdown */}
        <div
          className={`absolute left-0 w-full bg-white border-t border-gray-100 transition-all duration-300 origin-top ${
            activeMenu
              ? "opacity-100 scale-y-100 pointer-events-auto"
              : "opacity-0 scale-y-95 pointer-events-none"
          }`}
          style={{ top: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.08)" }}
          onMouseEnter={() => { if (menuTimeout) clearTimeout(menuTimeout); }}
          onMouseLeave={handleMouseLeave}
        >
          {activeMenu && menuData[activeMenu] && (
            <div className="max-w-screen-lg mx-auto px-8 py-10">
              <div className="flex gap-16">
                {/* Columns */}
                <div className="flex-1 flex gap-14">
                  {menuData[activeMenu].columns.map((col) => (
                    <div key={col.title}>
                      <h4 className="text-[11px] font-sans font-semibold tracking-[0.14em] uppercase text-black mb-5">
                        {col.title}
                      </h4>
                      <ul className="space-y-3">
                        {col.links.map((link) => (
                          <li key={link}>
                            <Link
                              href="/shop"
                              className="text-[13px] font-sans text-gray-500 hover:text-black transition-colors duration-200"
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
                  <div className="w-56 flex-shrink-0">
                    <div className="aspect-[4/5] bg-spring-100 flex items-center justify-center mb-3">
                      <span className="text-[10px] font-sans tracking-[0.15em] uppercase text-spring-500">
                        Featured
                      </span>
                    </div>
                    <p className="text-[12px] font-sans font-medium text-black tracking-[0.02em]">
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
    </>
  );
}
