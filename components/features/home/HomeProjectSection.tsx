'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ProjectCard } from '@/components/features/project/ProjectCard';
import { ProjectCardSkeleton } from '@/components/features/project/ProjectCardSkeleton';
import { PROJECT_CATEGORIES } from '@/components/features/project/constants';
import {
  fetchHomeProjects,
  type HomeProjectCard,
  type HomeProjectCategory,
} from '@/components/features/home/homeApi';
import ToastMessage from '@/components/shared/ToastMessage';

const CATEGORY_CHIPS: HomeProjectCategory[] = [
  '전체',
  ...PROJECT_CATEGORIES.map((category) => category.label as HomeProjectCategory),
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
    <section className="space-y-6">
      <ToastMessage message={errorMessage} />

      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="font-brand-display text-2xl text-mt-text-primary">프로젝트</h2>
          <Link href="/projects" className="text-sm leading-5 font-semibold text-mt-primary">
            전체보기 &gt;
          </Link>
        </div>

        <div className="overflow-x-auto pb-1" role="tablist" aria-label="프로젝트 카테고리">
          <div className="flex min-w-max gap-2">
            {CATEGORY_CHIPS.map((category) => {
              const selected = selectedCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  aria-pressed={selected}
                  role="tab"
                  className={`inline-flex shrink-0 items-center justify-center rounded-full px-3.5 py-1.5 text-sm leading-5 transition-all ${
                    selected
                      ? 'bg-mt-primary font-medium text-mt-white shadow-sm'
                      : 'font-normal text-mt-text-secondary hover:bg-mt-badge-bg hover:text-mt-text-primary'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
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
        <div className="rounded-2xl border border-mt-border bg-mt-white px-6 py-16 text-center shadow-sm">
          <p className="text-lg font-bold text-mt-text-primary">아직 프로젝트가 없어요.</p>
          <p className="mt-2 text-sm leading-5 text-mt-text-secondary">
            다른 카테고리를 선택해 프로젝트를 찾아보세요.
          </p>
        </div>
      )}
    </section>
  );
}
