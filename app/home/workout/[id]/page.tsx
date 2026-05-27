import { notFound } from "next/navigation";
import { getServerSupabase } from "@/lib/supabase-server";
import { getWorkoutSessionView } from "@/lib/workout-data";
import { WorkoutContent } from "@/app/home/workout-content";
import type { Exercise, SessionExercise, WorkoutPlanExercise, WorkoutSession } from "@/types/database";

type WorkoutPageItem = {
  sessionExercise: SessionExercise;
  exercise: Exercise;
  planExercise: WorkoutPlanExercise | null;
};

export default async function WorkoutPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await getServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const sessionView = await getWorkoutSessionView(supabase, user!.id, id);

  if (!sessionView || sessionView.items.length === 0) notFound();

  return (
    <WorkoutContent
      session={sessionView.session as WorkoutSession}
      items={sessionView.items as WorkoutPageItem[]}
    />
  );
}
