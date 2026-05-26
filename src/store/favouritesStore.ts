import { createClient } from '@/utils/supabase/client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavouritesState {
  items: string[];
  addFavourite: (id: string) => void;
  removeFavourite: (id: string) => void;
  toggleFavourite: (id: string) => void;
  isFavourite: (id: string) => boolean;
  syncWithServer: (userId: string) => Promise<void>;
  hydrateFromServer: (serverItems: string[]) => void;
}

export const useFavouritesStore = create<FavouritesState>()(
  persist(
    (set, get) => ({
      items: [],
      addFavourite: (id) => set((state) => ({ items: [...state.items, id] })),
      removeFavourite: (id) => set((state) => ({ items: state.items.filter((i) => i !== id) })),
      toggleFavourite: (id) => {
        const { items } = get();
        if (items.includes(id)) {
          set({ items: items.filter((i) => i !== id) });
        } else {
          set({ items: [...items, id] });
        }
      },
      isFavourite: (id) => get().items.includes(id),

      syncWithServer: async (userId) => {
        const { items } = get();
        try {
          const supabase = createClient();
          await supabase.from('profiles').update({ favourites_data: items }).eq('id', userId);
        } catch (err) {
          console.error("Failed to sync favourites", err);
        }
      },
      hydrateFromServer: (serverItems) => set((state) => {
        const merged = Array.from(new Set([...state.items, ...serverItems]));
        return { items: merged };
      }),

    }),
    {
      name: 'astera-favourites-storage',
    }
  )
);
