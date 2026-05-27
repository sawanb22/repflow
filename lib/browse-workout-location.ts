import type { WorkoutLocation } from "@/types/database";

export function getWorkoutLocationOptionState(
  selectedWorkoutLocation: WorkoutLocation,
  optionValue: WorkoutLocation,
) {
  return {
    active: optionValue === selectedWorkoutLocation,
    disabled: false,
  };
}
