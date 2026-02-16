'use client';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type BaseButtonSize = 'XL' | 'L' | 'M' | 'S' | 'XS';
type BaseButtonVariant = 'primary' | 'secondary' | 'gray';

export interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: BaseButtonSize;
  variant?: BaseButtonVariant;
  full?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  children?: ReactNode;
}

const SIZE_MAP: Record<BaseButtonSize, string> = {
  XL: 'h-14 px-6 text-base leading-6',
  L: 'h-12 px-5 text-sm leading-5',
  M: 'h-10 px-4 text-sm leading-5',
  S: 'h-9 px-3 text-sm leading-5',
  XS: 'h-8 px-3 text-xs leading-4',
};

const VARIANT_MAP: Record<BaseButtonVariant, string> = {
  primary:
    'bg-indigo-600 text-white shadow-[0px_20px_25px_-5px_rgba(199,210,254,1),0px_8px_10px_-6px_rgba(199,210,254,1)] hover:bg-indigo-700',
  secondary: 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50',
  gray: 'border border-border-gray bg-white text-text-gray',
};

export default function BaseButton({
  size = 'M',
  variant = 'primary',
  full = false,
  leftIcon,
  rightIcon,
  className = '',
  type = 'button',
  onClick = () => {
    console.warn('아직 onClick을 추가하지 않았네요');
  },
  disabled,
  children,
}: BaseButtonProps) {
  const sizeClass = SIZE_MAP[size];
  const variantClass = VARIANT_MAP[variant];
  const isIconOnly = !children && (leftIcon || rightIcon);

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-bold cursor-pointer transition-colors
        ${variant === 'primary' ? '' : 'shadow-sm'}
        disabled:cursor-not-allowed disabled:opacity-50
        ${variantClass}
        ${sizeClass}
        ${full ? 'w-full' : 'w-fit'}
        ${isIconOnly ? 'aspect-square' : ''}
        ${className}`}
    >
      {leftIcon && <span className="shrink-0">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
}
