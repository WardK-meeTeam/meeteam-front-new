import SkeletonBlock from '@/components/shared/SkeletonBlock';

export default function ProjectDetailSkeleton() {
  return (
    <section className="mx-auto w-full max-w-6xl pb-20">
      <div>
        <div className="flex gap-2">
          <SkeletonBlock className="h-7 w-20 rounded-full" />
          <SkeletonBlock className="h-7 w-16 rounded-full" />
          <SkeletonBlock className="h-7 w-20 rounded-full" />
        </div>
        <SkeletonBlock className="mt-5 h-11 w-full max-w-md" />
        <SkeletonBlock className="mt-3 h-6 w-full max-w-xl" />
        <div className="mt-6 rounded-3xl border border-mt-border bg-mt-white p-3 shadow-sm">
          <SkeletonBlock className="aspect-[1200/630] w-full rounded-2xl" />
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
        <div className="space-y-6 pb-14">
          <SkeletonBlock className="h-14 w-full rounded-2xl" />
          <article className="rounded-3xl border border-mt-border bg-mt-white p-6 shadow-sm">
            <SkeletonBlock className="h-6 w-32" />
            <div className="mt-5 space-y-3">
              <SkeletonBlock className="h-4 w-full" />
              <SkeletonBlock className="h-4 w-full" />
              <SkeletonBlock className="h-4 w-4/5" />
            </div>
          </article>
        </div>

        <article className="flex w-full flex-col rounded-3xl border border-mt-border bg-mt-white p-6 shadow-sm">
          <SkeletonBlock className="h-8 w-40" />
          <div className="mt-4 space-y-2">
            <SkeletonBlock className="h-5 w-28" />
            <SkeletonBlock className="h-5 w-36" />
          </div>
          <SkeletonBlock className="mt-6 h-14 w-full rounded-xl" />
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
          <SkeletonBlock className="mt-auto h-11 w-full rounded-xl" />
        </article>
      </div>
    </section>
  );
}
