import { CodeXml } from 'lucide-react';
import ProfileCard from '@/components/features/profile/ProfileCard';
import { skillGroups } from '@/components/features/profile/profileData';

export default function SkillsCard() {
  return (
    <ProfileCard className="min-h-56">
      <h2 className="text-lg leading-7 font-bold text-text-black">보유 기술</h2>

      <div className="mt-4 space-y-5">
        {skillGroups.map((group) => (
          <div key={`${group.category}-${group.role}`} className="space-y-3">
            <div className="flex items-center gap-1.5 text-sm leading-5 text-text-gray">
              <CodeXml className="h-3 w-3" aria-hidden strokeWidth={2} />
              <p>
                {group.category} - {group.role}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg bg-surface-soft px-3 py-1.5 text-sm leading-5 font-medium text-label-dark"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ProfileCard>
  );
}
