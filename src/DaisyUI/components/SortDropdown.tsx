"use client";

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <select
      className="select select-bordered select-sm"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      aria-label="Sort products"
    >
      <option value="default">দর: ডিফল্ট</option>
      <option value="price-asc">দর: কম থেকে বেশি</option>
      <option value="price-desc">দর: বেশি থেকে কম</option>
    </select>
  );
}
