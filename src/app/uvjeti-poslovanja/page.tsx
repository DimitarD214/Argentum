import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { LegalSection } from "@/components/legal/LegalPage";
import {
  company,
  companyFullName,
  companyAddressLine,
  VAT_NOTICE,
} from "@/lib/company";

export const metadata: Metadata = {
  title: "Opći uvjeti poslovanja",
  description:
    "Opći uvjeti poslovanja web trgovine Astera: cijene u eurima, dostava, jednostrani raskid ugovora u roku 14 dana, pisani prigovor potrošača i izvansudsko rješavanje sporova.",
  alternates: { canonical: "/uvjeti-poslovanja" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Opći uvjeti poslovanja"
      intro="Ovi Opći uvjeti uređuju kupnju u web trgovini Astera i sastavljeni su u skladu sa Zakonom o zaštiti potrošača (ZZP), Zakonom o elektroničkoj trgovini (ZET) i Zakonom o obveznim odnosima."
    >
      <LegalSection id="prodavatelj" title="1. Podaci o prodavatelju">
        <ul className="space-y-1">
          <li><strong>Naziv:</strong> {companyFullName}</li>
          <li><strong>Sjedište:</strong> {companyAddressLine}</li>
          <li><strong>OIB:</strong> {company.oib}</li>
          <li><strong>{company.registrationLabel}:</strong> {company.registrationNumber}</li>
          <li><strong>E-mail:</strong> {company.email}</li>
          <li><strong>Telefon:</strong> {company.phone}</li>
        </ul>
      </LegalSection>

      <LegalSection id="cijene" title="2. Cijene i plaćanje">
        <p>
          Sve cijene u web trgovini iskazane su u eurima (EUR, €). {VAT_NOTICE}. Cijena koja je
          prikazana u trenutku slanja narudžbe je konačna; dostava unutar Republike Hrvatske je
          besplatna.
        </p>
        <p>
          Kada je proizvod snižen, uz sniženu cijenu uvijek navodimo i{" "}
          <strong>najnižu cijenu koju smo primjenjivali u zadnjih 30 dana</strong> prije sniženja
          (čl. 19. ZZP-a).
        </p>
        <p>Plaćanje se obavlja kreditnim i debitnim karticama putem sustava Stripe. Podaci o kartici ne pohranjuju se na našim poslužiteljima.</p>
      </LegalSection>

      <LegalSection id="narudzba" title="3. Naručivanje i sklapanje ugovora">
        <p>
          Ugovor o kupoprodaji sklapa se na daljinu. Prije slanja narudžbe prikazujemo vam
          sažetak proizvoda, ukupnu cijenu i način dostave. Narudžbu šaljete klikom na gumb{" "}
          <strong>&bdquo;Naruči s obvezom plaćanja&ldquo;</strong> nakon što ste prihvatili ove Opće
          uvjete. Time se obvezujete platiti naznačeni iznos. Potvrdu narudžbe primate e-poštom.
        </p>
      </LegalSection>

      <LegalSection id="dostava" title="4. Dostava">
        <p>
          Dostava unutar Republike Hrvatske je besplatna, a rok isporuke je{" "}
          <strong>2-4 radna dana</strong> od zaprimanja narudžbe i uplate. Svaki komad isporučuje
          se u poklon kutijici.
        </p>
      </LegalSection>

      <LegalSection id="raskid" title="5. Pravo na jednostrani raskid ugovora (14 dana)">
        <p>
          Kao potrošač imate pravo bez navođenja razloga jednostrano raskinuti ugovor u roku od{" "}
          <strong>14 dana</strong>. Rok počinje teći od dana kada vi ili treća osoba koju ste vi
          odredili (a koja nije prijevoznik) preuzmete robu u posjed.
        </p>
        <p>
          Raskid nam možete priopćiti nedvosmislenom izjavom (e-poštom ili poštom) na kontakt
          podatke iz točke 1., ili pomoću{" "}
          <a href="/obrazac-za-raskid" download="obrazac-za-jednostrani-raskid-ugovora.txt" className="underline underline-offset-2 font-bold text-astera-800">
            obrasca za jednostrani raskid ugovora (preuzmi)
          </a>
          . Dovoljno je da izjavu pošaljete prije isteka roka od 14 dana.
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Robu morate vratiti bez nepotrebnog odgađanja, a najkasnije 14 dana od dana kad ste nas obavijestili o raskidu.</li>
          <li>Povrat cjelokupnog iznosa (uključujući trošak standardne dostave) izvršavamo najkasnije u roku od 14 dana od zaprimanja vaše odluke o raskidu, istim sredstvom plaćanja kojim ste platili. Povrat možemo zadržati do primitka robe ili dokaza o njezinu slanju.</li>
          <li>Izravne troškove povrata robe snosi potrošač.</li>
          <li>Odgovarate za umanjenu vrijednost robe koja je posljedica rukovanja robom izvan onoga što je potrebno za utvrđivanje njezine prirode, obilježja i funkcionalnosti.</li>
        </ul>
      </LegalSection>

      <LegalSection id="prigovori" title="6. Pisani prigovor potrošača">
        <p>
          Prigovor (reklamaciju) možete uputiti u pisanom obliku e-poštom na{" "}
          <strong>{company.email}</strong> ili poštom na adresu: {companyAddressLine}. U prigovoru
          navedite broj narudžbe, opis nedostatka i željeni način rješavanja.
        </p>
        <p>
          Na vaš pisani prigovor odgovorit ćemo pisanim putem najkasnije u roku od{" "}
          <strong>15 dana</strong> od zaprimanja. Ako niste zadovoljni odgovorom, možete se obratiti
          Državnom inspektoratu ili pokrenuti postupak izvansudskog rješavanja spora (točka 9.).
        </p>
      </LegalSection>

      <LegalSection id="nesukladnost" title="7. Odgovornost za nesukladnost robe">
        <p>
          Prodavatelj odgovara za nesukladnost robe ugovoru koja postoji u trenutku isporuke i
          pojavi se u roku od dvije godine od isporuke, sukladno ZZP-u. Za ostvarivanje prava
          pošaljite pisani prigovor prema točki 6.
        </p>
      </LegalSection>

      <LegalSection id="plemenite-kovine" title="8. Plemenite kovine i žigovi">
        <p>
          Nakit je izrađen od srebra finoće 925 i zlata finoće 585 (14 kt) i označen sukladno
          Zakonu o nadzoru predmeta od plemenitih kovina. Finoća je navedena na svakoj stranici
          proizvoda. Više informacija o oznakama pročitajte na stranici{" "}
          <Link href="/drzavni-zigovi" className="underline underline-offset-2 font-bold text-astera-800">
            Državni žigovi
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection id="izvansudsko" title="9. Izvansudsko rješavanje potrošačkih sporova (ARS / ORS)">
        <p>
          Spor možete pokušati riješiti izvansudskim putem pred tijelom za alternativno rješavanje
          potrošačkih sporova. Europska platforma za online rješavanje sporova (ODR) prestala je
          s radom 20. srpnja 2025.; popis tijela za izvansudsko rješavanje sporova dostupan je na
          portalu Europske komisije{" "}
          <a
            href="https://consumer-redress.ec.europa.eu"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 font-bold text-astera-800"
          >
            Consumer Redress in the EU
          </a>
          . Spomenuti postupak ne isključuje pravo na obraćanje Državnom inspektoratu ni nadležnom
          sudu.
        </p>
      </LegalSection>

      <LegalSection id="podaci" title="10. Zaštita osobnih podataka">
        <p>
          Podatke obrađujemo prema{" "}
          <Link href="/pravila-privatnosti" className="underline underline-offset-2 font-bold text-astera-800">
            Pravilima privatnosti
          </Link>{" "}
          i{" "}
          <Link href="/kolacici" className="underline underline-offset-2 font-bold text-astera-800">
            Politici kolačića
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection id="zavrsne" title="11. Završne odredbe">
        <p>
          Na ove Opće uvjete primjenjuje se hrvatsko pravo. Prodavatelj zadržava pravo izmjene Općih
          uvjeta; na pojedinu narudžbu primjenjuju se uvjeti koji su vrijedili u trenutku njezina
          slanja.
        </p>
      </LegalSection>
    </LegalPage>
  );
}