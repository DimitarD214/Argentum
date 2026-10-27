import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import StoreHydration from "@/components/StoreHydration";
import WhatsAppFab from "@/components/WhatsAppFab";
import CookieConsent from "@/components/CookieConsent";
import ConsentScripts from "@/components/ConsentScripts";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/lib/company";
import { buildJewelryStoreJsonLd } from "@/lib/seo";

const fontSerif = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const fontSans = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  title: {
    default: "Astera | Definiran posebnošću",
    template: "%s | Astera",
  },
  description:
    "Luksuzni Astera i tradicijski hrvatski nakit ručne izrade u 14-karatnom zlatu i srebru. Definiran posebnošću.",
  openGraph: {
    title: "Astera | Definiran posebnošću",
    description:
      "Luksuzni Astera i tradicijski hrvatski nakit ručne izrade u 14-karatnom zlatu i srebru.",
    url: SITE_URL,
    siteName: "Astera",
    images: [
      {
        url: "/images/astera-showcase.jpg",
        width: 1200,
        height: 630,
        alt: "Astera Nakit — Definiran posebnošću",
      },
    ],
    locale: "hr_HR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Astera | Definiran posebnošću",
    description:
      "Luksuzni Astera i tradicijski hrvatski nakit ručne izrade u 14-karatnom zlatu i srebru.",
    images: ["/images/astera-showcase.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hr" className={`${fontSerif.variable} ${fontSans.variable}`}>
      <body className="min-h-screen flex flex-col antialiased bg-cream text-charcoal font-sans">
        {/* JewelryStore / LocalBusiness structured data (site-wide, incl. homepage) */}
        <JsonLd data={buildJewelryStoreJsonLd()} />
        {/* Each page renders its own <main>; a wrapper <div> avoids nested <main> landmarks. */}
        <div className="flex-1 w-full">{children}</div>
        <WhatsAppFab />
        <StoreHydration />
        <Toaster position="top-center" richColors />
        {/* GDPR / ePrivacy: banner + the only gateway for third-party analytics/marketing scripts */}
        <CookieConsent />
        <ConsentScripts />
      </body>
    </html>
  );
}