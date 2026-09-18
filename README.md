# meeTeam 프론트엔드 · 3주차 기준

이 브랜치는 3주차의 **프론트엔드 초기 구조와 공통 UI 설계**만 보여주는 배포용 스냅샷입니다. 로그인, 프로필 조회·수정, 프로젝트 생성·지원·관리, 팀원 검색, 알림 조회 등 실제 도메인 기능과 API 연동은 아직 구현하지 않았습니다. 각 경로는 준비 화면을 표시합니다.

## 구조

- `app/(auth)`: 인증 화면의 공통 레이아웃과 경로
- `app/(with-nav)`: 내비게이션을 공유하는 화면과 동적 경로
- `components/features`: 도메인별 UI와 API 파일의 위치
- `components/shared`: 버튼, 입력창, 드롭다운, 모달, 태그, 스켈레톤, 토스트 등 공통 UI
- `stores`: 인증 준비 상태와 공통 모달·토스트 상태
- `components/features/{domain}/store.ts`: 도메인별 클라이언트 UI 상태
- `app/globals.css`: Tailwind 색상 토큰

공개 화면과 인증 필요 화면은 각 준비 화면에 구분하여 표시했습니다. 실제 인증 세션 복원, 접근 제어, 입력 검증과 저장·오류 처리는 다음 주차 범위입니다.

## 실행

```bash
npm ci
npm run dev
```

Vercel에서는 `sejong-tmp` 브랜치를 배포 대상으로 선택하면 됩니다.
