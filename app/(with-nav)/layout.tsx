import type { ReactNode } from 'react';
import { NavBar } from '@/components/shared/NavBar';

export default function WithNavLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-text-black">
      <NavBar />
      <main className="mx-auto w-full max-w-7xl px-8 py-8">{children}</main>
    </div>
  );
}
