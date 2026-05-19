import { getServerSupabase } from "@/lib/supabase-server";
import { HomeContent } from "./home-content";

function mapWorkoutLocation(trainingStyle: string | null, workoutLocation: string | null) {
  if (trainingStyle === "home" || trainingStyle === "gym") return trainingStyle;
  if (trainingStyle === "hybrid") return "both";
  if (workoutLocation === "home" || workoutLocation === "gym" || workoutLocation === "both") return workoutLocation;
  return "both";
}

function mapGoal(fitnessGoals: string[] | null | undefined, goal: string | null) {
  const preferredGoal = fitnessGoals?.[0] ?? goal ?? "stay_active";
  if (preferredGoal === "lose_fat" || preferredGoal === "build_muscle" || preferredGoal === "stay_active") return preferredGoal;
  return "stay_active";
}

function mapEquipment(equipmentList: string[] | null | undefined, equipment: string | null) {
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

export default async function HomePage() {
  const supabase = await getServerSupabase();

  const { data: { user } } = await supabase.auth.getUser();

  const { data: prefs } = await supabase
    .from("user_preferences")
    .select("workout_location, goal, equipment, fitness_goals, training_style, equipment_list, workout_days_per_week, workout_duration_min, experience_level, limitations")
    .eq("user_id", user!.id)
    .maybeSingle();

  return (
    <HomeContent
      userEmail={user!.email!}
      preferences={{
        workoutLocation: mapWorkoutLocation(prefs?.training_style ?? null, prefs?.workout_location ?? null),
        goal: mapGoal(prefs?.fitness_goals, prefs?.goal ?? null),
        equipment: mapEquipment(prefs?.equipment_list, prefs?.equipment ?? null),
      }}
    />
  );
}
