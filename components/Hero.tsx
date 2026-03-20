"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";

const HERO_SLIDES = [
  {
    id: "Jewelry",
    title: "The Silver Collection.",
    subtitle: "Elegance, Defined. Explore our signature pieces.",
    image: "https://images.unsplash.com/photo-1599643478514-4a4e09f52f5e?q=80&w=2500&auto=format&fit=crop",
    link: "/shop?category=jewelry"
  },
  {
    id: "Watches",
    title: "Timeless Precision.",
    subtitle: "Discover the new Argentum chronographs.",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=2500&auto=format&fit=crop",
    link: "/shop?category=watches"
  },
  {
    id: "Gifts",
    title: "Gifts of Brilliance.",
    subtitle: "Find the perfect token of appreciation.",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2500&auto=format&fit=crop",
    link: "/shop?category=gifts"
  }
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-foreground">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_SLIDES[currentSlide].image})` }}
        >
          <div className="absolute inset-0 bg-black/30 transition-colors duration-[2000ms]"></div>
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 text-center px-4 flex flex-col items-center mt-20">
        <AnimatePresence mode="wait">
          <motion.p
            key={`sub-${currentSlide}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/90 uppercase tracking-[0.4em] text-xs font-semibold mb-6"
          >
            {HERO_SLIDES[currentSlide].subtitle}
          </motion.p>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.h1
            key={`title-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-serif text-6xl md:text-8xl lg:text-9xl text-white mb-12 max-w-5xl text-balance leading-none shadow-sm drop-shadow-lg"
          >
            {HERO_SLIDES[currentSlide].title}
          </motion.h1>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={`link-${currentSlide}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link 
              href={HERO_SLIDES[currentSlide].link}
              className="px-12 py-4 bg-white text-foreground font-semibold uppercase tracking-[0.2em] text-xs hover:bg-gray-100 transition-colors duration-300"
            >
              Discover
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Tabs / Indicators */}
      <div className="absolute bottom-12 left-0 right-0 z-20 flex justify-center space-x-12">
        {HERO_SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrentSlide(index)}
            className="group flex flex-col items-center space-y-3 cursor-pointer p-2"
          >
            <span className={clsx(
              "text-[11px] font-bold uppercase tracking-[0.25em] transition-colors duration-300",
              currentSlide === index ? "text-white" : "text-white/50 group-hover:text-white/80"
            )}>
              {slide.id}
            </span>
            <div className="h-[2px] w-12 bg-white/20 relative overflow-hidden">
              {currentSlide === index && (
                <motion.div 
                  layoutId="hero-indicator"
                  className="absolute inset-0 bg-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
