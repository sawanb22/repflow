"use client";

import { OptionCard } from "./OptionCard";
import type { Option } from "@/app/onboarding/types";

type Props = {
  options: Option[];
  selected: string[];
  onToggle: (value: string) => void;
  minSelect?: number;
  maxSelect?: number;
  error?: string;
};

export function MultiSelectGrid({ options, selected, onToggle, minSelect, maxSelect, error }: Props) {
  const atMax = maxSelect != null && selected.length >= maxSelect;

  return (
    <div>
      <div className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-3">
        {options.map((opt) => {
          const isSelected = selected.includes(opt.value);
          const disabled = !isSelected && atMax;
          return (
            <OptionCard
              key={opt.value}
              selected={isSelected}
              icon={opt.icon}
              emoji={opt.emoji}
              label={opt.label}
              description={opt.description}
              onClick={() => onToggle(opt.value)}
              disabled={disabled}
            />
          );
        })}
      </div>
      {error && (
        <p className="mt-2 text-xs text-[#E06560]">{error}</p>
      )}
      {minSelect != null && selected.length < minSelect && !error && (
        <p className="mt-2 text-xs text-[#484542]">Select at least {minSelect}</p>
      )}
    </div>
  );
}
