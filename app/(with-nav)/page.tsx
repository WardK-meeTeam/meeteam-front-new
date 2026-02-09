import { ProjectCard } from "@/components/features/project/ProjectCard";

const sampleProjects = [
  {
    id: 1,
    title: "AI 기반 뉴스 요약 플랫폼",
    imageUrl: "/file.svg",
    category: "사이드 프로젝트",
    deadline: "2/28",
    currentMembers: 3,
    maxMembers: 5,
    leader: {
      name: "정리더",
      avatar: "/next.svg",
    },
    tags: ["Next.js", "TypeScript", "Zustand"],
    recruitInfo: [
      {
        id: "r1",
        role: "프론트엔드",
        subRoles: ["React", "UI"],
        status: "open",
        current: 1,
        max: 2,
      },
      {
        id: "r2",
        role: "디자이너",
        subRoles: ["Figma"],
        status: "closed",
        current: 1,
        max: 1,
      },
    ],
  },
  {
    id: 2,
    title: "지역 커뮤니티 모임 서비스",
    imageUrl: "/window.svg",
    category: "스터디",
    deadline: "3/10",
    currentMembers: 2,
    maxMembers: 4,
    leader: {
      name: "홍팀장",
      avatar: "/vercel.svg",
    },
    tags: ["Next.js", "Tailwind"],
    recruitInfo: [
      {
        id: "r3",
        role: "백엔드",
        subRoles: ["Node.js", "DB"],
        status: "open",
        current: 0,
        max: 1,
      },
    ],
  },
];

export default function Page() {
  return (
    <section className="space-y-6 md:space-y-8">
      <h1 className="text-2xl font-semibold text-text-black">메인 페이지</h1>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sampleProjects.map((project) => (
          <li key={project.id}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  );
}
