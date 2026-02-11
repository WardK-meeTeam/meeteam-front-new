import type { InputHTMLAttributes, ReactNode } from 'react';

type BaseInputSize = 'L' | 'M' | 'S';

export interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputSize?: BaseInputSize;
  full?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const SIZE_MAP: Record<BaseInputSize, string> = {
  L: 'px-5 py-4 text-base leading-6',
  M: 'px-4 py-3 text-sm leading-5',
  S: 'px-3 py-2.5 text-sm leading-5',
};

export default function BaseInput({
  inputSize = 'M',
  full = true,
  type = 'text',
  disabled,
  leftIcon,
  rightIcon,
  ...props
}: BaseInputProps) {
  const sizeClass = SIZE_MAP[inputSize];
  const widthClass = full ? 'w-full' : 'w-fit';
  const leftPaddingClass = leftIcon ? 'pl-11' : '';
  const rightPaddingClass = rightIcon ? 'pr-11' : '';

  return (
    <div className={`relative ${widthClass}`}>
      {leftIcon && (
        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-muted-gray">
          {leftIcon}
        </span>
      )}
      <input
        type={type}
        disabled={disabled}
        className={`rounded-xl border border-border-gray bg-white text-text-black outline-none transition-all duration-200 ease-out
          placeholder:text-muted-gray
          focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-400/20
          disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-muted-gray
          ${sizeClass}
          ${leftPaddingClass}
          ${rightPaddingClass}
          ${widthClass}`}
        {...props}
      />
      {rightIcon && (
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-muted-gray">
          {rightIcon}
        </span>
      )}
    </div>
  );
}
