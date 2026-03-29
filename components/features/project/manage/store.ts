'use client';

import { create } from 'zustand';
import type {
  ManagedProject,
  ProjectApplicant,
  ProjectFormValues,
  ProjectMember,
  ProjectStatus,
} from '@/types/project';

type ProjectManageState = {
  projectsById: Record<string, ManagedProject>;
  getProject: (projectId: string) => ManagedProject | null;
  updateProjectStatus: (projectId: string, status: ProjectStatus) => void;
  updateProject: (projectId: string, values: ProjectFormValues) => void;
  removeMember: (projectId: string, memberId: number) => void;
  approveApplicant: (projectId: string, applicantId: number) => void;
  rejectApplicant: (projectId: string, applicantId: number) => void;
};

const INITIAL_PROJECTS: Record<string, ManagedProject> = {
  '1': {
    id: '1',
    title: 'AI 기반 뉴스 요약 서비스 개발',
    subtitle: '프로젝트 통합 관리',
    status: 'recruiting',
    projectName: 'AI 기반 뉴스 요약 서비스 개발',
    githubUrl: 'https://github.com/meeteam/ai-news-summary',
    communicationUrl: 'https://open.kakao.com/o/meeteam_ai_news',
    categoryId: 'ai-tech',
    description: '바쁜 현대인을 위한 3줄 뉴스 요약 서비스를 함께 만들 팀원을 찾고 있습니다.',
    releasePlatforms: ['웹', 'iOS'],
    myInterest: { major: '기획', minor: '프로덕트 매니저/오너' },
    recruitInterests: [
      { major: '프론트엔드', minor: '웹 프론트엔드', count: 1 },
      { major: '백엔드', minor: 'AI', count: 1 },
    ],
    recruitTechStacks: {
      '프론트엔드 - 웹 프론트엔드': ['React', 'Next.js', 'Tailwind CSS'],
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
        avatarUrl: 'http://localhost:3845/assets/719a1595c614b01fa72ecad4467c0ebc34eddfd1.png',
        status: 'pending',
      },
    ],
  },
  '2': {
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
    myInterest: { major: '프론트엔드', minor: '웹 프론트엔드' },
    recruitInterests: [
      { major: '프론트엔드', minor: '웹 프론트엔드', count: 1 },
      { major: '백엔드', minor: '웹 서버', count: 1 },
    ],
    recruitTechStacks: {
      '프론트엔드 - 웹 프론트엔드': ['React', 'Next.js', 'Tailwind CSS'],
      '백엔드 - 웹 서버': ['Node.js', 'NestJS', 'PostgreSQL'],
    },
    recruitDeadline: '2026-12-31',
    isRecruitUntilComplete: false,
    targetMemberCount: 3,
    members: [
      {
        id: 1,
        name: '이우진',
        role: 'Full Stack',
        avatarUrl: 'http://localhost:3845/assets/376c60097782ec7998ff59b2a12be789342ac6b0.png',
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
        id: 201,
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
        id: 202,
        name: '최민재',
        position: '백엔드',
        specialty: '웹 서버',
        appliedAt: '2026.03.15 지원',
        email: 'minjae.server@example.com',
        introduction: 'NestJS와 PostgreSQL 기반 서비스 운영 경험이 있어 빠르게 합류할 수 있습니다.',
        avatarUrl: 'http://localhost:3845/assets/ba1db031d4fee2753f0a652b54c40e44587f0435.png',
        status: 'pending',
      },
    ],
  },
};

const toMember = (applicant: ProjectApplicant): ProjectMember => ({
  id: applicant.id,
  name: applicant.name,
  role: `${applicant.position} / ${applicant.specialty}`,
  avatarUrl: applicant.avatarUrl,
});

export const useProjectManageStore = create<ProjectManageState>((set, get) => ({
  projectsById: INITIAL_PROJECTS,
  getProject: (projectId) => get().projectsById[projectId] ?? null,
  updateProjectStatus: (projectId, status) =>
    set((state) => {
      const project = state.projectsById[projectId];
      if (!project) return state;

      return {
        projectsById: {
          ...state.projectsById,
          [projectId]: {
            ...project,
            status,
          },
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
