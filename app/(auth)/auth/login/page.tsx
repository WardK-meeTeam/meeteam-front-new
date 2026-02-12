'use client';

import LoginForm from '@/components/features/auth/LoginForm';
import SocialLogin from '@/components/features/auth/SocialLogin';
import Link from 'next/link';

export default function Page() {
  return (
    <section className="space-y-6 md:space-y-8 bg-white p-10 max-w-md w-full rounded-3xl flex flex-col shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)]">
      <div className="flex flex-col items-center justify-end pt-16 gap-2">
        <h1 className="text-text-black font-bold text-2xl leading-6 text-center">meeTeam</h1>
        <h2 className="text-text-gray font-medium text-[16px] text-center">
          다시 오신 것을 환영합니다!
        </h2>
      </div>

      <LoginForm />
      <SocialLogin />

      <div className="flex gap-1 justify-center">
        <span className="text-text-gray text-sm font-normal leading-5">신규 회원이신가요? </span>
        <Link href="/auth/sign-up" className="text-brand-500 text-sm font-bold leading-5">
          회원가입
        </Link>
      </div>
    </section>
  );
}
