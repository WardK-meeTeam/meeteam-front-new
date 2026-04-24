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
  return (
    <div
      className={`relative aspect-[1200/630] w-full overflow-hidden rounded-4xl bg-mt-bg-soft ${className}`}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          className={`absolute inset-0 h-full w-full object-cover ${imageClassName}`}
        />
      ) : (
        <div className="absolute inset-0 bg-linear-to-br from-mt-bg-soft via-mt-badge-bg to-mt-shadow-blue" />
      )}

      {overlayClassName ? (
        <div className={`pointer-events-none absolute inset-0 ${overlayClassName}`} />
      ) : null}
    </div>
  );
}
