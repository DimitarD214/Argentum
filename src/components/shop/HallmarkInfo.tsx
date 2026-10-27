import Link from "next/link";

/**
 * Explainer for Croatian hallmarks on precious-metal articles.
 * Legal basis: Zakon o nadzoru predmeta od plemenitih kovina (NN 36/15, 114/22).
 * Authority: Državni zavod za mjeriteljstvo (DZM). Official depictions of the marks are published
 * by DZM – we link to them rather than reproducing the artwork.
 */
export const DZM_URL = "https://www.dzm.gov.hr";

const FINENESS_ROWS = [
  { metal: "Srebro", value: "925", note: "925/1000 – sterling srebro (92,5 % čistog srebra)" },
  { metal: "Zlato 14 kt", value: "585", note: "585/1000 – 14-karatno zlato (58,5 % čistog zlata)" },
];

export default function HallmarkInfo({ showLink = false }: { showLink?: boolean }) {
  return (
    <div className="font-sans text-sm text-charcoal/85 space-y-5 leading-relaxed">
      <p>
        Predmeti od plemenitih kovina (zlato, srebro, platina) smiju se stavljati na tržište
        Republike Hrvatske samo ako su propisano označeni. Nadzor provodi{" "}
        <strong>Državni zavod za mjeriteljstvo (DZM)</strong> prema{" "}
        <em>Zakonu o nadzoru predmeta od plemenitih kovina</em> (NN 36/15, 114/22).
      </p>

      <div>
        <h3 className="font-bold uppercase tracking-[0.18em] text-xs text-astera-900 mb-2">
          Što znače oznake na nakitu
        </h3>
        <ul className="space-y-2 list-disc pl-5">
          <li>
            <strong>Znak odgovornosti</strong> – identifikacijski žig proizvođača ili dobavljača
            koji jamči za kakvoću predmeta.
          </li>
          <li>
            <strong>Oznaka finoće</strong> – broj koji pokazuje udio plemenite kovine u tisućinkama
            (npr. 925 ili 585).
          </li>
          <li>
            <strong>Državni žig</strong> – službeni žig koji utiskuje DZM nakon ispitivanja; sadrži
            oblik karakterističan za vrstu plemenite kovine, oznaku finoće i oznaku HR.
          </li>
        </ul>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border border-astera-200 text-sm">
          <caption className="sr-only">Standardne finoće plemenitih kovina</caption>
          <thead className="bg-warm-beige text-astera-900">
            <tr>
              <th scope="col" className="px-4 py-2.5">Kovina</th>
              <th scope="col" className="px-4 py-2.5">Oznaka</th>
              <th scope="col" className="px-4 py-2.5">Značenje</th>
            </tr>
          </thead>
          <tbody>
            {FINENESS_ROWS.map((r) => (
              <tr key={r.value} className="border-t border-astera-100">
                <th scope="row" className="px-4 py-2 font-bold text-astera-900">{r.metal}</th>
                <td className="px-4 py-2 font-bold">{r.value}</td>
                <td className="px-4 py-2">{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-charcoal/70">
        Službene prikaze državnih žigova (Državni žigovi za predmete od plemenitih kovina) možete
        pogledati na mrežnim stranicama{" "}
        <a
          href={DZM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-astera-700"
        >
          Državnog zavoda za mjeriteljstvo
        </a>
        .
      </p>

      {showLink && (
        <p className="text-xs">
          <Link href="/drzavni-zigovi" className="underline underline-offset-2 hover:text-astera-700">
            Otvori punu stranicu o državnim žigovima
          </Link>
        </p>
      )}
    </div>
  );
}