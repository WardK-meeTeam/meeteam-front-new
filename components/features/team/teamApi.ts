import type { ApiEnvelope } from '@/types/auth';
import type { Teammate } from '@/types/team';

import { extractApiData } from '@/components/features/auth/signupTransform';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8080';

interface MemberCardResponse {
  memberId: number;
  name: string;
  profileImageUrl: string | null;
  jobFieldName: string | null;
  jobPositionNameEn: string | null;
  projectCount: number;
  mainSkills: string[];
}

export async function fetchAllTeammates() {
  const response = await fetch(`${API_BASE_URL}/api/members/all`, {
    method: 'GET',
    cache: 'no-store',
  });

  const payload = (await response.json().catch(() => null)) as ApiEnvelope<MemberCardResponse[]> | null;

  if (!response.ok) {
    throw new Error(payload?.message ?? '팀원 목록을 불러오지 못했습니다.');
  }

  if (!payload) {
    throw new Error('응답 형식을 해석할 수 없습니다.');
  }

  return extractApiData(payload).map(mapTeammateCard);
}

function mapTeammateCard(member: MemberCardResponse): Teammate {
  return {
    id: member.memberId,
    name: member.name,
    role: mapJobFieldToRole(member.jobFieldName),
    experienceCount: member.projectCount,
    skills: member.mainSkills,
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
