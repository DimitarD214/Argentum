export interface SearchableProduct {
  id: string;
  stripe_id?: string;
  name: string;
  description: string | null;
  category: string;
  brand?: string;
  tags?: string[];
  rating?: number;
  reviewCount?: number;
  basePrice?: number;
  /** Lowest price in the 30 days before a reduction, per metal (ZZP čl. 19). Only set for discounted items. */
  priceHistory30d?: {
    sterling_silver?: number;
    gold_14k?: number;
    rose_gold?: number;
    platinum?: number;
  };
  price: {
    sterling_silver?: number;
    gold_14k?: number;
    rose_gold?: number;
    platinum?: number;
  };
  images: string[];
  badges: string[];
  material: string[];
  theme: string;
  stoneColor: string;
  line?: string;
  subcategory?: string;
}

export type MatchType =
  | "exact-phrase"
  | "exact"
  | "partial-prefix"
  | "partial-substring"
  | "synonym"
  | "fuzzy"
  | "multi-word-bonus"
  | "click-boost";

export type MatchField =
  | "name"
  | "brand"
  | "category"
  | "tags"
  | "description"
  | "behaviour"
  | "query";

export interface MatchReason {
  field: MatchField;
  type: MatchType;
  queryTerm: string;
  matchedTerm: string;
  editDistance?: number;
  maxAllowedDistance?: number;
  scoreDelta: number;
  explanation: string;
}

export interface ScoredProductResult {
  product: SearchableProduct;
  score: number;
  baseRelevanceScore: number;
  phraseBonus: number;
  coordinationBonus: number;
  clickBoostScore: number;
  matchedTokensCount: number;
  totalQueryTokens: number;
  reasons: MatchReason[];
  highlightTerms: string[];
  clickCount: number;
  queryClickCount: number;
}

export interface AutocompleteSuggestion {
  text: string;
  type: "popular" | "correction" | "completion" | "synonym" | "category";
  matchedPrefix?: string;
  boldRemainder?: string;
  badge?: string;
}

export interface SearchExecutionResponse {
  query: string;
  normalizedQuery: string;
  correctedQuery: string | null;
  usedSynonymExpansion: Array<{ from: string; to: string[] }>;
  tokenAnalysis: Array<{
    raw: string;
    normalized: string;
    isStopword: boolean;
    maxEditDistance: number;
    correctedTo?: string;
    synonyms: string[];
  }>;
  results: ScoredProductResult[];
  totalUnfilteredMatches: number;
  zeroResultsDetected: boolean;
  suggestedAlternatives: string[];
  autocompleteSuggestions: AutocompleteSuggestion[];
  topPreviewProduct: SearchableProduct | null;
  executionTimeMs: number;
  indexStats: {
    totalProducts: number;
    uniqueVocabularyTerms: number;
    invertedIndexEntries: number;
  };
}

export interface SearchFilters {
  category?: string;
  brands?: string[];
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  material?: string;
  theme?: string;
  color?: string;
  lineScope?: "all" | "astera-nakit" | "tradicijski-nakit";
}

export type SortOption =
  | "relevance"
  | "price-asc"
  | "price-desc"
  | "rating-desc"
  | "popular";

export interface ClickBehaviourState {
  globalProductClicks: Record<string, number>;
  queryProductClicks: Record<string, Record<string, number>>;
}

// ==================== STOPWORDS ====================
const STOPWORDS = new Set([
  "a",
  "an",
  "the",
  "and",
  "or",
  "for",
  "with",
  "in",
  "on",
  "of",
  "to",
  "by",
  "at",
  "from",
  "is",
  "are",
  "i",
  "u",
  "s",
  "sa",
  "od",
  "za",
  "na",
  "iz",
  "po",
  "ili",
  "koji",
  "koja",
  "koje",
]);

// ==================== BIDIRECTIONAL SYNONYM GROUPS ====================
const SYNONYM_GROUPS: string[][] = [
  // Jewelry Categories & Regional Croatian Synonyms
  [
    "earrings",
    "earring",
    "nausnice",
    "naušnice",
    "recine",
    "rećine",
    "studs",
    "hoops",
    "kosarice",
    "košarice",
    "peruzine",
    "peružine",
    "verizice",
    "verižice",
    "obruci",
    "obruči",
  ],
  [
    "ring",
    "rings",
    "prsten",
    "prstenje",
    "prstenovi",
    "band",
    "signet",
    "pecatnjak",
    "pečatnjak",
    "zarucnicki",
    "zaručnički",
  ],
  [
    "necklace",
    "necklaces",
    "ogrlica",
    "ogrlice",
    "lancic",
    "lančić",
    "pendant",
    "privjesak",
    "medaljon",
    "kolajna",
    "choker",
  ],
  [
    "bracelet",
    "bracelets",
    "narukvica",
    "narukvice",
    "bangle",
    "cuff",
    "manzete",
    "manžete",
    "grivna",
  ],
  [
    "set",
    "sets",
    "parure",
    "suite",
    "kolekcija",
    "poklon",
    "gift",
  ],
  // Precious Metals & Gemstones
  ["gold", "golden", "zlato", "zlatni", "zlatna", "zlatne", "14k", "karat", "dukat"],
  ["silver", "srebro", "srebrni", "srebrna", "srebrne", "sterling", "925"],
  ["pearl", "pearls", "biser", "biseri", "biserni", "biserna", "perla", "sedef"],
  ["coral", "corals", "koralj", "koralji", "koraljni", "crveni", "red"],
  ["cameo", "kameja", "kameje", "portret", "reljef"],
  [
    "filigree",
    "filigran",
    "filigranski",
    "filigranske",
    "filigranska",
    "cipka",
    "čipka",
    "lace",
    "handmade",
    "rucni",
    "granulacija",
  ],
  ["button", "buttons", "botun", "botuni", "sibenski", "šibenski", "puplini"],
  ["sapphire", "safir", "safirni", "plavi", "blue", "kristal", "crystal", "topaz"],
  ["emerald", "smaragd", "smaragdni", "zeleni", "green"],
  ["ruby", "rubin", "rubinski"],
  ["turquoise", "tirkiz", "tirkizni"],
  ["traditional", "tradicijski", "tradicijske", "bastina", "baština", "heritage", "starohrvatski"],
  ["flower", "floral", "cvijet", "cvjetni", "cvjetne", "cvijece", "ruza", "ruža", "latica"],
];

