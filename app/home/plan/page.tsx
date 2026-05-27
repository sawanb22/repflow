import { getServerSupabase } from "@/lib/supabase-server";
import { getActiveWorkoutPlan, getCategories, getCompletedSessions, getPublishedExercises, getUserPreferences } from "@/lib/workout-data";
import { calculateWeeklyCompletion, getDayKey } from "@/lib/workout-helpers";
import { PlanContent } from "@/app/home/plan-content";

export default async function PlanPage() {
  const supabase = await getServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [activePlan, exercises, categories, preferences, sessions] = await Promise.all([
    getActiveWorkoutPlan(supabase, user!.id),
    getPublishedExercises(supabase),
    getCategories(supabase),
    getUserPreferences(supabase, user!.id),
    getCompletedSessions(supabase, user!.id, 30),
  ]);

  return (
    <PlanContent
      activePlan={activePlan}
      exercises={exercises}
      categories={categories}
      preferences={{
        workout_location: preferences?.workout_location ?? "both",
        goal: preferences?.goal ?? "stay_active",
        equipment: preferences?.equipment ?? "nothing_yet",
        fitness_goals: preferences?.fitness_goals ?? [],
        training_style: preferences?.training_style ?? null,
        equipment_list: preferences?.equipment_list ?? [],
        workout_days_per_week: preferences?.workout_days_per_week ?? 3,
      }}
      progress={calculateWeeklyCompletion(activePlan?.days ?? null, sessions)}
      todayPlanDayKey={getDayKey()}
    />
  );
}
