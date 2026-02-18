'use client';

import BaseField from '@/components/shared/BaseField';
import BaseInput from '@/components/shared/BaseInput';
import BaseButton from '@/components/shared/BaseButton';
import GithubLoginIcon from '@/assets/GithubLogin.svg';
import CategoryBox from '@/components/features/project/create/CategoryBox';
import BaseTextarea from '@/components/shared/BaseTextarea';
import BaseTag from '@/components/shared/BaseTag';
import BaseDropdown from '@/components/shared/BaseDropdown';
import CoverImageUploader from '@/components/features/project/create/CoverImageUploader';
import RecruitDeadlineField from '@/components/features/project/create/RecruitDeadlineField';
import TechStackSection from '@/components/features/auth/TechStackSection';
import type { Interest } from '@/types/auth';
import { OPTIONS } from '@/constants/interest';
import { useState } from 'react';
import { MessageCircle } from 'lucide-react';

type RecruitInterest = Interest & { count: number };
type OpenDropdownKey = 'major' | 'minor' | null;

export default function Page() {
  const messageIcon = <MessageCircle className="w-5 h-5 text-zinc-400" />;
  const githubIcon = <GithubLoginIcon className="h-5 w-5 text-muted-gray" aria-hidden />;
  const [recruitDeadline, setRecruitDeadline] = useState('');
  const [isRecruitUntilComplete, setIsRecruitUntilComplete] = useState(false);
  const [projectCategoryId, setProjectCategoryId] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['웹']);
  const [myInterest, setMyInterest] = useState<Interest>({ major: '', minor: '' });
  const [myOpenDropdown, setMyOpenDropdown] = useState<OpenDropdownKey>(null);
  const [recruitInterests, setRecruitInterests] = useState<RecruitInterest[]>([
    { major: '', minor: '', count: 1 },
  ]);
  const [openRecruitDropdown, setOpenRecruitDropdown] = useState<{
    index: number;
    key: Exclude<OpenDropdownKey, null>;
  } | null>(null);

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
  const majors = OPTIONS.map((item) => item.major);

  const getMinors = (major: string) => {
    const selected = OPTIONS.find((item) => item.major === major);
    return selected?.minor ?? [];
  };

  const handlePlatformToggle = (platform: string) => {
    setSelectedPlatforms((current) =>
      current.includes(platform)
        ? current.filter((item) => item !== platform)
        : [...current, platform],
    );
  };

  const addRecruitInterest = () => {
    setRecruitInterests((prev) => [...prev, { major: '', minor: '', count: 1 }]);
  };

  const updateRecruitInterest = (index: number, next: Interest) => {
    setRecruitInterests((prev) =>
      prev.map((item, itemIndex) =>
        itemIndex === index ? { ...item, major: next.major, minor: next.minor } : item,
      ),
    );
  };

  const removeRecruitInterest = (index: number) => {
    setRecruitInterests((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== index) : prev));
    setOpenRecruitDropdown((prev) => {
      if (!prev) return prev;
      if (prev.index === index) return null;
      if (prev.index > index) return { ...prev, index: prev.index - 1 };
      return prev;
    });
  };

  const updateRecruitCount = (index: number, delta: number) => {
    setRecruitInterests((prev) =>
      prev.map((item, itemIndex) =>
        itemIndex === index ? { ...item, count: Math.max(1, item.count + delta) } : item,
      ),
    );
  };

  const toggleMyDropdown = (key: Exclude<OpenDropdownKey, null>) => {
    setMyOpenDropdown((prev) => (prev === key ? null : key));
  };

  const toggleRecruitDropdown = (index: number, key: Exclude<OpenDropdownKey, null>) => {
    setOpenRecruitDropdown((prev) =>
      prev && prev.index === index && prev.key === key ? null : { index, key },
    );
  };

  const handleCancel = () => {
    setProjectCategoryId('');
    setSelectedPlatforms(['웹']);
    setMyInterest({ major: '', minor: '' });
    setMyOpenDropdown(null);
    setRecruitInterests([{ major: '', minor: '', count: 1 }]);
    setOpenRecruitDropdown(null);
    setRecruitDeadline('');
    setIsRecruitUntilComplete(false);
  };

  return (
    <section className="mx-auto space-y-6 md:space-y-8 bg-white p-10 max-w-3xl w-full rounded-3xl flex flex-col shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)]">
      <header className="flex flex-col gap-0.5">
        <h1 className="text-2xl font-extrabold leading-8 text-text-black">프로젝트 등록</h1>
        <p className="text-sm font-normal leading-5 text-text-gray">
          멋진 아이디어를 함께 실현할 팀원들을 모아보세요.
        </p>
      </header>

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
        <BaseField errorText="" hintText="" label="나의 분야">
          <div className="flex w-full gap-2">
            <BaseDropdown
              value={myInterest.major}
              placeholder="직군 선택"
              open={myOpenDropdown === 'major'}
              items={majors}
              onToggle={() => toggleMyDropdown('major')}
              onSelect={(selectedMajor) => {
                setMyInterest({ major: selectedMajor, minor: '' });
                setMyOpenDropdown(null);
              }}
              containerClassName="w-[30%]"
              buttonClassName="justify-between px-4 py-3.5"
              textClassName="font-medium text-sm whitespace-nowrap"
            />

            <BaseDropdown
              value={myInterest.minor}
              placeholder="상세 분야 선택"
              open={myOpenDropdown === 'minor'}
              items={getMinors(myInterest.major)}
              onToggle={() => myInterest.major && toggleMyDropdown('minor')}
              onSelect={(selectedMinor) => {
                setMyInterest((prev) => ({ ...prev, minor: selectedMinor }));
                setMyOpenDropdown(null);
              }}
              disabled={!myInterest.major}
              containerClassName="flex-1"
              buttonClassName="justify-between px-4 py-3.5"
              textClassName="font-normal text-sm"
            />
          </div>
        </BaseField>

        <div className="flex w-full flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-lg font-bold leading-7 text-text-black">모집 분야</label>
            <button
              type="button"
              onClick={addRecruitInterest}
              className="text-xs font-bold leading-4 text-brand-500"
            >
              + 추가하기
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {recruitInterests.map((interest, index) => (
              <div
                key={`${index}-${interest.major}-${interest.minor}`}
                className="flex items-center gap-2"
              >
                <div className="flex flex-1 gap-2">
                  <BaseDropdown
                    value={interest.major}
                    placeholder="직군 선택"
                    open={
                      openRecruitDropdown?.index === index && openRecruitDropdown.key === 'major'
                    }
                    items={majors}
                    onToggle={() => toggleRecruitDropdown(index, 'major')}
                    onSelect={(selectedMajor) => {
                      updateRecruitInterest(index, { major: selectedMajor, minor: '' });
                      setOpenRecruitDropdown(null);
                    }}
                    containerClassName="w-[30%]"
                    buttonClassName="justify-between px-4 py-3.5"
                    textClassName="font-medium text-sm whitespace-nowrap"
                  />

                  <BaseDropdown
                    value={interest.minor}
                    placeholder="상세 분야 선택"
                    open={
                      openRecruitDropdown?.index === index && openRecruitDropdown.key === 'minor'
                    }
                    items={getMinors(interest.major)}
                    onToggle={() => interest.major && toggleRecruitDropdown(index, 'minor')}
                    onSelect={(selectedMinor) => {
                      updateRecruitInterest(index, { major: interest.major, minor: selectedMinor });
                      setOpenRecruitDropdown(null);
                    }}
                    disabled={!interest.major}
                    containerClassName="flex-1"
                    buttonClassName="justify-between px-4 py-3.5"
                    textClassName="font-normal text-sm"
                  />
                </div>

                <div className="flex h-12 items-center rounded-xl border border-border-gray bg-white px-2 text-sm font-medium text-text-gray">
                  <button
                    type="button"
                    onClick={() => updateRecruitCount(index, -1)}
                    className="flex h-8 w-7 items-center justify-center rounded-md hover:bg-slate-50"
                    aria-label="인원수 감소"
                  >
                    -
                  </button>
                  <span className="w-6 text-center text-text-black">{interest.count}</span>
                  <button
                    type="button"
                    onClick={() => updateRecruitCount(index, 1)}
                    className="flex h-8 w-7 items-center justify-center rounded-md hover:bg-slate-50"
                    aria-label="인원수 증가"
                  >
                    +
                  </button>
                </div>

                {recruitInterests.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeRecruitInterest(index)}
                    className="text-xs font-bold text-error-red"
                    aria-label="모집 분야 삭제"
                  >
                    삭제
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <TechStackSection interests={recruitInterests} />
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

        <div className="flex items-start gap-4 pt-8">
          <div className="w-1/3">
            <BaseButton size="XL" variant="gray" full onClick={handleCancel}>
              취소
            </BaseButton>
          </div>

          <div className="flex-1">
            <BaseButton
              size="XL"
              variant="primary"
              full
              type="submit"
              className="shadow-xl shadow-brand-400/40"
            >
              프로젝트 등록하기
            </BaseButton>
          </div>
        </div>
      </form>
    </section>
  );
}
