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
        <h2 className="text-xl leading-7 font-bold text-mt-text-primary">자기소개</h2>

        <MarkdownEditor
          rows={8}
          value={value}
          onChange={(nextValue) => onChange?.(nextValue)}
          dataCy="profile-introduction-input"
          placeholder="자기소개를 입력해 주세요."
          previewEmptyText="아직 자기소개가 비어 있어요. 편하게 한 줄부터 시작해도 좋아요."
        />
      </section>
    );
  }

  if (value.trim()) {
    return (
      <section className="space-y-4">
        <h2 className="text-xl leading-7 font-bold text-mt-text-primary">자기소개</h2>

        <div className="rounded-2xl border border-mt-border bg-mt-white px-6 py-6">
          <MarkdownContent value={value} />
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-3">
      <h2 className="text-xl leading-7 font-bold text-mt-text-primary">자기소개</h2>
      <p className="border-t border-mt-border pt-4 text-base leading-7 text-mt-text-secondary">
        아직 작성된 자기소개가 없습니다.
      </p>
    </section>
  );
}
