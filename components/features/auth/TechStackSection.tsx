import BaseField from '@/components/shared/BaseField';
import type { Interest, JobFieldOption } from '@/types/auth';
import { useEffect, useMemo } from 'react';
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
  const interestItems = useMemo(
    () => interests.filter((it) => it.major && it.minor).map((it) => `${it.major} - ${it.minor}`),
    [interests],
  );

  useEffect(() => {
    const nextValue = Object.fromEntries(
      Object.entries(value).filter(([key]) => interestItems.includes(key)),
    );

    if (Object.keys(nextValue).length !== Object.keys(value).length) {
      onChange(nextValue);
      return;
    }

    const hasChangedValue = Object.entries(nextValue).some(([key, items]) => value[key] !== items);
    if (hasChangedValue) {
      onChange(nextValue);
    }
  }, [interestItems, onChange, value]);

  const sections = useMemo(
    () =>
      interestItems.map((item) => {
        const [major, minor] = item.split(' - ');
        const field = findJobFieldByName(jobFields, major?.trim() ?? '') ?? null;

        return {
          key: item,
          major,
          minor,
          field,
          options: field?.techStacks.map((tech) => tech.name) ?? [],
          selected: value[item] ?? [],
        };
      }),
    [interestItems, jobFields, value],
  );

  return (
    <BaseField label={label} htmlFor="tech" required={false} errorText={errorText}>
      {sections.length > 0 ? (
        <div className="flex flex-col gap-3">
          {sections.map((section, index) => (
            <div
              key={section.key}
              className="rounded-2xl border border-mt-border bg-mt-white p-4 shadow-sm"
            >
              <div className="mb-3 flex flex-col gap-1">
                <p className="text-sm leading-5 font-bold text-mt-text-primary">{section.key}</p>
                <p className="text-xs leading-4 text-mt-text-secondary">
                  {section.minor}에 필요한 기술 스택을 선택해 주세요.
                </p>
              </div>

              <TechStackPicker
                inputId={index === 0 ? 'tech' : `tech-${index}`}
                inputDataCy={`project-form-tech-input-${index}`}
                options={section.options}
                value={section.selected}
                onChange={(nextSelectedTechStacks) => {
                  if (nextSelectedTechStacks.length === 0) {
                    const { [section.key]: _, ...rest } = value;
                    onChange(rest);
                    return;
                  }

                  onChange({ ...value, [section.key]: nextSelectedTechStacks });
                }}
                disabled={!section.field || disabled}
                noOptionsMessage="이 분야에 연결된 기술 스택이 없습니다."
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-mt-border bg-mt-bg-soft px-4 py-5 text-sm leading-5 text-mt-text-secondary">
          모집 분야를 선택하면 분야별 기술 스택 입력란이 자동으로 생성됩니다.
        </div>
      )}
    </BaseField>
  );
}
