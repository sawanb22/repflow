"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, Play, Sparkles } from "lucide-react";
import type { Category, Exercise, FitnessGoal, PlanDayKey, TrainingStyle, UserEquipment, WorkoutPlan, WorkoutPlanExercise } from "@/types/database";
import { Button } from "@/components/ui/Button";
import { toast } from "@/lib/toast-store";
import { createClient } from "@/utils/supabase/client";
import { shouldReusePlannedWorkoutSession } from "@/lib/workout-session";
import { PLAN_DAY_KEYS, PLAN_DAY_LABELS, buildAutoPlanDays, getPlanDescription, getPlanName, normalizeWorkoutPlanDays } from "@/lib/workout-helpers";

type PreferencesInput = {
  workout_location: "home" | "gym" | "both" | null;
  goal: "lose_fat" | "build_muscle" | "stay_active" | null;
  equipment: UserEquipment | null;
  fitness_goals: FitnessGoal[];
  training_style: TrainingStyle | null;
  equipment_list: string[];
  workout_days_per_week: number;
};

type Props = {
  activePlan: WorkoutPlan | null;
  exercises: Exercise[];
  categories: Category[];
  preferences: PreferencesInput;
  progress: number;
  todayPlanDayKey: PlanDayKey;
};

function formatRest(restSeconds: number) {
  return `${restSeconds}s rest`;
}

function DayExerciseRow({ exercise, workoutExercise }: { exercise: Exercise | undefined; workoutExercise: WorkoutPlanExercise }) {
  if (!exercise) return null;

  return (
    <div
      className="flex items-center justify-between gap-4 border bg-[var(--bg-2)]"
      style={{ border: "var(--border-subtle)", borderRadius: "12px", padding: "12px 14px" }}
    >
      <div className="min-w-0 flex-1">
        <div className="text-[13px] font-semibold text-[var(--color-text-primary)]">{exercise.name}</div>
        <div className="mt-1 text-[11px] text-[var(--color-text-muted)]">
          {workoutExercise.sets} sets · {workoutExercise.reps} · {formatRest(workoutExercise.rest_seconds)}
        </div>
      </div>
      <span
        className="inline-block rounded-[5px] border bg-[var(--bg-3)] px-[8px] py-[4px] text-[10px] font-bold uppercase text-[var(--color-text-muted)]"
        style={{ border: "var(--border-subtle)", letterSpacing: "0.5px" }}
      >
        #{workoutExercise.order}
      </span>
    </div>
  );
}

