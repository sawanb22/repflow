"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import type { ComponentType } from "react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Activity, Clock3, Flame, Play, Settings } from "lucide-react";
import { AccentPicker } from "@/components/AccentPicker";
import { ExerciseMedia } from "@/components/ui/ExerciseMedia";
import type { WorkoutPlanExercise } from "@/types/database";
import { createClient } from "@/utils/supabase/client";
import { SkeletonButtonContent } from "@/components/ui/Skeleton";
import { toast } from "@/lib/toast-store";
import { getWeeklyActivityAnimationConfig } from "@/lib/weekly-activity-animation";
import { Greeting } from "./greeting";

type Preferences = {
  workoutLocation: "home" | "gym" | "both";
  goal: "lose_fat" | "build_muscle" | "stay_active";
  equipment: "bodyweight" | "nothing_yet" | "dumbbells" | "resistance_bands" | "kettlebell" | "jump_rope" | "full_gym";
};

type DashboardDay = {
  label: string;
  height: string;
  isToday: boolean;
  hasFill: boolean;
  minutes: number;
};

type TodayWorkout = {
  eyebrow: string;
  title: string;
  meta: string;
  pills: string[];
  activePlanId: string | null;
  sessionId: string | null;
  isRestDay: boolean;
  planExercises: WorkoutPlanExercise[];
};

type Props = {
  userEmail: string;
  preferences: Preferences;
  dashboard: {
    currentStreak: string;
    totalWorkouts: string;
    thisWeek: string;
    weeklyActivity: DashboardDay[];
    planProgress: number;
    todayWorkout: TodayWorkout;
  };
};

type StatCard = {
  value: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
};

type ExerciseCard = {
  name: string;
  slug: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  goals: Preferences["goal"][];
  equipment: Preferences["equipment"][];
  workoutLocation: "home" | "gym";
};

