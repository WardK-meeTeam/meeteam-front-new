'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useProjectStore } from '@/components/features/project/store';
import { useInfiniteScroll } from '@/components/shared/useInfiniteScroll';
import {
  getFilteredProjects,
  getSortedProjects,
  hasActiveProjectFilters,
  INITIAL_VISIBLE_COUNT,
  LOAD_DELAY_MS,
  LOAD_MORE_COUNT,
} from './projectFinder';
import type {
  CategoryFilter,
  FieldFilter,
  PlatformFilter,
  RecruitFilter,
  SortFilter,
} from './types';

export function useProjectFinder() {
  const projectsById = useProjectStore((state) => state.projectsById);
  const [searchValue, setSearchValue] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('모든 카테고리');
  const [recruitOnly, setRecruitOnly] = useState<RecruitFilter>('all');
  const [platform, setPlatform] = useState<PlatformFilter>('전체');
  const [field, setField] = useState<FieldFilter>('전체');
  const [sort, setSort] = useState<SortFilter>('latest');
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadMoreTimeoutRef = useRef<number | null>(null);

  const projects = useMemo(() => getSortedProjects(projectsById), [projectsById]);
  const filters = { searchValue, category, recruitOnly, platform, field, sort };
  const filteredProjects = useMemo(
    () => getFilteredProjects(projects, filters),
    [category, field, platform, projects, recruitOnly, searchValue, sort],
  );
  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleProjects.length < filteredProjects.length;

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_COUNT);
    setIsLoadingMore(false);

    if (loadMoreTimeoutRef.current) {
      window.clearTimeout(loadMoreTimeoutRef.current);
      loadMoreTimeoutRef.current = null;
    }
  }, [category, field, platform, recruitOnly, searchValue, sort]);

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
        setVisibleCount((count) => Math.min(count + LOAD_MORE_COUNT, filteredProjects.length));
        setIsLoadingMore(false);
        loadMoreTimeoutRef.current = null;
      }, LOAD_DELAY_MS);
    },
  });

  const resetFilters = () => {
    setSearchValue('');
    setCategory('모든 카테고리');
    setRecruitOnly('all');
    setPlatform('전체');
    setField('전체');
    setSort('latest');
  };

  return {
    filters,
    filteredProjects,
    visibleProjects,
    hasMore,
    isLoadingMore,
    hasActiveFilters: hasActiveProjectFilters(filters),
    loadMoreRef,
    setSearchValue,
    setCategory,
    setRecruitOnly,
    setPlatform,
    setField,
    setSort,
    resetFilters,
  };
}
