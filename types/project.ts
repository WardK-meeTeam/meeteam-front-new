import type { Interest } from './auth';

export type RecruitInterest = Interest & { count: number };

export type ProjectStatus = 'recruiting' | 'closed';

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
  categoryId: string;
  description: string;
  releasePlatforms: string[];
  myInterest: Interest;
  recruitInterests: RecruitInterest[];
  recruitTechStacks: Record<string, string[]>;
  recruitDeadline: string;
  isRecruitUntilComplete: boolean;
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
