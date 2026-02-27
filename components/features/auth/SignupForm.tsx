import { useState, useMemo, use } from 'react';
import BaseButton from '@/components/shared/BaseButton';
import AuthSection from '@/components/features/auth/AuthSection';
import ProfileSection from '@/components/features/auth/ProfileSection';
import InterestSection from '@/components/features/auth/InterestSection';
import { Interest } from '@/types/auth';
import TechStackSection from './TechStackSection';
import ProfileExtraSection from './ProfileExtraSection';

export default function SignupForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [birth, setBirth] = useState<string>('');
  const [gender, setGender] = useState<string>('male');
  const [interests, setInterests] = useState<Interest[]>([{ major: '', minor: '' }]);
  const [techStacksByInterest, setTechStacksByInterest] = useState<Record<string, string[]>>({});
  const [project, setProject] = useState<string>('0');
  const [githubLink, setGithubLink] = useState<string>('');
  const [blogLink, setBlogLink] = useState<string>('');
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onChangePasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value);
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onChangeBirth = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirth(e.target.value);
  };

  const onChangeGender = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGender(e.target.value);
  };

  const isPasswordMatched = useMemo(() => {
    if (!passwordConfirm) return true;
    return password === passwordConfirm;
  }, [password, passwordConfirm]);

  const addInterest = () => {
    setInterests((prev) => [{ major: '', minor: '' }, ...prev]);
  };

  const updateInterest = (index: number, next: Interest) => {
    setInterests((prev) => prev.map((it, i) => (i === index ? next : it)));
  };

  const removeInterest = (index: number) => {
    setInterests((prev) => prev.filter((_, i) => i !== index));
  };

  const onChangeProject = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProject(e.target.value);
  };

  const onChangeGithubLInk = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGithubLink(e.target.value);
  };

  const onChangeBlogLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlogLink(e.target.value);
  };

  const onChangeProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setProfileImage(file);
  };

  return (
    <form className="flex flex-col gap-5 w-full">
      <AuthSection
        onChangeEmail={onChangeEmail}
        onChangePassword={onChangePassword}
        onChangePasswordConfirm={onChangePasswordConfirm}
        isPasswordMatched={isPasswordMatched}
      />

      <ProfileSection
        onChangeName={onChangeName}
        onChangeBirth={onChangeBirth}
        onChangeGender={onChangeGender}
      />

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

      <ProfileExtraSection
        onChangeProject={onChangeProject}
        onChangeGithubLink={onChangeGithubLInk}
        onChangeBlogLink={onChangeBlogLink}
        onChangeProfileImage={onChangeProfileImage}
      />

      <BaseButton size="L" full={true} type="submit">
        <span className="font-bold">가입하기</span>
      </BaseButton>
    </form>
  );
}
