import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-astera-dark text-astera-cream pt-32 pb-20 mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 lg:gap-32 mb-32">
          {/* Column 1 */}
          <div className="flex flex-col">
            <h3 className="text-xs uppercase tracking-widest font-serif text-astera-gold mb-10">
              Korisnička podrška
            </h3>
            <ul className="flex flex-col space-y-6">
              <li><Link href="#" className="block text-sm font-sans text-astera-cream/70 transition-all duration-500 ease-in-out hover:text-astera-gold hover:scale-[1.01] hover:opacity-80">Status narudžbe</Link></li>
              <li><Link href="#" className="block text-sm font-sans text-astera-cream/70 transition-all duration-500 ease-in-out hover:text-astera-gold hover:scale-[1.01] hover:opacity-80">Dostava i isporuka</Link></li>
              <li><Link href="#" className="block text-sm font-sans text-astera-cream/70 transition-all duration-500 ease-in-out hover:text-astera-gold hover:scale-[1.01] hover:opacity-80">Povrati i zamjene</Link></li>
              <li><Link href="/services" className="block text-sm font-sans text-astera-cream/70 transition-all duration-500 ease-in-out hover:text-astera-gold hover:scale-[1.01] hover:opacity-80">Kontaktirajte nas</Link></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col">
            <h3 className="text-xs uppercase tracking-widest font-serif text-astera-gold mb-10">
              Članstvo
            </h3>
            <ul className="flex flex-col space-y-6">
              <li><Link href="/account" className="block text-sm font-sans text-astera-cream/70 transition-all duration-500 ease-in-out hover:text-astera-gold hover:scale-[1.01] hover:opacity-80">Moj račun</Link></li>
              <li><Link href="/account" className="block text-sm font-sans text-astera-cream/70 transition-all duration-500 ease-in-out hover:text-astera-gold hover:scale-[1.01] hover:opacity-80">Astera Klub</Link></li>
              <li><Link href="/account" className="block text-sm font-sans text-astera-cream/70 transition-all duration-500 ease-in-out hover:text-astera-gold hover:scale-[1.01] hover:opacity-80">Kristalno Društvo</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col">
            <h3 className="text-xs uppercase tracking-widest font-serif text-astera-gold mb-10">
              O tvrtki Astera
            </h3>
            <ul className="flex flex-col space-y-6">
              <li><Link href="#" className="block text-sm font-sans text-astera-cream/70 transition-all duration-500 ease-in-out hover:text-astera-gold hover:scale-[1.01] hover:opacity-80">Naša baština</Link></li>
              <li><Link href="#" className="block text-sm font-sans text-astera-cream/70 transition-all duration-500 ease-in-out hover:text-astera-gold hover:scale-[1.01] hover:opacity-80">Održivost</Link></li>
              <li><Link href="#" className="block text-sm font-sans text-astera-cream/70 transition-all duration-500 ease-in-out hover:text-astera-gold hover:scale-[1.01] hover:opacity-80">Karijera</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="flex flex-col">
            <h3 className="text-xs uppercase tracking-widest font-serif text-astera-gold mb-10">
              Svijet Astere
            </h3>
            <p className="text-sm text-astera-cream/70 font-sans leading-relaxed mb-8 italic">
              Pretplatite se na naš newsletter kako biste primali najnovije vijesti o našim kolekcijama i umjetnosti izrade.
            </p>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="E-MAIL ADRESA" 
                className="w-full px-6 py-4 bg-transparent border border-astera-border/30 rounded-full focus:ring-1 focus:ring-astera-gold focus:border-astera-gold outline-none transition-all duration-500 ease-in-out font-sans text-xs tracking-widest text-astera-cream placeholder:text-astera-cream/30" 
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 text-[10px] font-bold tracking-widest uppercase text-astera-gold transition-all duration-500 ease-in-out hover:text-astera-cream hover:scale-[1.01] hover:opacity-80">
                Pridruži se
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-astera-border/20 flex flex-col md:flex-row justify-between items-center gap-16">
          <div className="flex flex-col items-center md:items-start order-2 md:order-1">
             <h2 className="font-serif text-3xl md:text-4xl tracking-widest uppercase text-astera-cream mb-4 transition-all duration-500 ease-in-out hover:scale-[1.01] hover:opacity-80">
               ASTERA
             </h2>
             <p className="text-xs text-astera-cream/50 font-sans tracking-widest uppercase">
               © 2026 Astera Artisan Nakit. Sva prava pridržana.
             </p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-6 order-3 md:order-2">
            <Link href="#" className="text-[10px] font-sans font-bold tracking-widest uppercase text-astera-cream/70 transition-all duration-500 ease-in-out hover:text-astera-gold hover:scale-[1.01] hover:opacity-80">Pravila Privatnosti</Link>
            <Link href="#" className="text-[10px] font-sans font-bold tracking-widest uppercase text-astera-cream/70 transition-all duration-500 ease-in-out hover:text-astera-gold hover:scale-[1.01] hover:opacity-80">Uvjeti Korištenja</Link>
            <Link href="#" className="text-[10px] font-sans font-bold tracking-widest uppercase text-astera-cream/70 transition-all duration-500 ease-in-out hover:text-astera-gold hover:scale-[1.01] hover:opacity-80">Kolačići</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
