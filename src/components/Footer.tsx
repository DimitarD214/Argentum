"use client";
import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import CookieSettingsButton from "@/components/CookieSettingsButton";
import {
  company,
  companyFullName,
  companyAddressLine,
  phoneHref,
  VAT_NOTICE,
} from "@/lib/company";

const legalLinkClass =
  "text-[10px] font-sans font-bold tracking-widest uppercase text-astera-300/90 hover:text-white transition-colors";

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    toast.success("Hvala vam na prijavi u žurnal Astere!");
    setNewsletterEmail("");
  };

  return (
    <footer className="bg-astera-900 text-white border-t border-astera-800">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-20 lg:py-24">
        {/* Top Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-20">
          {/* Column 1: Shop Categories */}
          <div className="flex flex-col">
            <h3 className="text-[11px] uppercase tracking-[0.25em] font-bold mb-10 font-sans text-astera-300">
              Ponuda Nakita
            </h3>
            <ul className="flex flex-col space-y-5">
              <li>
                <Link
                  href="/shop/astera-nakit"
                  className="text-[13px] text-astera-100/75 font-sans hover:text-white transition-all duration-300"
                >
                  Astera nakit
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/tradicijski-nakit"
                  className="text-[13px] text-astera-100/75 font-sans hover:text-white transition-all duration-300"
                >
                  Tradicijski nakit
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/zlatni-nakit"
                  className="text-[13px] text-astera-100/75 font-sans hover:text-white transition-all duration-300"
                >
                  Zlatni nakit (14k)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Customer Care */}
          <div className="flex flex-col">
            <h3 className="text-[11px] uppercase tracking-[0.25em] font-bold mb-10 font-sans text-astera-300">
              Korisnička podrška
            </h3>
            <ul className="flex flex-col space-y-5">
              <li>
                <Link
                  href="/uvjeti-poslovanja#dostava"
                  className="text-[13px] text-astera-100/75 font-sans hover:text-white transition-all duration-300"
                >
                  Dostava i isporuka
                </Link>
              </li>
              <li>
                <Link
                  href="/uvjeti-poslovanja#raskid"
                  className="text-[13px] text-astera-100/75 font-sans hover:text-white transition-all duration-300"
                >
                  Povrati i zamjene
                </Link>
              </li>
              <li>
                <Link
                  href="/vodic-za-velicine"
                  className="text-[13px] text-astera-100/75 font-sans hover:text-white transition-all duration-300"
                >
                  Vodič za veličine
                </Link>
              </li>
              <li>
                <a
                  href="https://wa.me/385955791294?text=Pozdrav,%20imam%20upit%20vezan%20za%20nakit%20Astera"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-astera-100/75 font-sans hover:text-white transition-all duration-300"
                >
                  Kontaktirajte nas (WhatsApp)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: About Astera */}
          <div className="flex flex-col">
            <h3 className="text-[11px] uppercase tracking-[0.25em] font-bold mb-10 font-sans text-astera-300">
              O kući Astera
            </h3>
            <ul className="flex flex-col space-y-5">
              <li>
                <Link
                  href="/#story"
                  className="text-[13px] text-astera-100/75 font-sans hover:text-white transition-all duration-300"
                >
                  Naša baština
                </Link>
              </li>
              <li>
                <Link
                  href="/#story"
                  className="text-[13px] text-astera-100/75 font-sans hover:text-white transition-all duration-300"
                >
                  Ručna izrada
                </Link>
              </li>
              <li>
                <Link
                  href="/#story"
                  className="text-[13px] text-astera-100/75 font-sans hover:text-white transition-all duration-300"
                >
                  Etičko porijeklo
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter/Brand */}
          <div className="flex flex-col">
            <h3 className="text-[11px] uppercase tracking-[0.25em] font-bold mb-10 font-sans text-astera-300">
              Svijet Astere
            </h3>
            <p className="text-[14px] text-astera-100/65 font-sans leading-relaxed mb-8 italic">
              Pretplatite se na naš žurnal kako biste primali vijesti o novim unikatnim kreacijama i umijeću zlatarske izrade.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="relative">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="E-MAIL ADRESA"
                className="w-full bg-transparent border-b border-astera-700 py-3 pr-24 text-[11px] font-sans tracking-widest text-white focus:outline-none focus:border-astera-300 transition-colors placeholder:text-astera-400/50"
              />
              <button
                type="submit"
                className="absolute right-0 bottom-3 text-[10px] font-bold tracking-widest uppercase text-astera-300 hover:text-white transition-colors cursor-pointer"
              >
                Pridruži se
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Impressum (ZET / ZZP – podaci o pružatelju usluga) */}
      <div className="border-t border-white/10 bg-black/15">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <h3 className="text-[11px] uppercase tracking-[0.25em] font-bold font-sans text-astera-300">
              Impressum &bull; Zakonski podaci o trgovcu
            </h3>
            <span className="text-[10px] tracking-wider uppercase text-astera-300/70 font-sans">
              ZET &bull; ZZP &bull; DZM
            </span>
          </div>
          <address className="not-italic grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-2.5 text-[12px] leading-relaxed text-astera-100/80 font-sans">
            <p><span className="text-astera-300 font-medium">Naziv obrta:</span> {companyFullName}</p>
            <p><span className="text-astera-300 font-medium">Trgovina / Brand:</span> {company.tradeName || "Astera"}</p>
            <p><span className="text-astera-300 font-medium">Vlasnik:</span> {company.owner}</p>
            <p><span className="text-astera-300 font-medium">Sjedište / Adresa:</span> {companyAddressLine}</p>
            <p><span className="text-astera-300 font-medium">OIB:</span> {company.oib}</p>
            <p><span className="text-astera-300 font-medium">{company.registrationLabel} (Matični broj):</span> {company.registrationNumber}</p>
            <p><span className="text-astera-300 font-medium">Transakcijski račun (IBAN):</span> {company.iban}{company.bank ? ` (${company.bank})` : ""}</p>
            <p>
              <span className="text-astera-300 font-medium">E-mail:</span>{" "}
              <a href={`mailto:${company.email}`} className="hover:text-white underline underline-offset-2">{company.email}</a>
            </p>
            <p>
              <span className="text-astera-300 font-medium">Telefon:</span>{" "}
              <a href={phoneHref} className="hover:text-white underline underline-offset-2">{company.phone}</a>
            </p>
            {company.court && (
              <p className="sm:col-span-2 lg:col-span-3 text-astera-100/70">
                <span className="text-astera-300 font-medium">Nadležni registar:</span> {company.court}
              </p>
            )}
          </address>
          <p className="mt-4 pt-3 border-t border-white/5 text-[11px] text-astera-100/60 font-sans">
            Sve cijene u web trgovini izražene su u eurima (€). {VAT_NOTICE}.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black/25 py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row justify-between items-center gap-12">
          {/* Logo */}
          <div className="flex flex-col items-center md:items-start order-2 md:order-1">
            <h2 className="font-serif text-[32px] md:text-[40px] tracking-[0.4em] uppercase text-white mb-2">
              ASTERA
            </h2>
            <p className="text-[10px] font-serif italic text-astera-300 tracking-[0.25em] mb-3">
              Definiran posebnošću
            </p>
            <p className="text-[9px] text-astera-400/70 font-sans tracking-[0.2em] uppercase">
              © 2026 Golden Lady • Brand Astera. Sva prava pridržana.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-6 items-center order-1 md:order-2">
            <a
              href="https://wa.me/385955791294"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="text-astera-300 hover:text-white transition-all duration-500 hover:scale-125"
            >
              <div className="w-5 h-5 rounded-full border border-current flex items-center justify-center p-1">
                <div className="w-1.5 h-1.5 bg-current rounded-full" />
              </div>
            </a>
            <a
              href={`mailto:${company.email}`}
              aria-label="Email"
              className="text-astera-300 hover:text-white transition-all duration-500 hover:scale-125"
            >
              <div className="w-5 h-5 rounded-full border border-current flex items-center justify-center p-1">
                <div className="w-1.5 h-1.5 bg-current rounded-full" />
              </div>
            </a>
          </div>

          {/* Legal Links */}
          <nav aria-label="Pravne informacije" className="flex flex-wrap justify-center gap-x-6 gap-y-3 order-3 max-w-xl">
            <Link href="/uvjeti-poslovanja" className={legalLinkClass}>
              Opći uvjeti poslovanja
            </Link>
            <Link href="/uvjeti-poslovanja#prigovori" className={legalLinkClass}>
              Pisani prigovor
            </Link>
            <Link href="/pravila-privatnosti" className={legalLinkClass}>
              Pravila privatnosti
            </Link>
            <Link href="/kolacici" className={legalLinkClass}>
              Kolačići
            </Link>
            <CookieSettingsButton className={legalLinkClass} />
            <Link href="/drzavni-zigovi" className={legalLinkClass}>
              Državni žigovi
            </Link>
            <a
              href="https://consumer-redress.ec.europa.eu"
              target="_blank"
              rel="noopener noreferrer"
              className={legalLinkClass}
            >
              Izvansudsko rješavanje sporova (ARS/ORS)
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
