'use client';

import { useEffect, useState } from 'react';

interface ProfileAvatarProps {
  name: string;
  imageUrl?: string | null;
  sizeClassName?: string;
  shape?: 'circle' | 'rounded';
  textClassName?: string;
  className?: string;
  imageClassName?: string;
}

export default function ProfileAvatar({
  name,
  imageUrl,
  sizeClassName = 'h-9 w-9',
  shape = 'circle',
  textClassName = 'text-base',
  className = '',
  imageClassName = '',
}: ProfileAvatarProps) {
  const [hasImageError, setHasImageError] = useState(false);
  const fallbackLabel = name.trim().slice(0, 1) || '?';
  const shapeClassName = shape === 'rounded' ? 'rounded-3xl' : 'rounded-full';
  const resolvedImageUrl = imageUrl && !hasImageError ? imageUrl : null;

  useEffect(() => {
    setHasImageError(false);
  }, [imageUrl]);

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden bg-home-blue-50 text-home-blue-500 ${sizeClassName} ${shapeClassName} ${className}`}
      aria-hidden
    >
      {resolvedImageUrl ? (
        <img
          alt={name}
          className={`h-full w-full scale-125 object-cover ${imageClassName}`}
          src={resolvedImageUrl}
          onError={() => setHasImageError(true)}
        />
      ) : (
        <span className={`font-bold leading-none ${textClassName}`}>{fallbackLabel}</span>
      )}
    </span>
  );
}
