import type { RefObject } from 'react';
import ToastMessage from '@/components/shared/ToastMessage';
import type { Teammate } from '@/types/team';
import { TEAMMATE_LIST_CONFIG, TEAMMATE_PAGE_COPY } from './constants';
import { TeammateCard } from './TeammateCard';
import { TeammateCardSkeleton } from './TeammateCardSkeleton';

type TeammateListSectionProps = {
  teammates: Teammate[];
  totalCount: number;
  isInitialLoading: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  errorMessage: string | null;
  loadMoreRef: RefObject<HTMLDivElement | null>;
  onRetry: () => void;
};

export function TeammateListSection({
  teammates,
  totalCount,
  isInitialLoading,
  isLoadingMore,
  hasMore,
  errorMessage,
  loadMoreRef,
  onRetry,
}: TeammateListSectionProps) {
  const shouldShowErrorOnly = !isInitialLoading && Boolean(errorMessage) && teammates.length === 0;

  return (
    <>
      <ToastMessage message={shouldShowErrorOnly ? null : errorMessage} />

      {!shouldShowErrorOnly ? (
        <div className="pt-4">
          <p
            data-cy="teammate-total-count"
            className="text-base leading-6 font-semibold text-mt-text-nav"
          >
            총 <span className="text-mt-primary">{totalCount}</span>명의 팀원
          </p>
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
      ) : shouldShowErrorOnly ? (
        <div
          data-cy="teammate-error-state"
          className="rounded-2xl border border-mt-border bg-mt-white px-6 py-16 text-center shadow-sm"
          role="alert"
        >
          <p className="text-lg font-bold text-mt-text-primary">{errorMessage}</p>
          <p className="mt-2 text-sm leading-5 text-mt-text-secondary">
            네트워크 상태를 확인한 뒤 다시 시도해 주세요.
          </p>
          <button
            type="button"
            onClick={onRetry}
            data-cy="teammate-retry-button"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-xl border border-mt-border px-5 text-sm font-semibold text-mt-text-primary transition-colors hover:bg-mt-bg-soft"
          >
            다시 불러오기
          </button>
        </div>
      ) : (
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
      )}

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
