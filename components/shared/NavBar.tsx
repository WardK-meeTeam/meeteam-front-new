'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell } from 'lucide-react';
import { useEffect, useState } from 'react';
import AuthLink from '@/components/features/auth/AuthLink';
import { useNotificationStore } from '@/components/features/notification/store';
import { useNotificationSync } from '@/components/features/notification/useNotificationSync';
import AppLogo from '@/components/shared/AppLogo';
import ProfileMenu from '@/components/shared/ProfileMenu';
import { useAuthStore } from '@/stores/useAuthStore';

const navItems = [
  { href: '/teammates', label: '팀원 찾기' },
  { href: '/projects', label: '프로젝트 찾기' },
  { href: '/projects/create', label: '프로젝트 등록하기', authRequired: true },
];

export function NavBar() {
  const pathname = usePathname();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const unreadCount = useNotificationStore((state) => state.unreadCount);
  const [isAtTop, setIsAtTop] = useState(true);
  useNotificationSync(isAuthenticated);

  useEffect(() => {
    const updateNavVisibility = () => {
      setIsAtTop(window.scrollY <= 8);
    };

    updateNavVisibility();
    window.addEventListener('scroll', updateNavVisibility, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateNavVisibility);
    };
  }, [pathname]);

  const isActiveLink = (href: string) =>
    pathname === href ||
    (href !== '/projects' && pathname.startsWith(`${href}/`)) ||
    (href === '/projects' &&
      pathname.startsWith('/projects') &&
      !pathname.startsWith('/projects/create'));

  return (
    <nav
      className={`sticky top-0 z-40 border-b border-home-blue-100 bg-white/95 backdrop-blur-md transition-transform duration-300 ease-out ${
        isAtTop ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="inline-flex items-center" aria-label="meeTeam 홈">
            <AppLogo className="h-9 w-40" priority />
          </Link>

          <ul className="flex list-none items-center gap-6 p-0">
            {navItems.map((item) => (
              <li key={item.href}>
                {item.authRequired ? (
                  <AuthLink
                    className={
                      isActiveLink(item.href)
                        ? 'text-sm leading-5 font-semibold text-home-blue-500'
                        : 'text-sm leading-5 font-medium text-text-gray transition-colors hover:text-home-blue-500'
                    }
                    href={item.href}
                  >
                    {item.label}
                  </AuthLink>
                ) : (
                  <Link
                    className={
                      isActiveLink(item.href)
                        ? 'text-sm leading-5 font-semibold text-home-blue-500'
                        : 'text-sm leading-5 font-medium text-text-gray transition-colors hover:text-home-blue-500'
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
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-text-gray transition-colors hover:bg-home-blue-100 hover:text-home-blue-500"
                aria-label="알림"
              >
                <Bell className="h-5 w-5" aria-hidden strokeWidth={1.8} />
                {unreadCount > 0 ? (
                  <span
                    className="absolute right-2.5 top-2.5 flex min-h-2 min-w-2 items-center justify-center rounded-full border-2 border-white bg-danger-500"
                    aria-hidden
                  />
                ) : null}
              </button>
            </Link>
            <span className="h-6 w-px bg-home-blue-100" aria-hidden />
            <ProfileMenu />
          </div>
        ) : (
          <Link
            href="/auth/login"
            className="inline-flex h-10 items-center justify-center rounded-full border border-home-blue-100 bg-white px-5 text-sm leading-5 font-bold text-home-blue-500 shadow-sm transition-colors hover:bg-home-blue-100 hover:text-text-black"
          >
            로그인
          </Link>
        )}
      </div>
    </nav>
  );
}
