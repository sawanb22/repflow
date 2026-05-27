import type {
  Category,
  Exercise,
  Goal,
  PlanDayKey,
  SessionStatus,
  UserEquipment,
  UserPreferences,
  UserStreak,
  WorkoutLocation,
  WorkoutPlanDay,
  WorkoutPlanDays,
  WorkoutPlanExercise,
  WorkoutSession,
} from "@/types/database";
import { parseRestTimeSeconds } from "@/lib/rest-time";

export const PLAN_DAY_KEYS: PlanDayKey[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export const PLAN_DAY_LABELS: Record<PlanDayKey, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

const workoutDayPatterns: Record<number, PlanDayKey[]> = {
  1: ["monday"],
  2: ["monday", "thursday"],
  3: ["monday", "wednesday", "friday"],
  4: ["monday", "tuesday", "thursday", "saturday"],
  5: ["monday", "tuesday", "thursday", "friday", "sunday"],
  6: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
  7: [...PLAN_DAY_KEYS],
};

const weekdayByIndex: PlanDayKey[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export function mapWorkoutLocation(trainingStyle: string | null, workoutLocation: string | null): WorkoutLocation {
  if (trainingStyle === "home" || trainingStyle === "gym") return trainingStyle;
  if (trainingStyle === "hybrid") return "both";
  if (workoutLocation === "home" || workoutLocation === "gym" || workoutLocation === "both") return workoutLocation;
  return "both";
}

export function mapGoal(fitnessGoals: string[] | null | undefined, goal: string | null): Goal {
  const preferredGoal = fitnessGoals?.[0] ?? goal ?? "stay_active";
  if (preferredGoal === "lose_fat" || preferredGoal === "build_muscle" || preferredGoal === "stay_active") return preferredGoal;
  return "stay_active";
}

export function mapEquipment(equipmentList: string[] | null | undefined, equipment: string | null): UserEquipment {
  const preferredEquipment = equipmentList?.[0] ?? equipment ?? "nothing_yet";
  if (
    preferredEquipment === "bodyweight" ||
    preferredEquipment === "nothing_yet" ||
    preferredEquipment === "dumbbells" ||
    preferredEquipment === "resistance_bands" ||
    preferredEquipment === "kettlebell" ||
    preferredEquipment === "jump_rope" ||
    preferredEquipment === "full_gym"
  ) {
    return preferredEquipment;
  }
  return "nothing_yet";
}

export function buildEmptyWorkoutPlanDays(): Record<PlanDayKey, WorkoutPlanDay> {
  return {
    monday: { is_rest: true, exercises: [] },
    tuesday: { is_rest: true, exercises: [] },
    wednesday: { is_rest: true, exercises: [] },
    thursday: { is_rest: true, exercises: [] },
    friday: { is_rest: true, exercises: [] },
    saturday: { is_rest: true, exercises: [] },
    sunday: { is_rest: true, exercises: [] },
  };
}

export function normalizeWorkoutPlanDays(days: WorkoutPlanDays | null | undefined): Record<PlanDayKey, WorkoutPlanDay> {
  const base = buildEmptyWorkoutPlanDays();
  if (!days) return base;

  for (const key of PLAN_DAY_KEYS) {
    const day = days[key];
    if (!day) continue;

    base[key] = {
      is_rest: day.is_rest ?? false,
      exercises: (day.exercises ?? [])
        .slice()
        .sort((left, right) => left.order - right.order)
        .map((exercise) => ({
          exercise_id: exercise.exercise_id,
          order: exercise.order,
          sets: exercise.sets,
          reps: exercise.reps,
          rest_seconds: exercise.rest_seconds,
        })),
    };
  }

  return base;
}

export function getDayKey(date = new Date()): PlanDayKey {
  return weekdayByIndex[date.getDay()] ?? "monday";
}

export function getDayLabel(dayKey: PlanDayKey) {
  return PLAN_DAY_LABELS[dayKey];
}

export function getWorkoutDaysPerWeek(daysPerWeek: number | null | undefined) {
  const safeDays = Math.max(1, Math.min(7, daysPerWeek ?? 3));
  return workoutDayPatterns[safeDays];
}

export function resolveWorkoutLocation(categorySlug: string | null | undefined) {
  return categorySlug === "gym-workout" ? "gym" : "home";
}

function scoreExerciseForGoal(exercise: Exercise, goal: Goal) {
  const slug = exercise.slug;
  const muscles = [...exercise.primary_muscles, ...exercise.secondary_muscles].join(" ").toLowerCase();

  if (goal === "lose_fat") {
    if (slug.includes("jump-rope") || slug.includes("burpee") || slug.includes("mountain-climber")) return 5;
    if (muscles.includes("core") || muscles.includes("legs") || muscles.includes("glutes") || muscles.includes("quadriceps")) return 4;
    return 3;
  }

  if (goal === "build_muscle") {
    if (slug.includes("bench") || slug.includes("squat") || slug.includes("deadlift") || slug.includes("row") || slug.includes("press")) return 5;
    if (muscles.includes("chest") || muscles.includes("back") || muscles.includes("shoulders") || muscles.includes("biceps") || muscles.includes("triceps")) return 4;
    return 3;
  }

  if (exercise.difficulty === "beginner") return 5;
  if (exercise.difficulty === "intermediate") return 4;
  return 3;
}

function matchesEquipment(exercise: Exercise, preferredEquipment: UserEquipment, workoutLocation: WorkoutLocation, categorySlug: string | null | undefined) {
  const location = resolveWorkoutLocation(categorySlug);
  if (location === "gym") return workoutLocation !== "home";
  if (preferredEquipment === "full_gym") return true;
  if (preferredEquipment === "nothing_yet") return exercise.slug === "push-up" || exercise.slug === "plank";
  if (preferredEquipment === "bodyweight") return exercise.slug === "push-up" || exercise.slug === "plank";
  if (preferredEquipment === "dumbbells") return exercise.slug.includes("dumbbell") || exercise.slug === "bicep-curl";
  if (preferredEquipment === "resistance_bands") return exercise.slug.includes("band");
  if (preferredEquipment === "kettlebell") return exercise.slug.includes("kettlebell");
  if (preferredEquipment === "jump_rope") return exercise.slug.includes("jump-rope");
  return true;
}

function exerciseCountForGoal(goal: Goal) {
  if (goal === "lose_fat") return 5;
  if (goal === "build_muscle") return 4;
  return 4;
}

export function buildAutoPlanDays({
  preferences,
  exercises,
  categories,
}: {
  preferences: Pick<UserPreferences, "workout_location" | "goal" | "equipment" | "fitness_goals" | "training_style" | "equipment_list" | "workout_days_per_week">;
  exercises: Exercise[];
  categories: Category[];
}): Record<PlanDayKey, WorkoutPlanDay> {
  const days = buildEmptyWorkoutPlanDays();
  const workoutLocation = mapWorkoutLocation(preferences.training_style ?? null, preferences.workout_location ?? null);
  const goal = mapGoal(preferences.fitness_goals, preferences.goal ?? null);
  const preferredEquipment = mapEquipment(preferences.equipment_list, preferences.equipment ?? null);
  const categoriesById = new Map(categories.map((category) => [category.id, category]));

  const filteredExercises = exercises
    .filter((exercise) => {
      const category = categoriesById.get(exercise.category_id ?? "");
      const categorySlug = category?.slug ?? null;
      const location = resolveWorkoutLocation(categorySlug);
      const locationMatches = workoutLocation === "both" || location === workoutLocation;
      return locationMatches && matchesEquipment(exercise, preferredEquipment, workoutLocation, categorySlug);
    })
    .sort((left, right) => {
      const scoreDifference = scoreExerciseForGoal(right, goal) - scoreExerciseForGoal(left, goal);
      if (scoreDifference !== 0) return scoreDifference;
      return left.name.localeCompare(right.name);
    });

  const selectedWorkoutDays = getWorkoutDaysPerWeek(preferences.workout_days_per_week);
  const exercisesPerDay = exerciseCountForGoal(goal);

  if (filteredExercises.length === 0) return days;

  selectedWorkoutDays.forEach((dayKey, dayIndex) => {
    const plannedExercises: WorkoutPlanExercise[] = [];
    let cursor = dayIndex * exercisesPerDay;

    while (plannedExercises.length < Math.min(exercisesPerDay, filteredExercises.length)) {
      const exercise = filteredExercises[cursor % filteredExercises.length];
      cursor += 1;

      if (plannedExercises.some((entry) => entry.exercise_id === exercise.id)) {
        if (plannedExercises.length >= filteredExercises.length) break;
        continue;
      }

      plannedExercises.push({
        exercise_id: exercise.id,
        order: plannedExercises.length + 1,
        sets: exercise.sets,
        reps: exercise.reps,
        rest_seconds: parseRestTimeSeconds(exercise.rest_time),
      });
    }

    days[dayKey] = {
      is_rest: plannedExercises.length === 0,
      exercises: plannedExercises,
    };
  });

  return days;
}

export function getPlanName(goal: Goal, workoutLocation: WorkoutLocation) {
  if (goal === "lose_fat") return workoutLocation === "gym" ? "Conditioning Builder" : "Fat Loss Flow";
  if (goal === "build_muscle") return workoutLocation === "home" ? "Home Strength Builder" : "Strength Builder";
  return workoutLocation === "both" ? "Balanced Weekly Flow" : "Active Routine";
}

export function getPlanDescription(daysPerWeek: number | null | undefined) {
  const count = Math.max(1, Math.min(7, daysPerWeek ?? 3));
  return `${count} workout${count === 1 ? "" : "s"} each week`;
}

function formatDateKey(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function isSameDate(left: Date, right: Date) {
  return formatDateKey(left) === formatDateKey(right);
}

function getStartOfWeek(anchorDate = new Date()) {
  const start = new Date(anchorDate);
  const day = start.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() + diff);
  return start;
}

export function getTodayPlanDay(days: WorkoutPlanDays | null | undefined, date = new Date()) {
  const normalized = normalizeWorkoutPlanDays(days);
  const dayKey = getDayKey(date);
  return {
    dayKey,
    day: normalized[dayKey],
  };
}

export function calculateWeeklyCompletion(days: WorkoutPlanDays | null | undefined, sessions: WorkoutSession[], anchorDate = new Date()) {
  const normalized = normalizeWorkoutPlanDays(days);
  const plannedWorkoutDays = PLAN_DAY_KEYS.filter((dayKey) => !normalized[dayKey].is_rest).length;
  if (plannedWorkoutDays === 0) return 0;

  const weekStart = getStartOfWeek(anchorDate);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 7);

  const completedDays = new Set(
    sessions
      .filter((session) => {
        if (session.status !== "completed" || !session.completed_at) return false;
        const completedAt = new Date(session.completed_at);
        return completedAt >= weekStart && completedAt < weekEnd;
      })
      .map((session) => formatDateKey(new Date(session.completed_at!))),
  );

  return Math.max(0, Math.min(100, Math.round((completedDays.size / plannedWorkoutDays) * 100)));
}

export function calculateThisWeekMinutes(sessions: WorkoutSession[], anchorDate = new Date()) {
  const weekStart = getStartOfWeek(anchorDate);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 7);

  return sessions.reduce((total, session) => {
    if (session.status !== "completed" || !session.completed_at || !session.duration_minutes) return total;
    const completedAt = new Date(session.completed_at);
    if (completedAt < weekStart || completedAt >= weekEnd) return total;
    return total + session.duration_minutes;
  }, 0);
}

