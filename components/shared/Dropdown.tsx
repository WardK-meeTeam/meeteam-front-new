type DropdownProps = {
  items: string[];
  onSelect: (value: string) => void;
  className?: string;
  itemClassName?: string;
};

export default function Dropdown({
  items,
  onSelect,
  className = '',
  itemClassName = '',
}: DropdownProps) {
  return (
    <ul
      className={`absolute top-full w-full bg-white border border-border-gray rounded-xl shadow-sm z-10 ${className}`}
    >
      {items.map((item) => (
        <li
          key={item}
          className={`px-4 py-2 hover:bg-gray-100 cursor-pointer font-normal text-sm rounded-xl ${itemClassName}`}
          onClick={() => onSelect(item)}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
