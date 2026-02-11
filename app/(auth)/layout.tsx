import type { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto min-h-screen w-full px-4 py-8 sm:px-6 bg-[#F8FAFC] flex items-center justify-center">
      {children}
    </main>
  );
}