export function buildWeeklyActivity(sessions: WorkoutSession[], anchorDate = new Date()) {
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(anchorDate);
    date.setHours(0, 0, 0, 0);
    date.setDate(anchorDate.getDate() - (6 - index));
    return date;
  });

  const minutesByDay = new Map<string, number>();
  for (const session of sessions) {
    if (session.status !== "completed" || !session.completed_at) continue;
    const date = new Date(session.completed_at);
    const key = formatDateKey(date);
    minutesByDay.set(key, (minutesByDay.get(key) ?? 0) + (session.duration_minutes ?? 0));
  }

  const maxMinutes = Math.max(...days.map((date) => minutesByDay.get(formatDateKey(date)) ?? 0), 0);

  return days.map((date) => {
    const minutes = minutesByDay.get(formatDateKey(date)) ?? 0;
    const height = maxMinutes === 0 ? "0%" : `${Math.max(18, Math.round((minutes / maxMinutes) * 100))}%`;
    return {
      label: date.toLocaleDateString("en-US", { weekday: "narrow" }).toUpperCase(),
      height,
      isToday: isSameDate(date, anchorDate),
      hasFill: minutes > 0,
      minutes,
    };
  });
}

export function buildCompletionHeatmap(sessions: WorkoutSession[], anchorDate = new Date(), weekCount = 12) {
  const today = new Date(anchorDate);
  today.setHours(0, 0, 0, 0);

  const currentWeekStart = getStartOfWeek(today);
  const firstWeekStart = new Date(currentWeekStart);
  firstWeekStart.setDate(firstWeekStart.getDate() - (weekCount - 1) * 7);

  const minutesByDay = new Map<string, number>();
  for (const session of sessions) {
    if (session.status !== "completed" || !session.completed_at) continue;

    const completedAt = new Date(session.completed_at);
    completedAt.setHours(0, 0, 0, 0);
    if (completedAt < firstWeekStart || completedAt > today) continue;

    const key = formatDateKey(completedAt);
    minutesByDay.set(key, (minutesByDay.get(key) ?? 0) + (session.duration_minutes ?? 0));
  }

  const maxMinutes = Math.max(...Array.from(minutesByDay.values()), 0);

  return Array.from({ length: weekCount }, (_, weekIndex) => {
    const weekStart = new Date(firstWeekStart);
    weekStart.setDate(firstWeekStart.getDate() + weekIndex * 7);

    return {
      weekKey: formatDateKey(weekStart),
      days: PLAN_DAY_KEYS.map((dayKey, dayIndex) => {
        const date = new Date(weekStart);
        date.setDate(weekStart.getDate() + dayIndex);

        const dateKey = formatDateKey(date);
        const isFuture = date > today;
        const minutes = isFuture ? 0 : (minutesByDay.get(dateKey) ?? 0);

        let intensity = 0;
        if (minutes > 0 && maxMinutes > 0) {
          const ratio = minutes / maxMinutes;
          if (ratio <= 0.25) intensity = 1;
          else if (ratio <= 0.5) intensity = 2;
          else if (ratio <= 0.75) intensity = 3;
          else intensity = 4;
        }

        return {
          dateKey,
          label: PLAN_DAY_LABELS[dayKey].slice(0, 1),
          minutes,
          intensity,
          isToday: isSameDate(date, today),
          isFuture,
        };
      }),
    };
  });
}

