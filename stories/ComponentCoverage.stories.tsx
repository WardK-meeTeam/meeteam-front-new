import { useMemo, useRef, useState } from 'react';
import { Code2, FileText } from 'lucide-react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import AuthLink from '@/components/features/auth/AuthLink';
import AuthRequiredFallback from '@/components/features/auth/AuthRequiredFallback';
import AuthSection from '@/components/features/auth/AuthSection';
import AuthSessionBootstrap from '@/components/features/auth/AuthSessionBootstrap';
import AuthSignupShell from '@/components/features/auth/AuthSignupShell';
import InterestRow from '@/components/features/auth/InterestRow';
import LoginForm from '@/components/features/auth/LoginForm';
import LoginPromptModal from '@/components/features/auth/LoginPromptModal';
import ProfileSection from '@/components/features/auth/ProfileSection';
import RedirectIfAuthenticated from '@/components/features/auth/RedirectIfAuthenticated';
import RequireAuth from '@/components/features/auth/RequireAuth';
import SejongSignupForm from '@/components/features/auth/SejongSignupForm';
import SignupForm from '@/components/features/auth/SignupForm';
import HomeMemberSection from '@/components/features/home/HomeMemberSection';
import HomeProjectSection from '@/components/features/home/HomeProjectSection';
import StartJourneyModalTrigger from '@/components/features/home/StartJourneyModalTrigger';
import NotificationsPage from '@/components/features/notification/NotificationsPage';
import MyApplicationsPage from '@/components/features/profile/MyApplicationsPage';
import ProfileOverview from '@/components/features/profile/ProfileOverview';
import ProfileSettingsPage from '@/components/features/profile/ProfileSettingsPage';
import ProjectApplicationDetailPage from '@/components/features/project/apply/ProjectApplicationDetailPage';
import ProjectApplyPage from '@/components/features/project/apply/ProjectApplyPage';
import CategoryBox from '@/components/features/project/create/CategoryBox';
import CoverImageUploader from '@/components/features/project/create/CoverImageUploader';
import CreateProjectPage from '@/components/features/project/create/CreateProjectPage';
import DateSelector from '@/components/features/project/create/DateSelector';
import ProjectForm from '@/components/features/project/create/ProjectForm';
import ProjectFormSectionNav from '@/components/features/project/create/ProjectFormSectionNav';
import RecruitDeadlineField from '@/components/features/project/create/RecruitDeadlineField';
import ProjectActionButtons from '@/components/features/project/detail/ProjectActionButtons';
import ProjectDetailContent, {
  type ProjectDetailTab,
} from '@/components/features/project/detail/ProjectDetailContent';
import ProjectDetailPage from '@/components/features/project/detail/ProjectDetailPage';
import ProjectDetailSkeleton from '@/components/features/project/detail/ProjectDetailSkeleton';
import ProjectDetailTabButton from '@/components/features/project/detail/ProjectDetailTabButton';
import ProjectDetailTabs from '@/components/features/project/detail/ProjectDetailTabs';
import ProjectIntroSection from '@/components/features/project/detail/ProjectIntroSection';
import IntroSectionHeading from '@/components/features/project/detail/project-intro/IntroSectionHeading';
import IntroSkillChip from '@/components/features/project/detail/project-intro/IntroSkillChip';
import IntroTechStackCard from '@/components/features/project/detail/project-intro/IntroTechStackCard';
import ProjectDetailDescriptionSection from '@/components/features/project/detail/project-intro/ProjectDetailDescriptionSection';
import ProjectExternalLinksSection from '@/components/features/project/detail/project-intro/ProjectExternalLinksSection';
import ProjectTechStackSection from '@/components/features/project/detail/project-intro/ProjectTechStackSection';
import ProjectQnaSection from '@/components/features/project/detail/ProjectQnaSection';
import ProjectRecruitSection from '@/components/features/project/detail/ProjectRecruitSection';
import { ProjectFindFilters } from '@/components/features/project/find/ProjectFindFilters';
import ProjectFindPage from '@/components/features/project/find/ProjectFindPage';
import { ProjectFindResults } from '@/components/features/project/find/ProjectFindResults';
import type {
  CategoryFilter,
  FieldFilter,
  PlatformFilter,
  RecruitFilter,
} from '@/components/features/project/find/types';
import ProjectApplicantDetailModal from '@/components/features/project/manage/ProjectApplicantDetailModal';
import ProjectManageApplicants from '@/components/features/project/manage/ProjectManageApplicants';
import ProjectManageEdit from '@/components/features/project/manage/ProjectManageEdit';
import ProjectManageOverview from '@/components/features/project/manage/ProjectManageOverview';
import ProjectManageShell from '@/components/features/project/manage/ProjectManageShell';
import {
  ProjectManageEditSkeleton,
  ProjectManageOverviewSkeleton,
} from '@/components/features/project/manage/ProjectManageSkeletons';
import ProjectMemberRemovalModal from '@/components/features/project/manage/ProjectMemberRemovalModal';
import ProjectPendingRecruitmentDeleteModal from '@/components/features/project/manage/ProjectPendingRecruitmentDeleteModal';
import { ProjectCard } from '@/components/features/project/ProjectCard';
import { ProjectCardSkeleton } from '@/components/features/project/ProjectCardSkeleton';
import ProjectCoverImage from '@/components/features/project/ProjectCoverImage';
import { TeammateFinderPanel } from '@/components/features/team/TeammateFinderPanel';
import { TeammateListSection } from '@/components/features/team/TeammateListSection';
import { TEAMMATE_ROLE_OPTIONS } from '@/components/features/team/constants';
import TeammatesPage from '@/components/features/team/TeammatesPage';
import BaseButton from '@/components/shared/BaseButton';
import ImageCropModal from '@/components/shared/ImageCropModal';
import { NavBar } from '@/components/shared/NavBar';
import Portal from '@/components/shared/Portal';
import ProfileMenu from '@/components/shared/ProfileMenu';
import TechStackIcon from '@/components/shared/TechStackIcon';
import UniversityLogo from '@/components/shared/UniversityLogo';
import UserCard from '@/components/shared/UserCard';
import { useLoginModalStore } from '@/stores/useLoginModalStore';
import type { JobFieldOption } from '@/types/auth';
import type { ProjectApplicant, ProjectFormValues, ProjectRecord } from '@/types/project';
import type { Teammate } from '@/types/team';

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
      { id: 4, name: 'Tailwind CSS' },
    ],
  },
  {
    code: 'DESIGN',
    name: '디자인',
    positions: [{ id: 3, code: 'UI_UX', name: 'UI/UX' }],
    techStacks: [
      { id: 5, name: 'Figma' },
      { id: 6, name: 'Design System' },
    ],
  },
];

