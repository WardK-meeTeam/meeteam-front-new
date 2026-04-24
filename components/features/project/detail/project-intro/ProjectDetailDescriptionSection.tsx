import { FileText } from 'lucide-react';
import MarkdownContent from '@/components/shared/MarkdownContent';
import IntroSectionHeading from './IntroSectionHeading';

export default function ProjectDetailDescriptionSection({ description }: { description: string }) {
  return (
    <section className="flex w-full flex-col gap-4">
      <IntroSectionHeading
        title="프로젝트 상세"
        icon={<FileText className="h-5 w-5" aria-hidden strokeWidth={1.8} />}
      />
      <div className="rounded-2xl bg-surface-soft px-6 py-6">
        <MarkdownContent
          value={description}
          emptyText="아직 프로젝트 소개가 준비되지 않았어요."
          className="break-keep text-project-status-closed"
        />
      </div>
    </section>
  );
}
