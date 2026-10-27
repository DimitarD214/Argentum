import { formatEUR, getPriceInfo, LOWEST_PRICE_LABEL, type PriceSource } from "@/lib/pricing";
import { VAT_NOTICE } from "@/lib/company";

interface PriceDisplayProps {
  product: PriceSource;
  /** Material label from products.json (e.g. "Sterling Silver"); selects the price variant */
  material?: string;
  /** "lg" = PDP, "sm" = cards/lists */
  size?: "lg" | "sm";
  className?: string;
  showVatNotice?: boolean;
  /** Prefix such as "od" for products that have several variants */
  prefix?: string;
}

/**
 * Single price component for the whole shop.
 * - Always EUR (hr-HR formatting: "440,00 €")
 * - Discounted items show the sale price + "Najniža cijena u zadnjih 30 dana: X €" (ZZP čl. 19)
 * - Tax-status notice next to the price (ZZP / PDV)
 */
export default function PriceDisplay({
  product,
  material,
  size = "sm",
  className = "",
  showVatNotice = true,
  prefix,
}: PriceDisplayProps) {
  const info = getPriceInfo(product, material);
  const large = size === "lg";

  return (
    <div className={className}>
      <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
        <span
          className={
            large
              ? "font-serif text-2xl md:text-3xl text-astera-800 font-light italic"
              : "font-serif text-base font-bold text-astera-900"
          }
        >
          {prefix ? `${prefix} ` : ""}
          {formatEUR(info.current)}
        </span>
        {info.isDiscounted && (
          <span
            className={`rounded-full bg-rose-600 text-white font-sans font-bold px-2 py-0.5 ${
              large ? "text-xs" : "text-[10px]"
            }`}
          >
            -{info.discountPercent}%
          </span>
        )}
      </div>

      {info.isDiscounted && info.lowest30d !== undefined && (
        <p
          className={`font-sans text-charcoal/70 mt-1 ${large ? "text-sm" : "text-[10px] leading-tight"}`}
        >
          {LOWEST_PRICE_LABEL}:{" "}
          <span className="line-through">{formatEUR(info.lowest30d)}</span>
        </p>
      )}

      {showVatNotice && (
        <p
          className={`font-sans text-charcoal/55 ${large ? "text-xs mt-1.5" : "text-[10px] mt-0.5 leading-tight"}`}
        >
          {VAT_NOTICE}
        </p>
      )}
    </div>
  );
}