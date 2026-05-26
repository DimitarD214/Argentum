"use client";

import { useEffect, useRef } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useCartStore } from '@/store/cartStore';
import { useFavouritesStore } from '@/store/favouritesStore';

export default function StoreHydration() {
  const supabase = createClient();
  const hydrated = useRef(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const userId = session.user.id;

        if (!hydrated.current) {
          const { data } = await supabase.from('profiles').select('cart_data, favourites_data').eq('id', userId).single();
          
          if (data) {
            if (data.cart_data) {
              useCartStore.getState().hydrateFromServer(data.cart_data);
            }
            if (data.favourites_data) {
              useFavouritesStore.getState().hydrateFromServer(data.favourites_data);
            }
          }
          hydrated.current = true;
        }

        const unsubCart = useCartStore.subscribe((state, prevState) => {
          if (state.items !== prevState.items && hydrated.current) {
            state.syncWithServer(userId);
          }
        });

        const unsubFav = useFavouritesStore.subscribe((state, prevState) => {
          if (state.items !== prevState.items && hydrated.current) {
            state.syncWithServer(userId);
          }
        });

        return () => {
          unsubCart();
          unsubFav();
        };
      } else {
        hydrated.current = false;
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  return null;
}
