import { Info } from 'lucide-react';
import BaseTextarea from '@/components/shared/BaseTextarea';

interface IntroductionCardProps {
  editable?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

export default function IntroductionCard({
  editable = false,
  value = '',
  onChange,
}: IntroductionCardProps) {
  if (editable) {
    return (
      <section className="space-y-4">
        <h2 className="text-xl leading-7 font-bold text-text-black">자기소개</h2>

        <BaseTextarea
          textareaSize="L"
          rows={8}
          value={value}
          data-cy="profile-introduction-input"
          onChange={(event) => onChange?.(event.target.value)}
          placeholder="본인을 자유롭게 소개해주세요. (경험, 관심사, 작업 스타일 등)"
          className="min-h-60 rounded-2xl border-divider-soft px-6 py-6 text-base leading-7 placeholder:text-muted-gray resize-none"
        />
      </section>
    );
  }

  if (value.trim()) {
    return (
      <section className="space-y-4">
        <h2 className="text-xl leading-7 font-bold text-text-black">자기소개</h2>

        <div className="rounded-2xl border border-border-gray bg-white px-6 py-6">
          <p className="whitespace-pre-wrap text-base leading-7 text-text-body">{value}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <h2 className="text-xl leading-7 font-bold text-text-black">자기소개</h2>

      <div className="rounded-2xl border border-border-gray bg-surface-soft px-6 py-6">
        <div className="flex items-center gap-4">
          <span className="text-muted-gray">
            <Info className="h-6 w-6" aria-hidden strokeWidth={1.8} />
          </span>

          <p className="text-base leading-6 font-bold text-text-body">
            아직 작성된 소개글이 없습니다.
          </p>
        </div>
      </div>
    </section>
  );
}
