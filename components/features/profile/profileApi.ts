import type { ApiEnvelope, JobFieldOption } from '@/types/auth';

import { extractApiData, normalizeUrl } from '@/components/features/auth/signupTransform';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8080';

export type ProfileGender = 'MALE' | 'FEMALE';

export interface GroupedSkill {
  jobFieldName: string;
  jobPositionName: string;
  techStacks: string[];
}

export interface ProfileProjectCard {
  projectId: number;
  projectName: string;
  categoryName: string;
  imageUrl: string | null;
  creatorName: string;
  creatorImageUrl: string | null;
  currentCount: number;
  recruitmentCount: number;
}

export interface MemberProfileResponse {
  name: string;
  memberId: number;
  birthDate: string | null;
  gender: ProfileGender;
  email: string;
  githubUrl: string | null;
  blogUrl: string | null;
  projectExperienceCount: number;
  representativePosition: string | null;
  representativePositionEn: string | null;
  groupedSkills: GroupedSkill[];
  skills: string[];
  isParticipating: boolean;
  projectCount: number;
  introduce: string | null;
  profileImageUrl: string | null;
  profileImageName: string | null;
  projectCards: ProfileProjectCard[];
}

export interface UpdateMemberProfilePayload {
  name: string;
  age: number;
  gender: ProfileGender;
  jobPositionIds: number[];
  techStackIds: number[];
  isParticipating: boolean;
  introduction?: string;
  githubUrl?: string;
  blogUrl?: string;
  profileImage?: File | null;
}

async function readEnvelope<T>(response: Response) {
  const payload = (await response.json().catch(() => null)) as ApiEnvelope<T> | null;

  if (!response.ok) {
    const errorMessage =
      typeof payload?.message === 'string'
        ? payload.message
        : '프로필 정보를 처리하는 중 오류가 발생했습니다.';
    throw new Error(errorMessage);
  }

  if (!payload) {
    throw new Error('응답 형식을 해석할 수 없습니다.');
  }

  return extractApiData(payload);
}

export async function fetchMyProfile() {
  const response = await fetch(`${API_BASE_URL}/api/members`, {
    method: 'GET',
    cache: 'no-store',
    credentials: 'include',
  });

  return readEnvelope<MemberProfileResponse>(response);
}

export async function fetchMemberProfile(memberId: number) {
  const response = await fetch(`${API_BASE_URL}/api/members/${memberId}`, {
    method: 'GET',
    cache: 'no-store',
    credentials: 'include',
  });

  return readEnvelope<MemberProfileResponse>(response);
}

export async function updateMyProfile(payload: UpdateMemberProfilePayload) {
  const formData = new FormData();

  formData.append(
    'memberInfo',
    new Blob(
      [
        JSON.stringify({
          name: payload.name.trim(),
          age: payload.age,
          gender: payload.gender,
          jobPositionIds: payload.jobPositionIds,
          techStackIds: payload.techStackIds,
          isParticipating: payload.isParticipating,
          introduction: payload.introduction?.trim() || '',
          githubUrl: normalizeUrl(payload.githubUrl ?? ''),
          blogUrl: normalizeUrl(payload.blogUrl ?? ''),
        }),
      ],
      { type: 'application/json' },
    ),
  );

  if (payload.profileImage) {
    formData.append('profileImage', payload.profileImage);
  }

  const response = await fetch(`${API_BASE_URL}/api/members`, {
    method: 'PUT',
    credentials: 'include',
    body: formData,
  });

  return readEnvelope<{
    memberId: number;
    name: string;
    message: string;
    profileImageUrl: string | null;
  }>(response);
}

export function findFieldByName(jobFields: JobFieldOption[], fieldName: string) {
  return jobFields.find((field) => field.name === fieldName);
}

export function findPositionByName(
  jobFields: JobFieldOption[],
  fieldName: string,
  positionName: string,
) {
  return findFieldByName(jobFields, fieldName)?.positions.find(
    (position) => position.name === positionName,
  );
}
