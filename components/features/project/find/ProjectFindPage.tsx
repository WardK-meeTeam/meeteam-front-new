'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { ProjectFindFilters } from './ProjectFindFilters';
import { ProjectFindResults } from './ProjectFindResults';
import { useProjectFinder } from './useProjectFinder';

export default function ProjectFindPage() {
  const {
    filters,
    filteredProjects,
    visibleProjects,
    hasMore,
    isLoadingMore,
    hasActiveFilters,
    loadMoreRef,
    setSearchValue,
    setCategory,
    setRecruitOnly,
    setPlatform,
    setField,
    setSort,
    resetFilters,
  } = useProjectFinder();

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

      <ProjectFindFilters
        searchValue={filters.searchValue}
        category={filters.category}
        recruitOnly={filters.recruitOnly}
        platform={filters.platform}
        field={filters.field}
        onSearchValueChange={setSearchValue}
        onCategoryChange={setCategory}
        onRecruitOnlyChange={setRecruitOnly}
        onPlatformChange={setPlatform}
        onFieldChange={setField}
      />

      <ProjectFindResults
        projects={visibleProjects}
        totalCount={filteredProjects.length}
        sort={filters.sort}
        isLoadingMore={isLoadingMore}
        hasMore={hasMore}
        hasActiveFilters={hasActiveFilters}
        loadMoreRef={loadMoreRef}
        onSortChange={setSort}
        onResetFilters={resetFilters}
      />
    </section>
  );
}
