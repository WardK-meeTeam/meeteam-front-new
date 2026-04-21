'use client';

import type { ReactNode } from 'react';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';
import { useLoginModalStore } from '@/stores/useLoginModalStore';

import AuthRequiredFallback from './AuthRequiredFallback';
import { getLoginPromptCopy } from './protectedPaths';
import { useAuthHydrated } from './useAuthHydrated';

type RequireAuthProps = {
  children: ReactNode;
};

export default function RequireAuth({ children }: RequireAuthProps) {
  const pathname = usePathname();
  const hydrated = useAuthHydrated();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const openLoginModal = useLoginModalStore((state) => state.openLoginModal);

  useEffect(() => {
    if (hydrated && !isAuthenticated) {
      openLoginModal({
        redirectPath: pathname,
        ...getLoginPromptCopy(pathname),
      });
    }
  }, [hydrated, isAuthenticated, openLoginModal, pathname]);

  if (!hydrated) {
    return null;
  }

  if (!isAuthenticated) {
    return <AuthRequiredFallback {...getLoginPromptCopy(pathname)} />;
  }

  return <>{children}</>;
}
