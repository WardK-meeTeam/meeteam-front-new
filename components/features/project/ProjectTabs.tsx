'use client';

import { useSearchParams, useRouter } from 'next/navigation';

const TABS = [
  { id: 'intro', label: '프로젝트 소개' },
  { id: 'recruit', label: '팀원 모집' },
  { id: 'qa', label: 'Q&A' },
] as const;

export type ProjectTabId = (typeof TABS)[number]['id'];

export default function ProjectTabs() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeId = (searchParams.get('tab') as ProjectTabId) || 'intro';

  const handleClick = (tabId: ProjectTabId) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tabId);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <nav className="flex gap-8 border-b border-border-gray" role="tablist">
      {TABS.map((tab) => {
        const isActive = activeId === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => handleClick(tab.id)}
            className={`relative py-4 text-sm font-semibold transition-colors ${
              isActive ? 'text-brand-500' : 'text-text-gray hover:text-text-black'
            }`}
          >
            {tab.label}
            {isActive && (
              <span
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-brand-500"
                aria-hidden
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}
