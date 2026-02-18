import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import BaseTextarea from '../components/shared/BaseTextarea';

const meta = {
  title: 'Shared/BaseTextarea',
  component: BaseTextarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    placeholder: '내용을 입력하세요',
    textareaSize: 'M',
    rows: 4,
    full: true,
    disabled: false,
  },
  argTypes: {
    textareaSize: {
      control: 'select',
      options: ['L', 'M', 'S'],
    },
    full: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    rows: {
      control: 'number',
      min: 2,
      max: 20,
    },
  },
} satisfies Meta<typeof BaseTextarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: '비활성화 상태입니다.',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export const AutoWidth: Story = {
  args: {
    full: false,
    value: 'auto width 텍스트영역',
    rows: 3,
  },
};

export const Large: Story = {
  args: {
    textareaSize: 'L',
    rows: 6,
    placeholder: '큰 입력 영역',
  },
};