const SYNONYM_LOOKUP = new Map<string, Set<string>>();
for (const group of SYNONYM_GROUPS) {
  const normalizedGroup = group.map((w) => normalizeText(w));
  for (const word of normalizedGroup) {
    if (!SYNONYM_LOOKUP.has(word)) {
      SYNONYM_LOOKUP.set(word, new Set());
    }
    const set = SYNONYM_LOOKUP.get(word)!;
    for (const syn of normalizedGroup) {
      if (syn !== word) set.add(syn);
    }
  }
}

export const CURATED_POPULAR_SEARCHES: Array<{
  query: string;
  category: string;
  badge?: string;
}> = [
  { query: "zlatni prsten kameja", category: "Prstenje", badge: "Najtraženije" },
  { query: "splitske zlatne košarice", category: "Naušnice", badge: "Baština" },
  { query: "šibenski botun", category: "Tradicijski", badge: "Bestseller" },
  { query: "astera nocturne safirna ogrlica", category: "Ogrlice", badge: "Ekskluzivno" },
  { query: "paške peružine s biserima", category: "Naušnice" },
  { query: "dubrovačke naušnice s koraljima", category: "Naušnice" },
  { query: "konavoske zlatne verižice", category: "Naušnice" },
  { query: "smaragdni leptir prsten", category: "Prstenje" },
  { query: "zlatna filigranska ogrlica", category: "Ogrlice" },
  { query: "srebrna narukvica botun", category: "Narukvice" },
];

