"use client";

import { Flame, Dumbbell, Heart, StretchVertical, Brain } from "lucide-react";
import { OptionCard } from "@/components/ui/OptionCard";
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
      <div>
        <div className="grid grid-cols-1 gap-3 min-[700px]:grid-cols-2 min-[700px]:gap-4">
          {GOAL_OPTIONS.map((opt, index) => {
            const isSelected = goals.includes(opt.value);

            return (
              <OptionCard
                key={opt.value}
                selected={isSelected}
                icon={opt.icon}
                label={opt.label}
                description={opt.description}
                onClick={() => {
                  const next = goals.includes(opt.value)
                    ? goals.filter((g) => g !== opt.value)
                    : [...goals, opt.value];
                  onChange("fitness_goals", next);
                }}
                className={`!p-5 ${index === GOAL_OPTIONS.length - 1 && GOAL_OPTIONS.length % 2 === 1 ? "min-[700px]:col-span-2" : ""}`}
              />
            );
          })}
        </div>
        {goals.length < 1 && (
          <p className="mt-2 text-xs text-[#484542]">Select at least 1</p>
        )}
      </div>
    </StepLayout>
  );
}