const projectCard = {
  id: 101,
  title: '세종대 학생 팀빌딩 플랫폼 리뉴얼',
  imageUrl: '/campus-hero-generated.png',
  category: '캡스톤',
  deadline: '2026.05.31',
  currentMembers: 4,
  maxMembers: 6,
  leader: {
    name: '김미팀',
    avatar: '/brand/meeteam_character.png',
  },
  recruitInfo: [
    {
      id: 'frontend',
      role: '개발',
      subRoles: ['프론트엔드'],
      status: 'open',
      current: 1,
      max: 2,
    },
    {
      id: 'design',
      role: '디자인',
      subRoles: ['UI/UX'],
      status: 'closed',
      current: 1,
      max: 1,
    },
  ],
};

const projectRecord: ProjectRecord = {
  id: '101',
  title: '세종대 학생 팀빌딩 플랫폼 리뉴얼',
  subtitle: '프로젝트 상세',
  status: 'recruiting',
  projectName: '세종대 학생 팀빌딩 플랫폼 리뉴얼',
  githubUrl: 'https://github.com/meeteam/front',
  communicationUrl: 'https://discord.gg/meeteam',
  categoryId: 'capstone',
  description: `## 프로젝트 소개
세종대 학생들이 더 쉽게 팀을 꾸릴 수 있도록 프로젝트 탐색과 지원 흐름을 개선합니다.

- Next.js App Router
- TypeScript 기반 폼 검증
- 반응형 프로젝트 상세 화면`,
  releasePlatforms: ['웹'],
  myInterest: { major: '개발', minor: '프론트엔드' },
  recruitInterests: [
    { major: '개발', minor: '프론트엔드', count: 2 },
    { major: '디자인', minor: 'UI/UX', count: 1 },
  ],
  recruitTechStacks: {
    '개발 - 프론트엔드': ['React', 'Next.js', 'TypeScript'],
    '디자인 - UI/UX': ['Figma', 'Design System'],
  },
  recruitDeadline: '2026-05-31',
  isRecruitUntilComplete: false,
  targetMemberCount: 4,
  members: [
    {
      id: 1,
      name: '김미팀',
      role: '프론트엔드',
      avatarUrl: '/brand/meeteam_character.png',
      isLeader: true,
    },
    {
      id: 2,
      name: '이지원',
      role: 'UI/UX',
      avatarUrl: '/brand/meeteam_character_hat.png',
    },
  ],
  applicants: [],
  summary: '학생 팀빌딩 플랫폼 리뉴얼',
  coverImageUrl: '/campus-hero-generated.png',
  createdAt: '2026-04-01',
  leaderRole: '프론트엔드',
  recruitmentStatus: 'RECRUITING',
  leaderProfileId: 1,
  isLeader: true,
  leaderTechStacks: ['React', 'Next.js', 'TypeScript'],
  likeCount: 128,
  isLiked: true,
  recruitmentDetails: [
    {
      id: '101-1',
      jobFieldCode: 'DEVELOP',
      jobFieldName: '개발',
      jobPositionName: '프론트엔드',
      recruitmentCount: 2,
      currentCount: 1,
      isClosed: false,
      techStacks: ['React', 'Next.js', 'TypeScript'],
    },
    {
      id: '101-2',
      jobFieldCode: 'DESIGN',
      jobFieldName: '디자인',
      jobPositionName: 'UI/UX',
      recruitmentCount: 1,
      currentCount: 1,
      isClosed: true,
      techStacks: ['Figma', 'Design System'],
    },
  ],
};

