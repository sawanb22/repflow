"use client";

import {
  Flame, Dumbbell, Heart, StretchVertical, Brain,
  Home, Building2, Shuffle, Flower2, Wind,
  Clock, Target, Sparkles, TrendingUp, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { StepLayout } from "@/components/ui/StepLayout";
import type { StepProps } from "../types";
import type { FitnessGoal, TrainingStyle, ExperienceLevel, Limitation } from "@/types/database";

const goalIcons: Record<FitnessGoal, typeof Flame> = {
  lose_fat: Flame,
  build_muscle: Dumbbell,
  stay_active: Heart,
  improve_flexibility: StretchVertical,
  reduce_stress: Brain,
};

const styleIcons: Record<TrainingStyle, typeof Home> = {
  home: Home,
  gym: Building2,
  hybrid: Shuffle,
  yoga: Flower2,
  breathwork: Wind,
};

const expIcons: Record<ExperienceLevel, typeof Sparkles> = {
  beginner: Sparkles,
  intermediate: TrendingUp,
  advanced: Zap,
};

const limitLabels: Record<Limitation, string> = {
  knee_pain: "Knee Pain",
  back_pain: "Back Pain",
  shoulder_pain: "Shoulder Pain",
  limited_mobility: "Limited Mobility",
  recovering_injury: "Recovering from Injury",
  pregnancy: "Pregnancy",
};

const expLabels: Record<ExperienceLevel, string> = {
  beginner: "New to Fitness",
  intermediate: "Some Experience",
  advanced: "Very Experienced",
};

const styleLabels: Record<TrainingStyle, string> = {
  home: "Home",
  gym: "Gym",
  hybrid: "Hybrid",
  yoga: "Yoga",
  breathwork: "Breathwork & Recovery",
};

const cardClass = "bg-[#141414] border border-[rgba(255,255,255,0.055)] p-4";
const cardClassRounded = `${cardClass} rounded-2xl`;

export function SummaryStep({ config, value, onBack, isFirst, isLast, onNext, submit, isSubmitting }: StepProps) {
  const goals = (value.fitness_goals as FitnessGoal[]) ?? [];
  const style = value.training_style as TrainingStyle | "";
  const equipment = (value.equipment_list as string[]) ?? [];
  const days = (value.workout_days_per_week as number) ?? 3;
  const duration = (value.workout_duration_min as number) ?? 30;
  const exp = value.experience_level as ExperienceLevel | "";
  const limits = (value.limitations as Limitation[]) ?? [];

  const StyleIcon = style ? styleIcons[style as TrainingStyle] : null;
  const ExpIcon = exp ? expIcons[exp as ExperienceLevel] : null;
  const handleSubmit = submit ?? onNext;

  return (
    <StepLayout config={config} onBack={onBack} isFirst={isFirst} isLast={isLast} onNext={handleSubmit}>
      <div className="space-y-4">
        {goals.length > 0 && (
          <div className={cardClassRounded}>
            <p className="text-[10px] font-semibold uppercase tracking-[1px] text-[#888480] mb-2">Goals</p>
            <div className="flex flex-wrap gap-1.5">
              {goals.map((g) => {
                const GI = goalIcons[g];
                return (
                  <span key={g} className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-[rgba(201,168,122,0.09)] text-[#C9A87A] border border-[rgba(201,168,122,0.20)]">
                    <GI className="h-3 w-3" /> {g.replace(/_/g, " ")}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {StyleIcon && style && (
          <div className={`${cardClassRounded} flex items-center gap-3`}>
            <StyleIcon className="h-5 w-5 text-[#C9A87A]" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[1px] text-[#888480]">Training Style</p>
              <p className="text-sm font-semibold text-[#F0EBE3]">{styleLabels[style as TrainingStyle]}</p>
            </div>
          </div>
        )}

        {equipment.length > 0 && (
          <div className={cardClassRounded}>
            <p className="text-[10px] font-semibold uppercase tracking-[1px] text-[#888480] mb-2">Equipment</p>
            <div className="flex flex-wrap gap-1.5">
              {equipment.map((e) => (
                <span key={e} className="text-xs px-2 py-1 rounded-md bg-[#1C1C1C] text-[#888480] border border-[rgba(255,255,255,0.055)]">
                  {e.replace(/_/g, " ")}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div className={`${cardClassRounded} flex items-center gap-3`}>
            <Target className="h-5 w-5 text-[#C9A87A]" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[1px] text-[#888480]">Schedule</p>
              <p className="text-sm font-semibold text-[#F0EBE3]">{days}x / week</p>
            </div>
          </div>
          <div className={`${cardClassRounded} flex items-center gap-3`}>
            <Clock className="h-5 w-5 text-[#C9A87A]" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[1px] text-[#888480]">Duration</p>
              <p className="text-sm font-semibold text-[#F0EBE3]">{duration} min</p>
            </div>
          </div>
        </div>

        {ExpIcon && exp && (
          <div className={`${cardClassRounded} flex items-center gap-3`}>
            <ExpIcon className="h-5 w-5 text-[#C9A87A]" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[1px] text-[#888480]">Experience</p>
              <p className="text-sm font-semibold text-[#F0EBE3]">{expLabels[exp as ExperienceLevel]}</p>
            </div>
          </div>
        )}

        {limits.length > 0 && (
          <div className={cardClassRounded}>
            <p className="text-[10px] font-semibold uppercase tracking-[1px] text-[#888480] mb-2">Considerations</p>
            <div className="flex flex-wrap gap-1.5">
              {limits.map((l) => (
                <span key={l} className="text-xs px-2 py-1 rounded-md bg-[rgba(224,101,96,0.08)] text-[#E06560] border border-[rgba(224,101,96,0.15)]">
                  {limitLabels[l]}
                </span>
              ))}
            </div>
          </div>
        )}

        <Button size="lg" onClick={handleSubmit} loading={isSubmitting} className="w-full">
          Start My Journey
        </Button>
      </div>
    </StepLayout>
  );
}
