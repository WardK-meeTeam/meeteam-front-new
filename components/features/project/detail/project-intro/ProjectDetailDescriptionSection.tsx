import { FileText } from 'lucide-react';
import IntroSectionHeading from './IntroSectionHeading';

export default function ProjectDetailDescriptionSection() {
  return (
    <section className="flex w-full flex-col gap-4">
      <IntroSectionHeading
        title="프로젝트 상세"
        icon={<FileText className="h-5 w-5" aria-hidden strokeWidth={1.8} />}
      />
      <div className="rounded-2xl bg-surface-soft px-6 py-6">
        <p className="break-keep text-base leading-[26px] text-project-status-closed">
          AI 모델을 활용하여 매일 쏟아지는 뉴스를 핵심만 요약해주는 서비스를 만들고 있습니다.
        </p>
      </div>
    </section>
  );
}
