'use client';

import type { AuthSession } from '@/types/auth';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const AUTH_STORAGE_KEY = 'meeteam-auth-storage';

type AuthState = {
  accessToken: string | null;
  memberId: number | null;
  name: string | null;
  email: string | null;
  isAuthenticated: boolean;
  setSession: (session: AuthSession) => void;
  clearSession: () => void;
};

const INITIAL_STATE = {
  accessToken: null,
  memberId: null,
  name: null,
  email: null,
  isAuthenticated: false,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,
      setSession: (session) =>
        set({
          accessToken: session.accessToken,
          memberId: session.memberId,
          name: session.name,
          email: session.email,
          isAuthenticated: true,
        }),
      clearSession: () => set(INITIAL_STATE),
    }),
    {
      name: AUTH_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        memberId: state.memberId,
        name: state.name,
        email: state.email,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
