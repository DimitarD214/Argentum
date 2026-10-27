"use client";
import React, { useState, useMemo, useEffect, useRef, useDeferredValue } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { formatEUR } from "@/lib/pricing";
import ProductCard from "@/components/shop/ProductCard";
import FilterDrawer from "@/components/shop/FilterDrawer";
import {
  executeIntelligentSearch,
  runCatalogScaleBenchmark,
  SearchableProduct,
  SortOption,
} from "@/lib/searchEngine";
import { useSearchAnalyticsStore } from "@/store/searchAnalyticsStore";
import { useOwnerAccess } from "@/hooks/useOwnerAccess";

const translateMap: Record<string, string> = {
  All: "Sve kategorije",
  Earrings: "Naušnice",
  Rings: "Prstenje",
  Necklaces: "Ogrlice",
  Bracelets: "Narukvice",
  Tradicijski: "Tradicijski nakit",
  Klasično: "Astera Klasici",
  Cvijeće: "Cvjetni Filigran",
  "14k Zlato": "14k Zlato",
  "Prirodni Biser": "Prirodni Biser",
  "Kameja Koralj": "Kameja & Koralj",
  "Crveni Koralj": "Crveni Koralj",
  "Sterling Silver": "Srebro 925",
  "14k Gold": "14k Zlato",
};

const t = (val: string) => translateMap[val] || val;

const JEWELRY_QUICK_SEARCHES = [
  { label: "zlatni prsten kameja" },
  { label: "splitske košarice" },
  { label: "šibenski botun" },
  { label: "paške peružine" },
  { label: "dubrovačke naušnice koralj" },
  { label: "astera safir ogrlica" },
];

