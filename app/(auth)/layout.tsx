import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto min-h-screen w-full max-w-md px-4 py-8 sm:px-6">
      {children}
    </main>
  );
}
