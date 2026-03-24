import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import SparkleOverlay from "@/components/SparkleOverlay";
import BotanicalDivider from "@/components/BotanicalDivider";

export default function Home() {
  const categories = [
    { name: "Necklaces", bg: "#e0f5e9" },
    { name: "Rings", bg: "#d4edda" },
    { name: "Earrings", bg: "#e0f5e9" },
    { name: "Bracelets", bg: "#d4edda" },
  ];

  const featured = [
    { name: "Emerald Butterfly Ring", price: "From $120", tag: "New In" },
    { name: "Floral Droplet Earrings", price: "From $150", tag: "Limited Edition" },
    { name: "Forest Greens Necklace", price: "From $210", tag: null },
    { name: "Rose Petal Bracelet", price: "From $180", tag: "Handcrafted" },
  ];

  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* ========== HERO SECTION ========== */}
        <section className="relative w-full h-screen overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-spring-900 via-spring-800 to-spring-700 parallax-bg" />
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_20%_50%,_#91dbb1_0%,_transparent_50%),radial-gradient(ellipse_at_80%_20%,_#c1ebd3_0%,_transparent_50%)]" />
          <SparkleOverlay />
          <div className="absolute inset-0 flex items-center justify-center z-[3]">
            <div className="text-center text-white/10 font-sans text-[10px] tracking-[0.3em] uppercase">
              <div className="w-20 h-20 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-4 hover:border-white/30 hover:scale-110 transition-all duration-500 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7 ml-1">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              Spring 2026 Campaign Video
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-[4]" />

          {/* Hero content — centered */}
          <div className="relative z-10 h-full w-full flex items-end justify-center pb-20 md:pb-28 px-6">
            <div className="text-center max-w-2xl animate-[fadeSlideUp_1.2s_ease-out_0.3s_both]">
              <p className="text-spring-300 font-sans text-[11px] md:text-[12px] tracking-[0.25em] uppercase mb-6 font-medium animate-[fadeSlideUp_1s_ease-out_0.5s_both]">
                Spring Collection 2026
              </p>
              <h2 className="text-white font-serif text-6xl md:text-8xl lg:text-[7.5rem] leading-[1.1] mb-8 tracking-[0.02em] animate-[fadeSlideUp_1.2s_ease-out_0.7s_both]">
                A New Season
                <br />
                of Brilliance
              </h2>
              <p className="text-white/60 font-sans text-[14px] md:text-[15px] leading-[1.8] mb-12 tracking-wide max-w-lg mx-auto animate-[fadeSlideUp_1s_ease-out_0.9s_both]">
                Inspired by the renewal of spring. Handcrafted pieces
                featuring butterfly motifs, floral elegance, and forest greens.
              </p>
              <div className="flex flex-wrap gap-4 justify-center animate-[fadeSlideUp_1s_ease-out_1.1s_both]">
                <Link href="/shop" className="btn-spring">
                  Shop Now
                </Link>
                <Link href="#discover" className="btn-outline !text-white !border-white/40 hover:!bg-white hover:!text-spring-900">
                  Discover More
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="h-1 bg-gradient-to-r from-spring-300 via-spring-500 to-spring-300 opacity-40" />

        {/* ========== BRAND STORY ========== */}
        <section className="bg-spring-50 py-48 md:py-64 px-6 flex flex-col items-center">
          <div className="w-full max-w-[1720px] px-12 md:px-24 text-center">
            <ScrollReveal className="w-full flex flex-col items-center" duration={1000}>
              <BotanicalDivider className="mb-10" />
            </ScrollReveal>
            <ScrollReveal className="w-full flex flex-col items-center" delay={100} duration={1000}>
              <h2 className="font-serif text-5xl md:text-6xl lg:text-[5.5rem] text-spring-900 mb-10 leading-[1.2] tracking-[0.03em]">
                Artisans of Light
                <br />
                Since 2024
              </h2>
            </ScrollReveal>
            <ScrollReveal className="w-full flex flex-col items-center" delay={250} duration={1000}>
              <p className="font-sans text-[18px] md:text-[19px] text-spring-700 leading-[2] tracking-[0.01em] max-w-xl mx-auto text-center text-center">
                From the heart of Europe, our passion for innovation, design, and mastery
                of precious materials has defined Argentum as a rising star in artisan
                jewelry and accessories.
              </p>
            </ScrollReveal>
            <ScrollReveal className="w-full flex flex-col items-center" delay={400} duration={1000}>
              <BotanicalDivider className="mt-10" />
            </ScrollReveal>
          </div>
        </section>

        {/* ========== SHOP BY CATEGORY ========== */}
        <section id="discover" className="bg-white py-48 md:py-64 px-6 flex flex-col items-center">
          <div className="w-full max-w-[1720px] px-12 md:px-32">
            <ScrollReveal className="w-full flex flex-col items-center">
              <div className="text-center mb-20">
                <h2 className="font-serif text-5xl md:text-7xl lg:text-[5.8rem] text-black mb-6 tracking-[0.03em]">
                  Shop by Category
                </h2>
                <div className="w-8 h-8 mx-auto flex items-center justify-center animate-bounce">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-5 h-5 text-spring-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 justify-center">
              {categories.map((cat, i) => (
                <ScrollReveal className="w-full flex flex-col items-center" key={cat.name} delay={i * 120} direction="up">
                  <Link href="/shop" className="group block card-hover">
                    <div
                      className="aspect-[3/4] flex items-center justify-center overflow-hidden img-zoom rounded-xl"
                      style={{ backgroundColor: cat.bg }}
                    >
                      <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-spring-500">
                        Product Image
                      </span>
                    </div>
                    <p className="text-center font-sans text-[13px] font-medium tracking-[0.06em] text-black mt-6 group-hover:text-spring-600 transition-colors duration-300">
                      {cat.name}
                    </p>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <div className="bg-spring-50">
          <ScrollReveal className="w-full flex flex-col items-center">
            <BotanicalDivider className="py-2" />
          </ScrollReveal>
        </div>

        {/* ========== SPRING FAVOURITES ========== */}
        <section className="bg-spring-50 py-48 md:py-64 px-6 flex flex-col items-center">
          <div className="w-full max-w-[1720px] px-12 md:px-32">
            <ScrollReveal className="w-full flex flex-col items-center">
              <div className="text-center mb-16">
                <h2 className="font-serif text-4xl md:text-6xl lg:text-[5rem] text-black tracking-[0.03em]">
                  Spring Favourites
                </h2>
                <p className="font-sans text-[15px] text-spring-600 mt-4 tracking-[0.08em] max-w-md mx-auto text-center text-center">
                  Our most-loved pieces this season
                </p>
                <div className="mt-8">
                  <Link
                    href="/shop"
                    className="text-[12px] font-sans font-medium text-spring-700 underline underline-offset-4 hover:text-spring-500 transition-colors duration-300"
                  >
                    View All
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 justify-center">
              {featured.map((item, i) => (
                <ScrollReveal className="w-full flex flex-col items-center" key={item.name} delay={i * 100} direction="up">
                  <Link href="/shop" className="group block card-hover">
                    <div className="relative aspect-square bg-white flex items-center justify-center overflow-hidden mb-5 border border-spring-200 group-hover:border-spring-400 transition-all duration-500 img-zoom rounded-xl">
                      {item.tag && (
                        <span className="absolute top-3 left-3 bg-spring-600 text-white text-[9px] font-sans font-semibold tracking-[0.12em] uppercase px-3 py-1.5 z-10 rounded-md">
                          {item.tag}
                        </span>
                      )}
                      <span className="font-sans text-[10px] tracking-[0.15em] uppercase text-spring-300">
                        {item.name}
                      </span>
                      <button className="absolute top-3 right-3 text-spring-300 hover:text-spring-600 hover:scale-125 transition-all duration-300 z-10">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                      </button>
                    </div>
                    <h3 className="font-sans text-[13px] font-medium text-black leading-snug group-hover:text-spring-700 transition-colors duration-300 tracking-[0.02em]">
                      {item.name}
                    </h3>
                    <p className="font-sans text-[13px] text-spring-600 mt-1.5 tracking-[0.02em]">
                      {item.price}
                    </p>
                  </Link>
                </ScrollReveal>
              ))}
            </div>

            <div className="mt-12 text-center md:hidden">
              <Link href="/shop" className="btn-spring">View All</Link>
            </div>
          </div>
        </section>

        {/* ========== BUTTERFLY SERIES CAMPAIGN BANNER ========== */}
        <section className="relative w-full h-[65vh] md:h-[75vh] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-spring-800 via-spring-700 to-spring-600" />
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_30%_70%,_#c1ebd3_0%,_transparent_60%)]" />
          <SparkleOverlay />

          <div className="relative z-10 h-full w-full flex flex-col items-center justify-center text-center px-6">
            <ScrollReveal className="w-full flex flex-col items-center" direction="none" duration={1200}>
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-spring-200 mb-8">
                The Butterfly Series
              </p>
            </ScrollReveal>
            <ScrollReveal className="w-full flex flex-col items-center" delay={150} duration={1200}>
              <h2 className="font-serif text-5xl md:text-6xl lg:text-[5rem] text-white mb-8 leading-[1.1] tracking-[0.03em]">
                Born to Shine
              </h2>
            </ScrollReveal>
            <ScrollReveal className="w-full flex flex-col items-center" delay={300} duration={1200}>
              <p className="font-sans text-[14px] md:text-[15px] text-spring-100/75 max-w-md mb-12 leading-[1.9] tracking-wide">
                Delicate wing patterns crafted in precious metals and emerald
                stones. A limited collection celebrating the art of transformation.
              </p>
            </ScrollReveal>
            <ScrollReveal className="w-full flex flex-col items-center" delay={450} duration={1000}>
              <Link href="/shop" className="btn-outline !text-white !border-white/40 hover:!bg-white hover:!text-spring-800">
                Explore the Series
              </Link>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
