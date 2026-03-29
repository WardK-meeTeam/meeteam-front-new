'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { TEAMMATES, TEAMMATE_ROLE_OPTIONS } from '@/mocks/team/teammates';
import { useInfiniteScroll } from '@/components/shared/useInfiniteScroll';
import type { TeammateRole, TeammateSort } from '@/types/team';
import { TEAMMATE_LIST_CONFIG } from './constants';

export function useTeammateFinder() {
  const [searchValue, setSearchValue] = useState('');
  const [selectedRole, setSelectedRole] =
    useState<(typeof TEAMMATE_ROLE_OPTIONS)[number]>('전체');
  const [skillKeyword, setSkillKeyword] = useState('');
  const [sort, setSort] = useState<TeammateSort>('experience-desc');
  const [visibleCount, setVisibleCount] = useState<number>(
    TEAMMATE_LIST_CONFIG.initialVisibleCount,
  );
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadMoreTimeoutRef = useRef<number | null>(null);

  const filteredTeammates = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();
    const normalizedSkillKeyword = skillKeyword.trim().toLowerCase();

    return TEAMMATES.filter((teammate) => {
      const matchesName =
        normalizedSearch.length === 0 || teammate.name.toLowerCase().includes(normalizedSearch);
      const matchesRole =
        selectedRole === '전체' || teammate.role === (selectedRole as TeammateRole);
      const matchesSkill =
        normalizedSkillKeyword.length === 0 ||
        teammate.skills.some((skill) => skill.toLowerCase().includes(normalizedSkillKeyword));

      return matchesName && matchesRole && matchesSkill;
    }).sort((left, right) => {
      if (sort === 'name-asc') {
        return left.name.localeCompare(right.name, 'ko');
      }

      return right.experienceCount - left.experienceCount;
    });
  }, [searchValue, selectedRole, skillKeyword, sort]);

  const visibleTeammates = filteredTeammates.slice(0, visibleCount);
  const hasMore = visibleTeammates.length < filteredTeammates.length;

  useEffect(() => {
    setVisibleCount(TEAMMATE_LIST_CONFIG.initialVisibleCount);
    setIsLoadingMore(false);

    if (loadMoreTimeoutRef.current) {
      window.clearTimeout(loadMoreTimeoutRef.current);
      loadMoreTimeoutRef.current = null;
    }
  }, [searchValue, selectedRole, skillKeyword, sort]);

  useEffect(
    () => () => {
      if (loadMoreTimeoutRef.current) {
        window.clearTimeout(loadMoreTimeoutRef.current);
      }
    },
    [],
  );

  const loadMoreRef = useInfiniteScroll({
    hasMore,
    isLoading: isLoadingMore,
    onLoadMore: () => {
      if (!hasMore || isLoadingMore) {
        return;
      }

      setIsLoadingMore(true);
      loadMoreTimeoutRef.current = window.setTimeout(() => {
        setVisibleCount((count) =>
          Math.min(count + TEAMMATE_LIST_CONFIG.loadMoreCount, filteredTeammates.length),
        );
        setIsLoadingMore(false);
        loadMoreTimeoutRef.current = null;
      }, TEAMMATE_LIST_CONFIG.loadDelayMs);
    },
  });

  return {
    searchValue,
    selectedRole,
    skillKeyword,
    sort,
    visibleTeammates,
    filteredTeammatesCount: filteredTeammates.length,
    isLoadingMore,
    hasMore,
    loadMoreRef,
    setSearchValue,
    setSelectedRole,
    setSkillKeyword,
    setSort,
  };
}
