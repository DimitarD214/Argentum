"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { formatEUR } from "@/lib/pricing";
import { useCartStore } from "@/store/cartStore";
import products from "@/data/products.json";

type CatalogProduct = (typeof products)[number];

const bestsellers = products.filter((p) =>
  [
    "astera-nocturne-safirna-ogrlica",
    "splitske-kosarice",
    "zlatni-prsten-kameja",
    "paske-peruzine-biseri",
    "dubrovacke-nausnice-koralj",
    "zlatna-narukvica-botuni",
    "astera-celeste-safirne-nausnice",
    "cvjetne-filigran-biser",
  ].includes(p.id)
);

const AUTOPLAY_INTERVAL_MS = 2800;

export default function BestsellersCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [isHovered, setIsHovered] = useState(false);
  const [isClickedPaused, setIsClickedPaused] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const updateCartOpen = useCartStore((state) => state.updateCartOpen);

  useEffect(() => {
    const updateLayout = () => {
      const w = window.innerWidth;
      if (w < 640) setItemsPerView(1);
      else if (w < 1024) setItemsPerView(2);
      else if (w < 1280) setItemsPerView(3);
      else setItemsPerView(4);
    };
    updateLayout();
    window.addEventListener("resize", updateLayout, { passive: true });
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  const maxIndex = Math.max(0, bestsellers.length - itemsPerView);
  const isPaused = isHovered || isClickedPaused;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Automatic carousel movement — stops immediately when hovered or clicked
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, AUTOPLAY_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const handleQuickAdd = (item: CatalogProduct) => {
    setIsClickedPaused(true);
    const price = item.price?.gold_14k || item.price?.sterling_silver || 0;
    const metal = item.price?.gold_14k ? "14k Zlato" : "925 Srebro";
    addItem({
      id: item.id,
      name: item.name,
      price,
      quantity: 1,
      image: item.images?.[0],
      metal,
    });
    updateCartOpen(true);
  };

  return (
    <section
      className="bg-warm-beige py-24 md:py-32 overflow-hidden border-b border-astera-200/60"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsClickedPaused(false);
      }}
      onPointerDown={() => setIsClickedPaused(true)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 md:mb-18 gap-8">
          <div>
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.35em] text-astera-600 mb-3">
              Izbor Klijenata • Astera
            </p>
            <h3 className="font-serif uppercase tracking-wider leading-tight text-astera-900 text-2xl md:text-3xl lg:text-4xl">
              Najprodavaniji proizvodi
            </h3>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => {
                setIsClickedPaused(true);
                prevSlide();
              }}
              aria-label="Prethodni proizvodi"
              className="w-12 h-12 rounded-full border border-astera-300 bg-white/80 hover:bg-astera-900 hover:text-white hover:border-astera-900 text-astera-900 flex items-center justify-center transition-all duration-300 cursor-pointer shadow-xs"
            >
              &larr;
            </button>
            <button
              type="button"
              onClick={() => {
                setIsClickedPaused(true);
                nextSlide();
              }}
              aria-label="Sljedeći proizvodi"
              className="w-12 h-12 rounded-full border border-astera-300 bg-white/80 hover:bg-astera-900 hover:text-white hover:border-astera-900 text-astera-900 flex items-center justify-center transition-all duration-300 cursor-pointer shadow-xs"
            >
              &rarr;
            </button>
            <Link
              href="/shop"
              className="ml-4 hidden sm:inline-flex items-center gap-3 text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-astera-800 hover:text-astera-900"
            >
              <span>Cijela Ponuda</span>
              <span className="w-8 h-[1px] bg-astera-800" />
            </Link>
          </div>
        </div>

        {/* Swipeable / Animated Carousel Track */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex -mx-3"
            animate={{ x: `-${currentIndex * (100 / itemsPerView)}%` }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragStart={() => setIsClickedPaused(true)}
            onDragEnd={(_e, info) => {
              if (info.offset.x < -50) nextSlide();
              else if (info.offset.x > 50) prevSlide();
            }}
          >
            {bestsellers.map((item) => {
              const price = item.price?.gold_14k || item.price?.sterling_silver || 0;
              const tag = item.badges?.[0] || "Bestseller";

              return (
                <div
                  key={item.id}
                  style={{ width: `${100 / itemsPerView}%` }}
                  className="shrink-0 px-3"
                  onClick={() => setIsClickedPaused(true)}
                >
                  <div className="bg-cream rounded-2xl border border-astera-200/80 shadow-[0_8px_30px_rgba(49,18,14,0.05)] overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_16px_45px_rgba(49,18,14,0.1)] h-full flex flex-col group">
                    <div className="relative aspect-square bg-warm-beige overflow-hidden">
                      <span className="inline-flex items-center px-3.5 py-1 rounded-full font-sans text-[9px] font-bold tracking-[0.18em] uppercase bg-astera-900/85 backdrop-blur-md text-astera-100 absolute top-4 left-4 z-10">
                        {tag}
                      </span>

                      <Link href={`/shop/${item.id}`} className="block w-full h-full relative">
                        <Image
                          src={item.images?.[0] || "/images/astera-showcase.jpg"}
                          alt={item.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                      </Link>
                    </div>

                    <div className="p-6 md:p-7 flex flex-col flex-1 justify-between text-center">
                      <div>
                        <p className="text-[9px] font-sans uppercase tracking-[0.25em] text-astera-500 font-bold mb-2">
                          {item.stoneColor}
                        </p>
                        <Link href={`/shop/${item.id}`}>
                          <h4 className="font-serif text-sm md:text-base text-astera-900 mb-2 line-clamp-1 hover:text-astera-600 transition-colors">
                            {item.name}
                          </h4>
                        </Link>
                        <p className="font-serif text-base md:text-lg text-astera-800 italic mb-6">
                          {formatEUR(price)}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        <Link
                          href={`/shop/${item.id}`}
                          className="py-3 px-3 rounded-sm border border-astera-300 text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-astera-900 hover:bg-astera-100 transition-colors flex items-center justify-center"
                        >
                          Detalji
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleQuickAdd(item)}
                          className="py-3 px-3 rounded-sm bg-astera-900 text-white text-[9px] font-sans font-bold uppercase tracking-[0.2em] hover:bg-astera-700 transition-colors cursor-pointer"
                        >
                          Dodaj
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Progress Indicators + Auto-Play Status */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3">
          <div className="flex items-center justify-center gap-2.5">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setIsClickedPaused(true);
                  setCurrentIndex(idx);
                }}
                aria-label={`Stranica ${idx + 1}`}
                className={`relative h-1.5 rounded-full overflow-hidden transition-all duration-300 cursor-pointer ${
                  currentIndex === idx
                    ? "w-12 bg-astera-300"
                    : "w-2.5 bg-astera-300 hover:bg-astera-500"
                }`}
              >
                {currentIndex === idx && (
                  <motion.span
                    key={`${currentIndex}-${isPaused ? "paused" : "playing"}`}
                    initial={{ width: isPaused ? "100%" : "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: isPaused ? 0.2 : AUTOPLAY_INTERVAL_MS / 1000,
                      ease: "linear",
                    }}
                    className="absolute inset-y-0 left-0 bg-astera-800 rounded-full"
                  />
                )}
              </button>
            ))}
          </div>
          <span className="text-[9px] font-sans uppercase tracking-[0.25em] text-astera-600/80">
            {isPaused ? "Pauzirano tijekom pregleda" : "Automatski prikaz"}
          </span>
        </div>
      </div>
    </section>
  );
}
