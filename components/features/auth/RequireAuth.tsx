'use client';

import type { ReactNode } from 'react';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';

type RequireAuthProps = {
  children: ReactNode;
};

export default function RequireAuth({ children }: RequireAuthProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
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

  useEffect(() => {
    if (hydrated && !isAuthenticated) {
      router.replace('/auth/login');
    }
  }, [hydrated, isAuthenticated, pathname, router]);

  if (!hydrated || !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
