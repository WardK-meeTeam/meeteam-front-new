'use client';

import { useState } from 'react';
import { CodeXml, Plus } from 'lucide-react';
import ProfileCard from '@/components/features/profile/ProfileCard';
import { skillGroups as defaultSkillGroups } from '@/components/features/profile/profileData';

interface SkillGroupData {
  category: string;
  role: string;
  skills: string[];
}

interface SkillsCardProps {
  editable?: boolean;
  skillGroups?: SkillGroupData[];
  onSkillAdd?: (groupIndex: number, skill: string) => void;
}

export default function SkillsCard({
  editable = false,
  skillGroups = defaultSkillGroups,
  onSkillAdd,
}: SkillsCardProps) {
  const [drafts, setDrafts] = useState(() => skillGroups.map(() => ''));

  const updateDraft = (groupIndex: number, value: string) => {
    setDrafts((current) => current.map((draft, index) => (index === groupIndex ? value : draft)));
  };

  const addSkill = (groupIndex: number) => {
    const nextSkill = drafts[groupIndex]?.trim();

    if (!nextSkill) {
      return;
    }

    onSkillAdd?.(groupIndex, nextSkill);
    updateDraft(groupIndex, '');
  };

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
                  className="rounded-lg bg-surface-soft px-3 py-1.5 text-sm leading-5 font-medium text-label-dark"
                >
                  {skill}
                </span>
              ))}
            </div>

            {editable ? (
              <div className="flex items-center gap-2 rounded-lg border border-divider-soft bg-white px-3 py-2.5">
                <input
                  value={drafts[groupIndex] ?? ''}
                  onChange={(event) => updateDraft(groupIndex, event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      addSkill(groupIndex);
                    }
                  }}
                  placeholder="기술 추가"
                  className="w-full border-0 bg-transparent p-0 text-sm leading-5 text-text-body outline-none placeholder:text-muted-gray"
                />

                <button
                  type="button"
                  onClick={() => addSkill(groupIndex)}
                  className="text-muted-gray transition-colors hover:text-brand-500"
                  aria-label={`${group.role} 기술 추가`}
                >
                  <Plus className="h-4 w-4" aria-hidden strokeWidth={2} />
                </button>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </ProfileCard>
  );
}
