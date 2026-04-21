'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ProjectCard } from '@/components/features/project/ProjectCard';
import { ProjectCardSkeleton } from '@/components/features/project/ProjectCardSkeleton';
import {
  fetchHomeProjects,
  type HomeProjectCard,
  type HomeProjectCategory,
} from '@/components/features/home/homeApi';
import ToastMessage from '@/components/shared/ToastMessage';

const CATEGORY_CHIPS: Array<{ emoji: string; label: HomeProjectCategory }> = [
  { emoji: '✨', label: '전체' },
  { emoji: '🤖', label: 'AI/테크' },
  { emoji: '🍀', label: '친환경' },
  { emoji: '💪', label: '헬스케어' },
  { emoji: '🐱', label: '반려동물' },
  { emoji: '📚', label: '교육/학습' },
  { emoji: '💄', label: '패션/뷰티' },
];

export default function HomeProjectSection() {
  const [selectedCategory, setSelectedCategory] = useState<HomeProjectCategory>('전체');
  const [projects, setProjects] = useState<HomeProjectCard[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    let active = true;

    const loadProjects = async () => {
      try {
        if (!hasLoadedRef.current) {
          setIsInitialLoading(true);
        } else {
          setIsRefreshing(true);
        }

        setErrorMessage(null);

        const nextProjects = await fetchHomeProjects(4, selectedCategory);

        if (!active) {
          return;
        }

        setProjects(nextProjects);
        hasLoadedRef.current = true;
      } catch (error) {
        if (!active) {
          return;
        }

        setErrorMessage(
          error instanceof Error ? error.message : '메인 프로젝트 목록을 불러오지 못했습니다.',
        );
      } finally {
        if (active) {
          setIsInitialLoading(false);
          setIsRefreshing(false);
        }
      }
    };

    void loadProjects();

    return () => {
      active = false;
    };
  }, [selectedCategory]);

  return (
    <>
      <section className="sticky top-0 z-10 -mx-4 border-y border-border-gray bg-white px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {CATEGORY_CHIPS.map((chip) => {
            const selected = selectedCategory === chip.label;

            return (
              <button
                key={chip.label}
                type="button"
                onClick={() => setSelectedCategory(chip.label)}
                aria-pressed={selected}
                className={`inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full border px-3.5 py-2 text-sm leading-5 transition-colors ${
                  selected
                    ? 'border-brand-500 bg-brand-500 font-semibold text-white'
                    : 'border-border-gray bg-white font-medium text-text-gray hover:text-text-black'
                }`}
              >
                <span>{chip.emoji}</span>
                {chip.label}
              </button>
            );
          })}
        </div>
      </section>

      <section className="space-y-6">
        <ToastMessage message={errorMessage} />

        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold text-text-black">프로젝트</h2>
          <Link href="/projects" className="text-sm font-semibold text-brand-500">
            전체보기 &gt;
          </Link>
        </div>

        {isInitialLoading ? (
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <li key={`home-project-skeleton-${index}`}>
                <ProjectCardSkeleton />
              </li>
            ))}
          </ul>
        ) : projects.length > 0 ? (
          <ul
            className={`grid grid-cols-1 gap-4 transition-opacity md:grid-cols-2 xl:grid-cols-4 ${
              isRefreshing ? 'opacity-60' : 'opacity-100'
            }`}
          >
            {projects.map((project) => (
              <li key={project.id}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-2xl border border-border-gray bg-white px-6 py-16 text-center shadow-sm">
            <p className="text-lg font-bold text-text-black">아직 프로젝트가 없어요.</p>
            <p className="mt-2 text-sm leading-5 text-text-gray">
              다른 카테고리를 선택해 프로젝트를 찾아보세요.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
