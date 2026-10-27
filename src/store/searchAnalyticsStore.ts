"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { consentStorage } from "@/lib/consentStorage";
import { normalizeText } from "@/lib/searchEngine";

export const OWNER_ADMIN_EMAIL = "dimitar.dimitrov1112@gmail.com";

export interface PopularSearchEntry {
  query: string;
  count: number;
  resultsCount: number;
  clicks: number;
  lastSearchedAt: string;
}

export interface ZeroResultSearchEntry {
  query: string;
  count: number;
  lastSearchedAt: string;
  suggestedAlternative: string;
}

export interface ClickEventRecord {
  id: string;
  productId: string;
  productName: string;
  query: string;
  timestamp: string;
}

interface SearchAnalyticsState {
  recentSearches: string[];
  globalProductClicks: Record<string, number>;
  queryProductClicks: Record<string, Record<string, number>>;
  popularSearchesLog: Record<string, PopularSearchEntry>;
  zeroResultSearchesLog: Record<string, ZeroResultSearchEntry>;
  clickHistory: ClickEventRecord[];
  developerMode: boolean;
  adminViewMode: "dev" | "customer";

  setDeveloperMode: (enabled: boolean) => void;
  toggleDeveloperMode: () => void;
  setAdminViewMode: (mode: "dev" | "customer") => void;
  recordSearchQuery: (
    rawQuery: string,
    resultsCount: number,
    suggestedAlternative?: string
  ) => void;
  recordProductClick: (
    productId: string,
    productName: string,
    activeQuery: string,
    correctedQuery?: string | null
  ) => void;
  clearRecentSearches: () => void;
  removeRecentSearch: (query: string) => void;
  resetAnalyticsDemoData: () => void;
}

const INITIAL_RECENT_SEARCHES = [
  "zlatni prsten kameja",
  "splitske košarice",
  "šibenski botun",
  "paške peružine biseri",
  "dubrovačke naušnice koralj",
  "astera safir ogrlica",
];

const INITIAL_GLOBAL_CLICKS: Record<string, number> = {
  "astera-nocturne-safirna-ogrlica": 18,
  "splitske-kosarice": 15,
  "zlatni-prsten-kameja": 14,
  "sibenski-botun-prsten-zlato": 12,
  "paske-peruzine-biseri": 11,
  "dubrovacke-nausnice-koralj": 9,
  "zlatna-narukvica-botuni": 8,
  "smaragdni-leptir-prsten": 7,
};

const INITIAL_QUERY_CLICKS: Record<string, Record<string, number>> = {
  "zlatni prsten": {
    "zlatni-prsten-kameja": 6,
    "sibenski-botun-prsten-zlato": 4,
  },
  "splitske kosarice": {
    "splitske-kosarice": 7,
    "splitske-kosarice-2": 3,
  },
  "sibenski botun": {
    "sibenski-botun-prsten-zlato": 5,
    "zlatna-narukvica-botuni": 4,
  },
};

const INITIAL_POPULAR_SEARCHES: Record<string, PopularSearchEntry> = {
  "zlatni prsten kameja": {
    query: "zlatni prsten kameja",
    count: 46,
    resultsCount: 6,
    clicks: 31,
    lastSearchedAt: "Prije 3 min",
  },
  "splitske košarice": {
    query: "splitske košarice",
    count: 39,
    resultsCount: 5,
    clicks: 26,
    lastSearchedAt: "Prije 8 min",
  },
  "šibenski botun": {
    query: "šibenski botun",
    count: 35,
    resultsCount: 8,
    clicks: 23,
    lastSearchedAt: "Prije 14 min",
  },
  "paške peružine biseri": {
    query: "paške peružine biseri",
    count: 28,
    resultsCount: 5,
    clicks: 19,
    lastSearchedAt: "Prije 22 min",
  },
  "dubrovačke naušnice koralj": {
    query: "dubrovačke naušnice koralj",
    count: 24,
    resultsCount: 6,
    clicks: 16,
    lastSearchedAt: "Prije 35 min",
  },
  "astera safir ogrlica": {
    query: "astera safir ogrlica",
    count: 21,
    resultsCount: 4,
    clicks: 15,
    lastSearchedAt: "Prije 48 min",
  },
  "konavoske verižice": {
    query: "konavoske verižice",
    count: 18,
    resultsCount: 5,
    clicks: 11,
    lastSearchedAt: "Prije 1 sat",
  },
};

const INITIAL_ZERO_RESULT_SEARCHES: Record<string, ZeroResultSearchEntry> = {
  "platinasti muški sat": {
    query: "platinasti muški sat",
    count: 8,
    lastSearchedAt: "Prije 15 min",
    suggestedAlternative: "zlatne manžete šibenski botun 14k",
  },
  "dijamantna tijara": {
    query: "dijamantna tijara",
    count: 6,
    lastSearchedAt: "Prije 40 min",
    suggestedAlternative: "astera nocturne safirna ogrlica",
  },
  "zlatni broš leptir": {
    query: "zlatni broš leptir",
    count: 5,
    lastSearchedAt: "Prije 1 sat",
    suggestedAlternative: "smaragdni leptir prsten",
  },
};

