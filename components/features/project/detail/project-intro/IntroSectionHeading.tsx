interface IntroSectionHeadingProps {
  title: string;
}

export default function IntroSectionHeading({ title }: IntroSectionHeadingProps) {
  return <h2 className="text-2xl leading-8 font-bold text-text-black">{title}</h2>;
}
