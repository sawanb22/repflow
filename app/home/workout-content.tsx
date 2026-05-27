"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ChevronRight, Clock3, PauseCircle, Play, SkipForward } from "lucide-react";
import { ExerciseMedia } from "@/components/ui/ExerciseMedia";
import type { Exercise, SessionExercise, WorkoutPlanExercise, WorkoutSession } from "@/types/database";
import { Button } from "@/components/ui/Button";
import { toast } from "@/lib/toast-store";
import { calculateStreakUpdate } from "@/lib/workout-helpers";
import { parseRestTimeSeconds } from "@/lib/rest-time";
import { createClient } from "@/utils/supabase/client";

type WorkoutItem = {
  sessionExercise: SessionExercise;
  exercise: Exercise;
  planExercise: WorkoutPlanExercise | null;
};

type Props = {
  session: WorkoutSession;
  items: WorkoutItem[];
};

function WorkoutHeroArtworkFallback() {
  return (
    <svg viewBox="0 0 420 320" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      <rect width="420" height="320" fill="var(--bg-3)" />
      <circle cx="210" cy="110" r="26" fill="none" stroke="rgba(var(--color-accent-rgb), 0.22)" strokeWidth="2" />
      <path d="M150 210 Q210 80 270 210" fill="none" stroke="rgba(var(--color-accent-rgb), 0.24)" strokeWidth="2" strokeLinecap="round" />
      <line x1="130" y1="225" x2="290" y2="225" stroke="rgba(var(--color-accent-rgb), 0.14)" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="210" cy="92" r="10" fill="rgba(var(--color-accent-rgb), 0.2)" />
      <circle cx="210" cy="92" r="5" fill="rgba(var(--color-accent-rgb), 0.45)" />
    </svg>
  );
}

function getPlannedSets(item: WorkoutItem | null | undefined) {
  return item?.planExercise?.sets ?? item?.exercise.sets ?? 0;
}

function getPlannedReps(item: WorkoutItem | null | undefined) {
  return item?.planExercise?.reps ?? item?.exercise.reps ?? "";
}

function getPlannedRestSeconds(item: WorkoutItem | null | undefined) {
  return item?.planExercise?.rest_seconds ?? parseRestTimeSeconds(item?.exercise.rest_time) ?? 0;
}

