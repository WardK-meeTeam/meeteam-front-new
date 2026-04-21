import { z } from 'zod';

export const projectFormSchema = z
  .object({
    projectName: z.string().trim().min(1, '프로젝트 이름을 입력해 주세요.'),
    categoryId: z.string().min(1, '프로젝트 카테고리를 선택해 주세요.'),
    description: z.string().max(5000, '프로젝트 소개는 5,000자 이하로 입력해 주세요.'),
    releasePlatforms: z
      .array(z.enum(['웹', 'iOS', '안드로이드']))
      .min(1, '출시 플랫폼을 선택해 주세요.')
      .max(1, '출시 플랫폼은 1개만 선택할 수 있어요.'),
    myInterest: z.object({
      major: z.string().min(1, '나의 분야를 선택해 주세요.'),
      minor: z.string().min(1, '나의 상세 분야를 선택해 주세요.'),
    }),
    recruitInterests: z
      .array(
        z.object({
          major: z.string().min(1, '모집 분야의 직군을 선택해 주세요.'),
          minor: z.string().min(1, '모집 분야의 상세 직무를 선택해 주세요.'),
          count: z.number().int().min(1, '모집 인원은 1명 이상이어야 해요.'),
        }),
      )
      .min(1, '최소 1개의 모집 분야를 추가해 주세요.'),
    recruitDeadline: z.string(),
    isRecruitUntilComplete: z.boolean(),
  })
  .superRefine((value, ctx) => {
    if (!value.isRecruitUntilComplete && !value.recruitDeadline) {
      ctx.addIssue({
        code: 'custom',
        path: ['recruitDeadline'],
        message: '모집 마감일을 선택해 주세요.',
      });
    }
  });

export type ProjectFormFieldErrors = Partial<
  Record<
    | 'projectName'
    | 'categoryId'
    | 'description'
    | 'releasePlatforms'
    | 'myInterest'
    | 'recruitInterests'
    | 'recruitTechStacks'
    | 'recruitDeadline'
    | 'form',
    string
  >
>;
