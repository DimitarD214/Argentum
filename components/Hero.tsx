import React from "react";
import Link from "next/link";

export function Hero() {
  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Cinematic Silver Parallax Background */}
      <div 
        className="absolute inset-0 bg-fixed bg-cover bg-center z-0 scale-105 animate-slow-zoom"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1599643478514-4a4e09f52f5e?q=80&w=2500&auto=format&fit=crop')",
        }}
      >
        {/* Soft dark overlay for text contrast */}
        <div className="absolute inset-0 bg-anthracite/50 transition-colors duration-[2000ms]"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 flex flex-col items-center mt-12">
        <p className="text-white/90 uppercase tracking-[0.4em] text-xs font-semibold mb-6 animate-fade-in-up">The Silver Collection</p>
        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-white mb-10 max-w-5xl text-balance leading-none animate-fade-in-up shadow-sm drop-shadow-lg" style={{ animationDelay: '200ms' }}>
          Elegance, Defined.
        </h1>
        <Link 
          href="/shop" 
          className="group relative px-10 py-5 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold uppercase tracking-[0.2em] text-xs overflow-hidden animate-fade-in-up hover:border-white transition-all duration-500"
          style={{ animationDelay: '400ms' }}
        >
          <span className="relative z-10 transition-colors duration-500 group-hover:text-anthracite">Shop Collection</span>
          <div className="absolute inset-0 bg-white scale-x-0 origin-left transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-x-100 z-0"></div>
        </Link>
      </div>
    </div>
  );
}
