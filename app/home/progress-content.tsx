import Link from "next/link";
import type { ComponentType } from "react";
import { Clock3, Flame, History, Trophy } from "lucide-react";
import type { WorkoutPlan, WorkoutSession } from "@/types/database";

type WeeklyDay = {
  label: string;
  height: string;
  isToday: boolean;
  hasFill: boolean;
  minutes: number;
};

type HeatmapCell = {
  dateKey: string;
  label: string;
  minutes: number;
  intensity: number;
  isToday: boolean;
  isFuture: boolean;
};

type HeatmapWeek = {
  weekKey: string;
  days: HeatmapCell[];
};

type Props = {
  currentStreak: number;
  longestStreak: number;
  totalWorkouts: number;
  thisWeekMinutes: number;
  weeklyActivity: WeeklyDay[];
  heatmap: HeatmapWeek[];
  sessions: WorkoutSession[];
  activePlan: WorkoutPlan | null;
  progress: number;
};

function StatTile({ label, value, icon: Icon }: { label: string; value: string; icon: ComponentType<{ className?: string }> }) {
  return (
    <div
      className="flex items-center gap-3 border bg-[var(--bg-2)]"
      style={{ border: "var(--border-subtle)", borderRadius: "var(--radius-lg)", padding: "16px 18px" }}
    >
      <div
        className="flex items-center justify-center bg-[var(--color-accent-dim)] text-[var(--color-accent)]"
        style={{ width: "38px", height: "38px", borderRadius: "9px" }}
      >
        <Icon className="h-[19px] w-[19px]" />
      </div>
      <div>
        <div className="font-[family-name:var(--font-barlow-condensed)] text-[28px] font-extrabold leading-none text-[var(--color-text-primary)]">
          {value}
        </div>
        <div className="mt-[2px] text-[11px] text-[var(--color-text-muted)]">{label}</div>
      </div>
    </div>
  );
}

function heatmapCellStyle(cell: HeatmapCell) {
  if (cell.isFuture) return { background: "var(--bg-3)", opacity: 0.35 };
  if (cell.intensity === 0) return { background: "var(--bg-3)" };
  return {
    background: `rgba(var(--color-accent-rgb), ${0.18 + cell.intensity * 0.14})`,
    border: cell.isToday ? "1px solid rgba(var(--color-accent-rgb), 0.65)" : "1px solid rgba(var(--color-accent-rgb), 0.16)",
  };
}

