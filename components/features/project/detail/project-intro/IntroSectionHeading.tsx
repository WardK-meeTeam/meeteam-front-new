import type { ReactNode } from 'react';

interface IntroSectionHeadingProps {
  title: string;
  icon: ReactNode;
}

export default function IntroSectionHeading({ title, icon }: IntroSectionHeadingProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-text-gray">{icon}</span>
      <h2 className="text-xl leading-7 font-bold text-text-black">{title}</h2>
    </div>
  );
}
