import { Info } from 'lucide-react';

export default function IntroductionCard() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl leading-7 font-bold text-text-black">자기소개</h2>

      <div className="rounded-2xl border border-border-gray bg-surface-soft px-6 py-6">
        <div className="flex items-start gap-4">
          <span className="mt-0.5 text-muted-gray">
            <Info className="h-6 w-6" aria-hidden strokeWidth={1.8} />
          </span>

          <div className="space-y-1">
            <p className="text-base leading-6 font-bold text-text-body">
              아직 작성된 소개글이 없어요!
            </p>
            <p className="text-sm leading-5 font-normal text-text-gray">
              본인을 소개하는 글을 작성하여 팀원들에게 신뢰를 주세요.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
