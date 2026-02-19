import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import BaseTag from '../components/shared/BaseTag';

const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 17.3l-5.4 2.9 1-6-4.4-4.3 6.1-.9L12 3l2.7 5.5 6.1.9-4.4 4.3 1 6z"
      fill="currentColor"
    />
  </svg>
);

const meta = {
  title: 'Shared/BaseTag',
  component: BaseTag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    size: 'M',
    children: '태그',
    selected: false,
    leftIcon: undefined,
    rightIcon: undefined,
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['L', 'M', 'S'],
    },
    selected: {
      control: 'boolean',
    },
    children: {
      control: 'text',
    },
    leftIcon: {
      control: false,
    },
    rightIcon: {
      control: false,
    },
  },
} satisfies Meta<typeof BaseTag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SizeLarge: Story = {
  args: {
    size: 'L',
    children: '큰 태그',
  },
};

export const SizeSmall: Story = {
  args: {
    size: 'S',
    children: '작은 태그',
  },
};

export const StateMatrix: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        <BaseTag children="기본" />
        <BaseTag selected children="선택됨" />
      </div>
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    leftIcon: <StarIcon />,
    rightIcon: <StarIcon />,
    children: '아이콘 태그',
  },
};

export const Selected: Story = {
  args: {
    selected: true,
    children: '선택됨',
  },
};
