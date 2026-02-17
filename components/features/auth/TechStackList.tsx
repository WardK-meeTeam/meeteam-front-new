import { ChevronsLeftRight, X } from 'lucide-react';

type TechStackListProps = {
  itemsByLabel: Record<string, string[]>;
  orderedLabels: string[];
  onRemove: (label: string, tech: string) => void;
};

export default function TechStackList({
  itemsByLabel,
  orderedLabels,
  onRemove,
}: TechStackListProps) {
  if (orderedLabels.length === 0) return null;

  return (
    <div className="rounded-2xl border border-[#f1f5f9] bg-[rgba(248,250,252,0.5)] p-6">
      <div className="flex flex-col gap-4">
        {orderedLabels.map((label) => (
          <div key={label} className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-muted-gray font-bold text-[12px]">
              <ChevronsLeftRight width={16} height={16} color="#94a3b8" />
              <span>{label}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(itemsByLabel[label] ?? []).map((tech) => (
                <button
                  key={tech}
                  type="button"
                  className="flex items-center gap-1.5 rounded-xl border border-border-gray bg-white px-3 py-1.5 text-[#334155] shadow-sm"
                >
                  <span className="font-bold text-[12px]">{tech}</span>
                  <X width={12} height={12} color="#94a3b8" onClick={() => onRemove(label, tech)} />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
