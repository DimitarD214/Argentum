import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy', {
  apiVersion: '2024-06-20',
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

    // 3. Update Supabase Profile with the new Stripe Customer ID
    const { error: dbError } = await supabaseAdmin
      .from('profiles')
      .update({ stripe_customer_id: customer.id })
      .eq('id', user.id);

    if (dbError) {
      console.error('Error updating profile with Stripe ID:', dbError);
      return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
    }

    // 4. (Optional) Boilerplate for Welcome Email via Resend
    /*
    import { Resend } from 'resend';
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: 'Astera Concierge <concierge@astera.com>',
      to: user.email,
      subject: 'Welcome to the Inner Circle',
      html: '<p>Your premium account has been fully activated.</p>'
    });
    */

    return NextResponse.json({ success: true, customerId: customer.id }, { status: 200 });

  } catch (error: any) {
    console.error('Native Onboarding Webhook Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
