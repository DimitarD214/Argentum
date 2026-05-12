/* ASTERA DESIGN SYSTEM: CONTEXTual LUXURY ARCHITECTURE */
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import CartDrawer from "./CartDrawer"; 
import SearchOverlay from "./SearchOverlay";
import FavouritesDrawer from "./FavouritesDrawer";
import { useFavouritesStore } from "@/store/favouritesStore";

const menuData: Record<string, { columns: { title: string; links: string[] }[]; featuredImage: string; featuredTitle: string }> = {
  "Novo": {
    columns: [
      { title: "Sada u trendu", links: ["Najprodavanije", "Nove kolekcije", "Ponovno na zalihi", "Online ekskluzive"] },
      { title: "Kolekcije", links: ["Proljetni Cvat", "Serija Leptir", "Šumsko Zelenilo", "Vjenčanja"] },
      { title: "Izdvojeno", links: ["Do 100 EUR", "100 EUR – 200 EUR", "200 EUR – 500 EUR", "Luksuzni Komadi"] },
    ],
    featuredImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop",
    featuredTitle: "Proljeće 2026 Lookbook",
  },
  "Nakit": {
    columns: [
      { title: "Po kategoriji", links: ["Ogrlice", "Prstenje", "Naušnice", "Narukvice", "Privjesci"] },
      { title: "Po materijalu", links: ["Srebro 925", "14k Zlato", "Rozo Zlato", "Kristal"] },
      { title: "Prigode", links: ["Svakodnevna Elegancija", "Vjenčanja", "Godišnjice", "Poklon Setovi"] },
    ],
    featuredImage: "https://images.unsplash.com/photo-1596566111082-d55e82ad9028?q=80&w=1974&auto=format&fit=crop",
    featuredTitle: "Smaragdna Priča",
  },
  "Satovi": {
    columns: [
      { title: "Ženski satovi", links: ["Klasični", "Elegantni", "Moderni", "S kristalima"] },
      { title: "Muški satovi", links: ["Klasični", "Sportski", "Elegantni", "Ograničena izdanja"] },
      { title: "Značajke", links: ["Švicarska Mehanika", "Automatik", "Vodootporno", "Keramika"] },
    ],
    featuredImage: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1780&auto=format&fit=crop",
    featuredTitle: "Kolekcijski Satovi",
  },
  "Dodaci": {
    columns: [
      { title: "Kategorije", links: ["Sunčane naočale", "Dodaci za kosu", "Privjesci", "Maskice za mobitel"] },
      { title: "Stil", links: ["Minimalizam", "Upečatljivo", "Svakodnevno", "Večernje"] },
    ],
    featuredImage: "https://images.unsplash.com/photo-1537233815102-bf0b2996d984?q=80&w=1974&auto=format&fit=crop",
    featuredTitle: "Umjetnički Dodaci",
  },
  "Pokloni": {
    columns: [
      { title: "Ideje za poklon", links: ["Za Nju", "Za Njega", "Za Parove", "Do 75 EUR"] },
      { title: "Usluge", links: ["Poklon kartice", "Zamatanje poklona", "Personalizacija", "Najprodavanije"] },
    ],
    featuredImage: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=1974&auto=format&fit=crop",
    featuredTitle: "Umjetnost Darivanja",
  },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [menuTimeout, setMenuTimeout] = useState<NodeJS.Timeout | null>(null);
  const isCartOpen = useCartStore((state) => state.isCartOpen);
  const setIsCartOpen = useCartStore((state) => state.updateCartOpen); 
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFavOpen, setIsFavOpen] = useState(false);
  const favCount = useFavouritesStore((state) => state.items.length);
  const [mounted, setMounted] = useState(false);
  const cartCount = useCartStore((state) => state.getCartCount());
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (item: string) => {
    if (menuTimeout) clearTimeout(menuTimeout);
    setActiveMenu(item);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => setActiveMenu(null), 150);
    setMenuTimeout(timeout);
  };

  const navItems = ["Novo", "Nakit", "Satovi", "Dodaci", "Pokloni"];

  // THE INTELLIGENT HEADER LOGIC
  const isHomePage = pathname === "/";
  // Force compact mode on Shop & interior pages to prevent overlap
  const isCompact = scrolled || activeMenu || !isHomePage;
  
  const headerPaddingTop = isCompact ? "18px" : "60px";
  const headerPaddingBottom = isCompact ? "18px" : "20px";

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-1000 ${
          isCompact
            ? "bg-white border-b border-black/5 shadow-[0_30px_90px_rgba(0,0,0,0.04)]"
            : "bg-transparent"
        }`}
      >
        {/* Compact utility bar */}
        <div className="flex items-center justify-center py-2.5 text-[9px] tracking-[0.4em] uppercase bg-astera-900/90 text-astera-100 font-sans font-bold">
          Ručna izrada • Isporuka unutar 24 sata
        </div>

        <div className="container-luxury px-10 md:px-20 lg:px-24 transition-all duration-1000 relative">
          <div 
            className="flex items-center justify-between transition-all duration-1000"
            style={{ paddingTop: headerPaddingTop, paddingBottom: headerPaddingBottom }}
          >
            {/* Left Nav */}
            <nav className="hidden xl:flex items-center gap-10" onMouseLeave={handleMouseLeave}>
              {navItems.slice(0, 3).map((item) => (
                <div key={item} onMouseEnter={() => handleMouseEnter(item)} className="relative group py-3">
                  <Link
                    href="/shop"
                    className={`text-[11px] font-sans font-bold tracking-[0.2em] uppercase transition-all duration-500 block ${
                      activeMenu === item
                        ? "text-astera-900"
                        : isCompact
                        ? "text-gray-400 hover:text-black"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    {item}
                  </Link>
                  <div className={`absolute bottom-0 left-0 w-full flex justify-center`}>
                    <div className={`h-[1px] bg-astera-600 transition-all duration-500 w-0 group-hover:w-full ${activeMenu === item ? "w-full" : ""}`} />
                  </div>
                </div>
              ))}
            </nav>

            {/* High-Performance Centered Logo */}
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center min-w-[280px] h-full z-20 pointer-events-none">
              <Link href="/" className="pointer-events-auto group">
                <h1
                  className={`text-[28px] md:text-[34px] font-serif font-light tracking-[0.55em] uppercase transition-all duration-1000 group-hover:tracking-[0.6em] ${
                    isCompact ? "text-astera-900" : "text-white drop-shadow-2xl"
                  }`}
                >
                  ASTERA
                </h1>
              </Link>
            </div>

            {/* Right Nav & Icons */}
            <div className="flex items-center gap-10">
              <nav className="hidden xl:flex items-center gap-10 mr-4" onMouseLeave={handleMouseLeave}>
                {navItems.slice(3).map((item) => (
                  <div key={item} onMouseEnter={() => handleMouseEnter(item)} className="relative group py-3">
                    <Link
                      href="/shop"
                      className={`text-[11px] font-sans font-bold tracking-[0.2em] uppercase transition-all duration-500 block ${
                        activeMenu === item
                          ? "text-astera-900"
                          : isCompact
                          ? "text-gray-400 hover:text-black"
                          : "text-white/80 hover:text-white"
                      }`}
                    >
                      {item}
                    </Link>
                    <div className={`absolute bottom-0 left-0 w-full flex justify-center`}>
                        <div className={`h-[1px] bg-astera-600 transition-all duration-500 w-0 group-hover:w-full ${activeMenu === item ? "w-full" : ""}`} />
                    </div>
                  </div>
                ))}
              </nav>

              <div className="flex items-center gap-8">
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className={`transition-all duration-500 hover:scale-110 ${
                    isCompact ? "text-astera-900" : "text-white"
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                </button>

                <button
                  onClick={() => setIsFavOpen(true)}
                  className={`relative transition-all duration-500 hover:scale-110 ${
                    isCompact ? "text-astera-900" : "text-white"
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                  </svg>
                  {mounted && favCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-astera-600 text-white text-[7px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                        {favCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setIsCartOpen(true)}
                  className={`relative transition-all duration-500 hover:scale-110 ${
                    isCompact ? "text-astera-900" : "text-white"
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                  <span className={`absolute -top-1 -right-1.5 text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center transition-all duration-500 ${
                    isCompact ? "bg-astera-900 text-white" : "bg-white text-astera-900 shadow-lg"
                  }`}>
                    {mounted ? cartCount : 0}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* FULL-SCREEN CINEMATIC MEGA MENU */}
        <div
          className={`absolute left-0 w-full bg-white transition-all duration-700 origin-top shadow-[0_80px_250px_rgba(0,0,0,0.3)] ${
            activeMenu
              ? "opacity-100 scale-y-100 pointer-events-auto border-t border-black/5"
              : "opacity-0 scale-y-95 pointer-events-none"
          }`}
          onMouseEnter={() => { if (menuTimeout) clearTimeout(menuTimeout); }}
          onMouseLeave={handleMouseLeave}
        >
          {activeMenu && menuData[activeMenu] && (
            <div className="container-luxury py-16 md:py-24 lg:py-32 min-h-[65vh] flex items-center">
              <div className="grid grid-cols-12 gap-12 xl:gap-20 w-full h-full">
                {/* Information Columns */}
                <div className="col-span-12 lg:col-span-8 flex items-center">
                  <div className="grid grid-cols-3 gap-10 xl:gap-16 w-full">
                    {menuData[activeMenu].columns.map((col) => (
                      <div key={col.title} className="space-y-10">
                        <h4 className="text-[10px] font-sans font-bold tracking-[0.4em] uppercase text-astera-300 border-b border-astera-50 pb-4 mb-6">
                          {col.title}
                        </h4>
                        <ul className="space-y-4 md:space-y-6">
                          {col.links.map((link) => (
                            <li key={link}>
                              <Link
                                href="/shop"
                                className="text-[16px] md:text-[20px] font-serif text-gray-400 hover:text-astera-800 hover:translate-x-2 transition-all duration-500 block italic font-light"
                              >
                                {link}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* THE CINEMATIC IMAGE ZONE */}
                <div className="hidden lg:flex col-span-4 pl-12 border-l border-astera-50 h-full min-h-[45vh] flex-col justify-center">
                  <div className="relative w-full h-[320px] rounded-[3rem] overflow-hidden group shadow-xl">
                    <img 
                      src={menuData[activeMenu].featuredImage} 
                      alt={menuData[activeMenu].featuredTitle}
                      className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/5" />
                    <div className="absolute bottom-10 left-0 w-full text-center px-8">
                         <p className="text-white text-[13px] font-serif italic tracking-[0.5em] uppercase drop-shadow-md">
                            {menuData[activeMenu].featuredTitle}
                         </p>
                    </div>
                  </div>
                  <Link href="/shop" className="mt-8 group/btn flex items-center gap-8 text-[12px] font-sans font-bold tracking-[0.3em] uppercase text-black hover:text-astera-900 transition-colors ml-4">
                    Istražite
                    <div className="w-12 h-[1px] bg-black group-hover:w-24 transition-all duration-700" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} /> 
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <FavouritesDrawer isOpen={isFavOpen} onClose={() => setIsFavOpen(false)} />
    </>
  );
}
