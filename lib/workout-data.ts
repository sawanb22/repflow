import { getServerSupabase } from "@/lib/supabase-server";
import type {
  Category,
  Exercise,
  ExerciseFavorite,
  PlanDayKey,
  SessionExercise,
  UserPreferences,
  UserStreak,
  WorkoutPlan,
  WorkoutPlanDays,
  WorkoutPlanExercise,
  WorkoutSession,
} from "@/types/database";
import {
  buildCompletionHeatmap,
  buildWeeklyActivity,
  calculateThisWeekMinutes,
  calculateWeeklyCompletion,
  getDayKey,
  getTodayPlanDay,
  normalizeWorkoutPlanDays,
} from "@/lib/workout-helpers";

export type ServerSupabase = Awaited<ReturnType<typeof getServerSupabase>>;

export async function getActiveWorkoutPlan(supabase: ServerSupabase, userId: string) {
  const { data } = await supabase
    .from("workout_plans")
    .select("id, user_id, name, description, days, is_active, created_at, updated_at")
    .eq("user_id", userId)
    .eq("is_active", true)
    .maybeSingle();

  return (data as WorkoutPlan | null) ?? null;
}

export async function getUserStreak(supabase: ServerSupabase, userId: string) {
  const { data } = await supabase
    .from("user_streaks")
    .select("id, user_id, current_streak, longest_streak, last_workout_date, total_workouts, created_at, updated_at")
    .eq("user_id", userId)
    .maybeSingle();

  return (data as UserStreak | null) ?? null;
}

async function getWorkoutPlanById(supabase: ServerSupabase, userId: string, planId: string) {
  const { data } = await supabase
    .from("workout_plans")
    .select("id, user_id, name, description, days, is_active, created_at, updated_at")
    .eq("id", planId)
    .eq("user_id", userId)
    .maybeSingle();

  return (data as WorkoutPlan | null) ?? null;
}

function getSessionPlanExercises(days: WorkoutPlanDays | null | undefined, sessionExercises: SessionExercise[]) {
  const orderedSessionExercises = sessionExercises.slice().sort((left, right) => left.order_index - right.order_index);
  const normalizedDays = normalizeWorkoutPlanDays(days);
  const allPlanExercises = Object.values(normalizedDays).flatMap((day) => day.exercises);

  for (const day of Object.values(normalizedDays)) {
    if (day.exercises.length !== orderedSessionExercises.length) continue;

    const matchesDay = day.exercises.every((exercise, index) => (
      exercise.exercise_id === orderedSessionExercises[index]?.exercise_id
      && exercise.order === orderedSessionExercises[index]?.order_index
    ));

    if (matchesDay) return day.exercises.map((exercise) => exercise);
  }

  return orderedSessionExercises.map((sessionExercise) => (
    allPlanExercises.find((exercise) => exercise.exercise_id === sessionExercise.exercise_id && exercise.order === sessionExercise.order_index) ?? null
  )) as Array<WorkoutPlanExercise | null>;
}

export async function getCompletedSessions(supabase: ServerSupabase, userId: string, limit = 100) {
  const { data } = await supabase
    .from("workout_sessions")
    .select("id, user_id, plan_id, status, started_at, completed_at, duration_minutes, created_at")
    .eq("user_id", userId)
    .eq("status", "completed")
    .order("completed_at", { ascending: false })
    .limit(limit);

  return (data ?? []) as WorkoutSession[];
}

export async function getSessionById(supabase: ServerSupabase, userId: string, sessionId: string) {
  const { data } = await supabase
    .from("workout_sessions")
    .select("id, user_id, plan_id, status, started_at, completed_at, duration_minutes, created_at")
    .eq("id", sessionId)
    .eq("user_id", userId)
    .maybeSingle();

  return (data as WorkoutSession | null) ?? null;
}

export async function getLatestInProgressSession(supabase: ServerSupabase, userId: string) {
  const { data } = await supabase
    .from("workout_sessions")
    .select("id, user_id, plan_id, status, started_at, completed_at, duration_minutes, created_at")
    .eq("user_id", userId)
    .eq("status", "in_progress")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return (data as WorkoutSession | null) ?? null;
}

export async function getSessionExercises(supabase: ServerSupabase, sessionId: string) {
  const { data } = await supabase
    .from("session_exercises")
    .select("id, session_id, exercise_id, order_index, sets_done, reps_done, weight, created_at")
    .eq("session_id", sessionId)
    .order("order_index");

  return (data ?? []) as SessionExercise[];
}

export async function getPublishedExercises(supabase: ServerSupabase) {
  const { data } = await supabase
    .from("exercises")
    .select("id, name, slug, category_id, equipment_id, difficulty, primary_muscles, secondary_muscles, sets, reps, rest_time, instructions, video_url, video_url_side, video_url_front, is_published, created_at")
    .eq("is_published", true)
    .order("name");

  return (data ?? []) as Exercise[];
}

export async function getExercisesByIds(supabase: ServerSupabase, exerciseIds: string[]) {
  if (exerciseIds.length === 0) return [] as Exercise[];

  const { data } = await supabase
    .from("exercises")
    .select("id, name, slug, category_id, equipment_id, difficulty, primary_muscles, secondary_muscles, sets, reps, rest_time, instructions, video_url, video_url_side, video_url_front, is_published, created_at")
    .in("id", exerciseIds);

  return (data ?? []) as Exercise[];
}

