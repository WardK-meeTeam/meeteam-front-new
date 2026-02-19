import { Link, Camera } from 'lucide-react';
import Github from '@/assets/Github.svg';
import BaseField from '@/components/shared/BaseField';
import BaseInput from '@/components/shared/BaseInput';
import Image from 'next/image';

export default function ProfileExtraSection() {
  return (
    <>
      <BaseField label="프로젝트 경험 횟수" htmlFor="project">
        <BaseInput id="project" type="number" placeholder="0" rightIcon={'회'} />
      </BaseField>

      <div className="flex gap-4">
        <BaseField label="GitHub" htmlFor="github" required={false}>
          <BaseInput
            id="github"
            type="text"
            placeholder="github.com/..."
            leftIcon={<Image src={Github} width={20} height={20} alt="깃허브" />}
          />
        </BaseField>
        <BaseField label="블로그" htmlFor="blog" required={false}>
          <BaseInput
            id="blog"
            type="text"
            placeholder="URL 입력"
            leftIcon={<Link width={20} height={20} color="#94a3b8" />}
          />
        </BaseField>
      </div>

      <BaseField label="프로필 사진" htmlFor="profile">
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
          {/* right button */}
          <div className="shrink-0">
            <input id="profile" type="file" accept="image/png, image/jpeg" className="hidden" />
            <label
              htmlFor="profile"
              className="cursor-pointer select-none rounded-lg px-4 py-2 border border-border-gray bg-white text-[12px] font-bold text-[#334155] hover:bg-slate-50 active:scale-[0.99]"
            >
              업로드
            </label>
          </div>
        </div>
      </BaseField>
    </>
  );
}
