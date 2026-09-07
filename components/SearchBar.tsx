type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: Props) {
  return (
    <div className="px-4 sm:px-8">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar por título o autor..."
        className="w-full rounded-full border-2 border-lilac/30 bg-white px-5 py-3 font-body text-plum placeholder:text-plum/40 outline-none focus:border-lilac transition-colors"
      />
    </div>
  );
}