const projectFormValues: ProjectFormValues = {
  projectName: projectRecord.projectName,
  githubUrl: projectRecord.githubUrl,
  communicationUrl: projectRecord.communicationUrl,
  categoryId: projectRecord.categoryId,
  description: projectRecord.description,
  releasePlatforms: projectRecord.releasePlatforms,
  myInterest: projectRecord.myInterest,
  recruitInterests: projectRecord.recruitInterests,
  recruitTechStacks: projectRecord.recruitTechStacks,
  recruitDeadline: projectRecord.recruitDeadline,
  isRecruitUntilComplete: projectRecord.isRecruitUntilComplete,
  coverImage: null,
};

const teammates: Teammate[] = [
  {
    id: 32,
    name: '이지원',
    role: '프론트엔드',
    experienceCount: 3,
    skills: ['React', 'Next.js', 'TypeScript'],
    imageUrl: '/brand/meeteam_character_hat.png',
  },
  {
    id: 33,
    name: '박디자인',
    role: '디자이너',
    experienceCount: 2,
    skills: ['Figma', 'Design System'],
    imageUrl: '/brand/meeteam_character.png',
  },
];

const applicant: ProjectApplicant = {
  id: 7,
  applicantId: 77,
  name: '정지원',
  position: '개발',
  specialty: '프론트엔드',
  appliedAt: '2026.05.01',
  email: 'apply@sejong.ac.kr',
  introduction: 'React와 접근성 개선에 관심이 많습니다. 팀과 함께 빠르게 배우고 싶습니다.',
  avatarUrl: '/brand/meeteam_character_hat.png',
  status: 'pending',
  age: 24,
  gender: 'FEMALE',
  techStacks: [
    { id: 1, name: 'React', displayOrder: 1 },
    { id: 2, name: 'TypeScript', displayOrder: 2 },
  ],
  currentCount: 1,
  recruitmentCount: 2,
  isRecruitmentFull: false,
};

const backendProject = {
  projectId: 101,
  projectName: projectCard.title,
  categoryName: projectCard.category,
  categoryCode: 'CAPSTONE',
  platformName: '웹',
  imageUrl: projectCard.imageUrl,
  endDate: '2026-05-31',
  creatorName: projectCard.leader.name,
  creatorImageUrl: projectCard.leader.avatar,
  currentCount: projectCard.currentMembers,
  recruitmentCount: projectCard.maxMembers,
  recruitments: [
    {
      jobFieldName: '개발',
      jobPositionName: '프론트엔드',
      currentCount: 1,
      recruitmentCount: 2,
      isClosed: false,
    },
    {
      jobFieldName: '디자인',
      jobPositionName: 'UI/UX',
      currentCount: 1,
      recruitmentCount: 1,
      isClosed: true,
    },
  ],
};

const backendMember = {
  memberId: 32,
  name: '이지원',
  profileImageUrl: '/brand/meeteam_character_hat.png',
  jobFieldName: '프론트',
  projectCount: 3,
  techStacks: [
    { id: 1, name: 'React', displayOrder: 1 },
    { id: 2, name: 'Next.js', displayOrder: 2 },
    { id: 3, name: 'TypeScript', displayOrder: 3 },
  ],
};

function storyResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify({ data }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function installStorybookFetchMock() {
  if (typeof window === 'undefined') {
    return;
  }

  const mockedWindow = window as Window & { __meeteamStorybookFetchMock?: boolean };
  if (mockedWindow.__meeteamStorybookFetchMock) {
    return;
  }

  mockedWindow.__meeteamStorybookFetchMock = true;
  mockedWindow.fetch = async (input) => {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;

    if (url.includes('/api/v1/jobs/options')) {
      return storyResponse({ fields: jobFields });
    }

    if (url.includes('/api/v1/main/projects') || url.includes('/api/v1/projects/search')) {
      return storyResponse({
        content: [backendProject],
        last: true,
        first: true,
        number: 0,
        size: 4,
        numberOfElements: 1,
        empty: false,
      });
    }

    if (url.includes('/api/v1/main/members') || url.includes('/api/v1/members/search')) {
      return storyResponse({
        content: [backendMember],
        last: true,
        first: true,
        number: 0,
        size: 5,
        totalElements: 1,
        empty: false,
      });
    }

    if (url.includes('/api/v1/members/me/applications')) {
      return storyResponse([
        {
          applicationId: 7,
          projectId: 101,
          projectName: projectCard.title,
          projectImageUrl: projectCard.imageUrl,
          jobPositionId: 1,
          jobPositionName: '프론트엔드',
          status: 'PENDING',
          statusDisplayName: '대기중',
          appliedAt: '2026.05.01',
        },
      ]);
    }

    if (url.includes('/api/v1/members/me')) {
      return storyResponse({
        name: '김미팀',
        memberId: 1,
        age: 24,
        gender: 'FEMALE',
        email: 'meeteam@sejong.ac.kr',
        githubUrl: 'https://github.com/meeteam',
        blogUrl: 'https://meeteam.dev',
        representativePosition: '프론트엔드',
        groupedSkills: [
          {
            jobFieldName: '개발',
            jobPositionName: '프론트엔드',
            techStacks: ['React', 'Next.js', 'TypeScript'],
          },
        ],
        isParticipating: true,
        projectCount: 3,
        introduce: '함께 성장하는 팀을 좋아하는 프론트엔드 개발자입니다.',
        profileImageUrl: '/brand/meeteam_character_hat.png',
        projectCards: [
          {
            projectId: 101,
            projectName: projectCard.title,
            categoryName: projectCard.category,
            imageUrl: projectCard.imageUrl,
            creatorName: projectCard.leader.name,
            creatorImageUrl: projectCard.leader.avatar,
            currentCount: projectCard.currentMembers,
            recruitmentCount: projectCard.maxMembers,
          },
        ],
      });
    }

    if (url.match(/\/api\/v1\/members\/\d+/)) {
      return storyResponse({
        memberId: 1,
        profileImageUrl: '/brand/meeteam_character_hat.png',
        name: '김미팀',
        age: 24,
        gender: 'FEMALE',
        representativePosition: '프론트엔드',
        jobPositions: ['프론트엔드'],
        email: 'meeteam@sejong.ac.kr',
        githubUrl: 'https://github.com/meeteam',
        blogUrl: 'https://meeteam.dev',
        isParticipating: true,
        introduce: '함께 성장하는 팀을 좋아합니다.',
        participatedProjectCount: 3,
        participatedProjects: [
          {
            projectId: 101,
            projectName: projectCard.title,
            categoryName: projectCard.category,
            imageUrl: projectCard.imageUrl,
            creatorName: projectCard.leader.name,
            creatorImageUrl: projectCard.leader.avatar,
            currentCount: projectCard.currentMembers,
            recruitmentCount: projectCard.maxMembers,
          },
        ],
        groupedSkills: [
          {
            jobFieldName: '개발',
            jobPositionName: '프론트엔드',
            techStacks: ['React', 'Next.js', 'TypeScript'],
          },
        ],
      });
    }

    if (url.includes('/api/v1/notifications/unread/count')) {
      return storyResponse({ unreadCount: 3 });
    }

    if (url.includes('/api/v1/notifications')) {
      return storyResponse({
        content: [
          {
            id: 1,
            type: 'PROJECT_APPLY',
            message: '새로운 지원자가 있습니다.',
            isRead: false,
            createdAt: '2026-05-01T09:00:00',
            payload: {
              projectId: 101,
              projectName: projectCard.title,
              applicantName: applicant.name,
              applicationId: applicant.id,
            },
          },
        ],
        last: true,
        number: 0,
        empty: false,
      });
    }

    if (url.includes('/api/v1/projects/101/qna')) {
      return storyResponse({
        content: [
          {
            qnaId: 1,
            questionerId: 2,
            questionerName: '이지원',
            questionerProfileImageUrl: '/brand/meeteam_character_hat.png',
            question: '프론트엔드 지원자는 어떤 업무를 맡게 되나요?',
            createdAt: '2026.05.01',
            isSecret: false,
            answers: [
              {
                answerId: 1,
                writerId: 1,
                writerName: '김미팀',
                writerProfileImageUrl: '/brand/meeteam_character.png',
                isLeader: true,
                content: '프로젝트 상세와 지원 플로우 개선을 함께 맡게 됩니다.',
                createdAt: '2026.05.01',
              },
            ],
          },
        ],
        last: true,
        number: 0,
        totalElements: 1,
      });
    }

    if (url.includes('/api/v1/projects/101/application')) {
      return storyResponse({
        applicant: {
          profileImageUrl: applicant.avatarUrl,
          name: applicant.name,
          jobFieldNames: ['개발'],
          jobPositionNames: ['프론트엔드'],
          age: applicant.age,
          gender: applicant.gender,
          email: applicant.email,
          techStacks: applicant.techStacks,
          profileSummary: applicant.introduction,
        },
        recruitments: [
          {
            id: 1,
            jobFieldName: '개발',
            jobPositionName: '프론트엔드',
            techStacks: ['React', 'Next.js', 'TypeScript'],
            isClosed: false,
          },
        ],
      });
    }

    if (url.includes('/api/v1/projects/101/applications/7')) {
      return storyResponse({
        applicationId: 7,
        applicantId: 77,
        applicantName: applicant.name,
        profileImageUrl: applicant.avatarUrl,
        age: applicant.age,
        gender: applicant.gender,
        applicantEmail: applicant.email,
        jobPosition: {
          jobPositionId: 1,
          jobPositionName: applicant.specialty,
          jobFieldId: 1,
          jobFieldName: applicant.position,
        },
        techStacks: applicant.techStacks,
        motivation: applicant.introduction,
        status: 'PENDING',
      });
    }

    if (url.includes('/api/v1/projects/101/applications')) {
      return storyResponse([
        {
          applicationId: 7,
          applicantId: 77,
          applicantName: applicant.name,
          profileImageUrl: applicant.avatarUrl,
          applicantEmail: applicant.email,
          jobFieldName: applicant.position,
          jobPositionName: applicant.specialty,
          motivation: applicant.introduction,
          status: 'PENDING',
          appliedAt: applicant.appliedAt,
          currentCount: applicant.currentCount,
          recruitmentCount: applicant.recruitmentCount,
          isRecruitmentFull: false,
        },
      ]);
    }

    if (url.includes('/api/v1/project/like/101')) {
      return storyResponse({ isLiked: true, liked: true, likeCount: 128, projectId: 101 });
    }

    if (url.includes('/api/v1/projects/101/team')) {
      return storyResponse({
        currentMemberCount: 2,
        totalRecruitmentCount: 4,
        pendingApplicationCount: 2,
        members: [
          {
            memberId: 1,
            name: '김미팀',
            profileImageUrl: '/brand/meeteam_character.png',
            jobFieldName: '개발',
            jobPositionName: '프론트엔드',
            isLeader: true,
          },
          {
            memberId: 2,
            name: '이지원',
            profileImageUrl: '/brand/meeteam_character_hat.png',
            jobFieldName: '디자인',
            jobPositionName: 'UI/UX',
            isLeader: false,
          },
        ],
      });
    }

    if (url.includes('/api/v1/projects/101/edit')) {
      return storyResponse({
        projectId: 101,
        name: projectRecord.title,
        description: projectRecord.description,
        projectCategory: 'CAPSTONE',
        projectCategoryName: '캡스톤',
        platformCategory: 'WEB',
        recruitmentDeadlineType: 'END_DATE',
        githubRepositoryUrl: projectRecord.githubUrl,
        communicationChannelUrl: projectRecord.communicationUrl,
        endDate: projectRecord.recruitDeadline,
        imageUrl: projectRecord.coverImageUrl,
        leaderJobFieldName: '개발',
        leaderJobPositionName: '프론트엔드',
        recruitments: [
          {
            recruitmentStateId: 1,
            jobFieldCode: 'DEVELOP',
            jobFieldName: '개발',
            jobPositionCode: 'FRONTEND',
            jobPositionName: '프론트엔드',
            recruitmentCount: 2,
            currentCount: 1,
            pendingApplicationCount: 1,
            techStackIds: [1, 2, 3],
            techStackNames: ['React', 'Next.js', 'TypeScript'],
            deletable: true,
            notDeletableReason: null,
            minRecruitmentCount: 1,
          },
        ],
        editable: true,
        notEditableReason: null,
      });
    }

    if (url.includes('/api/v1/projects/101')) {
      return storyResponse({
        id: 101,
        name: projectRecord.title,
        description: projectRecord.description,
        projectCategory: 'CAPSTONE',
        platformCategory: 'WEB',
        imageUrl: projectRecord.coverImageUrl,
        recruitmentStatus: 'RECRUITING',
        recruitmentDeadlineType: 'END_DATE',
        startDate: '2026-04-01',
        endDate: '2026-05-31',
        githubRepositoryUrl: projectRecord.githubUrl,
        communicationChannelUrl: projectRecord.communicationUrl,
        leader: {
          id: 1,
          name: projectCard.leader.name,
          profileImageUrl: projectCard.leader.avatar,
          jobPositions: [
            {
              jobFieldCode: 'DEVELOP',
              jobFieldName: '개발',
              jobPositionName: '프론트엔드',
            },
          ],
          techStacks: ['React', 'Next.js', 'TypeScript'],
        },
        members: [
          {
            memberId: 1,
            name: '김미팀',
            profileImageUrl: '/brand/meeteam_character.png',
            jobFieldName: '개발',
            jobPositionName: '프론트엔드',
            isLeader: true,
          },
        ],
        recruitments: [
          {
            jobFieldCode: 'DEVELOP',
            jobFieldName: '개발',
            jobPositionName: '프론트엔드',
            recruitmentCount: 2,
            currentCount: 1,
            isClosed: false,
            techStacks: ['React', 'Next.js', 'TypeScript'],
          },
        ],
        likeCount: 128,
        isLiked: true,
        isLeader: true,
      });
    }

    return storyResponse(null);
  };
}

const meta = {
  title: 'Coverage/Component Coverage',
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => {
      installStorybookFetchMock();
      return <Story />;
    },
  ],
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function StoryShell({ children, narrow = false }: { children: React.ReactNode; narrow?: boolean }) {
  return (
    <main className="min-h-screen bg-mt-bg-soft px-4 py-8 sm:px-6">
      <div className={`mx-auto w-full ${narrow ? 'max-w-2xl' : 'max-w-6xl'}`}>{children}</div>
    </main>
  );
}

function AuthFieldsMatrix() {
  const [email, setEmail] = useState('meeteam@sejong.ac.kr');
  const [password, setPassword] = useState('password123');
  const [passwordConfirm, setPasswordConfirm] = useState('password123');
  const [name, setName] = useState('김미팀');
  const [birth, setBirth] = useState('2002-03-15');
  const [gender, setGender] = useState('female');

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="rounded-3xl border border-mt-border bg-mt-white p-6 shadow-sm">
        <AuthSection
          email={email}
          password={password}
          passwordConfirm={passwordConfirm}
          emailFeedback="사용 가능한 이메일입니다."
          emailFeedbackTone="success"
          isCheckingEmail={false}
          onChangeEmail={(event) => setEmail(event.target.value)}
          onChangePassword={(event) => setPassword(event.target.value)}
          onChangePasswordConfirm={(event) => setPasswordConfirm(event.target.value)}
          onCheckEmail={() => undefined}
        />
      </section>
      <section className="rounded-3xl border border-mt-border bg-mt-white p-6 shadow-sm">
        <ProfileSection
          name={name}
          birth={birth}
          gender={gender}
          onChangeName={(event) => setName(event.target.value)}
          onChangeBirth={setBirth}
          onChangeGender={(event) => setGender(event.target.value)}
        />
      </section>
    </div>
  );
}

