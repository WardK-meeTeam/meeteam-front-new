'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDown, LogOut, Settings, UserRound } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';

const PROFILE_IMAGE_URL =
  'http://localhost:3845/assets/f1172eb8cefcbe26d0f11c0aadeea5d533cb00a6.png';

const MENU_ITEMS = [
  {
    href: '/profile',
    label: '내 프로필',
    icon: UserRound,
  },
  {
    href: '/settings',
    label: '설정',
    icon: Settings,
  },
] as const;

export default function ProfileMenu() {
  const pathname = usePathname();
  const router = useRouter();
  const clearSession = useAuthStore((state) => state.clearSession);
  const name = useAuthStore((state) => state.name);
  const email = useAuthStore((state) => state.email);

  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const userName = name?.trim() || 'meeTeam 사용자';
  const userEmail = email?.trim() || '로그인 후 이용해주세요';

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  const handleLogout = () => {
    clearSession();
    setOpen(false);
    router.push('/auth/login');
    router.refresh();
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        className="flex items-center gap-2"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="프로필 메뉴"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="h-9 w-9 overflow-hidden rounded-full bg-brand-50">
          <img alt="프로필" className="h-full w-full object-cover" src={PROFILE_IMAGE_URL} />
        </span>
        <ChevronDown
          className={`h-4 w-4 text-text-gray transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden
          strokeWidth={1.8}
        />
      </button>

      {open ? (
        <div
          className="absolute right-0 top-full z-30 mt-3 w-56 overflow-hidden rounded-2xl bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)]"
          role="menu"
          aria-label="프로필 메뉴 목록"
        >
          <div className="border-b border-surface-soft bg-surface-soft/50 px-5 pb-[17px] pt-4">
            <p className="text-sm leading-5 font-bold text-text-black">{userName}</p>
            <p className="mt-0.5 text-xs leading-4 text-text-gray">{userEmail}</p>
          </div>

          <div className="flex flex-col gap-0.5 p-2">
            {MENU_ITEMS.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="flex h-10 items-center gap-2.5 rounded-xl px-3 transition-colors hover:bg-surface-soft"
                role="menuitem"
              >
                <Icon className="h-4 w-4 text-text-body" aria-hidden strokeWidth={1.8} />
                <span className="text-sm leading-5 font-medium text-text-body">{label}</span>
              </Link>
            ))}
          </div>

          <div className="border-t border-surface-soft px-2 pb-2 pt-[9px]">
            <button
              type="button"
              onClick={handleLogout}
              className="flex h-10 w-full items-center gap-2.5 rounded-xl px-3 text-left transition-colors hover:bg-surface-soft"
              role="menuitem"
            >
              <LogOut className="h-4 w-4 text-danger-400" aria-hidden strokeWidth={1.8} />
              <span className="text-sm leading-5 font-bold text-danger-400">로그아웃</span>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
