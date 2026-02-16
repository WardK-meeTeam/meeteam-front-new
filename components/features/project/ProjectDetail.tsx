import { FileText } from 'lucide-react';

export interface ProjectDetailProps {
  /** 프로젝트 상세 설명 (마크다운 또는 일반 텍스트) */
  content: string;
}

export default function ProjectDetail({ content }: ProjectDetailProps) {
  return (
    <section>
      <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-text-black">
        <FileText className="h-5 w-5 shrink-0 text-muted-gray" />
        프로젝트 상세
      </h3>
      <div className="rounded-xl bg-slate-50 p-6">
        <p className="whitespace-pre-wrap text-sm font-normal leading-relaxed text-text-gray">
          {content}
        </p>
      </div>
    </section>
  );
}
