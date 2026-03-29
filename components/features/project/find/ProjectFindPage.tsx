'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ChevronDown, ChevronLeft, Search } from 'lucide-react';
import {
  FINDER_CATEGORY_OPTIONS,
  FINDER_FIELD_OPTIONS,
  FINDER_PLATFORM_OPTIONS,
  getProjectCategoryLabel,
} from '@/components/features/project/constants';
import { ProjectCard } from '@/components/features/project/ProjectCard';
import { useProjectStore } from '@/components/features/project/store';
import BaseButton from '@/components/shared/BaseButton';
import type { ReleasePlatform } from '@/types/project';

type PlatformFilter = ReleasePlatform | '전체';
type FieldFilter = (typeof FINDER_FIELD_OPTIONS)[number];
type RecruitFilter = 'all' | 'recruiting';
type SortFilter = 'latest' | 'deadline';
type CategoryFilter = (typeof FINDER_CATEGORY_OPTIONS)[number];

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
          ? 'bg-text-black font-medium text-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]'
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
  options: string[];
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

export default function ProjectFindPage() {
  const projectsById = useProjectStore((state) => state.projectsById);
  const [searchValue, setSearchValue] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('모든 카테고리');
  const [recruitOnly, setRecruitOnly] = useState<RecruitFilter>('all');
  const [platform, setPlatform] = useState<PlatformFilter>('전체');
  const [field, setField] = useState<FieldFilter>('전체');
  const [sort, setSort] = useState<SortFilter>('latest');
  const [visibleCount, setVisibleCount] = useState(4);

  const projects = useMemo(
    () =>
      Object.values(projectsById).sort((left, right) =>
        right.createdAt.localeCompare(left.createdAt),
      ),
    [projectsById],
  );

  const filteredProjects = useMemo(
    () =>
      projects
        .filter((project) => {
          const leader = project.members.find((member) => member.isLeader) ?? project.members[0];
          const categoryLabel = getProjectCategoryLabel(project.categoryId);
          const projectPlatforms = project.releasePlatforms;
          const recruitFields = project.recruitInterests.map((item) => item.major);
          const matchesSearch =
            searchValue.trim().length === 0 ||
            project.title.toLowerCase().includes(searchValue.toLowerCase()) ||
            leader?.name.toLowerCase().includes(searchValue.toLowerCase());
          const matchesCategory = category === '모든 카테고리' || categoryLabel === category;
          const matchesRecruit = recruitOnly === 'all' || project.status === 'recruiting';
          const matchesPlatform = platform === '전체' || projectPlatforms.includes(platform);
          const matchesField = field === '전체' || recruitFields.includes(field);

          return (
            matchesSearch && matchesCategory && matchesRecruit && matchesPlatform && matchesField
          );
        })
        .sort((left, right) => {
          if (sort === 'deadline') {
            return left.recruitDeadline.localeCompare(right.recruitDeadline);
          }

          return right.createdAt.localeCompare(left.createdAt);
        }),
    [category, platform, projects, recruitOnly, searchValue, sort, field],
  );

  useEffect(() => {
    setVisibleCount(4);
  }, [searchValue, category, recruitOnly, platform, field, sort]);

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const recruitLabel = recruitOnly === 'recruiting' ? '모집 중만 보기' : '전체 상태';

  return (
    <section className="space-y-6 pb-16 pt-2">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm leading-5 font-bold text-text-gray transition-colors hover:text-text-black"
      >
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border-gray bg-surface-soft">
          <ChevronLeft className="h-5 w-5" aria-hidden strokeWidth={1.8} />
        </span>
        뒤로가기
      </Link>

      <div className="space-y-2">
        <h1 className="text-3xl leading-9 font-bold text-text-black">프로젝트 찾기</h1>
        <p className="text-base leading-6 text-text-gray">
          당신의 스킬을 필요로 하는 멋진 팀을 찾아보세요.
        </p>
      </div>

      <div className="space-y-6 pt-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
          <label className="relative block flex-1 lg:max-w-[42rem]">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-gray"
              aria-hidden
              strokeWidth={1.8}
            />
            <input
              type="search"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="프로젝트 이름 또는 리더 이름으로 검색하세요."
              className="h-[53px] w-full rounded-xl border border-border-gray bg-white py-4 pl-12 pr-5 text-base text-text-black shadow-sm outline-none placeholder:text-muted-gray focus:border-brand-400"
            />
          </label>

          <div className="flex flex-col gap-3 sm:flex-row">
            <SelectField
              value={category}
              onChange={(value) => setCategory(value as CategoryFilter)}
              options={FINDER_CATEGORY_OPTIONS}
              className="sm:min-w-36"
            />
            <SelectField
              value={recruitLabel}
              onChange={(value) =>
                setRecruitOnly(value === '모집 중만 보기' ? 'recruiting' : 'all')
              }
              options={['전체 상태', '모집 중만 보기']}
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
              <div className="flex flex-wrap gap-x-2 gap-y-2">
                {FINDER_PLATFORM_OPTIONS.map((option) => (
                  <FilterChip
                    key={option}
                    label={option}
                    active={platform === option}
                    onClick={() => setPlatform(option)}
                  />
                ))}
              </div>
            </div>

            <div className="h-px w-full bg-border-soft" />

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
              <span className="w-12 shrink-0 text-sm leading-5 font-semibold text-text-black">
                분야
              </span>
              <div className="flex flex-wrap gap-x-2 gap-y-2">
                {FINDER_FIELD_OPTIONS.map((option) => (
                  <FilterChip
                    key={option}
                    label={option}
                    active={field === option}
                    onClick={() => setField(option)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-base leading-6 font-semibold text-text-body">
          총 <span className="text-brand-500">{filteredProjects.length}</span>개의 프로젝트
        </p>

        <SelectField
          value={sort === 'latest' ? '최신순' : '마감임박순'}
          onChange={(value) => setSort(value === '마감임박순' ? 'deadline' : 'latest')}
          options={['최신순', '마감임박순']}
          className="sm:w-32"
        />
      </div>

      {visibleProjects.length > 0 ? (
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {visibleProjects.map((project) => (
            <li key={project.id}>
              <ProjectCard
                project={{
                  id: project.id,
                  title: project.title,
                  imageUrl: project.coverImageUrl,
                  category: getProjectCategoryLabel(project.categoryId),
                  deadline: project.recruitDeadline,
                  currentMembers: project.members.length,
                  maxMembers: project.targetMemberCount,
                  leader: {
                    name: project.members.find((member) => member.isLeader)?.name ?? '팀장',
                    avatar:
                      project.members.find((member) => member.isLeader)?.avatarUrl ??
                      project.members[0]?.avatarUrl ??
                      '',
                  },
                }}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-2xl border border-border-gray bg-white px-6 py-16 text-center shadow-sm">
          <p className="text-lg font-bold text-text-black">조건에 맞는 프로젝트가 아직 없어요.</p>
          <p className="mt-2 text-sm leading-5 text-text-gray">
            검색어 또는 필터를 조금 넓혀서 다시 찾아보세요.
          </p>
        </div>
      )}

      {visibleCount < filteredProjects.length ? (
        <div className="flex justify-center pt-6">
          <BaseButton
            size="L"
            variant="gray"
            className="rounded-full px-8 text-sm font-medium text-project-status-closed shadow-sm"
            onClick={() => setVisibleCount((prev) => prev + 4)}
          >
            프로젝트 더 보기
          </BaseButton>
        </div>
      ) : null}
    </section>
  );
}