function InterestRowExample() {
  const [value, setValue] = useState({ major: 'DEVELOP', minor: 'FRONTEND' });

  return (
    <div className="rounded-3xl border border-mt-border bg-mt-white p-6 shadow-sm">
      <InterestRow
        index={0}
        jobFields={jobFields}
        value={value}
        length={2}
        onChange={setValue}
        onRemove={() => undefined}
      />
    </div>
  );
}

function LoginPromptOpen() {
  const openLoginModal = useLoginModalStore((state) => state.openLoginModal);

  useMemo(() => {
    openLoginModal({
      title: '로그인이 필요해요',
      redirectPath: '/projects/create',
    });
  }, [openLoginModal]);

  return <LoginPromptModal />;
}

function ProjectCreateParts() {
  const [selectedCategory, setSelectedCategory] = useState('capstone');
  const [deadline, setDeadline] = useState('2026-05-31');
  const [untilComplete, setUntilComplete] = useState(false);
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <div className="grid gap-6 lg:grid-cols-[17rem_minmax(0,1fr)]">
      <ProjectFormSectionNav
        sections={[
          { title: '프로젝트 정보', description: '이름과 카테고리' },
          { title: '소개와 링크', description: '소개글과 저장소' },
          { title: '역할과 모집', description: '리더와 모집 분야' },
        ]}
        activeIndex={activeIndex}
        onSelect={setActiveIndex}
      />
      <section className="space-y-6 rounded-3xl border border-mt-border bg-mt-white p-6 shadow-sm">
        <div className="grid gap-2 sm:grid-cols-4">
          {['capstone', 'creative-semester', 'club', 'other'].map((category) => (
            <CategoryBox
              key={category}
              label={category === 'capstone' ? '캡스톤' : category}
              selected={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            />
          ))}
        </div>
        <DateSelector value={deadline} onChange={setDeadline} />
        <RecruitDeadlineField
          deadline={deadline}
          onDeadlineChange={setDeadline}
          untilComplete={untilComplete}
          onUntilCompleteChange={setUntilComplete}
          minDate="2026-05-01"
        />
        <CoverImageUploader initialPreviewUrl="/campus-hero-generated.png" />
      </section>
    </div>
  );
}

