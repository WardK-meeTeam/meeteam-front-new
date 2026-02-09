# meeTeam Frontend

meeTeam 프론트엔드 프로젝트입니다.  
Next.js(App Router) + TypeScript 기반으로 개발합니다.

## 기술 스택

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- ESLint
- Prettier

## 코드 포맷팅

- 프로젝트에는 Prettier 설정이 포함되어 있습니다: `.prettierrc.json`, `.prettierignore`
- VSCode 사용 시 워크스페이스 설정(`.vscode/settings.json`)으로 저장 시 자동 포맷됩니다.
- 권장 확장 프로그램: `Prettier - Code formatter` (`esbenp.prettier-vscode`)

```bash
npm run format        # 전체 파일 포맷
npm run format:check  # 포맷 검사(변경 없음)
```

## 폴더 구조

```text
.
|-- app/            # 라우팅, layout, page, route handler
|-- components/
|   |-- feature/    # 도메인(기능) 단위 컴포넌트
|   |-- shared/     # 여러 화면에서 재사용되는 공통 컴포넌트
|-- constants/      # 상수
|-- contexts/       # React Context
|-- hooks/          # 커스텀 훅
|-- utils/          # 유틸 함수
|-- assets/         # import해서 사용하는 에셋
|-- public/         # 정적 파일(직접 URL 접근)
|-- api/            # API 관련 코드(클라이언트 로직 등)
`-- ...
```

구조 원칙:

- `app/`에는 라우팅 관련 코드만 둡니다.
- `components/feature`: 특정 기능(도메인)에 종속된 UI를 둡니다.
- `components/shared`: 버튼, 모달, 입력 컴포넌트 등 범용 UI를 둡니다.
- 정적 리소스는 용도에 따라 분리합니다.
- `public/`: `/images/logo.png`처럼 URL로 직접 접근할 파일
- `assets/`: 컴포넌트에서 `import`해서 사용하는 파일

## 네이밍 규칙

- 컴포넌트: `PascalCase` (`UserCard.tsx`)
- 훅: `camelCase` + `use` 접두어 (`useAuth.ts`)
- 상수: `UPPER_SNAKE_CASE` (`API_BASE_URL`)
- 파일/폴더: 가능하면 의미 중심으로 명확하게 작성

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
- `refactor`: 리팩터링(동작 변화 없음)
- `test`: 테스트 추가/수정
- `chore`: 빌드/설정/패키지 등 기타 작업
- `build`: 빌드 시스템/의존성 변경

### 커밋 메시지 예시

```text
feat: 소셜 로그인 버튼 구현
docs: README 작성
chore: 린트 규칙 변경
```

## 브랜치 전략 (권장)

- `main`: 운영 배포 브랜치
- `develop`: 통합 개발 브랜치
- `feature/*`: 기능 개발
- `fix/*`: 버그 수정
- `hotfix/*`: 긴급 수정
