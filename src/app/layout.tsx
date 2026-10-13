import type { Metadata } from 'next';
import { Playfair_Display, Montserrat } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import StoreHydration from '@/components/StoreHydration';

const fontSerif = Playfair_Display({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['400', '700', '900'],
});

const fontSans = Montserrat({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://astera.com'),
  title: {
    default: 'Astera | Artisan Jewelry - Spring 2026',
    template: '%s | Astera'
  },
  description: 'Exquisite handcrafted jewelry featuring pristine emeralds, crystal, and authentic European craftsmanship.',
  openGraph: {
    title: 'Astera | Artisan Jewelry',
    description: 'Exquisite handcrafted jewelry featuring pristine emeralds, crystal, and authentic European craftsmanship.',
    url: 'https://astera.com',
    siteName: 'Astera',
    images: [
      {
        url: '/emerald-butterfly-ring.png',
        width: 1200,
        height: 630,
        alt: 'Astera Jewelry',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Astera | Artisan Jewelry',
    description: 'Exquisite handcrafted jewelry featuring pristine emeralds, crystal, and authentic European craftsmanship.',
    images: ['/emerald-butterfly-ring.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en' className={`${fontSerif.variable} ${fontSans.variable}`}>
       <body className={`min-h-screen flex flex-col antialiased bg-white text-charcoal font-sans`}>
         <main className='flex-1 w-full'>
           {children}
         </main>
         <StoreHydration />
         <Toaster position='top-center' richColors />
       </body>
    </html>
  );
}
