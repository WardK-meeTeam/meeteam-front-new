'use client';

import { Copy, ExternalLink, Github, Globe, Link2 } from 'lucide-react';
import type { ReactNode } from 'react';
import IntroSectionHeading from './IntroSectionHeading';

type ProjectExternalLinksSectionProps = {
  githubUrl: string;
  communicationUrl: string;
  onCopy: (url: string, label: string) => void;
};

type ExternalProjectLinkProps = {
  label: string;
  url: string;
  icon: ReactNode;
  onCopy: (url: string, label: string) => void;
};

function ExternalProjectLink({ label, url, icon, onCopy }: ExternalProjectLinkProps) {
  const hasUrl = Boolean(url);

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-mt-border bg-mt-white px-4 py-3">
      <div className="flex min-w-0 items-center gap-2">
        {icon}
        <div className="min-w-0">
          <p className="text-xs leading-4 font-bold text-mt-text-secondary">{label}</p>
          {hasUrl ? (
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="mt-0.5 block truncate text-sm leading-5 font-medium text-mt-primary hover:underline"
            >
              {url}
            </a>
          ) : (
            <p className="mt-0.5 text-sm leading-5 text-mt-text-secondary">
              등록된 링크가 없습니다.
            </p>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={() => onCopy(url, label)}
        disabled={!hasUrl}
        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-mt-text-secondary transition-colors hover:bg-mt-badge-bg hover:text-mt-primary disabled:cursor-not-allowed disabled:text-mt-shadow-blue disabled:hover:bg-transparent"
        aria-label={`${label} 복사`}
      >
        {hasUrl ? (
          <Copy className="h-4 w-4" aria-hidden strokeWidth={1.8} />
        ) : (
          <ExternalLink className="h-4 w-4" aria-hidden strokeWidth={1.8} />
        )}
      </button>
    </div>
  );
}

export default function ProjectExternalLinksSection({
  githubUrl,
  communicationUrl,
  onCopy,
}: ProjectExternalLinksSectionProps) {
  return (
    <section className="flex w-full flex-col gap-4">
      <IntroSectionHeading
        title="외부 채널 및 저장소"
        icon={<Globe className="h-5 w-5" aria-hidden strokeWidth={1.8} />}
      />

      <div className="grid gap-3 md:grid-cols-2">
        <ExternalProjectLink
          label="깃허브 주소"
          url={githubUrl}
          onCopy={onCopy}
          icon={<Github className="h-4 w-4 shrink-0 text-mt-text-primary" aria-hidden />}
        />
        <ExternalProjectLink
          label="소통 채널 주소"
          url={communicationUrl}
          onCopy={onCopy}
          icon={<Link2 className="h-4 w-4 shrink-0 text-mt-primary" aria-hidden />}
        />
      </div>
    </section>
  );
}
