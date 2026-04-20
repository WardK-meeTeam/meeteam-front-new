import type { RefObject } from 'react';
import { ChevronDown } from 'lucide-react';
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
      <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p
          data-cy="teammate-total-count"
          className="text-base leading-6 font-semibold text-text-body"
        >
          총 <span className="text-brand-500">{totalCount}</span>명의 메이커
        </p>

        <div className="relative w-full sm:w-auto">
          <select
            value={sort}
            onChange={(event) => onSortChange(event.target.value as TeammateSort)}
            data-cy="teammate-sort-select"
            className="h-10 w-full appearance-none rounded-lg border border-transparent bg-white py-2 pl-3 pr-9 text-sm leading-5 font-bold text-project-status-closed outline-none transition-colors focus:border-border-gray"
          >
            {TEAMMATE_SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-gray"
            aria-hidden
            strokeWidth={1.8}
          />
        </div>
      </div>

      {errorMessage ? (
        <div className="rounded-2xl border border-border-gray bg-danger-soft px-6 py-12 text-center text-sm leading-6 text-danger-500 shadow-sm">
          {errorMessage}
        </div>
      ) : null}

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
          className="rounded-2xl border border-border-gray bg-white px-6 py-12 text-center text-sm leading-6 text-text-gray shadow-sm"
        >
          <p className="font-bold text-text-black">{TEAMMATE_PAGE_COPY.emptyTitle}</p>
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
