"use client";

import { Flame, Dumbbell, Heart, StretchVertical, Brain } from "lucide-react";
import { MultiSelectGrid } from "@/components/ui/MultiSelectGrid";
import { StepLayout } from "@/components/ui/StepLayout";
import type { StepProps, Option } from "../types";
import type { FitnessGoal } from "@/types/database";

const GOAL_OPTIONS: Option<FitnessGoal>[] = [
  { value: "lose_fat", label: "Lose Fat", description: "Burn calories, shed weight, lean out", icon: Flame },
  { value: "build_muscle", label: "Build Muscle", description: "Get stronger, increase definition", icon: Dumbbell },
  { value: "stay_active", label: "Stay Active", description: "Move daily, feel good, maintain health", icon: Heart },
  { value: "improve_flexibility", label: "Improve Flexibility", description: "Better mobility, fewer injuries", icon: StretchVertical },
  { value: "reduce_stress", label: "Reduce Stress", description: "Calm the mind, recover, recharge", icon: Brain },
];

export function GoalStep({ config, value, onChange, onNext, onBack, isFirst, isLast }: StepProps) {
  const goals = (value.fitness_goals as string[]) ?? [];

  return (
    <StepLayout config={config} onNext={onNext} onBack={onBack} isFirst={isFirst} isLast={isLast}>
      <MultiSelectGrid
        options={GOAL_OPTIONS}
        selected={goals}
        onToggle={(v) => {
          const next = goals.includes(v)
            ? goals.filter((g) => g !== v)
            : [...goals, v];
          onChange("fitness_goals", next);
        }}
        minSelect={1}
      />
    </StepLayout>
  );
}