export function PlanContent({ activePlan, exercises, categories, preferences, progress, todayPlanDayKey }: Props) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [localPlan, setLocalPlan] = useState<WorkoutPlan | null>(activePlan);

  const normalizedDays = useMemo(() => normalizeWorkoutPlanDays(localPlan?.days ?? null), [localPlan]);
  const exercisesById = useMemo(() => new Map(exercises.map((exercise) => [exercise.id, exercise])), [exercises]);
  const canStartToday = !normalizedDays[todayPlanDayKey].is_rest && normalizedDays[todayPlanDayKey].exercises.length > 0;

  async function generatePlan() {
    setIsSaving(true);

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error("Your session expired. Please sign in again.");
        return;
      }

      if (localPlan?.id) {
        await supabase
          .from("workout_plans")
          .update({ is_active: false })
          .eq("user_id", user.id)
          .eq("is_active", true);
      }

      const days = buildAutoPlanDays({
        preferences,
        exercises,
        categories,
      });

      const { data: plan, error: planError } = await supabase
        .from("workout_plans")
        .insert({
          user_id: user.id,
          name: getPlanName(
            (preferences.fitness_goals?.[0] as "lose_fat" | "build_muscle" | "stay_active" | undefined) ?? preferences.goal ?? "stay_active",
            preferences.training_style === "home" || preferences.training_style === "gym"
              ? preferences.training_style
              : preferences.training_style === "hybrid"
                ? "both"
                : preferences.workout_location ?? "both",
          ),
          description: getPlanDescription(preferences.workout_days_per_week),
          days,
          is_active: true,
        })
        .select("id, user_id, name, description, days, is_active, created_at, updated_at")
        .single();

      if (planError || !plan) {
        toast.error(planError?.message ?? "Unable to create your plan.");
        return;
      }

      setLocalPlan(plan as WorkoutPlan);
      toast.success("Plan created.");
      router.refresh();
    } finally {
      setIsSaving(false);
    }
  }

  async function toggleRest(dayKey: PlanDayKey) {
    if (!localPlan) return;

    setIsSaving(true);

    try {
      const nextDays = normalizeWorkoutPlanDays(localPlan.days);
      nextDays[dayKey] = {
        ...nextDays[dayKey],
        is_rest: !nextDays[dayKey].is_rest,
      };

      const supabase = createClient();
      const { error: updateError, data } = await supabase
        .from("workout_plans")
        .update({ days: nextDays })
        .eq("id", localPlan.id)
        .select("id, user_id, name, description, days, is_active, created_at, updated_at")
        .single();

      if (updateError || !data) {
        toast.error(updateError?.message ?? "Unable to update rest day.");
        return;
      }

      setLocalPlan(data as WorkoutPlan);
      toast.success("Rest day updated.");
      router.refresh();
    } finally {
      setIsSaving(false);
    }
  }

  async function startTodayWorkout() {
    setIsSaving(true);

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error("Your session expired. Please sign in again.");
        return;
      }

      const plannedExercises = normalizedDays[todayPlanDayKey].exercises;

      const { data: existingSession } = await supabase
        .from("workout_sessions")
        .select("id, plan_id")
        .eq("user_id", user.id)
        .eq("status", "in_progress")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (existingSession?.id) {
        const { data: existingSessionExercises, error: existingExercisesError } = await supabase
          .from("session_exercises")
          .select("exercise_id, order_index")
          .eq("session_id", existingSession.id)
          .order("order_index", { ascending: true });

        if (existingExercisesError) {
          toast.error(existingExercisesError.message);
          return;
        }

        if (shouldReusePlannedWorkoutSession({
          activePlanId: localPlan?.id ?? null,
          existingSessionPlanId: existingSession.plan_id ?? null,
          plannedExercises,
          sessionExercises: existingSessionExercises ?? [],
        })) {
          router.push(`/home/workout/${existingSession.id}`);
          return;
        }

        const { error: abandonError } = await supabase
          .from("workout_sessions")
          .update({ status: "abandoned" })
          .eq("id", existingSession.id);

        if (abandonError) {
          toast.error(abandonError.message);
          return;
        }
      }

      const { data: session, error: sessionError } = await supabase
        .from("workout_sessions")
        .insert({
          user_id: user.id,
          plan_id: localPlan?.id ?? null,
          status: "in_progress",
        })
        .select("id")
        .single();

      if (sessionError || !session) {
        toast.error(sessionError?.message ?? "Unable to start workout.");
        return;
      }

      const { error: exercisesError } = await supabase.from("session_exercises").insert(
        plannedExercises.map((exercise) => ({
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
      setIsSaving(false);
    }
  }

  return (
    <div className="px-8 py-7">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[1.2px] text-[var(--color-accent)]">Weekly Plan</div>
          <h1 className="font-[family-name:var(--font-barlow-condensed)] text-[32px] font-black text-[var(--color-text-primary)]">
            {localPlan?.name ?? "Create Your Weekly Plan"}
          </h1>
          <p className="mt-1 text-[13px] text-[var(--color-text-secondary)]">
            {localPlan?.description ?? "Auto-generate a plan from your preferences, then fine-tune rest days before you train."}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={generatePlan} loading={isSaving} className="rounded-[10px]">
            <Sparkles className="h-4 w-4" />
            {localPlan ? "Regenerate Plan" : "Generate Plan"}
          </Button>
          <Button variant="secondary" onClick={startTodayWorkout} disabled={!canStartToday || isSaving} className="rounded-[10px]">
            <Play className="h-4 w-4" />
            Start Today
          </Button>
        </div>
      </div>

      <div
        className="mb-6 border bg-[var(--bg-2)]"
        style={{ border: "var(--border-subtle)", borderRadius: "var(--radius-xl)", padding: "18px 20px" }}
      >
        <div className="mb-2 flex items-center justify-between gap-4">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[1px] text-[var(--color-text-muted)]">Plan completion</div>
            <div className="mt-1 text-[13px] text-[var(--color-text-secondary)]">
              Your active plan is {progress}% complete for this week.
            </div>
          </div>
          <div className="font-[family-name:var(--font-barlow-condensed)] text-[34px] font-black text-[var(--color-accent)]">{progress}%</div>
        </div>
        <div className="h-[4px] rounded-full bg-[var(--bg-3)]">
          <div className="h-[4px] rounded-full bg-[var(--color-accent)]" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
        {PLAN_DAY_KEYS.map((dayKey) => {
          const day = normalizedDays[dayKey];

          return (
            <section
              key={dayKey}
              className="border bg-[var(--bg-2)]"
              style={{ border: "var(--border-subtle)", borderRadius: "16px", padding: "16px" }}
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-[var(--color-text-primary)]">
                    <CalendarDays className="h-4 w-4 text-[var(--color-accent)]" />
                    <h2 className="font-[family-name:var(--font-barlow-condensed)] text-[22px] font-black">
                      {PLAN_DAY_LABELS[dayKey]}
                    </h2>
                  </div>
                  <div className="mt-1 text-[12px] text-[var(--color-text-muted)]">
                    {day.is_rest || day.exercises.length === 0 ? "Rest and recover" : `${day.exercises.length} planned exercises`}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => toggleRest(dayKey)}
                  disabled={!localPlan || isSaving}
                  className="rounded-[8px] border px-3 py-[6px] text-[11px] font-semibold transition-colors disabled:opacity-50"
                  style={{
                    border: day.is_rest ? "var(--border-accent)" : "var(--border-subtle)",
                    background: day.is_rest ? "var(--color-accent-dim)" : "var(--bg-3)",
                    color: day.is_rest ? "var(--color-accent)" : "var(--color-text-secondary)",
                  }}
                >
                  {day.is_rest ? "Rest Day" : "Workout Day"}
                </button>
              </div>

              {day.is_rest || day.exercises.length === 0 ? (
                <div
                  className="flex min-h-[132px] items-center justify-center rounded-[12px] border bg-[var(--bg-3)] text-center"
                  style={{ border: "var(--border-subtle)" }}
                >
                  <div>
                    <div className="text-[13px] font-semibold text-[var(--color-text-primary)]">Rest Day</div>
                    <div className="mt-1 text-[12px] text-[var(--color-text-muted)]">Mobility, recovery, and light activity.</div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {day.exercises.map((plannedExercise) => (
                    <DayExerciseRow
                      key={`${dayKey}-${plannedExercise.exercise_id}-${plannedExercise.order}`}
                      workoutExercise={plannedExercise}
                      exercise={exercisesById.get(plannedExercise.exercise_id)}
                    />
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
