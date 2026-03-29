import { Send } from 'lucide-react';
import BaseButton from '@/components/shared/BaseButton';
import BaseTextarea from '@/components/shared/BaseTextarea';

export default function ProjectQnaSection() {
  return (
    <section className="flex w-full flex-col gap-8 pt-34" data-node-id="97:1090">
      <article className="flex items-start gap-4" data-node-id="97:1455">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-border-gray text-sm leading-5 font-bold text-text-gray"
          data-node-id="97:1456"
        >
          이
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2 self-stretch" data-node-id="97:1458">
          <div className="flex w-full items-center gap-2" data-node-id="97:1459">
            <p className="text-base leading-6 font-bold text-text-black" data-node-id="97:1461">
              이우진
            </p>
            <p className="text-xs leading-4 font-normal text-muted-gray" data-node-id="97:1463">
              2024.03.15
            </p>
          </div>

          <p className="w-full text-sm leading-5 font-normal text-text-body" data-node-id="97:1465">
            프로젝트 모임은 매주 무슨 요일에 진행하나요? 오프라인 필참인지 궁금합니다.
          </p>

          <div
            className="flex w-full items-start gap-3 rounded-xl bg-surface-soft p-3"
            data-node-id="97:1466"
          >
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 pt-0.5">
              <Send
                className="h-4 w-4 rotate-[-45deg] text-brand-500"
                aria-hidden
                strokeWidth={2}
              />
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-0.5 self-stretch">
              <div className="flex w-full items-center gap-2" data-node-id="97:1473">
                <p className="text-xs leading-4 font-bold text-brand-700" data-node-id="97:1475">
                  팀장
                </p>
                <p className="text-xs leading-4 font-normal text-muted-gray" data-node-id="97:1477">
                  방금 전
                </p>
              </div>
              <p
                className="text-sm leading-5 font-normal text-project-status-closed"
                data-node-id="97:1479"
              >
                매주 토요일 오후 2시 강남역 부근에서 진행합니다! 월 1회 정도는 온라인으로 대체
                가능합니다.
              </p>
            </div>
          </div>
        </div>
      </article>

      <div className="group/qna relative">
        <div
          className="absolute left-0 top-0 h-10 w-10 rounded-full bg-linear-to-br from-brand-400 to-brand-500"
          aria-hidden
        />

        <div className="ml-14 rounded-2xl border border-border-gray bg-white p-4 shadow-sm transition-colors focus-within:border-brand-500 focus-within:bg-surface-soft">
          <BaseTextarea
            textareaSize="M"
            rows={3}
            className="min-h-15 w-full resize-none rounded-none border-transparent bg-transparent px-0 py-0 pr-2 text-sm text-text-black placeholder:text-muted-gray focus:border-transparent focus:ring-0"
            placeholder="프로젝트에 대해 궁금한 점을 남겨주세요."
          />

          <div className="mt-4 flex justify-end border-t border-surface-soft pt-3">
            <BaseButton
              size="XS"
              className="h-8 rounded-lg border-none bg-divider-soft px-4 text-sm font-bold text-white shadow-none hover:bg-divider-soft group-focus-within/qna:bg-brand-500 group-focus-within/qna:hover:bg-brand-500"
            >
              <Send className="mr-1 h-3.5 w-3.5" aria-hidden strokeWidth={1.8} />
              등록
            </BaseButton>
          </div>
        </div>
      </div>
    </section>
  );
}
