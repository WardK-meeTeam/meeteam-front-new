import BaseField from '@/components/shared/BaseField';
import type { Interest, JobFieldOption } from '@/types/auth';
import { useEffect, useMemo, useState } from 'react';
import BaseDropdown from '@/components/shared/BaseDropdown';
import TechStackList from '@/components/features/auth/TechStackList';
import TechStackPicker from '@/components/shared/TechStackPicker';
import { findJobFieldByName } from './jobOptionUtils';

type TechStackSectionProps = {
  label?: string;
  jobFields: JobFieldOption[];
  interests: Interest[];
  value: Record<string, string[]>;
  onChange: (next: Record<string, string[]>) => void;
  errorText?: string;
  disabled?: boolean;
};

export default function TechStackSection({
  label = '기술 스택',
  jobFields,
  interests,
  value,
  onChange,
  errorText,
  disabled = false,
}: TechStackSectionProps) {
  const [open, setOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState('');

  const interestItems = useMemo(
    () => interests.filter((it) => it.major && it.minor).map((it) => `${it.major} - ${it.minor}`),
    [interests],
  );

  const currentLabel = selectedLabel || interestItems[0] || '관심 분야를 선택해 주세요';

  useEffect(() => {
    if (!selectedLabel && interestItems[0]) {
      setSelectedLabel(interestItems[0]);
      return;
    }

    if (selectedLabel && !interestItems.includes(selectedLabel)) {
      setSelectedLabel(interestItems[0] ?? '');
    }
  }, [interestItems, selectedLabel]);

  const selectedField = useMemo(() => {
    const major = currentLabel.split(' - ')[0]?.trim() ?? '';
    return findJobFieldByName(jobFields, major) ?? null;
  }, [currentLabel, jobFields]);

  const handleSelectInterest = (item: string) => {
    setSelectedLabel(item);
    setOpen(false);
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

  const sections = useMemo(
    () =>
      interestItems
        .map((label) => ({
          key: label,
          label,
          items: value[label] ?? [],
        }))
        .filter((section) => section.items.length > 0),
    [interestItems, value],
  );

  return (
    <BaseField label={label} htmlFor="tech" required={false} errorText={errorText}>
      <div className="flex gap-2">
        <BaseDropdown
          value={currentLabel}
          placeholder="관심 분야를 선택해 주세요"
          open={open}
          items={interestItems}
          onToggle={() => !disabled && setOpen((prev) => !prev)}
          onSelect={handleSelectInterest}
          disabled={interestItems.length === 0 || disabled}
          containerClassName="w-full"
          buttonClassName="flex-1 justify-between p-3.5"
          textClassName="font-medium text-sm whitespace-nowrap"
        />

        <TechStackPicker
          inputId="tech"
          inputDataCy="project-form-tech-input"
          options={selectedField?.techStacks.map((tech) => tech.name) ?? []}
          value={interestItems.includes(currentLabel) ? (value[currentLabel] ?? []) : []}
          onChange={(nextSelectedTechStacks) => {
            if (!interestItems.includes(currentLabel)) {
              return;
            }

            if (nextSelectedTechStacks.length === 0) {
              const { [currentLabel]: _, ...rest } = value;
              onChange(rest);
              return;
            }

            onChange({ ...value, [currentLabel]: nextSelectedTechStacks });
          }}
          disabled={!selectedField || disabled}
          showSelectedChips={false}
          className="w-full"
        />
      </div>

      <TechStackList sections={sections} onRemove={handleRemoveTech} />
    </BaseField>
  );
}
