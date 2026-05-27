import Link from "next/link";
import type { ComponentType } from "react";
import { CheckCircle2, Clock3, Flame, PlayCircle } from "lucide-react";
import type { Exercise, SessionExercise, WorkoutPlanDay } from "@/types/database";

type Props = {
  durationMinutes: number;
  completedExercises: number;
  totalSets: number;
  currentStreak: number;
  nextWorkoutLabel: string;
  nextWorkoutDay: WorkoutPlanDay | null;
  nextWorkoutExercises: Exercise[];
  sessionItems: Array<{ sessionExercise: SessionExercise; exercise: Exercise }>;
};

function SummaryCard({ label, value, icon: Icon }: { label: string; value: string; icon: ComponentType<{ className?: string }> }) {
  return (
    <div
      className="flex items-center gap-3 border bg-[var(--bg-2)]"
      style={{ border: "var(--border-subtle)", borderRadius: "var(--radius-lg)", padding: "16px 18px" }}
    >
      <div className="flex items-center justify-center bg-[var(--color-accent-dim)] text-[var(--color-accent)]" style={{ width: "38px", height: "38px", borderRadius: "9px" }}>
        <Icon className="h-[19px] w-[19px]" />
      </div>
      <div>
        <div className="font-[family-name:var(--font-barlow-condensed)] text-[28px] font-extrabold leading-none text-[var(--color-text-primary)]">{value}</div>
        <div className="mt-[2px] text-[11px] text-[var(--color-text-muted)]">{label}</div>
      </div>
    </div>
  );
}

export function CompleteContent({ durationMinutes, completedExercises, totalSets, currentStreak, nextWorkoutLabel, nextWorkoutDay, nextWorkoutExercises, sessionItems }: Props) {
  return (
    <div className="px-8 py-7">
      <div
        className="relative mb-6 overflow-hidden border bg-[var(--bg-2)]"
        style={{ border: "var(--border-subtle)", borderRadius: "var(--radius-xl)", padding: "24px 24px" }}
      >
        <div className="absolute right-[-28px] top-[-28px] h-[140px] w-[140px] rounded-full" style={{ background: "var(--color-accent-glow)" }} />
        <div className="relative z-10">
          <div className="mb-[8px] inline-flex items-center gap-2 rounded-full bg-[var(--color-accent-dim)] px-3 py-[6px] text-[11px] font-bold uppercase tracking-[1px] text-[var(--color-accent)]">
            <CheckCircle2 className="h-4 w-4" />
            Workout complete
          </div>
          <h1 className="font-[family-name:var(--font-barlow-condensed)] text-[34px] font-black text-[var(--color-text-primary)]">
            Nice work. You closed the session strong.
          </h1>
          <p className="mt-2 max-w-[560px] text-[13px] text-[var(--color-text-secondary)]">
            Your session has been saved, your streak is updated, and the dashboard will reflect the workout right away.
          </p>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-4 gap-3">
        <SummaryCard label="Duration" value={`${durationMinutes}m`} icon={Clock3} />
        <SummaryCard label="Exercises" value={String(completedExercises)} icon={PlayCircle} />
        <SummaryCard label="Sets finished" value={String(totalSets)} icon={CheckCircle2} />
        <SummaryCard label="Current streak" value={String(currentStreak)} icon={Flame} />
      </div>

      <div className="grid grid-cols-[1.1fr_0.9fr] gap-6">
        <section className="border bg-[var(--bg-2)]" style={{ border: "var(--border-subtle)", borderRadius: "var(--radius-xl)", padding: "18px 20px" }}>
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="font-[family-name:var(--font-barlow-condensed)] text-[20px] font-bold text-[var(--color-text-primary)]">Session summary</h2>
            <Link href="/home/progress" className="text-[12px] text-[var(--color-accent)]">See progress →</Link>
          </div>

          <div className="flex flex-col gap-3">
            {sessionItems.map((item) => (
              <div
                key={item.sessionExercise.id}
                className="flex items-center justify-between gap-4 border bg-[var(--bg-3)]"
                style={{ border: "var(--border-subtle)", borderRadius: "12px", padding: "12px 14px" }}
              >
                <div>
                  <div className="text-[13px] font-semibold text-[var(--color-text-primary)]">{item.exercise.name}</div>
                  <div className="mt-1 text-[11px] text-[var(--color-text-muted)]">
                    {item.sessionExercise.sets_done} sets tracked{item.sessionExercise.reps_done ? ` · ${item.sessionExercise.reps_done} reps` : ""}
                  </div>
                </div>
                <span className="rounded-[5px] border bg-[var(--color-accent-dim)] px-[8px] py-[4px] text-[10px] font-bold uppercase text-[var(--color-accent)]" style={{ border: "var(--border-accent)", letterSpacing: "0.5px" }}>
                  Done
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="border bg-[var(--bg-2)]" style={{ border: "var(--border-subtle)", borderRadius: "var(--radius-xl)", padding: "18px 20px" }}>
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="font-[family-name:var(--font-barlow-condensed)] text-[20px] font-bold text-[var(--color-text-primary)]">Next workout</h2>
            <Link href="/home/plan" className="text-[12px] text-[var(--color-accent)]">Open plan →</Link>
          </div>

          <div className="rounded-[14px] border bg-[var(--bg-3)] p-4" style={{ border: "var(--border-subtle)" }}>
            <div className="text-[11px] font-bold uppercase tracking-[1px] text-[var(--color-accent)]">{nextWorkoutLabel}</div>
            <div className="mt-2 text-[16px] font-semibold text-[var(--color-text-primary)]">
              {nextWorkoutDay && nextWorkoutExercises.length > 0 ? `${nextWorkoutExercises.length} exercises lined up` : "Plan your next session"}
            </div>
            <div className="mt-2 text-[12px] text-[var(--color-text-secondary)]">
              {nextWorkoutDay && nextWorkoutExercises.length > 0
                ? nextWorkoutExercises.slice(0, 3).map((exercise) => exercise.name).join(" · ")
                : "Create or update your weekly plan to keep your momentum going."}
            </div>
            <div className="mt-4 flex gap-3">
              <Link href="/home" className="inline-flex items-center gap-2 rounded-[10px] bg-[var(--color-accent)] px-4 py-[10px] font-[family-name:var(--font-barlow-condensed)] text-[15px] font-extrabold uppercase tracking-[0.8px] text-[#0A0A0A]">
                Go to dashboard
              </Link>
              <button type="button" className="rounded-[10px] border px-4 py-[10px] text-[12px] font-semibold text-[var(--color-text-secondary)]" style={{ border: "var(--border-subtle)" }}>
                Share
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
