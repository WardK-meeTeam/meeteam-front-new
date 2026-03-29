export function ProjectCardSkeleton() {
  return (
    <div className="relative h-[380px] w-full overflow-hidden rounded-3xl bg-text-black shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] animate-pulse">
      <div className="absolute inset-0 bg-linear-to-b from-white/10 to-transparent" />

      <div className="absolute inset-x-0 top-0 flex justify-between p-6">
        <div className="h-7 w-20 rounded-full bg-white/20" />
        <div className="h-5 w-24 rounded-md bg-brand-500/60" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6">
        <div className="h-8 w-3/4 rounded-md bg-white/20" />
        <div className="mt-2 h-8 w-2/3 rounded-md bg-white/15" />

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-white/20" />
            <div className="h-4 w-20 rounded-md bg-white/15" />
          </div>

          <div className="space-y-2">
            <div className="h-4 w-16 rounded-md bg-white/15" />
            <div className="h-1.5 w-20 rounded-full bg-white/20" />
          </div>
        </div>
      </div>
    </div>
  );
}
