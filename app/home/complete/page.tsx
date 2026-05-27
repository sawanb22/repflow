import { notFound } from "next/navigation";
import { getServerSupabase } from "@/lib/supabase-server";
import { getExercisesByIds, getUserStreak, getWorkoutSessionView } from "@/lib/workout-data";
import { getDayLabel, getNextWorkoutDay } from "@/lib/workout-helpers";
import { CompleteContent } from "@/app/home/complete-content";
import type { Exercise, SessionExercise, WorkoutPlanDay } from "@/types/database";

type CompletePageItem = {
  sessionExercise: SessionExercise;
  exercise: Exercise;
};

export default async function CompletePage({ searchParams }: { searchParams: Promise<{ session?: string }> }) {
  const { session: sessionId } = await searchParams;
  if (!sessionId) notFound();

  const supabase = await getServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [sessionView, streak] = await Promise.all([
    getWorkoutSessionView(supabase, user!.id, sessionId),
    getUserStreak(supabase, user!.id),
  ]);

  if (!sessionView) notFound();

  const durationMinutes = sessionView.session.duration_minutes ?? 0;
  const totalSets = sessionView.items.reduce((sum, item) => sum + item.sessionExercise.sets_done, 0);
  const nextWorkout = getNextWorkoutDay(sessionView.plan?.days ?? null);
  const nextWorkoutExercises = nextWorkout
    ? await getExercisesByIds(supabase, nextWorkout.day.exercises.map((exercise) => exercise.exercise_id))
    : [];

  return (
    <CompleteContent
      durationMinutes={durationMinutes}
      completedExercises={sessionView.items.length}
      totalSets={totalSets}
      currentStreak={streak?.current_streak ?? 0}
      nextWorkoutLabel={nextWorkout ? `Next · ${getDayLabel(nextWorkout.dayKey)}` : "Next workout"}
      nextWorkoutDay={(nextWorkout?.day ?? null) as WorkoutPlanDay | null}
      nextWorkoutExercises={nextWorkoutExercises as Exercise[]}
      sessionItems={sessionView.items as CompletePageItem[]}
    />
  );
}
