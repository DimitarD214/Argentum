/* ASTERA DESIGN SYSTEM: CONTEXTUAL LUXURY ARCHITECTURE */
"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import dynamic from "next/dynamic";
import { createClient } from "@/utils/supabase/client";
import type { User } from "@supabase/supabase-js";
import { useFavouritesStore } from "@/store/favouritesStore";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMounted } from "@/lib/utils";
import ShopMegaMenu from "./navigation/ShopMegaMenu";

const CartDrawer = dynamic(() => import("./CartDrawer"), { ssr: false });
const SearchOverlay = dynamic(() => import("./search/SearchOverlay"), { ssr: false });
const FavouritesDrawer = dynamic(() => import("./FavouritesDrawer"), { ssr: false });

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isShopMenuOpen, setIsShopMenuOpen] = useState(false);
  const [menuTimeout, setMenuTimeout] = useState<NodeJS.Timeout | null>(null);
  const isCartOpen = useCartStore((state) => state.isCartOpen);
  const setIsCartOpen = useCartStore((state) => state.updateCartOpen);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState<"astera" | "tradicijski" | null>(null);
  const [isFavOpen, setIsFavOpen] = useState(false);
  const favCount = useFavouritesStore((state) => state.items.length);
  const mounted = useIsMounted();
  const cartCount = useCartStore((state) => state.getCartCount());
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    setShowUserDropdown(false);
    window.location.href = "/";
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const openShopMenu = () => {
    if (menuTimeout) clearTimeout(menuTimeout);
    setIsShopMenuOpen(true);
  };

  const closeShopMenuDelayed = () => {
    const timeout = setTimeout(() => setIsShopMenuOpen(false), 200);
    setMenuTimeout(timeout);
  };

  const isHomePage = pathname === "/";
  const isCompact = scrolled || isShopMenuOpen || !isHomePage;

  const headerPaddingTop = isCompact ? "14px" : "28px";
  const headerPaddingBottom = isCompact ? "14px" : "16px";

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${
          isCompact
            ? "bg-cream/95 backdrop-blur-md border-b border-astera-200/70 shadow-[0_20px_60px_rgba(49,18,14,0.06)]"
            : "bg-transparent"
        }`}
      >
        {/* Top Announcement Bar — Solely "Besplatna dostava" */}
        <div className="flex items-center justify-center py-2.5 text-[9px] md:text-[10px] tracking-[0.4em] uppercase bg-astera-900 text-astera-100 font-sans font-bold border-b border-astera-800">
          Besplatna dostava
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-8 transition-all duration-700 relative">
          <div
            className="flex items-center justify-between transition-all duration-700"
            style={{ paddingTop: headerPaddingTop, paddingBottom: headerPaddingBottom }}
          >
            {/* Mobile Hamburger Button */}
            <button
              className="xl:hidden flex flex-col justify-center items-center w-8 h-8 z-50 relative cursor-pointer"
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
                if (isMobileMenuOpen) setMobileTab(null);
              }}
              aria-label="Otvori navigaciju"
            >
              <span
                className={`transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                  isMobileMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-1"
                }`}
                style={{
                  backgroundColor:
                    isCompact || isMobileMenuOpen ? "var(--color-astera-900)" : "white",
                }}
              />
              <span
                className={`transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
                style={{
                  backgroundColor:
                    isCompact || isMobileMenuOpen ? "var(--color-astera-900)" : "white",
                }}
              />
              <span
                className={`transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-1" : "translate-y-1"
                }`}
                style={{
                  backgroundColor:
                    isCompact || isMobileMenuOpen ? "var(--color-astera-900)" : "white",
                }}
              />
            </button>

            {/* Left Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-10">
              {/* Interactive "Shop" Mega Menu Trigger */}
              <div
                onMouseEnter={openShopMenu}
                onMouseLeave={closeShopMenuDelayed}
                className="relative group py-3"
              >
                <Link
                  href="/shop"
                  className={`text-[11px] font-sans font-bold tracking-[0.25em] uppercase transition-all duration-500 flex items-center gap-2 ${
                    isShopMenuOpen
                      ? "text-astera-900"
                      : isCompact
                      ? "text-charcoal/80 hover:text-astera-900"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  <span>Shop</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`w-3 h-3 transition-transform duration-300 ${
                      isShopMenuOpen ? "rotate-180" : ""
                    }`}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </Link>
                <div className="absolute bottom-0 left-0 w-full flex justify-center">
                  <div
                    className={`h-[1.5px] bg-astera-500 transition-all duration-500 w-0 group-hover:w-full ${
                      isShopMenuOpen ? "w-full" : ""
                    }`}
                  />
                </div>
              </div>

              <Link
                href="/shop/zlatni-nakit"
                className={`text-[11px] font-sans font-bold tracking-[0.25em] uppercase transition-all duration-500 py-3 relative group ${
                  isCompact
                    ? "text-astera-700 hover:text-astera-900"
                    : "text-astera-200 hover:text-white"
                }`}
              >
                Zlatni nakit
                <span className="absolute bottom-0 left-0 h-[1.5px] bg-astera-500 transition-all duration-500 w-0 group-hover:w-full" />
              </Link>
            </nav>

            {/* Centered Brand Logo */}
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center min-w-[240px] h-full z-20 pointer-events-none">
              <Link href="/" className="pointer-events-auto group text-center">
                <h1
                  className={`text-[20px] md:text-[25px] font-serif font-light tracking-[0.5em] uppercase transition-all duration-700 group-hover:tracking-[0.55em] ${
                    isCompact ? "text-astera-900" : "text-white drop-shadow-2xl"
                  }`}
                >
                  ASTERA
                </h1>
              </Link>
            </div>

            {/* Right Nav & Action Icons */}
            <div className="flex items-center gap-8">
              <nav className="hidden xl:flex items-center gap-8 mr-2">
                <Link
                  href="/#story"
                  className={`text-[11px] font-sans font-bold tracking-[0.22em] uppercase transition-all duration-500 ${
                    isCompact
                      ? "text-charcoal/70 hover:text-astera-900"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  Naša Baština
                </Link>
              </nav>

              <div className="flex items-center gap-6 md:gap-7">
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className={`transition-all duration-500 hover:scale-110 cursor-pointer ${
                    isCompact ? "text-astera-900" : "text-white"
                  }`}
                  aria-label="Pretraži"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.2}
                    stroke="currentColor"
                    className="w-5 h-5 md:w-6 md:h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </button>

                <button
                  onClick={() => setIsFavOpen(true)}
                  className={`relative transition-all duration-500 hover:scale-110 cursor-pointer ${
                    isCompact ? "text-astera-900" : "text-white"
                  }`}
                  aria-label="Favoriti"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.2}
                    stroke="currentColor"
                    className="w-5 h-5 md:w-6 md:h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                  {mounted && favCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-astera-600 text-white text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                      {favCount}
                    </span>
                  )}
                </button>

                <div
                  className="relative group/user py-2"
                  onMouseEnter={() => setShowUserDropdown(true)}
                  onMouseLeave={() => setShowUserDropdown(false)}
                >
                  <Link
                    href={user ? "/account" : "/login"}
                    className={`transition-all duration-500 hover:scale-110 block ${
                      isCompact ? "text-astera-900" : "text-white"
                    }`}
                    aria-label="Korisnički račun"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.2}
                      stroke="currentColor"
                      className="w-5 h-5 md:w-6 md:h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>
                  </Link>

                  {user && showUserDropdown && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-cream border border-astera-200 rounded-xl shadow-xl py-3 z-50 transition-all duration-300">
                      <Link
                        href="/account"
                        className="block px-5 py-2.5 text-xs text-astera-900 hover:bg-astera-100 transition-colors font-sans font-bold uppercase tracking-wider border-b border-astera-200/50"
                        onClick={() => setShowUserDropdown(false)}
                      >
                        Moj profil
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left block px-5 py-2.5 text-xs text-red-700 hover:bg-red-50 transition-colors font-sans font-bold uppercase tracking-wider cursor-pointer"
                      >
                        Odjava
                      </button>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setIsCartOpen(true)}
                  className={`relative transition-all duration-500 hover:scale-110 cursor-pointer ${
                    isCompact ? "text-astera-900" : "text-white"
                  }`}
                  aria-label="Košarica"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.2}
                    stroke="currentColor"
                    className="w-5 h-5 md:w-6 md:h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                  <span
                    className={`absolute -top-1 -right-1.5 text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center transition-all duration-500 ${
                      isCompact
                        ? "bg-astera-900 text-astera-100"
                        : "bg-astera-200 text-astera-900 shadow-lg"
                    }`}
                  >
                    {mounted ? cartCount : 0}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* DESKTOP INTERACTIVE 50/50 SPLIT "SHOP" MEGA MENU */}
        <ShopMegaMenu
          isOpen={isShopMenuOpen}
          onMouseEnter={openShopMenu}
          onMouseLeave={closeShopMenuDelayed}
          onClose={() => setIsShopMenuOpen(false)}
        />

        {/* MOBILE & TABLET FULL SCREEN MENU (Pictures-only first, tap one to reveal subcategories in place of the other) */}
        <div
          className={`fixed inset-0 bg-cream z-[90] transition-all duration-500 xl:hidden overflow-y-auto ${
            isMobileMenuOpen
              ? "opacity-100 pointer-events-auto translate-y-0"
              : "opacity-0 pointer-events-none -translate-y-6"
          }`}
        >
          <div className="pt-28 pb-24 px-6 md:px-10 flex flex-col gap-6 min-h-screen max-w-2xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Mobile Slot 1: Astera Picture OR Tradicijski Subcategories */}
              {mobileTab !== "tradicijski" ? (
                <button
                  type="button"
                  onClick={() => setMobileTab(mobileTab === "astera" ? null : "astera")}
                  className="relative h-56 rounded-2xl overflow-hidden border border-astera-300/70 shadow-md text-left cursor-pointer group"
                >
                  <Image
                    src="/images/astera-showcase.jpg"
                    alt="Astera Nakit"
                    fill
                    sizes="100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-astera-900/90 via-astera-900/20 to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between text-white">
                    <div>
                      <span className="text-[9px] font-sans uppercase tracking-[0.3em] text-astera-200 block mb-1">
                        Rođena da sjaji
                      </span>
                      <h4 className="font-serif text-2xl uppercase">Astera Nakit</h4>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-sans uppercase tracking-widest">
                      {mobileTab === "astera" ? "Aktivno" : "Odaberi"}
                    </span>
                  </div>
                </button>
              ) : (
                <div className="rounded-2xl bg-warm-beige border border-astera-300 p-5 flex flex-col gap-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-astera-200">
                    <span className="font-serif text-lg text-astera-900 uppercase">
                      Tradicijski Nakit
                    </span>
                    <button
                      type="button"
                      onClick={() => setMobileTab(null)}
                      className="text-[10px] font-sans font-bold uppercase tracking-widest text-astera-600 cursor-pointer"
                    >
                      ✕ Obje slike
                    </button>
                  </div>
                  <Link
                    href="/shop/tradicijski-nakit/prstenje"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-lg bg-astera-900 text-white font-sans text-xs font-bold uppercase tracking-[0.2em]"
                  >
                    <span>Prstenje</span>
                    <span>→</span>
                  </Link>
                  <Link
                    href="/shop/tradicijski-nakit/nausnice"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-lg bg-cream border border-astera-200 text-astera-900 font-sans text-xs font-bold uppercase tracking-[0.2em]"
                  >
                    <span>Naušnice</span>
                    <span>→</span>
                  </Link>
                  <Link
                    href="/shop/tradicijski-nakit/narukvice"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-lg bg-cream border border-astera-200 text-astera-900 font-sans text-xs font-bold uppercase tracking-[0.2em]"
                  >
                    <span>Narukvice</span>
                    <span>→</span>
                  </Link>
                  <Link
                    href="/shop/tradicijski-nakit/ogrlice"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-lg bg-cream border border-astera-200 text-astera-900 font-sans text-xs font-bold uppercase tracking-[0.2em]"
                  >
                    <span>Ogrlice</span>
                    <span>→</span>
                  </Link>
                  <Link
                    href="/shop/tradicijski-nakit"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-lg border border-astera-300 text-astera-900 font-sans text-xs font-bold uppercase tracking-[0.2em]"
                  >
                    <span>Sav tradicijski nakit</span>
                    <span>→</span>
                  </Link>
                </div>
              )}

              {/* Mobile Slot 2: Tradicijski Picture OR Astera Subcategories */}
              {mobileTab !== "astera" ? (
                <button
                  type="button"
                  onClick={() =>
                    setMobileTab(mobileTab === "tradicijski" ? null : "tradicijski")
                  }
                  className="relative h-56 rounded-2xl overflow-hidden border border-astera-300/70 shadow-md text-left cursor-pointer group"
                >
                  <Image
                    src="/images/tradicijski-showcase.jpg"
                    alt="Tradicijski Nakit"
                    fill
                    sizes="100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-astera-900/90 via-astera-900/20 to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between text-white">
                    <div>
                      <span className="text-[9px] font-sans uppercase tracking-[0.3em] text-astera-200 block mb-1">
                        Zlatno nasljeđe
                      </span>
                      <h4 className="font-serif text-2xl uppercase">Tradicijski Nakit</h4>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-sans uppercase tracking-widest">
                      {mobileTab === "tradicijski" ? "Aktivno" : "Odaberi"}
                    </span>
                  </div>
                </button>
              ) : (
                <div className="rounded-2xl bg-warm-beige border border-astera-300 p-5 flex flex-col gap-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-astera-200">
                    <span className="font-serif text-lg text-astera-900 uppercase">
                      Astera Nakit
                    </span>
                    <button
                      type="button"
                      onClick={() => setMobileTab(null)}
                      className="text-[10px] font-sans font-bold uppercase tracking-widest text-astera-600 cursor-pointer"
                    >
                      ✕ Obje slike
                    </button>
                  </div>
                  <Link
                    href="/shop/astera-nakit/ogrlice"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-lg bg-astera-900 text-white font-sans text-xs font-bold uppercase tracking-[0.2em]"
                  >
                    <span>Ogrlice</span>
                    <span>→</span>
                  </Link>
                  <Link
                    href="/shop/astera-nakit/nausnice"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-lg bg-cream border border-astera-200 text-astera-900 font-sans text-xs font-bold uppercase tracking-[0.2em]"
                  >
                    <span>Naušnice</span>
                    <span>→</span>
                  </Link>
                  <Link
                    href="/shop/astera-nakit/prstenje"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-lg bg-cream border border-astera-200 text-astera-900 font-sans text-xs font-bold uppercase tracking-[0.2em]"
                  >
                    <span>Prstenje</span>
                    <span>→</span>
                  </Link>
                  <Link
                    href="/shop/astera-nakit/narukvice"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-lg bg-cream border border-astera-200 text-astera-900 font-sans text-xs font-bold uppercase tracking-[0.2em]"
                  >
                    <span>Narukvice</span>
                    <span>→</span>
                  </Link>
                  <Link
                    href="/shop/astera-nakit"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-lg border border-astera-300 text-astera-900 font-sans text-xs font-bold uppercase tracking-[0.2em]"
                  >
                    <span>Cijeli Astera katalog</span>
                    <span>→</span>
                  </Link>
                </div>
              )}
            </div>

            <div className="border-t border-astera-200 pt-6 space-y-4">
              <Link
                href="/shop/zlatni-nakit"
                className="text-xl font-serif text-astera-800 tracking-wide hover:text-astera-900 transition-colors flex items-center justify-between"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>Zlatni nakit (14k Zlato)</span>
                <span>→</span>
              </Link>
              <Link
                href={user ? "/account" : "/login"}
                className="text-xl font-serif text-astera-900 tracking-wide hover:text-astera-700 transition-colors block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {user ? "Moj profil" : "Prijava"}
              </Link>
              {user && (
                <button
                  onClick={handleSignOut}
                  className="text-xl font-serif text-red-700 tracking-wide hover:text-red-900 transition-colors block w-full text-left cursor-pointer"
                >
                  Odjava
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mounted && isShopMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-astera-900/20 backdrop-blur-xs z-[80] pointer-events-none"
          />
        )}
      </AnimatePresence>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <FavouritesDrawer isOpen={isFavOpen} onClose={() => setIsFavOpen(false)} />
    </>
  );
}
