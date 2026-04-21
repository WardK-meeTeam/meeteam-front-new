type TeammateFilterChipProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

export function TeammateFilterChip({ label, active, onClick }: TeammateFilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-cy="teammate-role-filter"
      data-role={label}
      aria-pressed={active}
      className={`rounded-full px-3.5 py-1.5 text-sm leading-5 transition-all ${
        active
          ? 'bg-text-black font-medium text-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]'
          : 'font-normal text-text-gray hover:text-text-black'
      }`}
    >
      {label}
    </button>
  );
}
