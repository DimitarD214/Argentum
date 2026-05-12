import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_dummy", {
  apiVersion: "2024-06-20", 
});

export async function POST(req: NextRequest) {
  try {
    const { items, metadata, currency = 'eur' } = await req.json();

    if (!items || items.length === 0) {
      throw new Error("No items in checkout.");
    }

    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
          description: item.metal ?? "Premium Jewelry",
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

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
        source: "argentum-storefront",
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
