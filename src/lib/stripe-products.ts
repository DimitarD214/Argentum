import localProducts from '@/data/products.json';

interface RawCatalogProduct {
  id: string;
  name: string;
  description: string | null;
  images?: string[];
  brand?: string;
  tags?: string[];
  rating?: number;
  reviewCount?: number;
  basePrice?: number;
  updatedAt?: string;
  priceHistory30d?: Record<string, number>;
  category?: string;
  line?: string;
  subcategory?: string;
  theme?: string;
  stoneColor?: string;
  material?: string[];
  badges?: string[];
  price?: {
    gold_14k?: number;
    sterling_silver?: number;
    rose_gold?: number;
  };
}

export interface StripeProduct {
  id: string;
  name: string;
  description: string | null;
  images: string[];
  brand?: string;
  tags?: string[];
  rating?: number;
  reviewCount?: number;
  basePrice?: number;
  /** ISO date of the last catalogue change (used for sitemap lastModified) */
  updatedAt?: string;
  /** Lowest price in the 30 days before a reduction, per metal (ZZP čl. 19) – see lib/pricing.ts */
  priceHistory30d?: Record<string, number>;
  metadata: {
    original_id?: string;
    category?: string;
    line?: string;
    subcategory?: string;
    theme?: string;
    stoneColor?: string;
    materials?: string;
    badges?: string;
    brand?: string;
    tags?: string;
    rating?: string;
    reviewCount?: string;
    basePrice?: string;
  };
  prices: {
    id: string;
    unit_amount: number | null;
    currency: string;
    metadata: {
      material?: string;
    };
  }[];
}

export async function getStripeProducts(): Promise<StripeProduct[]> {
  return (localProducts as RawCatalogProduct[])
    .filter((p) => p.category !== 'Vjerski nakit' && p.line !== 'vjerski-nakit')
    .map((p) => {
      const prices: StripeProduct['prices'] = [];
      if (p.price?.gold_14k) {
        prices.push({
          id: `price_${p.id}_gold_14k`,
          unit_amount: Math.round(p.price.gold_14k * 100),
          currency: 'eur',
          metadata: { material: 'gold_14k' },
        });
      }
      if (p.price?.sterling_silver) {
        prices.push({
          id: `price_${p.id}_sterling_silver`,
          unit_amount: Math.round(p.price.sterling_silver * 100),
          currency: 'eur',
          metadata: { material: 'sterling_silver' },
        });
      }
      if (p.price?.rose_gold) {
        prices.push({
          id: `price_${p.id}_rose_gold`,
          unit_amount: Math.round(p.price.rose_gold * 100),
          currency: 'eur',
          metadata: { material: 'rose_gold' },
        });
      }

      const defaultBasePrice =
        p.basePrice ??
        p.price?.gold_14k ??
        p.price?.sterling_silver ??
        p.price?.rose_gold ??
        0;

      return {
        id: p.id,
        name: p.name,
        description: p.description,
        images: p.images || [],
        brand: p.brand || 'Astera Atelier',
        tags: Array.isArray(p.tags) ? p.tags : [],
        rating: typeof p.rating === 'number' ? p.rating : 4.8,
        reviewCount: typeof p.reviewCount === 'number' ? p.reviewCount : 120,
        basePrice: defaultBasePrice,
        updatedAt: typeof p.updatedAt === 'string' ? p.updatedAt : undefined,
        priceHistory30d: p.priceHistory30d || undefined,
        metadata: {
          original_id: p.id,
          category: p.category,
          line: p.line,
          subcategory: p.subcategory,
          theme: p.theme,
          stoneColor: p.stoneColor,
          materials: Array.isArray(p.material) ? p.material.join(',') : '',
          badges: Array.isArray(p.badges) ? p.badges.join(',') : '',
          brand: p.brand || 'Astera Atelier',
          tags: Array.isArray(p.tags) ? p.tags.join(',') : '',
          rating: String(p.rating ?? 4.8),
          reviewCount: String(p.reviewCount ?? 120),
          basePrice: String(defaultBasePrice),
        },
        prices,
      };
    });
}
