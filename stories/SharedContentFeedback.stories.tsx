import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import MarkdownContent from '@/components/shared/MarkdownContent';
import MarkdownEditor from '@/components/shared/MarkdownEditor';
import ToastMessage from '@/components/shared/ToastMessage';
import ToastViewport from '@/components/shared/ToastViewport';
import { useToastStore } from '@/stores/useToastStore';

const markdownSample = `## 프로젝트 소개
함께 성장하는 팀을 위한 **서비스 리뉴얼** 프로젝트입니다.

- Next.js App Router 기반
- TypeScript와 Tailwind CSS 사용
- 접근성과 컴포넌트 재사용성 개선

> 빠르게 실험하고 명확하게 기록하는 팀을 지향합니다.

\`\`\`ts
const stack = ['Next.js', 'TypeScript', 'Zustand'];
\`\`\``;

const meta = {
  title: 'Shared/Content & Feedback',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function MarkdownEditorExample() {
  const [value, setValue] = useState(markdownSample);

  return (
    <div className="w-screen max-w-3xl px-6">
      <MarkdownEditor value={value} onChange={setValue} rows={8} />
    </div>
  );
}

function ToastExample() {
  const showToast = useToastStore((state) => state.showToast);

  useEffect(() => {
    const ids = [
      showToast({
        tone: 'success',
        message: '프로필이 저장되었습니다.',
        durationMs: 10000,
      }),
      showToast({
        tone: 'info',
        message: '새로운 지원자가 도착했습니다.',
        durationMs: 10000,
      }),
      showToast({
        tone: 'error',
        message: '일시적인 오류가 발생했습니다.',
        durationMs: 10000,
      }),
    ];

    return () => {
      ids.forEach((id) => useToastStore.getState().dismissToast(id));
    };
  }, [showToast]);

  return (
    <div className="h-72 w-96 rounded-2xl border border-mt-border bg-mt-bg-soft p-6 shadow-sm">
      <p className="text-sm leading-6 text-mt-text-secondary">
        토스트는 화면 하단 중앙에 고정되어 표시됩니다.
      </p>
      <ToastViewport />
    </div>
  );
}

export const Markdown: Story = {
  render: () => (
    <div className="w-screen max-w-2xl rounded-2xl border border-mt-border bg-mt-white p-6 shadow-sm">
      <MarkdownContent value={markdownSample} />
    </div>
  ),
};

export const MarkdownEmpty: Story = {
  render: () => (
    <div className="w-96 rounded-2xl border border-mt-border bg-mt-white p-6 shadow-sm">
      <MarkdownContent value="" />
    </div>
  ),
};

export const Editor: Story = {
  render: () => <MarkdownEditorExample />,
};

export const Toasts: Story = {
  render: () => (
    <>
      <ToastMessage message="스토리 진입 시 한 번 호출되는 토스트입니다." tone="info" />
      <ToastExample />
    </>
  ),
};
