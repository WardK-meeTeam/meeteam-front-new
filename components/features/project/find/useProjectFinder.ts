'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useInfiniteScroll } from '@/components/shared/useInfiniteScroll';
import { fetchProjectSearchResults, type ProjectSearchCard } from './projectFindApi';
import { LOAD_DELAY_MS, LOAD_MORE_COUNT } from './projectFinder';
import type {
  CategoryFilter,
  FieldFilter,
  PlatformFilter,
  RecruitFilter,
  SortFilter,
} from './types';

export function useProjectFinder() {
  const [searchValue, setSearchValue] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('모든 카테고리');
  const [recruitOnly, setRecruitOnly] = useState<RecruitFilter>('all');
  const [platform, setPlatform] = useState<PlatformFilter>('전체');
  const [field, setField] = useState<FieldFilter>('전체');
  const [sort, setSort] = useState<SortFilter>('latest');
  const [projects, setProjects] = useState<ProjectSearchCard[]>([]);
  const [page, setPage] = useState(0);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const loadMoreTimeoutRef = useRef<number | null>(null);

  const filters = { searchValue, category, recruitOnly, platform, field, sort };

  useEffect(() => {
    setIsLoadingMore(false);

    if (loadMoreTimeoutRef.current) {
      window.clearTimeout(loadMoreTimeoutRef.current);
      loadMoreTimeoutRef.current = null;
    }
  }, [category, field, platform, recruitOnly, searchValue, sort]);

  useEffect(() => {
    let active = true;

    const loadInitialProjects = async () => {
      try {
        setIsInitialLoading(true);
        setErrorMessage(null);

        const result = await fetchProjectSearchResults(filters, 0, LOAD_MORE_COUNT * 2);

        if (!active) {
          return;
        }

        setProjects(result.projects);
        setHasMore(result.hasMore);
        setPage(0);
      } catch (error) {
        if (!active) {
          return;
        }

        setProjects([]);
        setHasMore(false);
        setErrorMessage(
          error instanceof Error ? error.message : '프로젝트 목록을 불러오지 못했습니다.',
        );
      } finally {
        if (active) {
          setIsInitialLoading(false);
        }
      }
    };

    void loadInitialProjects();

    return () => {
      active = false;
    };
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
        void (async () => {
          try {
            const nextPage = page + 1;
            const result = await fetchProjectSearchResults(filters, nextPage, LOAD_MORE_COUNT);

            setProjects((current) => [...current, ...result.projects]);
            setHasMore(result.hasMore);
            setPage(nextPage);
          } catch (error) {
            setErrorMessage(
              error instanceof Error ? error.message : '프로젝트 목록을 더 불러오지 못했습니다.',
            );
          } finally {
            setIsLoadingMore(false);
            loadMoreTimeoutRef.current = null;
          }
        })();
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
    projects,
    hasMore,
    isInitialLoading,
    isLoadingMore,
    errorMessage,
    countLabel: hasMore ? `${projects.length}+` : String(projects.length),
    hasActiveFilters:
      filters.searchValue.length > 0 ||
      filters.category !== '모든 카테고리' ||
      filters.recruitOnly !== 'all' ||
      filters.platform !== '전체' ||
      filters.field !== '전체' ||
      filters.sort !== 'latest',
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
