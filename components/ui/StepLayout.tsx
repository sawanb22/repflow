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
    <div className="flex flex-col min-h-0 flex-1">
      <div className="mb-8">
        <h2 className="font-[family-name:var(--font-barlow-condensed)] text-xl font-bold text-[#F0EBE3]">{config.title}</h2>
        <p className="mt-1 text-sm text-[#888480]">{config.subtitle}</p>
        {config.description && (
          <p className="mt-2 text-xs text-[#484542] leading-relaxed">{config.description}</p>
        )}
      </div>

      <div className="flex-1">
        {children}
      </div>

      <div className="mt-8 flex gap-3">
        {!isFirst && onBack && (
          <button
            type="button"
            onClick={onBack}
            className={`flex-1 ${btnBase} border border-[rgba(255,255,255,0.10)] bg-transparent text-[#888480] hover:bg-[#141414] hover:border-[rgba(255,255,255,0.18)] hover:text-[#F0EBE3] px-[22px] py-[11px]`}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        )}
        {config.skippable && onSkip && (
          <button
            type="button"
            onClick={onSkip}
            className={`flex-1 ${btnBase} text-[#888480] hover:text-[#F0EBE3] px-[22px] py-[11px]`}
          >
            Skip
          </button>
        )}
        {!isLast && (
          <button
            type="button"
            onClick={onNext}
            disabled={!canAdvance}
            className={`flex-1 ${btnBase} bg-[#C9A87A] text-[#0A0A0A] hover:opacity-90 active:opacity-80 active:scale-[0.98] disabled:opacity-35 px-[22px] py-[11px]`}
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
