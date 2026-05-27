import { AppSidebar } from "@/components/ui/AppSidebar";
import { getServerSupabase } from "@/lib/supabase-server";
import { getPlanCompletionSummary } from "@/lib/workout-data";
import { normalizeWorkoutPlanDays } from "@/lib/workout-helpers";
import type { UserPreferences, UserProfile } from "@/types/database";
import { RouteTransition } from "./route-transition";

function formatDisplayName(profileName: string | null, email: string | null) {
  if (profileName && profileName.trim()) return profileName.trim();
  if (!email) return "RepFlow User";

  const localPart = email.split("@")[0] ?? "user";
  return localPart
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getInitials(name: string) {
  const parts = name.split(/\s+/).filter(Boolean);
  return (parts[0]?.[0] ?? "R") + (parts[1]?.[0] ?? parts[0]?.[1] ?? "F");
}

function formatRole(experienceLevel: UserPreferences["experience_level"] | null) {
  if (!experienceLevel) return "Member";
  return `${experienceLevel.charAt(0).toUpperCase()}${experienceLevel.slice(1)} Member`;
}

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await getServerSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ data: profile }, { data: prefs }, planSummary] = await Promise.all([
    supabase.from("users_profile").select("name").eq("user_id", user!.id).maybeSingle(),
    supabase.from("user_preferences").select("experience_level").eq("user_id", user!.id).maybeSingle(),
    getPlanCompletionSummary(supabase, user!.id),
  ]);

  const displayName = formatDisplayName((profile as Pick<UserProfile, "name"> | null)?.name ?? null, user?.email ?? null);
  const initials = getInitials(displayName).toUpperCase();
  const plannedDays = planSummary.activePlan
    ? Object.values(normalizeWorkoutPlanDays(planSummary.activePlan.days)).filter((day) => !day.is_rest).length
    : 0;

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg-0)] text-[var(--color-text-primary)]">
      <AppSidebar
        user={{
          initials,
          name: displayName,
          role: formatRole((prefs as Pick<UserPreferences, "experience_level"> | null)?.experience_level ?? null),
        }}
        plan={{
          name: planSummary.activePlan?.name ?? "No active plan",
          weekLabel: planSummary.activePlan
            ? `${plannedDays} day${plannedDays === 1 ? "" : "s"} scheduled · ${planSummary.progress}% complete`
            : "Create a plan to start tracking workouts",
          progress: planSummary.activePlan ? planSummary.progress : 0,
        }}
      />
      <RouteTransition>{children}</RouteTransition>
    </div>
  );
}
