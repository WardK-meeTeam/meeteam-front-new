import { Link, Camera, Trash2, CircleCheck } from 'lucide-react';
import Github from '@/assets/GithubLogin.svg';
import BaseField from '@/components/shared/BaseField';
import BaseInput from '@/components/shared/BaseInput';

type ProfileExtraSectionProps = {
  onChangeProject: React.ChangeEventHandler<HTMLInputElement>;
  onChangeGithubLink: React.ChangeEventHandler<HTMLInputElement>;
  onChangeBlogLink: React.ChangeEventHandler<HTMLInputElement>;
  onChangeProfileImage: React.ChangeEventHandler<HTMLInputElement>;
  onRemoveProfileImage: () => void;
  profileImageName: string;
  profileImagePreviewUrl: string;
};

export default function ProfileExtraSection({
  onChangeProject,
  onChangeGithubLink,
  onChangeBlogLink,
  onChangeProfileImage,
  onRemoveProfileImage,
  profileImageName,
  profileImagePreviewUrl,
}: ProfileExtraSectionProps) {
  const githubIcon = <Github className="w-5 h-5 text-muted-gray" />;
  const hasProfileImage = Boolean(profileImagePreviewUrl);

  return (
    <>
      <BaseField label="프로젝트 경험 횟수" htmlFor="project">
        <BaseInput
          id="project"
          type="number"
          placeholder="0"
          rightIcon={'회'}
          onChange={onChangeProject}
        />
      </BaseField>

      <div className="flex gap-4">
        <BaseField label="GitHub" htmlFor="github" required={false}>
          <BaseInput
            id="github"
            type="text"
            placeholder="github.com/..."
            leftIcon={githubIcon}
            onChange={onChangeGithubLink}
          />
        </BaseField>
        <BaseField label="블로그" htmlFor="blog" required={false}>
          <BaseInput
            id="blog"
            type="text"
            placeholder="URL 입력"
            leftIcon={<Link width={20} height={20} color="#94a3b8" />}
            onChange={onChangeBlogLink}
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
        />
        {!hasProfileImage ? (
          <div className="flex p-5 items-center border border-border-gray justify-between rounded-2xl bg-[#f8fafc]">
            <div className="flex items-center gap-4">
              <div className="bg-white border border-border-gray rounded-full w-12 h-12 flex items-center justify-center">
                <Camera width={20} height={20} color="#94a3b8" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-text-black text-sm font-bold">
                  나를 표현하는 사진을 올려주세요
                </span>
                <span className="text-text-gray text-[12px] font-normal leading-4">
                  JPG, PNG (최대 10MB)
                </span>
              </div>
            </div>
            <label
              htmlFor="profile-upload"
              className="cursor-pointer select-none rounded-lg px-4 py-2 border border-border-gray bg-white text-[12px] font-bold text-[#334155] hover:bg-slate-50 active:scale-[0.99]"
            >
              업로드
            </label>
          </div>
        ) : (
          <div className="flex p-5 items-center border border-border-gray justify-between rounded-2xl bg-white">
            <div className="flex items-center gap-4 min-w-0">
              <img
                src={profileImagePreviewUrl}
                alt="프로필 미리보기"
                className="w-13 h-full rounded-full bg-white flex-[1_0_0]"
              />
              <div className="flex flex-col min-w-0">
                <span className="text-text-black text-[15px] font-bold">프로필 사진 등록 완료</span>
                <div className="flex items-center gap-1.5 min-w-0">
                  <CircleCheck width={12} height={12} color="#4f46e5" />
                  <span className="text-brand-500 text-[12px] font-bold">{profileImageName}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <label
                htmlFor="profile-upload"
                className="cursor-pointer select-none rounded-xl px-5 py-2.5 border border-border-gray bg-[#f8fafc] text-sm font-bold text-project-status-closed"
              >
                사진 변경
              </label>
              <button
                type="button"
                onClick={onRemoveProfileImage}
                className="w-10 h-10 rounded-xl bg-[#ef4444] flex items-center justify-center hover:opacity-90"
                aria-label="프로필 사진 삭제"
              >
                <Trash2 width={20} height={20} color="#ffffff" />
              </button>
            </div>
          </div>
        )}
      </BaseField>
    </>
  );
}
