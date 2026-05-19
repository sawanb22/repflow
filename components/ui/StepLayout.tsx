"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import type { StepConfig } from "@/app/onboarding/types";

type Props = {
  config: StepConfig;
  children: React.ReactNode;
  onNext: () => void;
  onBack?: () => void;
  onSkip?: () => void;
  isFirst: boolean;
  isLast: boolean;
  canAdvance?: boolean;
};

const btnBase = "font-[family-name:var(--font-barlow-condensed)] font-extrabold uppercase tracking-[0.8px] transition-all duration-200 inline-flex items-center justify-center gap-1.5";

export function StepLayout({ config, children, onNext, onBack, onSkip, isFirst, isLast, canAdvance = true }: Props) {
  return (
    <div className="flex min-h-full flex-col">
      <div className="mb-6 shrink-0 sm:mb-8">
        <h2 className="font-[family-name:var(--font-barlow-condensed)] text-xl font-bold text-[#F0EBE3] sm:text-2xl">{config.title}</h2>
        <p className="mt-1 text-sm text-[#888480]">{config.subtitle}</p>
        {config.description && (
          <p className="mt-2 max-w-2xl text-xs leading-relaxed text-[#484542]">{config.description}</p>
        )}
      </div>

      <div className="flex-1">
        {children}
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-[rgba(255,255,255,0.055)] pt-4 sm:mt-8 sm:flex-row sm:pt-6">
        {!isFirst && onBack && (
          <button
            type="button"
            onClick={onBack}
            className={`w-full sm:flex-1 ${btnBase} border border-[rgba(255,255,255,0.10)] bg-transparent px-[22px] py-4 text-[#888480] hover:border-[rgba(255,255,255,0.18)] hover:bg-[#141414] hover:text-[#F0EBE3]`}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        )}
        {config.skippable && onSkip && (
          <button
            type="button"
            onClick={onSkip}
            className={`w-full sm:flex-1 ${btnBase} px-[22px] py-4 text-[#888480] hover:text-[#F0EBE3]`}
          >
            Skip
          </button>
        )}
        {!isLast && (
          <button
            type="button"
            onClick={onNext}
            disabled={!canAdvance}
            className={`w-full sm:flex-1 ${btnBase} bg-[var(--color-accent)] px-[22px] py-4 text-[#0A0A0A] hover:opacity-90 active:scale-[0.98] active:opacity-80 disabled:opacity-35`}
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
