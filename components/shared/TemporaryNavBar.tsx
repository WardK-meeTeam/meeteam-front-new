'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell } from 'lucide-react';
import AuthLink from '@/components/features/auth/AuthLink';
import ProfileMenu from '@/components/shared/ProfileMenu';
import { useAuthStore } from '@/stores/useAuthStore';

const navItems = [
  { href: '/teammates', label: '팀원 찾기' },
  { href: '/projects', label: '프로젝트 찾기' },
  { href: '/projects/create', label: '프로젝트 등록하기', authRequired: true },
];

export function TemporaryNavBar() {
  const pathname = usePathname();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isActiveLink = (href: string) =>
    pathname === href ||
    (href !== '/projects' && pathname.startsWith(`${href}/`)) ||
    (href === '/projects' &&
      pathname.startsWith('/projects') &&
      !pathname.startsWith('/projects/create'));

  return (
    <nav className="sticky top-0 z-20 border-b border-border-gray bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl leading-7 font-bold tracking-tight text-text-black">
            meeTeam
          </Link>

          <ul className="flex list-none items-center gap-6 p-0">
            {navItems.map((item) => (
              <li key={item.href}>
                {item.authRequired ? (
                  <AuthLink
                    className={
                      isActiveLink(item.href)
                        ? 'text-sm leading-5 font-semibold text-brand-500'
                        : 'text-sm leading-5 font-medium text-project-status-closed transition-colors hover:text-text-black'
                    }
                    href={item.href}
                  >
                    {item.label}
                  </AuthLink>
                ) : (
                  <Link
                    className={
                      isActiveLink(item.href)
                        ? 'text-sm leading-5 font-semibold text-brand-500'
                        : 'text-sm leading-5 font-medium text-project-status-closed transition-colors hover:text-text-black'
                    }
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <Link href="/notifications">
              <button
                type="button"
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-project-status-closed transition-colors hover:bg-surface-soft hover:text-text-black"
                aria-label="알림"
              >
                <Bell className="h-5 w-5" aria-hidden strokeWidth={1.8} />
                <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-danger-500 shadow-[0_0_0_2px_white]" />
              </button>
            </Link>
            <span className="h-6 w-px bg-border-gray" aria-hidden />
            <ProfileMenu />
          </div>
        ) : (
          <Link
            href="/auth/login"
            className="text-sm leading-5 font-medium text-project-status-closed transition-colors hover:text-text-black"
          >
            로그인
          </Link>
        )}
      </div>
    </nav>
  );
}
