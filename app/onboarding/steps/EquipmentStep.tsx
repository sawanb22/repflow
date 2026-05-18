"use client";

import { ChipSelect } from "@/components/ui/ChipSelect";
import { StepLayout } from "@/components/ui/StepLayout";
import type { StepProps, Option } from "../types";

const EQUIPMENT_OPTIONS: Option[] = [
  { value: "bodyweight", label: "Bodyweight Only" },
  { value: "dumbbells", label: "Dumbbells" },
  { value: "resistance_bands", label: "Resistance Bands" },
  { value: "kettlebell", label: "Kettlebell" },
  { value: "jump_rope", label: "Jump Rope" },
  { value: "full_gym", label: "Full Gym" },
];

export function EquipmentStep({ config, value, onChange, onNext, onBack, isFirst, isLast }: StepProps) {
  const equipment = (value.equipment_list as string[]) ?? [];

  const toggleEquip = (v: string) => {
    if (v === "bodyweight") {
      onChange("equipment_list", ["bodyweight"]);
      return;
    }
    let next = equipment.includes(v)
      ? equipment.filter((e) => e !== v)
      : [...equipment.filter((e) => e !== "bodyweight"), v];
    if (next.length === 0) next = ["bodyweight"];
    onChange("equipment_list", next);
  };

  return (
    <StepLayout config={config} onNext={onNext} onBack={onBack} isFirst={isFirst} isLast={isLast}>
      <ChipSelect options={EQUIPMENT_OPTIONS} selected={equipment} onToggle={toggleEquip} />
    </StepLayout>
  );
}
