'use client';

import type { ReactNode } from 'react';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';

import { useAuthHydrated } from './useAuthHydrated';

type RedirectIfAuthenticatedProps = {
  children: ReactNode;
};

export default function RedirectIfAuthenticated({
  children,
}: RedirectIfAuthenticatedProps) {
  const router = useRouter();
  const hydrated = useAuthHydrated();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!hydrated || !isAuthenticated) {
      return;
    }

    router.replace('/');
  }, [hydrated, isAuthenticated, router]);

  if (!hydrated || isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
