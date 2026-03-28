import { PanelTop } from 'lucide-react';
import IntroSectionHeading from './IntroSectionHeading';

export default function ProjectDetailDescriptionSection() {
  return (
    <article className="flex w-full flex-col items-start gap-4" data-node-id="97:511">
      <IntroSectionHeading
        icon={<PanelTop className="h-5 w-5" aria-hidden strokeWidth={1.8} />}
        title="프로젝트 상세"
        containerNodeId="97:512"
        iconNodeId="97:513"
        titleNodeId="97:517"
        titleClassName="whitespace-nowrap"
      />

      <div className="w-full rounded-2xl bg-surface-soft p-6" data-node-id="97:518">
        <p className="max-w-2xl text-base leading-7 text-project-status-closed" data-node-id="97:519">
          AI 모델을 활용하여 매일 쏟아지는 뉴스를 핵심만 요약해주는 서비스를 만들고 있습니다.
        </p>
      </div>
    </article>
  );
}
