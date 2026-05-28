import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-astera-dark text-astera-cream pt-24 pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-24 mb-24">
          {/* Column 1 */}
          <div className="flex flex-col">
            <h3 className="text-xs uppercase tracking-[0.25em] font-bold mb-10 font-sans text-astera-gold">
              Korisnička podrška
            </h3>
            <ul className="flex flex-col space-y-6">
              <li><Link href="#" className="text-sm font-sans text-astera-cream/70 hover:text-astera-gold transition-colors duration-300">Status narudžbe</Link></li>
              <li><Link href="#" className="text-sm font-sans text-astera-cream/70 hover:text-astera-gold transition-colors duration-300">Dostava i isporuka</Link></li>
              <li><Link href="#" className="text-sm font-sans text-astera-cream/70 hover:text-astera-gold transition-colors duration-300">Povrati i zamjene</Link></li>
              <li><Link href="/services" className="text-sm font-sans text-astera-cream/70 hover:text-astera-gold transition-colors duration-300">Kontaktirajte nas</Link></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col">
            <h3 className="text-xs uppercase tracking-[0.25em] font-bold mb-10 font-sans text-astera-gold">
              Članstvo
            </h3>
            <ul className="flex flex-col space-y-6">
              <li><Link href="/account" className="text-sm font-sans text-astera-cream/70 hover:text-astera-gold transition-colors duration-300">Moj račun</Link></li>
              <li><Link href="/account" className="text-sm font-sans text-astera-cream/70 hover:text-astera-gold transition-colors duration-300">Astera Klub</Link></li>
              <li><Link href="/account" className="text-sm font-sans text-astera-cream/70 hover:text-astera-gold transition-colors duration-300">Kristalno Društvo</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col">
            <h3 className="text-xs uppercase tracking-[0.25em] font-bold mb-10 font-sans text-astera-gold">
              O tvrtki Astera
            </h3>
            <ul className="flex flex-col space-y-6">
              <li><Link href="#" className="text-sm font-sans text-astera-cream/70 hover:text-astera-gold transition-colors duration-300">Naša baština</Link></li>
              <li><Link href="#" className="text-sm font-sans text-astera-cream/70 hover:text-astera-gold transition-colors duration-300">Održivost</Link></li>
              <li><Link href="#" className="text-sm font-sans text-astera-cream/70 hover:text-astera-gold transition-colors duration-300">Karijera</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="flex flex-col">
            <h3 className="text-xs uppercase tracking-[0.25em] font-bold mb-10 font-sans text-astera-gold">
              Svijet Astere
            </h3>
            <p className="text-sm text-astera-cream/70 font-sans leading-relaxed mb-8 italic">
              Pretplatite se na naš newsletter kako biste primali najnovije vijesti o našim kolekcijama i umjetnosti izrade.
            </p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="E-MAIL ADRESA" 
                className="w-full bg-transparent border-b border-astera-cream/30 py-3 text-xs font-sans tracking-widest text-astera-cream focus:outline-none focus:border-astera-gold transition-colors placeholder:text-astera-cream/30" 
              />
              <button className="absolute right-0 bottom-3 text-xs font-bold tracking-widest uppercase text-astera-gold hover:text-astera-cream transition-colors">
                Pridruži se
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-astera-border/20 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col items-center md:items-start order-2 md:order-1">
             <h2 className="font-serif text-3xl tracking-[0.4em] uppercase text-astera-cream mb-4">
               ASTERA
             </h2>
             <p className="text-xs text-astera-cream/50 font-sans tracking-widest uppercase">
               © 2026 Astera Artisan Nakit. Sva prava pridržana.
             </p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 order-3 md:order-2">
            <Link href="#" className="text-xs font-sans font-bold tracking-widest uppercase text-astera-cream/70 hover:text-astera-gold transition-colors">Pravila Privatnosti</Link>
            <Link href="#" className="text-xs font-sans font-bold tracking-widest uppercase text-astera-cream/70 hover:text-astera-gold transition-colors">Uvjeti Korištenja</Link>
            <Link href="#" className="text-xs font-sans font-bold tracking-widest uppercase text-astera-cream/70 hover:text-astera-gold transition-colors">Kolačići</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
