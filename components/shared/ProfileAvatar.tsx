interface ProfileAvatarProps {
  name: string;
  imageUrl?: string | null;
  sizeClassName?: string;
  shape?: 'circle' | 'rounded';
  textClassName?: string;
  className?: string;
}

export default function ProfileAvatar({
  name,
  imageUrl,
  sizeClassName = 'h-9 w-9',
  shape = 'circle',
  textClassName = 'text-base',
  className = '',
}: ProfileAvatarProps) {
  const fallbackLabel = name.trim().slice(0, 1) || '?';
  const shapeClassName = shape === 'rounded' ? 'rounded-3xl' : 'rounded-full';

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden bg-brand-50 text-brand-500 ${sizeClassName} ${shapeClassName} ${className}`}
      aria-hidden
    >
      {imageUrl ? (
        <img alt={name} className="h-full w-full object-cover" src={imageUrl} />
      ) : (
        <span className={`font-bold leading-none ${textClassName}`}>{fallbackLabel}</span>
      )}
    </span>
  );
}
