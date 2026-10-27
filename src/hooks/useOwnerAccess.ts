"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import {
  OWNER_ADMIN_EMAIL,
  useSearchAnalyticsStore,
} from "@/store/searchAnalyticsStore";

export function useOwnerAccess() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [authLoaded, setAuthLoaded] = useState(false);

  const {
    developerMode,
    toggleDeveloperMode,
    setDeveloperMode,
    adminViewMode,
    setAdminViewMode,
  } = useSearchAnalyticsStore();

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email?.toLowerCase() || null);
      setAuthLoaded(true);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email?.toLowerCase() || null);
      setAuthLoaded(true);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Strictly hardcoded to dimitar.dimitrov1112@gmail.com
  const isOwner = userEmail === OWNER_ADMIN_EMAIL.toLowerCase();

  // Only show Dev Mode & Analytics UI when logged in as Dimitar AND in "dev" view mode
  const isCustomerPreview = isOwner && adminViewMode === "customer";
  const showDevControls = isOwner && adminViewMode === "dev";
  const effectiveDeveloperMode = showDevControls && developerMode;

  return {
    authLoaded,
    userEmail,
    isOwner,
    adminViewMode,
    setAdminViewMode,
    isCustomerPreview,
    showDevControls,
    effectiveDeveloperMode,
    developerMode,
    toggleDeveloperMode,
    setDeveloperMode,
  };
}
