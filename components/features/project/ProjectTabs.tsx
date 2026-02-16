'use client';

import { useState } from 'react';

const TABS = [
  { id: 'intro', label: '프로젝트 소개' },
  { id: 'recruit', label: '팀원 모집' },
  { id: 'qa', label: 'Q&A' },
] as const;

export type ProjectTabId = (typeof TABS)[number]['id'];

export interface ProjectTabsProps {
  /** 현재 선택된 탭 (제어 모드). 없으면 내부 state 사용 */
  value?: ProjectTabId;
  /** 탭 변경 시 호출 (제어 모드에서 사용) */
  onChange?: (tabId: ProjectTabId) => void;
}

export default function ProjectTabs({ value, onChange }: ProjectTabsProps) {
  const [internalValue, setInternalValue] = useState<ProjectTabId>('intro');
  const activeId = value ?? internalValue;

  const handleClick = (tabId: ProjectTabId) => {
    if (onChange) {
      onChange(tabId);
    } else {
      setInternalValue(tabId);
    }
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
            className={`relative pb-3 text-sm font-semibold transition-colors ${
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
