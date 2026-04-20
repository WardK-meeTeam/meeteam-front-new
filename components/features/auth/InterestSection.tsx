import InterestRow from '@/components/features/auth/InterestRow';
import { Interest } from '@/types/auth';
import type { JobFieldOption } from '@/types/auth';

type InterestSectionProps = {
  jobFields: JobFieldOption[];
  interests: Interest[];
  onAdd: () => void;
  onChange: (index: number, next: Interest) => void;
  onRemove: (index: number) => void;
  errorText?: string;
  disabled?: boolean;
};

export default function InterestSection({
  jobFields,
  interests,
  onAdd,
  onChange,
  onRemove,
  errorText,
  disabled = false,
}: InterestSectionProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex justify-between items-center">
        <label className="text-lg font-bold leading-7 text-text-black">관심 분야</label>
        <button
          type="button"
          onClick={onAdd}
          disabled={disabled}
          className="cursor-pointer text-brand-500 text-xs font-bold leading-4 disabled:cursor-not-allowed disabled:text-muted-gray"
        >
          + 분야 추가
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {interests.map((it, i) => (
          <InterestRow
            key={`${i}-${it.major}-${it.minor}`}
            jobFields={jobFields}
            value={it}
            onChange={(next) => onChange(i, next)}
            onRemove={() => onRemove(i)}
            length={interests.length}
            disabled={disabled}
          />
        ))}
      </div>

      {errorText ? <p className="text-sm text-error-red">{errorText}</p> : null}
    </div>
  );
}
