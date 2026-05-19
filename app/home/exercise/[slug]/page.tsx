import { ExerciseMedia } from "@/components/ui/ExerciseMedia";
import { getServerSupabase } from "@/lib/supabase-server";
import Link from "next/link";
import { ArrowLeft, Clock3, Play, Dumbbell } from "lucide-react";
import type { Category, Exercise, Equipment } from "@/types/database";
import { notFound } from "next/navigation";

const difficultyClasses: Record<string, string> = {
  beginner: "bg-[rgba(77,200,123,0.10)] text-[var(--color-success)]",
  intermediate: "bg-[rgba(201,168,122,0.10)] text-[var(--color-accent)]",
  advanced: "bg-[rgba(224,101,96,0.10)] text-[var(--color-danger)]",
};

function titleCase(value: string) {
  return value
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function ExerciseHeroArtworkFallback() {
  return (
    <svg viewBox="0 0 420 320" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      <rect width="420" height="320" fill="var(--bg-3)" />
      <circle cx="210" cy="110" r="26" fill="none" stroke="rgba(201,168,122,0.22)" strokeWidth="2" />
      <path d="M150 210 Q210 80 270 210" fill="none" stroke="rgba(201,168,122,0.24)" strokeWidth="2" strokeLinecap="round" />
      <line x1="130" y1="225" x2="290" y2="225" stroke="rgba(201,168,122,0.14)" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="210" cy="92" r="10" fill="rgba(201,168,122,0.2)" />
      <circle cx="210" cy="92" r="5" fill="rgba(201,168,122,0.45)" />
      <line x1="0" y1="240" x2="420" y2="240" stroke="rgba(255,255,255,0.025)" strokeWidth="1" />
      <line x1="0" y1="200" x2="420" y2="200" stroke="rgba(255,255,255,0.025)" strokeWidth="1" />
      <line x1="105" y1="0" x2="105" y2="320" stroke="rgba(255,255,255,0.025)" strokeWidth="1" />
      <line x1="210" y1="0" x2="210" y2="320" stroke="rgba(255,255,255,0.025)" strokeWidth="1" />
      <line x1="315" y1="0" x2="315" y2="320" stroke="rgba(255,255,255,0.025)" strokeWidth="1" />
      <text x="20" y="295" fontSize="11" fill="rgba(201,168,122,0.4)" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" letterSpacing="2">
        EXERCISE PREVIEW
      </text>
    </svg>
  );
}

function InfoCard({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div
      className="border bg-[var(--bg-2)]"
      style={{
        border: "var(--border-subtle)",
        borderRadius: "10px",
        padding: "13px 14px",
      }}
    >
      <div
        className="mb-1 text-[10px] font-bold uppercase text-[var(--color-text-muted)]"
        style={{ letterSpacing: "0.8px" }}
      >
        {label}
      </div>
      <div className={`text-[14px] font-semibold ${accent ? "text-[var(--color-accent)]" : "text-[var(--color-text-primary)]"}`}>
        {value}
      </div>
    </div>
  );
}

export default async function ExerciseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await getServerSupabase();

  const { data: exercise } = await supabase
    .from("exercises")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!exercise) notFound();

  const ex = exercise as Exercise;

  const [{ data: equip }, { data: category }] = await Promise.all([
    ex.equipment_id
      ? supabase.from("equipment").select("*").eq("id", ex.equipment_id).single()
      : Promise.resolve({ data: null }),
    ex.category_id
      ? supabase.from("categories").select("*").eq("id", ex.category_id).single()
      : Promise.resolve({ data: null }),
  ]);

  const eq = equip as Equipment | null;
  const cat = category as Category | null;
  const mediaVideoUrl = ex.video_url ?? ex.video_url_side ?? ex.video_url_front;
  const durationLabel = ex.reps.includes("sec") ? ex.reps : `${ex.rest_time * ex.sets}s`;
  const caloriesLabel = `~${Math.max(120, ex.sets * 45)} kcal`;

  return (
    <div className="px-8 py-7">
      <Link
        href="/home/browse"
        className="mb-6 inline-flex items-center gap-2 border bg-[var(--bg-2)] px-4 py-2 text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
        style={{ border: "var(--border-default)", borderRadius: "9px" }}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to browse
      </Link>

      <div className="grid grid-cols-[1fr_1.1fr] gap-6">
        <div className="flex flex-col gap-3">
          <ExerciseMedia
            slug={slug}
            videoUrl={mediaVideoUrl}
            alt={ex.name}
            className="h-[320px] border bg-[var(--bg-2)]"
            fallback={<ExerciseHeroArtworkFallback />}
          />

          <div className="grid grid-cols-2 gap-[10px]">
            <InfoCard label="Equipment" value={eq?.name ?? "Bodyweight"} accent />
            <InfoCard label="Category" value={cat?.name ?? "Upper Body Push"} />
            <InfoCard label="Calories" value={caloriesLabel} />
            <InfoCard label="Added By" value="RepFlow Team" />
          </div>
        </div>

        <div className="flex flex-col">
          <h1
            className="mb-[10px] font-[family-name:var(--font-barlow-condensed)] text-[38px] font-black leading-[1.05] text-[var(--color-text-primary)]"
            style={{ letterSpacing: "-0.5px" }}
          >
            {ex.name}
          </h1>

          <div className="mb-4 flex flex-wrap gap-[7px]">
            <span
              className="inline-flex items-center gap-[5px] border bg-[var(--bg-2)] px-3 py-[5px] text-[12px] font-semibold text-[var(--color-text-secondary)]"
              style={{ border: "var(--border-subtle)", borderRadius: "6px" }}
            >
              <Dumbbell className="h-[13px] w-[13px]" />
              {eq?.name ?? "Bodyweight"}
            </span>
            <span
              className={`inline-block rounded-[6px] px-3 py-[5px] text-[12px] font-bold uppercase ${difficultyClasses[ex.difficulty]}`}
              style={{ letterSpacing: "0.5px" }}
            >
              {ex.difficulty}
            </span>
            <span
              className="inline-flex items-center gap-[5px] border bg-[var(--bg-2)] px-3 py-[5px] text-[12px] font-semibold text-[var(--color-text-secondary)]"
              style={{ border: "var(--border-subtle)", borderRadius: "6px" }}
            >
              <Clock3 className="h-[13px] w-[13px]" />
              {durationLabel}
            </span>
          </div>

          <div className="mb-4 grid grid-cols-3 gap-[10px]">
            {[
              { value: String(ex.sets), label: "Sets" },
              { value: ex.reps, label: "Reps" },
              { value: `${ex.rest_time}s`, label: "Rest" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="border bg-[var(--bg-2)] p-4 text-center"
                style={{ border: "var(--border-subtle)", borderRadius: "var(--radius-lg)" }}
              >
                <div className="font-[family-name:var(--font-barlow-condensed)] text-[34px] font-black leading-none text-[var(--color-accent)]">
                  {stat.value}
                </div>
                <div
                  className="mt-1 text-[10px] font-bold uppercase text-[var(--color-text-muted)]"
                  style={{ letterSpacing: "1px" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mb-4">
            <div
              className="mb-2 text-[10px] font-bold uppercase text-[var(--color-text-muted)]"
              style={{ letterSpacing: "1px" }}
            >
              Muscles Targeted
            </div>
            <div className="flex flex-wrap gap-[6px]">
              {ex.primary_muscles.map((muscle) => (
                <span
                  key={`primary-${muscle}`}
                  className="rounded-[5px] border bg-[var(--color-accent-dim)] px-3 py-[5px] text-[12px] font-semibold text-[var(--color-accent)]"
                  style={{ border: "var(--border-accent)" }}
                >
                  {titleCase(muscle)}
                </span>
              ))}
              {ex.secondary_muscles.map((muscle) => (
                <span
                  key={`secondary-${muscle}`}
                  className="rounded-[5px] border bg-[var(--bg-2)] px-3 py-[5px] text-[12px] font-semibold text-[var(--color-text-secondary)]"
                  style={{ border: "var(--border-subtle)" }}
                >
                  {titleCase(muscle)}
                </span>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <h2 className="mb-3 font-[family-name:var(--font-barlow-condensed)] text-[18px] font-bold text-[var(--color-text-primary)]">
              Instructions
            </h2>
            <ol>
              {ex.instructions
                .split("\n")
                .filter(Boolean)
                .map((step, index, steps) => (
                  <li
                    key={`${index + 1}-${step}`}
                    className="flex gap-3 py-3"
                    style={{
                      borderBottom: index === steps.length - 1 ? "none" : "var(--border-subtle)",
                    }}
                  >
                    <span
                      className="flex h-6 w-6 shrink-0 items-center justify-center border bg-[var(--color-accent-dim)] text-[11px] font-bold text-[var(--color-accent)]"
                      style={{ border: "var(--border-accent)", borderRadius: "6px" }}
                    >
                      {index + 1}
                    </span>
                    <span className="pt-[1px] text-[13.5px] leading-[1.6] text-[var(--color-text-secondary)]">
                      {step.replace(/^\d+\.\s*/, "")}
                    </span>
                  </li>
                ))}
            </ol>
          </div>

          <button
            type="button"
            className="mt-[18px] flex w-full items-center justify-center gap-[10px] bg-[var(--color-accent)] text-[#0A0A0A]"
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
            <Play className="h-4 w-4 fill-current" />
            Start Exercise
          </button>
        </div>
      </div>
    </div>
  );
}
