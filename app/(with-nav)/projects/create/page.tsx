'use client';

import BaseField from '@/components/shared/BaseField';
import BaseInput from '@/components/shared/BaseInput';
import GithubLoginIcon from '@/assets/GithubLogin.svg';
import CategoryBox from '@/components/features/project/create/CategoryBox';
import BaseTextarea from '@/components/shared/BaseTextarea';
import BaseTag from '@/components/shared/BaseTag';
import CoverImageUploader from '@/components/features/project/create/CoverImageUploader';
import RecruitDeadlineField from '@/components/features/project/create/RecruitDeadlineField';
import { useState } from 'react';
import { MessageCircle } from 'lucide-react';

export default function Page() {
  const messageIcon = <MessageCircle className="w-5 h-5 text-zinc-400" />;
  const githubIcon = <GithubLoginIcon className="h-5 w-5 text-muted-gray" aria-hidden />;
  const [recruitDeadline, setRecruitDeadline] = useState('');
  const [isRecruitUntilComplete, setIsRecruitUntilComplete] = useState(false);
  const [projectCategoryId, setProjectCategoryId] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['웹']);

  const projectCategories = [
    { id: 'ai-tech', label: 'AI/테크', icon: '🤖' },
    { id: 'eco', label: '친환경', icon: '🍀' },
    { id: 'healthcare', label: '헬스케어', icon: '💪' },
    { id: 'pets', label: '반려동물', icon: '🐱' },
    { id: 'education', label: '교육/학습', icon: '📚' },
    { id: 'fashion', label: '패션/뷰티', icon: '💄' },
    { id: 'fintech', label: '금융/핀테크', icon: '💸' },
    { id: 'etc', label: '기타', icon: '⚙️' },
  ];

  const releasePlatforms = ['웹', 'iOS', '안드로이드'];

  const handlePlatformToggle = (platform: string) => {
    setSelectedPlatforms((current) =>
      current.includes(platform)
        ? current.filter((item) => item !== platform)
        : [...current, platform],
    );
  };

  return (
    <section className="mx-auto space-y-6 md:space-y-8 bg-white p-10 max-w-3xl w-full rounded-3xl flex flex-col shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)]">
      <form className="flex flex-col gap-8">
        <BaseField
          errorText="프로젝트 이름을 입력 해주세요"
          hintText=""
          label="프로젝트 명"
          required
        >
          <BaseInput placeholder="프로젝트 이름을 입력해주세요 (예: 여행 기록 공유 플랫폼, 트립로그)" />
        </BaseField>

        <BaseField errorText="" hintText="" label="Github 레포지토리 주소" required={false}>
          <BaseInput placeholder="https://github.com/username/repository" leftIcon={githubIcon} />
        </BaseField>

        <BaseField errorText="" hintText="" label="소통 채널 주소" required={false}>
          <BaseInput placeholder="슬랙, 디스코드, 오픈카톡방 등 초대 링크" leftIcon={messageIcon} />
        </BaseField>

        <BaseField errorText="" hintText="" label="프로젝트 카테고리">
          <div className="grid grid-cols-4 gap-2">
            {projectCategories.map((category) => (
              <CategoryBox
                key={category.id}
                icon={category.icon}
                label={category.label}
                selected={projectCategoryId === category.id}
                onClick={() => setProjectCategoryId(category.id)}
              />
            ))}
          </div>
        </BaseField>
        <BaseField errorText="" hintText="" label="프로젝트 소개 글">
          <BaseTextarea placeholder="프로젝트를 설명해주세요" />
        </BaseField>
        <BaseField errorText="" hintText="" label="출시 플랫폼">
          <div className="flex flex-wrap gap-2">
            {releasePlatforms.map((platform) => {
              const selected = selectedPlatforms.includes(platform);

              return (
                <BaseTag
                  key={platform}
                  selected={selected}
                  role="button"
                  tabIndex={0}
                  aria-pressed={selected}
                  onClick={() => handlePlatformToggle(platform)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      handlePlatformToggle(platform);
                    }
                  }}
                >
                  {platform}
                </BaseTag>
              );
            })}
          </div>
        </BaseField>
        <BaseField errorText="" hintText="" label="프로젝트 커버 이미지">
          <CoverImageUploader />
        </BaseField>
        <BaseField errorText="" hintText="" label="나의 분야"></BaseField>
        <BaseField errorText="" hintText="" label="모집 분야"></BaseField>
        <BaseField errorText="" hintText="" label="필요 기술 스택"></BaseField>
        <RecruitDeadlineField
          deadline={recruitDeadline}
          onDeadlineChange={setRecruitDeadline}
          untilComplete={isRecruitUntilComplete}
          onUntilCompleteChange={(nextValue) => {
            setIsRecruitUntilComplete(nextValue);
            if (nextValue) {
              setRecruitDeadline('');
            }
          }}
          minDate="2026-01-01"
        />
      </form>
    </section>
  );
}
