"use client";
import Link from "next/link";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: string[];
}

export default function MobileNav({ isOpen, onClose, navItems }: MobileNavProps) {
  return (
    <div 
      className={`fixed inset-0 z-[150] transition-opacity duration-500 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="absolute inset-0 bg-astera-cream/70 backdrop-blur-md" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 w-full md:w-1/2 bg-astera-cream border-l border-astera-border p-12 flex flex-col justify-center shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-10 right-10 text-astera-dark hover:text-astera-gold transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <nav className="flex flex-col space-y-12">
          {navItems.map((item) => (
            <Link 
              key={item} 
              href={`/shop/${item.toLowerCase().replace(/ /g, "-")}`}
              onClick={onClose}
              className="text-4xl md:text-5xl font-serif text-astera-dark hover:text-astera-gold transition-colors duration-500 uppercase tracking-widest"
            >
              {item}
            </Link>
          ))}
          <div className="h-px w-24 bg-astera-border my-8" />
          <Link href="/account" onClick={onClose} className="text-xl font-sans text-astera-text hover:text-astera-gold transition-colors tracking-widest uppercase">
            Moj račun
          </Link>
        </nav>
      </div>
    </div>
  );
}
