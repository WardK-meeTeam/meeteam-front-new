import { afterEach, describe, expect, it, vi } from 'vitest';

import type { JobFieldOption } from '@/types/auth';
import type { ProjectFormValues } from '@/types/project';

import * as projectApi from '@/components/features/project/projectApi';

const originalFetch = global.fetch;

const JOB_FIELDS: JobFieldOption[] = [
  {
    code: 'FRONTEND',
    name: '프론트엔드',
    positions: [{ id: 25, code: 'WEB_FRONTEND', name: '웹 프론트엔드' }],
    techStacks: [
      { id: 1, name: 'React' },
      { id: 2, name: 'TypeScript' },
    ],
  },
  {
    code: 'BACKEND',
    name: '백엔드',
    positions: [{ id: 31, code: 'NODE_NESTJS', name: 'Node.js/NestJS' }],
    techStacks: [
      { id: 11, name: 'Node.js' },
      { id: 12, name: 'PostgreSQL' },
    ],
  },
];

const PROJECT_VALUES: ProjectFormValues = {
  projectName: '  QA 계약 테스트 프로젝트  ',
  githubUrl: 'github.com/meeteam/qa-contract',
  communicationUrl: 'https://discord.gg/meeteam',
  categoryId: 'capstone',
  description: '  프로젝트 API 계약을 검증하는 테스트 설명입니다.  ',
  releasePlatforms: ['웹'],
  myInterest: {
    major: '프론트엔드',
    minor: '웹 프론트엔드',
  },
  recruitInterests: [
    {
      major: '프론트엔드',
      minor: '웹 프론트엔드',
      count: 2,
    },
    {
      major: '백엔드',
      minor: 'Node.js/NestJS',
      count: 1,
    },
  ],
  recruitTechStacks: {
    '프론트엔드 - 웹 프론트엔드': ['React', 'TypeScript'],
    '백엔드 - Node.js/NestJS': ['Node.js'],
  },
  recruitDeadline: '2026-06-30',
  isRecruitUntilComplete: false,
  coverImage: null,
};

afterEach(() => {
  vi.restoreAllMocks();
  global.fetch = originalFetch;
});

describe('buildProjectCreatePayload', () => {
  it('프로젝트 등록 폼 값을 백엔드 생성 payload로 변환한다', () => {
    expect(projectApi.buildProjectCreatePayload(PROJECT_VALUES, JOB_FIELDS)).toEqual({
      projectName: 'QA 계약 테스트 프로젝트',
      githubRepositoryUrl: 'https://github.com/meeteam/qa-contract',
      communicationChannelUrl: 'https://discord.gg/meeteam',
      projectCategory: 'CAPSTONE',
      description: '프로젝트 API 계약을 검증하는 테스트 설명입니다.',
      platformCategory: 'WEB',
      creatorJobPositionCode: 'WEB_FRONTEND',
      recruitments: [
        {
          jobFieldCode: 'FRONTEND',
          jobPositionCode: 'WEB_FRONTEND',
          recruitmentCount: 2,
          techStackIds: [1, 2],
        },
        {
          jobFieldCode: 'BACKEND',
          jobPositionCode: 'NODE_NESTJS',
          recruitmentCount: 1,
          techStackIds: [11],
        },
      ],
      recruitmentDeadlineType: 'END_DATE',
      endDate: '2026-06-30',
    });
  });

  it('상시 모집 프로젝트는 endDate 없이 RECRUITMENT_COMPLETED로 보낸다', () => {
    expect(
      projectApi.buildProjectCreatePayload(
        {
          ...PROJECT_VALUES,
          recruitDeadline: '',
          isRecruitUntilComplete: true,
        },
        JOB_FIELDS,
      ),
    ).toMatchObject({
      recruitmentDeadlineType: 'RECRUITMENT_COMPLETED',
      endDate: undefined,
    });
  });
});

