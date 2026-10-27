"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useConsent } from "@/hooks/useConsent";
import {
  OPEN_COOKIE_SETTINGS_EVENT,
  readConsent,
  writeConsent,
  type ConsentCategory,
} from "@/lib/consent";
import { useIsMounted } from "@/lib/utils";

type Choice = Record<ConsentCategory, boolean>;

const CATEGORIES: { key: ConsentCategory; title: string; text: string }[] = [
  {
    key: "preferences",
    title: "Funkcionalni (preference)",
    text: "Pamte nedavno pregledane komade, preferirani metal i veličinu prstena na vašem uređaju.",
  },
  {
    key: "analytics",
    title: "Analitički",
    text: "Pomažu nam razumjeti kako se stranica koristi (Google Analytics, analitika pretraživanja).",
  },
  {
    key: "marketing",
    title: "Marketinški",
    text: "Omogućuju mjerenje učinkovitosti oglasa i prikaz relevantnih oglasa (Meta Pixel).",
  },
];

/**
 * Cookie banner (GDPR + ePrivacy / ZEK).
 *  - "Odbij sve" and "Prihvati sve" have identical prominence.
 *  - Nothing optional is pre-selected; no non-essential script or storage runs before opt-in
 *    (see <ConsentScripts /> and consentStorage()).
 *  - Can be reopened any time via the footer ("Postavke kolačića") to withdraw consent.
 */
export default function CookieConsent() {
  const consent = useConsent();
  const mounted = useIsMounted();
  const [forceOpen, setForceOpen] = useState(false);
  const [details, setDetails] = useState(false);
  const [choice, setChoice] = useState<Choice>({
    preferences: false,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const open = () => {
      const current = readConsent();
      if (current) {
        setChoice({
          preferences: current.preferences,
          analytics: current.analytics,
          marketing: current.marketing,
        });
      }
      setForceOpen(true);
      setDetails(true);
    };
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, open);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, open);
  }, []);

  if (!mounted || (consent && !forceOpen)) return null;

  const save = (c: Choice) => {
    const { withdrew } = writeConsent(c);
    setForceOpen(false);
    setDetails(false);
    // Scripts that were already running cannot be unloaded – reload to guarantee they stop.
    if (withdrew) window.location.reload();
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      className="fixed inset-x-0 bottom-0 z-[300] p-3 sm:p-5"
    >
      <div className="mx-auto max-w-4xl rounded-md border border-astera-200 bg-white shadow-[0_10px_50px_rgba(0,0,0,0.2)] p-5 sm:p-7">
        <h2
          id="cookie-consent-title"
          className="font-serif text-lg tracking-wide text-astera-900 mb-2"
        >
          Vaša privatnost je važna
        </h2>
        <p className="font-sans text-[13px] leading-relaxed text-charcoal/80">
          Koristimo nužne kolačiće i pohranu za rad košarice i naplate. Uz vaš pristanak koristimo i
          funkcionalne, analitičke i marketinške tehnologije. Odbijanje ne utječe na kupnju.
          Pristanak možete povući bilo kada. Više u{" "}
          <Link href="/kolacici" className="underline underline-offset-2 hover:text-astera-700">
            Politici kolačića
          </Link>{" "}
          i{" "}
          <Link href="/pravila-privatnosti" className="underline underline-offset-2 hover:text-astera-700">
            Pravilima privatnosti
          </Link>
          .
        </p>

        {details && (
          <div className="mt-5 space-y-3 border-t border-astera-100 pt-4">
            <div className="flex items-start gap-3">
              <input type="checkbox" checked disabled className="mt-1 h-4 w-4" aria-label="Nužni kolačići" />
              <div>
                <p className="font-sans text-[13px] font-bold text-astera-900">Nužni (uvijek aktivni)</p>
                <p className="font-sans text-xs text-charcoal/70">
                  Košarica, naplata, prijava i bilježenje vaše odluke o kolačićima.
                </p>
              </div>
            </div>
            {CATEGORIES.map((cat) => (
              <label key={cat.key} className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 accent-astera-900"
                  checked={choice[cat.key]}
                  onChange={(e) => setChoice((c) => ({ ...c, [cat.key]: e.target.checked }))}
                />
                <span>
                  <span className="block font-sans text-[13px] font-bold text-astera-900">{cat.title}</span>
                  <span className="block font-sans text-xs text-charcoal/70">{cat.text}</span>
                </span>
              </label>
            ))}
          </div>
        )}

        <div className="mt-5 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-end">
          {!details && (
            <button
              type="button"
              onClick={() => setDetails(true)}
              className="font-sans text-xs font-bold uppercase tracking-widest text-astera-800 underline underline-offset-4 py-2 sm:mr-auto cursor-pointer"
            >
              Prilagodi
            </button>
          )}
          <button
            type="button"
            onClick={() => save({ preferences: false, analytics: false, marketing: false })}
            className="px-6 py-3 rounded-sm border border-astera-900 bg-white text-astera-900 font-sans text-xs font-bold uppercase tracking-[0.18em] hover:bg-astera-50 cursor-pointer"
          >
            Odbij sve
          </button>
          {details && (
            <button
              type="button"
              onClick={() => save(choice)}
              className="px-6 py-3 rounded-sm border border-astera-900 bg-white text-astera-900 font-sans text-xs font-bold uppercase tracking-[0.18em] hover:bg-astera-50 cursor-pointer"
            >
              Spremi odabir
            </button>
          )}
          <button
            type="button"
            onClick={() => save({ preferences: true, analytics: true, marketing: true })}
            className="px-6 py-3 rounded-sm border border-astera-900 bg-astera-900 text-white font-sans text-xs font-bold uppercase tracking-[0.18em] hover:bg-astera-800 cursor-pointer"
          >
            Prihvati sve
          </button>
        </div>
      </div>
    </div>
  );
}
