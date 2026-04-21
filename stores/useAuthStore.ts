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
  setSession: (session: AuthSession) => void;
  setProfileIdentity: (identity: { name?: string | null; email?: string | null }) => void;
  clearSession: () => void;
};

const INITIAL_STATE = {
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
          memberId: session.memberId,
          name: session.name,
          email: session.email,
          isAuthenticated: true,
        }),
      setProfileIdentity: ({ name, email }) =>
        set((state) => ({
          ...state,
          name: name ?? state.name,
          email: email ?? state.email,
        })),
      clearSession: () => set(INITIAL_STATE),
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
