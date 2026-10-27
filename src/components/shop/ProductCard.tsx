"use client";
import Image from "next/image";
import Link from "next/link";
import { useFavouritesStore } from "@/store/favouritesStore";
import { useCartStore } from "@/store/cartStore";
import HighlightedText from "@/components/search/HighlightedText";
import PriceDisplay from "@/components/shop/PriceDisplay";
import { MatchReason, SearchableProduct } from "@/lib/searchEngine";

interface ProductCardProps {
  product: SearchableProduct;
  index: number;
  t?: (val: string) => string;
  isLarge?: boolean;
  score?: number;
  reasons?: MatchReason[];
  highlightTerms?: string[];
  developerMode?: boolean;
  clickCount?: number;
  queryClickCount?: number;
  onProductClick?: (product: SearchableProduct) => void;
  onSimulateClickBoost?: (product: SearchableProduct) => void;
}

const defaultTranslate = (val: string) => val;

export default function ProductCard({
  product,
  index,
  t = defaultTranslate,
  isLarge = false,
  score,
  reasons = [],
  highlightTerms = [],
  developerMode = false,
  clickCount = 0,
  queryClickCount = 0,
  onProductClick,
  onSimulateClickBoost,
}: ProductCardProps) {
  const { items: favItems, toggleFavourite } = useFavouritesStore();
  const updateCartOpen = useCartStore((state) => state.updateCartOpen);
  const addItem = useCartStore((state) => state.addItem);

  const isFav = favItems.includes(product.id);
  const badge =
    product.badges && product.badges.length > 0 ? product.badges[0] : null;

  const getBasePrice = (p: SearchableProduct) =>
    p.basePrice ||
    p.price?.gold_14k ||
    p.price?.sterling_silver ||
    p.price?.rose_gold ||
    p.price?.platinum ||
    0;

  const rating = product.rating ?? 4.8;
  const reviewCount = product.reviewCount ?? 120;
  const brand = product.brand || "Astera Atelier";

  const handleToggleFav = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavourite(id);
  };

  const handleQuickAdd = (e: React.MouseEvent, prod: SearchableProduct) => {
    e.preventDefault();
    e.stopPropagation();
    if (onProductClick) onProductClick(prod);

    const defaultMaterial = prod.material?.[0] || "14k Gold";
    const materialKey =
      defaultMaterial === "14k Gold"
        ? "gold_14k"
        : defaultMaterial.toLowerCase().replace(" ", "_");
    const itemPrice =
      prod.price?.[materialKey as keyof typeof prod.price] ||
      getBasePrice(prod);

    addItem({
      id: prod.id,
      name: prod.name,
      price: itemPrice,
      quantity: 1,
      image:
        prod.images && prod.images[0]
          ? prod.images[0]
          : "/images/astera-showcase.jpg",
      metal: t(defaultMaterial),
    });

    updateCartOpen(true);
  };

  const handleCardClick = () => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  const colSpanClass = isLarge
    ? "lg:col-span-2 lg:row-span-2"
    : "col-span-1 row-span-1";

  const typeBadgeStyle = (type: MatchReason["type"]) => {
    switch (type) {
      case "exact-phrase":
        return "bg-emerald-950 text-emerald-300 border-emerald-700/60";
      case "exact":
        return "bg-emerald-900/70 text-emerald-200 border-emerald-600/50";
      case "partial-prefix":
      case "partial-substring":
        return "bg-sky-950 text-sky-200 border-sky-700/60";
      case "fuzzy":
        return "bg-amber-950 text-amber-200 border-amber-600/60";
      case "synonym":
        return "bg-purple-950 text-purple-200 border-purple-700/60";
      case "multi-word-bonus":
        return "bg-indigo-950 text-indigo-200 border-indigo-700/60";
      case "click-boost":
        return "bg-rose-950 text-rose-200 border-rose-700/60";
      default:
        return "bg-stone-800 text-stone-200 border-stone-600";
    }
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl bg-white border border-astera-200/90 shadow-xs transition-all duration-300 hover:shadow-xl hover:border-astera-400/80 ${colSpanClass} flex flex-col justify-between`}
    >
      {/* Top Image Container */}
      <Link
        href={`/shop/${product.id}`}
        onClick={handleCardClick}
        className="block w-full relative aspect-[4/3] bg-warm-beige/60 overflow-hidden shrink-0"
      >
        <div className="absolute top-3 left-3 z-20 flex flex-wrap gap-1.5 max-w-[75%]">
          {badge && (
            <span className="bg-astera-900/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-sans font-bold tracking-wider uppercase text-astera-100">
              {badge}
            </span>
          )}
          {developerMode && queryClickCount > 0 && (
            <span
              title="Boosted by user click behaviour for this search"
              className="bg-emerald-700/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-sans font-bold tracking-wider uppercase text-white flex items-center gap-1"
            >
              <span>🔥</span>
              <span>+{queryClickCount} klikova</span>
            </span>
          )}
        </div>

        <button
          onClick={(e) => handleToggleFav(e, product.id)}
          aria-label="Dodaj u favorite"
          className="absolute top-3 right-3 z-20 p-2 bg-white/90 backdrop-blur-md rounded-full text-astera-900 hover:bg-white transition-colors duration-200 shadow-xs cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={isFav ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-4 h-4 ${isFav ? "text-rose-600" : "text-astera-900"}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </button>

        <Image
          src={
            product.images && product.images[0]
              ? product.images[0]
              : "/images/astera-showcase.jpg"
          }
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          loading={index < 4 ? "eager" : "lazy"}
          className={`object-cover z-10 transition-transform duration-700 group-hover:scale-105 ${
            product.images && product.images.length > 1
              ? "group-hover:opacity-0 opacity-100"
              : "opacity-100"
          }`}
        />
        {product.images && product.images.length > 1 && product.images[1] && (
          <Image
            src={product.images[1]}
            alt={`${product.name} drugi kut`}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover z-10 opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105 absolute inset-0"
          />
        )}
      </Link>

      {/* Card Content Body */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-2.5 bg-white">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-astera-600 truncate">
              <HighlightedText
                text={brand}
                highlightTerms={highlightTerms}
              />
            </span>
            <span className="text-[10px] font-sans text-charcoal/55 truncate">
              <HighlightedText
                text={t(product.stoneColor || product.category)}
                highlightTerms={highlightTerms}
              />
            </span>
          </div>

          <Link
            href={`/shop/${product.id}`}
            onClick={handleCardClick}
            className="block group-hover:text-astera-700 transition-colors"
          >
            <h2 className="font-serif text-sm md:text-[15px] font-semibold text-astera-900 leading-snug line-clamp-1">
              <HighlightedText
                text={product.name}
                highlightTerms={highlightTerms}
              />
            </h2>
          </Link>

          <p className="text-[11px] font-sans text-charcoal/65 mt-1 line-clamp-2 leading-relaxed">
            <HighlightedText
              text={
                product.description ||
                `${product.stoneColor} • ${product.theme}`
              }
              highlightTerms={highlightTerms}
            />
          </p>
        </div>

        <div className="pt-2 border-t border-astera-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-1 text-xs font-sans mb-0.5">
              <span className="text-amber-500">★</span>
              <span className="font-bold text-astera-900">
                {rating.toFixed(1)}
              </span>
              <span className="text-charcoal/50 text-[11px]">
                ({reviewCount})
              </span>
            </div>
            <PriceDisplay
              product={product}
              material={product.material?.[0]}
              size="sm"
            />
          </div>

          <button
            onClick={(e) => handleQuickAdd(e, product)}
            className="px-3.5 py-1.5 rounded-lg bg-astera-900 text-white hover:bg-astera-700 text-[10px] font-sans font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Dodaj
          </button>
        </div>

        {/* DEVELOPER MODE (STRICTLY OWNER ONLY) */}
        {developerMode && (
          <div className="mt-2 pt-2.5 border-t border-dashed border-astera-300 bg-obsidian text-white rounded-xl p-3 text-[11px] font-mono space-y-2">
            <div className="flex items-center justify-between border-b border-white/15 pb-1.5">
              <span className="text-amber-300 font-bold uppercase tracking-wider text-[10px]">
                ⚡ Relevance Score
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold text-xs border border-amber-400/40">
                {typeof score === "number" ? `${score.toFixed(1)} pts` : "N/A"}
              </span>
            </div>

            <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
              {reasons.map((r, idx) => (
                <div
                  key={idx}
                  className={`px-2 py-1 rounded border text-[10px] leading-tight flex items-start justify-between gap-2 ${typeBadgeStyle(
                    r.type
                  )}`}
                >
                  <span className="break-words">{r.explanation}</span>
                  <span className="font-bold shrink-0">
                    +{r.scoreDelta.toFixed(1)}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[10px] text-stone-300">
              <span>
                Clicks: <strong className="text-white">{clickCount}</strong>{" "}
                (Query: <strong className="text-emerald-300">{queryClickCount}</strong>)
              </span>
              {onSimulateClickBoost && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onSimulateClickBoost(product);
                  }}
                  className="px-2 py-0.5 rounded bg-rose-600 hover:bg-rose-500 text-white font-sans font-bold text-[10px] cursor-pointer transition-colors"
                >
                  +1 Click Boost
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
