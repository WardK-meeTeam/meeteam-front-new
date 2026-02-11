'use client';

import LoginForm from '@/components/features/auth/LoginForm';

export default function Page() {
  return (
    <section className="space-y-6 md:space-y-8 bg-white p-10 max-w-md rounded-3xl flex flex-col items-center gap-8">
      <div className="flex flex-col items-center justify-end pt-16 gap-2 mb-0">
        <h1 className="text-text-black font-bold text-2xl leading-6 text-center">meeTeam</h1>
        <h2 className="text-text-gray font-normal text-[16px] text-center">
          다시 오신 것을 환영합니다!
        </h2>
      </div>
      <LoginForm />
    </section>
  );
}
