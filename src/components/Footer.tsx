import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-astera-900 text-white border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-20 lg:py-24">
        {/* Top Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-20">
          {/* Column 1 */}
          <div className="flex flex-col">
            <h3 className="text-[11px] uppercase tracking-[0.25em] font-bold mb-10 font-sans text-astera-300">
              Korisnička podrška
            </h3>
            <ul className="flex flex-col space-y-5">
              <li><Link href="#" className="text-[13px] text-astera-100/70 font-sans hover:text-white transition-all duration-300">Status narudžbe</Link></li>
              <li><Link href="#" className="text-[13px] text-astera-100/70 font-sans hover:text-white transition-all duration-300">Dostava i isporuka</Link></li>
              <li><Link href="#" className="text-[13px] text-astera-100/70 font-sans hover:text-white transition-all duration-300">Povrati i zamjene</Link></li>
              <li><Link href="#" className="text-[13px] text-astera-100/70 font-sans hover:text-white transition-all duration-300">Poklon kartice</Link></li>
              <li><Link href="/services" className="text-[13px] text-astera-100/70 font-sans hover:text-white transition-all duration-300">Kontaktirajte nas</Link></li>
              <li><Link href="#" className="text-[13px] text-astera-100/70 font-sans hover:text-white transition-all duration-300">Vodič za veličine</Link></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col">
            <h3 className="text-[11px] uppercase tracking-[0.25em] font-bold mb-10 font-sans text-astera-300">
              Članstvo
            </h3>
            <ul className="flex flex-col space-y-5">
              <li><Link href="/account" className="text-[13px] text-astera-100/70 font-sans hover:text-white transition-all duration-300">Moj račun</Link></li>
              <li><Link href="/account" className="text-[13px] text-astera-100/70 font-sans hover:text-white transition-all duration-300">Astera Klub</Link></li>
              <li><Link href="/account" className="text-[13px] text-astera-100/70 font-sans hover:text-white transition-all duration-300">Kristalno Društvo</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col">
            <h3 className="text-[11px] uppercase tracking-[0.25em] font-bold mb-10 font-sans text-astera-300">
              O tvrtki Astera
            </h3>
            <ul className="flex flex-col space-y-5">
              <li><Link href="#" className="text-[13px] text-astera-100/70 font-sans hover:text-white transition-all duration-300">Naša baština</Link></li>
              <li><Link href="#" className="text-[13px] text-astera-100/70 font-sans hover:text-white transition-all duration-300">Održivost</Link></li>
              <li><Link href="#" className="text-[13px] text-astera-100/70 font-sans hover:text-white transition-all duration-300">Karijera</Link></li>
              <li><Link href="#" className="text-[13px] text-astera-100/70 font-sans hover:text-white transition-all duration-300">Za profesionalce</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter/Brand */}
          <div className="flex flex-col">
            <h3 className="text-[11px] uppercase tracking-[0.25em] font-bold mb-10 font-sans text-astera-300">
              Svijet Astere
            </h3>
            <p className="text-[14px] text-astera-100/60 font-sans leading-relaxed mb-8 italic">
              Pretplatite se na naš newsletter kako biste primali najnovije vijesti o našim kolekcijama i umjetnosti izrade.
            </p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="E-MAIL ADRESA" 
                className="w-full bg-transparent border-b border-astera-700 py-3 text-[11px] font-sans tracking-widest text-white focus:outline-none focus:border-white transition-colors placeholder:text-astera-700" 
              />
              <button className="absolute right-0 bottom-3 text-[10px] font-bold tracking-widest uppercase text-astera-300 hover:text-white transition-colors">
                Pridruži se
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black/20 py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row justify-between items-center gap-12">
          {/* Logo */}
          <div className="flex flex-col items-center md:items-start order-2 md:order-1">
             <h2 className="font-serif text-[32px] md:text-[40px] tracking-[0.4em] uppercase text-white mb-4">
               ASTERA
             </h2>
             <p className="text-[9px] text-astera-600 font-sans tracking-[0.2em] uppercase">
               © 2026 Astera Artisan Nakit. Sva prava pridržana.
             </p>
          </div>

          {/* Social Icons Placeholder */}
          <div className="flex gap-6 items-center order-1 md:order-2">
            {['facebook', 'instagram', 'pinterest'].map((social) => (
              <a key={social} href="#" className="text-astera-500 hover:text-white transition-all duration-500 hover:scale-125">
                 <div className="w-5 h-5 rounded-full border border-current flex items-center justify-center p-1">
                    <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
                 </div>
              </a>
            ))}
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 order-3">
            <Link href="#" className="text-[10px] font-sans font-bold tracking-widest uppercase text-astera-600 hover:text-white transition-colors">Pravila Privatnosti</Link>
            <Link href="#" className="text-[10px] font-sans font-bold tracking-widest uppercase text-astera-600 hover:text-white transition-colors">Uvjeti Korištenja</Link>
            <Link href="#" className="text-[10px] font-sans font-bold tracking-widest uppercase text-astera-600 hover:text-white transition-colors">Kolačići</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
