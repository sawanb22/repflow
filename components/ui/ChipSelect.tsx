"use client";

import type { Option } from "@/app/onboarding/types";

type Props = {
  options: Option[];
  selected: string[];
  onToggle: (value: string) => void;
  error?: string;
};

export function ChipSelect({ options, selected, onToggle, error }: Props) {
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const isSelected = selected.includes(opt.value);
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onToggle(opt.value)}
              className={`px-[15px] py-[7px] text-[13px] font-medium rounded-[7px] border transition-all duration-150 ${
                isSelected
                  ? "bg-[var(--color-accent-dim)] text-[var(--color-accent)]"
                  : "bg-[#141414] border-[rgba(255,255,255,0.055)] text-[#888480] hover:border-[rgba(255,255,255,0.10)]"
              }`}
              style={isSelected ? { borderColor: "rgba(var(--color-accent-rgb), 0.30)" } : undefined}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
      {error && <p className="mt-2 text-xs text-[#E06560]">{error}</p>}
    </div>
  );
}