export async function getCategories(supabase: ServerSupabase) {
  const { data } = await supabase
    .from("categories")
    .select("id, name, slug, created_at")
    .order("name");

  return (data ?? []) as Category[];
}

export async function getUserPreferences(supabase: ServerSupabase, userId: string) {
  const { data } = await supabase
    .from("user_preferences")
    .select("id, user_id, workout_location, goal, equipment, fitness_goals, training_style, equipment_list, workout_days_per_week, workout_duration_min, experience_level, limitations, onboarding_done")
    .eq("user_id", userId)
    .maybeSingle();

  return (data as UserPreferences | null) ?? null;
}

export async function getExerciseFavorite(supabase: ServerSupabase, userId: string, exerciseId: string) {
  const { data } = await supabase
    .from("exercise_favorites")
    .select("id, user_id, exercise_id, created_at")
    .eq("user_id", userId)
    .eq("exercise_id", exerciseId)
    .maybeSingle();

  return (data as ExerciseFavorite | null) ?? null;
}

export async function getDashboardData(supabase: ServerSupabase, userId: string) {
  const [activePlan, streak, sessions, inProgressSession] = await Promise.all([
    getActiveWorkoutPlan(supabase, userId),
    getUserStreak(supabase, userId),
    getCompletedSessions(supabase, userId, 84),
    getLatestInProgressSession(supabase, userId),
  ]);

  const weeklyActivity = buildWeeklyActivity(sessions);
  const thisWeekMinutes = calculateThisWeekMinutes(sessions);
  const planProgress = calculateWeeklyCompletion(activePlan?.days ?? null, sessions);
  const today = getTodayPlanDay(activePlan?.days ?? null);
  const todayExerciseIds = today.day.exercises.map((exercise) => exercise.exercise_id);
  const todayExercises = await getExercisesByIds(supabase, todayExerciseIds);

  return {
    activePlan,
    streak,
    sessions,
    inProgressSession,
    weeklyActivity,
    thisWeekMinutes,
    planProgress,
    todayDayKey: today.dayKey,
    todayPlanDay: today.day,
    todayExercises,
  };
}

export async function getPlanCompletionSummary(supabase: ServerSupabase, userId: string) {
  const [activePlan, sessions] = await Promise.all([
    getActiveWorkoutPlan(supabase, userId),
    getCompletedSessions(supabase, userId, 20),
  ]);

  return {
    activePlan,
    progress: calculateWeeklyCompletion(activePlan?.days ?? null, sessions),
  };
}

export async function getWorkoutSessionView(supabase: ServerSupabase, userId: string, sessionId: string) {
  const session = await getSessionById(supabase, userId, sessionId);
  if (!session) return null;

  const [sessionExercises, plan] = await Promise.all([
    getSessionExercises(supabase, session.id),
    session.plan_id ? getWorkoutPlanById(supabase, userId, session.plan_id) : Promise.resolve(null),
  ]);

  const exercises = await getExercisesByIds(
    supabase,
    sessionExercises.map((exercise) => exercise.exercise_id),
  );

  const exercisesById = new Map(exercises.map((exercise) => [exercise.id, exercise]));
  const planExercises = getSessionPlanExercises(plan?.days ?? null, sessionExercises);

  return {
    session,
    plan,
    items: sessionExercises
      .map((sessionExercise, index) => ({
        sessionExercise,
        exercise: exercisesById.get(sessionExercise.exercise_id) ?? null,
        planExercise: planExercises[index] ?? null,
      }))
      .filter((item) => item.exercise),
  };
}

export async function getProgressData(supabase: ServerSupabase, userId: string) {
  const [streak, sessions, activePlan] = await Promise.all([
    getUserStreak(supabase, userId),
    getCompletedSessions(supabase, userId, 120),
    getActiveWorkoutPlan(supabase, userId),
  ]);

  return {
    streak,
    sessions,
    activePlan,
    weeklyActivity: buildWeeklyActivity(sessions),
    heatmap: buildCompletionHeatmap(sessions),
    thisWeekMinutes: calculateThisWeekMinutes(sessions),
    planProgress: calculateWeeklyCompletion(activePlan?.days ?? null, sessions),
  };
}

export function getWorkoutDayExerciseIds(days: WorkoutPlan["days"] | null | undefined, dayKey: PlanDayKey) {
  const normalized = normalizeWorkoutPlanDays(days);
  return normalized[dayKey].exercises.map((exercise) => exercise.exercise_id);
}

export function getWorkoutHistoryBuckets(sessions: WorkoutSession[]) {
  const buckets = new Map<string, number>();

  for (const session of sessions) {
    if (session.status !== "completed" || !session.completed_at) continue;
    const date = new Date(session.completed_at);
    date.setHours(0, 0, 0, 0);
    const key = date.toISOString().slice(0, 10);
    buckets.set(key, (buckets.get(key) ?? 0) + 1);
  }

  return buckets;
}

export function getTodayPlanKey() {
  return getDayKey();
}
