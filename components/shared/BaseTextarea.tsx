import type { TextareaHTMLAttributes } from 'react';

type BaseTextareaSize = 'L' | 'M' | 'S';

export interface BaseTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  textareaSize?: BaseTextareaSize;
  full?: boolean;
}

const SIZE_MAP: Record<BaseTextareaSize, string> = {
  L: 'px-5 py-4 text-base leading-6',
  M: 'px-4 py-3 text-sm leading-5',
  S: 'px-3 py-2.5 text-sm leading-5',
};

export default function BaseTextarea({
  textareaSize = 'M',
  full = true,
  disabled,
  rows = 4,
  ...props
}: BaseTextareaProps) {
  const sizeClass = SIZE_MAP[textareaSize];
  const widthClass = full ? 'w-full' : 'w-fit';

  return (
    <textarea
      disabled={disabled}
      rows={rows}
      className={`min-h-30 rounded-xl border border-border-gray bg-white text-text-black outline-none transition-all duration-200 ease-out
        placeholder:text-muted-gray
        focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-400/20
        disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-muted-gray
        ${sizeClass}
        ${widthClass}
        resize-y`}
      {...props}
    />
  );
}
