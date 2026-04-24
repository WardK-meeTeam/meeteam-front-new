import type { ReactNode } from 'react';
import AppLogo from '@/components/shared/AppLogo';

type AuthSignupShellProps = {
  title: string;
  children: ReactNode;
};

export default function AuthSignupShell({ title, children }: AuthSignupShellProps) {
  return (
    <div className="flex w-full max-w-150 flex-col gap-5">
      <AppLogo className="mx-auto h-9 w-40 sm:mx-0" priority />

      <section className="flex flex-col rounded-3xl border border-mt-border bg-mt-white shadow-sm">
        <header className="border-b border-mt-border px-6 py-6 sm:px-8">
          <h1 className="text-3xl leading-9 font-extrabold text-mt-text-primary">{title}</h1>
        </header>

        <div className="px-6 py-7 sm:px-8">{children}</div>
      </section>
    </div>
  );
}
