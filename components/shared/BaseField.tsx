import type { ReactNode } from 'react';

export interface BaseFieldProps {
  label?: string;
  htmlFor?: string;
  required?: boolean;
  hintText?: string;
  errorText?: string;
  className?: string;
  children?: ReactNode;
}

export default function BaseField({
  label,
  htmlFor,
  required = true,
  hintText,
  errorText,
  className = '',
  children,
}: BaseFieldProps) {
  return (
    <div className={`flex w-full flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-lg font-bold leading-7 text-text-black" htmlFor={htmlFor}>
          {label}
          {!required && (
            <span className="ml-2 text-sm font-extralight text-muted-gray">(선택)</span>
          )}
        </label>
      )}

      {children}

      {errorText ? (
        <p className="text-sm leading-5 text-error-red">{errorText}</p>
      ) : hintText ? (
        <p className="text-sm leading-5 text-text-gray">{hintText}</p>
      ) : null}
    </div>
  );
}
