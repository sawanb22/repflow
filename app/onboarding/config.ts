import type { StepConfig } from "./types";
import { WelcomeStep } from "./steps/WelcomeStep";
import { GoalStep } from "./steps/GoalStep";
import { TrainingStyleStep } from "./steps/TrainingStyleStep";
import { EquipmentStep } from "./steps/EquipmentStep";
import { ScheduleStep } from "./steps/ScheduleStep";
import { ExperienceStep } from "./steps/ExperienceStep";
import { LimitationsStep } from "./steps/LimitationsStep";
import { SummaryStep } from "./steps/SummaryStep";

export const ONBOARDING_STEPS: StepConfig[] = [
  {
    id: "welcome",
    title: "Welcome to RepFlow",
    subtitle: "Your personal fitness journey starts here",
    description: "Let's build a plan that fits your life, your goals, and your body.",
    fields: [],
    skippable: false,
    component: WelcomeStep,
  },
  {
    id: "goals",
    title: "What are your goals?",
    subtitle: "Select all that apply",
    description: "We'll tailor your workouts to match what you want to achieve.",
    fields: ["fitness_goals"],
    skippable: false,
    component: GoalStep,
  },
  {
    id: "training_style",
    title: "How do you like to train?",
    subtitle: "Pick your preferred environment",
    description: "This helps us recommend the right exercises for your space.",
    fields: ["training_style"],
    skippable: false,
    component: TrainingStyleStep,
  },
  {
    id: "equipment",
    title: "What equipment can you access?",
    subtitle: "Select everything you have",
    description: "Even just your body is enough — we'll work with what you've got.",
    fields: ["equipment_list"],
    skippable: false,
    component: EquipmentStep,
  },
  {
    id: "schedule",
    title: "What's your workout schedule?",
    subtitle: "Be honest — consistency beats intensity",
    fields: ["workout_days_per_week", "workout_duration_min"],
    skippable: false,
    component: ScheduleStep,
  },
  {
    id: "experience",
    title: "What's your experience level?",
    subtitle: "No ego, just honesty",
    description: "This sets your starting point. You can always progress.",
    fields: ["experience_level"],
    skippable: false,
    component: ExperienceStep,
  },
  {
    id: "limitations",
    title: "Any physical considerations?",
    subtitle: "Optional — skip if nothing applies",
    description: "This helps us keep you safe and suggest modifications.",
    fields: ["limitations"],
    skippable: true,
    component: LimitationsStep,
  },
  {
    id: "summary",
    title: "Your profile is ready",
    subtitle: "Here's a quick look at your setup",
    description: "You can change any of this later in settings.",
    fields: [],
    skippable: false,
    component: SummaryStep,
  },
];

export const PROGRESS_LABELS = ONBOARDING_STEPS.slice(1).map((s) => ({
  label: s.id === "summary" ? "Done" : s.title.split(" ").slice(-1)[0],
}));
