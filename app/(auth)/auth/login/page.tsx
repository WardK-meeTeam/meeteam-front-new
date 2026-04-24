'use client';

import Link from 'next/link';

import RedirectIfAuthenticated from '@/components/features/auth/RedirectIfAuthenticated';
import LoginForm from '@/components/features/auth/LoginForm';
import AppLogo from '@/components/shared/AppLogo';

export default function Page() {
  return (
    <RedirectIfAuthenticated>
      <section className="flex w-full max-w-md flex-col rounded-3xl bg-white p-10 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)]">
        <div className="flex flex-col items-center justify-end pt-16 gap-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center transition-opacity hover:opacity-80"
            aria-label="meeTeam 홈"
          >
            <AppLogo className="h-14 w-60" priority />
          </Link>
        </div>

        <LoginForm />
      </section>
    </RedirectIfAuthenticated>
  );
}
