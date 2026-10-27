/**
 * Collection (category) definitions – shared by /shop/[...slug], sitemap and breadcrumbs.
 * (Moved out of app/shop/[...slug]/page.tsx, which may not export extra symbols.)
 */

export const validCategories: Record<
  string,
  { title: string; subtitle: string; description: string }
> = {
  "astera-nakit": {
    title: "Astera nakit",
    subtitle: "Rođena da sjaji • Definiran posebnošću",
    description:
      "Suvremeni luksuzni nakit, ogrlice i naušnice oblikovani s bezvremenskom elegancijom.",
  },
  "tradicijski-nakit": {
    title: "Tradicijski nakit",
    subtitle: "Zlatno nasljeđe Hrvatske",
    description:
      "Autentični šibenski botuni, splitske košarice, konavoske verižice, kameje i paške peružine ručne izrade.",
  },
  "zlatni-nakit": {
    title: "Zlatni nakit",
    subtitle: "14-Karatno Zlato • Ručna Izrada",
    description:
      "Kurirana selekcija nakita izrađenog u plemenitom 14-karatnom zlatu (585) vrhunske čistoće.",
  },
};

export const subcategoryLabels: Record<string, string> = {
  prstenje: "Prstenje",
  ogrlice: "Ogrlice",
  nausnice: "Naušnice",
  narukvice: "Narukvice",
};

/** English catalogue category (products.json) -> Croatian label, e.g. for schema.org `category`. */
export const categoryLabelHr: Record<string, string> = {
  Rings: "Prstenje",
  Earrings: "Naušnice",
  Necklaces: "Ogrlice",
  Bracelets: "Narukvice",
};

/** Whether a product belongs to a collection slug (mirrors the filter used on the collection page). */
export function belongsToCategory(
  p: { line?: string; material: string[] },
  categorySlug: string
): boolean {
  if (categorySlug === "zlatni-nakit") return p.material.includes("14k Gold");
  return p.line === categorySlug;
}