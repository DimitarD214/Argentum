"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { useFavouritesStore } from "@/store/favouritesStore";
import dynamic from "next/dynamic";
import MobileNav from "./MobileNav";

const CartDrawer = dynamic(() => import("./CartDrawer"), { ssr: false }); 
const SearchOverlay = dynamic(() => import("./SearchOverlay"), { ssr: false });
const FavouritesDrawer = dynamic(() => import("./FavouritesDrawer"), { ssr: false });

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isCartOpen = useCartStore((state) => state.isCartOpen);
  const setIsCartOpen = useCartStore((state) => state.updateCartOpen); 
  const cartCount = useCartStore((state) => state.getCartCount());
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFavOpen, setIsFavOpen] = useState(false);
  const favCount = useFavouritesStore((state) => state.items.length);
  
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = ["Astera nakit", "Tradicijski nakit", "Vjerski nakit"];
  const isCompact = scrolled || pathname !== "/";

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-1000 ${
          isCompact ? "bg-astera-cream/90 backdrop-blur-md border-b border-astera-border shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-1000 ${isCompact ? "py-4" : "py-8"}`}>
            
            {/* Desktop Left Nav */}
            <nav className="hidden lg:flex items-center gap-10">
              {navItems.slice(0, 2).map((item) => (
                <Link
                  key={item}
                  href={`/shop/${item.toLowerCase().replace(/ /g, "-")}`}
                  className={`text-xs font-sans font-bold tracking-[0.2em] uppercase transition-colors duration-500 hover:text-astera-gold ${
                    isCompact ? "text-astera-text" : "text-astera-dark"
                  }`}
                >
                  {item}
                </Link>
              ))}
            </nav>

            {/* Mobile Hamburger */}
            <button 
              className="lg:hidden text-astera-dark hover:text-astera-gold transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
              </svg>
            </button>

            {/* Centered Logo */}
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none">
              <Link href="/" className="pointer-events-auto">
                <h1 className="text-3xl md:text-4xl font-serif tracking-[0.55em] uppercase text-astera-dark hover:text-astera-gold transition-colors duration-500">
                  ASTERA
                </h1>
              </Link>
            </div>

            {/* Desktop Right Nav & Icons */}
            <div className="flex items-center gap-6 md:gap-10">
              <nav className="hidden lg:flex items-center gap-10">
                <Link
                  href={`/shop/${navItems[2].toLowerCase().replace(/ /g, "-")}`}
                  className={`text-xs font-sans font-bold tracking-[0.2em] uppercase transition-colors duration-500 hover:text-astera-gold ${
                    isCompact ? "text-astera-text" : "text-astera-dark"
                  }`}
                >
                  {navItems[2]}
                </Link>
              </nav>

              <div className="flex items-center gap-6">
                <button onClick={() => setIsSearchOpen(true)} className="text-astera-dark hover:text-astera-gold transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </button>

                <button onClick={() => setIsFavOpen(true)} className="relative text-astera-dark hover:text-astera-gold transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                  {mounted && favCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-astera-gold text-astera-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-sm">
                        {favCount}
                    </span>
                  )}
                </button>

                <button onClick={() => setIsCartOpen(true)} className="relative text-astera-dark hover:text-astera-gold transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  <span className="absolute -top-2 -right-2 bg-astera-gold text-astera-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-sm">
                    {mounted ? cartCount : 0}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    
      <MobileNav isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} navItems={navItems} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} /> 
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <FavouritesDrawer isOpen={isFavOpen} onClose={() => setIsFavOpen(false)} />
    </>
  );
}
