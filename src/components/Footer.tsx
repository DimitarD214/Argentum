import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-32 pb-16 px-16 md:px-32 flex flex-col min-h-screen justify-between">
      <div className="w-full max-w-[1720px] mx-auto flex flex-col flex-1 pb-24">
        
        {/* Top Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-24 flex-1">
          {/* Column 1 */}
          <div className="flex flex-col">
            <h3 className="text-[15px] uppercase tracking-[0.2em] font-bold mb-10 font-sans">Customer Service & FAQ</h3>
            <ul className="flex flex-col space-y-8">
              <li><Link href="#" className="text-[16px] text-gray-300 font-sans hover:text-white transition-colors">Customer Service Overview</Link></li>
              <li><Link href="#" className="text-[16px] text-gray-300 font-sans hover:text-white transition-colors">Order Status</Link></li>
              <li><Link href="#" className="text-[16px] text-gray-300 font-sans hover:text-white transition-colors">Gift Card Balance</Link></li>
              <li><Link href="#" className="text-[16px] text-gray-300 font-sans hover:text-white transition-colors">Shipping</Link></li>
              <li><Link href="#" className="text-[16px] text-gray-300 font-sans hover:text-white transition-colors">Returns & Exchange</Link></li>
              <li><Link href="#" className="text-[16px] text-gray-300 font-sans hover:text-white transition-colors">Repair Status</Link></li>
              <li><Link href="/services" className="text-[16px] text-gray-300 font-sans hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="text-[16px] text-gray-300 font-sans hover:text-white transition-colors">Size Guide</Link></li>
              <li><Link href="#" className="text-[16px] text-gray-300 font-sans hover:text-white transition-colors">Store Finder</Link></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col">
            <h3 className="text-[15px] uppercase tracking-[0.2em] font-bold mb-10 font-sans">Membership</h3>
            <ul className="flex flex-col space-y-8">
              <li><Link href="/account" className="text-[16px] text-gray-300 font-sans hover:text-white transition-colors">Register</Link></li>
              <li><Link href="/account" className="text-[16px] text-gray-300 font-sans hover:text-white transition-colors">Astera Club</Link></li>
              <li><Link href="/account" className="text-[16px] text-gray-300 font-sans hover:text-white transition-colors">Crystal Society (SCS)</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col">
            <h3 className="text-[15px] uppercase tracking-[0.2em] font-bold mb-10 font-sans">About Us</h3>
            <ul className="flex flex-col space-y-8">
              <li><Link href="#" className="text-[16px] text-gray-300 font-sans hover:text-white transition-colors">About Astera</Link></li>
              <li><Link href="#" className="text-[16px] text-gray-300 font-sans hover:text-white transition-colors">Jobs & Career</Link></li>
              <li><Link href="#" className="text-[16px] text-gray-300 font-sans hover:text-white transition-colors">Alumni Community</Link></li>
              <li><Link href="#" className="text-[16px] text-gray-300 font-sans hover:text-white transition-colors">For Professionals</Link></li>
              <li><Link href="#" className="text-[16px] text-gray-300 font-sans hover:text-white transition-colors">Sitemap</Link></li>
              <li><Link href="#" className="text-[16px] text-gray-300 font-sans hover:text-white transition-colors">Astera Created Diamonds</Link></li>
              <li><Link href="#" className="text-[16px] text-gray-300 font-sans hover:text-white transition-colors">Kristallwelten</Link></li>
              <li><Link href="#" className="text-[16px] text-gray-300 font-sans hover:text-white transition-colors">Code of Conduct & Policies</Link></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="flex flex-col">
            <h3 className="text-[15px] uppercase tracking-[0.2em] font-bold mb-10 font-sans">Legal</h3>
            <ul className="flex flex-col space-y-8">
              <li><Link href="#" className="text-[16px] text-gray-300 font-sans hover:text-white transition-colors">Terms Of Use</Link></li>
              <li><Link href="#" className="text-[16px] text-gray-300 font-sans hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link href="#" className="text-[16px] text-gray-300 font-sans hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-[16px] text-gray-300 font-sans hover:text-white transition-colors">Cookie Consent</Link></li>
              <li><Link href="#" className="text-[16px] text-gray-300 font-sans hover:text-white transition-colors">Imprint</Link></li>
              <li><Link href="#" className="text-[16px] text-gray-300 font-sans hover:text-white transition-colors">REACH information</Link></li>
              <li><Link href="#" className="text-[16px] text-gray-300 font-sans hover:text-white transition-colors">Accessibility statement</Link></li>
              <li><Link href="#" className="text-[16px] text-gray-300 font-sans hover:text-white transition-colors">Data Protection Consent Statement</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1720px] mx-auto flex flex-col justify-end">
        {/* Divider */}
        <div className="w-full border-t border-[#333] mb-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-end lg:items-center w-full gap-8">
          
          {/* Left: Locale & Copyright */}
          <div className="flex flex-col gap-6 justify-end h-full">
            <div className="flex items-center gap-4">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-white">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
               </svg>
               <span className="text-[10px] font-sans font-bold">Croatia</span>
               <span className="text-[10px] font-sans font-bold ml-2">English</span>
            </div>
            
            <p className="text-[9px] text-gray-500 font-sans max-w-sm leading-relaxed">
              Copyright © 2026 Astera Croatia. All rights reserved.<br/>
              ASTERA and the SWAN logo are registered and trademarks of Astera AG.
            </p>
          </div>

          {/* Center: Brand */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -mt-4 hidden lg:block">
            <h1 className="font-serif text-[64px] tracking-widest text-white leading-none">ASTERA</h1>
          </div>
          {/* Mobile Brand (visible only when screen < lg) */}
          <div className="lg:hidden w-full flex justify-end">
             <h1 className="font-serif text-[40px] tracking-widest text-white leading-none">ASTERA</h1>
          </div>

          {/* Right: Social Icons */}
          <div className="flex gap-4 items-center">
            {['facebook', 'pinterest', 'instagram', 'youtube', 'tiktok', 'twitter'].map((social) => (
              <a key={social} href="#" className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center hover:border-white hover:bg-white hover:text-black transition-colors group">
                 {/* Placeholder for SVG icons based on name */}
                 <div className="w-3 h-3 bg-white group-hover:bg-black rounded-full transition-colors"></div>
              </a>
            ))}
          </div>
          
        </div>
      </div>
    </footer>
  );
}
