import BaseButton from '@/components/shared/BaseButton';
import BaseInput from '@/components/shared/BaseInput';
import { Mail, Lock } from 'lucide-react';

export default function LoginForm() {
  return (
    <form className="flex flex-col gap-5 items-stretch w-91.5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="emal" className="font-bold">
          이메일
        </label>
        <BaseInput type="email" leftIcon={<Mail />} placeholder="example@email.com" />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="font-bold">
          비밀번호
        </label>
        <BaseInput type="password" leftIcon={<Lock />} placeholder="••••••••" />
      </div>
      <BaseButton size="L" full={true} type="submit">
        로그인
      </BaseButton>
    </form>
  );
}
