import Image from 'next/image';

type AppLogoProps = {
  className?: string;
  priority?: boolean;
};

export default function AppLogo({ className = 'h-8 w-36', priority = false }: AppLogoProps) {
  return (
    <span className={`relative block shrink-0 ${className}`}>
      <Image
        src="/brand/meeteam-logo.png"
        alt="meeTeam 로고"
        fill
        priority={priority}
        sizes="(max-width: 768px) 144px, 160px"
        className="object-contain"
      />
    </span>
  );
}
