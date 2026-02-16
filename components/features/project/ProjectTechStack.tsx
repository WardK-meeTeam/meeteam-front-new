import { Code2 } from 'lucide-react';

export interface TechStackCategory {
  /** e.g. "프론트엔드", "백엔드" */
  domain: string;
  /** e.g. "웹프론트엔드", "AI" */
  subdomain: string;
  skills: string[];
}

export interface ProjectTechStackProps {
  categories: TechStackCategory[];
}

export default function ProjectTechStack({ categories }: ProjectTechStackProps) {
  return (
    <section>
      <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-text-black">
        <Code2 className="h-5 w-5 shrink-0 text-muted-gray" />
        필요 기술 스택
      </h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {categories.map((cat) => (
          <article
            key={`${cat.domain}-${cat.subdomain}`}
            className="rounded-2xl border border-border-gray bg-white p-5"
          >
            <p className="mb-3 text-sm">
              <span className="font-bold text-text-black">{cat.domain}</span>
              <span className="text-xs font-normal text-text-gray border-l border-border-gray pl-2 ml-2 leading-none">
                {' '}
                {cat.subdomain}
              </span>
            </p>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg bg-tech-tag-bg px-3 py-1.5 text-xs font-bold text-tech-tag-text"
                >
                  {skill}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
