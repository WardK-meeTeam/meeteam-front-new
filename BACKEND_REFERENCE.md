# Backend Reference

- Remote repository: `https://github.com/WardK-meeTeam/meeteam-backend`
- Latest local clone used for backend code inspection in this workspace: `/tmp/meeteam-backend-latest`
- Previous local clone noted in older sessions: `/tmp/meeteam-backend`
- Last synced commit: `ae8a443`
- Last checked at: `2026-04-27`

## Latest backend sync

The previous reference was checked at `a85a0d3` on `2026-04-25`.

For this sync, `/tmp/meeteam-backend` still existed but was not usable as a Git repository because required `.git` files such as `HEAD` and `config` were missing. A fresh clone was created at `/tmp/meeteam-backend-latest` from `origin/master`.

Latest checked commit:

- `ae8a443` `feat: projectCount 정렬 필터 및 지원서 기술스택 응답 추가`

Commits after the previous `a85a0d3` reference:

- `2c8f425` `fix: 배포 후 미사용 Docker 이미지 자동 정리`
- `c4145a7` `refactor: OAuth2/자체로그인 제거 및 세종대 포털 전용 인증 전환`
- `ae8a443` `feat: projectCount 정렬 필터 및 지원서 기술스택 응답 추가`

## Frontend-impacting changes

Changes newly found after `a85a0d3`:

- My application list now returns every application status, not only `PENDING`.
  - `GET /api/v1/members/me/applications`
  - `AppliedProjectResponse` now includes:
    - `applicationId: number`
    - `projectId: number`
    - `projectName: string`
    - `projectImageUrl: string | null`
    - `jobPositionId: number`
    - `jobPositionName: string`
    - `status: "PENDING" | "ACCEPTED" | "REJECTED" | "CANCELLED"`
    - `statusDisplayName: string`
    - `appliedAt: string`
- Applicant-side cancellation was added:
  - `DELETE /api/v1/members/me/applications/{applicationId}`
  - Only the applicant can cancel.
  - Only `PENDING` applications can be cancelled.
  - Response shape is `ApplicationCancelResponse`:
    - `applicationId: number`
    - `projectId: number`
    - `projectName: string`
    - `status: "CANCELLED"`
- `ApplicationStatus` now includes `CANCELLED`.
- Project deletion is available on the v1 project path:
  - `DELETE /api/v1/projects/{projectId}`
  - Existing legacy `DELETE /api/projects/{projectId}` remains deprecated.
  - When a project is deleted, pending applications are rejected on the backend.
- Member card responses now expose participation count rather than self-reported project experience count.
  - `GET /api/v1/main/members` response field changed from `projectExperienceCount` to `projectCount`.
  - `GET /api/v1/members/search` uses the same main-page member card response.
  - The count is based on active project memberships.
  - As of `ae8a443`, `GET /api/v1/members/search` supports `sort=projectCount,desc` through Querydsl subquery sorting.
  - The v1 search controller also documents `sort=realName,asc` for name sorting.
- Application page and detail responses now expose applicant tech stacks.
  - `GET /api/v1/projects/{projectId}/application`
  - `GET /api/v1/projects/{projectId}/applications/{applicationId}`
  - Both include `techStacks: Array<{ id: number; name: string; displayOrder: number }>` ordered by `displayOrder`.
- Project member withdrawal and leader expel now decrease the matching recruitment position `currentCount` on the backend.
  - Leader expel endpoint is unchanged:
    - `DELETE /api/v1/projects/{projectId}/members/{memberId}`
  - Member self-withdrawal still uses the existing project-member controller:
    - `POST /api/project-members/withdraw` with `{ projectId }`
- Current backend duplicate-application validation checks only whether the same applicant has any existing application for the project. As of `ae8a443`, `REJECTED` and `CANCELLED` applications are still blocked from reapplying.

Previously reflected backend changes from the `2026-04-25` sync:

- My profile APIs were migrated to v1:
  - `GET /api/v1/members/me`
  - `PUT /api/v1/members/me` with `multipart/form-data`
  - Legacy `/api/members` profile endpoints still exist in the backend controller but are marked deprecated.
- `PUT /api/v1/members/me` request body `memberInfo` requires:
  - `name: string`
  - `age: number`
  - `gender: "MALE" | "FEMALE"`
  - `jobPositionIds: number[]`
  - `techStacks: Array<{ id: number; displayOrder: number }>`
  - `isParticipating?: boolean`
  - `introduction?: string`
  - `githubUrl?: string`
  - `blogUrl?: string`
- Notification APIs were migrated to v1:
  - `GET /api/v1/notifications`
  - `GET /api/v1/notifications/unread/count`
  - `GET /api/v1/subscribe` for SSE
