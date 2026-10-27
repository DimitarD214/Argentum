/**
 * GDPR / ePrivacy consent state (framework-agnostic, no React).
 *
 * Categories
 *  - necessary   : cart, checkout, authentication, this consent record. Always on, no opt-in needed.
 *  - preferences : personalisation stored on the device (recently viewed, preferred metal, ring size).
 *  - analytics   : audience / search analytics (GA4 + on-device search analytics).
 *  - marketing   : advertising pixels (Meta Pixel).
 *
 * Nothing non-essential may read or write storage, or load a third-party script, until the
 * matching flag is `true`. Default (no record) = everything except `necessary` is OFF.
 */

export const CONSENT_KEY = "astera-cookie-consent-v1";
export const CONSENT_CHANGED_EVENT = "astera:consent-changed";
export const OPEN_COOKIE_SETTINGS_EVENT = "astera:open-cookie-settings";

export type ConsentCategory = "preferences" | "analytics" | "marketing";

export interface ConsentState {
  version: 1;
  necessary: true;
  preferences: boolean;
  analytics: boolean;
  marketing: boolean;
  decidedAt: string;
}

/** localStorage keys owned by each optional category – purged on withdrawal. */
const CATEGORY_STORAGE_KEYS: Record<ConsentCategory, string[]> = {
  preferences: ["astera-customer-preferences"],
  analytics: ["astera-jewelry-search-analytics-v2"],
  marketing: [],
};

/** Cookie name prefixes set by third-party scripts we may load after consent. */
const CATEGORY_COOKIE_PREFIXES: Record<ConsentCategory, string[]> = {
  preferences: [],
  analytics: ["_ga", "_gid", "_gat"],
  marketing: ["_fbp", "_fbc"],
};

let cachedRaw: string | null | undefined;
let cachedValue: ConsentState | null = null;

export function readConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
  if (raw === cachedRaw) return cachedValue;
  cachedRaw = raw;
  try {
    const parsed = raw ? (JSON.parse(raw) as ConsentState) : null;
    cachedValue = parsed && parsed.version === 1 ? parsed : null;
  } catch {
    cachedValue = null;
  }
  return cachedValue;
}

export function hasConsent(category: ConsentCategory): boolean {
  return readConsent()?.[category] === true;
}

function deleteCookiesWithPrefix(prefixes: string[]) {
  if (typeof document === "undefined" || prefixes.length === 0) return;
  const host = window.location.hostname;
  const domains = [host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  document.cookie.split(";").forEach((c) => {
    const name = c.split("=")[0].trim();
    if (prefixes.some((p) => name.startsWith(p))) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
      domains.forEach((d) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${d}`;
      });
    }
  });
}

/** Persist a decision. Returns true when any previously granted category was withdrawn. */
export function writeConsent(
  choice: Pick<ConsentState, ConsentCategory>
): { withdrew: boolean } {
  const previous = readConsent();
  const next: ConsentState = {
    version: 1,
    necessary: true,
    preferences: choice.preferences,
    analytics: choice.analytics,
    marketing: choice.marketing,
    decidedAt: new Date().toISOString(),
  };

  let withdrew = false;
  (Object.keys(CATEGORY_STORAGE_KEYS) as ConsentCategory[]).forEach((cat) => {
    if (previous?.[cat] && !next[cat]) withdrew = true;
    if (!next[cat]) {
      CATEGORY_STORAGE_KEYS[cat].forEach((k) => {
        try {
          window.localStorage.removeItem(k);
        } catch {
          /* ignore */
        }
      });
      deleteCookiesWithPrefix(CATEGORY_COOKIE_PREFIXES[cat]);
    }
  });

  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable – consent stays session-less, optional features remain off */
  }
  window.dispatchEvent(new Event(CONSENT_CHANGED_EVENT));
  return { withdrew };
}

export function subscribeConsent(callback: () => void): () => void {
  window.addEventListener(CONSENT_CHANGED_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CONSENT_CHANGED_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function openCookieSettings() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT));
  }
}