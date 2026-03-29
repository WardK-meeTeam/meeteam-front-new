'use client';

import { ChevronDown, Search } from 'lucide-react';
import {
  FINDER_CATEGORY_OPTIONS,
  FINDER_FIELD_OPTIONS,
  FINDER_PLATFORM_OPTIONS,
} from '@/components/features/project/constants';
import { RECRUIT_STATUS_OPTIONS } from './projectFinder';
import type { CategoryFilter, FieldFilter, PlatformFilter, RecruitFilter } from './types';

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3.5 py-1.5 text-sm leading-5 transition-all ${
        active
          ? 'bg-text-black font-medium text-white shadow-sm'
          : 'font-normal text-text-gray hover:text-text-black'
      }`}
    >
      {label}
    </button>
  );
}

function SelectField({
  value,
  onChange,
  options,
  className = '',
}: {
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full appearance-none rounded-xl border border-border-gray bg-white py-3 pl-4 pr-10 text-sm leading-5 font-medium text-text-body shadow-sm outline-none transition-colors focus:border-brand-400"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-gray"
        aria-hidden
        strokeWidth={1.8}
      />
    </div>
  );
}

type ProjectFindFiltersProps = {
  searchValue: string;
  category: CategoryFilter;
  recruitOnly: RecruitFilter;
  platform: PlatformFilter;
  field: FieldFilter;
  onSearchValueChange: (value: string) => void;
  onCategoryChange: (value: CategoryFilter) => void;
  onRecruitOnlyChange: (value: RecruitFilter) => void;
  onPlatformChange: (value: PlatformFilter) => void;
  onFieldChange: (value: FieldFilter) => void;
};

export function ProjectFindFilters({
  searchValue,
  category,
  recruitOnly,
  platform,
  field,
  onSearchValueChange,
  onCategoryChange,
  onRecruitOnlyChange,
  onPlatformChange,
  onFieldChange,
}: ProjectFindFiltersProps) {
  return (
    <div className="space-y-6 pt-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
        <label className="relative block flex-1 lg:max-w-3xl">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-gray"
            aria-hidden
            strokeWidth={1.8}
          />
          <input
            type="search"
            value={searchValue}
            onChange={(event) => onSearchValueChange(event.target.value)}
            placeholder="프로젝트 이름 또는 리더 이름으로 검색하세요."
            className="h-14 w-full rounded-xl border border-border-gray bg-white py-4 pl-12 pr-5 text-base text-text-black shadow-sm outline-none placeholder:text-muted-gray focus:border-brand-400"
          />
        </label>

        <div className="flex flex-col gap-3 sm:flex-row">
          <SelectField
            value={category}
            onChange={(value) => onCategoryChange(value as CategoryFilter)}
            options={FINDER_CATEGORY_OPTIONS}
            className="sm:min-w-36"
          />
          <SelectField
            value={recruitOnly === 'recruiting' ? '모집 중만 보기' : '전체 상태'}
            onChange={(value) =>
              onRecruitOnlyChange(value === '모집 중만 보기' ? 'recruiting' : 'all')
            }
            options={RECRUIT_STATUS_OPTIONS}
            className="sm:min-w-36"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-border-gray bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
            <span className="w-12 shrink-0 text-sm leading-5 font-semibold text-text-black">
              플랫폼
            </span>
            <div className="flex flex-wrap gap-2">
              {FINDER_PLATFORM_OPTIONS.map((option) => (
                <FilterChip
                  key={option}
                  label={option}
                  active={platform === option}
                  onClick={() => onPlatformChange(option)}
                />
              ))}
            </div>
          </div>

          <div className="h-px w-full bg-border-soft" />

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
            <span className="w-12 shrink-0 text-sm leading-5 font-semibold text-text-black">
              분야
            </span>
            <div className="flex flex-wrap gap-2">
              {FINDER_FIELD_OPTIONS.map((option) => (
                <FilterChip
                  key={option}
                  label={option}
                  active={field === option}
                  onClick={() => onFieldChange(option)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
