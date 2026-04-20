export type Interest = {
  major: string;
  minor: string;
};

export type GenderValue = 'male' | 'female';

export type SignupFormValues = {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  birth: string;
  gender: GenderValue;
  interests: Interest[];
  techStacksByInterest: Record<string, string[]>;
  projectExperienceCount: string;
  githubUrl: string;
  blogUrl: string;
  profileImage: File | null;
};

export type LoginFormValues = {
  email: string;
  password: string;
};

export type JobPositionOption = {
  code: string;
  name: string;
};

export type TechStackOption = {
  id: number;
  name: string;
};

export type JobFieldOption = {
  code: string;
  name: string;
  positions: JobPositionOption[];
  techStacks: TechStackOption[];
};

export type EmailDuplicateResponse = {
  exists: boolean;
  message: string;
};

export type RegisterTechStackPayload = {
  id: number;
  displayOrder: number;
};

export type RegisterJobPositionPayload = {
  jobFieldCode: string;
  jobPositionCode: string;
  techStacks: RegisterTechStackPayload[];
};

export type RegisterRequestPayload = {
  email: string;
  password: string;
  name: string;
  birthDate: string;
  gender: 'MALE' | 'FEMALE';
  jobPositions: RegisterJobPositionPayload[];
  projectExperienceCount: number;
  githubUrl?: string;
  blogUrl?: string;
};

export type SignupSuccessResponse = {
  memberId: number;
  username: string;
};

export type LoginRequestPayload = LoginFormValues;

export type LoginSuccessResponse = {
  name: string;
  memberId: number;
};

export type AuthSession = LoginSuccessResponse & {
  accessToken: string;
  email: string;
};

export type ApiEnvelope<T> = {
  data?: T;
  result?: T;
  message?: string;
  code?: string;
};

export type SignupApiEnvelope<T> = ApiEnvelope<T>;