function ProjectFindFiltersExample() {
  const [searchValue, setSearchValue] = useState('팀빌딩');
  const [category, setCategory] = useState<CategoryFilter>('캡스톤');
  const [recruitOnly, setRecruitOnly] = useState<RecruitFilter>('recruiting');
  const [platform, setPlatform] = useState<PlatformFilter>('웹');
  const [field, setField] = useState<FieldFilter>('프론트엔드');

  return (
    <ProjectFindFilters
      searchValue={searchValue}
      category={category}
      recruitOnly={recruitOnly}
      platform={platform}
      field={field}
      onSearchValueChange={setSearchValue}
      onCategoryChange={setCategory}
      onRecruitOnlyChange={setRecruitOnly}
      onPlatformChange={setPlatform}
      onFieldChange={setField}
    />
  );
}

function ProjectFindResultsExample() {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  return (
    <ProjectFindResults
      projects={[projectCard]}
      countLabel="1"
      sort="latest"
      isInitialLoading={false}
      isLoadingMore={false}
      hasMore={false}
      hasActiveFilters
      errorMessage={null}
      loadMoreRef={loadMoreRef}
      onSortChange={() => undefined}
      onResetFilters={() => undefined}
      onRetry={() => undefined}
    />
  );
}

function DetailTabsExample() {
  const [tab, setTab] = useState<ProjectDetailTab>('recruit');

  return (
    <div className="space-y-6 rounded-3xl border border-mt-border bg-mt-white p-6 shadow-sm">
      <ProjectDetailTabs activeTab={tab} onTabChange={setTab} />
      <div className="flex gap-6">
        <ProjectDetailTabButton tab="intro" label="소개 단일 버튼" isActive onSelect={setTab} />
        <ProjectDetailTabButton tab="qna" label="Q&A 단일 버튼" isActive={false} onSelect={setTab} />
      </div>
    </div>
  );
}

function ProjectDetailContentExample() {
  const [tab, setTab] = useState<ProjectDetailTab>('intro');

  return (
    <ProjectDetailContent
      project={projectRecord}
      activeTab={tab}
      onTabChange={setTab}
      onCopyExternalUrl={() => undefined}
    />
  );
}

function ProjectIntroParts() {
  return (
    <div className="space-y-6">
      <ProjectDetailDescriptionSection description={projectRecord.description} />
      <ProjectExternalLinksSection
        githubUrl={projectRecord.githubUrl}
        communicationUrl={projectRecord.communicationUrl}
        onCopy={() => undefined}
      />
      <ProjectTechStackSection
        groups={[
          { title: '개발', subtitle: '프론트엔드', skills: ['React', 'Next.js', 'TypeScript'] },
          { title: '디자인', subtitle: 'UI/UX', skills: ['Figma', 'Design System'] },
        ]}
      />
      <div className="rounded-3xl border border-mt-border bg-mt-white p-6 shadow-sm">
        <IntroSectionHeading
          title="섹션 제목"
          icon={<FileText className="h-5 w-5" aria-hidden strokeWidth={1.8} />}
        />
        <div className="mt-4 flex flex-wrap gap-2">
          <IntroSkillChip label="React" />
          <IntroSkillChip label="TypeScript" />
        </div>
      </div>
      <IntroTechStackCard
        title="개발"
        subtitle="백엔드"
        skills={['Spring Boot', 'MySQL', 'Redis']}
      />
    </div>
  );
}

