/**
 * EUR formatting, fineness (DZM) mapping and the 30-day "Omnibus" price rule (ZZP čl. 19).
 *
 * Product data model (src/data/products.json) – optional field for discounted items:
 *
 *   "priceHistory30d": { "gold_14k": 520, "sterling_silver": 95 }
 *
 * = the LOWEST price applied during the 30 days BEFORE the reduction started, per metal.
 * `price.*` always holds the CURRENT (sale) price. An item is treated as discounted for a metal
 * only if priceHistory30d[metal] > price[metal]. Remove the field when the reduction ends.
 */

export type MetalKey = "gold_14k" | "sterling_silver" | "rose_gold" | "platinum";

const eurFormatter = new Intl.NumberFormat("hr-HR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** 440 -> "440,00 €" (Croatian convention, ISO currency EUR). */
export function formatEUR(amount: number): string {
  return eurFormatter.format(amount).replace(/\u00a0/g, " ");
}

/** Maps product material labels used in products.json to a price key. */
export function metalToKey(material?: string): MetalKey {
  const m = (material || "").toLowerCase();
  if (m.includes("silver") || m.includes("srebro")) return "sterling_silver";
  if (m.includes("rose") || m.includes("rozo")) return "rose_gold";
  if (m.includes("platin")) return "platinum";
  return "gold_14k";
}

export interface Fineness {
  /** e.g. "Srebro 925" – displayed as the dedicated fineness badge */
  label: string;
  /** Millesimal fineness */
  value: number;
  /** e.g. "Srebro" – used in meta titles and as schema.org `material` */
  metal: string;
  /** e.g. "925/1000" */
  ratio: string;
}

export function getFineness(material?: string): Fineness {
  switch (metalToKey(material)) {
    case "sterling_silver":
      return { label: "Srebro 925", value: 925, metal: "Srebro", ratio: "925/1000" };
    case "rose_gold":
      return { label: "Zlato 585", value: 585, metal: "Rozo zlato", ratio: "585/1000" };
    case "platinum":
      return { label: "Platina 950", value: 950, metal: "Platina", ratio: "950/1000" };
    default:
      return { label: "Zlato 585", value: 585, metal: "Zlato", ratio: "585/1000" };
  }
}

export interface PriceSource {
  price?: Partial<Record<MetalKey, number>>;
  priceHistory30d?: Partial<Record<MetalKey, number>>;
  basePrice?: number;
}

export interface PriceInfo {
  current: number;
  /** Lowest price in the 30 days before the reduction; only set for discounted items. */
  lowest30d?: number;
  discountPercent?: number;
  isDiscounted: boolean;
}

export function getPriceInfo(product: PriceSource, material?: string): PriceInfo {
  const key = metalToKey(material);
  const current =
    product.price?.[key] ??
    product.basePrice ??
    product.price?.gold_14k ??
    product.price?.sterling_silver ??
    product.price?.rose_gold ??
    product.price?.platinum ??
    0;

  const lowest = product.priceHistory30d?.[key];
  if (typeof lowest === "number" && lowest > current && current > 0) {
    return {
      current,
      lowest30d: lowest,
      discountPercent: Math.round((1 - current / lowest) * 100),
      isDiscounted: true,
    };
  }
  return { current, isDiscounted: false };
}

export const LOWEST_PRICE_LABEL = "Najniža cijena u zadnjih 30 dana";