import Link from "next/link";

const navItems = [
  { href: "/", label: "메인" },
  { href: "/projects", label: "프로젝트 찾기" },
  { href: "/projects/1", label: "프로젝트 1 상세" },
  { href: "/projects/1/apply", label: "프로젝트 1 지원" },
  { href: "/projects/1/apply/1", label: "지원서 1 상세" },
  { href: "/projects/1/manage", label: "프로젝트 관리 홈" },
  { href: "/projects/1/manage/members", label: "팀원 관리" },
  { href: "/projects/1/manage/applicants", label: "지원자 관리" },
  { href: "/projects/1/manage/edit", label: "프로젝트 수정" },
  { href: "/profile", label: "마이페이지" },
  { href: "/profile/1", label: "사용자 1 프로필" },
  { href: "/teammates", label: "팀원 찾기" },
  { href: "/notifications", label: "알림" },
  { href: "/auth/login", label: "로그인" },
  { href: "/auth/sign-up", label: "회원가입" },
];

export function TemporaryNavBar() {
  return (
    <nav className="border-b border-zinc-200">
      <div className="mx-auto w-full max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <ul className="m-0 flex list-none flex-wrap gap-x-3 gap-y-2 p-0 text-sm">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                className="rounded-md px-2 py-1 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900"
                href={item.href}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
