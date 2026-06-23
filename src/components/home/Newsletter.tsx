"use client";
﻿import React from "react";
import ScrollReveal from "../ScrollReveal";
import { Button } from "../ui/Button";

export default function Newsletter() {
  return (
    <section className="relative py-32 md:py-48 bg-astera-900 overflow-hidden flex items-center justify-center px-4">
      {/* Decorative blurred circles for glassmorphism background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-astera-600/30 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-astera-800/50 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3" />
      
      <div className="max-w-3xl mx-auto px-6 md:px-8 relative z-10 text-center backdrop-blur-sm bg-black/10 p-8 md:p-16 lg:p-20 rounded-[2rem] md:rounded-[3rem] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
        <ScrollReveal>
          <p className="subfont-serif tracking-widest uppercase leading-tight text-astera-900 text-astera-300 mb-6 font-bold tracking-[0.1em] md:tracking-[0.15em]">Pridružite se Asteri</p>
          <h3 className="font-serif tracking-widest uppercase leading-tight text-astera-900 text-white text-3xl md:text-5xl lg:text-6xl mb-8 leading-tight tracking-[0.1em] md:tracking-[0.15em]">
            Pristup Ekskluzivi
          </h3>
          <p className="text-astera-100/70 font-sans text-sm md:text-base leading-relaxed mb-10 max-w-xl mx-auto italic">
            Pretplatite se na naš žurnal i budite prvi koji će otkriti nove kolekcije, tajne izrade i pozivnice na privatne događaje.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Vaša Email Adresa" 
              className="flex-grow bg-white/5 border border-white/20 rounded-[2px] px-6 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-astera-300 transition-colors font-sans text-sm tracking-wider"
              required
            />
            <Button variant="white" type="submit" className="whitespace-nowrap px-8 md:px-12">
              Pretplati se
            </Button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
