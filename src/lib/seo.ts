/**
 * Centralised SEO helpers: localized titles/descriptions and schema.org (JSON-LD) builders.
 * Used by generateMetadata() and by the <JsonLd /> injectors on layout / collection / PDP pages.
 */
import { BRAND_NAME, SITE_URL, company, companyFullName, isPlaceholder } from "@/lib/company";
import { getFineness, metalToKey, type MetalKey } from "@/lib/pricing";

export interface SeoProduct {
  id: string;
  name: string;
  description?: string | null;
  brand?: string;
  images?: string[];
  material: string[];
  category?: string;
  line?: string;
  price?: Partial<Record<MetalKey, number>>;
  basePrice?: number;
}

export const absoluteUrl = (path: string) =>
  path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;

export const productSku = (id: string) => `ASTERA-${id.toUpperCase()}`;

const variantSuffix: Record<MetalKey, string> = {
  gold_14k: "AU585",
  sterling_silver: "AG925",
  rose_gold: "RAU585",
  platinum: "PT950",
};

export const variantSku = (id: string, material: string) =>
  `${productSku(id)}-${variantSuffix[metalToKey(material)]}`;

/** "Srebro 925" or "Srebro 925 i Zlato 585" */
export function finenessLabel(materials: string[]): string {
  const labels = Array.from(new Set(materials.map((m) => getFineness(m).label)));
  return labels.length ? labels.join(" i ") : "Zlato 585";
}

/** [Naziv Proizvoda] - [Materijal/Finoća] | [Brand Name] */
export function productTitle(p: SeoProduct): string {
  return `${p.name} - ${finenessLabel(p.material)} | ${p.brand || BRAND_NAME}`;
}

const MAX_DESC = 158;

function truncate(text: string, max = MAX_DESC): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,.;:\s]+$/, "") + "…";
}

/** Commercial-intent meta description built from product facts + localized keywords. */
export function productDescription(p: SeoProduct): string {
  const isSilver = p.material.some((m) => metalToKey(m) === "sterling_silver");
  const isGold = p.material.some((m) => metalToKey(m) !== "sterling_silver");
  const kind = isSilver && !isGold ? "srebrni nakit" : isGold && !isSilver ? "zlatni nakit" : "srebrni i zlatni nakit";
  const cert = isSilver ? "certificirano srebro 925" : "zlato 585 s državnim žigom";
  const tail = `Ručni rad, ${cert}, besplatna dostava Hrvatska.`;
  const lead = `${p.name} – ${kind} ${p.brand || BRAND_NAME}.`;
  const space = MAX_DESC - lead.length - tail.length - 2;
  const detail = p.description && space > 25 ? truncate(p.description, space) : "";
  return truncate([lead, detail, tail].filter(Boolean).join(" "));
}

export function collectionDescription(base: string, title: string): string {
  return truncate(
    `${title}: ${base} Srebrni i zlatni nakit, ručni rad, certificirano srebro 925, besplatna dostava Hrvatska.`
  );
}

/* ---------------------------- JSON-LD builders ---------------------------- */

type Json = Record<string, unknown>;

const priceValidUntil = () => {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  return d.toISOString().split("T")[0];
};

export function buildProductJsonLd(p: SeoProduct): Json {
  const url = absoluteUrl(`/shop/${p.id}`);
  const images = (p.images?.length ? p.images : ["/images/astera-showcase.jpg"]).map(absoluteUrl);
  const brandName = p.brand || BRAND_NAME;

  const offers = (p.material.length ? p.material : ["14k Gold"])
    .map((m) => {
      const key = metalToKey(m);
      const price = p.price?.[key];
      if (typeof price !== "number") return null;
      const f = getFineness(m);
      return {
        "@type": "Offer",
        name: `${p.name} – ${f.label}`,
        sku: variantSku(p.id, m),
        url,
        price: price.toFixed(2),
        priceCurrency: "EUR",
        priceValidUntil: priceValidUntil(),
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
        seller: { "@id": `${SITE_URL}/#organization` },
        shippingDetails: {
          "@type": "OfferShippingDetails",
          shippingRate: { "@type": "MonetaryAmount", value: "0.00", currency: "EUR" },
          shippingDestination: { "@type": "DefinedRegion", addressCountry: "HR" },
          deliveryTime: {
            "@type": "ShippingDeliveryTime",
            handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 1, unitCode: "DAY" },
            transitTime: { "@type": "QuantitativeValue", minValue: 2, maxValue: 4, unitCode: "DAY" },
          },
        },
        hasMerchantReturnPolicy: {
          "@type": "MerchantReturnPolicy",
          applicableCountry: "HR",
          returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
          merchantReturnDays: 14,
          returnMethod: "https://schema.org/ReturnByMail",
        },
      };
    })
    .filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: p.name,
    image: images,
    description: p.description || productDescription(p),
    sku: productSku(p.id),
    material: finenessLabel(p.material),
    brand: { "@type": "Brand", name: brandName },
    category: p.category,
    url,
    offers: offers.length === 1 ? offers[0] : offers,
  };
}

export function buildBreadcrumbJsonLd(crumbs: { name: string; path: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function buildJewelryStoreJsonLd(): Json {
  const set = (v: string) => !isPlaceholder(v);
  const address: Json = {
    "@type": "PostalAddress",
    addressLocality: set(company.city) ? company.city : "Zagreb",
    addressCountry: "HR",
  };
  if (set(company.street)) address.streetAddress = company.street;
  if (set(company.postalCode)) address.postalCode = company.postalCode;

  const ld: Json = {
    "@context": "https://schema.org",
    "@type": ["JewelryStore", "LocalBusiness"],
    "@id": `${SITE_URL}/#organization`,
    name: BRAND_NAME,
    legalName: companyFullName,
    url: SITE_URL,
    logo: absoluteUrl("/images/astera-showcase.jpg"),
    image: absoluteUrl("/images/astera-showcase.jpg"),
    description:
      "Srebrni i zlatni nakit ručne izrade te tradicijski hrvatski nakit. Certificirano srebro 925 i zlato 585, besplatna dostava u Hrvatskoj.",
    telephone: company.phone,
    address,
    geo: {
      "@type": "GeoCoordinates",
      latitude: company.geo.latitude,
      longitude: company.geo.longitude,
    },
    areaServed: { "@type": "Country", name: "Hrvatska" },
    priceRange: "€€",
    currenciesAccepted: "EUR",
    paymentAccepted: "Kreditne i debitne kartice",
    knowsLanguage: "hr",
  };
  if (set(company.name)) ld.legalName = companyFullName;
  if (set(company.email)) ld.email = company.email;
  if (set(company.oib)) ld.taxID = company.oib;
  if (company.sameAs.length) ld.sameAs = company.sameAs;
  return ld;
}