export function getWorkoutMinutesLabel(day: WorkoutPlanDay | undefined) {
  if (!day || day.is_rest || day.exercises.length === 0) return "Rest Day";
  const totalSeconds = day.exercises.reduce((sum, exercise) => sum + exercise.rest_seconds * exercise.sets, 0);
  const minutes = Math.max(15, Math.round(totalSeconds / 60) + day.exercises.length * 4);
  return `${day.exercises.length} exercises · ${minutes} min`;
}

export function getNextWorkoutDay(days: WorkoutPlanDays | null | undefined, anchorDate = new Date()) {
  const normalized = normalizeWorkoutPlanDays(days);
  for (let offset = 1; offset <= 7; offset += 1) {
    const date = new Date(anchorDate);
    date.setDate(anchorDate.getDate() + offset);
    const key = getDayKey(date);
    if (!normalized[key].is_rest && normalized[key].exercises.length > 0) {
      return {
        dayKey: key,
        day: normalized[key],
      };
    }
  }
  return null;
}

export function calculateStreakUpdate(streak: UserStreak | null, completionDate = new Date()) {
  const todayKey = formatDateKey(completionDate);
  const yesterday = new Date(completionDate);
  yesterday.setDate(completionDate.getDate() - 1);
  const yesterdayKey = formatDateKey(yesterday);

  const currentStreak = streak?.current_streak ?? 0;
  const longestStreak = streak?.longest_streak ?? 0;
  const lastWorkoutDate = streak?.last_workout_date;

  let nextCurrentStreak = 1;
  if (lastWorkoutDate === todayKey) nextCurrentStreak = currentStreak;
  else if (lastWorkoutDate === yesterdayKey) nextCurrentStreak = currentStreak + 1;

  return {
    current_streak: nextCurrentStreak,
    longest_streak: Math.max(longestStreak, nextCurrentStreak),
    last_workout_date: todayKey,
    total_workouts: lastWorkoutDate === todayKey ? (streak?.total_workouts ?? 0) : (streak?.total_workouts ?? 0) + 1,
  };
}

export function isCompletedStatus(status: SessionStatus) {
  return status === "completed";
}
