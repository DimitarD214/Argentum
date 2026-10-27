"use client";

import { useEffect, useRef } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useCartStore } from '@/store/cartStore';
import { useFavouritesStore } from '@/store/favouritesStore';

export default function StoreHydration() {
  const hydrated = useRef(false);
  const unsubCartRef = useRef<(() => void) | null>(null);
  const unsubFavRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const supabase = createClient();

    const cleanupStoreSubscriptions = () => {
      if (unsubCartRef.current) {
        unsubCartRef.current();
        unsubCartRef.current = null;
      }
      if (unsubFavRef.current) {
        unsubFavRef.current();
        unsubFavRef.current = null;
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      cleanupStoreSubscriptions();

      if (session?.user) {
        const userId = session.user.id;

        if (!hydrated.current) {
          const { data } = await supabase
            .from('profiles')
            .select('cart_data, favourites_data')
            .eq('id', userId)
            .single();

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

        unsubCartRef.current = useCartStore.subscribe((state, prevState) => {
          if (state.items !== prevState.items && hydrated.current) {
            state.syncWithServer(userId);
          }
        });

        unsubFavRef.current = useFavouritesStore.subscribe((state, prevState) => {
          if (state.items !== prevState.items && hydrated.current) {
            state.syncWithServer(userId);
          }
        });
      } else {
        hydrated.current = false;
      }
    });

    return () => {
      cleanupStoreSubscriptions();
      subscription.unsubscribe();
    };
  }, []);

  return null;
}
