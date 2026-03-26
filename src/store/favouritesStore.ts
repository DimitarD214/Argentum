import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavouritesState {
  items: string[];
  addFavourite: (id: string) => void;
  removeFavourite: (id: string) => void;
  toggleFavourite: (id: string) => void;
  isFavourite: (id: string) => boolean;
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
    }),
    {
      name: 'astera-favourites-storage',
    }
  )
);
