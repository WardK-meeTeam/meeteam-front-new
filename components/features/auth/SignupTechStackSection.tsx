import BaseField from '@/components/shared/BaseField';
import BaseInput from '@/components/shared/BaseInput';
import type { Interest, JobFieldOption } from '@/types/auth';
import { Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import BaseDropdown from '@/components/shared/BaseDropdown';
import SelectMenu from '@/components/shared/SelectMenu';
import TechStackList from '@/components/features/auth/TechStackList';
import { getInterestKey } from './signupTransform';

type SignupTechStackSectionProps = {
  label?: string;
  jobFields: JobFieldOption[];
  interests: Interest[];
  value: Record<string, string[]>;
  onChange: (next: Record<string, string[]>) => void;
  errorText?: string;
  disabled?: boolean;
};

export default function SignupTechStackSection({
  label = '기술 스택',
  jobFields,
  interests,
  value,
  onChange,
  errorText,
  disabled = false,
}: SignupTechStackSectionProps) {
  const [open, setOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState('');
  const [techKeyword, setTechKeyword] = useState('');
  const [openTechMenu, setOpenTechMenu] = useState(false);

  const interestItems = useMemo(
    () =>
      interests
        .filter((it) => it.major && it.minor)
        .map((it, index) => {
          const field = jobFields.find((jobField) => jobField.code === it.major);
          const position = field?.positions.find((jobPosition) => jobPosition.code === it.minor);

          return {
            key: getInterestKey(it),
            label: `분야 ${index + 1} · ${field?.name ?? it.major} / ${position?.name ?? it.minor}`,
            fieldCode: it.major,
          };
        }),
    [interests, jobFields],
  );

  const currentItem =
    interestItems.find((item) => item.key === selectedKey) ?? interestItems[0] ?? null;
  const currentLabel = currentItem?.label ?? '관심 분야를 선택해 주세요';

  useEffect(() => {
    if (!currentItem && selectedKey) {
      setSelectedKey('');
    }

    if (!selectedKey && interestItems[0]) {
      setSelectedKey(interestItems[0].key);
    }
  }, [currentItem, interestItems, selectedKey]);

  const selectedJobField = useMemo(
    () => jobFields.find((item) => item.code === currentItem?.fieldCode) ?? null,
    [currentItem?.fieldCode, jobFields],
  );

  const techItems = useMemo(() => {
    const q = techKeyword.trim().toLowerCase();
    if (!q) return [];
    if (!selectedJobField) return [];

    return selectedJobField.techStacks
      .filter((tech) => tech.name.toLowerCase().includes(q))
      .map((tech) => tech.name);
  }, [selectedJobField, techKeyword]);

  const handleSelectInterest = (item: string) => {
    const selectedItem = interestItems.find((interestItem) => interestItem.label === item);
    if (!selectedItem) return;

    setSelectedKey(selectedItem.key);
    setOpen(false);
    setTechKeyword('');
    setOpenTechMenu(false);
  };

  const handleSelectTech = (tech: string) => {
    if (!currentItem) return;

    const existing = value[currentItem.key] ?? [];
    if (existing.includes(tech)) return;
    onChange({ ...value, [currentItem.key]: [...existing, tech] });
    setTechKeyword('');
    setOpenTechMenu(false);
  };

  const handleRemoveTech = (key: string, tech: string) => {
    const existing = value[key] ?? [];
    const next = existing.filter((item) => item !== tech);
    if (next.length === 0) {
      const { [key]: _, ...rest } = value;
      onChange(rest);
      return;
    }
    onChange({ ...value, [key]: next });
  };

  const selectedSections = useMemo(
    () =>
      interestItems
        .map((item) => ({
          key: item.key,
          label: item.label,
          items: value[item.key] ?? [],
        }))
        .filter((item) => item.items.length > 0),
    [interestItems, value],
  );

  return (
    <BaseField label={label} htmlFor="tech" required={false} errorText={errorText}>
      <div className="flex gap-2">
        <BaseDropdown
          value={currentLabel}
          placeholder="관심 분야를 선택해 주세요"
          open={open}
          items={interestItems.map((item) => item.label)}
          onToggle={() => !disabled && setOpen((prev) => !prev)}
          onSelect={handleSelectInterest}
          disabled={interestItems.length === 0 || disabled}
          containerClassName="w-full"
          buttonClassName="flex-1 justify-between p-3.5"
          textClassName="font-medium text-sm whitespace-nowrap"
        />

        <div className="relative w-full">
          <BaseInput
            id="tech"
            type="search"
            value={techKeyword}
            disabled={!selectedJobField || disabled}
            placeholder="기술 검색"
            onChange={(e) => {
              setTechKeyword(e.target.value);
              if (selectedJobField) setOpenTechMenu(true);
            }}
            rightIcon={<Search className="h-5 w-5 text-muted-gray" />}
          />
          {openTechMenu && techItems.length > 0 && (
            <SelectMenu items={techItems} onSelect={handleSelectTech} />
          )}
        </div>
      </div>

      <TechStackList sections={selectedSections} onRemove={handleRemoveTech} />
    </BaseField>
  );
}
