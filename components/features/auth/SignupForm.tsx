import { useState } from 'react';
import BaseButton from '@/components/shared/BaseButton';
import AuthSection from '@/components/features/auth/AuthSection';
import ProfileSection from '@/components/features/auth/ProfileSection';
import InterestSection from '@/components/features/auth/InterestSection';
import { Interest } from '@/components/features/auth/InterestRow';

export default function SignupForm() {
  const [interests, setInterests] = useState<Interest[]>([
    { major: '', minor: '' },
  ]);

  const addInterest = () => {
    setInterests((prev) => [...prev, { major: '', minor: '' }]);
  };

  const updateInterest = (index: number, next: Interest) => {
    setInterests((prev) => prev.map((it, i) => (i === index ? next : it)));
  };

  return (
    <form className="flex flex-col gap-5 w-full">
      <AuthSection />

      <ProfileSection />

      <InterestSection interests={interests} onAdd={addInterest} onChange={updateInterest} />

      <BaseButton size="L" full={true} type="submit">
        <span className="font-bold">가입하기</span>
      </BaseButton>
    </form>
  );
}
