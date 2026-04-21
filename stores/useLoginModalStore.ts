'use client';

import { create } from 'zustand';

const DEFAULT_LOGIN_MODAL_TITLE = '로그인이 필요한 기능이에요';
const DEFAULT_LOGIN_MODAL_DESCRIPTION = 'meeTeam 계정으로 로그인하고 계속 진행해 주세요.';

type OpenLoginModalPayload = {
  redirectPath?: string;
  title?: string;
  description?: string;
};

type LoginModalState = {
  isOpen: boolean;
  redirectPath: string | null;
  title: string;
  description: string;
  openLoginModal: (payload?: OpenLoginModalPayload) => void;
  closeLoginModal: () => void;
};

export const useLoginModalStore = create<LoginModalState>((set) => ({
  isOpen: false,
  redirectPath: null,
  title: DEFAULT_LOGIN_MODAL_TITLE,
  description: DEFAULT_LOGIN_MODAL_DESCRIPTION,
  openLoginModal: (payload) =>
    set({
      isOpen: true,
      redirectPath: payload?.redirectPath ?? null,
      title: payload?.title ?? DEFAULT_LOGIN_MODAL_TITLE,
      description: payload?.description ?? DEFAULT_LOGIN_MODAL_DESCRIPTION,
    }),
  closeLoginModal: () =>
    set({
      isOpen: false,
      redirectPath: null,
      title: DEFAULT_LOGIN_MODAL_TITLE,
      description: DEFAULT_LOGIN_MODAL_DESCRIPTION,
    }),
}));