function TeammateFinderExample() {
  const [search, setSearch] = useState('지원');
  const [role, setRole] = useState<(typeof TEAMMATE_ROLE_OPTIONS)[number]>('프론트엔드');
  const [skills, setSkills] = useState(['React']);

  return (
    <TeammateFinderPanel
      searchValue={search}
      selectedRole={role}
      selectedSkills={skills}
      availableSkills={['React', 'Next.js', 'TypeScript', 'Figma']}
      onSearchChange={setSearch}
      onRoleChange={setRole}
      onSelectedSkillsChange={setSkills}
    />
  );
}

function TeammateListExample() {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  return (
    <TeammateListSection
      teammates={teammates}
      totalCount={teammates.length}
      sort="projectCount"
      isInitialLoading={false}
      isLoadingMore={false}
      hasMore={false}
      errorMessage={null}
      loadMoreRef={loadMoreRef}
      onRetry={() => undefined}
      onSortChange={() => undefined}
    />
  );
}

function SharedNavigationMedia() {
  const [cropOpen, setCropOpen] = useState(false);
  const cropFile = useMemo(
    () =>
      typeof File === 'undefined'
        ? null
        : new File(['storybook image placeholder'], 'profile.png', { type: 'image/png' }),
    [],
  );

  return (
    <div className="space-y-8">
      <NavBar />
      <div className="grid gap-6 lg:grid-cols-3">
        <section className="rounded-3xl border border-mt-border bg-mt-white p-6 shadow-sm">
          <ProfileMenu />
        </section>
        <section className="space-y-4 rounded-3xl border border-mt-border bg-mt-white p-6 shadow-sm">
          <UniversityLogo universityId="sejong" className="h-auto w-48" />
          <UniversityLogo universityId="sejong" variant="icon" className="h-12 w-12" />
        </section>
        <section className="flex flex-wrap items-center gap-4 rounded-3xl border border-mt-border bg-mt-white p-6 shadow-sm">
          {['React', 'Next.js', 'TypeScript', 'Figma', 'Spring Boot'].map((label) => (
            <span key={label} className="inline-flex items-center gap-2 text-sm font-bold">
              <TechStackIcon label={label} size={20} />
              {label}
            </span>
          ))}
        </section>
      </div>
      <UserCard
        userId={32}
        name="이지원"
        role="프론트엔드"
        experience="참여 프로젝트 3개"
        skills={['React', 'Next.js', 'TypeScript']}
        imageUrl="/brand/meeteam_character_hat.png"
      />
      <BaseButton onClick={() => setCropOpen(true)}>이미지 크롭 모달 열기</BaseButton>
      <ImageCropModal
        file={cropFile}
        isOpen={cropOpen}
        title="프로필 이미지 조정"
        aspectRatio={1}
        outputWidth={512}
        outputHeight={512}
        cropShape="circle"
        onClose={() => setCropOpen(false)}
        onConfirm={() => setCropOpen(false)}
      />
      <Portal>
        <div className="pointer-events-none fixed right-6 bottom-6 rounded-xl border border-mt-border bg-mt-white px-4 py-3 text-sm font-bold text-mt-primary shadow-xl">
          Portal 렌더링 영역
        </div>
      </Portal>
    </div>
  );
}

export const SharedNavigationAndMedia: Story = {
  render: () => (
    <StoryShell>
      <SharedNavigationMedia />
    </StoryShell>
  ),
};

export const AuthFormsAndGuards: Story = {
  render: () => (
    <StoryShell>
      <div className="space-y-8">
        <AuthFieldsMatrix />
        <InterestRowExample />
        <div className="grid gap-6 lg:grid-cols-2">
          <AuthSignupShell title="회원가입">
            <AuthLink href="/projects/create" className="font-bold text-mt-primary">
              보호된 링크 예시
            </AuthLink>
          </AuthSignupShell>
          <section className="rounded-3xl border border-mt-border bg-mt-white p-6 shadow-sm">
            <RequireAuth>
              <p className="text-sm font-bold text-mt-primary">인증된 사용자 전용 콘텐츠</p>
            </RequireAuth>
            <RedirectIfAuthenticated>
              <p className="mt-4 text-sm font-bold text-mt-text-primary">
                비로그인 사용자에게 보이는 콘텐츠
              </p>
            </RedirectIfAuthenticated>
            <AuthSessionBootstrap />
            <AuthRequiredFallback />
          </section>
        </div>
      </div>
    </StoryShell>
  ),
};

export const LoginAndSignupScreens: Story = {
  render: () => (
    <StoryShell>
      <div className="grid gap-6 xl:grid-cols-3">
        <section className="rounded-3xl border border-mt-border bg-mt-white p-6 shadow-sm">
          <LoginForm />
        </section>
        <section className="rounded-3xl border border-mt-border bg-mt-white p-6 shadow-sm">
          <SignupForm />
        </section>
        <section className="rounded-3xl border border-mt-border bg-mt-white p-6 shadow-sm">
          <SejongSignupForm />
        </section>
      </div>
      <LoginPromptOpen />
    </StoryShell>
  ),
};

