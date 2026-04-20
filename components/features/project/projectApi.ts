import type { ApiEnvelope, JobFieldOption } from '@/types/auth';
import type { ProjectFormValues, ProjectRecord } from '@/types/project';

import { extractApiData, normalizeUrl } from '@/components/features/auth/signupTransform';
import {
  findProjectJobField,
  findProjectJobPosition,
} from '@/components/features/project/projectJobOptions';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8080';

type BackendProjectCreateResponse = {
  id: number;
  title: string;
  createdAt: string;
};

type BackendProjectDetailResponse = {
  id: number;
  name: string;
  description: string;
  projectCategory:
    | 'ENVIRONMENT'
    | 'PET'
    | 'HEALTHCARE'
    | 'EDUCATION'
    | 'AI_TECH'
    | 'FASHION_BEAUTY'
    | 'FINANCE_PRODUCTIVITY'
    | 'ETC';
  platformCategory: 'IOS' | 'ANDROID' | 'WEB';
  imageUrl: string | null;
  recruitmentStatus: 'RECRUITING' | 'CLOSED' | 'SUSPENDED';
  recruitmentDeadlineType: 'END_DATE' | 'RECRUITMENT_COMPLETED';
  startDate: string | null;
  endDate: string | null;
  githubRepositoryUrl: string | null;
  communicationChannelUrl: string | null;
  leader: {
    id: number;
    name: string;
    profileImageUrl: string | null;
    jobPositions: Array<{
      jobFieldCode: string;
      jobFieldName: string;
      jobPositionName: string;
    }>;
    techStacks: string[];
  };
  recruitments: Array<{
    jobFieldCode: string;
    jobFieldName: string;
    jobPositionName: string;
    recruitmentCount: number;
    currentCount: number;
    isClosed: boolean;
    techStacks: string[];
  }>;
  likeCount: number;
  isLiked: boolean;
  isLeader: boolean;
};

type ProjectCreateRequestPayload = {
  projectName: string;
  githubRepositoryUrl?: string;
  communicationChannelUrl?: string;
  projectCategory: string;
  description: string;
  platformCategory: string;
  creatorJobPositionCode: string;
  recruitments: Array<{
    jobFieldCode: string;
    jobPositionCode: string;
    recruitmentCount: number;
    techStackIds: number[];
  }>;
  recruitmentDeadlineType: 'END_DATE' | 'RECRUITMENT_COMPLETED';
  endDate?: string;
};

async function readEnvelope<T>(response: Response, fallbackMessage: string) {
  const payload = (await response.json().catch(() => null)) as ApiEnvelope<T> | null;

  if (!response.ok) {
    throw new Error(payload?.message ?? fallbackMessage);
  }

  if (!payload) {
    throw new Error('응답 형식을 해석할 수 없습니다.');
  }

  return extractApiData(payload);
}

function buildSummary(description: string) {
  return description.length > 56 ? `${description.slice(0, 56).trim()}...` : description;
}

function mapCategoryIdToApiValue(categoryId: ProjectFormValues['categoryId']) {
  switch (categoryId) {
    case 'eco':
      return 'ENVIRONMENT';
    case 'pets':
      return 'PET';
    case 'healthcare':
      return 'HEALTHCARE';
    case 'education':
      return 'EDUCATION';
    case 'ai-tech':
      return 'AI_TECH';
    case 'fashion':
      return 'FASHION_BEAUTY';
    case 'fintech':
      return 'FINANCE_PRODUCTIVITY';
    case 'etc':
      return 'ETC';
    default:
      throw new Error('프로젝트 카테고리를 다시 선택해 주세요.');
  }
}

function mapCategoryApiValueToId(category: BackendProjectDetailResponse['projectCategory']) {
  switch (category) {
    case 'ENVIRONMENT':
      return 'eco';
    case 'PET':
      return 'pets';
    case 'HEALTHCARE':
      return 'healthcare';
    case 'EDUCATION':
      return 'education';
    case 'AI_TECH':
      return 'ai-tech';
    case 'FASHION_BEAUTY':
      return 'fashion';
    case 'FINANCE_PRODUCTIVITY':
      return 'fintech';
    case 'ETC':
      return 'etc';
  }
}

function mapPlatformToApiValue(platform: ProjectFormValues['releasePlatforms'][number] | undefined) {
  switch (platform) {
    case '웹':
      return 'WEB';
    case 'iOS':
      return 'IOS';
    case '안드로이드':
      return 'ANDROID';
    default:
      throw new Error('출시 플랫폼을 다시 선택해 주세요.');
  }
}

function mapPlatformApiValueToLabel(platform: BackendProjectDetailResponse['platformCategory']) {
  switch (platform) {
    case 'WEB':
      return '웹';
    case 'IOS':
      return 'iOS';
    case 'ANDROID':
      return '안드로이드';
  }
}