describe('buildProjectEditPayload', () => {
  it('프로젝트 수정 payload에 모집분야 state id와 자동 거절 확인 플래그를 포함한다', () => {
    expect(
      projectApi.buildProjectEditPayload(
        {
          ...PROJECT_VALUES,
          recruitInterests: [
            {
              major: '프론트엔드',
              minor: '웹 프론트엔드',
              count: 3,
              recruitmentStateId: 701,
            },
          ],
          recruitTechStacks: {
            '프론트엔드 - 웹 프론트엔드': ['React'],
          },
        },
        JOB_FIELDS,
        { confirmDeletePositionsWithPendingApplicants: true },
      ),
    ).toEqual({
      name: 'QA 계약 테스트 프로젝트',
      description: '프로젝트 API 계약을 검증하는 테스트 설명입니다.',
      projectCategory: 'CAPSTONE',
      platformCategory: 'WEB',
      githubRepositoryUrl: 'https://github.com/meeteam/qa-contract',
      communicationChannelUrl: 'https://discord.gg/meeteam',
      recruitmentDeadlineType: 'END_DATE',
      endDate: '2026-06-30',
      leaderJobPositionCode: 'WEB_FRONTEND',
      recruitments: [
        {
          recruitmentStateId: 701,
          jobFieldCode: 'FRONTEND',
          jobPositionCode: 'WEB_FRONTEND',
          recruitmentCount: 3,
          techStackIds: [1],
        },
      ],
      confirmDeletePositionsWithPendingApplicants: true,
    });
  });

  it('마감일 방식인데 마감일이 없으면 수정 payload 생성을 막는다', () => {
    expect(() =>
      projectApi.buildProjectEditPayload(
        {
          ...PROJECT_VALUES,
          recruitDeadline: '',
          isRecruitUntilComplete: false,
        },
        JOB_FIELDS,
      ),
    ).toThrow('프로젝트 마감일을 선택해 주세요.');
  });
});

describe('projectApi mutation contracts', () => {
  it('createProject는 multipart form data로 request JSON과 파일을 보낸다', async () => {
    const payload = projectApi.buildProjectCreatePayload(PROJECT_VALUES, JOB_FIELDS);
    const file = new File(['cover'], 'cover.png', { type: 'image/png' });

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        result: {
          id: 1201,
          title: 'QA 계약 테스트 프로젝트',
          createdAt: '2026-05-01T00:00:00',
        },
      }),
    } as Response);

    await expect(projectApi.createProject(payload, file)).resolves.toEqual({
      id: 1201,
      title: 'QA 계약 테스트 프로젝트',
      createdAt: '2026-05-01T00:00:00',
    });

    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:8080/api/v1/projects',
      expect.objectContaining({
        method: 'POST',
        credentials: 'include',
      }),
    );

    const [, requestInit] = vi.mocked(global.fetch).mock.calls[0] ?? [];
    const formData = requestInit?.body as FormData;
    const requestBlob = formData.get('request');

    expect(formData).toBeInstanceOf(FormData);
    expect(requestBlob).toBeInstanceOf(Blob);
    await expect((requestBlob as Blob).text()).resolves.toBe(JSON.stringify(payload));
    expect(formData.get('file')).toBe(file);
  });

  it('applyToProject는 지원 payload를 보내고 백엔드 상태를 프론트 상태로 매핑한다', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        result: {
          applicationId: 9001,
          projectId: 1201,
          applicantId: 42,
          status: '대기중',
        },
      }),
    } as Response);

    await expect(
      projectApi.applyToProject(1201, {
        jobPositionCode: 'WEB_FRONTEND',
        motivation: '프론트엔드 구현 경험으로 기여하고 싶습니다.',
      }),
    ).resolves.toEqual({
      applicationId: 9001,
      projectId: 1201,
      applicantId: 42,
      status: 'pending',
    });

    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:8080/api/v1/projects/1201/application',
      expect.objectContaining({
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          jobPositionCode: 'WEB_FRONTEND',
          motivation: '프론트엔드 구현 경험으로 기여하고 싶습니다.',
        }),
      }),
    );
  });

  it('decideProjectApplication은 승인/거절 결정을 application decision endpoint로 보낸다', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        result: {
          applicationId: 9001,
          projectId: 1201,
          applicantId: 77,
          decision: 'ACCEPTED',
        },
      }),
    } as Response);

    await expect(projectApi.decideProjectApplication(1201, 9001, 'ACCEPTED')).resolves.toEqual({
      applicationId: 9001,
      projectId: 1201,
      applicantId: 77,
      decision: 'approved',
    });

    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:8080/api/v1/projects/1201/applications/9001/decision',
      expect.objectContaining({
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ decision: 'ACCEPTED' }),
      }),
    );
  });

  it('expelProjectMember는 팀원 방출을 DELETE 요청으로 보낸다', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        result: {
          projectId: 1201,
          expelledMemberId: 99,
          expelledMemberName: '팀원',
        },
      }),
    } as Response);

    await expect(projectApi.expelProjectMember(1201, 99)).resolves.toEqual({
      projectId: 1201,
      expelledMemberId: 99,
      expelledMemberName: '팀원',
    });

    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:8080/api/v1/projects/1201/members/99',
      expect.objectContaining({
        method: 'DELETE',
        credentials: 'include',
      }),
    );
  });
});

