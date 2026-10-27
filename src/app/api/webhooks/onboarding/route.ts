import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy', {
  apiVersion: '2026-02-25.clover',
});

// Use the service role key to securely bypass RLS and update profiles
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function POST(req: NextRequest) {
  try {
    // 1. Verify Authorization Header (Security)
    const authHeader = req.headers.get('authorization');
    const secret = process.env.ONBOARDING_WEBHOOK_SECRET;

    // In development, you might not have the secret set yet, so we only enforce if it exists
    if (secret && authHeader !== `Bearer ${secret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await req.json();
    const user = payload.record;

    if (!user || !user.email || !user.id) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    // 2. Create Stripe Customer natively
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: {
        supabase_uid: user.id,
      },
    });

    // 3. Update or Insert Supabase Profile with the new Stripe Customer ID
    const { error: dbError } = await supabaseAdmin
      .from('profiles')
      .upsert({
        id: user.id,
        email: user.email,
        full_name: user.raw_user_meta_data?.full_name || null,
        avatar_url: user.raw_user_meta_data?.avatar_url || null,
        stripe_customer_id: customer.id,
        updated_at: new Date().toISOString(),
      });

    if (dbError) {
      console.error('Error updating profile with Stripe ID:', dbError);
      return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
    }

    return NextResponse.json({ success: true, customerId: customer.id }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    console.error('Native Onboarding Webhook Error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
