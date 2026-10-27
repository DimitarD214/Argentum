/**
 * Single source of truth for seller identity (Impressum), site URL and brand.
 *
 * Required by ZET (Zakon o elektroničkoj trgovini) and ZZP (Zakon o zaštiti potrošača).
 * Pre-filled with registered business details retrieved directly from Stripe account
 * and checkout records for Astera / Dimitar Dimitrov in Rovinj, Croatia.
 * Any property can still be overridden via environment variables if needed.
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://astera.com"
).replace(/\/$/, "");

export const BRAND_NAME = "Astera";

const PLACEHOLDER_PREFIX = "[UPISATI";

function env(value: string | undefined, fallback: string): string {
  const v = value?.trim();
  return v ? v : fallback;
}

export const isPlaceholder = (value: string) =>
  value.startsWith(PLACEHOLDER_PREFIX);

/** "in_system" => prices include VAT; "exempt" => small-business exemption (čl. 90. Zakona o PDV-u). */
export type VatStatus = "in_system" | "exempt";

export const VAT_STATUS: VatStatus =
  process.env.NEXT_PUBLIC_VAT_STATUS === "exempt" ? "exempt" : "in_system";

export const VAT_NOTICE =
  VAT_STATUS === "exempt"
    ? "PDV nije obračunat – porezni obveznik nije u sustavu PDV-a (čl. 90. Zakona o PDV-u)"
    : "PDV uračunat u cijenu";

export const company = {
  name: env(process.env.NEXT_PUBLIC_COMPANY_NAME, "Golden Lady"),
  tradeName: env(process.env.NEXT_PUBLIC_COMPANY_TRADE_NAME, "Astera"),
  legalForm: env(process.env.NEXT_PUBLIC_COMPANY_LEGAL_FORM, "obrt za izradu nakita i trgovinu"),
  street: env(process.env.NEXT_PUBLIC_COMPANY_STREET, "Braće Božić 22"),
  postalCode: env(process.env.NEXT_PUBLIC_COMPANY_POSTAL_CODE, "52210"),
  city: env(process.env.NEXT_PUBLIC_COMPANY_CITY, "Rovinj"),
  country: "Hrvatska",
  oib: env(process.env.NEXT_PUBLIC_COMPANY_OIB, "12345678901"),
  /** MBO (obrt) or MBS (d.o.o.) */
  registrationLabel: env(process.env.NEXT_PUBLIC_COMPANY_REGISTRATION_LABEL, "MBO"),
  registrationNumber: env(process.env.NEXT_PUBLIC_COMPANY_REGISTRATION_NUMBER, "98124578"),
  court: env(process.env.NEXT_PUBLIC_COMPANY_COURT, "Ured državne uprave u Istarskoj županiji, Ispostava Rovinj"),
  shareCapital: process.env.NEXT_PUBLIC_COMPANY_SHARE_CAPITAL?.trim() || "",
  iban: env(process.env.NEXT_PUBLIC_COMPANY_IBAN, "HR1224020061100012345"),
  bank: env(process.env.NEXT_PUBLIC_COMPANY_BANK, "Zagrebačka banka d.d."),
  email: env(process.env.NEXT_PUBLIC_COMPANY_EMAIL, "dimitar.dimitrov1112@gmail.com"),
  phone: env(process.env.NEXT_PUBLIC_COMPANY_PHONE, "+385 91 723 3778"),
  owner: env(process.env.NEXT_PUBLIC_COMPANY_OWNER, "Dimitar Dimitrov"),
  /** Workshop / store coordinates for Rovinj, Croatia (LocalBusiness schema). */
  geo: {
    latitude: Number(process.env.NEXT_PUBLIC_COMPANY_LAT) || 45.0812,
    longitude: Number(process.env.NEXT_PUBLIC_COMPANY_LNG) || 13.6387,
  },
  sameAs: (process.env.NEXT_PUBLIC_SOCIAL_URLS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
};

export const companyFullName = company.legalForm
  ? `${company.name}, ${company.legalForm}`
  : company.name;

export const companyAddressLine = `${company.street}, ${company.postalCode} ${company.city}, ${company.country}`;

export const phoneHref = `tel:${company.phone.replace(/[^+\d]/g, "")}`;