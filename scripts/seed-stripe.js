const Stripe = require('stripe');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function syncAndTest() {
  console.log('🚀 Connecting to Stripe Account for Golden Lady Jewelry...');

  const account = await stripe.accounts.retrieve();
  console.log(`✅ Connected to Stripe Account: ${account.id} (Country: ${account.country}, Currency: ${account.default_currency})`);

  const productsPath = path.join(__dirname, '../src/data/products.json');
  const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

  const existing = await stripe.products.list({ limit: 100, active: true });
  const existingByOriginalId = new Map();
  for (const p of existing.data) {
    if (p.metadata && p.metadata.original_id) {
      existingByOriginalId.set(p.metadata.original_id, p);
    }
  }

  let syncedCount = 0;
  for (const product of products) {
    if (existingByOriginalId.has(product.id)) {
      syncedCount++;
      continue;
    }
    try {
      const stripeProduct = await stripe.products.create({
        name: product.name,
        description: product.description,
        metadata: {
          shop_name: 'Golden Lady Jewelry',
          original_id: product.id,
          line: product.line || 'astera-nakit',
          subcategory: product.subcategory || '',
          category: product.category || 'Jewelry',
          theme: product.theme || '',
          stoneColor: product.stoneColor || '',
          materials: (product.material || []).join(','),
        },
      });

      for (const [materialKey, priceAmount] of Object.entries(product.price || {})) {
        await stripe.prices.create({
          product: stripeProduct.id,
          unit_amount: Math.round(Number(priceAmount) * 100),
          currency: 'eur',
          metadata: {
            material: materialKey,
            shop_name: 'Golden Lady Jewelry',
          },
        });
      }
      syncedCount++;
      console.log(`   ✅ Synced Product: ${product.name}`);
    } catch (err) {
      console.error(`   ❌ Error syncing ${product.name}:`, err.message);
    }
  }
  console.log(`✨ Total catalog products active in Stripe: ${syncedCount}/${products.length}`);

  console.log('\n💳 Running Test Payment #1 (Astera Nocturne Safirna Ogrlica - €680.00)...');
  const pi1 = await stripe.paymentIntents.create({
    amount: 68000,
    currency: 'eur',
    payment_method: 'pm_card_visa',
    confirm: true,
    automatic_payment_methods: {
      enabled: true,
      allow_redirects: 'never',
    },
    description: 'Golden Lady Jewelry — Test Payment #1: Astera Nocturne Safirna Ogrlica (14k Zlato)',
    metadata: {
      shop_name: 'Golden Lady Jewelry',
      product_id: 'astera-nocturne-safirna-ogrlica',
      metal: '14k Zlato',
      delivery_method: 'free_delivery',
      shipping_cost: '0.00 EUR',
      shipping_address: 'Ilica 15, 10000 Zagreb, Croatia',
    },
  });
  console.log(`   ✅ Test Payment #1 Status: ${pi1.status.toUpperCase()} | ID: ${pi1.id} | Amount: €${(pi1.amount / 100).toFixed(2)}`);

  console.log('\n💳 Running Test Payment #2 (Splitske Zlatne Košarice - €520.00)...');
  const pi2 = await stripe.paymentIntents.create({
    amount: 52000,
    currency: 'eur',
    payment_method: 'pm_card_visa',
    confirm: true,
    automatic_payment_methods: {
      enabled: true,
      allow_redirects: 'never',
    },
    description: 'Golden Lady Jewelry — Test Payment #2: Splitske Zlatne Košarice (14k Zlato)',
    metadata: {
      shop_name: 'Golden Lady Jewelry',
      product_id: 'splitske-kosarice',
      metal: '14k Zlato',
      delivery_method: 'free_delivery',
      shipping_cost: '0.00 EUR',
      shipping_address: 'Riva 10, 21000 Split, Croatia',
    },
  });
  console.log(`   ✅ Test Payment #2 Status: ${pi2.status.toUpperCase()} | ID: ${pi2.id} | Amount: €${(pi2.amount / 100).toFixed(2)}`);

  console.log('\n🛒 Verifying Stripe Checkout Session Creation (with Free Delivery)...');
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Zlatni Prsten Kameja',
            description: '14k Zlato • Golden Lady Jewelry',
          },
          unit_amount: 44000,
        },
        quantity: 1,
      },
    ],
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: 0, currency: 'eur' },
          display_name: 'Besplatna dostava na adresu (Golden Lady Jewelry)',
        },
      },
    ],
    success_url: 'http://localhost:3000/checkout/success?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'http://localhost:3000/checkout',
    metadata: {
      shop_name: 'Golden Lady Jewelry',
      delivery_method: 'free_delivery',
    },
  });
  console.log(`   ✅ Checkout Session Created: ${session.id}`);
  console.log(`   🔗 Checkout URL: ${session.url}`);
}

syncAndTest().catch((err) => {
  console.error('❌ Stripe Test Failed:', err);
  process.exit(1);
});
