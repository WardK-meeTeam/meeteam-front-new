'use client';

import { create } from 'zustand';
import {
  getProjectCategoryLabel,
  PROJECT_CATEGORIES,
  RELEASE_PLATFORMS,
} from '@/components/features/project/constants';
import type {
  ProjectApplicant,
  ProjectFormValues,
  ProjectMember,
  ProjectRecord,
  ProjectStatus,
} from '@/types/project';

type ProjectState = {
  projectsById: Record<string, ProjectRecord>;
  getProject: (projectId: string) => ProjectRecord | null;
  getProjects: () => ProjectRecord[];
  createProject: (values: ProjectFormValues) => string;
  updateProjectStatus: (projectId: string, status: ProjectStatus) => void;
  updateProject: (projectId: string, values: ProjectFormValues) => void;
  removeMember: (projectId: string, memberId: number) => void;
  approveApplicant: (projectId: string, applicantId: number) => void;
  rejectApplicant: (projectId: string, applicantId: number) => void;
};

const HERO_IMAGE_URLS = {
  first: 'http://localhost:3845/assets/96b5d67a8d8fcae1aba609faa758ade8f623622b.png',
  second: 'http://localhost:3845/assets/6980873dce6f2715a688f71d8dee1ba0a0b80da5.png',
  third: 'http://localhost:3845/assets/89a5ab8b98e9860baa75f2160855571fca81685d.png',
  fourth: 'http://localhost:3845/assets/1fe67e8741734af9ae135ee69b78e3f71cafa55b.png',
};

const LEADER_AVATARS = {
  first: 'http://localhost:3845/assets/ba1db031d4fee2753f0a652b54c40e44587f0435.png',
  second: 'http://localhost:3845/assets/376c60097782ec7998ff59b2a12be789342ac6b0.png',
  third: 'http://localhost:3845/assets/719a1595c614b01fa72ecad4467c0ebc34eddfd1.png',
  fourth: 'http://localhost:3845/assets/a45abb6ed5ec7384c6345774fa96cd300a68957b.png',
};

const toMember = (applicant: ProjectApplicant): ProjectMember => ({
  id: applicant.id,
  name: applicant.name,
  role: `${applicant.position} / ${applicant.specialty}`,
  avatarUrl: applicant.avatarUrl,
});

function buildSummary(description: string) {
  return description.length > 56 ? `${description.slice(0, 56).trim()}...` : description;
}

function createProjectRecord(input: ProjectRecord): ProjectRecord {
  return {
    ...input,
    title: input.projectName,
    summary: input.summary || buildSummary(input.description),
  };
}

