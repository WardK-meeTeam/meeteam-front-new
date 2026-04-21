import type { ApiEnvelope } from '@/types/auth';
import type { Teammate } from '@/types/team';

import { createApiError } from '@/components/features/auth/authError';
import { extractApiData } from '@/components/features/auth/signupTransform';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8080';

interface MemberCardResponse {
  memberId: number;
  name: string;
  profileImageUrl: string | null;
  jobFieldName: string | null;
  projectExperienceCount: number;
  techStacks: MemberTechStackResponse[];
}

interface MemberTechStackResponse {
  id: number;
  name: string;
  displayOrder: number;
}

interface MemberPageResponse {
  content: MemberCardResponse[];
  last: boolean;
  number: number;
  size: number;
  empty: boolean;
}

export async function fetchAllTeammates() {
  const teammates: Teammate[] = [];
  const pageSize = 100;
  let page = 0;
  let hasMore = true;

  while (hasMore) {
    const params = new URLSearchParams({
      page: String(page),
      size: String(pageSize),
      sort: 'createdAt,desc',
    });

    const response = await fetch(`${API_BASE_URL}/api/v1/main/members?${params.toString()}`, {
      method: 'GET',
      cache: 'no-store',
    });

    const payload = (await response
      .json()
      .catch(() => null)) as ApiEnvelope<MemberPageResponse> | null;

    if (!response.ok) {
      throw createApiError(response, payload, '팀원 목록을 불러오지 못했습니다.');
    }

    if (!payload) {
      throw new Error('응답 형식을 해석할 수 없습니다.');
    }

    const result = extractApiData(payload);
    teammates.push(...result.content.map(mapTeammateCard));
    hasMore = !result.last && !result.empty && result.content.length > 0;
    page += 1;
  }

  return teammates;
}

function mapTeammateCard(member: MemberCardResponse): Teammate {
  return {
    id: member.memberId,
    name: member.name,
    role: mapJobFieldToRole(member.jobFieldName),
    experienceCount: member.projectExperienceCount,
    skills: member.techStacks.map((techStack) => techStack.name),
    imageUrl: member.profileImageUrl ?? '',
  };
}

function mapJobFieldToRole(jobFieldName: string | null): Teammate['role'] {
  switch (jobFieldName) {
    case '프론트':
      return '프론트엔드';
    case '백엔드':
      return '백엔드';
    case '디자인':
      return '디자이너';
    case '기획':
      return 'PM/기획';
    default:
      return '기타';
  }
}
