'use client';

import RedirectIfAuthenticated from '@/components/features/auth/RedirectIfAuthenticated';
import AuthSignupShell from '@/components/features/auth/AuthSignupShell';
import SignupForm from '@/components/features/auth/SignupForm';

export default function Page() {
  return (
    <RedirectIfAuthenticated>
      <AuthSignupShell title="회원가입">
        <SignupForm />
      </AuthSignupShell>
    </RedirectIfAuthenticated>
  );
}
