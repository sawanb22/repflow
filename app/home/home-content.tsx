"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Activity, Clock3, Flame, Play, Settings } from "lucide-react";
import { AccentPicker } from "@/components/AccentPicker";
import { ExerciseMedia } from "@/components/ui/ExerciseMedia";
import { Greeting } from "./greeting";

type Preferences = {
  workoutLocation: "home" | "gym" | "both";
  goal: "lose_fat" | "build_muscle" | "stay_active";
  equipment: "bodyweight" | "nothing_yet" | "dumbbells" | "resistance_bands" | "kettlebell" | "jump_rope" | "full_gym";
};

type Props = {
  userEmail: string;
  preferences: Preferences;
};

type StatCard = {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

type ExerciseCard = {
  name: string;
  slug: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  goals: Preferences["goal"][];
  equipment: Preferences["equipment"][];
};

const stats: StatCard[] = [
  { value: "14", label: "Day streak", icon: Flame },
  { value: "38", label: "Workouts done", icon: Activity },
  { value: "4.2h", label: "This week", icon: Clock3 },
];

const weeklyActivity = [
  { label: "M", height: "55%", isToday: false, hasFill: true },
  { label: "T", height: "80%", isToday: false, hasFill: true },
  { label: "W", height: "35%", isToday: false, hasFill: true },
  { label: "T", height: "90%", isToday: false, hasFill: true },
  { label: "F", height: "40%", isToday: true, hasFill: true },
  { label: "S", height: "0%", isToday: false, hasFill: false },
  { label: "S", height: "0%", isToday: false, hasFill: false },
] as const;

const recommendedExercises: ExerciseCard[] = [
  {
    name: "Push-Up",
    slug: "push-up",
    difficulty: "beginner",
    goals: ["lose_fat", "build_muscle", "stay_active"],
    equipment: ["bodyweight", "nothing_yet", "dumbbells", "resistance_bands", "kettlebell", "jump_rope"],
  },
  {
    name: "Dumbbell Goblet Squat",
    slug: "dumbbell-goblet-squat",
    difficulty: "intermediate",
    goals: ["lose_fat", "build_muscle", "stay_active"],
    equipment: ["dumbbells", "full_gym"],
  },
  {
    name: "Plank",
    slug: "plank",
    difficulty: "beginner",
    goals: ["lose_fat", "stay_active"],
    equipment: ["bodyweight", "nothing_yet", "dumbbells", "resistance_bands", "kettlebell", "jump_rope"],
  },
  {
    name: "Bicep Curl",
    slug: "bicep-curl",
    difficulty: "advanced",
    goals: ["build_muscle"],
    equipment: ["dumbbells", "full_gym"],
  },
  {
    name: "High Knees Jump Rope",
    slug: "high-knees-jump-rope",
    difficulty: "intermediate",
    goals: ["lose_fat", "stay_active"],
    equipment: ["jump_rope"],
  },
  {
    name: "Boxer Step Jump Rope",
    slug: "boxer-step-jump-rope",
    difficulty: "beginner",
    goals: ["lose_fat", "stay_active"],
    equipment: ["jump_rope"],
  },
];

const difficultyClasses = {
  beginner: "bg-[rgba(77,200,123,0.10)] text-[var(--color-success)]",
  intermediate: "bg-[rgba(201,168,122,0.10)] text-[var(--color-accent)]",
  advanced: "bg-[rgba(224,101,96,0.10)] text-[var(--color-danger)]",
} as const;

function ExerciseArtworkFallback() {
  return (
    <svg viewBox="0 0 155 96" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      <rect width="155" height="96" fill="var(--bg-3)" />
      <path d="M50 60 Q65 30 77 40 Q89 50 105 25" fill="none" stroke="rgba(201,168,122,0.22)" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="77" cy="40" r="4" fill="rgba(201,168,122,0.25)" />
      <circle cx="105" cy="25" r="4" fill="rgba(201,168,122,0.4)" />
      <circle cx="50" cy="60" r="4" fill="rgba(201,168,122,0.15)" />
    </svg>
  );
}

function SectionHeader({ title, linkLabel, href }: { title: string; linkLabel: string; href: string }) {
  return (
    <div className="mb-3 flex items-baseline justify-between">
      <h2
        className="font-[family-name:var(--font-barlow-condensed)] text-[19px] font-bold text-[var(--color-text-primary)]"
        style={{ letterSpacing: "0.2px" }}
      >
        {title}
      </h2>
      <Link href={href} className="text-[12px] text-[var(--color-accent)]">
        {linkLabel}
      </Link>
    </div>
  );
}

export function HomeContent({ userEmail, preferences }: Props) {
  const showWeeklyActivity = preferences.workoutLocation !== "gym";
  const personalizedExercises = useMemo(() => (
    recommendedExercises.filter((exercise) => (
      exercise.goals.includes(preferences.goal) &&
      (preferences.equipment === "full_gym" || exercise.equipment.includes(preferences.equipment))
    ))
  ), [preferences.equipment, preferences.goal]);

  return (
    <div className="px-8 py-7">
      <div className="flex items-start justify-between">
        <Greeting email={userEmail} />
        <div className="flex items-center gap-[10px]">
          <AccentPicker />
          <button
            type="button"
            className="flex h-[36px] w-[36px] items-center justify-center border bg-[var(--bg-2)] text-[var(--color-text-secondary)] transition-all hover:border-[rgba(255,255,255,0.10)] hover:text-[var(--color-text-primary)]"
            style={{
              border: "var(--border-subtle)",
              borderRadius: "8px",
              transition: "var(--transition-fast)",
            }}
            title="Settings"
            aria-label="Open settings"
          >
            <Settings className="h-[17px] w-[17px]" />
          </button>
        </div>
      </div>

      <div className="mb-5 mt-[22px] grid grid-cols-3 gap-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="flex items-center gap-3 border bg-[var(--bg-2)]"
              style={{
                border: "var(--border-subtle)",
                borderRadius: "var(--radius-lg)",
                padding: "16px 18px",
              }}
            >
              <div
                className="flex items-center justify-center bg-[var(--color-accent-dim)] text-[var(--color-accent)]"
                style={{ width: "38px", height: "38px", borderRadius: "9px" }}
              >
                <Icon className="h-[19px] w-[19px]" />
              </div>
              <div>
                <div
                  className="font-[family-name:var(--font-barlow-condensed)] text-[28px] font-extrabold leading-none text-[var(--color-text-primary)]"
                >
                  {stat.value}
                </div>
                <div className="mt-[2px] text-[11px] text-[var(--color-text-muted)]">{stat.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="relative mb-6 overflow-hidden border bg-[var(--bg-2)]"
        style={{
          border: "var(--border-subtle)",
          borderRadius: "var(--radius-xl)",
          padding: "22px 24px",
        }}
      >
        <div
          aria-hidden="true"
          className="absolute rounded-full"
          style={{
            right: "-30px",
            top: "-30px",
            width: "140px",
            height: "140px",
            background: "var(--color-accent-glow)",
          }}
        />
        <div className="relative z-10">
          <div
            className="mb-[7px] text-[10px] font-bold uppercase text-[var(--color-accent)]"
            style={{ letterSpacing: "1.5px" }}
          >
            Today · Push Day
          </div>
          <h2
            className="mb-[5px] font-[family-name:var(--font-barlow-condensed)] text-[30px] font-black text-[var(--color-text-primary)]"
            style={{ letterSpacing: "-0.3px" }}
          >
            Upper Body Strength
          </h2>
          <p className="mb-4 text-[13px] text-[var(--color-text-secondary)]">
            6 exercises · 45 min · Intermediate
          </p>
          <div className="flex items-center gap-3">
            <Link
              href="/home/exercise/push-up"
              className="inline-flex items-center gap-2 bg-[var(--color-accent)] text-[#0A0A0A]"
              style={{
                padding: "11px 22px",
                borderRadius: "9px",
                fontFamily: "var(--font-barlow-condensed)",
                fontSize: "16px",
                fontWeight: 800,
                letterSpacing: "0.8px",
                textTransform: "uppercase",
              }}
            >
              <Play className="h-[14px] w-[14px] fill-current" />
              Start Workout
            </Link>
            <div className="flex gap-[6px]">
              {[
                "Chest",
                "Shoulders",
                "Triceps",
              ].map((pill) => (
                <span
                  key={pill}
                  className="border bg-[var(--bg-3)] px-[11px] py-[5px] text-[11px] font-semibold text-[var(--color-text-muted)]"
                  style={{ border: "var(--border-subtle)", borderRadius: "5px" }}
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showWeeklyActivity ? (
        <>
          <SectionHeader title="Weekly Activity" linkLabel="Full history →" href="/home/progress" />
          <div className="mb-6 flex h-[52px] items-end gap-2">
            {weeklyActivity.map((day) => (
              <div key={`${day.label}-${day.height}`} className="flex flex-1 flex-col items-center gap-1">
                <div className="flex w-full flex-1 items-end rounded-[4px] bg-[var(--bg-3)]">
                  {day.hasFill ? (
                    <div
                      className="w-full rounded-[4px] bg-[var(--color-accent)]"
                      style={{
                        height: day.height,
                        opacity: day.isToday ? 1 : 0.8,
                      }}
                    />
                  ) : null}
                </div>
                <div
                  className="text-[10px] font-semibold"
                  style={{ color: day.isToday ? "var(--color-accent)" : "var(--color-text-muted)" }}
                >
                  {day.label}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : null}

      {personalizedExercises.length > 0 ? (
        <>
          <SectionHeader title="Recommended For You" linkLabel="Browse all →" href="/home/browse" />
          <div className="grid grid-cols-[repeat(auto-fill,minmax(155px,1fr))] gap-3">
            {personalizedExercises.map((exercise) => (
              <Link
                key={exercise.slug}
                href={`/home/exercise/${exercise.slug}`}
                className="overflow-hidden border bg-[var(--bg-2)] transition-all duration-200 hover:-translate-y-[2px] hover:border-[rgba(255,255,255,0.10)]"
                style={{ border: "var(--border-subtle)", borderRadius: "var(--radius-lg)" }}
              >
                <ExerciseMedia
                  slug={exercise.slug}
                  videoUrl={null}
                  mode="image-first"
                  alt={exercise.name}
                  sizes="(min-width: 1024px) 155px, (min-width: 768px) 25vw, 50vw"
                  className="h-[96px]"
                  fallback={<ExerciseArtworkFallback />}
                />
                <div style={{ padding: "11px 12px" }}>
                  <div className="mb-[7px] text-[13px] font-semibold text-[var(--color-text-primary)]">
                    {exercise.name}
                  </div>
                  <span
                    className={`inline-block rounded-[4px] px-[8px] py-[3px] text-[10px] font-bold uppercase ${difficultyClasses[exercise.difficulty]}`}
                    style={{ letterSpacing: "0.5px" }}
                  >
                    {exercise.difficulty}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
