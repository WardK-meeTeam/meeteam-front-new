import { Calendar, Settings } from 'lucide-react';

interface ProjectHeroProps {
  title: string;
  description: string;
  category: string;
  type: string;
  deadline: string;
  isOwner?: boolean;
}

export default function ProjectHero({
  title,
  description,
  category,
  type,
  deadline,
  isOwner = false,
}: ProjectHeroProps) {
  return (
    <div className="relative h-96 overflow-hidden rounded-[32px] bg-text-black">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-linear-to-br from-text-black to-text-black/90 opacity-95" />
      <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-brand-500 opacity-20 blur-[32px]" />
      <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-violet-600 opacity-20 blur-[32px]" />

      {/* Content */}
      <div className="relative flex h-full flex-col justify-center px-12">
        {/* Category tags */}
        <div className="mb-4 flex gap-2">
          <span className="rounded-full border border-white/10 bg-white/10 px-3.5 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
            {category}
          </span>
          <span className="rounded-full border border-brand-400/30 bg-brand-500/30 px-3.5 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
            {type}
          </span>
        </div>

        {/* Title */}
        <h1 className="mb-3 text-5xl font-extrabold leading-tight text-white">{title}</h1>

        {/* Description */}
        <p className="mb-8 max-w-2xl text-lg font-medium text-muted-gray">{description}</p>

        {/* Deadline */}
        <div className="inline-flex items-center gap-2.5 self-start rounded-full border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-sm">
          <Calendar className="h-5 w-5 shrink-0 text-white" />
          <span className="text-sm font-bold text-white">{deadline}</span>
        </div>
      </div>

      {/* Manage button (only for owner) */}
      {isOwner && (
        <button className="absolute right-10 top-8 flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-3 backdrop-blur-md transition-colors hover:bg-white/20">
          <Settings className="h-4 w-4 shrink-0 text-white" />
          <span className="text-sm font-bold text-white">프로젝트 관리</span>
        </button>
      )}
    </div>
  );
}
