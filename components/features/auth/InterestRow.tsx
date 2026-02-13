import { useMemo, useState } from 'react';
import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { OPTIONS } from '@/constants/interest';
import Dropdown from '@/components/shared/Dropdown';

export type Interest = { major: string; minor: string };

type OpenDropdown = 'major' | 'minor' | null;

type InterestRowProps = {
  value: Interest;
  onChange: (next: Interest) => void;
  onRemove: () => void;
  length: number;
};

export default function InterestRow({ value, onChange, onRemove, length }: InterestRowProps) {
  const [openDropdown, setOpenDropdown] = useState<OpenDropdown>(null);

  const majors = OPTIONS.map((item) => item.major);
  const minors = useMemo(() => {
    const selected = OPTIONS.find((item) => item.major === value.major);
    return selected?.minor ?? [];
  }, [value.major]);

  const toggleDropdown = (key: Exclude<OpenDropdown, null>) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  const handleSelectMajor = (opt: string) => {
    onChange({ major: opt, minor: '' });
    setOpenDropdown(null);
  };

  const handleSelectMinor = (opt: string) => {
    onChange({ ...value, minor: opt });
    setOpenDropdown(null);
  };

  return (
    <div className="flex gap-2">
      <div className="relative max-w-30 flex-1">
        <button
          type="button"
          onClick={() => toggleDropdown('major')}
          className="flex flex-1 justify-evenly rounded-xl border border-border-gray text-[#334155] pt-3.5 pb-3.5 w-full"
        >
          <span className="font-medium text-sm whitespace-nowrap">{value.major || '직군'}</span>
          {openDropdown === 'major' ? (
            <ChevronUp width={16} height={16} color="#94a3b8" />
          ) : (
            <ChevronDown width={16} height={16} color="#94a3b8" />
          )}
        </button>
        {openDropdown === 'major' && <Dropdown items={majors} onSelect={handleSelectMajor} />}
      </div>

      <div className="relative max-w-78 flex-1">
        <button
          type="button"
          disabled={!value.major}
          onClick={() => value.major && toggleDropdown('minor')}
          className="flex justify-between rounded-xl border border-border-gray text-[#334155] pt-3.5 pb-3.5 pl-4 pr-4 w-full
          disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-muted-gray"
        >
          <span className="font-normal text-sm">{value.minor || '상세 분야'}</span>
          {openDropdown === 'minor' ? (
            <ChevronUp width={16} height={16} color="#94a3b8" />
          ) : (
            <ChevronDown width={16} height={16} color="#94a3b8" />
          )}
        </button>
        {openDropdown === 'minor' && <Dropdown items={minors} onSelect={handleSelectMinor} />}
      </div>

      {length > 1 && value.major && value.minor && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-1 flex items-center"
          aria-label="관심 분야 삭제"
        >
          <Trash2 width={17} height={20} color="#e12e2e" />
        </button>
      )}
    </div>
  );
}
