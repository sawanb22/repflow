import { redirect } from "next/navigation";
import { getServerSupabase } from "@/lib/supabase-server";

export default async function Home() {
  const supabase = await getServerSupabase();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data: prefs, error } = await supabase
    .from("user_preferences")
    .select("onboarding_done")
    .eq("user_id", user.id)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("[page.tsx] prefs error:", error.message);
  }

  redirect(prefs?.onboarding_done ? "/home" : "/onboarding");
}
