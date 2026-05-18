import { getServerSupabase } from "@/lib/supabase-server";
import { BrowseContent } from "./browse-content";
import type { Exercise, Equipment } from "@/types/database";

export default async function BrowsePage() {
  const supabase = await getServerSupabase();

  const { data: equipment } = await supabase
    .from("equipment")
    .select("*")
    .order("name");

  const { data: exercises } = await supabase
    .from("exercises")
    .select("*")
    .eq("is_published", true)
    .order("name");

  return (
    <BrowseContent
      equipment={(equipment ?? []) as Equipment[]}
      exercises={(exercises ?? []) as Exercise[]}
    />
  );
}