const INITIAL_PROJECTS: Record<string, ProjectRecord> = {
  '1': createProjectRecord({
    id: '1',
    title: 'AI 기반 뉴스 요약 서비스 개발',
    subtitle: '프로젝트 통합 관리',
    status: 'recruiting',
    projectName: 'AI 기반 뉴스 요약 서비스 개발',
    githubUrl: 'https://github.com/meeteam/ai-news-summary',
    communicationUrl: 'https://open.kakao.com/o/meeteam_ai_news',
    categoryId: 'ai-tech',
    description:
      'AI 모델을 활용하여 매일 쏟아지는 뉴스를 핵심만 요약해주는 서비스를 만들고 있습니다.',
    releasePlatforms: ['웹', 'iOS'],
    myInterest: { major: '기획', minor: '프로덕트 매니저/오너' },
    recruitInterests: [
      { major: '프론트엔드', minor: '웹프론트엔드', count: 1 },
      { major: '백엔드', minor: 'AI', count: 1 },
    ],
    recruitTechStacks: {
      '프론트엔드 - 웹프론트엔드': ['React', 'TypeScript'],
      '백엔드 - AI': ['Python', 'FastAPI'],
    },
    recruitDeadline: '2026-01-23',
    isRecruitUntilComplete: false,
    targetMemberCount: 4,
    members: [
      {
        id: 1,
        name: '정연준',
        role: 'Frontend Dev',
        avatarUrl: 'http://localhost:3845/assets/f1172eb8cefcbe26d0f11c0aadeea5d533cb00a6.png',
        isLeader: true,
      },
      {
        id: 2,
        name: '김서연',
        role: 'Product Designer',
        avatarUrl: 'http://localhost:3845/assets/a45abb6ed5ec7384c6345774fa96cd300a68957b.png',
      },
    ],
    applicants: [
      {
        id: 101,
        name: '박희운',
        position: '프론트엔드',
        specialty: '웹프론트엔드',
        appliedAt: '2026.03.10 지원',
        email: 'phu98@naver.com',
        introduction:
          '안녕하세요! 리액트와 타입스크립트 경험이 있으며, 팀의 목표 달성에 기여하고 싶습니다.',
        avatarUrl: 'http://localhost:3845/assets/3ea6ec85f596f4c4e47b0d615f668f907bc0ca30.png',
        status: 'pending',
      },
      {
        id: 102,
        name: '이도윤',
        position: '백엔드',
        specialty: 'AI',
        appliedAt: '2026.03.12 지원',
        email: 'backend.doyoon@example.com',
        introduction:
          'FastAPI와 모델 서빙 경험이 있어, AI 뉴스 요약 파이프라인 구현을 맡고 싶습니다.',
        avatarUrl: LEADER_AVATARS.third,
        status: 'pending',
      },
    ],
    summary: '바쁜 현대인을 위한 3줄 뉴스 요약 서비스입니다.',
    coverImageUrl: HERO_IMAGE_URLS.first,
    createdAt: '2026-01-10',
    leaderRole: 'Frontend Dev',
  }),
  '2': createProjectRecord({
    id: '2',
    title: 'meeTeam: 사이드 프로젝트 모집 플랫폼',
    subtitle: '프로젝트 통합 관리',
    status: 'recruiting',
    projectName: 'meeTeam: 사이드 프로젝트 모집 플랫폼',
    githubUrl: 'https://github.com/meeteam/meeteam-web',
    communicationUrl: 'https://open.kakao.com/o/meeteam_main',
    categoryId: 'ai-tech',
    description: '사이드 프로젝트 팀빌딩을 더 쉽게 만드는 모집 플랫폼을 함께 만들고 있습니다.',
    releasePlatforms: ['웹'],
    myInterest: { major: '프론트엔드', minor: '웹프론트엔드' },
    recruitInterests: [
      { major: '프론트엔드', minor: '웹프론트엔드', count: 1 },
      { major: '백엔드', minor: '웹 서버', count: 1 },
    ],
    recruitTechStacks: {
      '프론트엔드 - 웹프론트엔드': ['React', 'Next.js', 'Tailwind CSS'],
      '백엔드 - 웹 서버': ['Node.js', 'NestJS', 'PostgreSQL'],
    },
    recruitDeadline: '2025-11-19',
    isRecruitUntilComplete: false,
    targetMemberCount: 9,
    members: [
      {
        id: 11,
        name: '이우진',
        role: 'Full Stack',
        avatarUrl: LEADER_AVATARS.second,
        isLeader: true,
      },
      {
        id: 12,
        name: '김서연',
        role: 'Product Designer',
        avatarUrl: LEADER_AVATARS.fourth,
      },
    ],
    applicants: [],
    summary: '사이드 프로젝트 팀빌딩을 더 쉽게 만드는 모집 플랫폼입니다.',
    coverImageUrl: HERO_IMAGE_URLS.second,
    createdAt: '2025-11-01',
    leaderRole: 'Full Stack',
  }),
  '3': createProjectRecord({
    id: '3',
    title: '트립게더: 여행 동행 구하기',
    subtitle: '프로젝트 통합 관리',
    status: 'recruiting',
    projectName: '트립게더: 여행 동행 구하기',
    githubUrl: 'https://github.com/meeteam/trip-together',
    communicationUrl: 'https://open.kakao.com/o/triptogether',
    categoryId: 'etc',
    description:
      '여행 동행을 더 쉽게 구하고 일정과 기록을 함께 남길 수 있는 모바일 서비스를 준비하고 있습니다.',
    releasePlatforms: ['iOS'],
    myInterest: { major: '기획', minor: '서비스/경험 기획' },
    recruitInterests: [
      { major: '디자인', minor: 'UI/UX/GUI 디자인', count: 1 },
      { major: '프론트엔드', minor: 'iOS', count: 1 },
    ],
    recruitTechStacks: {
      '디자인 - UI/UX/GUI 디자인': ['Figma'],
      '프론트엔드 - iOS': ['Swift'],
    },
    recruitDeadline: '2025-11-19',
    isRecruitUntilComplete: false,
    targetMemberCount: 10,
    members: [
      {
        id: 21,
        name: '주경현',
        role: 'PM',
        avatarUrl: LEADER_AVATARS.third,
        isLeader: true,
      },
    ],
    applicants: [],
    summary: '여행 일정과 동행 매칭을 함께 풀어내는 모바일 프로젝트입니다.',
    coverImageUrl: HERO_IMAGE_URLS.third,
    createdAt: '2025-10-28',
    leaderRole: 'PM',
  }),
  '4': createProjectRecord({
    id: '4',
    title: '반려식물 케어 다이어리',
    subtitle: '프로젝트 통합 관리',
    status: 'recruiting',
    projectName: '반려식물 케어 다이어리',
    githubUrl: 'https://github.com/meeteam/plant-diary',
    communicationUrl: 'https://open.kakao.com/o/plantdiary',
    categoryId: 'eco',
    description:
      '반려식물의 물 주기, 성장 기록, 케어 루틴을 관리하는 친환경 라이프스타일 앱입니다.',
    releasePlatforms: ['안드로이드'],
    myInterest: { major: '기획', minor: '서비스/경험 기획' },
    recruitInterests: [
      { major: '기획', minor: '서비스/경험 기획', count: 1 },
      { major: '프론트엔드', minor: '안드로이드', count: 1 },
    ],
    recruitTechStacks: {
      '기획 - 서비스/경험 기획': ['Notion'],
      '프론트엔드 - 안드로이드': ['Kotlin'],
    },
    recruitDeadline: '2025-12-01',
    isRecruitUntilComplete: false,
    targetMemberCount: 4,
    members: [
      {
        id: 31,
        name: '김서연',
        role: 'Product Designer',
        avatarUrl: LEADER_AVATARS.fourth,
        isLeader: true,
      },
      {
        id: 32,
        name: '조민수',
        role: 'Android Dev',
        avatarUrl: LEADER_AVATARS.first,
      },
      {
        id: 33,
        name: '윤지호',
        role: 'Backend Dev',
        avatarUrl: LEADER_AVATARS.second,
      },
    ],
    applicants: [],
    summary: '반려식물과 함께하는 일상을 기록하는 케어 다이어리 서비스입니다.',
    coverImageUrl: HERO_IMAGE_URLS.fourth,
    createdAt: '2025-10-25',
    leaderRole: 'Product Designer',
  }),
};

