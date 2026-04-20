'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';

export function useAuthHydrated() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const persistApi = useAuthStore.persist;

    if (!persistApi) {
      setHydrated(true);
      return undefined;
    }

    const unsubscribeHydrate = persistApi.onHydrate(() => {
      setHydrated(false);
    });

    const unsubscribeFinishHydration = persistApi.onFinishHydration(() => {
      setHydrated(true);
    });

    setHydrated(persistApi.hasHydrated());

    return () => {
      unsubscribeHydrate();
      unsubscribeFinishHydration();
    };
  }, []);

  return hydrated;
}
