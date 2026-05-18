"use client";

import { Home, Building2, Shuffle, Flower2, Wind } from "lucide-react";
import { OptionCard } from "@/components/ui/OptionCard";
import { StepLayout } from "@/components/ui/StepLayout";
import type { StepProps, Option } from "../types";
import type { TrainingStyle } from "@/types/database";

const STYLE_OPTIONS: Option<TrainingStyle>[] = [
  { value: "home", label: "Home", description: "Work out in your own space, no commute", icon: Home },
  { value: "gym", label: "Gym", description: "Full access to machines, weights, and classes", icon: Building2 },
  { value: "hybrid", label: "Hybrid", description: "Best of both — mix home and gym sessions", icon: Shuffle },
  { value: "yoga", label: "Yoga", description: "Flexibility, balance, and mind-body connection", icon: Flower2 },
  { value: "breathwork", label: "Breathwork & Recovery", description: "Calm your nervous system, recover deeply", icon: Wind },
];

export function TrainingStyleStep({ config, value, onChange, onNext, onBack, isFirst, isLast }: StepProps) {
  const style = value.training_style as string;

  return (
    <StepLayout config={config} onNext={onNext} onBack={onBack} isFirst={isFirst} isLast={isLast}>
      <div className={config.description ? "" : "grid grid-cols-1 gap-3"}>
        <div className="space-y-3">
          {STYLE_OPTIONS.map((opt) => (
            <OptionCard
              key={opt.value}
              selected={style === opt.value}
              icon={opt.icon}
              label={opt.label}
              description={opt.description}
              onClick={() => onChange("training_style", opt.value)}
            />
          ))}
        </div>
      </div>
    </StepLayout>
  );
}
