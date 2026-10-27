import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import products from "@/data/products.json";
import { createClient } from "@/utils/supabase/server";

interface CheckoutLineInput {
  id: string;
  name?: string;
  price?: number;
  quantity?: number;
  metal?: string;
  size?: string;
}

type CatalogProduct = (typeof products)[number];

function mapMetalToKey(metal: string): string {
  const m = metal.toLowerCase();
  if (m.includes("silver") || m.includes("srebro")) return "sterling_silver";
  if (m.includes("rose") || m.includes("rozo")) return "rose_gold";
  if (m.includes("14k") || m.includes("gold") || m.includes("zlato")) return "gold_14k";
  if (m.includes("platinum") || m.includes("platina")) return "platinum";
  return m.replace(/\s+/g, "_");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_dummy", {
  apiVersion: "2026-02-25.clover",
});

export async function POST(req: NextRequest) {
  try {
    // Currency is fixed server-side: the shop sells in EUR only (never trust a client-supplied currency).
    const currency = "eur";
    const { items, metadata, saveAsDefault } = (await req.json()) as {
      items?: CheckoutLineInput[];
      metadata?: Record<string, string>;
      saveAsDefault?: boolean;
    };

    // Consumer-law safeguard: the order may only be placed after the T&C checkbox was ticked.
    if (metadata?.terms_accepted !== "true") {
      return NextResponse.json(
        { error: "Za naručivanje je potrebno prihvatiti Opće uvjete poslovanja." },
        { status: 400 }
      );
    }

    try {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user && saveAsDefault) {
        await supabase
          .from("profiles")
          .update({
            default_delivery_method: "free_delivery",
            default_boxnow_locker_id: null,
            default_shipping_address: metadata?.shipping_address
              ? JSON.parse(metadata.shipping_address)
              : null,
          })
          .eq("id", user.id);
      }
    } catch (profileErr) {
      console.warn("Skipping profile update during checkout:", profileErr);
    }

    if (!items || items.length === 0) {
      throw new Error("Košarica je prazna.");
    }

    const lineItems = items.map((item: CheckoutLineInput) => {
      const product: CatalogProduct | undefined = products.find((p) => p.id === item.id);

      let price = Number(item.price) || 0;
      if (product) {
        const priceMap = product.price as Record<string, number | undefined>;
        if (item.metal) {
          const metalKey = mapMetalToKey(item.metal);
          const mappedPrice = priceMap?.[metalKey];
          if (typeof mappedPrice === "number") {
            price = mappedPrice;
          } else {
            price =
              priceMap?.gold_14k ||
              priceMap?.sterling_silver ||
              Number(item.price) ||
              0;
          }
        } else {
          price =
            typeof product.price === "number"
              ? product.price
              : (Object.values(priceMap)[0] as number) || 0;
        }
      }

      return {
        price_data: {
          currency: currency,
          product_data: {
            name: product ? product.name : item.name || "Astera",
            description: `${item.metal || "14k Zlato"}${
              item.size ? ` • Veličina ${item.size}` : ""
            } • Astera`,
            ...(item.size ? { metadata: { ring_size: String(item.size) } } : {}),
          },
          unit_amount: Math.round(price * 100),
        },
        quantity: item.quantity || 1,
      };
    });

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      req.nextUrl.origin ||
      "http://localhost:3000";

    const sessionOptions: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: currency,
            },
            display_name: "Besplatna dostava na adresu (Astera)",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 2 },
              maximum: { unit: "business_day", value: 4 },
            },
          },
        },
      ],
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout`,
      invoice_creation: {
        enabled: true,
      },
      payment_intent_data: {
        description: "Astera — Webshop Narudžba",
        metadata: {
          ...(metadata || {}),
          shop_name: "Astera",
        },
      },
      metadata: {
        ...(metadata || {}),
        shop_name: "Astera",
        source: "astera-storefront",
      },
    };

    if (metadata?.email && metadata.email.trim() !== "") {
      sessionOptions.customer_email = metadata.email.trim();
    }

    const session = await stripe.checkout.sessions.create(sessionOptions);

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Pogreška prilikom naplate.";
    console.error("Stripe Checkout Error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
