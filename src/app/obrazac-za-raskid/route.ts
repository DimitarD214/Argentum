import { company, companyAddressLine, companyFullName } from "@/lib/company";

/**
 * Downloadable standard withdrawal form (Obrazac za jednostrani raskid ugovora), generated from the
 * central company details so it can never drift from the Impressum.
 */
export const dynamic = "force-static";

export function GET() {
  const body = `OBRAZAC ZA JEDNOSTRANI RASKID UGOVORA
(Ispunite i vratite ovaj obrazac samo ako želite raskinuti ugovor.)

Primatelj:
${companyFullName}
${companyAddressLine}
E-mail: ${company.email}

Ovime obavještavam da raskidam ugovor o prodaji sljedeće robe:
______________________________________________________________

Broj narudžbe: _______________________________________________
Naručeno dana / primljeno dana (nepotrebno prekrižiti): ______________

Ime i prezime potrošača: _____________________________________
Adresa potrošača: ____________________________________________
IBAN / račun za povrat novca (neobavezno): ___________________

Potpis potrošača (samo ako se obrazac dostavlja na papiru): ___________

Datum: _______________________

Napomena: Rok za jednostrani raskid je 14 dana od dana preuzimanja robe.
`;
  return new Response("\uFEFF" + body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": 'attachment; filename="obrazac-za-jednostrani-raskid-ugovora.txt"',
    },
  });
}