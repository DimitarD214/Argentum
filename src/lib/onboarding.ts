import { supabase } from './supabase';

/**
 * Triggers the n8n onboarding webhook for a new user.
 */
export async function triggerOnboardingWebhook(userId: string, email: string) {
  const webhookUrl = process.env.NEXT_PUBLIC_N8N_ONBOARDING_WEBHOOK;
  if (!webhookUrl) {
    console.error('n8n webhook URL is missing');
    return;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, email }),
    });

    if (!response.ok) {
      throw new Error('Failed to trigger onboarding: ' + response.statusText);
    }
  } catch (error) {
    console.error('Error triggering onboarding webhook:', error);
  }
}

/**
 * Polls the profiles table for a stripe_customer_id.
 */
export async function pollForStripeCustomerId(userId: string, maxAttempts = 10, interval = 3000): Promise<string | null> {
  for (let i = 0; i < maxAttempts; i++) {
    const { data, error } = await supabase
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error polling for Stripe ID:', error.message);
      return null;
    }

    if (data?.stripe_customer_id) {
      return data.stripe_customer_id;
    }

    // Wait before next attempt
    await new Promise((resolve) => setTimeout(resolve, interval));
  }

  return null;
}
