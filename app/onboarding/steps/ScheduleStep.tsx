"use client";

import { Clock } from "lucide-react";
import { StepLayout } from "@/components/ui/StepLayout";
import type { StepProps } from "../types";

const DAYS = [1, 2, 3, 4, 5, 6, 7];
const DURATIONS = [15, 30, 45, 60, 90];

const dayLabels: Record<number, string> = {
  1: "1 day", 2: "2 days", 3: "3 days", 4: "4 days", 5: "5 days", 6: "6 days", 7: "7 days",
};

export function ScheduleStep({ config, value, onChange, onNext, onBack, isFirst, isLast }: StepProps) {
  const days = (value.workout_days_per_week as number) ?? 3;
  const duration = (value.workout_duration_min as number) ?? 30;

  return (
    <StepLayout config={config} onNext={onNext} onBack={onBack} isFirst={isFirst} isLast={isLast}>
      <div className="space-y-8">
        <div>
          <p className="mb-3 text-xs font-semibold text-[#888480]">DAYS PER WEEK</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
            {DAYS.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => onChange("workout_days_per_week", d)}
                className={`py-3 text-xs font-semibold font-[family-name:var(--font-barlow-condensed)] transition-all duration-200 ${
                  days === d
                    ? "bg-[var(--color-accent)] text-[#0A0A0A]"
                    : "border border-[rgba(255,255,255,0.055)] bg-[#141414] text-[#888480]"
                }`}
                style={{ borderRadius: "9px" }}
              >
                {d}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-[#484542]">{dayLabels[days]}</p>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold text-[#888480]">
            <Clock className="mr-1.5 inline h-3.5 w-3.5" />
            WORKOUT DURATION
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
            {DURATIONS.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => onChange("workout_duration_min", d)}
                className={`py-3 text-xs font-semibold font-[family-name:var(--font-barlow-condensed)] transition-all duration-200 ${
                  duration === d
                    ? "bg-[var(--color-accent)] text-[#0A0A0A]"
                    : "border border-[rgba(255,255,255,0.055)] bg-[#141414] text-[#888480]"
                }`}
                style={{ borderRadius: "9px" }}
              >
                {d}m
              </button>
            ))}
          </div>
        </div>
      </div>
    </StepLayout>
  );
}
