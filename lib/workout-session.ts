import type { WorkoutPlanExercise } from "../types/database.ts";

type SessionExerciseShape = {
  exercise_id: string;
  order_index: number;
};

type ShouldReusePlannedWorkoutSessionInput = {
  activePlanId: string | null;
  existingSessionPlanId: string | null;
  plannedExercises: WorkoutPlanExercise[];
  sessionExercises: SessionExerciseShape[];
};

export function shouldReusePlannedWorkoutSession({
  activePlanId,
  existingSessionPlanId,
  plannedExercises,
  sessionExercises,
}: ShouldReusePlannedWorkoutSessionInput) {
  if (!activePlanId || existingSessionPlanId !== activePlanId) return false;
  if (plannedExercises.length === 0 || sessionExercises.length !== plannedExercises.length) return false;

  return plannedExercises.every((exercise, index) => {
    const sessionExercise = sessionExercises[index];
    return sessionExercise?.exercise_id === exercise.exercise_id && sessionExercise.order_index === exercise.order;
  });
}
