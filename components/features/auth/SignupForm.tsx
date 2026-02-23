import { useState } from 'react';
import BaseButton from '@/components/shared/BaseButton';
import AuthSection from '@/components/features/auth/AuthSection';
import ProfileSection from '@/components/features/auth/ProfileSection';
import InterestSection from '@/components/features/auth/InterestSection';
import { Interest } from '@/types/auth';
import TechStackSection from './TechStackSection';
import ProfileExtraSection from './ProfileExtraSection';

export default function SignupForm() {
  const [interests, setInterests] = useState<Interest[]>([{ major: '', minor: '' }]);
  const [techStacksByInterest, setTechStacksByInterest] = useState<Record<string, string[]>>({});

  const addInterest = () => {
    setInterests((prev) => [{ major: '', minor: '' }, ...prev]);
  };

  const updateInterest = (index: number, next: Interest) => {
    setInterests((prev) => prev.map((it, i) => (i === index ? next : it)));
  };

  const removeInterest = (index: number) => {
    setInterests((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <form className="flex flex-col gap-5 w-full">
      <AuthSection />

      <ProfileSection />

      <InterestSection
        interests={interests}
        onAdd={addInterest}
        onChange={updateInterest}
        onRemove={removeInterest}
      />

      <TechStackSection
        interests={interests}
        value={techStacksByInterest}
        onChange={setTechStacksByInterest}
      />

      <ProfileExtraSection />

      <BaseButton size="L" full={true} type="submit">
        <span className="font-bold">가입하기</span>
      </BaseButton>
    </form>
  );
}
