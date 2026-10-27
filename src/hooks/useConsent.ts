"use client";

import { useSyncExternalStore } from "react";
import { readConsent, subscribeConsent, type ConsentState } from "@/lib/consent";

/** Reactive consent state. `null` = no decision yet (or server render) => treat as "no consent". */
export function useConsent(): ConsentState | null {
  return useSyncExternalStore(subscribeConsent, readConsent, () => null);
}