const INITIAL_CLICK_HISTORY: ClickEventRecord[] = [
  {
    id: "clk-1",
    productId: "zlatni-prsten-kameja",
    productName: "Zlatni Prsten Kameja",
    query: "zlatni prsten kameja",
    timestamp: "Upravo sada",
  },
  {
    id: "clk-2",
    productId: "splitske-kosarice",
    productName: "Splitske Zlatne Košarice",
    query: "splitske kosarice",
    timestamp: "Prije 5 min",
  },
  {
    id: "clk-3",
    productId: "astera-nocturne-safirna-ogrlica",
    productName: "Astera Nocturne Safirna Ogrlica",
    query: "safir ogrlica",
    timestamp: "Prije 12 min",
  },
  {
    id: "clk-4",
    productId: "paske-peruzine-biseri",
    productName: "Kraljevske Peružine s Biserima",
    query: "paske peruzine",
    timestamp: "Prije 19 min",
  },
];

export const useSearchAnalyticsStore = create<SearchAnalyticsState>()(
  persist(
    (set) => ({
      recentSearches: INITIAL_RECENT_SEARCHES,
      globalProductClicks: INITIAL_GLOBAL_CLICKS,
      queryProductClicks: INITIAL_QUERY_CLICKS,
      popularSearchesLog: INITIAL_POPULAR_SEARCHES,
      zeroResultSearchesLog: INITIAL_ZERO_RESULT_SEARCHES,
      clickHistory: INITIAL_CLICK_HISTORY,
      developerMode: false,
      adminViewMode: "dev",

      setDeveloperMode: (enabled) => set({ developerMode: enabled }),
      toggleDeveloperMode: () =>
        set((state) => ({ developerMode: !state.developerMode })),
      setAdminViewMode: (mode) => set({ adminViewMode: mode }),

      recordSearchQuery: (rawQuery, resultsCount, suggestedAlternative) => {
        const trimmed = rawQuery.trim();
        if (trimmed.length < 2) return;
        const norm = normalizeText(trimmed);
        if (!norm) return;

        set((state) => {
          const updatedRecent = [
            trimmed,
            ...state.recentSearches.filter(
              (q) => q.toLowerCase() !== trimmed.toLowerCase()
            ),
          ].slice(0, 8);

          if (resultsCount === 0) {
            const existingZero = state.zeroResultSearchesLog[norm];
            return {
              recentSearches: updatedRecent,
              zeroResultSearchesLog: {
                ...state.zeroResultSearchesLog,
                [norm]: {
                  query: trimmed,
                  count: (existingZero?.count || 0) + 1,
                  lastSearchedAt: "Upravo sada",
                  suggestedAlternative:
                    suggestedAlternative ||
                    existingZero?.suggestedAlternative ||
                    "zlatni prsten kameja",
                },
              },
            };
          } else {
            const existingPop = state.popularSearchesLog[norm];
            return {
              recentSearches: updatedRecent,
              popularSearchesLog: {
                ...state.popularSearchesLog,
                [norm]: {
                  query: trimmed,
                  count: (existingPop?.count || 0) + 1,
                  resultsCount,
                  clicks: existingPop?.clicks || 0,
                  lastSearchedAt: "Upravo sada",
                },
              },
            };
          }
        });
      },

      recordProductClick: (
        productId,
        productName,
        activeQuery,
        correctedQuery
      ) => {
        const normQuery = normalizeText(activeQuery || "");
        const normCorrected = correctedQuery
          ? normalizeText(correctedQuery)
          : null;

        set((state) => {
          const nextGlobalClicks = {
            ...state.globalProductClicks,
            [productId]: (state.globalProductClicks[productId] || 0) + 1,
          };

          const nextQueryClicks = { ...state.queryProductClicks };
          if (normQuery) {
            nextQueryClicks[normQuery] = {
              ...(nextQueryClicks[normQuery] || {}),
              [productId]:
                (nextQueryClicks[normQuery]?.[productId] || 0) + 1,
            };
          }
          if (normCorrected && normCorrected !== normQuery) {
            nextQueryClicks[normCorrected] = {
              ...(nextQueryClicks[normCorrected] || {}),
              [productId]:
                (nextQueryClicks[normCorrected]?.[productId] || 0) + 1,
            };
          }

          const nextPopularLog = { ...state.popularSearchesLog };
          if (normQuery && nextPopularLog[normQuery]) {
            nextPopularLog[normQuery] = {
              ...nextPopularLog[normQuery],
              clicks: nextPopularLog[normQuery].clicks + 1,
            };
          }

          const newEvent: ClickEventRecord = {
            id: `clk-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            productId,
            productName,
            query: activeQuery.trim() || "(Pregled kataloga)",
            timestamp: "Upravo sada",
          };

          return {
            globalProductClicks: nextGlobalClicks,
            queryProductClicks: nextQueryClicks,
            popularSearchesLog: nextPopularLog,
            clickHistory: [newEvent, ...state.clickHistory].slice(0, 25),
          };
        });
      },

      clearRecentSearches: () => set({ recentSearches: [] }),

      removeRecentSearch: (query) =>
        set((state) => ({
          recentSearches: state.recentSearches.filter((q) => q !== query),
        })),

      resetAnalyticsDemoData: () =>
        set({
          recentSearches: INITIAL_RECENT_SEARCHES,
          globalProductClicks: INITIAL_GLOBAL_CLICKS,
          queryProductClicks: INITIAL_QUERY_CLICKS,
          popularSearchesLog: INITIAL_POPULAR_SEARCHES,
          zeroResultSearchesLog: INITIAL_ZERO_RESULT_SEARCHES,
          clickHistory: INITIAL_CLICK_HISTORY,
        }),
    }),
    {
      name: "astera-jewelry-search-analytics-v2",
      // ePrivacy: behavioural analytics are only stored on the device after analytics opt-in.
      storage: createJSONStorage(() => consentStorage("analytics")),
    }
  )
);
