import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  return (
    <section className="space-y-6 md:space-y-8 bg-white p-10 max-w-130 w-full rounded-3xl flex flex-col shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)]">
      <Link href="/auth/login" className="flex cursor-pointer max-w-20 gap-1">
        <ChevronLeft width={20} height={20} color="#64748b" />
        <span className="text-text-gray text-[14px] font-bold">뒤로가기</span>
      </Link>
      <div className="flex flex-col justify-end gap-2">
        <h1 className="text-text-black font-extrabold text-3xl leading-9">회원가입</h1>
        <h2 className="text-text-gray font-medium text-[16px] leading-5">
          MeeTeam과 함께 멋진 프로젝트를 시작해보세요.
        </h2>
      </div>
    </section>
  );
}
