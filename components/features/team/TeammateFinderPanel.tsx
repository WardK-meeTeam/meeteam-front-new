import { Search } from 'lucide-react';
import { TEAMMATE_ROLE_OPTIONS } from '@/mocks/team/teammates';
import { TEAMMATE_PAGE_COPY } from './constants';
import { TeammateFilterChip } from './TeammateFilterChip';

type TeammateFinderPanelProps = {
  searchValue: string;
  selectedRole: (typeof TEAMMATE_ROLE_OPTIONS)[number];
  skillKeyword: string;
  onSearchChange: (value: string) => void;
  onRoleChange: (value: (typeof TEAMMATE_ROLE_OPTIONS)[number]) => void;
  onSkillKeywordChange: (value: string) => void;
};

export function TeammateFinderPanel({
  searchValue,
  selectedRole,
  skillKeyword,
  onSearchChange,
  onRoleChange,
  onSkillKeywordChange,
}: TeammateFinderPanelProps) {
  return (
    <div className="space-y-6 pt-4">
      <label className="relative block">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-gray"
          aria-hidden
          strokeWidth={1.8}
        />
        <input
          type="search"
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={TEAMMATE_PAGE_COPY.searchPlaceholder}
          className="h-14 w-full rounded-xl border border-border-gray bg-white py-4 pl-12 pr-5 text-base leading-6 text-text-black shadow-sm outline-none placeholder:text-muted-gray focus:border-brand-400 focus:ring-2 focus:ring-brand-400/15"
        />
      </label>

      <div className="rounded-2xl border border-border-gray bg-white p-6 shadow-sm">
        <div className="space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
            <span className="w-16 shrink-0 text-sm leading-5 font-semibold text-text-black">
              분야
            </span>
            <div className="flex flex-wrap gap-x-2 gap-y-2">
              {TEAMMATE_ROLE_OPTIONS.map((role) => (
                <TeammateFilterChip
                  key={role}
                  label={role}
                  active={selectedRole === role}
                  onClick={() => onRoleChange(role)}
                />
              ))}
            </div>
          </div>

          <div className="h-px w-full bg-border-soft" />

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
            <span className="w-16 shrink-0 text-sm leading-5 font-semibold text-text-black">
              기술 스택
            </span>
            <div className="w-full max-w-md">
              <input
                type="text"
                value={skillKeyword}
                onChange={(event) => onSkillKeywordChange(event.target.value)}
                placeholder={TEAMMATE_PAGE_COPY.skillPlaceholder}
                className="h-10 w-full rounded-lg border border-border-gray bg-surface-soft px-4 text-sm leading-5 text-text-black outline-none placeholder:text-muted-gray focus:border-brand-400 focus:bg-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