function buildProjectFromForm(id: string, values: ProjectFormValues): ProjectRecord {
  const category =
    PROJECT_CATEGORIES.find((item) => item.id === values.categoryId) ?? PROJECT_CATEGORIES[0];
  const leaderName = '정연준';
  const leaderAvatar = 'http://localhost:3845/assets/f1172eb8cefcbe26d0f11c0aadeea5d533cb00a6.png';
  const leaderRole = values.myInterest.major || 'Project Lead';

  return createProjectRecord({
    id,
    title: values.projectName,
    subtitle: '프로젝트 통합 관리',
    status: 'recruiting',
    projectName: values.projectName,
    githubUrl: values.githubUrl,
    communicationUrl: values.communicationUrl,
    categoryId: values.categoryId || category.id,
    description: values.description,
    releasePlatforms:
      values.releasePlatforms.length > 0 ? values.releasePlatforms : [RELEASE_PLATFORMS[0]],
    myInterest: values.myInterest,
    recruitInterests: values.recruitInterests,
    recruitTechStacks: values.recruitTechStacks,
    recruitDeadline: values.recruitDeadline,
    isRecruitUntilComplete: values.isRecruitUntilComplete,
    targetMemberCount: values.recruitInterests.reduce((sum, item) => sum + item.count, 1) + 1,
    members: [
      {
        id: Number(`${id}1`),
        name: leaderName,
        role: leaderRole,
        avatarUrl: leaderAvatar,
        isLeader: true,
      },
    ],
    applicants: [],
    summary: buildSummary(
      values.description || `${getProjectCategoryLabel(category.id)} 프로젝트입니다.`,
    ),
    coverImageUrl:
      HERO_IMAGE_URLS[
        Number(id) % 4 === 1
          ? 'first'
          : Number(id) % 4 === 2
            ? 'second'
            : Number(id) % 4 === 3
              ? 'third'
              : 'fourth'
      ],
    createdAt: new Date().toISOString().slice(0, 10),
    leaderRole,
  });
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projectsById: INITIAL_PROJECTS,
  getProject: (projectId) => get().projectsById[projectId] ?? null,
  getProjects: () =>
    Object.values(get().projectsById).sort((left, right) =>
      right.createdAt.localeCompare(left.createdAt),
    ),
  createProject: (values) => {
    const nextId = String(
      Math.max(0, ...Object.keys(get().projectsById).map((id) => Number(id))) + 1,
    );

    set((state) => ({
      projectsById: {
        ...state.projectsById,
        [nextId]: buildProjectFromForm(nextId, values),
      },
    }));

    return nextId;
  },
  updateProjectStatus: (projectId, status) =>
    set((state) => {
      const project = state.projectsById[projectId];
      if (!project) return state;

      return {
        projectsById: {
          ...state.projectsById,
          [projectId]: { ...project, status },
        },
      };
    }),
  updateProject: (projectId, values) =>
    set((state) => {
      const project = state.projectsById[projectId];
      if (!project) return state;

      return {
        projectsById: {
          ...state.projectsById,
          [projectId]: {
            ...project,
            ...values,
            title: values.projectName,
            summary: buildSummary(values.description),
          },
        },
      };
    }),
  removeMember: (projectId, memberId) =>
    set((state) => {
      const project = state.projectsById[projectId];
      if (!project) return state;

      return {
        projectsById: {
          ...state.projectsById,
          [projectId]: {
            ...project,
            members: project.members.filter((member) => member.id !== memberId),
          },
        },
      };
    }),
  approveApplicant: (projectId, applicantId) =>
    set((state) => {
      const project = state.projectsById[projectId];
      if (!project) return state;

      const applicant = project.applicants.find((item) => item.id === applicantId);
      if (!applicant || applicant.status !== 'pending') return state;

      return {
        projectsById: {
          ...state.projectsById,
          [projectId]: {
            ...project,
            members: [...project.members, toMember(applicant)],
            applicants: project.applicants.map((item) =>
              item.id === applicantId ? { ...item, status: 'approved' } : item,
            ),
          },
        },
      };
    }),
  rejectApplicant: (projectId, applicantId) =>
    set((state) => {
      const project = state.projectsById[projectId];
      if (!project) return state;

      return {
        projectsById: {
          ...state.projectsById,
          [projectId]: {
            ...project,
            applicants: project.applicants.map((item) =>
              item.id === applicantId ? { ...item, status: 'rejected' } : item,
            ),
          },
        },
      };
    }),
}));
