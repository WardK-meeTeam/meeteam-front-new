import InterestRow from '@/components/features/auth/InterestRow';
import { Interest } from '@/types/auth';

type InterestSectionProps = {
  interests: Interest[];
  onAdd: () => void;
  onChange: (index: number, next: Interest) => void;
  onRemove: (index: number) => void;
};

export default function InterestSection({
  interests,
  onAdd,
  onChange,
  onRemove,
}: InterestSectionProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex justify-between items-center">
        <label className="text-lg font-bold leading-7 text-text-black">관심 분야</label>
        <button
          type="button"
          onClick={onAdd}
          className="cursor-pointer text-brand-500 text-[12px] font-bold! leading-4"
        >
          + 분야 추가
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {interests.map((it, i) => (
          <InterestRow
            key={`${i}-${it.major}-${it.minor}`}
            value={it}
            onChange={(next) => onChange(i, next)}
            onRemove={() => onRemove(i)}
            length={interests.length}
          />
        ))}
      </div>
    </div>
  );
}
