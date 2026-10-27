import type { StateStorage } from "zustand/middleware";
import { hasConsent, type ConsentCategory } from "@/lib/consent";

/**
 * zustand `persist` storage that refuses to read or write the device until the user has opted in
 * to the given consent category (ePrivacy – non-essential storage requires prior consent).
 * Without consent the store still works in memory for the current page view only.
 */
export function consentStorage(category: ConsentCategory): StateStorage {
  return {
    getItem: (name) => {
      if (typeof window === "undefined" || !hasConsent(category)) return null;
      return window.localStorage.getItem(name);
    },
    setItem: (name, value) => {
      if (typeof window === "undefined" || !hasConsent(category)) return;
      window.localStorage.setItem(name, value);
    },
    removeItem: (name) => {
      if (typeof window === "undefined") return;
      window.localStorage.removeItem(name);
    },
  };
}