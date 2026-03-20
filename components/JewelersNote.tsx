import React from "react";

export function JewelersNote() {
  return (
    <section className="py-32 px-6 bg-background flex flex-col items-center text-center">
      <div className="max-w-4xl mx-auto space-y-10">
        <p className="text-silver-dark uppercase tracking-[0.3em] text-xs font-bold">The Argentum Legacy</p>
        <h2 className="font-serif text-4xl md:text-6xl leading-tight text-anthracite text-balance">
          "Jewelry is more than an accessory; it is a reflection of heritage, emotion, and timeless style. We craft pieces designed to be worn effortlessly every day."
        </h2>
        <div className="pt-8">
          <p className="font-serif italic text-3xl text-anthracite/60 drop-shadow-sm">Argentum Stil</p>
          <p className="text-xs uppercase tracking-widest text-anthracite/40 mt-3 font-semibold">Master Goldsmiths Since 2008</p>
        </div>
      </div>
    </section>
  );
}
