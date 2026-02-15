import { useMemo, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { OPTIONS } from '@/constants/interest';
import { Interest } from '@/types/auth';
import BaseDropdown from '@/components/shared/BaseDropdown';

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
      <BaseDropdown
        value={value.major}
        placeholder="직군"
        open={openDropdown === 'major'}
        items={majors}
        onToggle={() => toggleDropdown('major')}
        onSelect={handleSelectMajor}
        containerClassName="max-w-30 flex-1"
        buttonClassName="flex-1 justify-evenly pt-3.5 pb-3.5"
        textClassName="font-medium text-sm whitespace-nowrap"
      />

      <BaseDropdown
        value={value.minor}
        placeholder="상세 분야"
        open={openDropdown === 'minor'}
        items={minors}
        onToggle={() => value.major && toggleDropdown('minor')}
        onSelect={handleSelectMinor}
        disabled={!value.major}
        containerClassName="max-w-78 flex-1"
        buttonClassName="justify-between pt-3.5 pb-3.5 pl-4 pr-4"
        textClassName="font-normal text-sm"
      />

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
