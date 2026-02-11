import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import BaseField from '../components/shared/BaseField';
import BaseInput from '../components/shared/BaseInput';

const meta = {
  title: 'Shared/BaseField',
  component: BaseField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    label: '비밀번호',
    htmlFor: 'password',
    required: true,
    hintText: '',
    errorText: '',
  },
  argTypes: {
    children: {
      control: false,
    },
  },
} satisfies Meta<typeof BaseField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: 320 }}>
      <BaseField {...args}>
        <BaseInput id="password" placeholder="8자 이상 입력" />
      </BaseField>
    </div>
  ),
};

export const Optional: Story = {
  args: {
    required: false,
  },
  render: (args) => (
    <div style={{ width: 320 }}>
      <BaseField {...args}>
        <BaseInput id="password-required" placeholder="비밀번호 입력" />
      </BaseField>
    </div>
  ),
};

export const WithError: Story = {
  args: {
    errorText: '비밀번호가 너무 짧습니다.',
  },
  render: (args) => (
    <div style={{ width: 320 }}>
      <BaseField {...args}>
        <BaseInput id="password-error" placeholder="비밀번호 입력" />
      </BaseField>
    </div>
  ),
};
