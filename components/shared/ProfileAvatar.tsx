import Image from 'next/image';

export interface ProfileAvatarProps {
  name: string;
  profile_img?: string | null;
  size?: 'sm' | 'md' | 'lg';
  shape?: 'rounded' | 'circle';
  className?: string;
}

const sizeClasses = {
  sm: 'h-10 w-10',
  md: 'h-16 w-16',
  lg: 'h-32 w-32',
} as const;

const textSizeClasses = {
  sm: 'text-sm',
  md: 'text-2xl',
  lg: 'text-3xl',
} as const;

const sizeValues = {
  sm: 32,
  md: 64,
  lg: 96,
} as const;

const shapeClasses = {
  rounded: 'rounded-2xl',
  circle: 'rounded-full',
} as const;

export default function ProfileAvatar({
  name,
  profile_img,
  size = 'md',
  shape = 'rounded',
  className = '',
}: ProfileAvatarProps) {
  const initial = name[0] ?? '?';
  const hasProfileImg = profile_img && profile_img.trim().length > 0;

  return (
    <div
      className={`relative shrink-0 overflow-hidden bg-slate-200 ${sizeClasses[size]} ${shapeClasses[shape]} ${className}`}
    >
      {hasProfileImg ? (
        <Image
          alt={name}
          className="object-cover"
          fill
          sizes={`${sizeValues[size]}px`}
          src={profile_img}
        />
      ) : (
        <span
          className={`flex h-full w-full items-center justify-center font-bold text-slate-600 ${textSizeClasses[size]}`}
          aria-hidden
        >
          {initial}
        </span>
      )}
    </div>
  );
}
