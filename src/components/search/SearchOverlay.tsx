"use client";
import Image from "next/image";
import { useState, useEffect, useMemo, useDeferredValue } from "react";
import Link from "next/link";
import { formatEUR } from "@/lib/pricing";
import { useRouter } from "next/navigation";
import products from "@/data/products.json";
import {
  executeIntelligentSearch,
  SearchableProduct,
} from "@/lib/searchEngine";
import { useSearchAnalyticsStore } from "@/store/searchAnalyticsStore";
import { useOwnerAccess } from "@/hooks/useOwnerAccess";
import { useIsMounted } from "@/lib/utils";
import HighlightedText from "@/components/search/HighlightedText";

export default function SearchOverlay({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const mounted = useIsMounted();
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const router = useRouter();

  const {
    recentSearches,
    globalProductClicks,
    queryProductClicks,
    developerMode,
    toggleDeveloperMode,
    recordSearchQuery,
    recordProductClick,
    clearRecentSearches,
  } = useSearchAnalyticsStore();

  const {
    isOwner,
    adminViewMode,
    setAdminViewMode,
    showDevControls,
    effectiveDeveloperMode,
  } = useOwnerAccess();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const activeCatalog = useMemo(
    () =>
      (products as SearchableProduct[]).filter(
        (p) => p.category !== "Vjerski nakit" && p.line !== "vjerski-nakit"
      ),
    []
  );

  const searchResponse = useMemo(
    () =>
      executeIntelligentSearch(
        activeCatalog,
        deferredQuery,
        {},
        "relevance",
        {
          globalProductClicks,
          queryProductClicks,
        }
      ),
    [activeCatalog, deferredQuery, globalProductClicks, queryProductClicks]
  );

  if (!mounted || !isOpen) return null;

  const displayedResults = searchResponse.results.slice(0, 8);

  const handleOpenFullSearch = (targetQuery = query) => {
    const clean = targetQuery.trim();
    if (clean.length >= 2) {
      recordSearchQuery(
        clean,
        searchResponse.results.length,
        searchResponse.suggestedAlternatives[0]
      );
    }
    onClose();
    router.push(clean ? `/shop?q=${encodeURIComponent(clean)}` : "/shop");
  };

  return (
    <div className="fixed inset-0 z-[200] bg-cream/98 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-8 md:py-12">
        {/* Exclusive Owner Switcher Bar (Only visible to dimitar.dimitrov1112@gmail.com) */}
        {isOwner && (
          <div className="mb-4 bg-obsidian text-white rounded-2xl px-4 py-2.5 border border-astera-700 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[11px] uppercase tracking-wider text-amber-300 font-bold">
                Owner ({adminViewMode === "customer" ? "Normalni prikaz" : "Dev & Analitika"})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="inline-flex rounded-xl bg-white/10 p-0.5 border border-white/15">
                <button
                  type="button"
                  onClick={() => setAdminViewMode("customer")}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-sans font-bold transition-all cursor-pointer ${
                    adminViewMode === "customer"
                      ? "bg-amber-400 text-obsidian"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  🛍️ Normalna Trgovina
                </button>
                <button
                  type="button"
                  onClick={() => setAdminViewMode("dev")}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-sans font-bold transition-all cursor-pointer ${
                    adminViewMode === "dev"
                      ? "bg-emerald-400 text-obsidian"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  🛠️ Dev &amp; Analitika
                </button>
              </div>
              {showDevControls && (
                <>
                  <button
                    type="button"
                    onClick={toggleDeveloperMode}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold uppercase border cursor-pointer transition-all ${
                      developerMode
                        ? "bg-emerald-500 text-obsidian border-emerald-300"
                        : "bg-white/10 text-white border-white/20"
                    }`}
                  >
                    {developerMode ? "● DEV: ON" : "○ DEV: OFF"}
                  </button>
                  <Link
                    href="/search/analytics"
                    onClick={onClose}
                    className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-amber-300 text-[11px] font-sans font-bold uppercase tracking-wider transition-colors"
                  >
                    Analitika ↗
                  </Link>
                </>
              )}
            </div>
          </div>
        )}

        {/* Top Bar: Search Input + Close */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-8 pb-6 border-b border-astera-200">
          <div className="flex-1 flex items-center gap-3 bg-white border-2 border-astera-300 focus-within:border-astera-900 rounded-2xl px-4 py-2.5 shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="w-5 h-5 text-astera-700 shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleOpenFullSearch(query);
                if (e.key === "Escape") onClose();
              }}
              className="w-full bg-transparent text-base md:text-lg font-sans outline-none text-astera-900 placeholder:text-charcoal/40"
              placeholder='Pretražite nakit (npr. "zlatni prsten kameja", "splitske košarice", "šibenski botun")...'
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-xs text-charcoal/50 hover:text-charcoal px-2 cursor-pointer"
              >
                ✕
              </button>
            )}
            <button
              type="button"
              onClick={() => handleOpenFullSearch(query)}
              className="px-4 py-2 bg-astera-900 text-white rounded-xl text-xs font-sans font-bold uppercase tracking-wider hover:bg-astera-800 transition-colors cursor-pointer shrink-0"
            >
              Prikaži sve ({searchResponse.results.length})
            </button>
          </div>

          <div className="flex items-center justify-end">
            <button
              onClick={onClose}
              className="p-2 hover:rotate-90 transition-transform duration-300 text-astera-900 cursor-pointer"
              aria-label="Zatvori pretraživanje"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Autocomplete Suggestions + Recent Searches */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-astera-200 p-5">
              <h3 className="font-sans font-bold text-xs uppercase tracking-wider text-astera-700 mb-3">
                Prijedlozi pretraživanja
              </h3>
              <div className="space-y-1.5">
                {searchResponse.autocompleteSuggestions.map((sug) => (
                  <button
                    key={sug.text}
                    type="button"
                    onClick={() => setQuery(sug.text)}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-warm-beige text-xs font-sans text-charcoal flex items-center justify-between gap-2 transition-colors cursor-pointer"
                  >
                    <span>
                      🔍 {sug.matchedPrefix}
                      <strong className="font-bold text-astera-900">
                        {sug.boldRemainder}
                      </strong>
                    </span>
                    {sug.badge && (
                      <span className="text-[10px] text-astera-600 font-semibold">
                        {sug.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-astera-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-sans font-bold text-xs uppercase tracking-wider text-astera-700">
                  Nedavne pretrage
                </h3>
                {recentSearches.length > 0 && (
                  <button
                    type="button"
                    onClick={clearRecentSearches}
                    className="text-[11px] font-sans text-charcoal/50 hover:text-astera-900 cursor-pointer"
                  >
                    Očisti
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((rec) => (
                  <button
                    key={rec}
                    type="button"
                    onClick={() => setQuery(rec)}
                    className="px-3 py-1.5 bg-warm-beige border border-astera-200 text-xs font-sans font-semibold text-astera-900 hover:bg-astera-900 hover:text-white transition-all rounded-full cursor-pointer"
                  >
                    🕒 {rec}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Instant Ranked Results */}
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="font-sans font-bold text-xs uppercase tracking-wider text-astera-700">
                  {deferredQuery.trim()
                    ? `Pronađeno ${searchResponse.results.length} rezultata za "${
                        searchResponse.correctedQuery || deferredQuery.trim()
                      }"`
                    : "Izdvojeni nakit iz kolekcije"}
                </h3>
                {searchResponse.correctedQuery &&
                  searchResponse.correctedQuery !==
                    searchResponse.normalizedQuery && (
                    <p className="text-xs text-charcoal/65 mt-0.5">
                      Automatski ispravljeno iz{" "}
                      <span className="line-through">{deferredQuery}</span> →{" "}
                      <strong>{searchResponse.correctedQuery}</strong>
                    </p>
                  )}
              </div>

              <button
                type="button"
                onClick={() => handleOpenFullSearch(query)}
                className="text-xs font-sans font-bold text-astera-800 hover:text-astera-900 underline cursor-pointer"
              >
                Otvori s filterima i sortiranjem →
              </button>
            </div>

            {displayedResults.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {displayedResults.map((scored) => {
                  const item = scored.product;
                  const basePrice =
                    item.basePrice ??
                    item.price?.gold_14k ??
                    item.price?.sterling_silver ??
                    0;
                  return (
                    <Link
                      href={`/shop/${item.id}`}
                      key={item.id}
                      onClick={() => {
                        recordProductClick(
                          item.id,
                          item.name,
                          query,
                          searchResponse.correctedQuery
                        );
                        onClose();
                      }}
                      className="group bg-white rounded-2xl border border-astera-200 p-3 hover:shadow-lg transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative aspect-square bg-warm-beige rounded-xl mb-2.5 overflow-hidden">
                          <Image
                            src={
                              item.images?.[0] || "/images/astera-showcase.jpg"
                            }
                            alt={item.name}
                            fill
                            sizes="200px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <p className="text-[10px] font-sans font-bold uppercase text-astera-600 truncate">
                          <HighlightedText
                            text={item.brand || "Astera"}
                            highlightTerms={scored.highlightTerms}
                          />
                        </p>
                        <p className="text-xs font-serif font-semibold text-astera-900 line-clamp-1 group-hover:text-astera-600 transition-colors">
                          <HighlightedText
                            text={item.name}
                            highlightTerms={scored.highlightTerms}
                          />
                        </p>
                      </div>

                      <div className="mt-2 pt-1.5 border-t border-astera-100">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-serif font-bold text-astera-900">
                            {formatEUR(basePrice)}
                          </span>
                          <span className="text-[10px] text-amber-600 font-bold">
                            ★ {(item.rating || 4.8).toFixed(1)}
                          </span>
                        </div>
                        {effectiveDeveloperMode && (
                          <div className="mt-1.5 p-1.5 rounded bg-obsidian text-emerald-300 font-mono text-[9px] leading-tight">
                            <div className="font-bold text-amber-300">
                              Score: {scored.score.toFixed(1)} pts
                            </div>
                            <div className="truncate text-stone-300">
                              {scored.reasons[0]?.explanation}
                            </div>
                          </div>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-dashed border-astera-300 p-8 text-center space-y-3">
                <p className="font-serif text-lg text-astera-900">
                  Nema pronađenih rezultata za &ldquo;{deferredQuery}&rdquo;
                </p>
                <p className="text-xs text-charcoal/60">
                  Pokušajte s nekim od predloženih pretraživanja:
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {searchResponse.suggestedAlternatives.map((alt) => (
                    <button
                      key={alt}
                      type="button"
                      onClick={() => setQuery(alt)}
                      className="px-3 py-1.5 rounded-full bg-warm-beige hover:bg-astera-900 hover:text-white text-xs font-sans font-semibold text-astera-900 cursor-pointer transition-colors"
                    >
                      {alt}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
