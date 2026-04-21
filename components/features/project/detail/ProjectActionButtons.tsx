'use client';

import { Heart, Share2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { isAuthRequiredError } from '@/components/features/auth/authError';
import { useAuthRequiredModal } from '@/components/features/auth/useAuthRequiredModal';
import {
  fetchProjectLikeStatus,
  toggleProjectLike,
} from '@/components/features/project/projectApi';

interface ProjectActionButtonsProps {
  projectId: string | number;
  initialLikeCount: number;
  initialLiked: boolean;
}

export default function ProjectActionButtons({
  projectId,
  initialLikeCount,
  initialLiked,
}: ProjectActionButtonsProps) {
  const openAuthRequiredModal = useAuthRequiredModal();
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isToggling, setIsToggling] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setLiked(initialLiked);
    setLikeCount(initialLikeCount);
    setErrorMessage(null);
  }, [initialLikeCount, initialLiked, projectId]);

  useEffect(() => {
    let active = true;

    const loadLikeStatus = async () => {
      try {
        const status = await fetchProjectLikeStatus(projectId);

        if (active) {
          setLiked(status.isLiked);
        }
      } catch (error) {
        if (!active || isAuthRequiredError(error)) {
          return;
        }

        setErrorMessage(
          error instanceof Error ? error.message : '좋아요 상태를 불러오지 못했습니다.',
        );
      }
    };

    void loadLikeStatus();

    return () => {
      active = false;
    };
  }, [projectId]);

  const handleLikeToggle = async () => {
    if (isToggling) {
      return;
    }

    try {
      setIsToggling(true);
      setErrorMessage(null);

      const result = await toggleProjectLike(projectId);

      setLiked(result.liked);
      setLikeCount(result.likeCount);
    } catch (error) {
      if (openAuthRequiredModal(error)) {
        return;
      }

      setErrorMessage(
        error instanceof Error ? error.message : '좋아요 처리 중 오류가 발생했습니다.',
      );
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label={liked ? '프로젝트 좋아요 취소' : '프로젝트 좋아요'}
          aria-pressed={liked}
          disabled={isToggling}
          onClick={handleLikeToggle}
          className={`inline-flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl border border-border-gray px-4 text-base leading-6 font-bold shadow-sm transition-colors disabled:cursor-not-allowed disabled:opacity-70
            ${
              liked
                ? 'bg-danger-soft text-danger-500'
                : 'bg-white text-project-status-closed hover:bg-danger-soft'
            }`}
        >
          <Heart
            className={`h-5 w-5 ${liked ? 'fill-current' : ''}`}
            aria-hidden
            strokeWidth={1.8}
          />
          {likeCount}
        </button>

        <button
          className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-border-gray bg-white text-project-status-closed shadow-sm transition-colors hover:bg-brand-50"
          type="button"
        >
          <Share2 className="h-5 w-5" aria-hidden strokeWidth={1.8} />
        </button>
      </div>

      {errorMessage ? (
        <p className="text-xs leading-4 font-medium text-danger-500">{errorMessage}</p>
      ) : null}
    </div>
  );
}
