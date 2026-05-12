/* ASTERA DESIGN SYSTEM REMINDER: ALWAYS use section-luxury for main page sections. Vertical padding: 80px - 128px. */
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import SparkleOverlay from "@/components/SparkleOverlay";
import BotanicalDivider from "@/components/BotanicalDivider";

export default function Home() {
  const categories = [
    { name: "Bezvremenske Ogrlice", bg: "var(--color-seafoam)", image: "/forest-greens-necklace.png" },
    { name: "Umjetničko Prstenje", bg: "var(--color-luxury-beige)", image: "/emerald-butterfly-ring.png" },
    { name: "Kolekcija Naušnica", bg: "var(--color-aqua)", image: "/floral-droplet-earrings.png" },
    { name: "Remek-djela Narukvica", bg: "var(--color-mint)", image: "/rose-petal-bracelet.png" },
  ];

  const featured = [
    { name: "Smaragdni Leptir Prsten", price: "$1,200", tag: "Limitirano Izdanje", image: "/emerald-butterfly-ring.png" },
    { name: "Cvjetne Naušnice", price: "$850", tag: "Novo", image: "/floral-droplet-earrings.png" },
    { name: "Šumsko Zelenilo Ogrlica", price: "$2,100", tag: "Ekskluzivno", image: "/forest-greens-necklace.png" },
    { name: "Ružina Latica Narukvica", price: "$1,450", tag: "Ručni Rad", image: "/rose-petal-bracelet.png" },
  ];

  return (
    <div className="bg-white text-base">
      <Navbar />

      <main className="flex-1">
        {/* ========== HERO SECTION (RE-ARCHITECTED) ========== */}
        <section className="relative w-full h-[98vh] overflow-hidden flex items-end justify-start">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 scale-[1.05]" src="/hero-campaign.mp4" />
          <div className="absolute inset-0 bg-black/35 z-[1]" />
          <SparkleOverlay />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-transparent z-[2]" />

          {/* BOTTOM-LEFT QUADRANT POSITIONING - REMOVED BACKGROUND BOX */}
          <div className="container-luxury !mx-0 !ml-0 relative z-10 pb-24 md:pb-32 lg:pb-40 px-10 md:px-20 lg:pl-32 xl:pl-48 text-left w-full max-w-none">
            <div className="max-w-4xl transform transition-all duration-1000 animate-in fade-in slide-in-from-bottom-10">
               <ScrollReveal duration={1200} direction="up">
                  <p className="subheading-luxury text-astera-300 mb-8 md:mb-10 opacity-90 drop-shadow-lg tracking-[0.5em] text-sm font-bold uppercase">
                    Kolekcija Proljeće 2026
                  </p>
               </ScrollReveal>
               <ScrollReveal delay={200} duration={1200} direction="up">
                  <h2 className="text-white font-serif text-5xl md:text-7xl lg:text-[8.5rem] leading-[0.9] tracking-[0.05em] uppercase mb-12 md:mb-16 drop-shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                    Majstori <br/> Vječnosti
                  </h2>
               </ScrollReveal>
               <ScrollReveal delay={400} duration={1200} direction="up">
                  <div className="flex flex-col sm:flex-row items-start justify-start gap-10 mt-16">
                    <Link href="/shop" className="btn-luxury w-full sm:w-auto px-20 py-6 bg-white text-astera-900 hover:bg-astera-50 hover:shadow-[0_20px_50px_rgba(255,255,255,0.2)] transition-all duration-700 font-bold tracking-[0.4em]">
                      Istražite Trgovinu
                    </Link>
                    <Link href="#discover" className="btn-luxury-outline w-full sm:w-auto px-16 py-6 !text-white !border-white/30 hover:!bg-white hover:!text-astera-900 backdrop-blur-xl transition-all duration-700 font-bold tracking-[0.3em]">
                      Naša Baština
                    </Link>
                  </div>
               </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ========== BRAND STORY (REVEAL ON SCROLL + BEIGE HARMONY) ========== */}
        <section id="story" className="section-luxury bg-luxury-beige py-32 md:py-48">
          <div className="container-luxury text-center max-w-5xl">
            <ScrollReveal className="flex flex-col items-center">
              <BotanicalDivider className="mb-20 opacity-30" />
              <p className="subheading-luxury mb-12 text-astera-300 font-bold">Osnovano 2024.</p>
              <h3 className="heading-luxury text-4xl md:text-7xl mb-16 leading-[1.1] tracking-[0.2em]">
                Tkanje Svjetlosti u <br/> Bezvremensku Eleganciju
              </h3>
              <p className="font-sans text-[18px] md:text-[22px] text-gray-500 leading-relaxed max-w-3xl mx-auto mb-16 italic font-medium opacity-80">
                Svaki komad Astera nakita svjedočanstvo je majstorstvu svjetlosti. Iz našeg studija u Europi, 
                redefiniramo luksuz kroz simbiozu plemenitih metala i smaragda, stvoreno za one koji žive u izvanrednom.
              </p>
              <Link href="/shop" className="group flex flex-col items-center gap-4">
                 <span className="text-[12px] font-bold uppercase tracking-[0.5em] text-black">Doživite Umjetnost Izrade</span>
                 <div className="w-[1px] h-20 bg-astera-100 group-hover:h-32 group-hover:bg-astera-600 transition-all duration-1000" />
              </Link>
            </ScrollReveal>
          </div>
        </section>

        {/* ========== CATEGORIES (ULTRA-MODERN GRID) ========== */}
        <section id="discover" className="section-luxury bg-white py-32">
          <div className="container-luxury">
             <ScrollReveal className="text-center mb-32">
                <h3 className="heading-luxury text-3xl md:text-5xl lg:text-6xl mb-6 tracking-[0.3em]">Kolekcije</h3>
                <p className="subheading-luxury tracking-[0.4em] font-bold">Definirano Posebnošću</p>
             </ScrollReveal>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12">
               {categories.map((cat, i) => (
                 <ScrollReveal key={cat.name} delay={i * 150} className="group">
                   <Link href="/shop" className="block outline-none">
                     <div className="aspect-[3/4] rounded-[3rem] overflow-hidden bg-cover bg-center border border-black/5 shadow-sm transition-all duration-1000 group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] group-hover:scale-[1.03]"
                          style={{ backgroundColor: cat.bg }}>
                        <img src={cat.image} alt={cat.name} className="w-full h-full object-cover mix-blend-multiply opacity-90 transition-transform duration-1000 group-hover:scale-110" />
                     </div>
                     <div className="mt-12 text-center px-6">
                        <h4 className="font-sans text-[12px] font-bold tracking-[0.3em] uppercase text-black mb-2 group-hover:text-astera-600 transition-colors">
                          {cat.name}
                        </h4>
                        <div className="h-[1.5px] w-0 bg-astera-600 mx-auto transition-all duration-700 group-hover:w-20" />
                     </div>
                   </Link>
                 </ScrollReveal>
               ))}
             </div>
          </div>
        </section>

        {/* ========== FEATURED (PREMIUM PRODUCT CARDS) ========== */}
        <section className="section-luxury bg-warm-beige py-32 md:py-48">
          <div className="container-luxury">
            <ScrollReveal className="flex flex-col md:flex-row justify-between items-end mb-32 gap-10">
               <div className="max-w-xl">
                 <h3 className="heading-luxury text-3xl md:text-6xl mb-8 tracking-[0.2em]">Proljetni Favoriti</h3>
                 <p className="font-sans text-[16px] text-gray-500 tracking-wide leading-relaxed">Pažljivo odabrani komadi definirani profinjenom izradom i elegantnom estetikom, proizašli iz naše proljetne palete boja.</p>
               </div>
               <Link href="/shop" className="group flex items-center gap-6 text-[13px] font-bold uppercase tracking-[0.4em] text-astera-700 hover:text-astera-900 transition-all">
                  <span>Kupi Sve Komade</span>
                  <div className="w-12 h-[1px] bg-astera-700 group-hover:w-24 transition-all duration-700" />
               </Link>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
              {featured.map((item, i) => (
                <ScrollReveal key={item.name} delay={item.name === "Smaragdni Leptir Prsten" ? 0 : 100} direction="up" className="card-luxury hover:translate-y-[-10px] duration-1000">
                  <div className="relative aspect-square bg-white flex items-center justify-center overflow-hidden">
                    {item.tag && (
                      <span className="pill-luxury absolute top-8 left-8 z-10 text-astera-900 !bg-white/80 !backdrop-blur-xl">
                        {item.tag}
                      </span>
                    )}
                    <Link href="/shop" className="block w-full h-full group">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    </Link>
                  </div>
                  <div className="p-12 text-center flex flex-col items-center">
                    <h4 className="heading-luxury text-[15px] mb-4 line-clamp-1 border-b border-transparent group-hover:border-astera-300">{item.name}</h4>
                    <p className="font-serif text-[22px] text-astera-900 italic tracking-wider mb-10">{item.price}</p>
                    <Link href="/shop" className="btn-luxury py-4 px-10 bg-transparent border border-black/10 text-black hover:bg-astera-900 hover:text-white w-full rounded-2xl hover:border-astera-900">
                      Pogledaj Detalje
                    </Link>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ========== CAMPAIGN BANNER (FULL WIDTH BEIGE) ========== */}
        <section className="relative h-[80vh] flex items-center justify-center bg-astera-900 overflow-hidden">
             <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
             <SparkleOverlay />
             <div className="container-luxury text-center relative z-10 py-12 md:py-24 max-w-4xl">
                <ScrollReveal duration={1200}>
                   <p className="subheading-luxury text-astera-400 mb-10 opacity-90 tracking-[0.6em] font-bold">Serija Leptir</p>
                   <h2 className="text-white font-serif text-5xl md:text-7xl lg:text-[7.5rem] leading-none tracking-[0.05em] uppercase mb-16 drop-shadow-2xl">
                      Rođeni da Sjaje
                   </h2>
                   <p className="text-astera-100/70 font-sans text-xl max-w-2xl mx-auto leading-relaxed mb-20 italic">
                     "Slavlje transformacije, gdje se osjetljivi rad u metalu spaja s eteričnim sjajem smaragdnih krila."
                   </p>
                   <Link href="/shop" className="btn-luxury px-24 py-6 bg-white text-astera-900 hover:scale-110 shadow-3xl !rounded-full font-bold tracking-[0.4em]">
                     Kupi Seriju
                   </Link>
                </ScrollReveal>
             </div>
        </section>

        {/* ========== SERVICES (LUXURY MINIMALISM) ========== */}
        <section className="section-luxury bg-white border-t border-black/5 py-48">
          <div className="container-luxury">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-32 lg:gap-40 text-center">
              {[
                { title: "Autentična Remek-djela", text: "Svaka kreacija je pojedinačno certificirana i ručno rađena od strane naših majstora.", action: "Razgovor sa Savjetnikom", icon: "💎" },
                { title: "Usluga po Mjeri", text: "Od određivanja veličine do prilagođenih gravura, naši kustosi osiguravaju da je vaš komad jedinstveno vaš.", action: "Saznajte Više", icon: "✨" },
                { title: "Stručnost u Darivanju", text: "Ekskluzivno pakiranje i personalizirane kartice za najdragocjenije životne prekretnice.", action: "Vodič za Poklone", icon: "🎁" }
              ].map((service, i) => (
                <ScrollReveal key={service.title} delay={i * 200} direction="up" className="flex flex-col items-center group">
                  <div className="w-24 h-24 rounded-[2.5rem] bg-luxury-beige flex items-center justify-center text-4xl mb-12 transition-all duration-1000 group-hover:scale-110 group-hover:rotate-6 shadow-sm border border-black/5">
                    {service.icon}
                  </div>
                  <h4 className="heading-luxury text-2xl mb-8 tracking-[0.15em]">{service.title}</h4>
                  <p className="text-gray-500 font-sans text-[16px] leading-relaxed mb-12 italic font-medium opacity-80">{service.text}</p>
                  <button className="text-[12px] font-bold uppercase tracking-[0.4em] text-black border-b border-black/20 pb-2 hover:border-black hover:tracking-[0.5em] transition-all duration-700">
                     {service.action}
                  </button>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
