import { Link, Camera, Trash2, CircleCheck } from 'lucide-react';
import Github from '@/assets/GithubLogin.svg';
import BaseField from '@/components/shared/BaseField';
import BaseInput from '@/components/shared/BaseInput';
import ProfileAvatar from '@/components/shared/ProfileAvatar';

type ProfileExtraSectionProps = {
  project: string;
  githubLink: string;
  blogLink: string;
  onChangeProject: React.ChangeEventHandler<HTMLInputElement>;
  onChangeGithubLink: React.ChangeEventHandler<HTMLInputElement>;
  onChangeBlogLink: React.ChangeEventHandler<HTMLInputElement>;
  onChangeProfileImage: React.ChangeEventHandler<HTMLInputElement>;
  onRemoveProfileImage: () => void;
  profileImageName: string;
  profileImagePreviewUrl: string;
  projectError?: string;
};

export default function ProfileExtraSection({
  project,
  githubLink,
  blogLink,
  onChangeProject,
  onChangeGithubLink,
  onChangeBlogLink,
  onChangeProfileImage,
  onRemoveProfileImage,
  profileImageName,
  profileImagePreviewUrl,
  projectError,
}: ProfileExtraSectionProps) {
  const githubIcon = <Github className="h-5 w-5 text-mt-text-secondary" />;
  const hasProfileImage = Boolean(profileImagePreviewUrl);

  return (
    <>
      <BaseField label="프로젝트 경험 횟수" htmlFor="project" errorText={projectError}>
        <BaseInput
          id="project"
          type="number"
          min="0"
          value={project}
          placeholder="0"
          rightIcon={'회'}
          onChange={onChangeProject}
          data-cy="signup-project-count"
        />
      </BaseField>

      <div className="flex gap-4">
        <BaseField label="GitHub" htmlFor="github" required={false}>
          <BaseInput
            id="github"
            type="text"
            value={githubLink}
            placeholder="github.com/..."
            leftIcon={githubIcon}
            onChange={onChangeGithubLink}
            data-cy="signup-github-url"
          />
        </BaseField>
        <BaseField label="블로그" htmlFor="blog" required={false}>
          <BaseInput
            id="blog"
            type="text"
            value={blogLink}
            placeholder="URL 입력"
            leftIcon={<Link className="h-5 w-5 text-mt-text-secondary" />}
            onChange={onChangeBlogLink}
            data-cy="signup-blog-url"
          />
        </BaseField>
      </div>

      <BaseField label="프로필 사진" htmlFor="profile-upload">
        <input
          id="profile-upload"
          type="file"
          accept="image/png, image/jpeg"
          className="hidden"
          onChange={onChangeProfileImage}
          data-cy="signup-profile-upload"
        />
        {!hasProfileImage ? (
          <div className="flex p-5 items-center border border-mt-border justify-between rounded-2xl bg-mt-bg-soft">
            <div className="flex items-center gap-4">
              <div className="bg-mt-white border border-mt-border rounded-full w-12 h-12 flex items-center justify-center">
                <Camera className="h-5 w-5 text-mt-text-secondary" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-mt-text-primary text-sm font-bold">
                  나를 표현하는 사진을 올려주세요
                </span>
                <span className="text-mt-text-secondary text-[12px] font-normal leading-4">
                  JPG, PNG (최대 10MB)
                </span>
              </div>
            </div>
            <label
              htmlFor="profile-upload"
              className="cursor-pointer select-none rounded-lg px-4 py-2 border border-mt-border bg-mt-white text-[12px] font-bold text-mt-text-nav hover:bg-mt-bg-soft active:scale-[0.99]"
            >
              업로드
            </label>
          </div>
        ) : (
          <div className="flex p-5 items-center border border-mt-border justify-between rounded-2xl bg-mt-white">
            <div className="flex items-center gap-4 min-w-0">
              <ProfileAvatar
                name="프로필 미리보기"
                imageUrl={profileImagePreviewUrl}
                sizeClassName="h-13 w-13"
                className="bg-mt-white"
              />
              <div className="flex flex-col min-w-0">
                <span className="text-mt-text-primary text-[15px] font-bold">
                  프로필 사진 등록 완료
                </span>
                <div className="flex items-center gap-1.5 min-w-0">
                  <CircleCheck className="h-3 w-3 text-mt-primary" />
                  <span className="text-mt-primary text-[12px] font-bold">{profileImageName}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <label
                htmlFor="profile-upload"
                className="cursor-pointer select-none rounded-xl px-5 py-2.5 border border-mt-border bg-mt-bg-soft text-sm font-bold text-mt-text-nav"
              >
                사진 변경
              </label>
              <button
                type="button"
                onClick={onRemoveProfileImage}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-mt-hero-blue hover:opacity-90"
                aria-label="프로필 사진 삭제"
              >
                <Trash2 className="h-5 w-5 text-mt-white" />
              </button>
            </div>
          </div>
        )}
      </BaseField>
    </>
  );
}