export default function ProductGrid({
  initialProducts,
  defaultMaterial = "All",
  defaultTheme = "All",
  defaultLineScope = "all",
  initialQuery = "",
  compactHeader = false,
}: {
  initialProducts: SearchableProduct[];
  defaultMaterial?: string;
  defaultTheme?: string;
  defaultLineScope?: "all" | "astera-nakit" | "tradicijski-nakit";
  initialQuery?: string;
  compactHeader?: boolean;
}) {
  const [query, setQuery] = useState(() => {
    if (initialQuery) return initialQuery;
    if (typeof window !== "undefined") {
      const qParam = new URLSearchParams(window.location.search).get("q");
      if (qParam) return qParam;
    }
    return "";
  });
  const deferredQuery = useDeferredValue(query);
  const [isAutocompleteOpen, setIsAutocompleteOpen] = useState(false);
  const [highlightedSuggestionIdx, setHighlightedSuggestionIdx] = useState(-1);
  const [activeTab, setActiveTab] = useState<"search" | "analytics">("search");

  const [lineScope, setLineScope] = useState<
    "all" | "astera-nakit" | "tradicijski-nakit"
  >(defaultLineScope);
  const [selectedCategory, setSelectedCategory] = useState(defaultTheme);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(1100);
  const [minRating, setMinRating] = useState<number>(0);
  const [filterMaterial, setFilterMaterial] = useState(defaultMaterial);
  const [filterColor, setFilterColor] = useState("All");
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [benchmarkResult, setBenchmarkResult] = useState<{
    catalogSize: number;
    indexBuildTimeMs: number;
    searchExecutionTimeMs: number;
    matchedCount: number;
  } | null>(null);

  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Strict Owner Access Check (ONLY dimitar.dimitrov1112@gmail.com)
  const {
    isOwner,
    userEmail,
    adminViewMode,
    setAdminViewMode,
    showDevControls,
    effectiveDeveloperMode,
    developerMode,
    toggleDeveloperMode,
  } = useOwnerAccess();

  const effectiveTab = showDevControls ? activeTab : "search";

  const {
    recentSearches,
    globalProductClicks,
    queryProductClicks,
    popularSearchesLog,
    zeroResultSearchesLog,
    recordSearchQuery,
    recordProductClick,
    clearRecentSearches,
    removeRecentSearch,
    resetAnalyticsDemoData,
  } = useSearchAnalyticsStore();

  // Close autocomplete dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setIsAutocompleteOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Execute custom ranking & search engine using deferredQuery to keep input typing lag-free
  const searchResponse = useMemo(() => {
    return executeIntelligentSearch(
      initialProducts,
      deferredQuery,
      {
        category: selectedCategory,
        brands: selectedBrands,
        minPrice: 0,
        maxPrice,
        minRating,
        material: filterMaterial,
        color: filterColor,
        lineScope,
      },
      sortBy,
      {
        globalProductClicks,
        queryProductClicks,
      }
    );
  }, [
    initialProducts,
    deferredQuery,
    selectedCategory,
    selectedBrands,
    maxPrice,
    minRating,
    filterMaterial,
    filterColor,
    lineScope,
    sortBy,
    globalProductClicks,
    queryProductClicks,
  ]);

  // Debounced logging of typed queries
  useEffect(() => {
    const trimmed = deferredQuery.trim();
    if (trimmed.length < 3) return;
    const timer = setTimeout(() => {
      recordSearchQuery(
        trimmed,
        searchResponse.results.length,
        searchResponse.suggestedAlternatives[0]
      );
    }, 900);
    return () => clearTimeout(timer);
  }, [
    deferredQuery,
    searchResponse.results.length,
    searchResponse.suggestedAlternatives,
    recordSearchQuery,
  ]);

  const categoryFacetCounts = useMemo(() => {
    const counts: Record<string, number> = { All: initialProducts.length };
    for (const p of initialProducts) {
      const cat = p.category || "Other";
      counts[cat] = (counts[cat] || 0) + 1;
    }
    return counts;
  }, [initialProducts]);

  const brandFacetCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of initialProducts) {
      const b = p.brand || "Astera Atelier";
      counts[b] = (counts[b] || 0) + 1;
    }
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [initialProducts]);

  const allCategories = useMemo(() => {
    const ordered = [
      "All",
      "Earrings",
      "Rings",
      "Necklaces",
      "Bracelets",
    ];
    return ordered.filter((c) => c === "All" || (categoryFacetCounts[c] || 0) > 0);
  }, [categoryFacetCounts]);

  const toggleBrandFilter = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const resetAllFilters = () => {
    setLineScope(defaultLineScope);
    setSelectedCategory("All");
    setSelectedBrands([]);
    setMaxPrice(1100);
    setMinRating(0);
    setFilterMaterial("All");
    setFilterColor("All");
    setSortBy("relevance");
  };

  const applySearchSuggestion = (suggestionText: string) => {
    setQuery(suggestionText);
    setIsAutocompleteOpen(false);
    setHighlightedSuggestionIdx(-1);
    setActiveTab("search");
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const suggestions = searchResponse.autocompleteSuggestions;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIsAutocompleteOpen(true);
      setHighlightedSuggestionIdx((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedSuggestionIdx((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (
        isAutocompleteOpen &&
        highlightedSuggestionIdx >= 0 &&
        suggestions[highlightedSuggestionIdx]
      ) {
        applySearchSuggestion(suggestions[highlightedSuggestionIdx].text);
      } else {
        setIsAutocompleteOpen(false);
        if (query.trim().length >= 2) {
          recordSearchQuery(
            query.trim(),
            searchResponse.results.length,
            searchResponse.suggestedAlternatives[0]
          );
        }
      }
    } else if (e.key === "Escape") {
      setIsAutocompleteOpen(false);
    }
  };

  const handleProductClick = (product: SearchableProduct) => {
    recordProductClick(
      product.id,
      product.name,
      query,
      searchResponse.correctedQuery
    );
  };

  const handleRunScaleBenchmark = (targetSize: number) => {
    const res = runCatalogScaleBenchmark(
      initialProducts,
      targetSize,
      query.trim() || "zlatni prsten kameja"
    );
    setBenchmarkResult(res);
  };

  const popularSearchesArray = useMemo(() => {
    return Object.values(popularSearchesLog).sort((a, b) => b.count - a.count);
  }, [popularSearchesLog]);

  const zeroResultSearchesArray = useMemo(() => {
    return Object.values(zeroResultSearchesLog).sort(
      (a, b) => b.count - a.count
    );
  }, [zeroResultSearchesLog]);

  return (
    <div className="space-y-6">
      {/* ==================== EXCLUSIVE OWNER / ADMIN BAR (ONLY FOR dimitar.dimitrov1112@gmail.com) ==================== */}
      {isOwner && (
        <div className="rounded-2xl bg-obsidian text-white px-4 py-3 border border-amber-400/40 shadow-lg flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-bold text-amber-300">
              Admin Pristup ({userEmail})
            </span>
            <span className="hidden md:inline-block text-[11px] font-sans text-stone-400">
              • Prebacite između normalnog prikaza za kupce i Dev/Analitičkog prikaza
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Switch between Normal Customer Shop vs Dev & Analytics View */}
            <div className="inline-flex rounded-xl bg-white/10 p-1 border border-white/15">
              <button
                type="button"
                onClick={() => {
                  setAdminViewMode("customer");
                  setActiveTab("search");
                }}
                className={`px-3 py-1 rounded-lg text-[11px] font-sans font-bold transition-all cursor-pointer ${
                  adminViewMode === "customer"
                    ? "bg-white text-obsidian shadow-xs"
                    : "text-stone-300 hover:text-white"
                }`}
              >
                🛍️ Normalna Trgovina (Kupac)
              </button>
              <button
                type="button"
                onClick={() => setAdminViewMode("dev")}
                className={`px-3 py-1 rounded-lg text-[11px] font-sans font-bold transition-all cursor-pointer ${
                  adminViewMode === "dev"
                    ? "bg-amber-400 text-obsidian shadow-xs"
                    : "text-stone-300 hover:text-white"
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
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-mono font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                    developerMode
                      ? "bg-emerald-500 text-obsidian border-emerald-300"
                      : "bg-black/50 text-stone-300 border-white/20 hover:border-white/40"
                  }`}
                >
                  {developerMode ? "● DEV MODE ON" : "○ DEV MODE OFF"}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setActiveTab(
                      effectiveTab === "analytics" ? "search" : "analytics"
                    )
                  }
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-sans font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                    effectiveTab === "analytics"
                      ? "bg-amber-400 text-obsidian border-amber-300"
                      : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                  }`}
                >
                  📊 Analitika ({zeroResultSearchesArray.length})
                </button>

                <Link
                  href="/search/analytics"
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[11px] font-sans font-semibold text-amber-200 transition-colors"
                >
                  Stranica Analitike ↗
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* ==================== LUXURY JEWELRY STORE SEARCH HEADER ==================== */}
      <div className="relative rounded-3xl bg-gradient-to-br from-astera-900 via-astera-800 to-obsidian text-white p-6 md:p-9 shadow-xl border border-astera-700/60 overflow-visible">
        {!compactHeader && (
          <div className="text-center max-w-2xl mx-auto mb-5">
            <p className="font-sans text-[10px] font-bold uppercase tracking-[0.35em] text-astera-300 mb-2">
              Katalog Nakita • {initialProducts.length} Unikatnih Komada
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal tracking-wider uppercase text-white mb-2">
              Astera &amp; Tradicijska Baština
            </h2>
            <p className="font-sans text-xs sm:text-sm text-astera-200/80">
              Pretražite 14-karatni zlatni nakit, splitske košarice, šibenske botune i paške peružine.
            </p>
          </div>
        )}

        {/* Instant Search Input + Autocomplete Dropdown */}
        <div ref={searchContainerRef} className="relative max-w-2xl mx-auto z-40">
          <div className="flex items-center bg-cream rounded-2xl p-1.5 pl-4 shadow-xl border border-astera-300 focus-within:border-amber-400 transition-all">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="w-5 h-5 text-astera-700 shrink-0 mr-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>

            <input
              type="text"
              value={query}
              onFocus={() => setIsAutocompleteOpen(true)}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsAutocompleteOpen(true);
                setHighlightedSuggestionIdx(-1);
                if (activeTab !== "search") setActiveTab("search");
              }}
              onKeyDown={handleSearchKeyDown}
              placeholder="Pretražite nakit (npr. zlatni prsten kameja, splitske košarice, šibenski botun)..."
              aria-label="Pretražite nakit"
              className="w-full bg-transparent text-astera-900 placeholder:text-charcoal/45 text-xs sm:text-sm font-sans py-2 outline-none"
            />

            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setIsAutocompleteOpen(false);
                }}
                aria-label="Očisti pretragu"
                className="p-2 text-charcoal/45 hover:text-astera-900 transition-colors cursor-pointer"
              >
                ✕
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                setIsAutocompleteOpen(false);
                if (query.trim().length >= 2) {
                  recordSearchQuery(
                    query.trim(),
                    searchResponse.results.length,
                    searchResponse.suggestedAlternatives[0]
                  );
                }
              }}
              className="px-5 py-2.5 bg-astera-900 hover:bg-astera-700 text-white font-sans text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer shrink-0"
            >
              Traži
            </button>
          </div>

          {/* Instant Autocomplete Dropdown */}
          <AnimatePresence>
            {isAutocompleteOpen &&
              searchResponse.autocompleteSuggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 right-0 top-full mt-2 bg-white text-charcoal rounded-2xl shadow-2xl border border-astera-200 overflow-hidden z-50"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-12">
                    <div className="sm:col-span-8 py-2 divide-y divide-astera-100/60">
                      {searchResponse.autocompleteSuggestions.map((sug, idx) => (
                        <button
                          key={sug.text}
                          type="button"
                          onMouseEnter={() => setHighlightedSuggestionIdx(idx)}
                          onClick={() => applySearchSuggestion(sug.text)}
                          className={`w-full px-4 py-2.5 text-left flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                            highlightedSuggestionIdx === idx
                              ? "bg-warm-beige"
                              : "hover:bg-warm-beige/60"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="text-astera-600 text-xs">✦</span>
                            <span className="text-xs sm:text-sm font-sans text-charcoal truncate">
                              {sug.matchedPrefix && (
                                <span className="text-charcoal/70">
                                  {sug.matchedPrefix}
                                </span>
                              )}
                              <strong className="font-bold text-astera-900">
                                {sug.boldRemainder}
                              </strong>
                            </span>
                          </div>
                          {sug.badge && (
                            <span className="text-[10px] font-sans font-semibold text-astera-600 shrink-0">
                              {sug.badge}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>

                    {searchResponse.topPreviewProduct && (
                      <div className="hidden sm:flex sm:col-span-4 bg-warm-beige/50 border-l border-astera-100 p-4 flex-col justify-between items-center text-center">
                        <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-astera-600">
                          Izdvojeni Rezultat
                        </span>
                        <Link
                          href={`/shop/${searchResponse.topPreviewProduct.id}`}
                          onClick={() => {
                            if (searchResponse.topPreviewProduct) {
                              handleProductClick(searchResponse.topPreviewProduct);
                            }
                            setIsAutocompleteOpen(false);
                          }}
                          className="group my-2 block"
                        >
                          <div className="relative w-24 h-20 mx-auto rounded-xl overflow-hidden bg-white border border-astera-200/80 mb-2">
                            <Image
                              src={
                                searchResponse.topPreviewProduct.images?.[0] ||
                                "/images/astera-showcase.jpg"
                              }
                              alt={searchResponse.topPreviewProduct.name}
                              fill
                              sizes="96px"
                              className="object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <p className="text-xs font-serif font-bold text-astera-900 line-clamp-1">
                            {searchResponse.topPreviewProduct.name}
                          </p>
                          <p className="text-[11px] font-sans font-bold text-astera-700 mt-0.5">
                            {formatEUR(
                              searchResponse.topPreviewProduct.basePrice ??
                                searchResponse.topPreviewProduct.price?.gold_14k ??
                                0
                            )}
                          </p>
                        </Link>
                        <button
                          type="button"
                          onClick={() => setIsAutocompleteOpen(false)}
                          className="text-[10px] font-sans text-charcoal/50 hover:text-charcoal"
                        >
                          Zatvori
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
          </AnimatePresence>
        </div>

        {/* Popular Jewelry Quick Pills */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="text-[11px] font-sans text-astera-200/75 mr-1">
            Popularno:
          </span>
          {JEWELRY_QUICK_SEARCHES.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => applySearchSuggestion(item.label)}
              className={`px-3 py-1 rounded-full text-[11px] font-sans transition-all cursor-pointer border ${
                query.toLowerCase() === item.label.toLowerCase()
                  ? "bg-astera-200 text-astera-900 border-astera-100 font-bold"
                  : "bg-white/10 hover:bg-white/20 text-white border-white/15"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* ==================== OWNER-ONLY DEVELOPER MODE INSPECTOR ==================== */}
      <AnimatePresence>
        {effectiveDeveloperMode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="rounded-2xl bg-obsidian text-stone-100 p-5 border-2 border-emerald-500/50 shadow-xl font-mono text-xs space-y-4 overflow-hidden"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-3">
              <div>
                <span className="text-emerald-400 font-bold uppercase tracking-wider">
                  🛠️ DEVELOPER MODE — RANKING &amp; QUERY PIPELINE INSPECTOR (SAMO ZA VLASNIKA)
                </span>
                <p className="text-[11px] text-stone-400 mt-0.5 font-sans">
                  Prikaz tokenizacije, adaptivne tolerancije na tipfelere (Damerau-Levenshtein), sinonima i bodovanja.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleRunScaleBenchmark(500)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-900/70 hover:bg-emerald-800 text-emerald-200 border border-emerald-600/50 text-[11px] cursor-pointer transition-colors"
                >
                  ⚡ Benchmark 500 Proizvoda
                </button>
                <button
                  type="button"
                  onClick={() => handleRunScaleBenchmark(2500)}
                  className="px-3 py-1.5 rounded-lg bg-indigo-900/70 hover:bg-indigo-800 text-indigo-200 border border-indigo-600/50 text-[11px] cursor-pointer transition-colors"
                >
                  🚀 Benchmark 2,500 Proizvoda
                </button>
                <button
                  type="button"
                  onClick={resetAnalyticsDemoData}
                  className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-600 text-[11px] cursor-pointer transition-colors"
                >
                  Resetiraj Klikove
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/5 rounded-xl p-3.5 border border-white/10">
                <p className="text-[10px] uppercase tracking-wider text-amber-300 font-bold mb-2">
                  1. Tokenizacija &amp; Adaptivna Tolerancija Tipfelera
                </p>
                {searchResponse.tokenAnalysis.length === 0 ? (
                  <p className="text-stone-400 text-[11px]">
                    Upišite upit u tražilicu za prikaz analize tokena...
                  </p>
                ) : (
                  <div className="space-y-1.5">
                    {searchResponse.tokenAnalysis.map((tok, i) => (
                      <div
                        key={i}
                        className="p-2 rounded bg-black/40 border border-white/10 text-[11px]"
                      >
                        <div className="flex items-center justify-between">
                          <span>
                            Token: <strong className="text-white">&ldquo;{tok.raw}&rdquo;</strong>{" "}
                            (len={tok.raw.length})
                          </span>
                          <span className="text-sky-300">
                            Max Typo Dist: {tok.maxEditDistance}
                          </span>
                        </div>
                        {tok.correctedTo && (
                          <div className="text-amber-300 mt-0.5">
                            ↳ Fuzzy Ispravak: &ldquo;{tok.correctedTo}&rdquo;
                          </div>
                        )}
                        {tok.synonyms.length > 0 && (
                          <div className="text-purple-300 mt-0.5 truncate">
                            ↳ Sinonimi: {tok.synonyms.slice(0, 5).join(", ")}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-white/5 rounded-xl p-3.5 border border-white/10">
                <p className="text-[10px] uppercase tracking-wider text-emerald-300 font-bold mb-2">
                  2. Formula Rangiranja &amp; Zaštita od Slabih Riječi
                </p>
                <ul className="space-y-1 text-[11px] text-stone-300">
                  <li>• Točna fraza: <strong className="text-white">+24 do +68 pts</strong></li>
                  <li>• Težine polja: <strong className="text-white">Ime ×1.65, Atelje ×1.5, Kat ×1.35, Oznake ×1.2</strong></li>
                  <li>• Više riječi (Coordination): <strong className="text-white">+42 pts × pokrivenost²</strong></li>
                  <li>• Filter slabih podudaranja: <strong className="text-emerald-300">Aktivan</strong></li>
                  <li>• Utjecaj klikova: <strong className="text-rose-300">+22×log₂(1+qKlik) + 6×log₂(1+klik)</strong></li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-xl p-3.5 border border-white/10">
                <p className="text-[10px] uppercase tracking-wider text-sky-300 font-bold mb-2">
                  3. Invertirani Indeks &amp; Brzina
                </p>
                <div className="space-y-1 text-[11px] text-stone-300">
                  <p>
                    Katalog:{" "}
                    <strong className="text-white">
                      {searchResponse.indexStats.totalProducts} proizvoda
                    </strong>
                  </p>
                  <p>
                    Vokabular:{" "}
                    <strong className="text-white">
                      {searchResponse.indexStats.uniqueVocabularyTerms} unikatnih riječi
                    </strong>
                  </p>
                  <p>
                    Brzina pretrage:{" "}
                    <strong className="text-emerald-400">
                      {searchResponse.executionTimeMs} ms
                    </strong>
                  </p>
                  {benchmarkResult && (
                    <div className="mt-2 p-2 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-200">
                      <p className="font-bold">
                        Test skale ({benchmarkResult.catalogSize.toLocaleString()} proizvoda):
                      </p>
                      <p>
                        Indeks: {benchmarkResult.indexBuildTimeMs} ms | Pretraga:{" "}
                        <strong>{benchmarkResult.searchExecutionTimeMs} ms</strong> ({benchmarkResult.matchedCount} rezultata)
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================== OWNER-ONLY ANALYTICS TAB VIEW ==================== */}
      {effectiveTab === "analytics" ? (
        <div className="bg-white rounded-3xl border border-astera-200 p-6 md:p-8 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-astera-200 pb-5">
            <div>
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-astera-600">
                Analitika Pretrage (Samo za vlasnika)
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-astera-900 mt-1">
                Popularne Pretrage, Upiti bez Rezultata &amp; Klikovi
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={resetAnalyticsDemoData}
                className="px-4 py-2 rounded-xl border border-astera-300 text-xs font-sans font-semibold text-astera-900 hover:bg-warm-beige cursor-pointer"
              >
                Resetiraj Podatke
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("search")}
                className="px-4 py-2 rounded-xl bg-astera-900 text-white text-xs font-sans font-semibold hover:bg-astera-800 cursor-pointer"
              >
                ← Povratak u Katalog
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-warm-beige/50 rounded-2xl p-5 border border-astera-200">
              <h4 className="font-serif text-lg font-semibold text-astera-900 mb-1">
                🔥 Najpopularnije Pretrage
              </h4>
              <p className="text-xs font-sans text-charcoal/60 mb-4">
                Kliknite na bilo koji upit za trenutnu pretragu.
              </p>
              <div className="space-y-2.5">
                {popularSearchesArray.map((item, idx) => (
                  <div
                    key={item.query}
                    onClick={() => applySearchSuggestion(item.query)}
                    className="flex items-center justify-between p-3 rounded-xl bg-white border border-astera-200/80 hover:border-astera-500 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-astera-900 text-white text-[11px] font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <div>
                        <p className="text-xs sm:text-sm font-sans font-bold text-astera-900">
                          &ldquo;{item.query}&rdquo;
                        </p>
                        <p className="text-[11px] text-charcoal/55">
                          {item.resultsCount} rezultata • {item.lastSearchedAt}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-100 text-astera-900 text-xs font-bold">
                        {item.count} pretraga
                      </span>
                      <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                        {item.clicks} klikova
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-rose-50/40 rounded-2xl p-5 border border-rose-200/80">
              <h4 className="font-serif text-lg font-semibold text-astera-900 mb-1">
                ⚠️ Pretrage bez Rezultata (0 Rezultata)
              </h4>
              <p className="text-xs font-sans text-charcoal/60 mb-4">
                Automatski detektirane pretrage koje nisu pronašle odgovarajući proizvod.
              </p>
              <div className="space-y-2.5">
                {zeroResultSearchesArray.map((item) => (
                  <div
                    key={item.query}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl bg-white border border-rose-200/80"
                  >
                    <div>
                      <p className="text-xs sm:text-sm font-sans font-bold text-rose-950">
                        &ldquo;{item.query}&rdquo;
                      </p>
                      <p className="text-[11px] text-charcoal/55">
                        Traženo {item.count}× • Zadnje: {item.lastSearchedAt}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => applySearchSuggestion(item.suggestedAlternative)}
                      className="px-3 py-1.5 rounded-lg bg-warm-beige hover:bg-astera-900 hover:text-white text-astera-900 text-[11px] font-sans font-semibold transition-colors cursor-pointer"
                    >
                      Prijedlog: &ldquo;{item.suggestedAlternative}&rdquo; →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ==================== MAIN JEWELRY SHOP LAYOUT ==================== */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* -------------------- LEFT SIDEBAR: FILTERS (3 COLS, DESKTOP ONLY) -------------------- */}
          <aside className="hidden lg:block lg:col-span-3 bg-white rounded-2xl border border-astera-200/90 p-5 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-astera-100 pb-3">
              <h3 className="font-serif text-lg font-bold text-astera-900">
                Filteri
              </h3>
              <button
                type="button"
                onClick={resetAllFilters}
                className="text-xs font-sans font-semibold text-astera-600 hover:text-astera-900 underline cursor-pointer"
              >
                Poništi sve
              </button>
            </div>

            {/* Linija Nakita */}
            <div>
              <h4 className="font-sans text-[11px] font-bold uppercase tracking-wider text-charcoal/60 mb-2.5">
                Kolekcija
              </h4>
              <div className="flex flex-col gap-1.5">
                {[
                  { id: "all", label: `Cijeli Katalog (${initialProducts.length})` },
                  { id: "astera-nakit", label: "Astera Nakit" },
                  { id: "tradicijski-nakit", label: "Tradicijski Nakit" },
                ].map((scope) => (
                  <button
                    key={scope.id}
                    type="button"
                    onClick={() =>
                      setLineScope(
                        scope.id as "all" | "astera-nakit" | "tradicijski-nakit"
                      )
                    }
                    className={`px-3 py-2 rounded-xl text-xs font-sans font-semibold text-left transition-all cursor-pointer border ${
                      lineScope === scope.id
                        ? "bg-astera-900 text-white border-astera-900"
                        : "bg-warm-beige/40 text-charcoal/80 border-astera-200/80 hover:border-astera-400"
                    }`}
                  >
                    {scope.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Kategorija */}
            <div>
              <h4 className="font-sans text-[11px] font-bold uppercase tracking-wider text-charcoal/60 mb-2.5">
                Kategorija
              </h4>
              <div className="space-y-1.5">
                {allCategories.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  const count = categoryFacetCounts[cat] || 0;
                  return (
                    <label
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className="flex items-center justify-between gap-2 py-1 px-2 rounded-lg hover:bg-warm-beige/50 cursor-pointer text-xs font-sans"
                    >
                      <span className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          className="accent-astera-900 rounded cursor-pointer"
                        />
                        <span
                          className={
                            isSelected
                              ? "font-bold text-astera-900"
                              : "text-charcoal/80"
                          }
                        >
                          {t(cat)}
                        </span>
                      </span>
                      <span className="text-[11px] text-charcoal/45">
                        ({count})
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Zlatarski Atelje / Brand */}
            <div>
              <h4 className="font-sans text-[11px] font-bold uppercase tracking-wider text-charcoal/60 mb-2.5">
                Atelje / Kolekcija
              </h4>
              <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                {brandFacetCounts.map(([brandName, count]) => {
                  const checked = selectedBrands.includes(brandName);
                  return (
                    <label
                      key={brandName}
                      onClick={() => toggleBrandFilter(brandName)}
                      className="flex items-center justify-between gap-2 py-1 px-2 rounded-lg hover:bg-warm-beige/50 cursor-pointer text-xs font-sans"
                    >
                      <span className="flex items-center gap-2 truncate">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => {}}
                          className="accent-astera-900 rounded cursor-pointer"
                        />
                        <span
                          className={
                            checked
                              ? "font-bold text-astera-900 truncate"
                              : "text-charcoal/80 truncate"
                          }
                        >
                          {brandName}
                        </span>
                      </span>
                      <span className="text-[11px] text-charcoal/45 shrink-0">
                        ({count})
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Raspon Cijene */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-sans text-[11px] font-bold uppercase tracking-wider text-charcoal/60">
                  Cijena
                </h4>
                <span className="text-xs font-sans font-bold text-astera-900">
                  Do {formatEUR(maxPrice)}
                </span>
              </div>
              <input
                type="range"
                min={150}
                max={1100}
                step={25}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-astera-900 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-sans text-charcoal/50 mt-1">
                <span>150 €</span>
                <span>500 €</span>
                <span>800 €</span>
                <span>1.100 €</span>
              </div>
            </div>

            {/* Ocjena */}
            <div>
              <h4 className="font-sans text-[11px] font-bold uppercase tracking-wider text-charcoal/60 mb-2.5">
                Ocjena kupaca
              </h4>
              <div className="space-y-1.5">
                {[
                  { min: 4.9, label: "4.9 ★ i više" },
                  { min: 4.8, label: "4.8 ★ i više" },
                  { min: 4.7, label: "4.7 ★ i više" },
                  { min: 0, label: "Sve ocjene" },
                ].map((r) => (
                  <label
                    key={r.min}
                    onClick={() => setMinRating(r.min)}
                    className="flex items-center gap-2 py-1 px-2 rounded-lg hover:bg-warm-beige/50 cursor-pointer text-xs font-sans"
                  >
                    <input
                      type="checkbox"
                      checked={minRating === r.min}
                      onChange={() => {}}
                      className="accent-astera-900 rounded cursor-pointer"
                    />
                    <span className="text-amber-500">★★★★★</span>
                    <span
                      className={
                        minRating === r.min
                          ? "font-bold text-astera-900"
                          : "text-charcoal/75"
                      }
                    >
                      {r.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Nedavne pretrage u bočnoj traci */}
            {recentSearches.length > 0 && (
              <div className="pt-4 border-t border-astera-100">
                <div className="flex items-center justify-between mb-2.5">
                  <h4 className="font-sans text-[11px] font-bold uppercase tracking-wider text-charcoal/60">
                    Nedavne pretrage
                  </h4>
                  <button
                    type="button"
                    onClick={clearRecentSearches}
                    className="text-[11px] font-sans text-charcoal/45 hover:text-astera-900 cursor-pointer"
                  >
                    Očisti
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {recentSearches.slice(0, 5).map((rec) => (
                    <div
                      key={rec}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-warm-beige border border-astera-200 text-[11px] font-sans text-astera-900"
                    >
                      <button
                        type="button"
                        onClick={() => applySearchSuggestion(rec)}
                        className="hover:underline cursor-pointer"
                      >
                        {rec}
                      </button>
                      <button
                        type="button"
                        onClick={() => removeRecentSearch(rec)}
                        className="text-charcoal/40 hover:text-rose-700 ml-0.5 cursor-pointer"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>

          {/* -------------------- MAIN RESULTS AREA (9 COLS) -------------------- */}
          <div className="lg:col-span-9 space-y-5">
            {/* Results Header Bar */}
            <div className="bg-white rounded-2xl border border-astera-200/90 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
              <div>
                <h3 className="font-sans text-sm sm:text-base text-charcoal">
                  Prikazano{" "}
                  <strong className="font-bold text-astera-900">
                    {searchResponse.results.length}
                  </strong>{" "}
                  proizvoda
                  {deferredQuery.trim() ? (
                    <>
                      {" "}
                      za{" "}
                      <span className="font-bold text-astera-700">
                        &ldquo;
                        {searchResponse.correctedQuery || deferredQuery.trim()}
                        &rdquo;
                      </span>
                    </>
                  ) : null}
                </h3>

                {/* Fuzzy Typo Correction Notice */}
                {searchResponse.correctedQuery &&
                  searchResponse.correctedQuery !==
                    searchResponse.normalizedQuery && (
                    <p className="text-xs font-sans text-charcoal/65 mt-0.5">
                      Automatski ispravljeno iz{" "}
                      <span className="line-through text-rose-700">
                        &ldquo;{deferredQuery.trim()}&rdquo;
                      </span>{" "}
                      →{" "}
                      <button
                        type="button"
                        onClick={() =>
                          applySearchSuggestion(searchResponse.correctedQuery!)
                        }
                        className="font-bold text-astera-800 underline cursor-pointer"
                      >
                        &ldquo;{searchResponse.correctedQuery}&rdquo;
                      </button>
                    </p>
                  )}

                {/* Synonym Expansion Notice (Owner Dev View Only) */}
                {effectiveDeveloperMode &&
                  searchResponse.usedSynonymExpansion.length > 0 && (
                    <p className="text-[11px] font-sans text-purple-800 mt-0.5">
                      ✦ Aktivni sinonimi:{" "}
                      {searchResponse.usedSynonymExpansion
                        .map(
                          (s) =>
                            `"${s.from}" ↔ ${s.to.slice(0, 3).join(", ")}`
                        )
                        .join(" | ")}
                    </p>
                  )}
              </div>

              {/* Mobile Filter Button + Sort Dropdown */}
              <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsFilterOpen(true)}
                  className="lg:hidden inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-astera-900 text-white text-xs font-sans font-bold uppercase tracking-wider cursor-pointer"
                >
                  <span>Filteri</span>
                </button>
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="sort-select"
                    className="text-xs font-sans text-charcoal/60 hidden sm:inline"
                  >
                    Poredaj po:
                  </label>
                  <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="bg-warm-beige/60 border border-astera-200 rounded-xl px-3 py-1.5 text-xs font-sans font-semibold text-astera-900 outline-none cursor-pointer"
                  >
                    <option value="relevance">Relevantnost</option>
                    <option value="price-asc">Cijena: Niska prema visokoj</option>
                    <option value="price-desc">Cijena: Visoka prema niskoj</option>
                    <option value="rating-desc">Najbolje ocijenjeno</option>
                    <option value="popular">Najpopularnije</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Product Cards Grid */}
            {searchResponse.results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {searchResponse.results.map((scoredItem, i) => (
                  <ProductCard
                    key={scoredItem.product.id}
                    product={scoredItem.product}
                    index={i}
                    t={t}
                    score={scoredItem.score}
                    reasons={scoredItem.reasons}
                    highlightTerms={scoredItem.highlightTerms}
                    developerMode={effectiveDeveloperMode}
                    clickCount={scoredItem.clickCount}
                    queryClickCount={scoredItem.queryClickCount}
                    onProductClick={handleProductClick}
                    onSimulateClickBoost={
                      effectiveDeveloperMode ? handleProductClick : undefined
                    }
                  />
                ))}
              </div>
            ) : (
              /* Zero Useful Results Detected State */
              <div className="bg-white rounded-3xl border border-dashed border-astera-300 p-8 md:p-12 text-center space-y-5">
                <div className="text-2xl text-astera-600">✦</div>
                <div>
                  <h4 className="font-serif text-xl md:text-2xl text-astera-900 mb-2">
                    Nismo pronašli rezultate za &ldquo;{deferredQuery}&rdquo;
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-charcoal/65 max-w-md mx-auto leading-relaxed">
                    Pokušajte s drugačijim nazivom ili odaberite jednu od predloženih pretraga iz naše kolekcije nakita:
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  {searchResponse.suggestedAlternatives.map((alt) => (
                    <button
                      key={alt}
                      type="button"
                      onClick={() => applySearchSuggestion(alt)}
                      className="px-4 py-2 rounded-full bg-warm-beige hover:bg-astera-900 hover:text-white text-astera-900 border border-astera-300 text-xs font-sans font-bold transition-all cursor-pointer"
                    >
                      {alt}
                    </button>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      resetAllFilters();
                    }}
                    className="text-xs font-sans font-bold uppercase tracking-wider text-astera-700 underline cursor-pointer"
                  >
                    Poništi pretragu i sve filtere
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filterTheme={selectedCategory}
        setFilterTheme={setSelectedCategory}
        filterColor={filterColor}
        setFilterColor={setFilterColor}
        filterMaterial={filterMaterial}
        setFilterMaterial={setFilterMaterial}
        filterPrice="All"
        setFilterPrice={() => {}}
        resetAllFilters={resetAllFilters}
        t={t}
        themes={allCategories}
        colors={["All", "14k Zlato", "Prirodni Biser", "Kameja Koralj", "Crveni Koralj"]}
        materials={["All", "14k Gold", "Sterling Silver"]}
        prices={["All"]}
      />
    </div>
  );
}
