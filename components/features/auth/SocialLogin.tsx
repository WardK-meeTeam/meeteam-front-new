import Github from '@/assets/GithubLogin.svg';
import Google from '@/assets/Google.svg';
import Image from 'next/image';

export default function SocialLogin() {
  return (
    <section className="flex flex-col gap-8 w-full mb-0">
      <div className="flex items-center gap-4">
        <hr className="h-px border-[#F1F5F9] grow" />
        <span className="font-normal text-[12px] leading-4 text-muted-gray">간편 로그인</span>
        <hr className="h-px border-[#F1F5F9] grow" />
      </div>

      <div className="flex w-full gap-3 items-start">
        <button
          type="button"
          className="flex flex-1 gap-2 py-3 items-center justify-center rounded-xl border border-slate-200 cursor-pointer"
        >
          <Image src={Google} alt="google" width={20} height={20} />
          <span className="text-[#334155] font-bold text-3.5">Google</span>
        </button>
        <button
          type="button"
          className="flex flex-1 gap-2 py-3 items-center justify-center bg-[#24292f] rounded-xl cursor-pointer"
        >
          <Image src={Github} alt="github" width={20} height={20} />
          <span className="text-white font-bold text-3.5">GitHub</span>
        </button>
      </div>
    </section>
  );
}
