import { Info } from 'lucide-react';

export default function IntroductionCard() {
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
