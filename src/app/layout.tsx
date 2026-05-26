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
  title: 'Astera | Artisan Jewelry - Spring 2026',
  description: 'Exquisite handcrafted jewelry featuring pristine emeralds, crystal, and authentic European craftsmanship.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en' className={fontSerif.variable + ' ' + fontSans.variable}>
       <body className='min-h-screen flex flex-col antialiased'>
         <main className='flex-1 px-4 md:px-8 lg:px-12'>
           {children}
         </main>
         <StoreHydration />
         <Toaster position='top-center' richColors />
       </body>
    </html>
  );
}
