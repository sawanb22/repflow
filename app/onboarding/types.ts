import type { LucideIcon } from "lucide-react";
import type { FitnessGoal, TrainingStyle, ExperienceLevel, Limitation } from "@/types/database";

export type StepId =
  | "welcome"
  | "goals"
  | "training_style"
  | "equipment"
  | "schedule"
  | "experience"
  | "limitations"
  | "summary";

export interface Option<T = string> {
  value: T;
  label: string;
  description?: string;
  icon?: LucideIcon;
  emoji?: string;
}

export interface StepConfig {
  id: StepId;
  title: string;
  subtitle: string;
  description?: string;
  fields: string[];
  skippable?: boolean;
  component: React.ComponentType<StepProps>;
}

export interface StepProps {
  config: StepConfig;
  value: Record<string, unknown>;
  onChange: (field: string, value: unknown) => void;
  onNext: () => void;
  onBack: () => void;
  onSkip?: () => void;
  submit?: () => void;
  isSubmitting?: boolean;
  isFirst: boolean;
  isLast: boolean;
}

export interface OnboardingFormValues {
  fitness_goals: FitnessGoal[];
  training_style: TrainingStyle | "";
  equipment_list: string[];
  workout_days_per_week: number;
  workout_duration_min: number;
  experience_level: ExperienceLevel | "";
  limitations: Limitation[];
}
