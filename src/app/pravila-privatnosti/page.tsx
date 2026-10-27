import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { LegalSection } from "@/components/legal/LegalPage";
import { company, companyFullName, companyAddressLine } from "@/lib/company";
import CookieSettingsButton from "@/components/CookieSettingsButton";

export const metadata: Metadata = {
  title: "Pravila privatnosti",
  description:
    "Pravila privatnosti web trgovine Astera: voditelj obrade, svrhe i pravne osnove obrade osobnih podataka, rokovi pohrane i prava ispitanika prema GDPR-u.",
  alternates: { canonical: "/pravila-privatnosti" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Pravila privatnosti"
      intro="Poštujemo vašu privatnost. Ovdje objašnjavamo koje podatke prikupljamo, zašto, koliko ih dugo čuvamo i koja prava imate prema Općoj uredbi o zaštiti podataka (EU) 2016/679 (GDPR) i Zakonu o provedbi Opće uredbe o zaštiti podataka."
    >
      <LegalSection id="voditelj" title="1. Voditelj obrade">
        <ul className="space-y-1">
          <li><strong>Naziv:</strong> {companyFullName}</li>
          <li><strong>Sjedište:</strong> {companyAddressLine}</li>
          <li><strong>OIB:</strong> {company.oib}</li>
          <li><strong>E-mail za pitanja o privatnosti:</strong> {company.email}</li>
          <li><strong>Telefon:</strong> {company.phone}</li>
        </ul>
      </LegalSection>

      <LegalSection id="podaci" title="2. Koje podatke obrađujemo, svrhe i pravne osnove">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border border-astera-200">
            <thead className="bg-warm-beige text-astera-900">
              <tr>
                <th className="px-3 py-2">Svrha</th>
                <th className="px-3 py-2">Podaci</th>
                <th className="px-3 py-2">Pravna osnova</th>
                <th className="px-3 py-2">Rok pohrane</th>
              </tr>
            </thead>
            <tbody className="align-top">
              <tr className="border-t border-astera-100">
                <td className="px-3 py-2">Obrada i isporuka narudžbe</td>
                <td className="px-3 py-2">Ime, prezime, adresa, e-mail, telefon, sadržaj narudžbe, (za R1 račun: naziv tvrtke i OIB)</td>
                <td className="px-3 py-2">Izvršenje ugovora (čl. 6. st. 1. t. b GDPR)</td>
                <td className="px-3 py-2">Do ispunjenja ugovora i isteka jamstvenih/zastarnih rokova</td>
              </tr>
              <tr className="border-t border-astera-100">
                <td className="px-3 py-2">Računovodstvo i porezne obveze</td>
                <td className="px-3 py-2">Podaci s računa</td>
                <td className="px-3 py-2">Zakonska obveza (čl. 6. st. 1. t. c GDPR)</td>
                <td className="px-3 py-2">Rokovi propisani računovodstvenim i poreznim propisima</td>
              </tr>
              <tr className="border-t border-astera-100">
                <td className="px-3 py-2">Korisnički račun</td>
                <td className="px-3 py-2">E-mail, profil, adrese dostave, povijest narudžbi, spremljena košarica i favoriti</td>
                <td className="px-3 py-2">Izvršenje ugovora / privola</td>
                <td className="px-3 py-2">Do brisanja računa</td>
              </tr>
              <tr className="border-t border-astera-100">
                <td className="px-3 py-2">Odgovori na upite i prigovore</td>
                <td className="px-3 py-2">Kontakt podaci i sadržaj poruke</td>
                <td className="px-3 py-2">Legitimni interes / izvršenje ugovora</td>
                <td className="px-3 py-2">Do 3 godine nakon zaključenja upita</td>
              </tr>
              <tr className="border-t border-astera-100">
                <td className="px-3 py-2">Analitika, personalizacija i marketing (kolačići)</td>
                <td className="px-3 py-2">Online identifikatori, podaci o korištenju stranice</td>
                <td className="px-3 py-2">Privola (čl. 6. st. 1. t. a GDPR; čl. 5. st. 3. ePrivacy)</td>
                <td className="px-3 py-2">Do povlačenja privole, najdulje prema roku pojedinog kolačića</td>
              </tr>
            </tbody>
          </table>
        </div>
      </LegalSection>

      <LegalSection id="primatelji" title="3. Primatelji i izvršitelji obrade">
        <p>Podatke dijelimo samo s pružateljima nužnim za rad trgovine, uz ugovore o obradi podataka:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Stripe</strong> – obrada plaćanja kreditnim karticama;</li>
          <li><strong>Supabase</strong> – baza podataka i prijava korisnika;</li>
          <li><strong>Vercel</strong> – hosting web trgovine;</li>
          <li><strong>Resend</strong> – slanje transakcijskih e-poruka;</li>
          <li><strong>Dostavna služba / BOX NOW</strong> – isporuka narudžbe (ime, adresa, telefon, e-mail);</li>
          <li><strong>Google</strong> – prijava Google računom i prikaz karte pri unosu adrese dostave; <strong>OpenStreetMap (Nominatim)</strong> – prijedlozi adresa.</li>
        </ul>
        <p>Neki od navedenih pružatelja mogu obrađivati podatke izvan EGP-a; u tom se slučaju oslanjamo na odluku o primjerenosti ili standardne ugovorne klauzule.</p>
      </LegalSection>

      <LegalSection id="prava" title="4. Vaša prava">
        <p>
          Imate pravo na pristup, ispravak, brisanje, ograničenje obrade, prenosivost podataka te
          pravo prigovora na obradu. Privolu možete povući u svakom trenutku, bez utjecaja na
          zakonitost obrade prije povlačenja. Zahtjev pošaljite na {company.email}. Imate i pravo
          podnijeti pritužbu nadzornom tijelu: Agencija za zaštitu osobnih podataka (AZOP),{" "}
          <a href="https://azop.hr" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 font-bold text-astera-800">azop.hr</a>.
        </p>
      </LegalSection>

      <LegalSection id="kolacici" title="5. Kolačići i slične tehnologije">
        <p>
          Nenužne kolačiće i pohranu koristimo isključivo uz vašu privolu. Pojedinosti su u{" "}
          <Link href="/kolacici" className="underline underline-offset-2 font-bold text-astera-800">Politici kolačića</Link>.
          Postavke možete promijeniti u svakom trenutku:{" "}
          <CookieSettingsButton className="underline underline-offset-2 font-bold text-astera-800" />.
        </p>
      </LegalSection>

      <LegalSection id="sigurnost" title="6. Sigurnost">
        <p>Podaci se prenose šifriranom vezom (HTTPS). Podatke o platnim karticama obrađuje isključivo Stripe i oni nisu dostupni nama.</p>
      </LegalSection>
    </LegalPage>
  );
}