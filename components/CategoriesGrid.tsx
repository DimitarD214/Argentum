"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export function CategoriesGrid() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-0 bg-white">
      <div className="flex flex-col items-center">

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-12 md:mb-16 space-y-4 px-4 max-w-2xl"
        >
          <motion.h2 variants={itemVariants} className="font-serif text-3xl md:text-5xl text-foreground">Curated For You</motion.h2>
          <motion.p variants={itemVariants} className="text-gray-500 max-w-xl mx-auto pt-2 text-sm">
            Explore our defining collections, from timeless traditional motifs to modern silver elegance.
          </motion.p>
          <motion.div variants={itemVariants} className="pt-4">
             <Link href="/shop" className="text-xs uppercase font-semibold tracking-widest border-b border-foreground pb-1 hover:text-gray-500 transition-colors">
               Shop All Collections
             </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 w-full h-auto md:h-[550px] lg:h-[600px]"
        >
          {/* Large Left Column */}
          <motion.div variants={itemVariants} className="md:col-span-7 relative group overflow-hidden block h-64 sm:h-80 md:h-full bg-ice">
            <Link href="/shop" className="absolute inset-0 z-20"></Link>
            <Image
              src="https://images.unsplash.com/photo-1599643478514-4a4e09f52f5e?q=80&w=1200&auto=format&fit=crop"
              alt="Silver Elegance"
              fill
              className="object-cover transition-transform duration-[2000ms] group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent h-1/2 opacity-80 z-10" />
            <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 text-white z-20 transition-transform duration-500 group-hover:-translate-y-2 pointer-events-none">
              <h3 className="font-serif text-2xl sm:text-3xl md:text-3xl mb-1 md:mb-2">Silver Elegance</h3>
              <span className="text-xs font-semibold uppercase tracking-widest border-b border-white pb-1">Explore</span>
            </div>
          </motion.div>

          {/* Right Column Stack */}
          <div className="md:col-span-5 flex flex-col gap-3 md:gap-4 h-auto md:h-full">
            {/* Top Right */}
            <motion.div variants={itemVariants} className="relative flex-1 group overflow-hidden block bg-blush min-h-32 md:min-h-0">
              <Link href="/shop" className="absolute inset-0 z-20"></Link>
              <Image
                src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=800&auto=format&fit=crop"
                alt="Luxury Watches"
                fill
                className="object-cover transition-transform duration-[2000ms] group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent h-1/2 opacity-80 z-10" />
              <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-3 sm:left-4 md:left-6 text-white z-20 transition-transform duration-500 group-hover:-translate-y-2 pointer-events-none">
                <h3 className="font-serif text-lg sm:text-xl md:text-2xl mb-1">Men's Watches</h3>
                <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.15em] md:tracking-[0.2em] border-b border-white pb-1">Shop Timepieces</span>
              </div>
            </motion.div>

            {/* Bottom Right */}
            <motion.div variants={itemVariants} className="relative flex-1 group overflow-hidden block bg-ice min-h-32 md:min-h-0">
              <Link href="/shop" className="absolute inset-0 z-20"></Link>
              <Image
                src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop"
                alt="Heritage Collection"
                fill
                className="object-cover transition-transform duration-[2000ms] group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent h-1/2 opacity-80 z-10" />
              <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-3 sm:left-4 md:left-6 text-white z-20 transition-transform duration-500 group-hover:-translate-y-2 pointer-events-none">
                <h3 className="font-serif text-lg sm:text-xl md:text-2xl mb-1">Traditional Heritage</h3>
                <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.15em] md:tracking-[0.2em] border-b border-white pb-1">Discover History</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
