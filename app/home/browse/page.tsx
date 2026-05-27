import { getServerSupabase } from "@/lib/supabase-server";
import { BrowseContent } from "./browse-content";
import type { Category, Exercise, Equipment, WorkoutLocation } from "@/types/database";

function mapWorkoutLocation(trainingStyle: string | null, workoutLocation: string | null): WorkoutLocation {
  if (trainingStyle === "home" || trainingStyle === "gym") return trainingStyle;
  if (trainingStyle === "hybrid") return "both";
  if (workoutLocation === "home" || workoutLocation === "gym" || workoutLocation === "both") return workoutLocation;
  return "both";
}

export default async function BrowsePage() {
  const supabase = await getServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ data: equipment }, { data: exercises }, { data: categories }, { data: prefs }] = await Promise.all([
    supabase.from("equipment").select("*").order("name"),
    supabase.from("exercises").select("*").eq("is_published", true).order("name"),
    supabase.from("categories").select("*").order("name"),
    supabase
      .from("user_preferences")
      .select("workout_location, training_style")
      .eq("user_id", user!.id)
      .maybeSingle(),
  ]);

  return (
    <BrowseContent
      equipment={(equipment ?? []) as Equipment[]}
      exercises={(exercises ?? []) as Exercise[]}
      categories={(categories ?? []) as Category[]}
      defaultWorkoutLocation={mapWorkoutLocation(prefs?.training_style ?? null, prefs?.workout_location ?? null)}
    />
  );
}
