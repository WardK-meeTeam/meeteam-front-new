import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ProjectHero from "../components/features/project/ProjectHero";

const meta = {
  title: "Features/Project/ProjectHero",
  component: ProjectHero,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    title: "AI 기반 뉴스 요약 서비스 개발",
    description: "바쁜 현대인을 위한 3줄 뉴스 요약 서비스입니다.",
    category: "AI/테크",
    type: "WEB",
    deadline: "2026-01-23 마감",
    isOwner: false,
  },
  argTypes: {
    title: {
      control: "text",
      description: "프로젝트 제목",
    },
    description: {
      control: "text",
      description: "프로젝트 설명",
    },
    category: {
      control: "text",
      description: "프로젝트 카테고리",
    },
    type: {
      control: "text",
      description: "프로젝트 타입",
    },
    deadline: {
      control: "text",
      description: "프로젝트 마감일",
    },
    isOwner: {
      control: "boolean",
      description: "프로젝트 소유자 여부 (프로젝트 관리 버튼 표시)",
    },
  },
} satisfies Meta<typeof ProjectHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px" }}>
        <Story />
      </div>
    ),
  ],
};

export const WithOwner: Story = {
  args: {
    isOwner: true,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px" }}>
        <Story />
      </div>
    ),
  ],
};

export const LongTitle: Story = {
  args: {
    title: "매우 긴 프로젝트 제목이 들어갈 경우 어떻게 표시되는지 확인하기 위한 테스트 케이스입니다",
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px" }}>
        <Story />
      </div>
    ),
  ],
};

export const LongDescription: Story = {
  args: {
    description:
      "이 프로젝트는 매우 긴 설명이 들어갈 경우 어떻게 표시되는지 확인하기 위한 테스트 케이스입니다. 여러 줄에 걸쳐서 설명이 표시되어야 하며, 적절한 줄바꿈과 간격이 유지되어야 합니다.",
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px" }}>
        <Story />
      </div>
    ),
  ],
};

export const DifferentCategory: Story = {
  args: {
    category: "여행",
    type: "모바일",
    deadline: "2025-12-31 마감",
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px" }}>
        <Story />
      </div>
    ),
  ],
};

export const UrgentDeadline: Story = {
  args: {
    deadline: "2025-01-15 마감",
    isOwner: true,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px" }}>
        <Story />
      </div>
    ),
  ],
};

