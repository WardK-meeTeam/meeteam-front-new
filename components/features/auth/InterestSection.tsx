import { ChevronDown, ChevronUp } from 'lucide-react';
import { OPTIONS } from '@/constants/interest';
import { useState, useMemo } from 'react';
import Dropdown from '@/components/shared/Dropdown';

type OpenDropdown = 'major' | 'minor' | null;

type InterestSectionProps = {
  major: string;
  minor: string;
  onChangeMajor: (value: string) => void;
  onChangeMinor: (value: string) => void;
};

export default function InterestSection({
  major,
  minor,
  onChangeMajor,
  onChangeMinor,
}: InterestSectionProps) {
  const [openDropdown, setOpenDropdown] = useState<OpenDropdown>(null);

  const majors = OPTIONS.map((item) => item.major);
  const minors = useMemo(() => {
    const selected = OPTIONS.find((item) => item.major === major);
    return selected?.minor ?? [];
  }, [major]);

  const toggleDropdown = (key: Exclude<OpenDropdown, null>) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  const handleSelectMajor = (opt: string) => {
    onChangeMajor(opt);
    onChangeMinor('');
    setOpenDropdown(null);
  };

  const handleSelectMinor = (opt: string) => {
    onChangeMinor(opt);
    setOpenDropdown(null);
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex justify-between items-center">
        <label className="text-lg font-bold leading-7 text-text-black" htmlFor="interest">
          관심 분야
        </label>
        <span className="cursor-pointer text-brand-500 text-[12px] font-bold leading-4">
          + 분야 추가
        </span>
      </div>

      <div className="flex gap-2">
        <div className="relative max-w-30 flex-1">
          <button
            type="button"
            aria-labelledby="interest"
            onClick={() => toggleDropdown('major')}
            className="flex flex-1 justify-evenly rounded-xl border border-border-gray text-[#334155] pt-3.5 pb-3.5 w-full"
          >
            <span className="font-medium text-sm whitespace-nowrap">{major || '직군'}</span>
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
            disabled={!major}
            onClick={() => major && toggleDropdown('minor')}
            className="flex justify-between rounded-xl border border-border-gray text-[#334155]  pt-3.5 pb-3.5 pl-4 pr-4 w-full
            disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-muted-gray"
          >
            <span className="font-medium text-sm">{minor || '상세 분야'}</span>
            {openDropdown === 'minor' ? (
              <ChevronUp width={16} height={16} color="#94a3b8" />
            ) : (
              <ChevronDown width={16} height={16} color="#94a3b8" />
            )}
          </button>
          {openDropdown === 'minor' && <Dropdown items={minors} onSelect={handleSelectMinor} />}
        </div>
      </div>
    </div>
  );
}
