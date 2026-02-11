import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Image from 'next/image';
import BaseInput from '../components/shared/BaseInput';
import githubIcon from '../assets/Github.svg';

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="M20 20L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M2 12C4.5 7.5 8 5 12 5C16 5 19.5 7.5 22 12C19.5 16.5 16 19 12 19C8 19 4.5 16.5 2 12Z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const meta = {
  title: 'Shared/BaseInput',
  component: BaseInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    placeholder: '이름을 입력하세요',
    inputSize: 'M',
    full: true,
    disabled: false,
  },
  argTypes: {
    inputSize: {
      control: 'select',
      options: ['L', 'M', 'S'],
    },
    full: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    leftIcon: {
      control: false,
    },
    rightIcon: {
      control: false,
    },
  },
} satisfies Meta<typeof BaseInput>;

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
    value: '비활성화 상태',
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
    value: 'auto width',
  },
};

export const LeftIcon: Story = {
  args: {
    leftIcon: <SearchIcon />,
    placeholder: '검색어를 입력하세요',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export const RightIcon: Story = {
  args: {
    rightIcon: <EyeIcon />,
    placeholder: '비밀번호 입력',
    type: 'password',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export const BothIcons: Story = {
  args: {
    leftIcon: <SearchIcon />,
    rightIcon: <EyeIcon />,
    placeholder: '아이콘 양쪽 입력',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export const GithubIconInput: Story = {
  args: {
    leftIcon: <Image src={githubIcon} width={18} height={18} alt="" aria-hidden="true" />,
    placeholder: 'GitHub 아이디 입력',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};
