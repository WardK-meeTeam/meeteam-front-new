import BaseButton from '@/components/shared/BaseButton';
import BaseInput from '@/components/shared/BaseInput';
import { Mail, Lock } from 'lucide-react';

export default function LoginForm() {
  return (
    <form className="flex flex-col gap-5 w-full">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="font-bold">
          이메일
        </label>
        <BaseInput id="email" type="email" leftIcon={<Mail />} placeholder="example@email.com" />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="font-bold">
          비밀번호
        </label>
        <BaseInput id="password" type="password" leftIcon={<Lock />} placeholder="••••••••" />
      </div>
      <BaseButton size="L" full={true} type="submit">
        로그인
      </BaseButton>
    </form>
  );
}
