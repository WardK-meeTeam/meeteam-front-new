'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Lock, Mail } from 'lucide-react';

import BaseButton from '@/components/shared/BaseButton';
import BaseInput from '@/components/shared/BaseInput';
import { useAuthStore } from '@/stores/useAuthStore';
import type { LoginFormValues } from '@/types/auth';

import { loginMember } from './loginApi';
import { loginFormSchema, type LoginFieldErrors } from './schema';

const INITIAL_FORM_VALUES: LoginFormValues = {
  email: '',
  password: '',
};

type LoginFormProps = {
  redirectPath?: string;
  onSuccess?: () => void | Promise<void>;
};

export default function LoginForm({ redirectPath = '/', onSuccess }: LoginFormProps) {
  const pathname = usePathname();
  const router = useRouter();
  const setSession = useAuthStore((state) => state.setSession);

  const [formValues, setFormValues] = useState<LoginFormValues>(INITIAL_FORM_VALUES);
  const [fieldErrors, setFieldErrors] = useState<LoginFieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const result = loginFormSchema.safeParse(formValues);

    if (result.success) {
      setFieldErrors({});
      return true;
    }

    const flattened = result.error.flatten().fieldErrors;
    setFieldErrors({
      email: flattened.email?.[0],
      password: flattened.password?.[0],
    });
    return false;
  };

  const updateField = <K extends keyof LoginFormValues>(key: K, value: LoginFormValues[K]) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => ({ ...prev, [key]: undefined, form: undefined }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const session = await loginMember(formValues);
      setSession(session);
      await onSuccess?.();

      if (redirectPath !== pathname) {
        router.push(redirectPath);
      }

      router.refresh();
    } catch (error) {
      setFieldErrors({
        form: error instanceof Error ? error.message : '로그인에 실패했습니다.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="flex w-full flex-col gap-5"
      noValidate
      onSubmit={handleSubmit}
      data-cy="login-form"
    >
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="font-bold text-text-black">
          이메일
        </label>
        <BaseInput
          id="email"
          type="email"
          value={formValues.email}
          onChange={(event) => updateField('email', event.target.value)}
          leftIcon={<Mail className="h-5 w-5" strokeWidth={1.8} />}
          placeholder="example@email.com"
          autoComplete="email"
          aria-invalid={Boolean(fieldErrors.email)}
          data-cy="login-email"
        />
        {fieldErrors.email ? (
          <p className="text-sm text-danger-500" role="alert">
            {fieldErrors.email}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="font-bold text-text-black">
          비밀번호
        </label>
        <BaseInput
          id="password"
          type="password"
          value={formValues.password}
          onChange={(event) => updateField('password', event.target.value)}
          leftIcon={<Lock className="h-5 w-5" strokeWidth={1.8} />}
          placeholder="••••••••"
          autoComplete="current-password"
          aria-invalid={Boolean(fieldErrors.password)}
          data-cy="login-password"
        />
        {fieldErrors.password ? (
          <p className="text-sm text-danger-500" role="alert">
            {fieldErrors.password}
          </p>
        ) : null}
      </div>

      {fieldErrors.form ? (
        <div
          className="rounded-2xl border border-border-gray bg-danger-soft px-4 py-3 text-sm text-danger-500"
          role="alert"
          aria-live="polite"
        >
          {fieldErrors.form}
        </div>
      ) : null}

      <BaseButton size="L" full={true} type="submit" disabled={isSubmitting} data-cy="login-submit">
        {isSubmitting ? '로그인 중...' : '로그인'}
      </BaseButton>
    </form>
  );
}