export function ProgressContent({ currentStreak, longestStreak, totalWorkouts, thisWeekMinutes, weeklyActivity, heatmap, sessions, activePlan, progress }: Props) {
  return (
    <div className="px-8 py-7">
      <div className="mb-6">
        <div className="text-[11px] font-bold uppercase tracking-[1.2px] text-[var(--color-accent)]">Progress</div>
        <h1 className="font-[family-name:var(--font-barlow-condensed)] text-[32px] font-black text-[var(--color-text-primary)]">
          Your Training Snapshot
        </h1>
        <p className="mt-1 text-[13px] text-[var(--color-text-secondary)]">
          Track consistency, workout volume, and your recent training history.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-4 gap-3">
        <StatTile label="Current streak" value={String(currentStreak)} icon={Flame} />
        <StatTile label="Longest streak" value={String(longestStreak)} icon={Trophy} />
        <StatTile label="Workouts done" value={String(totalWorkouts)} icon={History} />
        <StatTile label="This week" value={`${thisWeekMinutes}m`} icon={Clock3} />
      </div>

      <section
        className="mb-6 border bg-[var(--bg-2)]"
        style={{ border: "var(--border-subtle)", borderRadius: "var(--radius-xl)", padding: "18px 20px" }}
      >
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="font-[family-name:var(--font-barlow-condensed)] text-[20px] font-bold text-[var(--color-text-primary)]">
            Weekly activity
          </h2>
          <span className="text-[12px] text-[var(--color-accent)]">Last 7 days</span>
        </div>
        <div className="flex h-[92px] items-end gap-2">
          {weeklyActivity.map((day, index) => (
            <div key={`${day.label}-${index}`} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex w-full flex-1 items-end rounded-[8px] bg-[var(--bg-3)] px-[2px] py-[2px]">
                {day.hasFill ? (
                  <div
                    className="w-full rounded-[6px] bg-[var(--color-accent)]"
                    style={{ height: day.height, opacity: day.isToday ? 1 : 0.8 }}
                    title={`${day.minutes} min`}
                  />
                ) : null}
              </div>
              <div className="text-[10px] font-semibold" style={{ color: day.isToday ? "var(--color-accent)" : "var(--color-text-muted)" }}>
                {day.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mb-6 grid grid-cols-[1.35fr_0.85fr] gap-6">
        <section
          className="border bg-[var(--bg-2)]"
          style={{ border: "var(--border-subtle)", borderRadius: "var(--radius-xl)", padding: "18px 20px" }}
        >
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="font-[family-name:var(--font-barlow-condensed)] text-[20px] font-bold text-[var(--color-text-primary)]">
              Weekly completion heatmap
            </h2>
            <span className="text-[12px] text-[var(--color-accent)]">Last 12 weeks</span>
          </div>
          <div className="mb-3 grid grid-cols-[auto_1fr] gap-3">
            <div className="grid grid-rows-7 gap-2 pt-[2px]">
              {(heatmap[0]?.days ?? []).map((day) => (
                <div key={`label-${day.label}-${day.dateKey}`} className="flex h-[14px] items-center text-[10px] font-semibold text-[var(--color-text-muted)]">
                  {day.label}
                </div>
              ))}
            </div>
            <div className="flex gap-2 overflow-hidden">
              {heatmap.map((week) => (
                <div key={week.weekKey} className="grid grid-rows-7 gap-2">
                  {week.days.map((cell) => (
                    <div
                      key={cell.dateKey}
                      className="h-[14px] w-[14px] rounded-[4px]"
                      style={heatmapCellStyle(cell)}
                      title={`${cell.dateKey} · ${cell.minutes} min`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <p className="text-[12px] text-[var(--color-text-muted)]">
            Darker cells represent more completed workout time for that day across the last 12 weeks.
          </p>
        </section>

        <section
          className="border bg-[var(--bg-2)]"
          style={{ border: "var(--border-subtle)", borderRadius: "var(--radius-xl)", padding: "18px 20px" }}
        >
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="font-[family-name:var(--font-barlow-condensed)] text-[20px] font-bold text-[var(--color-text-primary)]">
              Active plan
            </h2>
            <Link href="/home/plan" className="text-[12px] text-[var(--color-accent)]">Open plan →</Link>
          </div>

          {activePlan ? (
            <>
              <div className="text-[16px] font-semibold text-[var(--color-text-primary)]">{activePlan.name}</div>
              <div className="mt-1 text-[12px] text-[var(--color-text-secondary)]">{activePlan.description ?? "Your current weekly structure."}</div>
              <div className="mt-4 h-[4px] rounded-full bg-[var(--bg-3)]">
                <div className="h-[4px] rounded-full bg-[var(--color-accent)]" style={{ width: `${progress}%` }} />
              </div>
              <div className="mt-2 text-[11px] text-[var(--color-text-muted)]">{progress}% complete this week</div>
            </>
          ) : (
            <div className="rounded-[12px] border bg-[var(--bg-3)] px-4 py-5 text-[12px] text-[var(--color-text-muted)]" style={{ border: "var(--border-subtle)" }}>
              No active plan yet. Create one to start tracking structured progress.
            </div>
          )}
        </section>
      </div>

      <section
        className="border bg-[var(--bg-2)]"
        style={{ border: "var(--border-subtle)", borderRadius: "var(--radius-xl)", padding: "18px 20px" }}
      >
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="font-[family-name:var(--font-barlow-condensed)] text-[20px] font-bold text-[var(--color-text-primary)]">
            Workout history
          </h2>
          <span className="text-[12px] text-[var(--color-text-muted)]">Most recent first</span>
        </div>

        {sessions.length === 0 ? (
          <div className="rounded-[12px] border bg-[var(--bg-3)] px-4 py-5 text-[12px] text-[var(--color-text-muted)]" style={{ border: "var(--border-subtle)" }}>
            Your completed workouts will show up here once you finish your first session.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {sessions.slice(0, 12).map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between gap-4 border bg-[var(--bg-3)]"
                style={{ border: "var(--border-subtle)", borderRadius: "12px", padding: "12px 14px" }}
              >
                <div>
                  <div className="text-[13px] font-semibold text-[var(--color-text-primary)]">
                    {session.completed_at ? new Date(session.completed_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "In progress"}
                  </div>
                  <div className="mt-1 text-[11px] text-[var(--color-text-muted)]">
                    {session.status === "completed" ? "Completed workout" : "Session in progress"}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[13px] font-semibold text-[var(--color-text-primary)]">{session.duration_minutes ?? 0} min</div>
                  <div className="mt-1 text-[11px] text-[var(--color-text-muted)] uppercase tracking-[0.6px]">{session.status}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
