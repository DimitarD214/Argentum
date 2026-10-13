import { MetadataRoute } from 'next';
import { getStripeProducts } from '@/lib/stripe-products';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getStripeProducts();
  
  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: `https://astera.com/shop/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: 'https://astera.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://astera.com/shop',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://astera.com/shop/astera-nakit',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://astera.com/shop/tradicijski-nakit',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://astera.com/shop/vjerski-nakit',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  return [...staticEntries, ...productEntries];
}
