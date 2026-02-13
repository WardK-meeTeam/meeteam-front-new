import BaseButton from '@/components/shared/BaseButton';
import AuthSection from './AuthSection';
import ProfileSection from './ProfileSection';

export default function SignupForm() {
  return (
    <form className="flex flex-col gap-5 w-full">
      <AuthSection />

      <ProfileSection />

      <BaseButton size="L" full={true} type="submit">
        <span className="font-bold">가입하기</span>
      </BaseButton>
    </form>
  );
}
