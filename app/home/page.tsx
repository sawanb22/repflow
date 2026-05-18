import { getServerSupabase } from "@/lib/supabase-server";
import { HomeContent } from "./home-content";

export default async function HomePage() {
  const supabase = await getServerSupabase();

  const { data: { user } } = await supabase.auth.getUser();

  const { data: prefs } = await supabase
    .from("user_preferences")
    .select("workout_location, goal, equipment, fitness_goals, training_style, equipment_list, workout_days_per_week, workout_duration_min, experience_level, limitations")
    .eq("user_id", user!.id)
    .single();

  const defaultGoal = (prefs?.fitness_goals?.[0]) ?? prefs?.goal ?? "stay_active";
  const mappedGoal = defaultGoal === "improve_flexibility" || defaultGoal === "reduce_stress" ? "stay_active" : defaultGoal;

  return (
    <HomeContent
      userEmail={user!.email!}
      preferences={{
        workoutLocation: (prefs?.training_style as "home" | "gym" | "both") ?? (prefs?.workout_location as "home" | "gym" | "both") ?? "both",
        goal: (mappedGoal as "lose_fat" | "build_muscle" | "stay_active") ?? "stay_active",
        equipment: ((prefs?.equipment_list?.length ?? 0) > 0 ? prefs!.equipment_list![0] : prefs?.equipment) as "nothing_yet" | "dumbbells" | "resistance_bands" | "full_gym" ?? "nothing_yet",
      }}
    />
  );
}
