"use client";

import { MultiSelectGrid } from "@/components/ui/MultiSelectGrid";
import { StepLayout } from "@/components/ui/StepLayout";
import type { StepProps, Option } from "../types";
import type { Limitation } from "@/types/database";

const LIMIT_OPTIONS: Option<Limitation>[] = [
  { value: "knee_pain", label: "Knee Pain", description: "Discomfort or injury in knees" },
  { value: "back_pain", label: "Back Pain", description: "Lower or upper back issues" },
  { value: "shoulder_pain", label: "Shoulder Pain", description: "Rotator cuff, impingement" },
  { value: "limited_mobility", label: "Limited Mobility", description: "Restricted range of motion" },
  { value: "recovering_injury", label: "Recovering from Injury", description: "Post-surgery or recent injury" },
  { value: "pregnancy", label: "Pregnancy", description: "Prenatal-safe modifications" },
];

export function LimitationsStep({ config, value, onChange, onNext, onBack, onSkip, isFirst, isLast }: StepProps) {
  const limits = (value.limitations as string[]) ?? [];

  return (
    <StepLayout config={config} onNext={onNext} onBack={onBack} onSkip={onSkip} isFirst={isFirst} isLast={isLast}>
      <MultiSelectGrid
        options={LIMIT_OPTIONS}
        selected={limits}
        onToggle={(v) => {
          const next = limits.includes(v)
            ? limits.filter((l) => l !== v)
            : [...limits, v];
          onChange("limitations", next);
        }}
      />
    </StepLayout>
  );
}