describe('projectApi read contracts', () => {
  it('fetchProjectApplications는 지원자 목록을 UI 모델로 변환한다', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        result: [
          {
            applicationId: 9001,
            applicantId: 77,
            applicantName: '지원자',
            profileImageUrl: null,
            applicantEmail: 'applicant@example.com',
            jobFieldName: '프론트엔드',
            jobPositionName: '웹 프론트엔드',
            motivation: 'React 경험으로 프로젝트에 기여하고 싶습니다.',
            status: 'PENDING',
            appliedAt: '2026-04-23T10:00:00',
            currentCount: 1,
            recruitmentCount: 2,
            isRecruitmentFull: false,
          },
        ],
      }),
    } as Response);

    await expect(projectApi.fetchProjectApplications(1201)).resolves.toEqual([
      expect.objectContaining({
        id: 9001,
        applicantId: 77,
        name: '지원자',
        position: '프론트엔드',
        specialty: '웹 프론트엔드',
        appliedAt: '2026.04.23 지원',
        email: 'applicant@example.com',
        status: 'pending',
        currentCount: 1,
        recruitmentCount: 2,
        isRecruitmentFull: false,
      }),
    ]);
  });

  it('fetchProjectEditPrefill은 endDate가 null인 현재 백엔드 응답을 상시 모집으로 해석한다', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        result: {
          projectId: 1201,
          name: '상시 모집 프로젝트',
          description: '상시 모집 prefill 테스트',
          projectCategory: 'ETC',
          projectCategoryName: '기타',
          platformCategory: 'WEB',
          githubRepositoryUrl: null,
          communicationChannelUrl: null,
          endDate: null,
          imageUrl: null,
          leaderJobFieldName: '프론트엔드',
          leaderJobPositionName: '웹 프론트엔드',
          editable: true,
          notEditableReason: null,
          recruitments: [
            {
              recruitmentStateId: 701,
              jobFieldCode: 'FRONTEND',
              jobFieldName: '프론트엔드',
              jobPositionCode: 'WEB_FRONTEND',
              jobPositionName: '웹 프론트엔드',
              recruitmentCount: 2,
              currentCount: 1,
              pendingApplicationCount: 0,
              techStackIds: [1],
              techStackNames: ['React'],
              deletable: true,
              notDeletableReason: null,
              minRecruitmentCount: 1,
            },
          ],
        },
      }),
    } as Response);

    await expect(projectApi.fetchProjectEditPrefill(1201)).resolves.toMatchObject({
      values: {
        projectName: '상시 모집 프로젝트',
        categoryId: 'other',
        releasePlatforms: ['웹'],
        recruitDeadline: '',
        isRecruitUntilComplete: true,
      },
      editable: true,
    });
  });
});

describe('missing project lifecycle contracts (TDD)', () => {
  it('deleteProject helper가 프로젝트 삭제 API 계약을 제공해야 한다', async () => {
    type DeleteProject = (projectId: string | number) => Promise<unknown>;
    const deleteProject = (projectApi as unknown as { deleteProject?: DeleteProject })
      .deleteProject;

    expect(
      deleteProject,
      '프로젝트 리더가 프로젝트를 삭제할 수 있도록 deleteProject API helper가 필요합니다.',
    ).toBeTypeOf('function');

    if (typeof deleteProject !== 'function') {
      return;
    }

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        result: {
          projectId: 1201,
          deleted: true,
        },
      }),
    } as Response);

    await deleteProject(1201);

    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:8080/api/v1/projects/1201',
      expect.objectContaining({
        method: 'DELETE',
        credentials: 'include',
      }),
    );
  });

  it('cancelProjectApplication helper가 내 지원 취소 API 계약을 제공해야 한다', async () => {
    type CancelProjectApplication = (
      projectId: string | number,
      applicationId: string | number,
    ) => Promise<unknown>;
    const cancelProjectApplication = (
      projectApi as unknown as {
        cancelProjectApplication?: CancelProjectApplication;
      }
    ).cancelProjectApplication;

    expect(
      cancelProjectApplication,
      '지원자는 본인 지원서를 철회할 수 있도록 cancelProjectApplication API helper가 필요합니다.',
    ).toBeTypeOf('function');

    if (typeof cancelProjectApplication !== 'function') {
      return;
    }

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        result: {
          applicationId: 9001,
          cancelled: true,
        },
      }),
    } as Response);

    await cancelProjectApplication(1201, 9001);

    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:8080/api/v1/projects/1201/applications/9001',
      expect.objectContaining({
        method: 'DELETE',
        credentials: 'include',
      }),
    );
  });
});
