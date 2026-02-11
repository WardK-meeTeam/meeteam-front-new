import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import BaseButton from '../components/shared/BaseButton';

const meta = {
  title: 'Shared/BaseButton',
  component: BaseButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children: '로그인',
    size: 'M',
    variant: 'primary',
    full: false,
    disabled: false,
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['XL', 'L', 'M', 'S', 'XS'],
    },
    variant: {
      control: 'select',
      options: ['primary', 'gray'],
    },
    full: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    onClick: {
      control: false,
    },
  },
} satisfies Meta<typeof BaseButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FullWidth: Story = {
  args: {
    full: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export const GrayVariant: Story = {
  args: {
    variant: 'gray',
    children: '취소',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: '비활성화',
  },
};

export const WithOnClick: Story = {
  args: {
    children: '클릭 테스트',
    onClick: () => {
      console.log('BaseButton clicked');
    },
  },
};
