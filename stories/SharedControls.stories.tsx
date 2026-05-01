import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import BaseButton from '@/components/shared/BaseButton';
import BaseDropdown from '@/components/shared/BaseDropdown';
import BaseModal from '@/components/shared/BaseModal';
import ConfirmModal from '@/components/shared/ConfirmModal';
import SelectMenu from '@/components/shared/SelectMenu';
import SortSelect from '@/components/shared/SortSelect';
import TechStackPicker from '@/components/shared/TechStackPicker';

const techOptions = ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Zod'];

const meta = {
  title: 'Shared/Controls',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function DropdownExample() {
  const [value, setValue] = useState('프론트엔드');
  const [open, setOpen] = useState(true);

  return (
    <div className="h-48 w-72 rounded-2xl border border-mt-border bg-mt-white p-5 shadow-sm">
      <BaseDropdown
        value={value}
        placeholder="직군 선택"
        open={open}
        items={['프론트엔드', '백엔드', '디자이너', 'PM/기획']}
        onToggle={() => setOpen((current) => !current)}
        onSelect={(nextValue) => {
          setValue(nextValue);
          setOpen(false);
        }}
        buttonClassName="items-center justify-between px-4 py-3"
        textClassName="text-sm font-bold"
      />
    </div>
  );
}

function SortSelectExample() {
  const [sort, setSort] = useState<'latest' | 'deadline' | 'popular'>('latest');

  return (
    <div className="rounded-2xl border border-mt-border bg-mt-bg-soft p-5 shadow-sm">
      <SortSelect
        value={sort}
        dataCy="storybook-sort-select"
        options={[
          { label: '최신순', value: 'latest' },
          { label: '마감 임박순', value: 'deadline' },
          { label: '인기순', value: 'popular' },
        ]}
        onChange={setSort}
      />
    </div>
  );
}

function TechStackPickerExample() {
  const [value, setValue] = useState(['React', 'TypeScript']);

  return (
    <div className="w-96 rounded-2xl border border-mt-border bg-mt-white p-5 shadow-sm">
      <TechStackPicker
        options={techOptions}
        value={value}
        onChange={setValue}
        enableSelectedChipReorder
        rankedChipCount={3}
      />
    </div>
  );
}

function ModalExample() {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex h-48 items-center justify-center">
      <BaseButton onClick={() => setOpen(true)}>모달 열기</BaseButton>
      <BaseModal isOpen={open} onClose={() => setOpen(false)}>
        <div className="rounded-2xl bg-mt-white p-6 shadow-2xl">
          <h2 className="text-xl font-extrabold text-mt-text-primary">기본 모달</h2>
          <p className="mt-2 text-sm leading-6 text-mt-text-secondary">
            콘텐츠를 자유롭게 넣을 수 있는 공통 모달입니다.
          </p>
          <div className="mt-6 flex justify-end">
            <BaseButton size="M" onClick={() => setOpen(false)}>
              확인
            </BaseButton>
          </div>
        </div>
      </BaseModal>
    </div>
  );
}

function ConfirmModalExample() {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex h-48 items-center justify-center">
      <BaseButton onClick={() => setOpen(true)}>확인 모달 열기</BaseButton>
      <ConfirmModal
        isOpen={open}
        title="지원서를 제출할까요?"
        description="제출 후에는 리더가 지원서를 검토할 수 있습니다."
        closeLabel="취소"
        confirmLabel="제출하기"
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
      >
        <div className="rounded-xl bg-mt-bg-soft px-4 py-3 text-sm text-mt-text-secondary">
          프로젝트: 세종대 학생 팀빌딩 플랫폼 리뉴얼
        </div>
      </ConfirmModal>
    </div>
  );
}

export const Dropdown: Story = {
  render: () => <DropdownExample />,
};

export const SelectMenuOnly: Story = {
  render: () => (
    <div className="relative h-40 w-64 rounded-2xl border border-mt-border bg-mt-white p-5 shadow-sm">
      <SelectMenu
        items={['전체', '모집중', '마감']}
        onSelect={(value) => console.log('select', value)}
      />
    </div>
  ),
};

export const Sort: Story = {
  render: () => <SortSelectExample />,
};

export const TechStacks: Story = {
  render: () => <TechStackPickerExample />,
};

export const Modal: Story = {
  render: () => <ModalExample />,
};

export const Confirm: Story = {
  render: () => <ConfirmModalExample />,
};
