import type { Metadata } from "next";
import LegalPage, { LegalSection } from "@/components/legal/LegalPage";
import CookieSettingsButton from "@/components/CookieSettingsButton";

export const metadata: Metadata = {
  title: "Politika kolačića",
  description:
    "Popis kolačića i lokalne pohrane koje koristi web trgovina Astera te način upravljanja privolom.",
  alternates: { canonical: "/kolacici" },
};

const ROWS: { category: string; name: string; purpose: string; duration: string }[] = [
  { category: "Nužni", name: "astera-cookie-consent-v1", purpose: "Bilježi vašu odluku o kolačićima.", duration: "Do povlačenja / brisanja podataka preglednika" },
  { category: "Nužni", name: "astera-cart-storage", purpose: "Pamti sadržaj košarice.", duration: "Do brisanja podataka preglednika" },
  { category: "Nužni", name: "astera-checkout-storage", purpose: "Pamti unesene podatke naplate tijekom narudžbe.", duration: "Do brisanja podataka preglednika" },
  { category: "Nužni", name: "astera-favourites-storage", purpose: "Pamti popis favorita koje ste sami odabrali.", duration: "Do brisanja podataka preglednika" },
  { category: "Nužni", name: "sb-* (Supabase)", purpose: "Prijava i sigurnost korisničkog računa.", duration: "Sesija / do odjave" },
  { category: "Nužni", name: "__stripe_mid, __stripe_sid", purpose: "Sprječavanje prijevara pri plaćanju (Stripe).", duration: "Do 1 godine / sesija" },
  { category: "Funkcionalni", name: "astera-customer-preferences", purpose: "Nedavno pregledano, preferirani metal i veličina prstena.", duration: "Do povlačenja privole" },
  { category: "Analitički", name: "astera-jewelry-search-analytics-v2", purpose: "Analitika pretraživanja na vašem uređaju.", duration: "Do povlačenja privole" },
  { category: "Analitički", name: "_ga, _ga_* (Google Analytics)", purpose: "Statistika posjeta (učitava se tek nakon privole, ako je analitika uključena).", duration: "Do 2 godine" },
  { category: "Marketinški", name: "_fbp (Meta Pixel)", purpose: "Mjerenje učinkovitosti oglasa (učitava se tek nakon privole, ako je uključen).", duration: "Do 3 mjeseca" },
];

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Politika kolačića"
      intro="Nužne kolačiće koristimo za rad trgovine. Funkcionalne, analitičke i marketinške tehnologije uključujemo samo ako im izričito pristanete. Odbijanje ne utječe na mogućnost kupnje."
    >
      <LegalSection id="postavke" title="Upravljanje privolom">
        <p>
          Odluku možete promijeniti ili povući u svakom trenutku:{" "}
          <CookieSettingsButton className="underline underline-offset-2 font-bold text-astera-800" />
        </p>
      </LegalSection>
      <LegalSection id="popis" title="Popis kolačića i lokalne pohrane">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border border-astera-200">
            <thead className="bg-warm-beige text-astera-900">
              <tr>
                <th className="px-3 py-2">Kategorija</th>
                <th className="px-3 py-2">Naziv</th>
                <th className="px-3 py-2">Svrha</th>
                <th className="px-3 py-2">Trajanje</th>
              </tr>
            </thead>
            <tbody className="align-top">
              {ROWS.map((r) => (
                <tr key={r.name} className="border-t border-astera-100">
                  <td className="px-3 py-2 font-bold">{r.category}</td>
                  <td className="px-3 py-2 font-mono text-xs">{r.name}</td>
                  <td className="px-3 py-2">{r.purpose}</td>
                  <td className="px-3 py-2">{r.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </LegalSection>
    </LegalPage>
  );
}