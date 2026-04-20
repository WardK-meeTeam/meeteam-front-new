'use client';

import { useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { useLoginModalStore } from '@/stores/useLoginModalStore';

import { isAuthRequiredError } from './authError';
import { getLoginPromptCopy, normalizeProtectedPath } from './protectedPaths';

type AuthRequiredModalOptions = {
  redirectPath?: string;
};

export function useAuthRequiredModal() {
  const pathname = usePathname();
  const openLoginModal = useLoginModalStore((state) => state.openLoginModal);

  return useCallback(
    (error: unknown, options?: AuthRequiredModalOptions) => {
      if (!isAuthRequiredError(error)) {
        return false;
      }

      const redirectPath = normalizeProtectedPath(options?.redirectPath ?? pathname);

      openLoginModal({
        redirectPath,
        ...getLoginPromptCopy(redirectPath),
      });

      return true;
    },
    [openLoginModal, pathname],
  );
}
