import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import AuthRequiredFallback from '@/components/features/auth/AuthRequiredFallback';
import AuthSection from '@/components/features/auth/AuthSection';
import InterestSection from '@/components/features/auth/InterestSection';
import ProfileExtraSection from '@/components/features/auth/ProfileExtraSection';
import ProfileSection from '@/components/features/auth/ProfileSection';
import SignupTechStackSection from '@/components/features/auth/SignupTechStackSection';
import TechStackList from '@/components/features/auth/TechStackList';
import TechStackSection from '@/components/features/auth/TechStackSection';
import type { Interest, JobFieldOption } from '@/types/auth';

const jobFields: JobFieldOption[] = [
  {
    code: 'DEVELOP',
    name: '개발',
    positions: [
      { id: 1, code: 'FRONTEND', name: '프론트엔드' },
      { id: 2, code: 'BACKEND', name: '백엔드' },
    ],
    techStacks: [
      { id: 1, name: 'React' },
      { id: 2, name: 'Next.js' },
      { id: 3, name: 'TypeScript' },
      { id: 4, name: 'Zustand' },
      { id: 5, name: 'Zod' },
    ],
  },
  {
    code: 'DESIGN',
    name: '디자인',
    positions: [{ id: 3, code: 'UI_UX', name: 'UI/UX' }],
    techStacks: [
      { id: 6, name: 'Figma' },
      { id: 7, name: 'Design System' },
    ],
  },
];

const selectedInterests: Interest[] = [{ major: 'DEVELOP', minor: 'FRONTEND' }];
const projectInterests: Interest[] = [{ major: '개발', minor: '프론트엔드' }];

const meta = {
  title: 'Features/Auth',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function AuthSectionExample() {
  const [email, setEmail] = useState('meeteam@sejong.ac.kr');
  const [password, setPassword] = useState('password123');
  const [passwordConfirm, setPasswordConfirm] = useState('password123');

  return (
    <div className="w-screen max-w-2xl rounded-2xl border border-mt-border bg-mt-white p-6 shadow-sm">
      <div className="flex flex-col gap-4">
        <AuthSection
          email={email}
          password={password}
          passwordConfirm={passwordConfirm}
          onChangeEmail={(event) => setEmail(event.target.value)}
          onChangePassword={(event) => setPassword(event.target.value)}
          onChangePasswordConfirm={(event) => setPasswordConfirm(event.target.value)}
          onCheckEmail={() => console.log('check email')}
          emailFeedback="사용 가능한 이메일입니다."
          emailFeedbackTone="success"
          isCheckingEmail={false}
        />
      </div>
    </div>
  );
}

function ProfileSectionExample() {
  const [name, setName] = useState('김미팀');
  const [birth, setBirth] = useState('2001-03-15');
  const [gender, setGender] = useState('female');

  return (
    <div className="w-screen max-w-2xl rounded-2xl border border-mt-border bg-mt-white p-6 shadow-sm">
      <div className="flex flex-col gap-4">
        <ProfileSection
          name={name}
          birth={birth}
          gender={gender}
          onChangeName={(event) => setName(event.target.value)}
          onChangeBirth={setBirth}
          onChangeGender={(event) => setGender(event.target.value)}
        />
      </div>
    </div>
  );
}

function InterestSectionExample() {
  const [interests, setInterests] = useState<Interest[]>(selectedInterests);

  return (
    <div className="w-96 rounded-2xl border border-mt-border bg-mt-white p-6 shadow-sm">
      <InterestSection
        jobFields={jobFields}
        interests={interests}
        onChange={(index, next) =>
          setInterests((current) =>
            current.map((item, itemIndex) => (itemIndex === index ? next : item)),
          )
        }
      />
    </div>
  );
}

function SignupTechStackExample() {
  const [value, setValue] = useState<Record<string, string[]>>({
    'DEVELOP-FRONTEND': ['React', 'Next.js', 'TypeScript'],
  });

  return (
    <div className="w-screen max-w-2xl rounded-2xl border border-mt-border bg-mt-white p-6 shadow-sm">
      <SignupTechStackSection
        jobFields={jobFields}
        interests={selectedInterests}
        value={value}
        onChange={setValue}
      />
    </div>
  );
}

function ProjectTechStackExample() {
  const [value, setValue] = useState<Record<string, string[]>>({
    '개발 - 프론트엔드': ['React', 'Next.js'],
  });

  return (
    <div className="w-screen max-w-2xl rounded-2xl border border-mt-border bg-mt-white p-6 shadow-sm">
      <TechStackSection
        jobFields={jobFields}
        interests={projectInterests}
        value={value}
        onChange={setValue}
      />
    </div>
  );
}

function ProfileExtraSectionExample() {
  const [github, setGithub] = useState('https://github.com/meeteam');
  const [blog, setBlog] = useState('https://meeteam.dev');
  const [previewUrl, setPreviewUrl] = useState('/brand/meeteam_character.png');

  return (
    <div className="w-screen max-w-2xl rounded-2xl border border-mt-border bg-mt-white p-6 shadow-sm">
      <div className="flex flex-col gap-4">
        <ProfileExtraSection
          githubLink={github}
          blogLink={blog}
          onChangeGithubLink={(event) => setGithub(event.target.value)}
          onChangeBlogLink={(event) => setBlog(event.target.value)}
          onChangeProfileImage={(file) => {
            if (file) {
              setPreviewUrl(URL.createObjectURL(file));
            }
          }}
          onRemoveProfileImage={() => setPreviewUrl('')}
          profileImageName="meeteam_profile.png"
          profileImagePreviewUrl={previewUrl}
        />
      </div>
    </div>
  );
}

export const AccountFields: Story = {
  render: () => <AuthSectionExample />,
};

export const ProfileFields: Story = {
  render: () => <ProfileSectionExample />,
};

export const Interests: Story = {
  render: () => <InterestSectionExample />,
};

export const SignupTechStacks: Story = {
  render: () => <SignupTechStackExample />,
};

export const ProjectTechStacks: Story = {
  render: () => <ProjectTechStackExample />,
};

export const SelectedTechStackList: Story = {
  render: () => (
    <div className="w-screen max-w-2xl">
      <TechStackList
        sections={[
          {
            key: 'DEVELOP-FRONTEND',
            label: '개발(프론트엔드)',
            items: ['React', 'Next.js', 'TypeScript'],
          },
          {
            key: 'DESIGN-UI_UX',
            label: '디자인(UI/UX)',
            items: ['Figma', 'Design System'],
          },
        ]}
        onRemove={(key, tech) => console.log('remove', key, tech)}
      />
    </div>
  ),
};

export const ProfileExtra: Story = {
  render: () => <ProfileExtraSectionExample />,
};

export const AuthRequired: Story = {
  render: () => <AuthRequiredFallback />,
};
