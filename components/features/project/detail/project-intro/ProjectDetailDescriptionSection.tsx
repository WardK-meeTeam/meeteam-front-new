import IntroSectionHeading from './IntroSectionHeading';

export default function ProjectDetailDescriptionSection() {
  return (
    <section className="flex w-full flex-col gap-5">
      <IntroSectionHeading title="프로젝트 소개" />
      <div className="rounded-3xl border border-border-gray bg-white p-7 shadow-sm">
        <p className="text-base leading-8 text-text-body">
          뉴스 콘텐츠를 더 빠르게, 더 정확하게 소비할 수 있도록 돕는 AI 기반 뉴스 요약 서비스를
          만들고 있습니다. 핵심은 방대한 기사 데이터를 분석해 사용자에게 중요한 내용을 짧고 선명하게
          전달하는 것입니다.
        </p>
      </div>
    </section>
  );
}
