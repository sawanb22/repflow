import { getServerSupabase } from "@/lib/supabase-server";
import { SettingsContent } from "@/app/home/settings-content";
import type { UserPreferences, UserProfile } from "@/types/database";

function titleCase(value: string) {
  return value
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default async function SettingsPage() {
  const supabase = await getServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ data: profile }, { data: preferences }] = await Promise.all([
    supabase.from("users_profile").select("name").eq("user_id", user!.id).maybeSingle(),
    supabase
      .from("user_preferences")
      .select("fitness_goals, training_style, equipment_list, workout_days_per_week, workout_duration_min")
      .eq("user_id", user!.id)
      .maybeSingle(),
  ]);

  const profileName = (profile as Pick<UserProfile, "name"> | null)?.name ?? "";
  const prefs = preferences as Pick<UserPreferences, "fitness_goals" | "training_style" | "equipment_list" | "workout_days_per_week" | "workout_duration_min"> | null;
  const workoutSummary = prefs
    ? `${titleCase(prefs.training_style ?? "both")} · ${prefs.workout_days_per_week ?? 3} days / week · ${prefs.workout_duration_min ?? 30} min · ${(prefs.equipment_list ?? []).map(titleCase).join(", ") || "No equipment saved"}`
    : "No workout preferences saved yet.";

  return <SettingsContent profileName={profileName} workoutSummary={workoutSummary} />;
}
