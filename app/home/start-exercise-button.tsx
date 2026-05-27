"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Play } from "lucide-react";
import { SkeletonButtonContent } from "@/components/ui/Skeleton";
import { toast } from "@/lib/toast-store";
import { createClient } from "@/utils/supabase/client";

type Props = {
  exerciseId: string;
};

export function StartExerciseButton({ exerciseId }: Props) {
  const router = useRouter();
  const [isStarting, setIsStarting] = useState(false);

  async function handleStart() {
    if (isStarting) return;

    setIsStarting(true);

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error("Your session expired. Please sign in again.");
        return;
      }

      const { data: existingSession } = await supabase
        .from("workout_sessions")
        .select("id")
        .eq("user_id", user.id)
        .eq("status", "in_progress")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (existingSession?.id) {
        router.push(`/home/workout/${existingSession.id}`);
        return;
      }

      const { data: session, error: sessionError } = await supabase
        .from("workout_sessions")
        .insert({
          user_id: user.id,
          plan_id: null,
          status: "in_progress",
        })
        .select("id")
        .single();

      if (sessionError || !session) {
        toast.error(sessionError?.message ?? "Unable to start exercise.");
        return;
      }

      const { error: exerciseError } = await supabase.from("session_exercises").insert({
        session_id: session.id,
        exercise_id: exerciseId,
        order_index: 1,
      });

      if (exerciseError) {
        toast.error(exerciseError.message);
        return;
      }

      router.push(`/home/workout/${session.id}`);
    } finally {
      setIsStarting(false);
    }
  }

  return (
    <div className="grid gap-2">
      <button
        type="button"
        onClick={handleStart}
        disabled={isStarting}
        aria-busy={isStarting || undefined}
        className="relative flex w-full items-center justify-center gap-[10px] bg-[var(--color-accent)] text-[var(--color-bg)] disabled:opacity-60"
        style={{
          padding: "16px",
          borderRadius: "var(--radius-xl)",
          fontFamily: "var(--font-barlow-condensed)",
          fontSize: "18px",
          fontWeight: 900,
          letterSpacing: "1.5px",
          textTransform: "uppercase",
        }}
      >
        <span className={isStarting ? "opacity-0" : "inline-flex items-center gap-[10px]"}>
          <Play className="h-4 w-4 fill-current" />
          Start Exercise
        </span>
        {isStarting ? <SkeletonButtonContent withIcon labelWidth="w-[124px]" tone="contrast" /> : null}
      </button>
    </div>
  );
}
