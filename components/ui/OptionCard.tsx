"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Props = {
  selected: boolean;
  icon?: LucideIcon;
  emoji?: string;
  label: string;
  description?: string;
  onClick: () => void;
  disabled?: boolean;
};

export function OptionCard({ selected, icon: Icon, emoji, label, description, onClick, disabled }: Props) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.01 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ duration: 0.15 }}
      className={`relative w-full text-left border p-4 transition-all duration-200 ${
        selected
          ? "bg-[rgba(201,168,122,0.09)] border-[rgba(201,168,122,0.30)]"
          : "bg-[#141414] border-[rgba(255,255,255,0.055)] hover:border-[rgba(255,255,255,0.10)]"
      } ${disabled ? "opacity-35 cursor-not-allowed" : "cursor-pointer"}`}
      style={{ borderRadius: "12px" }}
    >
      {selected && (
        <div className="absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#C9A87A]">
          <Check className="h-3 w-3 text-[#0A0A0A]" />
        </div>
      )}
      <div className="flex flex-col gap-1.5">
        {emoji && <span className="text-xl">{emoji}</span>}
        {Icon && <Icon className={`h-5 w-5 ${selected ? "text-[#C9A87A]" : "text-[#888480]"}`} />}
        <span className={`text-sm font-semibold ${selected ? "text-[#C9A87A]" : "text-[#F0EBE3]"}`}>
          {label}
        </span>
        {description && (
          <span className="text-xs text-[#888480] leading-relaxed">{description}</span>
        )}
      </div>
    </motion.button>
  );
}