export function buildProjectCreatePayload(values: ProjectFormValues, jobFields: JobFieldOption[]) {
  const creatorField = findProjectJobField(jobFields, values.myInterest.major);

  if (!creatorField) {
    throw new Error('나의 분야 정보를 다시 선택해 주세요.');
  }

  const creatorPosition = findProjectJobPosition(creatorField, values.myInterest.minor);

  if (!creatorPosition) {
    throw new Error('나의 상세 분야 정보를 다시 선택해 주세요.');
  }

  const recruitments = values.recruitInterests.map((interest) => {
    const field = findProjectJobField(jobFields, interest.major);

    if (!field) {
      throw new Error('모집 분야 정보를 다시 선택해 주세요.');
    }

    const position = findProjectJobPosition(field, interest.minor);

    if (!position) {
      throw new Error('모집 상세 분야 정보를 다시 선택해 주세요.');
    }

    const techStackNames = values.recruitTechStacks[`${interest.major} - ${interest.minor}`] ?? [];
    const techStackIds = techStackNames.map((techStackName) => {
      const techStack = field.techStacks.find((item) => item.name === techStackName);

      if (!techStack) {
        throw new Error('선택한 기술 스택을 다시 확인해 주세요.');
      }

      return techStack.id;
    });

    return {
      jobFieldCode: field.code,
      jobPositionCode: position.code,
      recruitmentCount: interest.count,
      techStackIds,
    };
  });

  return {
    projectName: values.projectName.trim(),
    githubRepositoryUrl: normalizeUrl(values.githubUrl),
    communicationChannelUrl: normalizeUrl(values.communicationUrl),
    projectCategory: mapCategoryIdToApiValue(values.categoryId),
    description: values.description.trim(),
    platformCategory: mapPlatformToApiValue(values.releasePlatforms[0]),
    creatorJobPositionCode: creatorPosition.code,
    recruitments,
    recruitmentDeadlineType: values.isRecruitUntilComplete
      ? 'RECRUITMENT_COMPLETED'
      : 'END_DATE',
    endDate: values.isRecruitUntilComplete ? undefined : values.recruitDeadline,
  } satisfies ProjectCreateRequestPayload;
}

export async function createProject(
  payload: ProjectCreateRequestPayload,
  file?: File | null,
) {
  const formData = new FormData();

  formData.append('request', new Blob([JSON.stringify(payload)], { type: 'application/json' }));

  if (file) {
    formData.append('file', file);
  }

  const response = await fetch(`${API_BASE_URL}/api/v1/projects`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });

  return readEnvelope<BackendProjectCreateResponse>(response, '프로젝트 등록 중 오류가 발생했습니다.');
}

export async function fetchProjectDetail(projectId: string | number): Promise<ProjectRecord> {
  const response = await fetch(`${API_BASE_URL}/api/v1/projects/${projectId}`, {
    method: 'GET',
    cache: 'no-store',
    credentials: 'include',
  });

  const project = await readEnvelope<BackendProjectDetailResponse>(
    response,
    '프로젝트 상세 정보를 불러오지 못했습니다.',
  );

  const leaderPosition = project.leader.jobPositions[0];
  const recruitInterests = project.recruitments.map((recruitment) => ({
    major: recruitment.jobFieldName,
    minor: recruitment.jobPositionName,
    count: recruitment.recruitmentCount,
  }));
  const recruitTechStacks = Object.fromEntries(
    project.recruitments.map((recruitment) => [
      `${recruitment.jobFieldName} - ${recruitment.jobPositionName}`,
      recruitment.techStacks,
    ]),
  );

  return {
    id: String(project.id),
    title: project.name,
    subtitle: '프로젝트 상세',
    status: project.recruitmentStatus === 'RECRUITING' ? 'recruiting' : 'closed',
    projectName: project.name,
    githubUrl: project.githubRepositoryUrl ?? '',
    communicationUrl: project.communicationChannelUrl ?? '',
    categoryId: mapCategoryApiValueToId(project.projectCategory),
    description: project.description,
    releasePlatforms: [mapPlatformApiValueToLabel(project.platformCategory)],
    myInterest: {
      major: leaderPosition?.jobFieldName ?? '',
      minor: leaderPosition?.jobPositionName ?? '',
    },
    recruitInterests,
    recruitTechStacks,
    recruitDeadline: project.endDate ?? '',
    isRecruitUntilComplete: project.recruitmentDeadlineType === 'RECRUITMENT_COMPLETED',
    targetMemberCount:
      project.recruitments.reduce((sum, recruitment) => sum + recruitment.recruitmentCount, 0) + 1,
    members: [
      {
        id: project.leader.id,
        name: project.leader.name,
        role: leaderPosition?.jobPositionName ?? leaderPosition?.jobFieldName ?? 'Project Lead',
        avatarUrl: project.leader.profileImageUrl ?? '',
        isLeader: true,
      },
    ],
    applicants: [],
    summary: buildSummary(project.description),
    coverImageUrl: project.imageUrl ?? '',
    createdAt: project.startDate ?? project.endDate ?? '',
    leaderRole: leaderPosition?.jobPositionName ?? leaderPosition?.jobFieldName ?? 'Project Lead',
    leaderProfileId: project.leader.id,
    leaderTechStacks: project.leader.techStacks,
    likeCount: project.likeCount,
    recruitmentDetails: project.recruitments.map((recruitment, index) => ({
      id: `${project.id}-${index + 1}`,
      jobFieldCode: recruitment.jobFieldCode,
      jobFieldName: recruitment.jobFieldName,
      jobPositionName: recruitment.jobPositionName,
      recruitmentCount: recruitment.recruitmentCount,
      currentCount: recruitment.currentCount,
      isClosed: recruitment.isClosed,
      techStacks: recruitment.techStacks,
    })),
  };
}
