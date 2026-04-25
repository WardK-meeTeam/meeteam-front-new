'use client';

import type { AuthSession } from '@/types/auth';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const AUTH_STORAGE_KEY = 'meeteam-auth-storage';

type AuthState = {
  memberId: number | null;
  name: string | null;
  email: string | null;
  isAuthenticated: boolean;
  isLoggingOut: boolean;
  setSession: (session: AuthSession) => void;
  setProfileIdentity: (identity: { name?: string | null; email?: string | null }) => void;
  beginLogout: () => void;
  finishLogout: () => void;
  clearSession: () => void;
};

const INITIAL_SESSION_STATE = {
  memberId: null,
  name: null,
  email: null,
  isAuthenticated: false,
};

const INITIAL_STATE = {
  ...INITIAL_SESSION_STATE,
  isLoggingOut: false,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,
      setSession: (session) =>
        set({
          memberId: session.memberId,
          name: session.name,
          email: session.email,
          isAuthenticated: true,
          isLoggingOut: false,
        }),
      setProfileIdentity: ({ name, email }) =>
        set((state) => ({
          ...state,
          name: name ?? state.name,
          email: email ?? state.email,
        })),
      beginLogout: () => set({ isLoggingOut: true }),
      finishLogout: () => set({ isLoggingOut: false }),
      clearSession: () =>
        set((state) => ({
          ...INITIAL_SESSION_STATE,
          isLoggingOut: state.isLoggingOut,
        })),
    }),
    {
      name: AUTH_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        memberId: state.memberId,
        name: state.name,
        email: state.email,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
