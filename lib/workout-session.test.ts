import assert from "node:assert/strict";
import test from "node:test";
import type { WorkoutPlanExercise } from "../types/database.ts";
import { shouldReusePlannedWorkoutSession } from "./workout-session.ts";

type SessionExerciseRow = {
  exercise_id: string;
  order_index: number;
};

function createPlannedExercise(exerciseId: string, order: number): WorkoutPlanExercise {
  return {
    exercise_id: exerciseId,
    order,
    sets: 3,
    reps: "10 reps",
    rest_seconds: 60,
  };
}

function createSessionExercise(exerciseId: string, orderIndex: number): SessionExerciseRow {
  return {
    exercise_id: exerciseId,
    order_index: orderIndex,
  };
}

test("does not reuse an in-progress session from a different plan", () => {
  const shouldReuse = shouldReusePlannedWorkoutSession({
    activePlanId: "plan-today",
    existingSessionPlanId: "plan-old",
    plannedExercises: [createPlannedExercise("exercise-1", 1)],
    sessionExercises: [createSessionExercise("exercise-1", 1)],
  });

  assert.equal(shouldReuse, false);
});

test("does not reuse an in-progress session when the exercise list differs from today's plan", () => {
  const shouldReuse = shouldReusePlannedWorkoutSession({
    activePlanId: "plan-today",
    existingSessionPlanId: "plan-today",
    plannedExercises: [createPlannedExercise("exercise-1", 1), createPlannedExercise("exercise-2", 2)],
    sessionExercises: [createSessionExercise("exercise-1", 1), createSessionExercise("exercise-3", 2)],
  });

  assert.equal(shouldReuse, false);
});

test("reuses an in-progress session only when it matches today's plan and order", () => {
  const shouldReuse = shouldReusePlannedWorkoutSession({
    activePlanId: "plan-today",
    existingSessionPlanId: "plan-today",
    plannedExercises: [createPlannedExercise("exercise-1", 1), createPlannedExercise("exercise-2", 2)],
    sessionExercises: [createSessionExercise("exercise-1", 1), createSessionExercise("exercise-2", 2)],
  });

  assert.equal(shouldReuse, true);
});
