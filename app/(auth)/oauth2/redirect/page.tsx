'use client';

import Link from 'next/link';
import { Suspense, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { fetchMyProfile } from '@/components/features/profile/profileApi';
import { useAuthStore } from '@/stores/useAuthStore';
import { exchangeOAuthToken, type OAuthRedirectType } from '@/components/features/auth/oauthApi';

function OAuthRedirectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setSession = useAuthStore((state) => state.setSession);
  const hasStartedRef = useRef(false);
  const [statusMessage, setStatusMessage] = useState('OAuth 로그인을 처리하고 있습니다...');
  const [errorMessage, setErrorMessage] = useState('');

  const code = searchParams.get('code') ?? '';
  const typeParam = searchParams.get('type');
  const type: OAuthRedirectType | null =
    typeParam === 'login' || typeParam === 'register' ? typeParam : null;

  useEffect(() => {
    if (hasStartedRef.current) {
      return;
    }

    hasStartedRef.current = true;

    if (!code || !type) {
      setErrorMessage('OAuth 로그인 응답이 올바르지 않습니다. 다시 시도해 주세요.');
      return;
    }

    if (type === 'register') {
      setStatusMessage('추가 회원정보 입력 페이지로 이동하고 있습니다...');
      router.replace(`/auth/sign-up/oauth2?code=${encodeURIComponent(code)}`);
      return;
    }

    void (async () => {
      try {
        setStatusMessage('로그인 정보를 확인하고 있습니다...');
        await exchangeOAuthToken(code);

        const profile = await fetchMyProfile();
        setSession({
          memberId: profile.memberId,
          name: profile.name,
          email: profile.email,
        });

        router.replace('/');
        router.refresh();
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : 'OAuth 로그인 처리 중 오류가 발생했습니다.',
        );
      }
    })();
  }, [code, type, router, setSession]);

  return (
    <section className="flex w-full max-w-md flex-col gap-4 rounded-3xl bg-white p-10 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)]">
      <h1 className="text-2xl font-bold text-text-black">소셜 로그인</h1>
      {errorMessage ? (
        <>
          <p className="rounded-2xl border border-border-gray bg-danger-soft px-4 py-3 text-sm text-danger-500">
            {errorMessage}
          </p>
          <Link
            href="/auth/login"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-brand-500 px-5 text-sm font-bold text-white"
          >
            로그인으로 돌아가기
          </Link>
        </>
      ) : (
        <p className="text-sm leading-6 text-text-gray">{statusMessage}</p>
      )}
    </section>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <section className="flex w-full max-w-md flex-col gap-4 rounded-3xl bg-white p-10 shadow-sm">
          <h1 className="text-2xl font-bold text-text-black">소셜 로그인</h1>
          <p className="text-sm leading-6 text-text-gray">OAuth 로그인을 처리하고 있습니다...</p>
        </section>
      }
    >
      <OAuthRedirectContent />
    </Suspense>
  );
}
