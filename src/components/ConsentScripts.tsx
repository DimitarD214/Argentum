"use client";

import Script from "next/script";
import { useConsent } from "@/hooks/useConsent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID?.trim() ?? "";
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() ?? "";

// Defensive validation – IDs are interpolated into inline scripts.
const validGa = /^G-[A-Z0-9]{4,}$/.test(GA_ID) ? GA_ID : "";
const validPixel = /^\d{5,}$/.test(META_PIXEL_ID) ? META_PIXEL_ID : "";

/**
 * The ONLY place where third-party analytics / marketing scripts are loaded.
 * Nothing is rendered (and therefore nothing executes, no request leaves the browser)
 * until the visitor has explicitly opted in to the respective category.
 * To add another tracker, add it here behind the matching consent flag.
 */
export default function ConsentScripts() {
  const consent = useConsent();
  if (!consent) return null;

  return (
    <>
      {consent.analytics && validGa && (
        <>
          <Script
            id="ga4-loader"
            src={`https://www.googletagmanager.com/gtag/js?id=${validGa}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${validGa}',{anonymize_ip:true});`}
          </Script>
        </>
      )}

      {consent.marketing && validPixel && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${validPixel}');fbq('track','PageView');`}
        </Script>
      )}
    </>
  );
}