import { getServerSupabase } from "@/lib/supabase-server";
import { getDashboardData, getUserPreferences } from "@/lib/workout-data";
import { getDayLabel, getWorkoutMinutesLabel, mapEquipment, mapGoal, mapWorkoutLocation } from "@/lib/workout-helpers";
import { HomeContent } from "./home-content";

function titleCase(value: string) {
  return value
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatWeeklyMinutes(minutes: number) {
  if (minutes >= 60) {
    const hours = minutes / 60;
    return `${hours % 1 === 0 ? hours.toFixed(0) : hours.toFixed(1)}h`;
  }
  return `${minutes}m`;
}

function getDifficultyLabel(difficulties: string[]) {
  if (difficulties.includes("advanced")) return "Advanced";
  if (difficulties.includes("intermediate")) return "Intermediate";
  return "Beginner";
}

export default async function HomePage() {
  const supabase = await getServerSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [prefs, dashboard] = await Promise.all([
    getUserPreferences(supabase, user!.id),
    getDashboardData(supabase, user!.id),
  ]);

  const workoutLocation = mapWorkoutLocation(prefs?.training_style ?? null, prefs?.workout_location ?? null);
  const goal = mapGoal(prefs?.fitness_goals, prefs?.goal ?? null);
  const equipment = mapEquipment(prefs?.equipment_list, prefs?.equipment ?? null);

  const todayWorkoutPills = dashboard.todayExercises.length > 0
    ? Array.from(
      new Set(
        dashboard.todayExercises
          .flatMap((exercise) => exercise.primary_muscles)
          .map((muscle) => titleCase(muscle)),
      ),
    ).slice(0, 3)
    : [titleCase(goal), titleCase(workoutLocation), `${prefs?.workout_days_per_week ?? 3} Days / Week`];

  const todayWorkoutMeta = !dashboard.activePlan
    ? "Auto-generate a weekly plan from your preferences"
    : dashboard.todayPlanDay.is_rest || dashboard.todayExercises.length === 0
      ? `${dashboard.activePlan.name} · Recovery and reset`
      : `${getWorkoutMinutesLabel(dashboard.todayPlanDay)} · ${getDifficultyLabel(dashboard.todayExercises.map((exercise) => exercise.difficulty))}`;

  const todayWorkoutTitle = !dashboard.activePlan
    ? "Build Your Weekly Plan"
    : dashboard.todayPlanDay.is_rest || dashboard.todayExercises.length === 0
      ? "Recovery Day"
      : dashboard.activePlan.name;

  const todayWorkoutEyebrow = dashboard.inProgressSession
    ? "Today · In Progress"
    : !dashboard.activePlan
      ? "Today · No Active Plan"
      : dashboard.todayPlanDay.is_rest || dashboard.todayExercises.length === 0
        ? "Today · Rest Day"
        : `Today · ${getDayLabel(dashboard.todayDayKey)}`;

  return (
    <HomeContent
      userEmail={user!.email!}
      preferences={{
        workoutLocation,
        goal,
        equipment,
      }}
      dashboard={{
        currentStreak: String(dashboard.streak?.current_streak ?? 0),
        totalWorkouts: String(dashboard.streak?.total_workouts ?? dashboard.sessions.length),
        thisWeek: formatWeeklyMinutes(dashboard.thisWeekMinutes),
        weeklyActivity: dashboard.weeklyActivity,
        planProgress: dashboard.planProgress,
        todayWorkout: {
          eyebrow: todayWorkoutEyebrow,
          title: todayWorkoutTitle,
          meta: todayWorkoutMeta,
          pills: todayWorkoutPills,
          activePlanId: dashboard.activePlan?.id ?? null,
          sessionId: dashboard.inProgressSession?.id ?? null,
          isRestDay: dashboard.todayPlanDay.is_rest || dashboard.todayExercises.length === 0,
          planExercises: dashboard.todayPlanDay.exercises,
        },
      }}
    />
  );
}
