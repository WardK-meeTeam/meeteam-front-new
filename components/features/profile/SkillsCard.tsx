'use client';

import { CodeXml } from 'lucide-react';
import ProfileCard from '@/components/features/profile/ProfileCard';
import SkillChip from '@/components/shared/SkillChip';
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
      <h2 className="text-lg leading-7 font-bold text-mt-text-primary">보유 기술</h2>

      <div className="mt-4 space-y-5">
        {skillGroups.map((group, groupIndex) => (
          <div key={`${group.category}-${group.role}`} className="space-y-3">
            <div className="flex items-center gap-1.5 text-sm leading-5 text-mt-text-secondary">
              <CodeXml className="h-3 w-3" aria-hidden strokeWidth={2} />
              <p>
                {group.category} - {group.role}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <SkillChip
                  key={`${group.category}-${skill}`}
                  label={skill}
                  size="md"
                  onRemove={
                    editable
                      ? () =>
                          onSkillsChange?.(
                            groupIndex,
                            group.skills.filter((currentSkill) => currentSkill !== skill),
                          )
                      : undefined
                  }
                />
              ))}
            </div>

            {editable ? (
              <TechStackPicker
                inputId={`profile-skills-${groupIndex}`}
                inputDataCy={`profile-skills-input-${groupIndex}`}
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
