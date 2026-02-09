# meeTeam Frontend

meeTeam 프론트엔드

Next.js(App Router) + TypeScript 기반

## 기술 스택

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- Zustand (전역 상태 관리)
- Zod (input 값 유효성 검증 시 사용바람)
- ESLint
- Prettier

## 코드 포맷팅

- Prettier 사용
- VSCode 사용 시 워크스페이스 설정(`.vscode/settings.json`)으로 저장 시 자동 포맷팅
- 권장 확장 프로그램: `Prettier - Code formatter`

```bash
npm run format        # 전체 파일 포맷
```

## 기본 폴더 구조

```text
.
|-- app/            # 라우팅, layout, page, route handler
|-- components/
|   |-- features/   # 도메인(기능) 단위 컴포넌트
|   |-- shared/     # 여러 화면에서 재사용되는 공통 컴포넌트
|-- constants/      # 상수
|-- contexts/       # React Context
|-- hooks/          # 커스텀 훅
|-- types/          # 여러 도메인에서 공용으로 사용하는 타입
|-- mocks/          # 개발/테스트에서 사용하는 API 모킹 및 목데이터
|-- stores/         # 여러 도메인에서 공용으로 사용하는 Zustand 스토어
|-- schemas/        # 여러 도메인에서 공용으로 사용하는 Zod 스키마
|-- utils/          # 유틸 함수
|-- assets/         # import해서 사용하는 에셋
|-- public/         # 정적 파일(직접 URL 접근)
|-- api/            # API 관련 코드(클라이언트 로직 등)
`-- ...
```

구조 원칙:

- `app/`에는 라우팅 관련 코드
- `components/features`: 특정 기능(도메인)에 종속된 UI
- `components/shared`: 버튼, 모달, 입력 컴포넌트 등 범용 UI
- `types/`: 여러 도메인에서 공용으로 사용하는 타입들
- `mocks/`: 개발/테스트용 API 모킹 코드와 목데이터들
- `Zustand`: 도메인 상태는 `components/features/{domain}/store.ts`, 공용 상태는 `stores/`
- `Zod`: 도메인 스키마는 `components/features/{domain}/schema.ts`, 공용 스키마는 `schemas/`
- 이미지같은 에셋은 종류에 따라 두 곳으로 분리
- `public/`: URL로 직접 쓸 때
- `assets/`: 컴포넌트에서 `import`해서 사용할 때

`아이콘은 최대한 svg로 저장바람!!`

## 도메인에 따른 폴더 구조

- `auth`: 로그인, 회원가입(이메일/소셜/기술스택 선택)
- `project`: 메인, 상세, 등록, 수정, Q&A, 팀원 모집, 프로젝트 찾기, 프로젝트 관리
  - `project/apply`: 프로젝트 지원, 지원서 상세
  - `project/management/applicants`: 지원자 관리
  - `project/management/members`: 팀원 관리
- `profile`: 마이페이지, 프로필 수정, 다른 사용자 프로필
- `team`: 팀원 찾기
- `notification`: 알림

권장 예시 구조:

```text
app/
|-- (with-nav)/                      # 상단 네비게이션 포함 레이아웃
|   |-- projects/
|   |   |-- page.tsx                 # 프로젝트 찾기
|   |   `-- [projectId]/
|   |       |-- page.tsx             # 프로젝트 상세(기본/Q&A/모집 탭)
|   |       |-- apply/
|   |       |   |-- page.tsx         # 프로젝트 지원
|   |       |   `-- [applicationId]/page.tsx  # 지원서 상세
|   |       `-- manage/
|   |           |-- page.tsx         # 관리 홈
|   |           |-- members/page.tsx # 팀원 관리
|   |           |-- applicants/page.tsx # 지원자 관리
|   |           `-- edit/page.tsx    # 프로젝트 수정
|   |-- profile/
|   |   |-- page.tsx                 # 마이페이지
|   |   `-- [userId]/page.tsx        # 다른 사용자 프로필
|   |-- teammates/page.tsx           # 팀원 찾기
|   `-- notifications/page.tsx       # 알림
|-- (auth)/                          # 상단 네비게이션 미포함 레이아웃
|   `-- auth/
|       |-- login/page.tsx
|       `-- sign-up/page.tsx

components/
`-- shared/
`-- features/
    |-- auth/
    |   `-- types.ts  # 컴포넌트 타입 정의는 이런 식으로 도메인 폴더 내부에서 types.ts로 정의
    |-- project/
    |-- profile/
    |-- team/
    |-- notification/

```

## 네이밍 규칙

- 컴포넌트: `PascalCase` (`UserCard.tsx`)
- App Router 페이지 컴포넌트: `app/**/page.tsx`의 기본 export 컴포넌트 이름은 `Page`로 통일 (export default)
- Export: 기본은 선언과 동시에 `export` (`export function`, `export default function`)
- 공용 타입: `types/` 폴더에 정의 (`types/common.ts`, `types/api.ts`)
- 모킹 데이터/핸들러: `mocks/` 폴더에 정의
- 훅: `camelCase` + `use` 접두어 (`useAuth.ts`)
- 상수: `UPPER_SNAKE_CASE` (`API_BASE_URL`)

## 반응형 스타일 규칙

- 폭은 고정값 사용을 지양함
  - 권장: `w-full` + `max-w-*` 형식
- 이미지/미디어는 항상 화면에 맞게 줄어들게 유지
  - 기준: `max-width: 100%`, `h-auto`
- 페이지 파일(`page.tsx`) 기본 시작 패턴:

```js
// 단일 콘텐츠 페이지 예시
export default function Page() {
  return (
    <section className="space-y-6 md:space-y-8">
      <h1 className="text-2xl font-semibold">프로필 수정</h1>
      <div className="rounded-xl border p-4">폼 영역</div>
    </section>
  );
}
```

```js
// 카드/목록 페이지 예시
export default function Page() {
  return (
    <section className="space-y-6 md:space-y-8">
      <h1 className="text-2xl font-semibold">팀원 찾기</h1>

      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <li className="rounded-xl border p-4">카드 1</li>
        <li className="rounded-xl border p-4">카드 2</li>
        <li className="rounded-xl border p-4">카드 3</li>
      </ul>
    </section>
  );
}
```

## 커밋 컨벤션 (Angular)

형식:

```text
type: subject
```

- `type`: 커밋 종류
- `subject`: 한 줄 요약

### type 목록

- `feat`: 새로운 기능
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 포맷팅, 세미콜론 등 비기능 변경
- `refactor`: 리팩터링
- `test`: 테스트 추가/수정
- `chore`: 빌드/설정/패키지 등 기타 작업
- `build`: 빌드 시스템/의존성 변경

### 커밋 메시지 예시

```text
feat: 소셜 로그인 버튼 구현
docs: README 작성
chore: 린트 규칙 변경
```

## 브랜치

- `feature/`: 기능 개발
- `fix/`: 버그 수정

## PR 컨벤션

- PR 본문은 내용 변경 없이 비워두고, 제목만 작성
- 제목 형식: `TYPE - 제목`

예시:

```text
FEATURE - 메인 페이지 구현
```
