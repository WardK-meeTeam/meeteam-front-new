import { ChevronDown, ChevronUp } from 'lucide-react';
import SelectMenu from '@/components/shared/SelectMenu';

type BaseDropdownProps = {
  value?: string;
  placeholder: string;
  open: boolean;
  items: string[];
  onToggle: () => void;
  onSelect: (value: string) => void;
  disabled?: boolean;
  containerClassName?: string;
  buttonClassName?: string;
  textClassName?: string;
  selectMenuClassName?: string;
};

export default function BaseDropdown({
  value,
  placeholder,
  open,
  items,
  onToggle,
  onSelect,
  disabled = false,
  containerClassName = '',
  buttonClassName = '',
  textClassName = '',
  selectMenuClassName = '',
}: BaseDropdownProps) {
  const label = value || placeholder;

  return (
    <div className={`relative ${containerClassName}`}>
      <button
        type="button"
        onClick={onToggle}
        disabled={disabled}
        className={`flex w-full rounded-xl border border-border-gray text-[#334155]
          disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-muted-gray ${buttonClassName}`}
      >
        <span className={textClassName}>{label}</span>
        {open ? (
          <ChevronUp width={16} height={16} color="#94a3b8" />
        ) : (
          <ChevronDown width={16} height={16} color="#94a3b8" />
        )}
      </button>
      {open && items.length > 0 && (
        <SelectMenu items={items} onSelect={onSelect} className={selectMenuClassName} />
      )}
    </div>
  );
}