// ==================== TEXT NORMALIZATION & TOKENIZATION ====================
export function normalizeText(text: string): string {
  if (!text) return "";
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function tokenize(text: string): string[] {
  const norm = normalizeText(text);
  if (!norm) return [];
  return norm
    .split(/[\s-]+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 0);
}

// ==================== ADAPTIVE TYPO TOLERANCE ====================
export function getAdaptiveMaxEditDistance(wordLength: number): number {
  if (wordLength <= 2) return 0;
  if (wordLength <= 4) return 1;
  if (wordLength <= 8) return 2;
  return 3;
}

export function damerauLevenshtein(a: string, b: string): number {
  if (a === b) return 0;
  const lenA = a.length;
  const lenB = b.length;
  if (lenA === 0) return lenB;
  if (lenB === 0) return lenA;
  if (Math.abs(lenA - lenB) > 4) return Math.abs(lenA - lenB);

  const dp: number[][] = Array.from({ length: lenA + 1 }, () =>
    new Array(lenB + 1).fill(0)
  );

  for (let i = 0; i <= lenA; i++) dp[i][0] = i;
  for (let j = 0; j <= lenB; j++) dp[0][j] = j;

  for (let i = 1; i <= lenA; i++) {
    for (let j = 1; j <= lenB; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
      if (
        i > 1 &&
        j > 1 &&
        a[i - 1] === b[j - 2] &&
        a[i - 2] === b[j - 1]
      ) {
        dp[i][j] = Math.min(dp[i][j], dp[i - 2][j - 2] + 1);
      }
    }
  }
  return dp[lenA][lenB];
}

// ==================== PRE-COMPUTED INVERTED INDEX ====================
interface IndexedFieldTokens {
  rawText: string;
  normalizedText: string;
  tokens: string[];
  originalTokens: string[];
}

interface IndexedProductEntry {
  product: SearchableProduct;
  basePrice: number;
  rating: number;
  reviewCount: number;
  brandNormalized: string;
  fields: {
    name: IndexedFieldTokens;
    brand: IndexedFieldTokens;
    category: IndexedFieldTokens;
    tags: IndexedFieldTokens;
    description: IndexedFieldTokens;
  };
  allUniqueTokens: Set<string>;
}

export class CatalogSearchIndex {
  public entries: IndexedProductEntry[] = [];
  public tokenToProductIds = new Map<string, Set<string>>();
  public prefixToVocab = new Map<string, Set<string>>();
  public docFreq = new Map<string, number>();
  public vocabulary: string[] = [];
  public canonicalToOriginalWord = new Map<string, string>();
  public invertedIndexEntryCount = 0;

  constructor(products: SearchableProduct[]) {
    this.buildIndex(products);
  }

  private extractOriginalTokens(text: string): string[] {
    if (!text) return [];
    return text
      .split(/[\s,•/()-]+/)
      .map((t) => t.trim())
      .filter(Boolean);
  }

  private buildField(raw: string): IndexedFieldTokens {
    const normalizedText = normalizeText(raw);
    const tokens = tokenize(raw);
    const originalTokens = this.extractOriginalTokens(raw);
    for (const orig of originalTokens) {
      const norm = normalizeText(orig);
      if (norm && !this.canonicalToOriginalWord.has(norm)) {
        this.canonicalToOriginalWord.set(norm, orig);
      }
    }
    return { rawText: raw, normalizedText, tokens, originalTokens };
  }

  private buildIndex(products: SearchableProduct[]) {
    for (const product of products) {
      const basePrice =
        product.basePrice ??
        product.price?.gold_14k ??
        product.price?.sterling_silver ??
        product.price?.rose_gold ??
        product.price?.platinum ??
        0;

      const rating = typeof product.rating === "number" ? product.rating : 4.8;
      const reviewCount =
        typeof product.reviewCount === "number" ? product.reviewCount : 120;
      const brandStr = product.brand || "Astera Atelier";

      const categoryCombined = [
        product.category,
        product.subcategory,
        product.theme,
        product.line,
      ]
        .filter(Boolean)
        .join(" ");

      const tagsCombined = [
        ...(product.tags || []),
        product.stoneColor,
        ...(product.badges || []),
        ...(product.material || []),
      ]
        .filter(Boolean)
        .join(" ");

      const fields = {
        name: this.buildField(product.name || ""),
        brand: this.buildField(brandStr),
        category: this.buildField(categoryCombined),
        tags: this.buildField(tagsCombined),
        description: this.buildField(product.description || ""),
      };

      const allUniqueTokens = new Set<string>([
        ...fields.name.tokens,
        ...fields.brand.tokens,
        ...fields.category.tokens,
        ...fields.tags.tokens,
        ...fields.description.tokens,
      ]);

      this.entries.push({
        product: {
          ...product,
          brand: brandStr,
          basePrice,
          rating,
          reviewCount,
        },
        basePrice,
        rating,
        reviewCount,
        brandNormalized: fields.brand.normalizedText,
        fields,
        allUniqueTokens,
      });

      for (const token of allUniqueTokens) {
        if (!this.tokenToProductIds.has(token)) {
          this.tokenToProductIds.set(token, new Set());
        }
        this.tokenToProductIds.get(token)!.add(product.id);
        this.docFreq.set(token, (this.docFreq.get(token) || 0) + 1);
        this.invertedIndexEntryCount++;

        const maxP = Math.min(3, token.length);
        for (let len = 1; len <= maxP; len++) {
          const prefix = token.slice(0, len);
          if (!this.prefixToVocab.has(prefix)) {
            this.prefixToVocab.set(prefix, new Set());
          }
          this.prefixToVocab.get(prefix)!.add(token);
        }
      }
    }

    this.vocabulary = Array.from(this.tokenToProductIds.keys());
  }

  public getIdfWeight(token: string): number {
    const df = this.docFreq.get(token) || 1;
    const totalDocs = Math.max(1, this.entries.length);
    const rawIdf = Math.log10(1 + totalDocs / df);
    return Math.min(1.65, Math.max(0.85, 0.75 + rawIdf * 0.45));
  }

  public findBestTokenCorrection(queryToken: string): {
    corrected: string;
    distance: number;
  } | null {
    if (this.tokenToProductIds.has(queryToken)) {
      return { corrected: queryToken, distance: 0 };
    }
    if (SYNONYM_LOOKUP.has(queryToken)) {
      return { corrected: queryToken, distance: 0 };
    }

    if (queryToken.length >= 3) {
      const prefixCandidates = this.prefixToVocab.get(queryToken.slice(0, 3));
      if (prefixCandidates) {
        let bestPrefixMatch: string | null = null;
        let bestDf = -1;
        for (const cand of prefixCandidates) {
          if (cand.startsWith(queryToken)) {
            const df = this.docFreq.get(cand) || 0;
            if (df > bestDf) {
              bestDf = df;
              bestPrefixMatch = cand;
            }
          }
        }
        if (bestPrefixMatch) {
          return { corrected: bestPrefixMatch, distance: 0 };
        }
      }
    }

    const maxDist = getAdaptiveMaxEditDistance(queryToken.length);
    if (maxDist === 0) return null;

    let bestWord: string | null = null;
    let bestDist = maxDist + 1;
    let bestDf = -1;

    const candidatePool =
      queryToken.length >= 2 && this.prefixToVocab.has(queryToken.slice(0, 1))
        ? Array.from(this.prefixToVocab.get(queryToken.slice(0, 1))!)
        : this.vocabulary;

    const evaluatePool = (pool: string[]) => {
      for (const vocabWord of pool) {
        if (vocabWord.length < 3) continue;
        if (Math.abs(vocabWord.length - queryToken.length) > maxDist) continue;
        const dist = damerauLevenshtein(queryToken, vocabWord);
        if (dist <= maxDist) {
          if (
            dist === 2 &&
            queryToken.length <= 6 &&
            queryToken[0] !== vocabWord[0]
          ) {
            continue;
          }
          const df = this.docFreq.get(vocabWord) || 0;
          if (dist < bestDist || (dist === bestDist && df > bestDf)) {
            bestDist = dist;
            bestWord = vocabWord;
            bestDf = df;
          }
        }
      }
    };

    evaluatePool(candidatePool);
    if (!bestWord) {
      evaluatePool(this.vocabulary);
    }

    for (const synKey of SYNONYM_LOOKUP.keys()) {
      if (Math.abs(synKey.length - queryToken.length) > maxDist) continue;
      const dist = damerauLevenshtein(queryToken, synKey);
      if (dist <= maxDist && dist < bestDist) {
        bestDist = dist;
        bestWord = synKey;
      }
    }

    return bestWord ? { corrected: bestWord, distance: bestDist } : null;
  }
}

let cachedIndex: {
  ref: SearchableProduct[];
  len: number;
  index: CatalogSearchIndex;
} | null = null;

export function getOrCreateSearchIndex(
  products: SearchableProduct[]
): CatalogSearchIndex {
  if (
    cachedIndex &&
    cachedIndex.ref === products &&
    cachedIndex.len === products.length
  ) {
    return cachedIndex.index;
  }
  const index = new CatalogSearchIndex(products);
  cachedIndex = { ref: products, len: products.length, index };
  return index;
}

const FIELD_WEIGHTS: Record<
  keyof IndexedProductEntry["fields"],
  { multiplier: number; label: string }
> = {
  name: { multiplier: 1.65, label: "Product Name" },
  brand: { multiplier: 1.5, label: "Brand / Atelier" },
  category: { multiplier: 1.35, label: "Category" },
  tags: { multiplier: 1.2, label: "Tags & Gemstones" },
  description: { multiplier: 0.55, label: "Description" },
};

const BASE_MATCH_POINTS = {
  exactPhraseName: 68,
  exactPhraseBrandOrCat: 48,
  exactPhraseDesc: 24,
  exactWord: 34,
  synonymExact: 26,
  partialPrefix: 24,
  fuzzyDist1: 23,
  fuzzyDist2: 14,
  fuzzyDist3: 9,
  partialSubstring: 13,
};

// ==================== MAIN SEARCH & RANKING ENGINE ====================
export function executeIntelligentSearch(
  products: SearchableProduct[],
  rawQuery: string,
  filters: SearchFilters = {},
  sortBy: SortOption = "relevance",
  clickState: ClickBehaviourState = {
    globalProductClicks: {},
    queryProductClicks: {},
  }
): SearchExecutionResponse {
  const startTime =
    typeof performance !== "undefined" ? performance.now() : Date.now();

  const index = getOrCreateSearchIndex(products);
  const normalizedQuery = normalizeText(rawQuery);
  const rawTokens = tokenize(rawQuery);

  const usedSynonymExpansion: Array<{ from: string; to: string[] }> = [];
  const correctedTokens: string[] = [];
  let anyTokenCorrected = false;

  const tokenAnalysis = rawTokens.map((token) => {
    const isStopword = STOPWORDS.has(token);
    const maxEditDistance = getAdaptiveMaxEditDistance(token.length);
    const directSynonyms = SYNONYM_LOOKUP.get(token)
      ? Array.from(SYNONYM_LOOKUP.get(token)!)
      : [];

    let correctedTo: string | undefined;
    if (!isStopword) {
      const correction = index.findBestTokenCorrection(token);
      if (correction && correction.corrected !== token) {
        correctedTo = correction.corrected;
        anyTokenCorrected = true;
      }
      correctedTokens.push(correctedTo || token);

      const corrSyns = correctedTo
        ? SYNONYM_LOOKUP.get(correctedTo)
          ? Array.from(SYNONYM_LOOKUP.get(correctedTo)!)
          : []
        : [];
      for (const s of corrSyns) {
        if (!directSynonyms.includes(s)) directSynonyms.push(s);
      }
    } else {
      correctedTokens.push(token);
    }

    if (directSynonyms.length > 0) {
      usedSynonymExpansion.push({
        from: token,
        to: directSynonyms.slice(0, 6),
      });
    }

    return {
      raw: token,
      normalized: token,
      isStopword,
      maxEditDistance,
      correctedTo,
      synonyms: directSynonyms,
    };
  });

  const correctedQuery =
    anyTokenCorrected && correctedTokens.length > 0
      ? correctedTokens.join(" ")
      : null;

  const significantTokens = tokenAnalysis.filter((t) => !t.isStopword);
  const activeTokens =
    significantTokens.length > 0 ? significantTokens : tokenAnalysis;

  const resolvableTokenCount = activeTokens.filter(
    (t) =>
      index.tokenToProductIds.has(t.normalized) ||
      Boolean(t.correctedTo) ||
      t.synonyms.some((s) => index.tokenToProductIds.has(s))
  ).length;

  const scoredResults: ScoredProductResult[] = [];

  for (const entry of index.entries) {
    const prod = entry.product;
    const globalClicks = clickState.globalProductClicks[prod.id] || 0;
    const rawQueryClicks =
      (normalizedQuery &&
        clickState.queryProductClicks[normalizedQuery]?.[prod.id]) ||
      0;
    const correctedQueryClicks =
      (correctedQuery &&
        clickState.queryProductClicks[correctedQuery]?.[prod.id]) ||
      0;
    const queryClicks = Math.max(rawQueryClicks, correctedQueryClicks);

    if (rawTokens.length === 0) {
      const clickBoost =
        globalClicks > 0 ? Number((6 * Math.log2(1 + globalClicks)).toFixed(1)) : 0;
      const basePopScore = Number(
        (entry.rating * 10 + Math.log10(1 + entry.reviewCount) * 5 + clickBoost).toFixed(1)
      );
      const reasons: MatchReason[] = [
        {
          field: "query",
          type: "exact",
          queryTerm: "*",
          matchedTerm: prod.name,
          scoreDelta: basePopScore,
          explanation: `Catalogue score (Rating ${entry.rating}★, ${entry.reviewCount} reviews)`,
        },
      ];
      if (clickBoost > 0) {
        reasons.push({
          field: "behaviour",
          type: "click-boost",
          queryTerm: "*",
          matchedTerm: `${globalClicks} user clicks`,
          scoreDelta: clickBoost,
          explanation: `Boosted by ${globalClicks} total user click(s)`,
        });
      }
      scoredResults.push({
        product: prod,
        score: basePopScore,
        baseRelevanceScore: basePopScore - clickBoost,
        phraseBonus: 0,
        coordinationBonus: 0,
        clickBoostScore: clickBoost,
        matchedTokensCount: 0,
        totalQueryTokens: 0,
        reasons,
        highlightTerms: [],
        clickCount: globalClicks,
        queryClickCount: 0,
      });
      continue;
    }

    const reasons: MatchReason[] = [];
    const highlightTermsSet = new Set<string>();
    let baseRelevanceScore = 0;
    let phraseBonus = 0;
    let matchedSignificantTokens = 0;
    let primaryFieldMatchCount = 0;

    // --- A. Exact Phrase Match Bonus ---
    const phrasesToCheck = [normalizedQuery];
    if (correctedQuery && correctedQuery !== normalizedQuery) {
      phrasesToCheck.push(correctedQuery);
    }

    const combinedNameBrandCat = `${entry.fields.brand.normalizedText} ${entry.fields.name.normalizedText} ${entry.fields.category.normalizedText}`;

    for (const phrase of phrasesToCheck) {
      if (phrase.length < 3) continue;
      if (entry.fields.name.normalizedText.includes(phrase)) {
        const pts =
          phrase === normalizedQuery
            ? BASE_MATCH_POINTS.exactPhraseName
            : BASE_MATCH_POINTS.exactPhraseName * 0.8;
        phraseBonus += pts;
        reasons.push({
          field: "name",
          type: "exact-phrase",
          queryTerm: rawQuery.trim(),
          matchedTerm: phrase,
          scoreDelta: Number(pts.toFixed(1)),
          explanation: `Exact phrase match "${phrase}" inside product name`,
        });
        break;
      } else if (
        rawTokens.length >= 2 &&
        combinedNameBrandCat.includes(phrase)
      ) {
        const pts =
          phrase === normalizedQuery
            ? BASE_MATCH_POINTS.exactPhraseBrandOrCat
            : BASE_MATCH_POINTS.exactPhraseBrandOrCat * 0.8;
        phraseBonus += pts;
        reasons.push({
          field: "brand",
          type: "exact-phrase",
          queryTerm: rawQuery.trim(),
          matchedTerm: phrase,
          scoreDelta: Number(pts.toFixed(1)),
          explanation: `Phrase match "${phrase}" across brand, name & category`,
        });
        break;
      } else if (
        rawTokens.length >= 2 &&
        entry.fields.description.normalizedText.includes(phrase)
      ) {
        const pts = BASE_MATCH_POINTS.exactPhraseDesc;
        phraseBonus += pts;
        reasons.push({
          field: "description",
          type: "exact-phrase",
          queryTerm: rawQuery.trim(),
          matchedTerm: phrase,
          scoreDelta: Number(pts.toFixed(1)),
          explanation: `Exact phrase match "${phrase}" in product description`,
        });
        break;
      }
    }

    // --- B. Per-Token Scoring Across All 5 Fields ---
    const fieldOrder: Array<keyof IndexedProductEntry["fields"]> = [
      "name",
      "brand",
      "category",
      "tags",
      "description",
    ];

    for (const qTokenObj of activeTokens) {
      const qToken = qTokenObj.normalized;
      const idf = index.getIdfWeight(qTokenObj.correctedTo || qToken);
      const maxAllowedDist = qTokenObj.maxEditDistance;

      let bestTokenScore = 0;
      let bestTokenReason: MatchReason | null = null;
      let bestHighlightWord: string | null = null;
      let matchedInPrimaryField = false;

      for (const fieldName of fieldOrder) {
        const fieldData = entry.fields[fieldName];
        const fieldWeight = FIELD_WEIGHTS[fieldName].multiplier;
        const fieldLabel = FIELD_WEIGHTS[fieldName].label;

        for (let idx = 0; idx < fieldData.tokens.length; idx++) {
          const targetToken = fieldData.tokens[idx];
          const originalSurfaceWord =
            fieldData.originalTokens[idx] || targetToken;

          let candidatePoints = 0;
          let candidateType: MatchType = "exact";
          let candidateDist: number | undefined;
          let candidateExplanation = "";

          if (targetToken === qToken) {
            candidatePoints = BASE_MATCH_POINTS.exactWord * fieldWeight * idf;
            candidateType = "exact";
            candidateExplanation = `Exact match "${qToken}" in ${fieldLabel}`;
          } else if (
            qToken.length >= 2 &&
            targetToken.startsWith(qToken) &&
            targetToken.length > qToken.length
          ) {
            const coverageRatio = qToken.length / targetToken.length;
            candidatePoints =
              BASE_MATCH_POINTS.partialPrefix *
              (0.72 + 0.28 * coverageRatio) *
              fieldWeight *
              idf;
            candidateType = "partial-prefix";
            candidateExplanation = `Partial prefix "${qToken}" → "${originalSurfaceWord}" in ${fieldLabel}`;
          } else if (
            qTokenObj.synonyms.some(
              (syn) =>
                targetToken === syn ||
                (syn.length >= 4 && targetToken.startsWith(syn))
            )
          ) {
            candidatePoints =
              BASE_MATCH_POINTS.synonymExact * fieldWeight * idf;
            candidateType = "synonym";
            candidateExplanation = `Synonym match "${qToken}" ↔ "${originalSurfaceWord}" in ${fieldLabel}`;
          } else if (
            maxAllowedDist > 0 &&
            targetToken.length >= 3 &&
            Math.abs(targetToken.length - qToken.length) <= maxAllowedDist
          ) {
            const dist = damerauLevenshtein(qToken, targetToken);
            if (dist <= maxAllowedDist) {
              const validFuzzy =
                dist === 1 ||
                qToken[0] === targetToken[0] ||
                qToken.length >= 7;
              if (validFuzzy) {
                const baseFuzzy =
                  dist === 1
                    ? BASE_MATCH_POINTS.fuzzyDist1
                    : dist === 2
                    ? BASE_MATCH_POINTS.fuzzyDist2
                    : BASE_MATCH_POINTS.fuzzyDist3;
                candidatePoints = baseFuzzy * fieldWeight * idf;
                candidateType = "fuzzy";
                candidateDist = dist;
                candidateExplanation = `Fuzzy match "${qToken}" → "${originalSurfaceWord}" (edit dist ${dist}, max ${maxAllowedDist}) in ${fieldLabel}`;
              }
            }
          }
          if (
            candidatePoints === 0 &&
            qToken.length >= 4 &&
            targetToken.length > qToken.length &&
            targetToken.includes(qToken)
          ) {
            candidatePoints =
              BASE_MATCH_POINTS.partialSubstring * fieldWeight * idf;
            candidateType = "partial-substring";
            candidateExplanation = `Substring match "${qToken}" inside "${originalSurfaceWord}" in ${fieldLabel}`;
          }

          if (candidatePoints > bestTokenScore) {
            bestTokenScore = candidatePoints;
            bestHighlightWord = originalSurfaceWord;
            matchedInPrimaryField = fieldName !== "description";
            bestTokenReason = {
              field: fieldName,
              type: candidateType,
              queryTerm: qToken,
              matchedTerm: originalSurfaceWord,
              editDistance: candidateDist,
              maxAllowedDistance:
                candidateType === "fuzzy" ? maxAllowedDist : undefined,
              scoreDelta: Number(candidatePoints.toFixed(1)),
              explanation: candidateExplanation,
            };
          }
        }
      }

      if (bestTokenScore > 0 && bestTokenReason) {
        matchedSignificantTokens++;
        if (matchedInPrimaryField) primaryFieldMatchCount++;
        baseRelevanceScore += bestTokenScore;
        reasons.push(bestTokenReason);
        if (bestHighlightWord) {
          highlightTermsSet.add(bestHighlightWord);
        }
        highlightTermsSet.add(qToken);
      }
    }

    // --- C. Prevent Irrelevant Products From Appearing on Weak Single-Keyword Matches ---
    if (matchedSignificantTokens === 0 && phraseBonus === 0) {
      continue;
    }

    const totalRequiredTokens = Math.max(
      1,
      Math.min(activeTokens.length, resolvableTokenCount)
    );

    if (totalRequiredTokens >= 2) {
      const minRequiredMatches =
        totalRequiredTokens === 2
          ? 2
          : Math.ceil(totalRequiredTokens * 0.65);

      if (matchedSignificantTokens < minRequiredMatches) {
        continue;
      }
      if (primaryFieldMatchCount === 0) {
        continue;
      }
    } else {
      if (primaryFieldMatchCount === 0 && baseRelevanceScore < 20) {
        continue;
      }
    }

    // --- D. Multi-Word Coordination Bonus ---
    let coordinationBonus = 0;
    if (activeTokens.length >= 2 && matchedSignificantTokens >= 2) {
      const coverage = matchedSignificantTokens / activeTokens.length;
      coordinationBonus = Number((42 * coverage * coverage).toFixed(1));
      reasons.push({
        field: "query",
        type: "multi-word-bonus",
        queryTerm: `${matchedSignificantTokens}/${activeTokens.length} words`,
        matchedTerm: `${Math.round(coverage * 100)}% coverage`,
        scoreDelta: coordinationBonus,
        explanation: `Multi-word coordination bonus (${matchedSignificantTokens} of ${activeTokens.length} query words matched)`,
      });
    }

    // --- E. Click Behaviour Boost ---
    let clickBoostScore = 0;
    if (queryClicks > 0 || globalClicks > 0) {
      const querySpecificPts =
        queryClicks > 0 ? 22 * Math.log2(1 + queryClicks) : 0;
      const globalPts = globalClicks > 0 ? 6 * Math.log2(1 + globalClicks) : 0;
      clickBoostScore = Number((querySpecificPts + globalPts).toFixed(1));
      reasons.push({
        field: "behaviour",
        type: "click-boost",
        queryTerm: rawQuery.trim(),
        matchedTerm:
          queryClicks > 0
            ? `${queryClicks} click(s) for this search, ${globalClicks} total`
            : `${globalClicks} total click(s)`,
        scoreDelta: clickBoostScore,
        explanation:
          queryClicks > 0
            ? `Click behaviour boost: clicked ${queryClicks}× for "${
                correctedQuery || normalizedQuery
              }" (+${clickBoostScore} pts)`
            : `Popularity click boost: clicked ${globalClicks}× overall (+${clickBoostScore} pts)`,
      });
    }

    const totalScore = Number(
      (
        baseRelevanceScore +
        phraseBonus +
        coordinationBonus +
        clickBoostScore
      ).toFixed(1)
    );

    if (totalScore < 16) {
      continue;
    }

    scoredResults.push({
      product: prod,
      score: totalScore,
      baseRelevanceScore: Number(baseRelevanceScore.toFixed(1)),
      phraseBonus: Number(phraseBonus.toFixed(1)),
      coordinationBonus,
      clickBoostScore,
      matchedTokensCount: matchedSignificantTokens,
      totalQueryTokens: activeTokens.length,
      reasons,
      highlightTerms: Array.from(highlightTermsSet),
      clickCount: globalClicks,
      queryClickCount: queryClicks,
    });
  }

  const totalUnfilteredMatches = scoredResults.length;

  // 3. Apply Category, Brand, Price, Rating, and Line Filters
  const filteredResults = scoredResults.filter(({ product }) => {
    const price = product.basePrice ?? product.price?.gold_14k ?? 0;
    const rating = product.rating ?? 4.8;
    const brand = product.brand || "Astera Atelier";

    if (filters.lineScope && filters.lineScope !== "all") {
      if (product.line !== filters.lineScope) return false;
    }

    if (filters.category && filters.category !== "All") {
      const catMatch =
        product.category.toLowerCase() === filters.category.toLowerCase() ||
        product.theme?.toLowerCase() === filters.category.toLowerCase() ||
        product.subcategory?.toLowerCase() === filters.category.toLowerCase();
      if (!catMatch) return false;
    }

    if (filters.theme && filters.theme !== "All") {
      const themeMatch =
        product.theme === filters.theme || product.category === filters.theme;
      if (!themeMatch) return false;
    }

    if (filters.color && filters.color !== "All") {
      if (product.stoneColor !== filters.color) return false;
    }

    if (filters.material && filters.material !== "All") {
      if (!product.material?.includes(filters.material)) return false;
    }

    if (filters.brands && filters.brands.length > 0) {
      if (!filters.brands.includes(brand)) return false;
    }

    if (typeof filters.minPrice === "number" && price < filters.minPrice) {
      return false;
    }

    if (typeof filters.maxPrice === "number" && price > filters.maxPrice) {
      return false;
    }

    if (typeof filters.minRating === "number" && filters.minRating > 0) {
      if (rating < filters.minRating) return false;
    }

    return true;
  });

  // 4. Sort Results
  filteredResults.sort((a, b) => {
    if (sortBy === "price-asc") {
      return (a.product.basePrice || 0) - (b.product.basePrice || 0);
    }
    if (sortBy === "price-desc") {
      return (b.product.basePrice || 0) - (a.product.basePrice || 0);
    }
    if (sortBy === "rating-desc") {
      const rDiff = (b.product.rating || 0) - (a.product.rating || 0);
      if (rDiff !== 0) return rDiff;
      return (b.product.reviewCount || 0) - (a.product.reviewCount || 0);
    }
    if (sortBy === "popular") {
      const cDiff = b.clickCount - a.clickCount;
      if (cDiff !== 0) return cDiff;
      return (b.product.reviewCount || 0) - (a.product.reviewCount || 0);
    }
    if (b.score !== a.score) return b.score - a.score;
    return (b.product.rating || 0) - (a.product.rating || 0);
  });

  const autocompleteSuggestions = generateAutocompleteSuggestions(
    rawQuery,
    normalizedQuery,
    correctedQuery,
    filteredResults,
    index
  );

  const zeroResultsDetected =
    rawTokens.length > 0 && filteredResults.length === 0;
  const suggestedAlternatives = generateSuggestedAlternatives(
    rawQuery,
    normalizedQuery,
    correctedQuery,
    usedSynonymExpansion,
    zeroResultsDetected,
    index
  );

  const endTime =
    typeof performance !== "undefined" ? performance.now() : Date.now();
  const executionTimeMs = Number(Math.max(0.05, endTime - startTime).toFixed(2));

  return {
    query: rawQuery,
    normalizedQuery,
    correctedQuery,
    usedSynonymExpansion,
    tokenAnalysis,
    results: filteredResults,
    totalUnfilteredMatches,
    zeroResultsDetected,
    suggestedAlternatives,
    autocompleteSuggestions,
    topPreviewProduct:
      filteredResults.length > 0 ? filteredResults[0].product : null,
    executionTimeMs,
    indexStats: {
      totalProducts: index.entries.length,
      uniqueVocabularyTerms: index.vocabulary.length,
      invertedIndexEntries: index.invertedIndexEntryCount,
    },
  };
}

function generateAutocompleteSuggestions(
  rawQuery: string,
  normalizedQuery: string,
  correctedQuery: string | null,
  currentResults: ScoredProductResult[],
  index: CatalogSearchIndex
): AutocompleteSuggestion[] {
  if (!normalizedQuery) {
    return CURATED_POPULAR_SEARCHES.slice(0, 6).map((item) => ({
      text: item.query,
      type: "popular",
      matchedPrefix: "",
      boldRemainder: item.query,
      badge: item.badge,
    }));
  }

  const suggestions: AutocompleteSuggestion[] = [];
  const seen = new Set<string>();
  const effectiveQuery = correctedQuery || normalizedQuery;
  const firstToken = effectiveQuery.split(" ")[0] || effectiveQuery;

  const addSuggestion = (
    text: string,
    type: AutocompleteSuggestion["type"],
    badge?: string
  ) => {
    const clean = text.toLowerCase().trim();
    if (!clean || seen.has(clean) || suggestions.length >= 6) return;
    seen.add(clean);

    if (clean.startsWith(firstToken)) {
      suggestions.push({
        text: clean,
        type,
        matchedPrefix: firstToken,
        boldRemainder: clean.slice(firstToken.length),
        badge,
      });
    } else {
      suggestions.push({
        text: clean,
        type,
        matchedPrefix: "",
        boldRemainder: clean,
        badge,
      });
    }
  };

  if (correctedQuery && correctedQuery !== normalizedQuery) {
    addSuggestion(correctedQuery, "correction", "Predloženi ispravak");
  }

  for (const item of CURATED_POPULAR_SEARCHES) {
    const normItem = normalizeText(item.query);
    if (
      normItem.startsWith(effectiveQuery) ||
      normItem.startsWith(firstToken) ||
      normItem.includes(effectiveQuery)
    ) {
      addSuggestion(
        item.query,
        suggestions.length === 0 ? "popular" : "completion",
        item.badge
      );
    }
  }

  for (const res of currentResults.slice(0, 5)) {
    const pName = res.product.name.toLowerCase();
    addSuggestion(pName, "completion", res.product.brand);
  }

  if (suggestions.length < 6 && effectiveQuery.length >= 2) {
    const prefix = effectiveQuery.slice(0, Math.min(3, effectiveQuery.length));
    const vocabSet = index.prefixToVocab.get(prefix);
    if (vocabSet) {
      for (const word of vocabSet) {
        if (word.startsWith(effectiveQuery)) {
          addSuggestion(word, "completion");
        }
      }
    }
  }

  return suggestions.slice(0, 6);
}

function generateSuggestedAlternatives(
  rawQuery: string,
  normalizedQuery: string,
  correctedQuery: string | null,
  usedSynonymExpansion: Array<{ from: string; to: string[] }>,
  zeroResultsDetected: boolean,
  index: CatalogSearchIndex
): string[] {
  const suggestions: string[] = [];
  const seen = new Set<string>([normalizedQuery]);

  const addAlt = (s: string) => {
    const clean = s.toLowerCase().trim();
    if (clean && !seen.has(clean) && suggestions.length < 6) {
      seen.add(clean);
      suggestions.push(clean);
    }
  };

  if (correctedQuery) {
    addAlt(correctedQuery);
  }

  for (const synGroup of usedSynonymExpansion) {
    for (const syn of synGroup.to.slice(0, 3)) {
      if (index.tokenToProductIds.has(syn)) {
        addAlt(syn);
      }
    }
  }

  if (zeroResultsDetected || suggestions.length < 5) {
    addAlt("zlatni prsten kameja");
    addAlt("splitske košarice");
    addAlt("šibenski botun");
    addAlt("paške peružine biseri");
    addAlt("dubrovačke naušnice koralj");
    addAlt("astera safir ogrlica");
  }

  return suggestions.slice(0, 6);
}

export function runCatalogScaleBenchmark(
  baseProducts: SearchableProduct[],
  targetSize: number,
  sampleQuery = "zlatni prsten kameja"
): {
  catalogSize: number;
  indexBuildTimeMs: number;
  searchExecutionTimeMs: number;
  matchedCount: number;
} {
  const synthetic: SearchableProduct[] = [];
  for (let i = 0; i < targetSize; i++) {
    const template = baseProducts[i % baseProducts.length];
    synthetic.push({
      ...template,
      id: `${template.id}-bench-${i}`,
      name:
        i < baseProducts.length
          ? template.name
          : `${template.name} Edicija #${i}`,
    });
  }

  const t0 =
    typeof performance !== "undefined" ? performance.now() : Date.now();
  const tempIndex = new CatalogSearchIndex(synthetic);
  const t1 =
    typeof performance !== "undefined" ? performance.now() : Date.now();

  cachedIndex = { ref: synthetic, len: synthetic.length, index: tempIndex };
  const result = executeIntelligentSearch(synthetic, sampleQuery);
  const t2 =
    typeof performance !== "undefined" ? performance.now() : Date.now();

  cachedIndex = null;

  return {
    catalogSize: targetSize,
    indexBuildTimeMs: Number(Math.max(0.1, t1 - t0).toFixed(2)),
    searchExecutionTimeMs: Number(
      Math.max(0.05, t2 - t1 || result.executionTimeMs).toFixed(2)
    ),
    matchedCount: result.results.length,
  };
}
