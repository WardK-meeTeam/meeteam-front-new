'use client';

import { Heart, Share2 } from 'lucide-react';
import { useState } from 'react';

interface ProjectActionButtonsProps {
  initialLikeCount: number;
}

export default function ProjectActionButtons({ initialLikeCount }: ProjectActionButtonsProps) {
  const [liked, setLiked] = useState(false);

  const likeCount = liked ? initialLikeCount + 1 : initialLikeCount;

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        aria-pressed={liked}
        onClick={() => setLiked((prev) => !prev)}
        className={`inline-flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl border border-border-gray px-4 text-base leading-6 font-bold shadow-sm transition-colors
          ${
            liked
              ? 'bg-danger-soft text-danger-500'
              : 'bg-white text-project-status-closed hover:bg-danger-soft'
          }`}
      >
        <Heart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} aria-hidden strokeWidth={1.8} />
        {likeCount}
      </button>

      <button
        className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-border-gray bg-white text-project-status-closed shadow-sm transition-colors hover:bg-brand-50"
        type="button"
      >
        <Share2 className="h-5 w-5" aria-hidden strokeWidth={1.8} />
      </button>
    </div>
  );
}
