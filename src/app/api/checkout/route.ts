import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import products from "@/data/products.json";

function mapMetalToKey(metal: string): string {
  const m = metal.toLowerCase();
  if (m.includes('silver')) return 'sterling_silver';
  if (m.includes('14k') && m.includes('gold')) return 'gold_14k';
  if (m.includes('rose') && m.includes('gold')) return 'rose_gold';
  if (m.includes('platinum')) return 'platinum';
  return m.replace(/ /g, '_');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_dummy", {
  apiVersion: "2024-06-20", 
});

export async function POST(req: NextRequest) {
  try {
    const { items, metadata, currency = 'eur' } = await req.json();

    if (!items || items.length === 0) {
      throw new Error("No items in checkout.");
    }

    const lineItems = items.map((item: any) => {
      const product = products.find((p: any) => p.id === item.id);
      if (!product) throw new Error(`Product ${item.id} not found.`);

      let price = 0;
      if (item.metal) {
        const metalKey = mapMetalToKey(item.metal);
        price = (product.price as any)[metalKey];
        if (price === undefined) {
          throw new Error(`Invalid metal ${item.metal} for product ${item.id}.`);
        }
      } else {
        // Fallback for flat priced items if any exist
        price = typeof product.price === 'number' ? product.price : (Object.values(product.price)[0] as number);
      }

      return {
        price_data: {
          currency: currency,
          product_data: {
            name: product.name,
            description: item.metal ?? "Premium Jewelry",
          },
          unit_amount: Math.round(price * 100),
        },
        quantity: item.quantity,
      };
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001";

    const sessionOptions: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/shop`,
      invoice_creation: {
        enabled: true,
      },
      metadata: {
        ...metadata,
        source: "astera-storefront",
      },
    };

    if (metadata.email && metadata.email.trim() !== '') {
      sessionOptions.customer_email = metadata.email;
    }

    const session = await stripe.checkout.sessions.create(sessionOptions);

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (err: any) {
    console.error("Stripe Checkout Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
