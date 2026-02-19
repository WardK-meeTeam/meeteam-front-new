'use client';

import { Camera, RefreshCcw, Trash2 } from 'lucide-react';
import { type ChangeEvent, type MouseEvent, useEffect, useRef, useState } from 'react';

interface CoverImageUploaderProps {
  id?: string;
  accept?: string;
}

export default function CoverImageUploader({
  id = 'project-cover-image',
  accept = 'image/png,image/jpeg',
}: CoverImageUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const nextUrl = URL.createObjectURL(file);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(nextUrl);
  };

  const handleOpenFileDialog = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    inputRef.current?.click();
  };

  const handleRemove = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <label
      htmlFor={id}
      className={`group relative flex w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl text-center transition-colors aspect-[1200/630] min-h-[220px] ${
        previewUrl
          ? 'border border-border-gray bg-black/5'
          : 'border-2 border-dashed border-border-gray bg-slate-50 px-6 py-20 hover:bg-brand-500/5 hover:shadow-sm'
      }`}
    >
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={accept}
        className="sr-only"
        onChange={handleChange}
      />

      {previewUrl && (
        <img
          src={previewUrl}
          alt="프로젝트 커버 미리보기"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      )}

      {!previewUrl && (
        <div className="relative z-10 flex flex-col items-center transition-transform duration-300 ease-out group-hover:scale-[1.01]">
          <span className="mb-5 inline-flex h-20 w-20 items-center justify-center rounded-full border border-border-gray bg-white text-muted-gray transition-all duration-300 ease-out group-hover:scale-105 group-hover:border-brand-400 group-hover:text-brand-500">
            <Camera className="h-8 w-8" strokeWidth={1.8} aria-hidden="true" />
          </span>

          <p className="text-lg font-semibold leading-7 text-text-gray transition-colors duration-300 group-hover:text-brand-500">
            클릭하여 이미지를 업로드하세요
          </p>
          <p className="mt-1.5 text-sm font-medium leading-6 text-muted-gray transition-colors duration-300 group-hover:text-text-gray">
            권장 사이즈: 1200 x 630px (JPG, PNG)
          </p>
        </div>
      )}

      {previewUrl && (
        <>
          <div className="pointer-events-none absolute inset-0 z-10 bg-text-black/45 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100" />

          <div className="absolute inset-0 z-20 flex items-center justify-center gap-4 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 translate-y-3">
            <button
              type="button"
              onClick={handleOpenFileDialog}
              className="group/change inline-flex h-12 items-center gap-1.5 rounded-xl bg-white px-6 text-base font-bold text-text-black shadow-lg transition-transform duration-300 ease-out group-hover:scale-100 scale-95 hover:-translate-y-0.5 hover:shadow-xl"
            >
              <RefreshCcw
                className="h-4 w-4 text-brand-500 transition-transform duration-300 ease-out group-hover/change:rotate-45"
                aria-hidden="true"
              />
              이미지 변경하기
            </button>

            <button
              type="button"
              onClick={handleRemove}
              className="group/delete inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red-500 text-white shadow-lg transition-transform duration-300 ease-out delay-75 group-hover:scale-100 scale-95 hover:-translate-y-0.5 hover:shadow-xl"
              aria-label="이미지 삭제"
            >
              <Trash2
                className="h-5 w-5 transition-transform duration-300 ease-out group-hover/delete:scale-110 group-hover/delete:-translate-y-0.5"
                aria-hidden="true"
              />
            </button>
          </div>
        </>
      )}
    </label>
  );
}
