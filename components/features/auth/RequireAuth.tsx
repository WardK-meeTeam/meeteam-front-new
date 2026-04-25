'use client';

import type { ReactNode } from 'react';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchMyProfile } from '@/components/features/profile/profileApi';
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
  const isLoggingOut = useAuthStore((state) => state.isLoggingOut);
  const setSession = useAuthStore((state) => state.setSession);
  const openLoginModal = useLoginModalStore((state) => state.openLoginModal);
  const [isCheckingSession, setIsCheckingSession] = useState(false);

  useEffect(() => {
    if (!hydrated || isAuthenticated || isLoggingOut) {
      return undefined;
    }

    let active = true;

    const syncBackendSession = async () => {
      try {
        setIsCheckingSession(true);

        const profile = await fetchMyProfile();

        if (!active) {
          return;
        }

        setSession({
          memberId: profile.memberId,
          name: profile.name,
          email: profile.email,
        });
      } catch {
        if (!active) {
          return;
        }

        openLoginModal({
          redirectPath: pathname,
          ...getLoginPromptCopy(pathname),
        });
      } finally {
        if (active) {
          setIsCheckingSession(false);
        }
      }
    };

    void syncBackendSession();

    return () => {
      active = false;
    };
  }, [hydrated, isAuthenticated, isLoggingOut, openLoginModal, pathname, setSession]);

  if (!hydrated || isCheckingSession || isLoggingOut) {
    return null;
  }

  if (!isAuthenticated) {
    return <AuthRequiredFallback {...getLoginPromptCopy(pathname)} />;
  }

  return <>{children}</>;
}
