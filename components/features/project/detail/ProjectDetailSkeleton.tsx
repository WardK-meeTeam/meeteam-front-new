import { ProjectCardSkeleton } from '@/components/features/project/ProjectCardSkeleton';
import SkeletonBlock from '@/components/shared/SkeletonBlock';

export default function ProjectDetailSkeleton() {
  return (
    <section className="mx-auto w-full max-w-7xl space-y-8 pb-20">
      <SkeletonBlock className="h-8 w-40 rounded-full" />

      <div className="relative h-96 overflow-hidden rounded-4xl bg-text-black px-12 py-8">
        <div className="absolute inset-0 bg-linear-to-r from-text-black via-label-dark to-label-dark" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-brand-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-brand-500/20 blur-3xl" />

        <div className="relative z-10 flex h-full flex-col items-start justify-center">
          <div className="mb-4 flex gap-2">
            <SkeletonBlock className="h-6 w-20 rounded-full bg-white/20" />
            <SkeletonBlock className="h-6 w-16 rounded-full bg-white/20" />
          </div>
          <SkeletonBlock className="h-12 w-full max-w-3xl bg-white/20" />
          <SkeletonBlock className="mt-3 h-7 w-full max-w-2xl bg-white/15" />
          <SkeletonBlock className="mt-8 h-10 w-44 rounded-full bg-white/20" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 pb-14 xl:grid-cols-[minmax(0,1fr)_24rem]">
        <div className="space-y-6">
          <article className="rounded-3xl border border-border-gray bg-white p-6 shadow-sm">
            <SkeletonBlock className="h-6 w-32" />
            <div className="mt-5 space-y-3">
              <SkeletonBlock className="h-4 w-full" />
              <SkeletonBlock className="h-4 w-full" />
              <SkeletonBlock className="h-4 w-4/5" />
            </div>
          </article>

          <article className="rounded-3xl border border-border-gray bg-white p-6 shadow-sm">
            <SkeletonBlock className="h-6 w-36" />
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <SkeletonBlock
                  key={`project-detail-position-skeleton-${index}`}
                  className="h-24 w-full rounded-2xl"
                />
              ))}
            </div>
          </article>
        </div>

        <aside className="space-y-4">
          <article className="rounded-3xl border border-border-gray bg-white p-6 shadow-sm">
            <SkeletonBlock className="h-5 w-28" />
            <div className="mt-4 flex items-center gap-4">
              <SkeletonBlock className="h-16 w-16 rounded-2xl" />
              <div className="flex-1 space-y-2">
                <SkeletonBlock className="h-6 w-28" />
                <SkeletonBlock className="h-4 w-36" />
              </div>
            </div>
            <div className="mt-5 flex gap-2">
              <SkeletonBlock className="h-7 w-16 rounded-md" />
              <SkeletonBlock className="h-7 w-20 rounded-md" />
            </div>
          </article>

          <article className="rounded-3xl border border-border-gray bg-white p-6 shadow-sm">
            <SkeletonBlock className="h-5 w-40" />
            <div className="mt-4 space-y-4">
              <SkeletonBlock className="h-12 w-full rounded-xl" />
              <SkeletonBlock className="h-12 w-full rounded-xl" />
            </div>
          </article>
        </aside>
      </div>

      <div className="space-y-8 border-t border-border-gray pt-16">
        <SkeletonBlock className="h-8 w-64" />
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <li key={`project-detail-recommended-skeleton-${index}`}>
              <ProjectCardSkeleton />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
