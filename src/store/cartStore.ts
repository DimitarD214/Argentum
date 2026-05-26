import { createClient } from '@/utils/supabase/client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  metal?: string;
}

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (id: string, metal?: string) => void;
  updateQuantity: (id: string, quantity: number, metal?: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  updateCartOpen: (isOpen: boolean) => void;
  syncWithServer: (userId: string) => Promise<void>;
  hydrateFromServer: (serverItems: CartItem[]) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      
      addItem: (item) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (i) => i.id === item.id && i.metal === item.metal
          );

          if (existingItemIndex > -1) {
            const newItems = [...state.items];
            newItems[existingItemIndex].quantity += item.quantity;
            return { items: newItems };
          }
          return { items: [...state.items, item] };
        });
      },

      removeItem: (id, metal) => {
        set((state) => ({
          items: state.items.filter((i) => !(i.id === id && i.metal === metal)),
        }));
      },

      updateQuantity: (id, quantity, metal) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id && item.metal === metal
              ? { ...item, quantity: Math.max(0, quantity) }
              : item
          ).filter((item) => item.quantity > 0),
        }));
      },

      clearCart: () => set({ items: [] }),

      getCartTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getCartCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
      updateCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
      syncWithServer: async (userId) => {
        const { items } = get();
        try {
          const supabase = createClient();
          await supabase.from('profiles').update({ cart_data: items }).eq('id', userId);
        } catch (err) {
          console.error("Failed to sync cart", err);
        }
      },
      hydrateFromServer: (serverItems) => {
        set((state) => {
          const merged = [...serverItems];
          state.items.forEach(localItem => {
            const existing = merged.find(i => i.id === localItem.id && i.metal === localItem.metal);
            if (existing) {
              existing.quantity += localItem.quantity;
            } else {
              merged.push(localItem);
            }
          });
          return { items: merged };
        });
      },
    }),
    {
      name: 'astera-cart-storage',
    }
  )
);
