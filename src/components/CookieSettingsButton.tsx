"use client";

import { openCookieSettings } from "@/lib/consent";

/** Footer control that reopens the cookie dialog so consent can be changed or withdrawn. */
export default function CookieSettingsButton({ className = "" }: { className?: string }) {
  return (
    <button type="button" onClick={openCookieSettings} className={`cursor-pointer ${className}`}>
      Postavke kolačića
    </button>
  );
}