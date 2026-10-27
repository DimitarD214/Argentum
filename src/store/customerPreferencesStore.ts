import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { consentStorage } from "@/lib/consentStorage";

interface CustomerPreferencesState {
  recentlyViewedIds: string[];
  preferredMetal: string;
  preferredLine: "astera-nakit" | "tradicijski-nakit" | null;
  ringSize: string;
  recordProductView: (productId: string, line?: string) => void;
  setPreferredMetal: (metal: string) => void;
  setRingSize: (size: string) => void;
}

export const useCustomerPreferencesStore = create<CustomerPreferencesState>()(
  persist(
    (set) => ({
      recentlyViewedIds: [],
      preferredMetal: "14k Gold",
      preferredLine: null,
      ringSize: "",

      recordProductView: (productId, line) =>
        set((state) => {
          const filtered = state.recentlyViewedIds.filter((id) => id !== productId);
          const updated = [productId, ...filtered].slice(0, 8);
          return {
            recentlyViewedIds: updated,
            preferredLine:
              line === "astera-nakit" || line === "tradicijski-nakit"
                ? line
                : state.preferredLine,
          };
        }),

      setPreferredMetal: (preferredMetal) => set({ preferredMetal }),
      setRingSize: (ringSize) => set({ ringSize }),
    }),
    {
      name: "astera-customer-preferences",
      // ePrivacy: personalisation is only stored on the device after "preferences" opt-in.
      storage: createJSONStorage(() => consentStorage("preferences")),
    }
  )
);
