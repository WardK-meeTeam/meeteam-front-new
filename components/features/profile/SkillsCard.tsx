'use client';

import { CodeXml, X } from 'lucide-react';
import ProfileCard from '@/components/features/profile/ProfileCard';
import TechStackPicker from '@/components/shared/TechStackPicker';

interface SkillGroupData {
  category: string;
  role: string;
  skills: string[];
}

interface SkillsCardProps {
  editable?: boolean;
  skillGroups: SkillGroupData[];
  availableSkills?: string[];
  onSkillsChange?: (groupIndex: number, skills: string[]) => void;
}

export default function SkillsCard({
  editable = false,
  skillGroups,
  availableSkills = [],
  onSkillsChange,
}: SkillsCardProps) {
  return (
    <ProfileCard className={editable ? 'min-h-[297px]' : 'min-h-56'}>
      <h2 className="text-lg leading-7 font-bold text-text-black">보유 기술</h2>

      <div className="mt-4 space-y-5">
        {skillGroups.map((group, groupIndex) => (
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
                  key={`${group.category}-${skill}`}
                  className="inline-flex items-center gap-1 rounded-lg bg-surface-soft px-3 py-1.5 text-sm leading-5 font-medium text-label-dark"
                >
                  {skill}
                  {editable ? (
                    <button
                      type="button"
                      onClick={() =>
                        onSkillsChange?.(
                          groupIndex,
                          group.skills.filter((currentSkill) => currentSkill !== skill),
                        )
                      }
                      className="text-muted-gray transition-colors hover:text-danger-400"
                      aria-label={`${skill} 삭제`}
                    >
                      <X className="h-3.5 w-3.5" aria-hidden strokeWidth={2} />
                    </button>
                  ) : null}
                </span>
              ))}
            </div>

            {editable ? (
              <TechStackPicker
                inputId={`profile-skills-${groupIndex}`}
                options={availableSkills}
                value={group.skills}
                onChange={(nextSkills) => onSkillsChange?.(groupIndex, nextSkills)}
                placeholder="기술 스택 검색"
                showSelectedChips={false}
              />
            ) : null}
          </div>
        ))}
      </div>
    </ProfileCard>
  );
}
