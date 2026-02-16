import { Globe, Github, ExternalLink, Link as LinkIcon } from 'lucide-react';
import CopyButton from '@/components/shared/CopyButton';

export interface ProjectExternalLinksProps {
  githubUrl?: string;
  chatUrl?: string;
}

export default function ProjectExternalLinks({ githubUrl, chatUrl }: ProjectExternalLinksProps) {
  return (
    <article className="rounded-[28px] border border-border-gray bg-white p-7 shadow-sm">
      {/* Header */}
      <div className="mb-5 flex items-center gap-2">
        <Globe className="h-4 w-4 text-brand-400" />
        <h3 className="text-sm font-bold leading-5 text-text-black">외부 채널 및 저장소</h3>
      </div>

      {/* Links Container */}
      <div className="mb-5 flex flex-col gap-4">
        {/* GitHub */}
        {githubUrl && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase leading-[16.5px] tracking-[0.55px] text-muted-gray">
                깃허브 주소
              </span>
              <CopyButton text={githubUrl} />
            </div>
            <a
              href={githubUrl.startsWith('http') ? githubUrl : `https://${githubUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-border-gray bg-white p-4 transition-colors hover:bg-slate-50"
            >
              <Github className="h-5 w-5 shrink-0 text-text-black" />
              <span className="min-w-0 flex-1 truncate text-xs leading-4 text-text-gray">
                {githubUrl}
              </span>
              <ExternalLink className="h-3 w-3 shrink-0 text-muted-gray" />
            </a>
          </div>
        )}

        {/* Chat Channel */}
        {chatUrl && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase leading-[16.5px] tracking-[0.55px] text-muted-gray">
                소통 채널 주소
              </span>
              <CopyButton text={chatUrl} />
            </div>
            <a
              href={chatUrl.startsWith('http') ? chatUrl : `https://${chatUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-border-gray bg-white p-4 transition-colors hover:bg-slate-50"
            >
              <LinkIcon className="h-4 w-4 shrink-0 text-brand-400" />
              <span className="min-w-0 flex-1 truncate text-xs leading-4 text-text-gray">
                {chatUrl}
              </span>
              <ExternalLink className="h-3 w-3 shrink-0 text-muted-gray" />
            </a>
          </div>
        )}
      </div>

      {/* Footer Warning */}
      <div className="text-center">
        <p className="text-[10px] leading-[16.25px] text-muted-gray">
          외부 링크 이동 시 보안에 유의하시기 바랍니다.
        </p>
      </div>
    </article>
  );
}
