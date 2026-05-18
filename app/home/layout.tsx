import { AppSidebar } from "@/components/ui/AppSidebar";
import { getServerSupabase } from "@/lib/supabase-server";
import type { UserPreferences, UserProfile } from "@/types/database";

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

  const [{ data: profile }, { data: prefs }] = await Promise.all([
    supabase.from("users_profile").select("name").eq("user_id", user!.id).maybeSingle(),
    supabase.from("user_preferences").select("experience_level").eq("user_id", user!.id).maybeSingle(),
  ]);

  const displayName = formatDisplayName((profile as Pick<UserProfile, "name"> | null)?.name ?? null, user?.email ?? null);
  const initials = getInitials(displayName).toUpperCase();

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg-0)] text-[var(--color-text-primary)]">
      <AppSidebar
        user={{
          initials,
          name: displayName,
          role: formatRole((prefs as Pick<UserPreferences, "experience_level"> | null)?.experience_level ?? null),
        }}
        plan={{
          name: "Strength Builder 8W",
          weekLabel: "Week 5 of 8 · 62% complete",
          progress: 62,
        }}
      />
      <main className="min-h-0 min-w-0 flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
