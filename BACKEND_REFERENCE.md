# Backend Reference

- Remote repository: `https://github.com/WardK-meeTeam/meeteam-backend`
- Local clone used for backend code inspection in this workspace: `/tmp/meeteam-backend`
- Last synced commit: `2fdad09`
- Last checked at: `2026-04-24`

## Latest backend sync

Synced `/tmp/meeteam-backend` from `origin/master` by fast-forwarding:

- From: `0e7bcf5` (`feat: 프로젝트 카테고리 변경 (캡스톤, 창의학기제, 동아리)`)
- To: `2fdad09` (`feat: 프로젝트 수정 시 모집 마감 방식 변경 기능 추가`)

Commits included:

- `a57b723` `feat: 회원 탈퇴 기능 추가 (소프트 삭제)`
- `92b1148` `feat: 프로젝트 카테고리에 기타(ETC) 추가`
- `45e6b97` `feat: Q&A 비밀글 기능 추가`
- `ccc3d23` `fix: create로 수정`
- `0f5303a` `feat: 회원 하드 삭제 API 추가`
- `93ee940` `feat: 회원 하드 삭제 시 CASCADE 삭제 기능 추가`
- `bc23479` `docs: CLAUDE.md에 세종대 포털 SSL 호환성 정보 추가`
- `597ca47` `refactor: 회원 하드 삭제 API를 Admin용으로 변경`
- `b472cb3` `fix: s3 url 경로 추가`
- `2fdad09` `feat: 프로젝트 수정 시 모집 마감 방식 변경 기능 추가`

## Frontend-impacting changes

- `ProjectCategory` values are now `CAPSTONE`, `CREATIVE_SEMESTER`, `CLUB`, and `ETC`.
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

## Frontend reflection

- Added `ETC`/`기타` project category support in project creation, detail mapping, project search filters, and home project filters.
- Added Q&A `isSecret` mapping and a secret-question toggle in the project detail Q&A composer.
- Added a frontend helper for soft withdrawal only.

Backend-only/ops notes:

- Hard delete now explicitly removes related Q&A, applications, likes, notifications, project memberships, created projects, skills, and member job positions before deleting the member.
- Hard delete was changed to an Admin-only path: `DELETE /api/v1/auth/delete/{memberId}`.
- Production config was adjusted in backend commits; no direct frontend contract change was found.
- Backend `CLAUDE.md` documents Sejong portal SSL compatibility details; no direct frontend contract change was found.

Notes:
- If `/tmp/meeteam-backend` no longer exists in a future session, re-clone from the remote repository above.
- In a new chat session, mention this file and the agent can use it as the backend location reference.
