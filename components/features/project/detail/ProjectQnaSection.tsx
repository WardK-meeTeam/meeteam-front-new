'use client';

import { type FormEvent, useEffect, useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { useAuthRequiredModal } from '@/components/features/auth/useAuthRequiredModal';
import BaseButton from '@/components/shared/BaseButton';
import BaseTextarea from '@/components/shared/BaseTextarea';
import ProfileAvatar from '@/components/shared/ProfileAvatar';
import SkeletonBlock from '@/components/shared/SkeletonBlock';
import { useAuthStore } from '@/stores/useAuthStore';
import type { ProjectRecord } from '@/types/project';
import {
  createProjectQnaAnswer,
  createProjectQnaQuestion,
  fetchProjectQnas,
  type ProjectQna,
  type ProjectQnaAnswer,
} from './projectQnaApi';

const QNA_PAGE_SIZE = 10;

function formatQnaDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

function Avatar({
  name,
  imageUrl,
  sizeClassName = 'h-10 w-10',
}: {
  name: string;
  imageUrl: string;
  sizeClassName?: string;
}) {
  return (
    <ProfileAvatar
      name={name}
      imageUrl={imageUrl}
      sizeClassName={sizeClassName}
      textClassName="text-sm"
      className="bg-border-gray text-text-gray"
    />
  );
}

function QnaAnswerItem({ answer }: { answer: ProjectQnaAnswer }) {
  return (
    <div className="flex w-full items-start gap-3 rounded-xl bg-surface-soft p-3">
      <Avatar
        name={answer.writerName}
        imageUrl={answer.writerProfileImageUrl}
        sizeClassName="h-6 w-6 text-xs"
      />

      <div className="flex min-w-0 flex-1 flex-col gap-0.5 self-stretch">
        <div className="flex w-full items-center gap-2">
          <p className="text-xs leading-4 font-bold text-brand-700">
            {answer.isLeader ? '팀장' : answer.writerName}
          </p>
          <p className="text-xs leading-4 font-normal text-muted-gray">
            {formatQnaDate(answer.createdAt)}
          </p>
        </div>
        <p className="text-sm leading-5 font-normal whitespace-pre-wrap text-project-status-closed">
          {answer.content}
        </p>
      </div>
    </div>
  );
}

function ProjectQnaSkeleton() {
  return (
    <div className="space-y-8">
      {Array.from({ length: 3 }).map((_, index) => (
        <article key={`qna-skeleton-${index}`} className="flex items-start gap-4">
          <SkeletonBlock className="h-10 w-10 rounded-full" />
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <div className="flex items-center gap-2">
              <SkeletonBlock className="h-5 w-24" />
              <SkeletonBlock className="h-4 w-20" />
            </div>
            <SkeletonBlock className="h-5 w-full" />
            <SkeletonBlock className="h-5 w-4/5" />
            <SkeletonBlock className="h-20 w-full rounded-xl" />
          </div>
        </article>
      ))}
    </div>
  );
}

function canWriteAnswer(project: ProjectRecord, qna: ProjectQna, memberId: number | null) {
  if (!memberId) {
    return false;
  }

  return memberId === qna.questionerId || memberId === project.leaderProfileId;
}

export default function ProjectQnaSection({ project }: { project: ProjectRecord }) {
  const handleAuthRequired = useAuthRequiredModal();
  const memberId = useAuthStore((state) => state.memberId);
  const [qnas, setQnas] = useState<ProjectQna[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [questionDraft, setQuestionDraft] = useState('');
  const [answerDrafts, setAnswerDrafts] = useState<Record<number, string>>({});
  const [isQuestionSubmitting, setIsQuestionSubmitting] = useState(false);
  const [submittingAnswerId, setSubmittingAnswerId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const loadQnas = async () => {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const result = await fetchProjectQnas(project.id, 0, QNA_PAGE_SIZE);

        if (!active) {
          return;
        }

        setQnas(result.qnas);
        setPage(result.page);
        setHasMore(result.hasMore);
      } catch (error) {
        if (!active) {
          return;
        }

        setErrorMessage(error instanceof Error ? error.message : 'Q&A 목록을 불러오지 못했습니다.');
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    void loadQnas();

    return () => {
      active = false;
    };
  }, [project.id]);

  const replaceQna = (nextQna: ProjectQna) => {
    setQnas((current) => current.map((qna) => (qna.id === nextQna.id ? nextQna : qna)));
  };

  const handleQuestionSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const question = questionDraft.trim();

    if (!question) {
      setErrorMessage('질문 내용을 입력해 주세요.');
      return;
    }

    try {
      setIsQuestionSubmitting(true);
      setErrorMessage(null);

      const nextQna = await createProjectQnaQuestion(project.id, question);

      setQnas((current) => [nextQna, ...current]);
      setQuestionDraft('');
    } catch (error) {
      if (handleAuthRequired(error, { redirectPath: `/projects/${project.id}` })) {
        return;
      }

      setErrorMessage(error instanceof Error ? error.message : '질문 등록 중 오류가 발생했습니다.');
    } finally {
      setIsQuestionSubmitting(false);
    }
  };

  const handleAnswerSubmit = async (qnaId: number) => {
    const answer = answerDrafts[qnaId]?.trim() ?? '';

    if (!answer) {
      setErrorMessage('답변 내용을 입력해 주세요.');
      return;
    }

    try {
      setSubmittingAnswerId(qnaId);
      setErrorMessage(null);

      const nextQna = await createProjectQnaAnswer(project.id, qnaId, answer);

      replaceQna(nextQna);
      setAnswerDrafts((current) => ({ ...current, [qnaId]: '' }));
    } catch (error) {
      if (handleAuthRequired(error, { redirectPath: `/projects/${project.id}` })) {
        return;
      }

      setErrorMessage(error instanceof Error ? error.message : '답변 등록 중 오류가 발생했습니다.');
    } finally {
      setSubmittingAnswerId(null);
    }
  };

  const handleLoadMore = async () => {
    if (!hasMore || isLoadingMore) {
      return;
    }

    try {
      setIsLoadingMore(true);
      setErrorMessage(null);

      const result = await fetchProjectQnas(project.id, page + 1, QNA_PAGE_SIZE);

      setQnas((current) => [...current, ...result.qnas]);
      setPage(result.page);
      setHasMore(result.hasMore);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Q&A 목록을 더 불러오지 못했습니다.',
      );
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <section className="flex w-full flex-col gap-8 pt-34" data-node-id="97:1090">
      {errorMessage ? (
        <div className="rounded-2xl border border-border-gray bg-danger-soft px-5 py-4 text-sm leading-6 text-danger-500">
          {errorMessage}
        </div>
      ) : null}

      {isLoading ? (
        <ProjectQnaSkeleton />
      ) : qnas.length > 0 ? (
        <div className="space-y-8">
          {qnas.map((qna) => {
            const canAnswer = canWriteAnswer(project, qna, memberId);

            return (
              <article key={qna.id} className="flex items-start gap-4" data-node-id="97:1455">
                <Avatar name={qna.questionerName} imageUrl={qna.questionerProfileImageUrl} />

                <div
                  className="flex min-w-0 flex-1 flex-col gap-3 self-stretch"
                  data-node-id="97:1458"
                >
                  <div className="flex w-full items-center gap-2" data-node-id="97:1459">
                    <p
                      className="text-base leading-6 font-bold text-text-black"
                      data-node-id="97:1461"
                    >
                      {qna.questionerName}
                    </p>
                    <p
                      className="text-xs leading-4 font-normal text-muted-gray"
                      data-node-id="97:1463"
                    >
                      {formatQnaDate(qna.createdAt)}
                    </p>
                  </div>

                  <p
                    className="w-full text-sm leading-5 font-normal whitespace-pre-wrap text-text-body"
                    data-node-id="97:1465"
                  >
                    {qna.question}
                  </p>

                  {qna.answers.map((answer) => (
                    <QnaAnswerItem key={answer.id} answer={answer} />
                  ))}

                  {canAnswer ? (
                    <div className="rounded-2xl border border-border-gray bg-white p-3">
                      <BaseTextarea
                        textareaSize="S"
                        rows={2}
                        value={answerDrafts[qna.id] ?? ''}
                        onChange={(event) =>
                          setAnswerDrafts((current) => ({
                            ...current,
                            [qna.id]: event.target.value,
                          }))
                        }
                        className="min-h-16 resize-none border-transparent bg-transparent px-0 py-0 focus:border-transparent focus:ring-0"
                        placeholder="답변을 남겨주세요."
                        disabled={submittingAnswerId === qna.id}
                      />
                      <div className="mt-3 flex justify-end border-t border-surface-soft pt-3">
                        <BaseButton
                          size="XS"
                          onClick={() => void handleAnswerSubmit(qna.id)}
                          disabled={submittingAnswerId === qna.id}
                          className="h-8 rounded-lg border-none bg-brand-500 px-4 text-sm font-bold text-white shadow-none hover:bg-brand-400"
                        >
                          <Send className="mr-1 h-3.5 w-3.5" aria-hidden strokeWidth={1.8} />
                          {submittingAnswerId === qna.id ? '등록 중' : '답변'}
                        </BaseButton>
                      </div>
                    </div>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-border-gray bg-white px-6 py-12 text-center shadow-sm">
          <MessageCircle className="mx-auto h-8 w-8 text-brand-500" aria-hidden strokeWidth={1.8} />
          <p className="mt-3 text-base leading-6 font-bold text-text-black">
            아직 등록된 Q&A가 없습니다.
          </p>
          <p className="mt-1 text-sm leading-5 text-text-gray">
            프로젝트에 대해 궁금한 점을 가장 먼저 남겨보세요.
          </p>
        </div>
      )}

      {hasMore ? (
        <BaseButton
          size="S"
          variant="gray"
          onClick={() => void handleLoadMore()}
          disabled={isLoadingMore}
          className="mx-auto"
        >
          {isLoadingMore ? '불러오는 중' : 'Q&A 더보기'}
        </BaseButton>
      ) : null}

      <form className="group/qna relative" onSubmit={handleQuestionSubmit}>
        <div
          className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-brand-400 to-brand-500"
          aria-hidden
        >
          <Send className="h-4 w-4 rotate-[-45deg] text-white" aria-hidden strokeWidth={2} />
        </div>

        <div className="ml-14 rounded-2xl border border-border-gray bg-white p-4 shadow-sm transition-colors focus-within:border-brand-500 focus-within:bg-surface-soft">
          <BaseTextarea
            textareaSize="M"
            rows={3}
            value={questionDraft}
            onChange={(event) => setQuestionDraft(event.target.value)}
            className="min-h-15 w-full resize-none rounded-none border-transparent bg-transparent px-0 py-0 pr-2 text-sm text-text-black placeholder:text-muted-gray focus:border-transparent focus:ring-0"
            placeholder="프로젝트에 대해 궁금한 점을 남겨주세요."
            disabled={isQuestionSubmitting}
          />

          <div className="mt-4 flex justify-end border-t border-surface-soft pt-3">
            <BaseButton
              type="submit"
              size="XS"
              disabled={isQuestionSubmitting}
              className="h-8 rounded-lg border-none bg-divider-soft px-4 text-sm font-bold text-white shadow-none hover:bg-divider-soft group-focus-within/qna:bg-brand-500 group-focus-within/qna:hover:bg-brand-500"
            >
              <Send className="mr-1 h-3.5 w-3.5" aria-hidden strokeWidth={1.8} />
              {isQuestionSubmitting ? '등록 중' : '등록'}
            </BaseButton>
          </div>
        </div>
      </form>
    </section>
  );
}
