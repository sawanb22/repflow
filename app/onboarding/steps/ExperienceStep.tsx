"use client";

import { Sparkles, TrendingUp, Zap } from "lucide-react";
import { OptionCard } from "@/components/ui/OptionCard";
import { StepLayout } from "@/components/ui/StepLayout";
import type { StepProps, Option } from "../types";
import type { ExperienceLevel } from "@/types/database";

const EXP_OPTIONS: Option<ExperienceLevel>[] = [
  {
    value: "beginner",
    label: "New to Fitness",
    description: "Starting fresh? Perfect. We'll guide you through every move.",
    icon: Sparkles,
  },
  {
    value: "intermediate",
    label: "Some Experience",
    description: "You know the basics. Time to build on that foundation.",
    icon: TrendingUp,
  },
  {
    value: "advanced",
    label: "Very Experienced",
    description: "You've been at this. Let's push your limits and optimize.",
    icon: Zap,
  },
];

export function ExperienceStep({ config, value, onChange, onNext, onBack, isFirst, isLast }: StepProps) {
  const level = value.experience_level as string;

  return (
    <StepLayout config={config} onNext={onNext} onBack={onBack} isFirst={isFirst} isLast={isLast}>
      <div className="space-y-3">
        {EXP_OPTIONS.map((opt) => (
          <OptionCard
            key={opt.value}
            selected={level === opt.value}
            icon={opt.icon}
            label={opt.label}
            description={opt.description}
            onClick={() => onChange("experience_level", opt.value)}
          />
        ))}
      </div>
    </StepLayout>
  );
}
