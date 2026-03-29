'use client';

import { type FormEvent, useState } from 'react';
import { MessageCircle, Plus } from 'lucide-react';
import GithubLoginIcon from '@/assets/GithubLogin.svg';
import { OPTIONS } from '@/constants/interest';
import type { Interest } from '@/types/auth';
import BaseButton from '@/components/shared/BaseButton';
import BaseDropdown from '@/components/shared/BaseDropdown';
import BaseField from '@/components/shared/BaseField';
import BaseInput from '@/components/shared/BaseInput';
import BaseTag from '@/components/shared/BaseTag';
import BaseTextarea from '@/components/shared/BaseTextarea';
import CategoryBox from '@/components/features/project/create/CategoryBox';
import CoverImageUploader from '@/components/features/project/create/CoverImageUploader';
import { PROJECT_CATEGORIES, RELEASE_PLATFORMS } from '@/components/features/project/constants';
import RecruitDeadlineField from '@/components/features/project/create/RecruitDeadlineField';
import TechStackSection from '@/components/features/auth/TechStackSection';
import type { ProjectFormValues, RecruitInterest, ReleasePlatform } from '@/types/project';
type OpenDropdownKey = 'major' | 'minor' | null;

type ProjectFormVariant = 'create' | 'edit';

interface ProjectFormProps {
  variant?: ProjectFormVariant;
  initialValues?: ProjectFormValues;
  onSubmit?: (values: ProjectFormValues) => void;
}

const DEFAULT_FORM_VALUES: ProjectFormValues = {
  projectName: '',
  githubUrl: '',
  communicationUrl: '',
  categoryId: '',
  description: '',
  releasePlatforms: ['웹'],
  myInterest: { major: '', minor: '' },
  recruitInterests: [{ major: '', minor: '', count: 1 }],
  recruitTechStacks: {},
  recruitDeadline: '',
  isRecruitUntilComplete: false,
};

