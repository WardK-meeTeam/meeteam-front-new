'use client';

import { Bold, Code2, Eye, Heading2, List, PencilLine, Quote } from 'lucide-react';
import { useMemo, useState } from 'react';
import BaseTextarea from '@/components/shared/BaseTextarea';
import MarkdownContent from '@/components/shared/MarkdownContent';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
  dataCy?: string;
  textareaClassName?: string;
  previewEmptyText?: string;
  disabled?: boolean;
}

const FORMAT_ACTIONS = [
  { label: '제목', icon: Heading2, snippet: '## 어떤 이야기를 들려줄까요?' },
  { label: '굵게', icon: Bold, snippet: '**강조하고 싶은 문장**' },
  { label: '목록', icon: List, snippet: '- 함께 해본 일\n- 좋아하는 방식' },
  { label: '인용', icon: Quote, snippet: '> 이런 분위기로 함께하고 싶어요.' },
  { label: '코드', icon: Code2, snippet: '`React`, `Spring`처럼 적어도 좋아요.' },
] as const;

export default function MarkdownEditor({
  value,
  onChange,
  rows = 6,
  placeholder = '마크다운으로 편하게 적어주세요.',
  dataCy,
  textareaClassName = '',
  previewEmptyText,
  disabled = false,
}: MarkdownEditorProps) {
  const [mode, setMode] = useState<'write' | 'preview'>('write');
  const characterCount = value.length;
  const helperText = useMemo(() => {
    if (mode === 'preview') {
      return value.trim()
        ? '읽는 사람에게 이렇게 보여요.'
        : '내용을 쓰면 이곳에서 바로 확인할 수 있어요.';
    }

    return '제목, 목록, 굵은 글씨 정도만 써도 훨씬 읽기 좋아져요.';
  }, [mode, value]);

  const insertSnippet = (snippet: string) => {
    const nextValue = value.trimEnd() ? `${value.trimEnd()}\n\n${snippet}` : snippet;
    onChange(nextValue);
    setMode('write');
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-mt-border bg-mt-white">
      <div className="flex flex-col gap-3 border-b border-mt-border bg-mt-bg-soft px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setMode('write')}
            className={`inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-bold transition-colors ${
              mode === 'write'
                ? 'bg-mt-white text-mt-text-primary shadow-sm'
                : 'text-mt-text-secondary hover:bg-mt-white hover:text-mt-text-primary'
            }`}
          >
            <PencilLine className="h-4 w-4" aria-hidden strokeWidth={1.8} />
            쓰기
          </button>
          <button
            type="button"
            onClick={() => setMode('preview')}
            className={`inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-bold transition-colors ${
              mode === 'preview'
                ? 'bg-mt-white text-mt-text-primary shadow-sm'
                : 'text-mt-text-secondary hover:bg-mt-white hover:text-mt-text-primary'
            }`}
          >
            <Eye className="h-4 w-4" aria-hidden strokeWidth={1.8} />
            미리보기
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-1">
          {FORMAT_ACTIONS.map((action) => {
            const Icon = action.icon;

            return (
              <button
                key={action.label}
                type="button"
                onClick={() => insertSnippet(action.snippet)}
                disabled={disabled}
                aria-label={`${action.label} 넣기`}
                title={`${action.label} 넣기`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-mt-text-secondary transition-colors hover:bg-mt-white hover:text-mt-text-primary disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Icon className="h-4 w-4" aria-hidden strokeWidth={1.8} />
              </button>
            );
          })}
        </div>
      </div>

      {mode === 'write' ? (
        <BaseTextarea
          textareaSize="L"
          rows={rows}
          value={value}
          data-cy={dataCy}
          onChange={(event) => onChange(event.target.value)}
          disabled={disabled}
          placeholder={placeholder}
          className={`min-h-60 rounded-none border-0 px-5 py-5 text-base leading-7 focus:ring-0 resize-none ${textareaClassName}`}
        />
      ) : (
        <div className="min-h-60 px-5 py-5">
          <MarkdownContent value={value} emptyText={previewEmptyText} />
        </div>
      )}

      <div className="flex flex-col gap-1 border-t border-mt-border bg-mt-bg-soft px-4 py-3 text-sm leading-5 text-mt-text-secondary sm:flex-row sm:items-center sm:justify-between">
        <p>{helperText}</p>
        <span className="font-semibold text-mt-text-nav">{characterCount.toLocaleString()}자</span>
      </div>
    </div>
  );
}
