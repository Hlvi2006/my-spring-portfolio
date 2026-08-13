"use client";

const OPTIONS: { value: string; label: string }[] = [
  { value: "amount_desc", label: "Sort by Amount" },
  { value: "amount_desc", label: "Amount ↓" },
  { value: "amount_asc", label: "Amount ↑" },
  { value: "name_asc", label: "Name A–Z" },
  { value: "name_desc", label: "Name Z–A" },
];

export function SortControl({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <label className="font-mono text-[11px] uppercase tracking-wide text-muted">
        Sort
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-line bg-panel px-2 py-1.5 font-mono text-xs text-ink outline-none focus:border-teal"
      >
        {OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
