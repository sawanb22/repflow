"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

type Props = {
  steps: { label: string }[];
  current: number;
};

export function ProgressBar({ steps, current }: Props) {
  return (
    <div className="progress-scrollbar-hidden w-full overflow-x-auto pb-1">
      <div className="mx-auto flex min-w-[720px] max-w-5xl items-start px-1">
        {steps.map((step, i) => {
          const isCompleted = i < current;
          const isCurrent = i === current;

          return (
            <div key={i} className="flex min-w-0 flex-1 flex-col items-center gap-2">
              <div className="relative flex w-full items-center justify-center">
                {i > 0 && (
                  <div className="absolute right-1/2 top-1/2 h-0.5 w-full -translate-y-1/2 bg-[#141414]">
                    <motion.div
                      className="h-full origin-left bg-[var(--color-accent)]"
                      initial={false}
                      animate={{ scaleX: isCompleted ? 1 : 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  </div>
                )}
                <motion.div
                  initial={false}
                  animate={{
                    scale: isCurrent ? 1.08 : 1,
                    borderColor: isCompleted || isCurrent
                      ? "rgba(var(--color-accent-rgb), 0.30)"
                      : "rgba(255,255,255,0.055)",
                    backgroundColor: isCompleted
                      ? "var(--color-accent)"
                      : "rgb(20,20,20)",
                  }}
                  className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full border-2"
                >
                  {isCompleted ? (
                    <Check className="h-3.5 w-3.5 text-[#0A0A0A]" />
                  ) : (
                    <span className={`font-[family-name:var(--font-barlow-condensed)] text-[11px] font-bold ${isCurrent ? "text-[var(--color-accent)]" : "text-[#484542]"}`}>
                      {i + 1}
                    </span>
                  )}
                </motion.div>
              </div>
              <span
                className={`max-w-[88px] text-center font-[family-name:var(--font-figtree)] text-[10px] font-semibold leading-tight ${
                  isCurrent ? "text-[var(--color-accent)]" : isCompleted ? "text-[#888480]" : "text-[#484542]"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