export function WorkoutContent({ session, items }: Props) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [restSeconds, setRestSeconds] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [progressState, setProgressState] = useState(() =>
    items.map((item) => ({
      setsDone: Math.max(0, item.sessionExercise.sets_done),
      repsDone: item.sessionExercise.reps_done ?? getPlannedReps(item),
      weight: item.sessionExercise.weight ?? "",
    })),
  );

  const currentItem = items[currentIndex] ?? null;
  const nextItem = items[currentIndex + 1] ?? null;
  const completedExercises = progressState.filter((state, index) => state.setsDone >= getPlannedSets(items[index])).length;

  useEffect(() => {
    if (restSeconds == null || restSeconds <= 0) return;

    const timer = window.setInterval(() => {
      setRestSeconds((current) => {
        if (current == null) return current;
        if (current <= 1) {
          window.clearInterval(timer);
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [restSeconds]);

  const progressLabel = useMemo(() => `Exercise ${Math.min(currentIndex + 1, items.length)} of ${items.length}`, [currentIndex, items.length]);

  if (!currentItem) {
    return (
      <div className="px-8 py-7">
        <div className="rounded-[16px] border bg-[var(--bg-2)] px-6 py-8 text-center" style={{ border: "var(--border-subtle)" }}>
          <div className="text-[16px] font-semibold text-[var(--color-text-primary)]">No exercises found in this session.</div>
          <Link href="/home/plan" className="mt-3 inline-block text-[13px] text-[var(--color-accent)]">Return to plan →</Link>
        </div>
      </div>
    );
  }

  async function persistCurrentExercise(index: number, nextSetsDone: number, nextRepsDone: string, nextWeight: string) {
    const target = items[index];
    const supabase = createClient();
    return supabase
      .from("session_exercises")
      .update({
        sets_done: nextSetsDone,
        reps_done: nextRepsDone,
        weight: nextWeight || null,
      })
      .eq("id", target.sessionExercise.id);
  }

  async function updateCurrentState(nextSetsDone: number) {
    const nextRepsDone = progressState[currentIndex]?.repsDone ?? getPlannedReps(currentItem);
    const nextWeight = progressState[currentIndex]?.weight ?? "";

    setProgressState((current) => current.map((entry, index) => (
      index === currentIndex
        ? { ...entry, setsDone: nextSetsDone }
        : entry
    )));

    const { error: updateError } = await persistCurrentExercise(currentIndex, nextSetsDone, nextRepsDone, nextWeight);
    if (updateError) toast.error(updateError.message);
  }

  async function handleSetToggle(setNumber: number) {
    const currentSetsDone = progressState[currentIndex]?.setsDone ?? 0;
    const nextSetsDone = currentSetsDone >= setNumber ? setNumber - 1 : setNumber;
    await updateCurrentState(nextSetsDone);
    if (nextSetsDone > currentSetsDone) setRestSeconds(getPlannedRestSeconds(currentItem));
  }

  async function handleWeightChange(value: string) {
    setProgressState((current) => current.map((entry, index) => (
      index === currentIndex ? { ...entry, weight: value } : entry
    )));
  }

  async function saveWeightAndReps() {
    const currentState = progressState[currentIndex];
    const { error: updateError } = await persistCurrentExercise(
      currentIndex,
      currentState.setsDone,
      currentState.repsDone,
      currentState.weight,
    );
    if (updateError) toast.error(updateError.message);
  }

  async function skipExercise() {
    if (currentIndex < items.length - 1) {
      setCurrentIndex((index) => index + 1);
      return;
    }
    await completeWorkout();
  }

  async function completeWorkout() {
    setSaving(true);

    try {
      const supabase = createClient();
      const startedAt = new Date(session.started_at);
      const completedAt = new Date();
      const durationMinutes = Math.max(1, Math.round((completedAt.getTime() - startedAt.getTime()) / 60000));

      const { data: existing } = await supabase
        .from("workout_sessions")
        .select("status")
        .eq("id", session.id)
        .maybeSingle();

      if (existing?.status === "completed") {
        router.push(`/home/complete?session=${session.id}`);
        return;
      }

      const { error: sessionError } = await supabase
        .from("workout_sessions")
        .update({
          status: "completed",
          completed_at: completedAt.toISOString(),
          duration_minutes: durationMinutes,
        })
        .eq("id", session.id);

      if (sessionError) {
        toast.error(sessionError.message);
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error("Your session expired. Please sign in again.");
        return;
      }

      const { data: streak } = await supabase
        .from("user_streaks")
        .select("id, user_id, current_streak, longest_streak, last_workout_date, total_workouts, created_at, updated_at")
        .eq("user_id", user.id)
        .maybeSingle();

      const nextStreak = calculateStreakUpdate(streak ?? null, completedAt);

      const { error: streakError } = await supabase.from("user_streaks").upsert({
        user_id: user.id,
        current_streak: nextStreak.current_streak,
        longest_streak: nextStreak.longest_streak,
        last_workout_date: nextStreak.last_workout_date,
        total_workouts: nextStreak.total_workouts,
      }, { onConflict: "user_id" });

      if (streakError) {
        toast.error(streakError.message);
        return;
      }

      toast.success("Workout saved.");
      router.push(`/home/complete?session=${session.id}`);
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="px-8 py-7">
      <Link
        href="/home/plan"
        className="mb-6 inline-flex items-center gap-2 border bg-[var(--bg-2)] px-4 py-2 text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
        style={{ border: "var(--border-default)", borderRadius: "9px" }}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to plan
      </Link>

      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[1.2px] text-[var(--color-accent)]">Active Workout</div>
          <h1 className="font-[family-name:var(--font-barlow-condensed)] text-[32px] font-black text-[var(--color-text-primary)]">{currentItem.exercise.name}</h1>
          <p className="mt-1 text-[13px] text-[var(--color-text-secondary)]">{progressLabel}</p>
        </div>
        <div className="text-right">
          <div className="font-[family-name:var(--font-barlow-condensed)] text-[32px] font-black text-[var(--color-accent)]">{completedExercises}/{items.length}</div>
          <div className="text-[11px] text-[var(--color-text-muted)]">Exercises complete</div>
        </div>
      </div>

      <div className="mb-4 h-[4px] rounded-full bg-[var(--bg-3)]">
        <div className="h-[4px] rounded-full bg-[var(--color-accent)]" style={{ width: `${((currentIndex + 1) / items.length) * 100}%` }} />
      </div>

      <div className="grid grid-cols-[1fr_1.05fr] gap-6">
        <div className="flex flex-col gap-3">
          <ExerciseMedia
            slug={currentItem.exercise.slug}
            videoUrl={currentItem.exercise.video_url ?? currentItem.exercise.video_url_side ?? currentItem.exercise.video_url_front}
            alt={currentItem.exercise.name}
            className="h-[320px] border bg-[var(--bg-2)]"
            fallback={<WorkoutHeroArtworkFallback />}
          />

          <div className="grid grid-cols-3 gap-[10px]">
            {[
              { label: "Sets", value: String(getPlannedSets(currentItem)) },
              { label: "Reps", value: getPlannedReps(currentItem) },
              { label: "Rest", value: `${getPlannedRestSeconds(currentItem)}s` },
            ].map((stat) => (
              <div key={stat.label} className="border bg-[var(--bg-2)] p-4 text-center" style={{ border: "var(--border-subtle)", borderRadius: "var(--radius-lg)" }}>
                <div className="font-[family-name:var(--font-barlow-condensed)] text-[34px] font-black leading-none text-[var(--color-accent)]">{stat.value}</div>
                <div className="mt-1 text-[10px] font-bold uppercase text-[var(--color-text-muted)]" style={{ letterSpacing: "1px" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="border bg-[var(--bg-2)]" style={{ border: "var(--border-subtle)", borderRadius: "16px", padding: "18px 20px" }}>
            <div className="mb-3 flex items-center justify-between gap-4">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[1px] text-[var(--color-text-muted)]">Set tracker</div>
                <div className="mt-1 text-[13px] text-[var(--color-text-secondary)]">Tap a set to mark progress and trigger the rest timer.</div>
              </div>
              <CheckCircle2 className="h-5 w-5 text-[var(--color-accent)]" />
            </div>

            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: getPlannedSets(currentItem) }, (_, index) => index + 1).map((setNumber) => {
                const active = (progressState[currentIndex]?.setsDone ?? 0) >= setNumber;
                return (
                  <button
                    key={setNumber}
                    type="button"
                    onClick={() => handleSetToggle(setNumber)}
                    className="rounded-[12px] border px-4 py-4 text-left transition-colors"
                    style={{
                      border: active ? "var(--border-accent)" : "var(--border-subtle)",
                      background: active ? "var(--color-accent-dim)" : "var(--bg-3)",
                    }}
                  >
                    <div className={`text-[11px] font-bold uppercase tracking-[1px] ${active ? "text-[var(--color-accent)]" : "text-[var(--color-text-muted)]"}`}>Set {setNumber}</div>
                    <div className={`mt-2 text-[13px] font-semibold ${active ? "text-[var(--color-accent)]" : "text-[var(--color-text-primary)]"}`}>{active ? "Completed" : getPlannedReps(currentItem)}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="border bg-[var(--bg-2)]" style={{ border: "var(--border-subtle)", borderRadius: "16px", padding: "18px 20px" }}>
              <div className="mb-3 flex items-center gap-2 text-[var(--color-text-primary)]">
                <Clock3 className="h-4 w-4 text-[var(--color-accent)]" />
                <div className="text-[11px] font-bold uppercase tracking-[1px] text-[var(--color-text-muted)]">Rest timer</div>
              </div>
              <div className="font-[family-name:var(--font-barlow-condensed)] text-[36px] font-black text-[var(--color-text-primary)]">
                {restSeconds == null ? `${getPlannedRestSeconds(currentItem)}s` : `${restSeconds}s`}
              </div>
              <div className="mt-2 flex gap-2">
                <Button variant="secondary" size="sm" onClick={() => setRestSeconds(getPlannedRestSeconds(currentItem))} className="rounded-[10px]">
                  <Play className="h-4 w-4" />
                  Restart
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setRestSeconds(null)} className="rounded-[10px]">
                  <PauseCircle className="h-4 w-4" />
                  Clear
                </Button>
              </div>
            </div>

            <div className="border bg-[var(--bg-2)]" style={{ border: "var(--border-subtle)", borderRadius: "16px", padding: "18px 20px" }}>
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="text-[11px] font-bold uppercase tracking-[1px] text-[var(--color-text-muted)]">Next exercise</div>
                {nextItem ? <ChevronRight className="h-4 w-4 text-[var(--color-accent)]" /> : null}
              </div>
              {nextItem ? (
                <>
                  <div className="text-[14px] font-semibold text-[var(--color-text-primary)]">{nextItem.exercise.name}</div>
                  <div className="mt-1 text-[12px] text-[var(--color-text-secondary)]">{getPlannedSets(nextItem)} sets · {getPlannedReps(nextItem)}</div>
                </>
              ) : (
                <div className="text-[12px] text-[var(--color-text-secondary)]">This is the last exercise. Finish strong and complete the workout.</div>
              )}
            </div>
          </div>

          <div className="border bg-[var(--bg-2)]" style={{ border: "var(--border-subtle)", borderRadius: "16px", padding: "18px 20px" }}>
            <div className="mb-3 text-[11px] font-bold uppercase tracking-[1px] text-[var(--color-text-muted)]">Optional tracking</div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-[12px] font-medium text-[var(--color-text-secondary)]">Reps done</label>
                <input
                  value={progressState[currentIndex]?.repsDone ?? ""}
                  onChange={(event) => setProgressState((current) => current.map((entry, index) => (
                    index === currentIndex ? { ...entry, repsDone: event.target.value } : entry
                  )))}
                  onBlur={saveWeightAndReps}
                  className="h-11 w-full rounded-[10px] border bg-[var(--bg-3)] px-[14px] text-sm text-[var(--color-text-primary)] focus:outline-none"
                  style={{ border: "var(--border-subtle)" }}
                />
              </div>
              <div>
                <label className="mb-1 block text-[12px] font-medium text-[var(--color-text-secondary)]">Weight</label>
                <input
                  value={progressState[currentIndex]?.weight ?? ""}
                  onChange={(event) => handleWeightChange(event.target.value)}
                  onBlur={saveWeightAndReps}
                  placeholder="Optional"
                  className="h-11 w-full rounded-[10px] border bg-[var(--bg-3)] px-[14px] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none"
                  style={{ border: "var(--border-subtle)" }}
                />
              </div>
            </div>
          </div>

          <div className="mt-auto flex items-center gap-3">
            <Button variant="secondary" onClick={skipExercise} className="flex-1 rounded-[12px]">
              <SkipForward className="h-4 w-4" />
              {currentIndex < items.length - 1 ? "Skip Exercise" : "Skip to Finish"}
            </Button>
            <Button onClick={currentIndex < items.length - 1 ? () => setCurrentIndex((index) => index + 1) : completeWorkout} loading={saving} className="flex-1 rounded-[12px]">
              <Play className="h-4 w-4" />
              {currentIndex < items.length - 1 ? "Next Exercise" : "Complete Workout"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
