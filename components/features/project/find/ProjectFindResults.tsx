'use client';

import type { RefObject } from 'react';
import type { ProjectRecord } from '@/types/project';
import { ProjectCard } from '@/components/features/project/ProjectCard';
import { ProjectCardSkeleton } from '@/components/features/project/ProjectCardSkeleton';
import { toProjectCardData } from './projectFinder';
import type { SortFilter } from './types';

function SortSelect({
  sort,
  onSortChange,
}: {
  sort: SortFilter;
  onSortChange: (value: SortFilter) => void;
}) {
  return (
    <div className="relative sm:w-32">
      <select
        value={sort}
        onChange={(event) =>
          onSortChange(event.target.value === 'deadline' ? 'deadline' : 'latest')
        }
        data-cy="project-sort-select"
        className="h-12 w-full appearance-none rounded-xl border border-border-gray bg-white py-3 pl-4 pr-10 text-sm leading-5 font-medium text-text-body shadow-sm outline-none transition-colors focus:border-brand-400"
      >
        <option value="latest">최신순</option>
        <option value="deadline">마감임박순</option>
      </select>
      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-text-gray">
        정렬
      </span>
    </div>
  );
}

type ProjectFindResultsProps = {
  projects: ProjectRecord[];
  totalCount: number;
  sort: SortFilter;
  isLoadingMore: boolean;
  hasMore: boolean;
  hasActiveFilters: boolean;
  loadMoreRef: RefObject<HTMLDivElement | null>;
  onSortChange: (value: SortFilter) => void;
  onResetFilters: () => void;
};

export function ProjectFindResults({
  projects,
  totalCount,
  sort,
  isLoadingMore,
  hasMore,
  hasActiveFilters,
  loadMoreRef,
  onSortChange,
  onResetFilters,
}: ProjectFindResultsProps) {
  return (
    <>
      <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p
          data-cy="project-total-count"
          className="text-base leading-6 font-semibold text-text-body"
        >
          총 <span className="text-brand-500">{totalCount}</span>개의 프로젝트
        </p>

        <SortSelect sort={sort} onSortChange={onSortChange} />
      </div>

      {projects.length > 0 ? (
        <ul data-cy="project-list" className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {projects.map((project) => (
            <li key={project.id}>
              <ProjectCard project={toProjectCardData(project)} />
            </li>
          ))}
        </ul>
      ) : (
        <div
          data-cy="project-empty-state"
          className="rounded-2xl border border-border-gray bg-white px-6 py-16 text-center shadow-sm"
        >
          <p className="text-lg font-bold text-text-black">조건에 맞는 프로젝트가 아직 없어요.</p>
          <p className="mt-2 text-sm leading-5 text-text-gray">
            검색어 또는 필터를 조금 넓혀서 다시 찾아보세요.
          </p>
          {hasActiveFilters ? (
            <button
              type="button"
              onClick={onResetFilters}
              data-cy="project-reset-filters"
              className="mt-6 inline-flex h-11 items-center justify-center rounded-xl border border-border-gray px-5 text-sm font-semibold text-text-black transition-colors hover:bg-surface-soft"
            >
              필터 초기화
            </button>
          ) : null}
        </div>
      )}

      {isLoadingMore ? (
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <li key={`project-skeleton-${index}`}>
              <ProjectCardSkeleton />
            </li>
          ))}
        </ul>
      ) : null}

      {hasMore ? (
        <div
          ref={loadMoreRef}
          data-cy="project-load-more-trigger"
          className="h-6 w-full"
          aria-hidden
        />
      ) : null}
    </>
  );
}
