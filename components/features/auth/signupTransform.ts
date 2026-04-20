import type {
  Interest,
  JobFieldOption,
  RegisterJobPositionPayload,
  RegisterRequestPayload,
  SignupApiEnvelope,
  SignupFormValues,
} from '@/types/auth';

export function extractApiData<T>(payload: SignupApiEnvelope<T>): T {
  if (payload.data !== undefined) {
    return payload.data;
  }

  if (payload.result !== undefined) {
    return payload.result;
  }

  throw new Error('응답 형식을 해석할 수 없습니다.');
}

export function getInterestKey(interest: Interest) {
  return `${interest.major}::${interest.minor}`;
}

export function normalizeUrl(value: string) {
  const trimmed = value.trim();

  if (!trimmed) {
    return undefined;
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

export function buildRegisterRequestPayload(
  values: SignupFormValues,
  jobFields: JobFieldOption[],
): RegisterRequestPayload {
  const jobPositions = values.interests
    .filter((interest) => interest.major && interest.minor)
    .map<RegisterJobPositionPayload>((interest) => {
      const jobField = jobFields.find((field) => field.code === interest.major);

      if (!jobField) {
        throw new Error('선택한 분야 정보를 찾을 수 없습니다.');
      }

      const hasPosition = jobField.positions.some((position) => position.code === interest.minor);
      if (!hasPosition) {
        throw new Error('선택한 상세 분야 정보를 찾을 수 없습니다.');
      }

      const selectedTechStacks = values.techStacksByInterest[getInterestKey(interest)] ?? [];

      return {
        jobFieldCode: interest.major,
        jobPositionCode: interest.minor,
        techStacks: selectedTechStacks.map((techName, index) => {
          const techStack = jobField.techStacks.find((item) => item.name === techName);

          if (!techStack) {
            throw new Error('선택한 기술 스택을 찾을 수 없습니다.');
          }

          return {
            id: techStack.id,
            displayOrder: index + 1,
          };
        }),
      };
    });

  return {
    email: values.email.trim(),
    password: values.password,
    name: values.name.trim(),
    birthDate: values.birth.trim(),
    gender: values.gender === 'female' ? 'FEMALE' : 'MALE',
    jobPositions,
    projectExperienceCount: Number(values.projectExperienceCount || '0'),
    githubUrl: normalizeUrl(values.githubUrl),
    blogUrl: normalizeUrl(values.blogUrl),
  };
}
