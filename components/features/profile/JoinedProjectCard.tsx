import Link from 'next/link';
import { Users } from 'lucide-react';
import { joinedProject } from '@/components/features/profile/profileData';

export default function JoinedProjectCard() {
  const memberRatio = `${joinedProject.currentMembers}/${joinedProject.maxMembers}명`;
  const progressWidth = `${(joinedProject.currentMembers / joinedProject.maxMembers) * 100}%`;

  return (
    <section className="space-y-4">
      <div className="flex items-baseline gap-2">
        <h2 className="text-xl leading-7 font-bold text-text-black">참여 프로젝트</h2>
        <span className="text-lg leading-7 font-medium text-muted-gray">1</span>
      </div>

      <Link
        href={`/projects/${joinedProject.id}`}
        className="group relative block w-full max-w-78.25 overflow-hidden rounded-3xl bg-text-black shadow-2xl"
      >
        <div className="absolute inset-0">
          <img
            alt={joinedProject.title}
            className="h-full w-full object-cover opacity-70 transition-transform duration-500 group-hover:scale-105"
            src={joinedProject.imageUrl}
          />
          <div className="absolute inset-0 bg-linear-to-t from-text-black via-text-black/50 to-transparent" />
        </div>

        <div className="relative flex min-h-70 flex-col justify-between p-6">
          <div>
            <span className="inline-flex rounded-full border border-white/10 bg-white/20 px-3 py-1 text-xs leading-4 font-bold text-white backdrop-blur-sm">
              {joinedProject.category}
            </span>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl leading-7 font-bold text-white">{joinedProject.title}</h3>

            <div className="flex items-end justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="h-8 w-8 overflow-hidden rounded-full border border-white/30">
                  <img
                    alt={joinedProject.leader}
                    className="h-full w-full object-cover"
                    src={joinedProject.leaderImageUrl}
                  />
                </span>
                <span className="text-xs leading-4 font-medium text-white/90">
                  {joinedProject.leader}
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-end gap-1 text-[10px] leading-4 font-bold text-white/90">
                  <Users className="h-3 w-3" aria-hidden strokeWidth={1.8} />
                  <span>{memberRatio}</span>
                </div>

                <div className="h-1.5 w-20 overflow-hidden rounded-full bg-white/20">
                  <div
                    className="h-full rounded-full bg-brand-400"
                    style={{ width: progressWidth }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
