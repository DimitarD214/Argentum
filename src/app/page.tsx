/* ASTERA DESIGN SYSTEM REMINDER: NEVER align text 100% to screen edges. Minimum padding: px-24 (mobile) / px-64+ (desktop) */
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import SparkleOverlay from "@/components/SparkleOverlay";
import BotanicalDivider from "@/components/BotanicalDivider";

export default function Home() {
  const categories = [
    { name: "Necklaces", bg: "var(--color-seafoam)", image: "/forest-greens-necklace.png" },
    { name: "Rings", bg: "var(--color-mint)", image: "/emerald-butterfly-ring.png" },
    { name: "Earrings", bg: "var(--color-aqua)", image: "/floral-droplet-earrings.png" },
    { name: "Bracelets", bg: "var(--color-creme)", image: "/rose-petal-bracelet.png" },
  ];

  const featured = [
    { name: "Emerald Butterfly Ring", price: "From $120", tag: "New In", image: "/emerald-butterfly-ring.png" },
    { name: "Floral Droplet Earrings", price: "From $150", tag: "Limited Edition", image: "/floral-droplet-earrings.png" },
    { name: "Forest Greens Necklace", price: "From $210", tag: null, image: "/forest-greens-necklace.png" },
    { name: "Rose Petal Bracelet", price: "From $180", tag: "Handcrafted", image: "/rose-petal-bracelet.png" },
  ];

  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* ========== HERO SECTION ========== */}
        <section className="relative w-full h-screen overflow-hidden">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover object-center scale-[1.08] z-0" src="/hero-campaign.mp4" />
          <div className="absolute inset-0 bg-gradient-to-br from-astera-900/60 via-astera-800/40 to-astera-700/60 z-[1]" />
          <SparkleOverlay />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10 z-[4]" />

          {/* Hero content — centered */}
          <div className="relative z-10 h-full w-full flex items-center justify-start pb-20 md:pb-32 px-24 md:px-64 lg:px-80">
            <div className="text-left max-w-2xl animate-[fadeSlideUp_1.2s_ease-out_0.3s_both]">
              <p className="text-astera-300 font-sans text-[11px] md:text-[12px] tracking-[0.25em] uppercase mb-6 font-medium animate-[fadeSlideUp_1s_ease-out_0.5s_both]">
                Spring Collection 2026
              </p>
              <h2 className="text-white font-serif text-6xl md:text-8xl lg:text-[7.5rem] leading-[1.1] mb-16 tracking-[0.02em] animate-[fadeSlideUp_1.2s_ease-out_0.7s_both]">
                Astera premium jewelry
              </h2>

              <div className="flex flex-wrap gap-4 justify-start animate-[fadeSlideUp_1s_ease-out_1.1s_both]">
                <Link href="/shop" className="btn-astera">
                  Shop Now
                </Link>
                <Link href="#discover" className="btn-outline !text-white !border-white/40 hover:!bg-white hover:!text-astera-900">
                  Discover More
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="h-1 bg-gradient-to-r from-astera-300 via-astera-500 to-astera-300 opacity-40" />

        {/* ========== BRAND STORY ========== */}
        <section className="bg-astera-50 py-64 md:py-80 px-6 flex flex-col items-center">
          <div className="w-full max-w-[1720px] px-24 md:px-56 lg:px-80 text-center">
            <ScrollReveal className="w-full flex flex-col items-center" duration={1000}>
              <BotanicalDivider className="mb-10" />
            </ScrollReveal>
            <ScrollReveal className="w-full flex flex-col items-center" delay={100} duration={1000}>
              <h2 className="font-serif text-5xl md:text-6xl lg:text-[5.5rem] text-astera-900 mb-10 leading-[1.2] tracking-[0.03em]">
                Artisans of Light
                <br />
                Since 2024
              </h2>
            </ScrollReveal>
            <ScrollReveal className="w-full flex flex-col items-center" delay={250} duration={1000}>
              <p className="font-sans text-[18px] md:text-[19px] text-astera-700 leading-[2] tracking-[0.01em] max-w-xl mx-auto text-center">
                From the heart of Europe, our passion for innovation, design, and mastery
                of precious materials has defined Astera as a rising star in artisan
                jewelry and accessories.
              </p>
            </ScrollReveal>
            <ScrollReveal className="w-full flex flex-col items-center" delay={400} duration={1000}>
              <BotanicalDivider className="mt-10" />
            </ScrollReveal>
          </div>
        </section>

        {/* ========== SHOP BY CATEGORY ========== */}
        <section id="discover" className="bg-white py-64 md:py-80 px-6 flex flex-col items-center">
          <div className="w-full max-w-[1720px] px-24 md:px-56 lg:px-80">
            <ScrollReveal className="w-full flex flex-col items-center">
              <div className="text-center mb-20">
                <h2 className="font-serif text-5xl md:text-7xl lg:text-[5.8rem] text-black mb-6 tracking-[0.03em]">
                  Shop by Category
                </h2>
                <div className="w-8 h-8 mx-auto flex items-center justify-center animate-bounce">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-5 h-5 text-astera-500">
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
                      <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-center font-sans text-[13px] font-medium tracking-[0.06em] text-black mt-6 group-hover:text-astera-600 transition-colors duration-300">
                      {cat.name}
                    </p>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <div className="bg-astera-50">
          <ScrollReveal className="w-full flex flex-col items-center">
            <BotanicalDivider className="py-2" />
          </ScrollReveal>
        </div>

        {/* ========== SPRING FAVOURITES ========== */}
        <section className="bg-astera-50 py-64 md:py-80 px-6 flex flex-col items-center">
          <div className="w-full max-w-[1720px] px-24 md:px-56 lg:px-80">
            <ScrollReveal className="w-full flex flex-col items-center">
              <div className="text-center mb-16">
                <h2 className="font-serif text-4xl md:text-6xl lg:text-[5rem] text-black tracking-[0.03em]">
                  Spring Favourites
                </h2>
                <p className="font-sans text-[15px] text-astera-600 mt-4 tracking-[0.08em] max-w-md mx-auto text-center">
                  Our most-loved pieces this season
                </p>
                <div className="mt-8">
                  <Link
                    href="/shop"
                    className="text-[12px] font-sans font-medium text-astera-700 underline underline-offset-4 hover:text-astera-500 transition-colors duration-300"
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
                    <div className="relative aspect-square bg-white flex items-center justify-center overflow-hidden mb-5 border border-astera-200 group-hover:border-astera-400 transition-all duration-500 img-zoom rounded-xl">
                      {item.tag && (
                        <span className="absolute top-3 left-3 bg-astera-600 text-white text-[9px] font-sans font-semibold tracking-[0.12em] uppercase px-3 py-1.5 z-10 rounded-md">
                          {item.tag}
                        </span>
                      )}
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      <button className="absolute top-3 right-3 text-white/80 hover:text-white hover:scale-125 transition-all duration-300 z-10 drop-shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                      </button>
                    </div>
                    <h3 className="font-sans text-[13px] font-medium text-black leading-snug group-hover:text-astera-700 transition-colors duration-300 tracking-[0.02em]">
                      {item.name}
                    </h3>
                    <p className="font-sans text-[13px] text-astera-600 mt-1.5 tracking-[0.02em]">
                      {item.price}
                    </p>
                  </Link>
                </ScrollReveal>
              ))}
            </div>

            <div className="mt-12 text-center md:hidden">
              <Link href="/shop" className="btn-astera">View All</Link>
            </div>
          </div>
        </section>

        {/* ========== BUTTERFLY SERIES CAMPAIGN BANNER ========== */}
        <section className="relative w-full h-[65vh] md:h-[75vh] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-astera-800 via-astera-700 to-astera-600" />
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_30%_70%,_#c1ebd3_0%,_transparent_60%)]" />
          <SparkleOverlay />

          <div className="relative z-10 h-full w-full flex flex-col items-center justify-center text-center px-6">
            <ScrollReveal className="w-full flex flex-col items-center" direction="none" duration={1200}>
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-astera-200 mb-8">
                The Butterfly Series
              </p>
            </ScrollReveal>
            <ScrollReveal className="w-full flex flex-col items-center" delay={150} duration={1200}>
              <h2 className="font-serif text-5xl md:text-6xl lg:text-[5rem] text-white mb-8 leading-[1.1] tracking-[0.03em]">
                Born to Shine
              </h2>
            </ScrollReveal>
            <ScrollReveal className="w-full flex flex-col items-center" delay={300} duration={1200}>
              <p className="font-sans text-[14px] md:text-[15px] text-astera-100/75 max-w-md mb-12 leading-[1.9] tracking-wide">
                Delicate wing patterns crafted in precious metals and emerald
                stones. A limited collection celebrating the art of transformation.
              </p>
            </ScrollReveal>
            <ScrollReveal className="w-full flex flex-col items-center" delay={450} duration={1000}>
              <Link href="/shop" className="btn-outline !text-white !border-white/40 hover:!bg-white hover:!text-astera-800">
                Explore the Series
              </Link>
            </ScrollReveal>
          </div>
        </section>
      </main>

      
        {/* ========== ASTERA SERVICES ========== */}
        <section className="bg-white py-80 md:py-96 border-t border-gray-100">
          <div className="max-w-[1720px] mx-auto px-24 md:px-56 lg:px-80">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-24 text-center">
              <ScrollReveal direction="up" className="w-full flex flex-col items-center">
                <div className="w-16 h-16 bg-astera-50 rounded-full flex items-center justify-center mb-8">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6 text-astera-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                  </svg>
                </div>
                <h3 className="font-serif text-3xl mb-4">Authentic Jewelry</h3>
                <p className="text-gray-500 text-sm font-sans tracking-wide leading-relaxed mb-6 italic">Every piece is certified and handcrafted with precision.</p>
                <button className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] border-b border-black pb-1 hover:text-astera-600 hover:border-astera-600 transition-all">Chat Now</button>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={150} className="w-full flex flex-col items-center">
                <div className="w-16 h-16 bg-astera-50 rounded-full flex items-center justify-center mb-8">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6 text-astera-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.2.176-.452.343-.748.501-.588.312-.884.664-.884 1.056V11.25M10.5 16.5h3m-6.75 3.75a9 9 0 1 1 13.5-7.788L21 21H3l3.375-3.375Z" />
                  </svg>
                </div>
                <h3 className="font-serif text-3xl mb-4">Customer Service</h3>
                <p className="text-gray-500 text-sm font-sans tracking-wide leading-relaxed mb-6 italic">Explore answers to our FAQs or connect with our Customer Service team.</p>
                <button className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] border-b border-black pb-1 hover:text-astera-600 hover:border-astera-600 transition-all">Visit FAQ</button>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={300} className="w-full flex flex-col items-center">
                <div className="w-16 h-16 bg-astera-50 rounded-full flex items-center justify-center mb-8">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6 text-astera-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H4.5a1.5 1.5 0 0 1-1.5-1.5v-8.25m18 0l-9-5.25m9 5.25v7.5a1.5 1.5 0 0 1-1.5 1.5H4.5a1.5 1.5 0 0 1-1.5-1.5v-7.5m18 0l-9-5.25m0 0L3 11.25m9-5.25v16.5" />
                  </svg>
                </div>
                <h3 className="font-serif text-3xl mb-4">Gift Services</h3>
                <p className="text-gray-500 text-sm font-sans tracking-wide leading-relaxed mb-6 italic">Add a personalized touch to your exquisite gift.</p>
                <button className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] border-b border-black pb-1 hover:text-astera-600 hover:border-astera-600 transition-all">Learn More</button>
              </ScrollReveal>
            </div>
          </div>
        </section>

      <Footer />
    </>
  );
}
