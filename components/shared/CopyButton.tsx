'use client';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

export interface CopyButtonProps {
  text: string;
  className?: string;
  iconSize?: string;
}

export default function CopyButton({
  text,
  className = '',
  iconSize = 'h-3.5 w-3.5',
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`transition-colors ${
        copied ? 'text-green-600' : 'text-slate-400 hover:text-slate-600'
      } ${className}`}
      aria-label={copied ? '복사됨' : '복사'}
    >
      {copied ? <Check className={iconSize} /> : <Copy className={iconSize} />}
    </button>
  );
}
