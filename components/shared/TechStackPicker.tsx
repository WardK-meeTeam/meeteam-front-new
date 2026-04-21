'use client';

import { Search } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

import BaseInput from '@/components/shared/BaseInput';
import SkillChip from '@/components/shared/SkillChip';

type TechStackPickerProps = {
  options: string[];
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  inputId?: string;
  inputDataCy?: string;
  emptyMessage?: string;
  noOptionsMessage?: string;
  showSelectedChips?: boolean;
  className?: string;
};

const MAX_VISIBLE_OPTIONS = 8;

export default function TechStackPicker({
  options,
  value,
  onChange,
  placeholder = '기술 스택 검색',
  disabled = false,
  inputId,
  inputDataCy,
  emptyMessage = '검색 결과가 없습니다.',
  noOptionsMessage = '선택 가능한 기술 스택이 없습니다.',
  showSelectedChips = true,
  className = '',
}: TechStackPickerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
    };
  }, []);

  const filteredOptions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return options
      .filter((option) => !value.includes(option))
      .filter((option) =>
        normalizedQuery.length === 0 ? true : option.toLowerCase().includes(normalizedQuery),
      )
      .slice(0, MAX_VISIBLE_OPTIONS);
  }, [options, query, value]);

  const handleSelect = (techStack: string) => {
    if (value.includes(techStack)) {
      return;
    }

    onChange([...value, techStack]);
    setQuery('');
    setIsOpen(false);
  };

  const handleRemove = (techStack: string) => {
    onChange(value.filter((item) => item !== techStack));
  };

  const showDropdown = isOpen && !disabled;
  const hasOptions = options.length > 0;

  return (
    <div ref={containerRef} className={`space-y-3 ${className}`}>
      <div className="relative">
        <BaseInput
          id={inputId}
          type="search"
          value={query}
          data-cy={inputDataCy}
          disabled={disabled}
          placeholder={placeholder}
          onFocus={() => setIsOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              setIsOpen(false);
              return;
            }

            if (event.key === 'Enter' && filteredOptions[0]) {
              event.preventDefault();
              handleSelect(filteredOptions[0]);
            }
          }}
          rightIcon={<Search className="h-5 w-5 text-muted-gray" aria-hidden strokeWidth={1.8} />}
        />

        {showDropdown ? (
          <div className="absolute top-full z-10 mt-2 w-full rounded-2xl border border-border-gray bg-white p-2 shadow-sm">
            {filteredOptions.length > 0 ? (
              <ul className="flex flex-col gap-1">
                {filteredOptions.map((option) => (
                  <li key={option}>
                    <button
                      type="button"
                      onClick={() => handleSelect(option)}
                      className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm leading-5 text-text-body transition-colors hover:bg-surface-soft hover:text-text-black"
                    >
                      <span>{option}</span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="px-3 py-2 text-sm leading-5 text-text-gray">
                {hasOptions ? emptyMessage : noOptionsMessage}
              </p>
            )}
          </div>
        ) : null}
      </div>

      {showSelectedChips && value.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {value.map((techStack) => (
            <SkillChip
              key={techStack}
              label={techStack}
              variant="outline"
              size="md"
              onRemove={() => handleRemove(techStack)}
              className="shadow-sm transition-colors hover:border-brand-400 hover:text-brand-500"
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