- `NotificationResponse` no longer includes `message`; frontend notification copy should be generated from `type` and `payload`.
- Project recruitment creation no longer validates that selected tech stacks belong to the selected job field. The frontend may allow any known tech stack for a recruitment position.
- Deprecated GitHub repository routes at `POST /api/projects/{projectId}/repos` and `GET /api/projects/{projectId}/repos` should not be used by the frontend.
- `ProjectCategory` values are `CAPSTONE`, `CREATIVE_SEMESTER`, `CLUB`, and `ETC`.
- `GET /api/v1/main/members` member cards return `techStacks` sorted by `displayOrder` and limited to the top 3 items.
- Q&A supports secret questions:
  - `POST /api/v1/projects/{projectId}/qna` accepts `question` and optional `isSecret`.
  - Q&A responses include `isSecret`.
  - Unauthorized viewers receive masked secret Q&A content.
- Auth API additions:
  - `DELETE /api/v1/auth/withdraw`: soft-deletes the authenticated member, logs out, and clears auth cookies.
  - `DELETE /api/v1/auth/delete/{memberId}`: Admin-only hard delete. Regular frontend withdrawal should not call it.
- Project edit API note:
  - `PUT /api/v1/projects/{projectId}` accepts `recruitmentDeadlineType`.
  - `endDate` is required only for `END_DATE`; `RECRUITMENT_COMPLETED` can omit `endDate`.
  - `GET /api/v1/projects/{projectId}/edit` may omit `recruitmentDeadlineType`; frontend should infer `RECRUITMENT_COMPLETED` when `endDate` is `null`.
- Project management APIs are leader-only and return HTTP `403` with permission errors for non-leaders.

## Excluded in this frontend pass

Per the current task request, login and refresh-token related changes were not applied.

Excluded backend changes include:

- Removal of OAuth2 and custom email/password login code.
- Sejong portal-only authentication conversion details.
- Login and token exchange endpoint cleanup.
- Refresh token behavior changes.

The latest backend also removes `projectExperienceCount` from `SejongRegisterRequest`. Frontend signup/onboarding should not ask for or submit this value.

## Frontend reflection

Newly reflected in this pass:

- Updated `BACKEND_REFERENCE.md` to latest backend commit `ae8a443`.
- Updated applicant cancellation helper to call `DELETE /api/v1/members/me/applications/{applicationId}`.
- Added `CANCELLED` to frontend application status mapping.
- Updated my-application response typing and mapping for `projectImageUrl`, `status`, and `statusDisplayName`.
- Replaced frontend member-card usage of `projectExperienceCount` with `projectCount` for home and teammate search responses, keeping a fallback for older mocks/responses.
- Updated teammate card copy to show participation count: `참여 프로젝트 n개`.
- Restored teammate search sort UI and sends `sort=projectCount,desc` or `sort=realName,asc` now that backend v1 search supports computed `projectCount` sorting.
- Added applicant tech stack rendering to the application form and application-detail views using existing tech stack chip/icon components.
- Removed project experience count from signup/onboarding form values, validation, UI, and register payloads.
- Added `leaveProject` helper for `POST /api/project-members/withdraw`.
- Added a frontend application policy helper documenting the current backend behavior: all existing application statuses block reapplication.
- Added an authenticated application-detail page shell that can show an application and cancel pending applications through the new my-application cancellation endpoint.
- Added project delete UI in the project manage overview. It opens a confirmation modal and calls `DELETE /api/v1/projects/{projectId}`.
- Updated unit/Cypress contract expectations that referenced the old project-scoped cancellation endpoint.

Already reflected from earlier syncs:

- Switched my-profile fetch/update calls to `/api/v1/members/me`.
- Updated profile edit `memberInfo` payload to send `techStacks` with `displayOrder`.
- Removed `projectExperienceCount` from the my-profile UI and profile-edit payload.
- Switched notification list, unread count, and SSE subscription calls to `/api/v1/...`.
- Kept notification rendering resilient to the removed backend `message` field by deriving copy from notification `type` and `payload`.
- Updated Cypress API intercepts for migrated profile and notification endpoints.
- Removed unused GitHub repository connect/read helpers that called deprecated non-v1 backend routes.
- Added `ETC`/`기타` project category support.
- Added Q&A `isSecret` mapping and a secret-question toggle in the project detail Q&A composer.
- Added a frontend helper for soft withdrawal only.
- Added a project edit prefill fallback for missing `recruitmentDeadlineType`.
- Split frontend handling for authentication vs authorization errors.

## Backend-only/ops notes

- `2c8f425` only updates deployment cleanup for unused Docker images; no direct frontend contract change.
- Backend production/deployment details were not reflected in frontend code.

## Notes

- If `/tmp/meeteam-backend-latest` no longer exists in a future session, clone from the remote repository above.
- The previous `/tmp/meeteam-backend` path may need to be deleted and recloned before it can be used again as a Git repository.
