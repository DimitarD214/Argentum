const Stripe = require('stripe');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function seed() {
  console.log('🚀 Starting Stripe Seeding...');
  
  const productsPath = path.join(__dirname, '../src/data/products.json');
  const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

  for (const product of products) {
    try {
      console.log(`📦 Creating Product: ${product.name}`);
      
      const stripeProduct = await stripe.products.create({
        name: product.name,
        description: product.description,
        images: product.images.map(img => `https://astera-stil.vercel.app${img}`), // Using a placeholder base URL
        metadata: {
          original_id: product.id,
          category: product.category,
          theme: product.theme,
          stoneColor: product.stoneColor,
          materials: product.material.join(',')
        }
      });

      // Create Prices for each material
      for (const [materialKey, priceAmount] of Object.entries(product.price)) {
        await stripe.prices.create({
          product: stripeProduct.id,
          unit_amount: priceAmount * 100, // Stripe uses cents
          currency: 'eur',
          metadata: {
            material: materialKey
          }
        });
        console.log(`   💰 Price created for ${materialKey}: ${priceAmount} EUR`);
      }

      console.log(`✅ ${product.name} synced successfully.`);
    } catch (err) {
      console.error(`❌ Error syncing ${product.name}:`, err.message);
    }
  }

  console.log('✨ Seeding complete!');
}

seed();
