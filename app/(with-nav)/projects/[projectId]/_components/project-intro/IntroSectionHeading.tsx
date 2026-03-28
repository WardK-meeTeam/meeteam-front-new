import type { ReactNode } from 'react';

interface IntroSectionHeadingProps {
  icon: ReactNode;
  title: string;
  containerNodeId?: string;
  iconNodeId?: string;
  titleNodeId?: string;
  titleClassName?: string;
}

export default function IntroSectionHeading({
  icon,
  title,
  containerNodeId,
  iconNodeId,
  titleNodeId,
  titleClassName = '',
}: IntroSectionHeadingProps) {
  return (
    <div className="flex w-full items-center gap-2" data-node-id={containerNodeId}>
      <span
        className="inline-flex h-5 w-5 items-center justify-center text-muted-gray"
        data-node-id={iconNodeId}
      >
        {icon}
      </span>
      <h3
        className={`text-xl leading-7 font-bold text-text-black ${titleClassName}`}
        data-node-id={titleNodeId}
      >
        {title}
      </h3>
    </div>
  );
}
