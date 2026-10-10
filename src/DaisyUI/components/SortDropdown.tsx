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
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="default">à¦¸à¦¾à¦œà¦¾à¦¨: à¦¡à¦¿à¦«à¦²à§à¦Ÿ</option>
      <option value="price-asc">
        à¦¦à¦¾à¦®: à¦•à¦® à¦¥à§‡à¦•à§‡ à¦¬à§‡à¦¶à¦¿
      </option>
      <option value="price-desc">
        à¦¦à¦¾à¦®: à¦¬à§‡à¦¶à¦¿ à¦¥à§‡à¦•à§‡ à¦•à¦®
      </option>
    </select>
  );
}
