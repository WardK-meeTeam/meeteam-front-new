import ProfileAvatar from '@/components/shared/ProfileAvatar';

export interface ProjectLeaderCardProps {
  leader: {
    name: string;
    role: string;
    profile_img?: string | null;
    skills: string[];
  };
}

export default function ProjectLeaderCard({ leader }: ProjectLeaderCardProps) {
  const { name, role, profile_img, skills } = leader;

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="mb-5 text-lg font-semibold text-slate-900">프로젝트 리더</h3>

      <div className="mb-5 flex items-center gap-4">
        <ProfileAvatar name={name} profile_img={profile_img} size="md" />
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-slate-900">{name}</span>
          <span className="text-sm font-normal text-slate-500">{role}</span>
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-bold leading-4 text-slate-500">리더의 주력 스킬</p>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-normal text-slate-700"
              key={skill}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
