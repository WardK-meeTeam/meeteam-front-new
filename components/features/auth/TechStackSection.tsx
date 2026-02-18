import BaseField from '@/components/shared/BaseField';
import BaseInput from '@/components/shared/BaseInput';
import type { Interest } from '@/types/auth';
import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import BaseDropdown from '@/components/shared/BaseDropdown';

type TechStackSectionProps = {
  interests: Interest[];
};

export default function TechStackSection({ interests }: TechStackSectionProps) {
  const [open, setOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState('');

  const interestItems = useMemo(
    () => interests.filter((it) => it.major && it.minor).map((it) => `${it.major} - ${it.minor}`),
    [interests],
  );

  const currentLabel = selectedLabel || interestItems[0] || '관심 분야를 선택해 주세요';

  const handleSelectInterest = (item: string) => {
    setSelectedLabel(item);
    setOpen(false);
  };

  return (
    <BaseField label="기술 스택" htmlFor="tech" required={false}>
      <div className="flex gap-2">
        <BaseDropdown
          value={currentLabel}
          placeholder="관심 분야를 선택해 주세요"
          open={open}
          items={interestItems}
          onToggle={() => setOpen((prev) => !prev)}
          onSelect={handleSelectInterest}
          disabled={interestItems.length === 0}
          containerClassName="w-full"
          buttonClassName="flex-1 justify-between p-3.5"
          textClassName="font-medium text-sm whitespace-nowrap"
        />

        <BaseInput
          id="tech"
          type="search"
          placeholder="기술 스택 검색"
          rightIcon={<Search width={20} height={20} color="#94a3b8" />}
        />
      </div>
    </BaseField>
  );
}
