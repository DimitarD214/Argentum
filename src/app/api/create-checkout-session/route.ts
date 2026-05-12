import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_dummy", {
  apiVersion: "2025-04-30.basil" as any,
});

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  metal?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const cartItems: CartItem[] = body.cartItems || [];

    if (cartItems.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty" },
        { status: 400 }
      );
    }

    // Map cart items to Stripe line_items
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = cartItems.map((item) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: item.name,
          description: item.metal || "Artisan Jewelry",
        },
        unit_amount: Math.round(item.price * 100), // Convert dollars to cents
      },
      quantity: item.quantity,
    }));

    console.log("──────────────────────────────────────");
    console.log("🛒 Creating Multi-Item Checkout Session");
    console.log("   Items:", cartItems.length);
    console.log("   Products:", cartItems.map(i => `${i.name} x${i.quantity}`).join(", "));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: [
          "HR", "DE", "AT", "US", "GB", "FR", "IT", "ES",
          "NL", "BE", "CH", "SE", "DK", "NO", "FI", "IE",
          "PT", "PL", "CZ", "SI", "SK", "HU", "RO", "BG",
          "GR", "AU", "CA", "JP",
        ],
      },
      phone_number_collection: { enabled: true },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/shop`,
      metadata: {
        source: "astera-storefront",
        item_count: String(cartItems.length),
      },
    });

    console.log("✅ Session ID:", session.id);
    console.log("──────────────────────────────────────");

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (err: any) {
    console.error("❌ Stripe Checkout Error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
