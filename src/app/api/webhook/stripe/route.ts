import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { processBoxNowDelivery } from "@/lib/boxnow";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_dummy", {
  apiVersion: "2025-04-30.basil" as any,
});

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  let event: Stripe.Event;

  // ── Verify Webhook Signature ──
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  // ── Handle checkout.session.completed ──
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    console.log("══════════════════════════════════════");
    console.log("✅ PAYMENT RECEIVED");
    console.log("   Session ID:", session.id);
    console.log("   Customer Email:", session.customer_details?.email);
    console.log("   Amount:", (session.amount_total || 0) / 100, session.currency?.toUpperCase());

    try {
      // Expand: get the line items for this session
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
        limit: 100,
      });

      // Build the fulfillment payload
      const payload = {
        event: "order.completed",
        sessionId: session.id,
        customer: {
          email: session.customer_details?.email,
          name: session.customer_details?.name,
          phone: session.customer_details?.phone,
        },
        shipping: session.shipping_details,
        lineItems: lineItems.data.map((item) => ({
          name: item.description,
          quantity: item.quantity,
          amount: (item.amount_total || 0) / 100,
          currency: item.currency,
        })),
        total: {
          amount: (session.amount_total || 0) / 100,
          currency: session.currency,
        },
        metadata: session.metadata,
        created: new Date().toISOString(),
      };

            // Save to Supabase Orders
      const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      
      const { data: order, error: orderError } = await supabaseAdmin.from('orders').insert({
        id: session.id,
        user_email: session.customer_details?.email,
        total_amount: (session.amount_total || 0) / 100,
        delivery_method: session.metadata?.delivery_method,
        boxnow_locker_id: session.metadata?.boxNowLocation,
        shipping_address: session.metadata?.shipping_address ? JSON.parse(session.metadata.shipping_address) : null,
        status: 'paid'
      }).select().single();

      if (orderError) {
        console.error('Failed to save order to Supabase:', orderError);
      } else {
        console.log('Order saved to Supabase');
        // Handle Box Now fulfillment
        if (session.metadata?.delivery_method === 'boxnow' && session.metadata?.boxNowLocation) {
          await processBoxNowDelivery(session.id, session.metadata.boxNowLocation, {
            name: session.customer_details?.name,
            email: session.customer_details?.email,
            phone: session.metadata?.phone || session.customer_details?.phone
          });
        }
      }

      console.log("   Line Items:", lineItems.data.length);
      console.log("   Forwarding to n8n...");

      // Forward to n8n
      const n8nUrl = process.env.N8N_WEBHOOK_URL;
      if (n8nUrl) {
        const n8nResponse = await fetch(n8nUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        console.log("   n8n Response:", n8nResponse.status);
      } else {
        console.warn("   ⚠️ N8N_WEBHOOK_URL not configured, skipping forward");
      }

      console.log("══════════════════════════════════════");
    } catch (err: any) {
      console.error("❌ Error processing webhook:", err.message);
    }
  }

  return NextResponse.json({ received: true });
}
