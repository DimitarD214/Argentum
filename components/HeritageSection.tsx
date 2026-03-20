"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export function HeritageSection() {
  return (
    <section className="bg-silver-light overflow-hidden">
      <div className="flex flex-col md:flex-row h-auto md:min-h-[600px]">
        {/* Left Side: Text */}
        <div className="md:w-1/2 p-12 lg:p-24 flex flex-col justify-center items-start bg-silver-light">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-foreground uppercase tracking-[0.25em] text-[10px] font-bold mb-6 block">Croatian Heritage</span>
            <h2 className="font-serif text-4xl lg:text-5xl leading-tight text-foreground mb-8">
              Centuries of Craftsmanship.<br/> Woven in Silver.
            </h2>
            <p className="text-gray-600 leading-relaxed mb-10 max-w-lg text-sm">
              At Argentum Stil, we preserve the rich history of Croatian jewelry making. From the renowned Šibenik buttons to intricate Konavle filigree, every piece is sculpted to reflect our authentic cultural heritage through a lens of modern luxury, mirroring the exquisite attention to detail found in global heritage brands.
            </p>
            <button className="px-10 py-4 bg-foreground text-white hover:bg-gray-800 transition-colors duration-300 uppercase tracking-[0.2em] text-[11px] font-semibold">
              Read Our Story
            </button>
          </motion.div>
        </div>

        {/* Right Side: Image Parallax */}
        <div className="md:w-1/2 relative h-[70vh] md:h-auto overflow-hidden">
          <motion.div
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-full relative"
          >
            <Image 
              src="https://images.unsplash.com/photo-1605100804763-247f52bcfed5?q=80&w=1200&auto=format&fit=crop" 
              alt="Traditional Croatian Jewelry Craftsmanship"
              fill
              className="object-cover origin-center"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
