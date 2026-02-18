'use client';

import { Check } from 'lucide-react';
import DateSelector from './DateSelector';

interface RecruitDeadlineFieldProps {
  deadline: string;
  onDeadlineChange: (nextValue: string) => void;
  untilComplete: boolean;
  onUntilCompleteChange: (nextValue: boolean) => void;
  minDate?: string;
  maxDate?: string;
}

export default function RecruitDeadlineField({
  deadline,
  onDeadlineChange,
  untilComplete,
  onUntilCompleteChange,
  minDate,
  maxDate,
}: RecruitDeadlineFieldProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full items-center justify-between">
        <p className="text-sm font-bold leading-5 text-text-black">모집 마감일</p>
        <label
          className={`inline-flex cursor-pointer select-none items-center gap-2 text-xs font-bold leading-4 ${
            untilComplete ? 'text-brand-500' : 'text-text-gray'
          }`}
        >
          <input
            type="checkbox"
            checked={untilComplete}
            onChange={(event) => onUntilCompleteChange(event.target.checked)}
            className="peer sr-only"
          />
          <span
            className={`flex size-4 items-center justify-center rounded-sm border p-px transition peer-focus-visible:ring-2 peer-focus-visible:ring-brand-400/30 ${
              untilComplete ? 'border-brand-500 bg-brand-500' : 'border-border-gray bg-white'
            }`}
          >
            <Check
              className={`size-3.5 text-white transition-opacity ${
                untilComplete ? 'opacity-100' : 'opacity-0'
              }`}
              strokeWidth={3}
              aria-hidden="true"
            />
          </span>
          모집 완료 시까지
        </label>
      </div>

      <DateSelector
        value={deadline}
        onChange={onDeadlineChange}
        minDate={minDate}
        maxDate={maxDate}
        disabled={untilComplete}
      />
    </div>
  );
}
