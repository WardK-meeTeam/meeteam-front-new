import type { RefObject } from 'react';
import SortSelect from '@/components/shared/SortSelect';
import ToastMessage from '@/components/shared/ToastMessage';
import type { TeammateSort } from '@/types/team';
import type { Teammate } from '@/types/team';
import { TEAMMATE_LIST_CONFIG, TEAMMATE_PAGE_COPY, TEAMMATE_SORT_OPTIONS } from './constants';
import { TeammateCard } from './TeammateCard';
import { TeammateCardSkeleton } from './TeammateCardSkeleton';

type TeammateListSectionProps = {
  teammates: Teammate[];
  totalCount: number;
  sort: TeammateSort;
  isInitialLoading: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  errorMessage: string | null;
  loadMoreRef: RefObject<HTMLDivElement | null>;
  onSortChange: (value: TeammateSort) => void;
};

export function TeammateListSection({
  teammates,
  totalCount,
  sort,
  isInitialLoading,
  isLoadingMore,
  hasMore,
  errorMessage,
  loadMoreRef,
  onSortChange,
}: TeammateListSectionProps) {
  const shouldShowErrorOnly = !isInitialLoading && Boolean(errorMessage) && teammates.length === 0;

  return (
    <>
      <ToastMessage message={errorMessage} />

      <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p
          data-cy="teammate-total-count"
          className="text-base leading-6 font-semibold text-mt-text-nav"
        >
          총 <span className="text-mt-primary">{totalCount}</span>명의 팀원
        </p>

        <SortSelect
          value={sort}
          options={TEAMMATE_SORT_OPTIONS}
          onChange={onSortChange}
          dataCy="teammate-sort-select"
        />
      </div>

      {isInitialLoading ? (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {Array.from({ length: TEAMMATE_LIST_CONFIG.initialVisibleCount }).map((_, index) => (
            <li key={`teammate-initial-skeleton-${index}`}>
              <TeammateCardSkeleton />
            </li>
          ))}
        </ul>
      ) : !shouldShowErrorOnly ? (
        <ul
          data-cy="teammate-list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {teammates.map((teammate) => (
            <li key={teammate.id}>
              <TeammateCard teammate={teammate} />
            </li>
          ))}
        </ul>
      ) : null}

      {!isInitialLoading && !errorMessage && teammates.length === 0 ? (
        <div
          data-cy="teammate-empty-state"
          className="rounded-2xl border border-mt-border bg-mt-white px-6 py-12 text-center text-sm leading-6 text-mt-text-secondary shadow-sm"
        >
          <p className="font-bold text-mt-text-primary">{TEAMMATE_PAGE_COPY.emptyTitle}</p>
          <p className="mt-2">{TEAMMATE_PAGE_COPY.emptyDescription}</p>
        </div>
      ) : null}

      {isLoadingMore ? (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {Array.from({ length: TEAMMATE_LIST_CONFIG.loadMoreCount }).map((_, index) => (
            <li key={`teammate-skeleton-${index}`}>
              <TeammateCardSkeleton />
            </li>
          ))}
        </ul>
      ) : null}

      {hasMore ? (
        <div
          ref={loadMoreRef}
          data-cy="teammate-load-more-trigger"
          className="h-6 w-full"
          aria-hidden
        />
      ) : null}
    </>
  );
}
