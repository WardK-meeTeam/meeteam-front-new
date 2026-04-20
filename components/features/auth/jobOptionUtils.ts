import type { JobFieldOption } from '@/types/auth';

const JOB_FIELD_NAME_ALIASES: Record<string, string> = {
  'PM/기획': '기획',
  프론트엔드: '프론트',
};

function normalizeJobFieldName(name: string) {
  return JOB_FIELD_NAME_ALIASES[name] ?? name;
}

export function findJobFieldByName(jobFields: JobFieldOption[], fieldName: string) {
  const normalizedFieldName = normalizeJobFieldName(fieldName);

  return jobFields.find((field) => field.name === normalizedFieldName);
}

export function collectTechStackNames(jobFields: JobFieldOption[]) {
  return Array.from(
    new Set(jobFields.flatMap((field) => field.techStacks.map((techStack) => techStack.name))),
  ).sort((left, right) => left.localeCompare(right, 'ko'));
}
