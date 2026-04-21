import type { Interest } from './auth';

export type RecruitInterest = Interest & {
  count: number;
  recruitmentStateId?: number | null;
  currentCount?: number;
  pendingApplicationCount?: number;
  minRecruitmentCount?: number;
  deletable?: boolean;
  notDeletableReason?: string | null;
};

export type ProjectStatus = 'recruiting' | 'closed';
export type ProjectRecruitmentStatus = 'RECRUITING' | 'CLOSED' | 'SUSPENDED';

export type ProjectCategoryId =
  | 'ai-tech'
  | 'eco'
  | 'healthcare'
  | 'pets'
  | 'education'
  | 'fashion'
  | 'fintech'
  | 'etc';

export type ReleasePlatform = '웹' | 'iOS' | '안드로이드';

export type ProjectMember = {
  id: number;
  name: string;
  role: string;
  avatarUrl: string;
  isLeader?: boolean;
};

export type ProjectApplicantStatus = 'pending' | 'approved' | 'rejected';

export type ProjectApplicant = {
  id: number;
  name: string;
  position: string;
  specialty: string;
  appliedAt: string;
  email: string;
  introduction: string;
  avatarUrl: string;
  status: ProjectApplicantStatus;
};

export type ProjectFormValues = {
  projectName: string;
  githubUrl: string;
  communicationUrl: string;
  categoryId: ProjectCategoryId | '';
  description: string;
  releasePlatforms: ReleasePlatform[];
  myInterest: Interest;
  recruitInterests: RecruitInterest[];
  recruitTechStacks: Record<string, string[]>;
  recruitDeadline: string;
  isRecruitUntilComplete: boolean;
  coverImage?: File | null;
};

export type ProjectRecruitmentDetail = {
  id: string;
  jobFieldCode: string;
  jobFieldName: string;
  jobPositionName: string;
  recruitmentCount: number;
  currentCount: number;
  isClosed: boolean;
  techStacks: string[];
};

export type ManagedProject = ProjectFormValues & {
  id: string;
  title: string;
  subtitle: string;
  status: ProjectStatus;
  targetMemberCount: number;
  members: ProjectMember[];
  applicants: ProjectApplicant[];
};

export type ProjectRecord = ManagedProject & {
  summary: string;
  coverImageUrl: string;
  createdAt: string;
  leaderRole: string;
  recruitmentStatus?: ProjectRecruitmentStatus;
  leaderProfileId?: number;
  leaderTechStacks?: string[];
  likeCount?: number;
  recruitmentDetails?: ProjectRecruitmentDetail[];
};
