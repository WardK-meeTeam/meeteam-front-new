'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import AuthRequiredFallback from '@/components/features/auth/AuthRequiredFallback';
import { TEAMMATE_PAGE_COPY } from './constants';
import { TeammateFinderPanel } from './TeammateFinderPanel';
import { TeammateListSection } from './TeammateListSection';
import { useTeammateFinder } from './useTeammateFinder';

export default function TeammatesPage() {
  const {
    searchValue,
    selectedRole,
    selectedSkills,
    availableSkills,
    sort,
    visibleTeammates,
    filteredTeammatesCount,
    isInitialLoading,
    isLoadingMore,
    isAuthBlocked,
    errorMessage,
    hasMore,
    loadMoreRef,
    setSearchValue,
    setSelectedRole,
    setSelectedSkills,
    setSort,
  } = useTeammateFinder();

  if (isAuthBlocked) {
    return (
      <AuthRequiredFallback
        title="팀원 찾기는 로그인 후 이용할 수 있어요"
        description="로그인하고 함께할 팀원의 프로필과 기술 스택을 확인해 보세요."
      />
    );
  }

  return (
    <section className="space-y-6 pb-10 pt-2">
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
        <h1 className="text-3xl leading-9 font-bold text-text-black">{TEAMMATE_PAGE_COPY.title}</h1>
        <p className="max-w-4xl text-base leading-6 text-text-gray">{TEAMMATE_PAGE_COPY.description}</p>
      </div>

      <TeammateFinderPanel
        searchValue={searchValue}
        selectedRole={selectedRole}
        selectedSkills={selectedSkills}
        availableSkills={availableSkills}
        onSearchChange={setSearchValue}
        onRoleChange={setSelectedRole}
        onSelectedSkillsChange={setSelectedSkills}
      />

      <TeammateListSection
        teammates={visibleTeammates}
        totalCount={filteredTeammatesCount}
        sort={sort}
        isInitialLoading={isInitialLoading}
        isLoadingMore={isLoadingMore}
        hasMore={hasMore}
        errorMessage={errorMessage}
        loadMoreRef={loadMoreRef}
        onSortChange={setSort}
      />
    </section>
  );
}
