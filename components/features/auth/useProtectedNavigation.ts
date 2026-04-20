'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuthStore';
import { useLoginModalStore } from '@/stores/useLoginModalStore';

import { getLoginPromptCopy, isProtectedPath, normalizeProtectedPath } from './protectedPaths';
import { useAuthHydrated } from './useAuthHydrated';

export function useProtectedNavigation() {
  const router = useRouter();
  const hydrated = useAuthHydrated();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const openLoginModal = useLoginModalStore((state) => state.openLoginModal);

  const maybeOpenLoginModal = useCallback(
    (path: string) => {
      const normalizedPath = normalizeProtectedPath(path);

      if (!isProtectedPath(normalizedPath)) {
        return false;
      }

      if (!hydrated) {
        return true;
      }

      if (isAuthenticated) {
        return false;
      }

      openLoginModal({
        redirectPath: normalizedPath,
        ...getLoginPromptCopy(normalizedPath),
      });

      return true;
    },
    [hydrated, isAuthenticated, openLoginModal],
  );

  const navigateWithProtection = useCallback(
    (path: string) => {
      if (maybeOpenLoginModal(path)) {
        return false;
      }

      router.push(path);
      return true;
    },
    [maybeOpenLoginModal, router],
  );

  return {
    hydrated,
    isAuthenticated,
    maybeOpenLoginModal,
    navigateWithProtection,
  };
}
