import SkeletonBlock from '@/components/shared/SkeletonBlock';

export default function ProjectDetailSkeleton() {
  return (
    <section className="mx-auto w-full max-w-7xl space-y-8 pb-20">
      <div className="grid items-stretch gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(20rem,0.7fr)]">
        <SkeletonBlock className="aspect-[1200/630] w-full rounded-4xl" />

        <article className="rounded-4xl border border-mt-border bg-mt-white p-6 shadow-sm md:p-8">
          <div className="flex gap-2">
            <SkeletonBlock className="h-7 w-20 rounded-full" />
            <SkeletonBlock className="h-7 w-16 rounded-full" />
          </div>
          <SkeletonBlock className="mt-6 h-10 w-full max-w-sm" />
          <SkeletonBlock className="mt-3 h-5 w-full" />
          <SkeletonBlock className="mt-2 h-5 w-4/5" />
          <SkeletonBlock className="mt-8 h-10 w-40 rounded-full" />
          <div className="mt-6 border-t border-mt-border pt-5">
            <SkeletonBlock className="h-4 w-20" />
            <div className="mt-3 flex items-center gap-3">
              <SkeletonBlock className="h-12 w-12 rounded-2xl" />
              <div className="flex-1 space-y-2">
                <SkeletonBlock className="h-5 w-24" />
                <SkeletonBlock className="h-4 w-32" />
              </div>
            </div>
          </div>
        </article>
      </div>

      <div className="mx-auto w-full max-w-4xl pb-14">
        <div className="space-y-6">
          <article className="rounded-3xl border border-mt-border bg-mt-white p-6 shadow-sm">
            <SkeletonBlock className="h-6 w-32" />
            <div className="mt-5 space-y-3">
              <SkeletonBlock className="h-4 w-full" />
              <SkeletonBlock className="h-4 w-full" />
              <SkeletonBlock className="h-4 w-4/5" />
            </div>
          </article>

          <article className="rounded-3xl border border-mt-border bg-mt-white p-6 shadow-sm">
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
      </div>
    </section>
  );
}
