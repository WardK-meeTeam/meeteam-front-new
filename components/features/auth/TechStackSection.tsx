import BaseField from '@/components/shared/BaseField';
import BaseInput from '@/components/shared/BaseInput';
import type { Interest } from '@/types/auth';
import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import BaseDropdown from '@/components/shared/BaseDropdown';
import SelectMenu from '@/components/shared/SelectMenu';
import { TECHS_BY_MAJOR } from '@/constants/techStacks';
import TechStackList from '@/components/features/auth/TechStackList';

type TechStackSectionProps = {
  interests: Interest[];
  value: Record<string, string[]>;
  onChange: (next: Record<string, string[]>) => void;
};

type TechMajor = keyof typeof TECHS_BY_MAJOR;

const isTechMajor = (value: string): value is TechMajor => value in TECHS_BY_MAJOR;

export default function TechStackSection({ interests, value, onChange }: TechStackSectionProps) {
  const [open, setOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState('');
  const [techKeyword, setTechKeyword] = useState('');
  const [openTechMenu, setOpenTechMenu] = useState(false);

  const interestItems = useMemo(
    () => interests.filter((it) => it.major && it.minor).map((it) => `${it.major} - ${it.minor}`),
    [interests],
  );

  const currentLabel = selectedLabel || interestItems[0] || '관심 분야를 선택해 주세요';

  const selectedMajor = useMemo<TechMajor | null>(() => {
    const major = currentLabel.split(' - ')[0]?.trim() ?? '';
    return isTechMajor(major) ? major : null;
  }, [currentLabel]);

  const techItems = useMemo(() => {
    if (!selectedMajor) return [];

    const q = techKeyword.trim().toLowerCase();
    if (!q) return [];

    return TECHS_BY_MAJOR[selectedMajor]
      .filter((tech) => tech.kor.toLowerCase().includes(q) || tech.eng.toLowerCase().includes(q))
      .map((tech) => tech.eng);
  }, [selectedMajor, techKeyword]);

  const handleSelectInterest = (item: string) => {
    setSelectedLabel(item);
    setOpen(false);
    setTechKeyword('');
    setOpenTechMenu(false);
  };

  const handleSelectTech = (tech: string) => {
    if (!interestItems.includes(currentLabel)) return;

    const existing = value[currentLabel] ?? [];
    if (existing.includes(tech)) return;
    onChange({ ...value, [currentLabel]: [...existing, tech] });
    setTechKeyword('');
    setOpenTechMenu(false);
  };

  const handleRemoveTech = (label: string, tech: string) => {
    const existing = value[label] ?? [];
    const next = existing.filter((item) => item !== tech);
    if (next.length === 0) {
      const { [label]: _, ...rest } = value;
      onChange(rest);
      return;
    }
    onChange({ ...value, [label]: next });
  };

  const orderedSelectedLabels = useMemo(
    () => interestItems.filter((label) => (value[label] ?? []).length > 0),
    [interestItems, value],
  );

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

        <div className="relative w-full">
          <BaseInput
            id="tech"
            type="search"
            value={techKeyword}
            disabled={!selectedMajor}
            placeholder="기술 검색"
            onChange={(e) => {
              setTechKeyword(e.target.value);
              if (selectedMajor) setOpenTechMenu(true);
            }}
            rightIcon={<Search width={20} height={20} color="#94a3b8" />}
          />
          {openTechMenu && techItems.length > 0 && (
            <SelectMenu items={techItems} onSelect={handleSelectTech} />
          )}
        </div>
      </div>

      <TechStackList
        itemsByLabel={value}
        orderedLabels={orderedSelectedLabels}
        onRemove={handleRemoveTech}
      />
    </BaseField>
  );
}
