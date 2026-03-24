import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-spring-50 border-t border-spring-200 mt-auto flex flex-col items-center justify-center">
      <div className="w-full max-w-[1720px] px-12 md:px-32 mx-auto px-10 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-32 justify-items-center w-full">
          <div>
            <h3 className="text-[20px] font-serif font-semibold tracking-[0.12em] uppercase mb-8">
              ARGENTUM
            </h3>
            <p className="text-[13px] font-sans text-spring-800 leading-[1.9]">
              Artisan jewelry inspired by nature, handcrafted with precision and passion from the heart of Europe.
            </p>
          </div>

          <div>
            <h4 className="text-[11px] font-sans font-semibold tracking-[0.15em] uppercase text-spring-900 mb-7">
              Customer Service
            </h4>
            <ul className="space-y-4">
              {["Contact Us", "Shipping & Returns", "FAQs", "Size Guide"].map(
                (item) => (
                  <li key={item}>
                    <Link href="#" className="text-[13px] font-sans text-spring-700 hover:text-spring-500 transition-colors duration-300">
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-sans font-semibold tracking-[0.15em] uppercase text-spring-900 mb-7">
              About Argentum
            </h4>
            <ul className="space-y-4">
              {["Our Story", "Craftsmanship", "Sustainability", "Careers"].map(
                (item) => (
                  <li key={item}>
                    <Link href="#" className="text-[13px] font-sans text-spring-700 hover:text-spring-500 transition-colors duration-300">
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-sans font-semibold tracking-[0.15em] uppercase text-spring-900 mb-7">
              Stay Connected
            </h4>
            <p className="text-[13px] font-sans text-spring-700 mb-6 leading-[1.7]">
              Sign up for exclusive offers and new arrivals.
            </p>
            <div className="flex rounded-lg overflow-hidden border border-spring-300 focus-within:border-spring-600 transition-colors group">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-white px-4 py-3.5 text-[13px] font-sans focus:outline-none"
              />
              <button className="bg-spring-700 text-white px-6 py-3.5 text-[11px] font-sans font-semibold tracking-[0.1em] uppercase hover:bg-spring-600 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-spring-200 py-10 px-8">
        <div className="w-full max-w-[1720px] px-12 md:px-32 mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[11px] font-sans text-spring-600 tracking-wide">
            &copy; 2026 Argentum. All rights reserved.
          </p>
          <div className="flex gap-10">
            {["Privacy Policy", "Terms of Service", "Cookie Settings"].map(
              (item) => (
                <Link key={item} href="#" className="text-[11px] font-sans text-spring-600 hover:text-spring-800 transition-colors duration-300">
                  {item}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