export default function ProjectForm({
  variant = 'create',
  initialValues,
  onSubmit,
}: ProjectFormProps) {
  const messageIcon = <MessageCircle className="h-5 w-5 text-muted-gray" />;
  const githubIcon = <GithubLoginIcon className="h-5 w-5 text-muted-gray" aria-hidden />;
  const isEdit = variant === 'edit';
  const majors = OPTIONS.map((item) => item.major);
  const hydratedInitialValues = initialValues ?? DEFAULT_FORM_VALUES;

  const [projectName, setProjectName] = useState(hydratedInitialValues.projectName);
  const [githubUrl, setGithubUrl] = useState(hydratedInitialValues.githubUrl);
  const [communicationUrl, setCommunicationUrl] = useState(hydratedInitialValues.communicationUrl);
  const [description, setDescription] = useState(hydratedInitialValues.description);
  const [recruitDeadline, setRecruitDeadline] = useState(hydratedInitialValues.recruitDeadline);
  const [isRecruitUntilComplete, setIsRecruitUntilComplete] = useState(
    hydratedInitialValues.isRecruitUntilComplete,
  );
  const [projectCategoryId, setProjectCategoryId] = useState(hydratedInitialValues.categoryId);
  const [selectedPlatforms, setSelectedPlatforms] = useState<ReleasePlatform[]>(
    hydratedInitialValues.releasePlatforms,
  );
  const [myInterest, setMyInterest] = useState<Interest>(hydratedInitialValues.myInterest);
  const [myOpenDropdown, setMyOpenDropdown] = useState<OpenDropdownKey>(null);
  const [recruitInterests, setRecruitInterests] = useState<RecruitInterest[]>(
    hydratedInitialValues.recruitInterests,
  );
  const [recruitTechStacks, setRecruitTechStacks] = useState<Record<string, string[]>>(
    hydratedInitialValues.recruitTechStacks,
  );
  const [openRecruitDropdown, setOpenRecruitDropdown] = useState<{
    index: number;
    key: Exclude<OpenDropdownKey, null>;
  } | null>(null);

  const getMinors = (major: string) => {
    const selected = OPTIONS.find((item) => item.major === major);
    return selected?.minor ?? [];
  };

  const handlePlatformToggle = (platform: ReleasePlatform) => {
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

  const handleReset = () => {
    setProjectName(DEFAULT_FORM_VALUES.projectName);
    setGithubUrl(DEFAULT_FORM_VALUES.githubUrl);
    setCommunicationUrl(DEFAULT_FORM_VALUES.communicationUrl);
    setDescription(DEFAULT_FORM_VALUES.description);
    setProjectCategoryId(DEFAULT_FORM_VALUES.categoryId);
    setSelectedPlatforms(DEFAULT_FORM_VALUES.releasePlatforms);
    setMyInterest(DEFAULT_FORM_VALUES.myInterest);
    setMyOpenDropdown(null);
    setRecruitInterests(DEFAULT_FORM_VALUES.recruitInterests);
    setRecruitTechStacks(DEFAULT_FORM_VALUES.recruitTechStacks);
    setOpenRecruitDropdown(null);
    setRecruitDeadline(DEFAULT_FORM_VALUES.recruitDeadline);
    setIsRecruitUntilComplete(DEFAULT_FORM_VALUES.isRecruitUntilComplete);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit?.({
      projectName,
      githubUrl,
      communicationUrl,
      categoryId: projectCategoryId,
      description,
      releasePlatforms: selectedPlatforms,
      myInterest,
      recruitInterests,
      recruitTechStacks,
      recruitDeadline,
      isRecruitUntilComplete,
    });
  };

  return (
    <section
      className={`mx-auto flex w-full flex-col bg-white ${
        isEdit
          ? 'max-w-3xl rounded-3xl border border-border-soft px-8 py-10 shadow-sm md:px-12'
          : 'max-w-3xl rounded-3xl p-10 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)]'
      }`}
    >
      {!isEdit ? (
        <header className="flex flex-col gap-0.5">
          <h1 className="text-2xl leading-8 font-extrabold text-text-black">프로젝트 등록</h1>
          <p className="text-sm leading-5 font-normal text-text-gray">
            멋진 아이디어를 함께 실현할 팀원들을 모아보세요.
          </p>
        </header>
      ) : null}

      <form
        className={`${isEdit ? 'space-y-9' : 'mt-8 flex flex-col gap-8'}`}
        onSubmit={handleSubmit}
      >
        <BaseField
          errorText="프로젝트 이름을 입력 해주세요"
          hintText=""
          label="프로젝트 명"
          required
        >
          <BaseInput
            value={projectName}
            onChange={(event) => setProjectName(event.target.value)}
            placeholder="프로젝트 이름을 입력해주세요 (예: 여행 기록 공유 플랫폼, 트립로그)"
          />
        </BaseField>

        <BaseField errorText="" hintText="" label="GitHub 레포지토리 주소" required={false}>
          <BaseInput
            value={githubUrl}
            onChange={(event) => setGithubUrl(event.target.value)}
            placeholder="https://github.com/username/repository"
            leftIcon={githubIcon}
          />
        </BaseField>

        <BaseField errorText="" hintText="" label="소통 채널 주소" required={false}>
          <BaseInput
            value={communicationUrl}
            onChange={(event) => setCommunicationUrl(event.target.value)}
            placeholder="슬랙, 디스코드, 오픈카톡방 등 초대 링크"
            leftIcon={messageIcon}
          />
        </BaseField>

        <BaseField errorText="" hintText="" label="프로젝트 카테고리">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {PROJECT_CATEGORIES.map((category) => (
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
          <BaseTextarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="프로젝트를 설명해주세요"
            rows={isEdit ? 8 : 4}
          />
        </BaseField>

        <BaseField errorText="" hintText="" label="출시 플랫폼">
          <div className="flex flex-wrap gap-2">
            {RELEASE_PLATFORMS.map((platform) => {
              const selected = selectedPlatforms.includes(platform);

              return (
                <BaseTag
                  key={platform}
                  selected={selected}
                  role="button"
                  tabIndex={0}
                  onClick={() => handlePlatformToggle(platform)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      handlePlatformToggle(platform);
                    }
                  }}
                  className="min-h-10"
                  aria-pressed={selected}
                >
                  {platform === '웹' ? 'Web' : platform}
                </BaseTag>
              );
            })}
          </div>
        </BaseField>

        <BaseField errorText="" hintText="" label="프로젝트 커버 이미지">
          <CoverImageUploader />
        </BaseField>

        <div className={`w-full ${isEdit ? 'border-t border-border-gray pt-9' : ''}`}>
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
                containerClassName={isEdit ? 'w-full max-w-52' : 'w-[30%]'}
                buttonClassName="justify-between px-4 py-3.5"
                textClassName="text-sm font-medium whitespace-nowrap"
              />

              {!isEdit ? (
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
                  textClassName="text-sm font-normal"
                />
              ) : null}
            </div>
          </BaseField>
        </div>

        <div className="flex w-full flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-lg leading-7 font-bold text-text-black">모집 분야</label>
            <button
              type="button"
              onClick={addRecruitInterest}
              className="inline-flex items-center gap-1 text-xs leading-4 font-bold text-brand-500"
            >
              <Plus className="h-4 w-4" aria-hidden strokeWidth={1.8} />
              추가하기
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {recruitInterests.map((interest, index) => (
              <div
                key={`${index}-${interest.major}-${interest.minor}`}
                className="flex flex-col gap-2 md:flex-row md:items-center"
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
                    textClassName="text-sm font-medium whitespace-nowrap"
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
                    textClassName="text-sm font-normal"
                  />
                </div>

                <div className="flex h-12 items-center self-start rounded-xl border border-border-gray bg-white px-2 text-sm font-medium text-text-gray md:self-auto">
                  <button
                    type="button"
                    onClick={() => updateRecruitCount(index, -1)}
                    className="flex h-8 w-7 items-center justify-center rounded-md hover:bg-surface-soft"
                    aria-label="인원수 감소"
                  >
                    -
                  </button>
                  <span className="w-6 text-center text-text-black">{interest.count}</span>
                  <button
                    type="button"
                    onClick={() => updateRecruitCount(index, 1)}
                    className="flex h-8 w-7 items-center justify-center rounded-md hover:bg-surface-soft"
                    aria-label="인원수 증가"
                  >
                    +
                  </button>
                </div>

                {recruitInterests.length > 1 ? (
                  <button
                    type="button"
                    onClick={() => removeRecruitInterest(index)}
                    className="self-start text-xs font-bold text-error-red md:self-auto"
                    aria-label="모집 분야 삭제"
                  >
                    삭제
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <TechStackSection
          label={isEdit ? '필요 기술 스택' : '기술 스택'}
          interests={recruitInterests}
          value={recruitTechStacks}
          onChange={setRecruitTechStacks}
        />

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

        {isEdit ? (
          <div className="flex justify-center pt-2">
            <BaseButton
              size="XL"
              variant="primary"
              type="submit"
              className="w-full max-w-md shadow-xl shadow-brand-400/40"
            >
              저장하기
            </BaseButton>
          </div>
        ) : (
          <div className="flex items-start gap-4 pt-8">
            <div className="w-1/3">
              <BaseButton size="XL" variant="gray" full onClick={handleReset}>
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
        )}
      </form>
    </section>
  );
}
