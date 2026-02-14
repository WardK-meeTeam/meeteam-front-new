import Image from 'next/image';
import CalendarIcon from '@/assets/icons/Calendar.svg';
import SettingsIcon from '@/assets/icons/Settings.svg';
import Link from 'next/link';

interface ProjectHeroProps {
  projectId: string;
  title: string;
  description: string;
  category: string;
  type: string;
  deadline: string;
  isOwner?: boolean;
}

export default function ProjectHero({
  projectId,
  title,
  description,
  category,
  type,
  deadline,
  isOwner = false,
}: ProjectHeroProps) {
  return (
    <div className="relative h-96 overflow-hidden rounded-[32px] bg-slate-900">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-linear-to-br from-slate-900 to-slate-800 opacity-95" />
      <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-indigo-600 opacity-20 blur-[32px]" />
      <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-violet-600 opacity-20 blur-[32px]" />

      {/* Content */}
      <div className="relative flex h-full flex-col justify-center px-12">
        {/* Category tags */}
        <div className="mb-4 flex gap-2">
          <span className="rounded-full border border-white/10 bg-white/10 px-3.5 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
            {category}
          </span>
          <span className="rounded-full border border-indigo-400/30 bg-indigo-600/30 px-3.5 py-1.5 text-xs font-bold text-indigo-100 backdrop-blur-sm">
            {type}
          </span>
        </div>

        {/* Title */}
        <h1 className="mb-3 text-5xl font-extrabold leading-tight text-white">{title}</h1>

        {/* Description */}
        <p className="mb-8 max-w-2xl text-lg font-medium text-slate-300">{description}</p>

        {/* Deadline */}
        <div className="inline-flex items-center gap-2.5 self-start rounded-full border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-sm">
          <Image src={CalendarIcon} alt="" width={20} height={20} className="shrink-0" />
          <span className="text-sm font-bold text-white">{deadline}</span>
        </div>
      </div>

      {/* Manage button (only for owner) */}
      {isOwner && (
        <Link
          href={`/projects/${projectId}/manage`}
          className="absolute right-10 top-8 flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-3 backdrop-blur-md transition-colors hover:bg-white/20"
        >
          <Image src={SettingsIcon} alt="" width={16} height={16} className="shrink-0" />
          <span className="text-sm font-bold text-white">프로젝트 관리</span>
        </Link>
      )}
    </div>
  );
}
