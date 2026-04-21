'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useInfiniteScroll } from '@/components/shared/useInfiniteScroll';
import { fetchJobOptions } from '@/components/features/auth/signupApi';
import { collectTechStackNames } from '@/components/features/auth/jobOptionUtils';
import type { TeammateRole, TeammateSort } from '@/types/team';
import type { Teammate } from '@/types/team';
import { fetchAllTeammates } from './teamApi';
import { TEAMMATE_LIST_CONFIG, TEAMMATE_ROLE_OPTIONS } from './constants';

export function useTeammateFinder() {
  const [teammates, setTeammates] = useState<Teammate[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedRole, setSelectedRole] = useState<(typeof TEAMMATE_ROLE_OPTIONS)[number]>('전체');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [availableSkills, setAvailableSkills] = useState<string[]>([]);
  const [sort, setSort] = useState<TeammateSort>('experience-desc');
  const [visibleCount, setVisibleCount] = useState<number>(
    TEAMMATE_LIST_CONFIG.initialVisibleCount,
  );
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const loadMoreTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    let active = true;

    const loadTeammates = async () => {
      try {
        setIsInitialLoading(true);
        setErrorMessage(null);

        const nextTeammates = await fetchAllTeammates();

        if (!active) {
          return;
        }

        setTeammates(nextTeammates);
      } catch (error) {
        if (!active) {
          return;
        }

        setTeammates([]);
        setErrorMessage(
          error instanceof Error ? error.message : '팀원 목록을 불러오지 못했습니다.',
        );
      } finally {
        if (active) {
          setIsInitialLoading(false);
        }
      }
    };

    void loadTeammates();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;

    const loadSkillOptions = async () => {
      try {
        const nextJobFields = await fetchJobOptions();

        if (!active) {
          return;
        }

        setAvailableSkills(collectTechStackNames(nextJobFields));
      } catch {
        if (active) {
          setAvailableSkills([]);
        }
      }
    };

    void loadSkillOptions();

    return () => {
      active = false;
    };
  }, []);

  const filteredTeammates = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();

    return teammates
      .filter((teammate) => {
        const matchesName =
          normalizedSearch.length === 0 || teammate.name.toLowerCase().includes(normalizedSearch);
        const matchesRole =
          selectedRole === '전체' || teammate.role === (selectedRole as TeammateRole);
        const matchesSkill =
          selectedSkills.length === 0 ||
          selectedSkills.every((skill) => teammate.skills.includes(skill));

        return matchesName && matchesRole && matchesSkill;
      })
      .sort((left, right) => {
        if (sort === 'name-asc') {
          return left.name.localeCompare(right.name, 'ko');
        }

        return right.experienceCount - left.experienceCount;
      });
  }, [searchValue, selectedRole, selectedSkills, sort, teammates]);

  const visibleTeammates = filteredTeammates.slice(0, visibleCount);
  const hasMore = visibleTeammates.length < filteredTeammates.length;

  useEffect(() => {
    setVisibleCount(TEAMMATE_LIST_CONFIG.initialVisibleCount);
    setIsLoadingMore(false);

    if (loadMoreTimeoutRef.current) {
      window.clearTimeout(loadMoreTimeoutRef.current);
      loadMoreTimeoutRef.current = null;
    }
  }, [searchValue, selectedRole, selectedSkills, sort]);

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
    selectedSkills,
    availableSkills,
    sort,
    visibleTeammates,
    filteredTeammatesCount: filteredTeammates.length,
    isInitialLoading,
    isLoadingMore,
    errorMessage,
    hasMore,
    loadMoreRef,
    setSearchValue,
    setSelectedRole,
    setSelectedSkills,
    setSort,
  };
}
