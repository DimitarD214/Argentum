import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_dummy");

export interface StripeProduct {
  id: string;
  name: string;
  description: string | null;
  images: string[];
  metadata: {
    original_id?: string;
    category?: string;
    theme?: string;
    stoneColor?: string;
    materials?: string;
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
  const products = await stripe.products.list({ active: true, expand: ['data.default_price'] });
  const allPrices = await stripe.prices.list({ active: true });

  return products.data.map((product) => {
    const productPrices = allPrices.data.filter((p) => p.product === product.id);
    
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      images: product.images,
      metadata: product.metadata as any,
      prices: productPrices.map((price) => ({
        id: price.id,
        unit_amount: price.unit_amount,
        currency: price.currency,
        metadata: price.metadata as any,
      })),
    };
  });
}
