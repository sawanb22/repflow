import { getServerSupabase } from "@/lib/supabase-server";
import { getProgressData } from "@/lib/workout-data";
import { ProgressContent } from "@/app/home/progress-content";

export default async function ProgressPage() {
  const supabase = await getServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const progressData = await getProgressData(supabase, user!.id);

  return (
    <ProgressContent
      currentStreak={progressData.streak?.current_streak ?? 0}
      longestStreak={progressData.streak?.longest_streak ?? 0}
      totalWorkouts={progressData.streak?.total_workouts ?? progressData.sessions.length}
      thisWeekMinutes={progressData.thisWeekMinutes}
      weeklyActivity={progressData.weeklyActivity}
      heatmap={progressData.heatmap}
      sessions={progressData.sessions}
      activePlan={progressData.activePlan}
      progress={progressData.planProgress}
    />
  );
}
