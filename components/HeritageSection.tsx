import React from "react";
import Image from "next/image";

export function HeritageSection() {
  return (
    <section className="bg-silver-light overflow-hidden">
      <div className="flex flex-col md:flex-row h-auto md:h-[650px]">
        {/* Left Side: Text */}
        <div className="md:w-1/2 p-12 lg:p-24 flex flex-col justify-center items-start bg-silver-light animate-fade-in-up">
          <span className="text-silver-dark uppercase tracking-[0.2em] text-xs font-bold mb-6">Croatian Heritage</span>
          <h2 className="font-serif text-4xl lg:text-5xl leading-tight text-anthracite mb-8">
            Centuries of Craftsmanship.
            <br /> Woven in Silver.
          </h2>
          <p className="text-anthracite/70 leading-relaxed mb-10 max-w-lg">
            At Argentum Stil, we preserve the rich history of Croatian jewelry making. From the renowned Šibenik buttons to intricate Konavle filigree, every piece is sculpted to reflect our authentic cultural heritage through a lens of modern luxury.
          </p>
          <button className="px-8 py-3 bg-anthracite text-white hover:bg-silver-dark transition-colors duration-300 uppercase tracking-widest text-xs font-semibold">
            Read Our Story
          </button>
        </div>

        {/* Right Side: Image Parallax */}
        <div className="md:w-1/2 relative h-96 md:h-full">
          <Image 
            src="https://images.unsplash.com/photo-1605100804763-247f52bcfed5?q=80&w=1200&auto=format&fit=crop" 
            alt="Traditional Croatian Jewelry Craftsmanship"
            fill
            className="object-cover origin-center animate-slow-zoom"
          />
          {/* Subtle overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-silver-light via-transparent to-transparent opacity-60 md:opacity-100 w-1/4"></div>
        </div>
      </div>
    </section>
  );
}
