'use client';

import { useEffect, useState } from 'react';

import { getProjectImageSrc, PROJECT_FALLBACK_IMAGE_SRC } from './projectImage';

type ProjectCoverImageProps = {
  src?: string | null;
  alt: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  overlayClassName?: string;
};

export default function ProjectCoverImage({
  src,
  alt,
  priority = false,
  className = '',
  imageClassName = '',
  overlayClassName = '',
}: ProjectCoverImageProps) {
  const [resolvedSrc, setResolvedSrc] = useState(getProjectImageSrc(src));
  const isFallbackImage = resolvedSrc === PROJECT_FALLBACK_IMAGE_SRC;

  useEffect(() => {
    setResolvedSrc(getProjectImageSrc(src));
  }, [src]);

  return (
    <div
      className={`relative aspect-[1200/630] w-full overflow-hidden rounded-4xl bg-mt-bg-soft ${className}`}
    >
      <img
        src={resolvedSrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        className={`absolute inset-0 h-full w-full object-cover ${imageClassName}`}
        onError={() => {
          if (!isFallbackImage) {
            setResolvedSrc(PROJECT_FALLBACK_IMAGE_SRC);
          }
        }}
      />

      {overlayClassName && !isFallbackImage ? (
        <div className={`pointer-events-none absolute inset-0 ${overlayClassName}`} />
      ) : null}
    </div>
  );
}