export const ProjectCreateComponents: Story = {
  render: () => (
    <StoryShell>
      <ProjectCreateParts />
    </StoryShell>
  ),
};

export const ProjectFormScreens: Story = {
  render: () => (
    <StoryShell>
      <div className="space-y-10">
        <ProjectForm initialValues={projectFormValues} initialCoverImageUrl="/campus-hero.jpg" />
        <ProjectForm
          variant="edit"
          initialValues={projectFormValues}
          initialCoverImageUrl="/campus-hero-generated.png"
        />
        <CreateProjectPage />
      </div>
    </StoryShell>
  ),
};

export const ProjectCardsAndFinder: Story = {
  render: () => (
    <StoryShell>
      <div className="space-y-8">
        <div className="grid gap-6 md:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]">
          <ProjectCard project={projectCard} />
          <ProjectCoverImage src="/campus-hero-generated.png" alt="프로젝트 커버" />
        </div>
        <ProjectCardSkeleton />
        <ProjectFindFiltersExample />
        <ProjectFindResultsExample />
        <ProjectFindPage />
      </div>
    </StoryShell>
  ),
};

export const ProjectDetailComponents: Story = {
  render: () => (
    <StoryShell>
      <div className="space-y-8">
        <DetailTabsExample />
        <ProjectActionButtons
          projectId={projectRecord.id}
          projectTitle={projectRecord.title}
          initialLikeCount={projectRecord.likeCount ?? 0}
          initialLiked={projectRecord.isLiked ?? false}
        />
        <ProjectRecruitSection project={projectRecord} />
        <ProjectIntroSection project={projectRecord} onCopyExternalUrl={() => undefined} />
        <ProjectIntroParts />
        <ProjectDetailContentExample />
        <ProjectQnaSection project={projectRecord} />
        <ProjectDetailSkeleton />
        <ProjectDetailPage projectId={projectRecord.id} />
      </div>
    </StoryShell>
  ),
};

export const ProjectApplyAndManage: Story = {
  render: () => (
    <StoryShell>
      <div className="space-y-8">
        <ProjectApplyPage projectId={projectRecord.id} initialJobPositionCode="FRONTEND" />
        <ProjectApplicationDetailPage projectId={projectRecord.id} applicationId="7" />
        <ProjectApplicantDetailModal
          applicant={applicant}
          isOpen
          onClose={() => undefined}
          errorMessage={null}
        />
        <ProjectMemberRemovalModal
          isOpen
          memberName="이지원"
          onClose={() => undefined}
          onConfirm={() => undefined}
        />
        <ProjectPendingRecruitmentDeleteModal
          isOpen
          targets={[
            {
              recruitmentStateId: 1,
              label: '개발(프론트엔드)',
              pendingApplicationCount: 2,
            },
          ]}
          onClose={() => undefined}
          onConfirm={() => undefined}
        />
        <ProjectManageShell projectId={projectRecord.id} activeTab="members" pendingApplicantsCount={2}>
          <ProjectManageOverviewSkeleton />
        </ProjectManageShell>
        <ProjectManageOverview projectId={projectRecord.id} />
        <ProjectManageApplicants projectId={projectRecord.id} />
        <ProjectManageEdit projectId={projectRecord.id} />
        <ProjectManageEditSkeleton />
      </div>
    </StoryShell>
  ),
};

export const TeamComponentsAndPage: Story = {
  render: () => (
    <StoryShell>
      <div className="space-y-8">
        <TeammateFinderExample />
        <TeammateListExample />
        <TeammatesPage />
      </div>
    </StoryShell>
  ),
};

export const HomeNotificationProfilePages: Story = {
  render: () => (
    <StoryShell>
      <div className="space-y-10">
        <section className="rounded-3xl border border-mt-border bg-mt-white p-6 shadow-sm">
          <StartJourneyModalTrigger />
        </section>
        <HomeProjectSection />
        <HomeMemberSection />
        <NotificationsPage />
        <ProfileOverview memberId={1} />
        <MyApplicationsPage />
        <ProfileSettingsPage />
      </div>
    </StoryShell>
  ),
};

export const EmptyAndLoadingStates: Story = {
  render: () => (
    <StoryShell>
      <div className="grid gap-6 lg:grid-cols-2">
        <ProjectFindResults
          projects={[]}
          countLabel="0"
          sort="latest"
          isInitialLoading
          isLoadingMore={false}
          hasMore={false}
          hasActiveFilters={false}
          errorMessage={null}
          loadMoreRef={{ current: null }}
          onSortChange={() => undefined}
          onResetFilters={() => undefined}
          onRetry={() => undefined}
        />
        <TeammateListSection
          teammates={[]}
          totalCount={0}
          sort="name"
          isInitialLoading
          isLoadingMore={false}
          hasMore={false}
          errorMessage={null}
          loadMoreRef={{ current: null }}
          onRetry={() => undefined}
          onSortChange={() => undefined}
        />
        <section className="rounded-3xl border border-mt-border bg-mt-white p-6 shadow-sm">
          <IntroSectionHeading
            title="비어 있는 기술 스택"
            icon={<Code2 className="h-5 w-5" aria-hidden strokeWidth={1.8} />}
          />
          <IntroTechStackCard title="개발" subtitle="백엔드" skills={[]} />
        </section>
      </div>
    </StoryShell>
  ),
};
