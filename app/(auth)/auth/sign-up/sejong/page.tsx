'use client';

import RedirectIfAuthenticated from '@/components/features/auth/RedirectIfAuthenticated';
import SejongSignupForm from '@/components/features/auth/SejongSignupForm';

export default function Page() {
  return (
    <RedirectIfAuthenticated>
      <section className="space-y-6 md:space-y-8 bg-white p-10 max-w-130 w-full rounded-3xl flex flex-col shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)]">
        <div className="flex flex-col justify-end gap-2">
          <h1 className="text-text-black font-extrabold text-3xl leading-9">세종대 회원가입</h1>
          <h2 className="text-text-gray font-medium text-[16px] leading-5">
            세종대 포털 인증 후 필요한 정보를 입력하면 바로 meeTeam을 시작할 수 있어요.
          </h2>
        </div>
        <SejongSignupForm />
      </section>
    </RedirectIfAuthenticated>
  );
}