const recommendedExercises: ExerciseCard[] = [
  {
    name: "Push-Up",
    slug: "push-up",
    difficulty: "beginner",
    goals: ["lose_fat", "build_muscle", "stay_active"],
    equipment: ["bodyweight", "nothing_yet", "dumbbells", "resistance_bands", "kettlebell", "jump_rope"],
    workoutLocation: "home",
  },
  {
    name: "Dumbbell Goblet Squat",
    slug: "dumbbell-goblet-squat",
    difficulty: "intermediate",
    goals: ["lose_fat", "build_muscle", "stay_active"],
    equipment: ["dumbbells", "full_gym"],
    workoutLocation: "home",
  },
  {
    name: "Plank",
    slug: "plank",
    difficulty: "beginner",
    goals: ["lose_fat", "stay_active"],
    equipment: ["bodyweight", "nothing_yet", "dumbbells", "resistance_bands", "kettlebell", "jump_rope"],
    workoutLocation: "home",
  },
  {
    name: "Bicep Curl",
    slug: "bicep-curl",
    difficulty: "advanced",
    goals: ["build_muscle"],
    equipment: ["dumbbells", "full_gym"],
    workoutLocation: "home",
  },
  {
    name: "High Knees Jump Rope",
    slug: "high-knees-jump-rope",
    difficulty: "intermediate",
    goals: ["lose_fat", "stay_active"],
    equipment: ["jump_rope"],
    workoutLocation: "home",
  },
  {
    name: "Boxer Step Jump Rope",
    slug: "boxer-step-jump-rope",
    difficulty: "beginner",
    goals: ["lose_fat", "stay_active"],
    equipment: ["jump_rope"],
    workoutLocation: "home",
  },
  {
    name: "Barbell Bench Press",
    slug: "barbell-bench-press",
    difficulty: "intermediate",
    goals: ["build_muscle", "stay_active"],
    equipment: ["full_gym"],
    workoutLocation: "gym",
  },
  {
    name: "Lat Pulldown",
    slug: "lat-pulldown",
    difficulty: "beginner",
    goals: ["build_muscle", "stay_active"],
    equipment: ["full_gym"],
    workoutLocation: "gym",
  },
  {
    name: "Barbell Squat",
    slug: "barbell-squat",
    difficulty: "intermediate",
    goals: ["lose_fat", "build_muscle", "stay_active"],
    equipment: ["full_gym"],
    workoutLocation: "gym",
  },
  {
    name: "Romanian Deadlift",
    slug: "romanian-deadlift",
    difficulty: "intermediate",
    goals: ["build_muscle", "stay_active"],
    equipment: ["full_gym"],
    workoutLocation: "gym",
  },
  {
    name: "Cable Tricep Pushdown",
    slug: "cable-tricep-pushdown",
    difficulty: "beginner",
    goals: ["build_muscle", "stay_active"],
    equipment: ["full_gym"],
    workoutLocation: "gym",
  },
  {
    name: "Cable Crunch",
    slug: "cable-crunch",
    difficulty: "beginner",
    goals: ["lose_fat", "stay_active"],
    equipment: ["full_gym"],
    workoutLocation: "gym",
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

function ExerciseGrid({ exercises }: { exercises: ExerciseCard[] }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(155px,1fr))] gap-3">
      {exercises.map((exercise) => (
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
  );
}

export function HomeContent({ userEmail, preferences, dashboard }: Props) {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const [isStartingWorkout, setIsStartingWorkout] = useState(false);

  const personalizedExercises = useMemo(() => (
    recommendedExercises.filter((exercise) => {
      const locationMatches = preferences.workoutLocation === "both" || exercise.workoutLocation === preferences.workoutLocation;
      const goalMatches = exercise.goals.includes(preferences.goal);
      const equipmentMatches = exercise.workoutLocation === "gym"
        ? preferences.workoutLocation !== "home"
        : preferences.equipment === "full_gym" || exercise.equipment.includes(preferences.equipment);

      return locationMatches && goalMatches && equipmentMatches;
    })
  ), [preferences.equipment, preferences.goal, preferences.workoutLocation]);

  const homeExercises = useMemo(() => (
    personalizedExercises.filter((exercise) => exercise.workoutLocation === "home")
  ), [personalizedExercises]);

  const gymExercises = useMemo(() => (
    personalizedExercises.filter((exercise) => exercise.workoutLocation === "gym")
  ), [personalizedExercises]);

  const stats: StatCard[] = [
    { value: dashboard.currentStreak, label: "Day streak", icon: Flame },
    { value: dashboard.totalWorkouts, label: "Workouts done", icon: Activity },
    { value: dashboard.thisWeek, label: "This week", icon: Clock3 },
  ];

  const heroActionLabel = !dashboard.todayWorkout.activePlanId
    ? "Build Plan"
    : dashboard.todayWorkout.sessionId
      ? "Resume Workout"
      : dashboard.todayWorkout.isRestDay || dashboard.todayWorkout.planExercises.length === 0
        ? "View Plan"
        : "Start Workout";

  async function handleHeroAction() {
    if (dashboard.todayWorkout.sessionId) {
      router.push(`/home/workout/${dashboard.todayWorkout.sessionId}`);
      return;
    }

    if (!dashboard.todayWorkout.activePlanId || dashboard.todayWorkout.isRestDay || dashboard.todayWorkout.planExercises.length === 0) {
      router.push("/home/plan");
      return;
    }

    setIsStartingWorkout(true);

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error("Your session expired. Please sign in again.");
        return;
      }

      const { data: existingSession } = await supabase
        .from("workout_sessions")
        .select("id")
        .eq("user_id", user.id)
        .eq("status", "in_progress")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (existingSession?.id) {
        router.push(`/home/workout/${existingSession.id}`);
        return;
      }

      const { data: session, error: sessionError } = await supabase
        .from("workout_sessions")
        .insert({
          user_id: user.id,
          plan_id: dashboard.todayWorkout.activePlanId,
          status: "in_progress",
        })
        .select("id")
        .single();

      if (sessionError || !session) {
        toast.error(sessionError?.message ?? "Unable to start workout.");
        return;
      }

      const { error: exercisesError } = await supabase.from("session_exercises").insert(
        dashboard.todayWorkout.planExercises.map((exercise) => ({
          session_id: session.id,
          exercise_id: exercise.exercise_id,
          order_index: exercise.order,
        })),
      );

      if (exercisesError) {
        toast.error(exercisesError.message);
        return;
      }

      router.push(`/home/workout/${session.id}`);
    } finally {
      setIsStartingWorkout(false);
    }
  }

  return (
    <div className="px-8 py-7">
      <div className="flex items-start justify-between">
        <Greeting email={userEmail} />
        <div className="flex items-center gap-[10px]">
          <AccentPicker />
          <Link
            href="/home/settings"
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
          </Link>
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
                <div className="font-[family-name:var(--font-barlow-condensed)] text-[28px] font-extrabold leading-none text-[var(--color-text-primary)]">
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
            {dashboard.todayWorkout.eyebrow}
          </div>
          <h2
            className="mb-[5px] font-[family-name:var(--font-barlow-condensed)] text-[30px] font-black text-[var(--color-text-primary)]"
            style={{ letterSpacing: "-0.3px" }}
          >
            {dashboard.todayWorkout.title}
          </h2>
          <p className="mb-4 text-[13px] text-[var(--color-text-secondary)]">
            {dashboard.todayWorkout.meta}
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleHeroAction}
              disabled={isStartingWorkout}
              aria-busy={isStartingWorkout || undefined}
              className="relative inline-flex items-center gap-2 bg-[var(--color-accent)] text-[var(--color-bg)] disabled:opacity-60"
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
              <span className={isStartingWorkout ? "opacity-0" : "inline-flex items-center gap-2"}>
                <Play className="h-[14px] w-[14px] fill-current" />
                {heroActionLabel}
              </span>
              {isStartingWorkout ? <SkeletonButtonContent withIcon labelWidth="w-[118px]" tone="contrast" /> : null}
            </button>
            <div className="flex gap-[6px]">
              {dashboard.todayWorkout.pills.map((pill) => (
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

      {dashboard.todayWorkout.activePlanId ? (
        <div
          className="mb-6 border bg-[var(--bg-2)]"
          style={{ border: "var(--border-subtle)", borderRadius: "var(--radius-xl)", padding: "18px 20px" }}
        >
          <div className="mb-2 flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[1px] text-[var(--color-text-muted)]">Plan completion</div>
              <div className="mt-1 text-[13px] text-[var(--color-text-secondary)]">
                Your active plan is {dashboard.planProgress}% complete for this week.
              </div>
            </div>
            <div className="font-[family-name:var(--font-barlow-condensed)] text-[34px] font-black text-[var(--color-accent)]">{dashboard.planProgress}%</div>
          </div>
          <div className="h-[4px] rounded-full bg-[var(--bg-3)]">
            <div className="h-[4px] rounded-full bg-[var(--color-accent)]" style={{ width: `${dashboard.planProgress}%` }} />
          </div>
        </div>
      ) : null}

      <>
        <SectionHeader title="Weekly Activity" linkLabel="Full history →" href="/home/progress" />
        <div className="mb-6 flex h-[52px] items-end gap-2">
          {dashboard.weeklyActivity.map((day, index) => {
            const animation = getWeeklyActivityAnimationConfig(day, index, shouldReduceMotion ?? false);

            return (
              <div key={`${day.label}-${index}`} className="flex flex-1 flex-col items-center gap-1">
                <div className="flex w-full flex-1 items-end rounded-[4px] bg-[var(--bg-3)]">
                  {day.hasFill ? (
                    <motion.div
                      className="w-full rounded-[4px] bg-[var(--color-accent)]"
                      initial={{ height: animation.initialHeight }}
                      animate={{ height: animation.targetHeight }}
                      transition={animation.animate ? { duration: 0.42, delay: animation.delay, ease: [0.22, 1, 0.36, 1] } : { duration: 0 }}
                      style={{
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
            );
          })}
        </div>
      </>

      {homeExercises.length > 0 ? (
        <>
          <SectionHeader title="Home Workouts For You" linkLabel="Browse all →" href="/home/browse" />
          <ExerciseGrid exercises={homeExercises} />
        </>
      ) : null}

      {gymExercises.length > 0 ? (
        <div className={homeExercises.length > 0 ? "mt-6" : ""}>
          <SectionHeader title="Gym Workouts For You" linkLabel="Browse all →" href="/home/browse" />
          <ExerciseGrid exercises={gymExercises} />
        </div>
      ) : null}
    </div>
  );
}
