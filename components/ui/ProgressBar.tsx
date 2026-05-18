"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

type Props = {
  steps: { label: string }[];
  current: number;
};

export function ProgressBar({ steps, current }: Props) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, i) => {
          const isCompleted = i < current;
          const isCurrent = i === current;

          return (
            <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
              <div className="relative flex items-center w-full">
                {i > 0 && (
                  <div className="absolute right-1/2 top-1/2 -translate-y-1/2 h-0.5 w-full bg-[#141414]">
                    <motion.div
                      className="h-full bg-[#C9A87A] origin-left"
                      initial={false}
                      animate={{ scaleX: isCompleted ? 1 : 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  </div>
                )}
                <motion.div
                  initial={false}
                  animate={{
                    scale: isCurrent ? 1.1 : 1,
                    borderColor: isCompleted || isCurrent
                      ? "rgba(201,168,122,0.30)"
                      : "rgba(255,255,255,0.055)",
                    backgroundColor: isCompleted
                      ? "rgb(201,168,122)"
                      : "rgb(20,20,20)",
                  }}
                  className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full border-2"
                >
                  {isCompleted ? (
                    <Check className="h-3.5 w-3.5 text-[#0A0A0A]" />
                  ) : (
                    <span className={`text-[11px] font-bold font-[family-name:var(--font-barlow-condensed)] ${isCurrent ? "text-[#C9A87A]" : "text-[#484542]"}`}>
                      {i + 1}
                    </span>
                  )}
                </motion.div>
              </div>
              <span
                className={`text-[10px] font-semibold text-center leading-tight font-[family-name:var(--font-figtree)] ${
                  isCurrent ? "text-[#C9A87A]" : isCompleted ? "text-[#888480]" : "text-[#484542]"
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
