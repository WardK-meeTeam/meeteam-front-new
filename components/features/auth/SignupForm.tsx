import { useState } from 'react';
import BaseButton from '@/components/shared/BaseButton';
import AuthSection from './AuthSection';
import ProfileSection from './ProfileSection';
import InterestSection from './InterestSection';

export default function SignupForm() {
  const [major, setMajor] = useState<string>('');
  const [minor, setMinor] = useState<string>('');

  return (
    <form className="flex flex-col gap-5 w-full">
      <AuthSection />

      <ProfileSection />

      <InterestSection
        major={major}
        minor={minor}
        onChangeMajor={setMajor}
        onChangeMinor={setMinor}
      />

      <BaseButton size="L" full={true} type="submit">
        <span className="font-bold">가입하기</span>
      </BaseButton>
    </form>
  );
}
