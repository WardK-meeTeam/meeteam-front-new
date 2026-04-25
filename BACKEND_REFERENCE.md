# Backend Reference

- Remote repository: `https://github.com/WardK-meeTeam/meeteam-backend`
- Local clone used for backend code inspection in this workspace: `/tmp/meeteam-backend`
- Last synced commit: `a85a0d3`
- Last checked at: `2026-04-25`

## Latest backend sync

Synced `/tmp/meeteam-backend` from `origin/master` by fast-forwarding:

- From: `2fdad09` (`feat: 프로젝트 수정 시 모집 마감 방식 변경 기능 추가`)
- To: `a85a0d3` (`chore: 미사용 OkHttp 의존성 제거`)

Rechecked on `2026-04-25`; `/tmp/meeteam-backend` is up to date at `a85a0d3`.

Commits included:

- `78022a0` `feat: 내정보 수정에 프로젝트 경험 횟수, 기술스택 displayOrder 추가`
- `ea0bab4` `feat: 프로젝트 등록 시 기술스택 직군 제약 해제`
- `0b813fc` `refactor: notification API를 v1으로 마이그레이션 및 정리`
- `0965cc1` `feat: 나의 프로필 API를 v1으로 마이그레이션`
- `a85a0d3` `chore: 미사용 OkHttp 의존성 제거`

## Frontend-impacting changes

- My profile APIs were migrated to v1:
  - `GET /api/v1/members/me`
  - `PUT /api/v1/members/me` with `multipart/form-data`
  - Legacy `/api/members` profile endpoints still exist in the backend controller but are marked deprecated.
- `PUT /api/v1/members/me` request body `memberInfo` now requires:
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
- The backend still has deprecated GitHub repository routes at `POST /api/projects/{projectId}/repos` and `GET /api/projects/{projectId}/repos`, but the frontend no longer calls them.
- `ProjectCategory` values are now `CAPSTONE`, `CREATIVE_SEMESTER`, `CLUB`, and `ETC`.
- `GET /api/v1/main/members` member cards now return `techStacks` sorted by `displayOrder` and limited to the top 3 items.
- `POST /api/v1/projects/{projectId}/qna` request body now accepts:
  - `question: string`
  - `isSecret?: boolean` (defaults to `false` on the backend)
- `GET /api/v1/projects/{projectId}/qna` and Q&A mutation responses now include `isSecret: boolean`.
- Secret Q&A items are visible only to the questioner and project leader. For unauthorized viewers, the backend masks the item as:
  - `questionerName: "비밀글"`
  - `questionerProfileImageUrl: null`
  - `question: "비밀글입니다."`
  - `answers: []`
- Auth API additions:
  - `DELETE /api/v1/auth/withdraw`: soft-deletes the authenticated member, logs out, and clears auth cookies.
  - `DELETE /api/v1/auth/delete/{memberId}`: hard-deletes a member. This is now an Admin-only backend API and should not be used by the regular frontend member withdrawal flow.
- Project edit API note:
  - `PUT /api/v1/projects/{projectId}` now accepts `recruitmentDeadlineType`.
  - `endDate` is required only for `END_DATE`; `RECRUITMENT_COMPLETED` can omit `endDate`.
  - Frontend no longer uses the old compatibility `2099-12-31` end date workaround.
  - Current `GET /api/v1/projects/{projectId}/edit` prefill response does not include `recruitmentDeadlineType`; frontend should infer `RECRUITMENT_COMPLETED` when `endDate` is `null` until the backend adds that response field.
- Project management APIs are leader-only on the backend:
  - `GET /api/v1/projects/{projectId}/team`
  - `GET /api/v1/projects/{projectId}/edit`
  - `PUT /api/v1/projects/{projectId}`
  - `POST /api/v1/projects/{projectId}/recruitment/toggle`
  - `DELETE /api/v1/projects/{projectId}/members/{memberId}`
  - These paths call `Project.validateLeaderPermission(...)` and return HTTP `403` with `PROJECT_MEMBER403` / "해당 프로젝트 관리 권한이 없습니다." when the requester is not the project leader.

## Frontend reflection

- Switched my-profile fetch/update calls to `/api/v1/members/me`.
- Updated profile edit `memberInfo` payload to send `techStacks` with `displayOrder`.
- Removed `projectExperienceCount` from the my-profile UI and profile-edit payload because the backend field is being removed from that API.
- Switched notification list, unread count, and SSE subscription calls to `/api/v1/...`.
- Kept notification rendering resilient to the removed backend `message` field by deriving copy from notification `type` and `payload`.
- Updated Cypress API intercepts for the migrated profile and notification endpoints.
- Removed unused GitHub repository connect/read helpers that called deprecated non-v1 backend routes.
- Added `ETC`/`기타` project category support in project creation, detail mapping, project search filters, and home project filters.
- User card rendering now shows up to 3 tech stacks, and member-card API mapping keeps only the top 3 by `displayOrder`.
- Added Q&A `isSecret` mapping and a secret-question toggle in the project detail Q&A composer.
- Added a frontend helper for soft withdrawal only.
- Added a project edit prefill fallback for the current backend response gap: missing `recruitmentDeadlineType` is treated as `RECRUITMENT_COMPLETED` when `endDate` is `null`.
- Split frontend handling for authentication vs authorization errors: `401` still opens the login-required flow, while `403` is treated as a permission-denied state so project management pages redirect back to the project detail page and show an error toast instead of a login modal.

Backend-only/ops notes:

- Backend removed the unused OkHttp dependency from `build.gradle`.
- Hard delete now explicitly removes related Q&A, applications, likes, notifications, project memberships, created projects, skills, and member job positions before deleting the member.
- Hard delete was changed to an Admin-only path: `DELETE /api/v1/auth/delete/{memberId}`.
- Production config was adjusted in backend commits; no direct frontend contract change was found.
- Backend `CLAUDE.md` documents Sejong portal SSL compatibility details; no direct frontend contract change was found.

Notes:

- If `/tmp/meeteam-backend` no longer exists in a future session, re-clone from the remote repository above.
- In a new chat session, mention this file and the agent can use it as the backend location reference.
