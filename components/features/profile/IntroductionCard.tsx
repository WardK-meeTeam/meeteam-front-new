import { Info } from 'lucide-react';
import MarkdownContent from '@/components/shared/MarkdownContent';
import MarkdownEditor from '@/components/shared/MarkdownEditor';

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

        <MarkdownEditor
          rows={8}
          value={value}
          onChange={(nextValue) => onChange?.(nextValue)}
          dataCy="profile-introduction-input"
          placeholder={`## 이런 사람입니다

- 요즘 관심 있는 것
- 함께 일할 때 좋아하는 방식
- 해본 프로젝트나 맡았던 역할`}
          previewEmptyText="아직 자기소개가 비어 있어요. 편하게 한 줄부터 시작해도 좋아요."
        />
      </section>
    );
  }

  if (value.trim()) {
    return (
      <section className="space-y-4">
        <h2 className="text-xl leading-7 font-bold text-text-black">자기소개</h2>

        <div className="rounded-2xl border border-border-gray bg-white px-6 py-6">
          <MarkdownContent value={value} />
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
