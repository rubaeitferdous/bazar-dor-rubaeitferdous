type SortMode = "default" | "price-asc" | "price-desc";

export default function SortDropdown({
  value,
  onChange,
}: {
  value: SortMode;
  onChange: (value: SortMode) => void;
}) {
  return (
    <label className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm">
      <span>সাজান</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as SortMode)}
        className="bg-transparent pr-1 text-sm font-medium text-slate-700 outline-none"
        aria-label="Sort products"
      >
        <option value="default">ডিফল্ট</option>
        <option value="price-asc">দাম: কম থেকে বেশি</option>
        <option value="price-desc">দাম: বেশি থেকে কম</option>
      </select>
    </label>
  );
}
