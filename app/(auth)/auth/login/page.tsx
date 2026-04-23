'use client';

import RedirectIfAuthenticated from '@/components/features/auth/RedirectIfAuthenticated';
import LoginForm from '@/components/features/auth/LoginForm';
import SocialLogin from '@/components/features/auth/SocialLogin';
import Link from 'next/link';

export default function Page() {
  return (
    <RedirectIfAuthenticated>
      <section className="space-y-6 md:space-y-8 bg-white p-10 max-w-md w-full rounded-3xl flex flex-col shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)]">
        <div className="flex flex-col items-center justify-end pt-16 gap-2">
          <Link
            href="/"
            className="text-text-black font-bold text-2xl leading-6 text-center transition-colors hover:text-brand-500"
          >
            meeTeam
          </Link>
          <h2 className="text-text-gray font-medium text-[16px] text-center">
            세종대 포털 계정으로 로그인해 주세요.
          </h2>
        </div>

        <LoginForm />
        <SocialLogin />

        <p className="text-center text-sm font-normal leading-5 text-text-gray">
          신규 회원은 로그인 후 가입 정보를 이어서 입력할 수 있어요.
        </p>
      </section>
    </RedirectIfAuthenticated>
  );
}
