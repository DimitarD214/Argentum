"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import products from "@/data/products.json";
import {
  OWNER_ADMIN_EMAIL,
  useSearchAnalyticsStore,
} from "@/store/searchAnalyticsStore";
import { useOwnerAccess } from "@/hooks/useOwnerAccess";
import {
  runCatalogScaleBenchmark,
  SearchableProduct,
} from "@/lib/searchEngine";

export default function SearchAnalyticsPage() {
  const {
    popularSearchesLog,
    zeroResultSearchesLog,
    globalProductClicks,
    developerMode,
    toggleDeveloperMode,
    resetAnalyticsDemoData,
  } = useSearchAnalyticsStore();

  const {
    authLoaded,
    isOwner,
    userEmail,
    adminViewMode,
    setAdminViewMode,
  } = useOwnerAccess();

  const [benchResult, setBenchResult] = useState<{
    catalogSize: number;
    indexBuildTimeMs: number;
    searchExecutionTimeMs: number;
    matchedCount: number;
  } | null>(null);

  const popularSearches = useMemo(
    () =>
      Object.values(popularSearchesLog).sort((a, b) => b.count - a.count),
    [popularSearchesLog]
  );

  const zeroResultSearches = useMemo(
    () =>
      Object.values(zeroResultSearchesLog).sort((a, b) => b.count - a.count),
    [zeroResultSearchesLog]
  );

  const topClickedProducts = useMemo(() => {
    const prodMap = new Map(
      (products as SearchableProduct[]).map((p) => [p.id, p])
    );
    return Object.entries(globalProductClicks)
      .map(([id, clicks]) => ({
        id,
        clicks,
        product: prodMap.get(id),
        scoreBoost: Number((6 * Math.log2(1 + clicks)).toFixed(1)),
      }))
      .filter((item) => item.product)
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 8);
  }, [globalProductClicks]);

  const totalSearchesCount = useMemo(
    () =>
      popularSearches.reduce((acc, s) => acc + s.count, 0) +
      zeroResultSearches.reduce((acc, s) => acc + s.count, 0),
    [popularSearches, zeroResultSearches]
  );

  const totalClicksCount = useMemo(
    () =>
      Object.values(globalProductClicks).reduce((acc, c) => acc + c, 0),
    [globalProductClicks]
  );

  const handleBenchmark = (size: number) => {
    const res = runCatalogScaleBenchmark(
      products as SearchableProduct[],
      size,
      "zlatni prsten kameja"
    );
    setBenchResult(res);
  };

  if (!authLoaded) {
    return (
      <div className="bg-cream min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-36 pb-20 px-4 flex items-center justify-center">
          <p className="font-serif text-lg text-astera-900">
            Provjera pristupa...
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!isOwner) {
    return (
      <div className="bg-cream min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-36 pb-20 px-4 flex items-center justify-center">
          <div className="max-w-lg w-full bg-white rounded-3xl border border-astera-200 p-8 text-center shadow-sm space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-sans font-bold uppercase tracking-wider">
              Pristup ograničen
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl text-astera-900">
              Samo za vlasnika trgovine
            </h1>
            <p className="font-sans text-xs sm:text-sm text-charcoal/70 leading-relaxed">
              Developer Mode i Analitika pretraživanja dostupni su isključivo za račun{" "}
              <strong className="text-astera-900">{OWNER_ADMIN_EMAIL}</strong>.
              {userEmail ? (
                <> Trenutno ste prijavljeni kao <strong>{userEmail}</strong>.</>
              ) : (
                <> Trenutno niste prijavljeni.</>
              )}
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Link
                href="/shop"
                className="px-5 py-2.5 rounded-full bg-astera-900 text-white text-xs font-sans font-bold uppercase tracking-wider hover:bg-astera-800 transition-colors"
              >
                ← Povratak u trgovinu
              </Link>
              <Link
                href="/login"
                className="px-5 py-2.5 rounded-full bg-warm-beige border border-astera-300 text-astera-900 text-xs font-sans font-bold uppercase tracking-wider hover:bg-astera-200 transition-colors"
              >
                Prijava vlasnika
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-cream min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 lg:pt-36 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="bg-obsidian text-white rounded-3xl p-6 md:p-10 border border-astera-700/60 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-mono font-bold uppercase tracking-wider mb-3">
                Owner Exclusive • {OWNER_ADMIN_EMAIL}
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white">
                Search Analytics &amp; Ranking Telemetry
              </h1>
              <p className="font-sans text-xs sm:text-sm text-astera-200/80 mt-1 max-w-2xl">
                Uvid u najpopularnije pretrage nakita, pretrage bez rezultata, klikove kupaca koji podižu rangiranje te brzinu indeksa.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {/* View Switcher */}
              <div className="inline-flex rounded-xl bg-white/10 p-1 border border-white/15">
                <button
                  type="button"
                  onClick={() => setAdminViewMode("customer")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-sans font-bold transition-all cursor-pointer ${
                    adminViewMode === "customer"
                      ? "bg-amber-400 text-obsidian shadow"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  🛍️ Normalna Trgovina
                </button>
                <button
                  type="button"
                  onClick={() => setAdminViewMode("dev")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-sans font-bold transition-all cursor-pointer ${
                    adminViewMode === "dev"
                      ? "bg-emerald-400 text-obsidian shadow"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  🛠️ Dev &amp; Analitika
                </button>
              </div>

              <button
                type="button"
                onClick={toggleDeveloperMode}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase border cursor-pointer transition-all ${
                  developerMode
                    ? "bg-emerald-500 text-obsidian border-emerald-300"
                    : "bg-white/10 text-white border-white/20"
                }`}
              >
                {developerMode ? "● DEV MODE ON" : "○ DEV MODE"}
              </button>
              <button
                type="button"
                onClick={resetAnalyticsDemoData}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-sans font-semibold cursor-pointer transition-colors"
              >
                Resetiraj podatke
              </button>
              <Link
                href="/shop"
                className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-obsidian text-xs font-sans font-bold uppercase tracking-wider transition-colors"
              >
                ← Natrag u trgovinu
              </Link>
            </div>
          </div>

          {/* KPI Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl border border-astera-200 p-5 shadow-xs">
              <p className="text-[11px] font-sans font-bold uppercase tracking-wider text-charcoal/55">
                Indeksirani katalog nakita
              </p>
              <p className="font-serif text-2xl md:text-3xl font-bold text-astera-900 mt-1">
                {(products as unknown[]).length} artikala
              </p>
              <p className="text-[11px] text-emerald-700 font-semibold mt-1">
                5 polja + sinonimi indeksirani
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-astera-200 p-5 shadow-xs">
              <p className="text-[11px] font-sans font-bold uppercase tracking-wider text-charcoal/55">
                Ukupno pretraživanja
              </p>
              <p className="font-serif text-2xl md:text-3xl font-bold text-astera-900 mt-1">
                {totalSearchesCount.toLocaleString()}
              </p>
              <p className="text-[11px] text-charcoal/60 mt-1">
                {popularSearches.length} aktivnih upita
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-astera-200 p-5 shadow-xs">
              <p className="text-[11px] font-sans font-bold uppercase tracking-wider text-charcoal/55">
                Upiti bez rezultata
              </p>
              <p className="font-serif text-2xl md:text-3xl font-bold text-rose-700 mt-1">
                {zeroResultSearches.length} upita
              </p>
              <p className="text-[11px] text-rose-700/80 mt-1">
                Automatski prijedlozi aktivni
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-astera-200 p-5 shadow-xs">
              <p className="text-[11px] font-sans font-bold uppercase tracking-wider text-charcoal/55">
                Zabilježeni klikovi kupaca
              </p>
              <p className="font-serif text-2xl md:text-3xl font-bold text-emerald-700 mt-1">
                {totalClicksCount.toLocaleString()} klikova
              </p>
              <p className="text-[11px] text-charcoal/60 mt-1">
                Aktivno podižu rangiranje
              </p>
            </div>
          </div>

          {/* Main 2-Column Tables: Popular Searches & Zero-Result Searches */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Popular Searches */}
            <div className="bg-white rounded-2xl border border-astera-200 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-astera-100">
                <div>
                  <h2 className="font-serif text-xl font-bold text-astera-900">
                    🔥 Najpopularnije pretrage
                  </h2>
                  <p className="text-xs font-sans text-charcoal/60">
                    Najčešći upiti kupaca poredani po broju pretraživanja i CTR klikovima
                  </p>
                </div>
              </div>

              <div className="space-y-2.5">
                {popularSearches.map((item, idx) => {
                  const ctr =
                    item.count > 0
                      ? Math.min(100, Math.round((item.clicks / item.count) * 100))
                      : 0;
                  return (
                    <div
                      key={item.query}
                      className="flex items-center justify-between p-3 rounded-xl bg-warm-beige/40 border border-astera-200/70 hover:border-astera-400 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-astera-900 text-white text-[11px] font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <div>
                          <Link
                            href={`/shop?q=${encodeURIComponent(item.query)}`}
                            className="text-xs sm:text-sm font-sans font-bold text-astera-900 hover:underline"
                          >
                            &ldquo;{item.query}&rdquo;
                          </Link>
                          <p className="text-[11px] text-charcoal/55">
                            {item.resultsCount} pronađenih artikala • Zadnje:{" "}
                            {item.lastSearchedAt}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-100 text-astera-900 text-xs font-bold">
                          {item.count} pretraga
                        </span>
                        <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                          {item.clicks} klikova ({ctr}% CTR)
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Zero-Result Searches */}
            <div className="bg-white rounded-2xl border border-rose-200 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-rose-100">
                <div>
                  <h2 className="font-serif text-xl font-bold text-astera-900">
                    ⚠️ Pretrage bez rezultata
                  </h2>
                  <p className="text-xs font-sans text-charcoal/60">
                    Upiti koji su vratili 0 rezultata uz automatski ponuđene alternative
                  </p>
                </div>
              </div>

              <div className="space-y-2.5">
                {zeroResultSearches.map((item) => (
                  <div
                    key={item.query}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-rose-50/40 border border-rose-200/80"
                  >
                    <div>
                      <p className="text-xs sm:text-sm font-sans font-bold text-rose-950">
                        &ldquo;{item.query}&rdquo;
                      </p>
                      <p className="text-[11px] text-charcoal/60">
                        Pretraženo {item.count}× • Zadnje: {item.lastSearchedAt}
                      </p>
                    </div>
                    <Link
                      href={`/shop?q=${encodeURIComponent(
                        item.suggestedAlternative
                      )}`}
                      className="px-3 py-1.5 rounded-lg bg-white hover:bg-astera-900 hover:text-white text-astera-900 border border-astera-300 text-[11px] font-sans font-semibold transition-colors shrink-0"
                    >
                      Prijedlog: &ldquo;{item.suggestedAlternative}&rdquo; →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Click-Driven Ranking Boosts & Scale Benchmark */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-white rounded-2xl border border-astera-200 p-6 shadow-xs">
              <h2 className="font-serif text-xl font-bold text-astera-900 mb-1">
                🎯 Najklikaniji nakit i bonus bodovi rangiranja
              </h2>
              <p className="text-xs font-sans text-charcoal/60 mb-4">
                Prikaz kako klikovi kupaca izravno podižu relevantnost artikla u budućim pretragama.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {topClickedProducts.map((item) => (
                  <Link
                    key={item.id}
                    href={`/shop/${item.id}`}
                    className="p-3 rounded-xl bg-warm-beige/40 border border-astera-200/80 hover:border-astera-500 flex items-center justify-between gap-3 transition-all"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-serif font-bold text-astera-900 truncate">
                        {item.product?.name}
                      </p>
                      <p className="text-[11px] text-charcoal/60">
                        {item.product?.brand} • {item.clicks} klikova
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-900 text-emerald-200 font-mono text-[11px] font-bold shrink-0">
                      +{item.scoreBoost} pts
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-obsidian text-white rounded-2xl border border-astera-700 p-6 shadow-xs flex flex-col justify-between">
              <div>
                <h2 className="font-serif text-xl font-bold text-white mb-1">
                  ⚡ Benchmark brzine indeksa
                </h2>
                <p className="text-xs font-sans text-stone-300 mb-4 leading-relaxed">
                  Provjerite brzinu pretraživanja pomoću našeg Inverted Indexa + Prefix Mapa dok katalog raste na tisuće artikala.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {[100, 500, 2500, 5000].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleBenchmark(size)}
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-amber-400 hover:text-obsidian text-xs font-mono font-bold transition-colors cursor-pointer"
                    >
                      Testiraj {size.toLocaleString()} artikala
                    </button>
                  ))}
                </div>
              </div>

              {benchResult ? (
                <div className="p-4 rounded-xl bg-emerald-950/90 border border-emerald-500/40 font-mono text-xs space-y-1">
                  <p className="text-emerald-300 font-bold">
                    ✓ Benchmark završen ({benchResult.catalogSize.toLocaleString()} artikala)
                  </p>
                  <p className="text-stone-200">
                    Izgradnja indeksa: <strong>{benchResult.indexBuildTimeMs} ms</strong>
                  </p>
                  <p className="text-stone-200">
                    Upit &ldquo;zlatni prsten kameja&rdquo;:{" "}
                    <strong className="text-amber-300">
                      {benchResult.searchExecutionTimeMs} ms
                    </strong>
                  </p>
                  <p className="text-stone-300">
                    Pronađeno rezultata: {benchResult.matchedCount}
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 font-mono text-xs text-stone-400">
                  Kliknite na veličinu kataloga iznad za mjerenje brzine u stvarnom vremenu.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
